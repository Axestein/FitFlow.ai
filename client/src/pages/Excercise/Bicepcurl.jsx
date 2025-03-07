import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import bcp from "../../../public/bicep.gif"

const BicepCurl = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [curlCount, setCurlCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [loadingState, setLoadingState] = useState('initial');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showManualMode, setShowManualMode] = useState(false);
  const [detector, setDetector] = useState(null);

  const poseHistoryRef = useRef([]);
  const countingStateRef = useRef('up');
  const confidenceThresholdRef = useRef(0.5);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoadingState('models');
        setLoadingProgress(10);
        await tf.ready();
        setLoadingProgress(30);
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet, 
          detectorConfig
        );
        setDetector(detector);
        setLoadingProgress(40);
      } catch (error) {
        console.error('Error loading models:', error);
        setErrorMessage(`Failed to load pose detection: ${error.message}. Try using manual mode.`);
        setShowManualMode(true);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage('Browser does not support camera access. Try using Chrome or Firefox.');
        return;
      }
      try {
        setLoadingState('camera');
        setLoadingProgress(50);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsWebcamReady(true);
            setLoadingProgress(80);
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
          };
        }
      } catch (error) {
        console.error('Camera access error:', error);
        if (error.name === 'NotAllowedError') {
          setErrorMessage('Camera access denied. Please allow camera access and reload the page.');
        } else if (error.name === 'NotFoundError') {
          setErrorMessage('No camera found. Please connect a camera and reload the page.');
        } else {
          setErrorMessage(`Camera error: ${error.message}. Try using manual mode instead.`);
          setShowManualMode(true);
        }
      }
    };
    setupCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isWebcamReady && detector && loadingState !== 'ready') {
      setLoadingState('ready');
      setLoadingProgress(100);
    }
  }, [isWebcamReady, detector, loadingState]);

  useEffect(() => {
    if (!isTracking || !detector || !isWebcamReady || !canvasRef.current) return;
    let animationFrameId;
    const detectPose = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      try {
        frameCountRef.current += 1;
        if (frameCountRef.current % 2 !== 0) {
          animationFrameId = requestAnimationFrame(detectPose);
          return;
        }
        const poses = await detector.estimatePoses(videoRef.current);
        if (poses && poses.length > 0) {
          const pose = poses[0];
          countBicepCurls(pose);
          drawPose(pose);
        } else {
          setFeedback('No pose detected. Make sure your body is visible.');
        }
      } catch (error) {
        console.error('Pose detection error:', error);
      }
      animationFrameId = requestAnimationFrame(detectPose);
    };
    detectPose();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTracking, detector, isWebcamReady]);

  const countBicepCurls = (pose) => {
    if (!pose || !pose.keypoints) return;
    
    const findKeypoint = (name) => pose.keypoints.find(kp => kp.name === name);
    const leftShoulder = findKeypoint('left_shoulder');
    const rightShoulder = findKeypoint('right_shoulder');
    const leftElbow = findKeypoint('left_elbow');
    const rightElbow = findKeypoint('right_elbow');
    const leftWrist = findKeypoint('left_wrist');
    const rightWrist = findKeypoint('right_wrist');
    
    const keypoints = [leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist];
    const allDetected = keypoints.every(kp => kp && kp.score > confidenceThresholdRef.current);
    
    if (!allDetected) {
      setFeedback('Position yourself better - make sure your arms are visible');
      return;
    }
    
    const leftAngle = calculateAngle(
      [leftShoulder.x, leftShoulder.y], 
      [leftElbow.x, leftElbow.y], 
      [leftWrist.x, leftWrist.y]
    );
    
    const rightAngle = calculateAngle(
      [rightShoulder.x, rightShoulder.y], 
      [rightElbow.x, rightElbow.y], 
      [rightWrist.x, rightWrist.y]
    );
    
    const avgAngle = (leftAngle + rightAngle) / 2;
    const upThreshold = 160;
    const downThreshold = 60;
    
    if (countingStateRef.current === 'up' && avgAngle < downThreshold) {
      countingStateRef.current = 'down';
      setFeedback('Good! Now curl back up');
    } else if (countingStateRef.current === 'down' && avgAngle > upThreshold) {
      countingStateRef.current = 'up';
      setCurlCount(prev => prev + 1);
      setFeedback('Bicep curl completed! Great job!');
    }
  };

  const calculateAngle = (p1, p2, p3) => {
    const radians = Math.atan2(p3[1] - p2[1], p3[0] - p2[0]) - 
                    Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return angle;
  };

  const drawPose = (pose) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(videoRef.current, 0, 0);
    
    if (pose.keypoints) {
      // Draw connections
      drawConnections(ctx, pose.keypoints);
      
      // Draw keypoints
      pose.keypoints.forEach(keypoint => {
        if (keypoint.score > confidenceThresholdRef.current) {
          const { x, y } = keypoint;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          
          if (keypoint.name && keypoint.name.includes('face')) {
            ctx.fillStyle = '#ff0000';
          } else if (keypoint.name && (keypoint.name.includes('shoulder') || keypoint.name.includes('hip'))) {
            ctx.fillStyle = '#00ff00';
          } else if (keypoint.name && (keypoint.name.includes('elbow') || keypoint.name.includes('wrist'))) {
            ctx.fillStyle = '#ffff00';
          } else if (keypoint.name && (keypoint.name.includes('knee') || keypoint.name.includes('ankle'))) {
            ctx.fillStyle = '#00ffff';
          } else {
            ctx.fillStyle = '#ff00ff';
          }
          ctx.fill();
        }
      });
    }
    
    // Draw bicep curl guide line
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const height = canvasRef.current.height;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.lineTo(canvasRef.current.width, height * 0.6);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw state and rep count
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`State: ${countingStateRef.current.toUpperCase()}`, 10, 30);
    ctx.fillText(`Reps: ${curlCount}`, 10, 60);
  };

  const drawConnections = (ctx, keypoints) => {
    const connections = [
      ['nose', 'left_eye'], ['nose', 'right_eye'],
      ['left_eye', 'left_ear'], ['right_eye', 'right_ear'],
      ['nose', 'left_shoulder'], ['nose', 'right_shoulder'],
      ['left_shoulder', 'left_elbow'], ['right_shoulder', 'right_elbow'],
      ['left_elbow', 'left_wrist'], ['right_elbow', 'right_wrist'],
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_hip'], ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      ['left_hip', 'left_knee'], ['right_hip', 'right_knee'],
      ['left_knee', 'left_ankle'], ['right_knee', 'right_ankle']
    ];
    
    const keypointMap = {};
    keypoints.forEach(keypoint => {
      if (keypoint.name) {
        keypointMap[keypoint.name] = keypoint;
      }
    });
    
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 3;
    
    connections.forEach(([startName, endName]) => {
      const startPoint = keypointMap[startName];
      const endPoint = keypointMap[endName];
      
      if (startPoint && endPoint && 
          startPoint.score > confidenceThresholdRef.current && 
          endPoint.score > confidenceThresholdRef.current) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
    });
  };

  const handleManualCount = () => {
    setCurlCount(prev => prev + 1);
    setFeedback('Bicep curl counted!');
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    setFeedback(isTracking ? 'Tracking paused' : 'Tracking started');
  };

  const resetCounter = () => {
    setCurlCount(0);
    setFeedback('Counter reset');
    countingStateRef.current = 'up';
  };

  const renderLoadingState = () => {
    if (loadingState !== 'ready') {
      let loadingMessage = 'Initializing...';
      if (loadingState === 'models') loadingMessage = 'Loading pose detection models...';
      if (loadingState === 'camera') loadingMessage = 'Accessing camera...';
      
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg mb-4">{loadingMessage}</p>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderErrorState = () => {
    if (errorMessage) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-40">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            {showManualMode && (
              <button 
                onClick={() => {
                  setErrorMessage('');
                  setLoadingState('ready');
                  setShowManualMode(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Continue with Manual Mode
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-6">
          Bicep Curl Tracker
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Your Progress</h2>
              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-400 mb-2">Bicep Curls Completed</p>
                <p className="text-5xl font-bold text-blue-400">{curlCount}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Controls</h2>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={toggleTracking}
                  className={`${isTracking 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'} 
                    px-4 py-3 rounded-lg font-bold transition-colors text-lg`}
                  disabled={loadingState !== 'ready'}
                >
                  {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                </button>
                
                <button 
                  onClick={resetCounter}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors"
                >
                  Reset Counter
                </button>
                
                {showManualMode && (
                  <button 
                    onClick={handleManualCount}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-bold transition-colors mt-4"
                  >
                    Count Manually
                  </button>
                )}
              </div>
              <div>
                <img src={bcp} alt="" className='rounded-xl mt-4'  />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Bicep Curl Tips</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Face the camera from the front view</li>
                <li>Keep your elbows close to your body</li>
                <li>Use controlled movements</li>
                <li>Fully extend your arms at the bottom</li>
                <li>Maintain a steady pace</li>
              </ul>
            </div>
          </div>
          
          {/* Camera/Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas 
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
                
                {/* Render loading state */}
                {renderLoadingState()}
                
                {/* Render error state */}
                {renderErrorState()}
                
                {/* Overlay Elements */}
                {loadingState === 'ready' && (
                  <>
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {isTracking ? 'Tracking Active' : 'Tracking Paused'}
                      </div>
                    </div>
                    
                    {/* Exercise Counter */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-black/60 text-white px-4 py-2 rounded-lg">
                        <span className="text-3xl font-bold">{curlCount}</span>
                        <span className="ml-2">Bicep Curls</span>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    {feedback && (
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                        <div className="bg-black/60 text-white px-4 py-2 rounded-lg inline-block mx-auto">
                          {feedback}
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Manual Mode Overlay */}
                {showManualMode && loadingState === 'ready' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Manual Tracking Mode</h3>
                      <p className="text-white mb-4">Press the button to count your bicep curls</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Progress */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Today's Goal</h3>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (curlCount / 20) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>0</span>
                  <span>Goal: 20 curls</span>
                </div>
              </div>
              
              {/* Quick Guide */}
              <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Troubleshooting</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• If tracking is inaccurate, try better lighting</p>
                  <p>• Make sure your full arms are visible in the frame</p>
                  <p>• Front view works best for bicep curls</p>
                  <p>• Use a steady pace for best tracking results</p>
                  <p>• If the model fails to load, use the manual counting mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BicepCurl;