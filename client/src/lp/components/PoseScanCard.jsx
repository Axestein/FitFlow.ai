import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

const MODEL_URL = '/models/character.glb';
useGLTF.preload(MODEL_URL);

function CameraRig() {
  useFrame(({ camera }) => {
    camera.position.set(0, 1.15, 3.4);
    camera.fov = 34;
    camera.lookAt(0, 1.05, 0);
    camera.updateProjectionMatrix();
  });
  return null;
}

// ---------------------------------------------------------------------------
// Exercise angle data. Values are radians fed into each bone's own real
// hinge axis (see FLEX_AXIS below) — not a generic X/Y/Z guess.
// ---------------------------------------------------------------------------
const NEUTRAL = {
  spineX: 0,
  shoulderX_L: 0, shoulderX_R: 0,
  elbowX_L: 0.1, elbowX_R: 0.1,
  hipX_L: 0, hipX_R: 0,
  kneeX_L: 0, kneeX_R: 0,
  lift: 0,
};

const EXERCISES = [
  {
    category: 'Upper Body', name: 'Bicep Curl', href: '/bicepcurl',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, shoulderX_L: -0.3, shoulderX_R: -0.3, elbowX_L: -2.3, elbowX_R: -2.3 },
  },
  {
    category: 'Upper Body', name: 'Front Raises', href: '/frontraises',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, shoulderX_L: -1.5, shoulderX_R: -1.5, elbowX_L: -0.1, elbowX_R: -0.1 },
  },
  {
    category: 'Upper Body', name: 'Shoulder Press', href: '/shoulderpress',
    rest: { ...NEUTRAL, shoulderX_L: -1.4, shoulderX_R: -1.4, elbowX_L: -1.3, elbowX_R: -1.3 },
    peak: { ...NEUTRAL, shoulderX_L: -2.9, shoulderX_R: -2.9, elbowX_L: -0.15, elbowX_R: -0.15 },
  },
  {
    category: 'Upper Body', name: 'Pull Up', href: '/pullup', bar: true,
    rest: { ...NEUTRAL, shoulderX_L: -2.8, shoulderX_R: -2.8, elbowX_L: -0.2, elbowX_R: -0.2, lift: -0.35 },
    peak: { ...NEUTRAL, shoulderX_L: -2.6, shoulderX_R: -2.6, elbowX_L: -2.0, elbowX_R: -2.0, lift: 0.05 },
  },
  {
    category: 'Upper Body', name: 'Push Up', href: '/pushup',
    rest: { ...NEUTRAL, spineX: 1.0, shoulderX_L: -1.3, shoulderX_R: -1.3, elbowX_L: -1.7, elbowX_R: -1.7, lift: -0.55 },
    peak: { ...NEUTRAL, spineX: 1.0, shoulderX_L: -1.3, shoulderX_R: -1.3, elbowX_L: -0.2, elbowX_R: -0.2, lift: -0.4 },
  },
  {
    category: 'Lower Body', name: 'Lunges', href: '/lunges',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, hipX_L: 0.7, kneeX_L: -1.1, hipX_R: -0.5, kneeX_R: -0.9, lift: -0.25 },
  },
  {
    category: 'Lower Body', name: 'Squat', href: '/squat',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, hipX_L: 0.55, hipX_R: 0.55, kneeX_L: -1.3, kneeX_R: -1.3, lift: -0.35 },
  },
  {
    category: 'Lower Body', name: 'High Knees', href: '/highknees',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, hipX_L: 1.5, kneeX_L: -1.8, lift: -0.05 },
  },
  {
    category: 'Lower Body', name: 'Knee Raises', href: '/kneeraises',
    rest: NEUTRAL,
    peak: { ...NEUTRAL, hipX_R: 1.2, kneeX_R: -1.0 },
  },
];

const ANGLE_KEYS = Object.keys(NEUTRAL);
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

// ---------------------------------------------------------------------------
// Real hinge axes, computed directly from this model's bind pose (not
// assumed). Each bone's own local flex axis was derived from where its
// child bone actually sits in its rest transform, so "rotate by angle
// around this vector" bends the joint the way it actually hinges instead
// of twisting it. If you swap in a different character.glb, these numbers
// are specific to *this* file's rig and would need recomputing.
// ---------------------------------------------------------------------------
// Real hinge axes, computed directly from this model's bind pose. Flexion
// (curl, raise, press, squat, lunge — anything that swings a limb forward)
// happens around the body's own left-right (mediolateral) axis. The
// previous version computed the axis perpendicular to that instead, which
// is the abduction axis (sideways/lateral movement) — correct-looking math,
// wrong motion, which is exactly why everything swung sideways instead of
// forward. This version rotates directly around mediolateral, expressed in
// each bone's own local frame.
const CORRECTED_REST_ARM_L = new THREE.Quaternion(0.58629, 0.00367, -0.00083, 0.81009);
const CORRECTED_REST_ARM_R = new THREE.Quaternion(0.58628, -0.00079, 0.00292, 0.81010);

const FLEX_AXIS = {
  LeftArm: new THREE.Vector3(-0.0001, -0.0000, -1.0000),
  RightArm: new THREE.Vector3(-0.0008, 0.0000, 1.0000),
  LeftForeArm: new THREE.Vector3(-0.0001, 0.0172, -0.9999),
  RightForeArm: new THREE.Vector3(-0.0008, -0.0172, 0.9999),
  LeftUpLeg: new THREE.Vector3(-0.9978, 0.0657, -0.0000),
  RightUpLeg: new THREE.Vector3(-0.9978, -0.0657, 0.0000),
  LeftLeg: new THREE.Vector3(-0.9997, 0.0235, -0.0002),
  RightLeg: new THREE.Vector3(-0.9997, -0.0236, 0.0000),
  Hips: new THREE.Vector3(1.0000, 0.0000, 0.0000),
};

// Mixamo bone names used by this rig.
const B = {
  hips: 'mixamorigHips',
  head: 'mixamorigHead',
  armL: 'mixamorigLeftArm', foreArmL: 'mixamorigLeftForeArm', handL: 'mixamorigLeftHand',
  armR: 'mixamorigRightArm', foreArmR: 'mixamorigRightForeArm', handR: 'mixamorigRightHand',
  upLegL: 'mixamorigLeftUpLeg', legL: 'mixamorigLeftLeg', footL: 'mixamorigLeftFoot',
  upLegR: 'mixamorigRightUpLeg', legR: 'mixamorigRightLeg', footR: 'mixamorigRightFoot',
};

function Marker({ r = 0.035, socket = false }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[socket ? r * 0.5 : r, 14, 14]} />
        <meshStandardMaterial color="#0B0F0E" emissive="#48C4A4" emissiveIntensity={1.4} roughness={0.25} />
      </mesh>
      {socket && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.01, 8, 26]} />
          <meshBasicMaterial color="#48C4A4" transparent opacity={0.85} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function CharacterRig({ exIndex, onRep }) {
  const { scene } = useGLTF(MODEL_URL);
  const cloned = useMemo(() => cloneSkeleton(scene), [scene]);
  const { nodes } = useGraph(cloned);

  const wrapper = useRef();
  const boneLines = useRef();
  const restQuats = useRef(null);
  const markerRefs = useRef({});

  const prevAngles = useRef(NEUTRAL);
  const switchStart = useRef(0);
  const lastExIndex = useRef(exIndex);
  const repToggled = useRef(false);

  const markerBones = useMemo(
    () => [B.head, B.armL, B.foreArmL, B.handL, B.armR, B.foreArmR, B.handR, B.upLegL, B.legL, B.footL, B.upLegR, B.legR, B.footR],
    []
  );
  const socketBones = useMemo(() => new Set([B.armL, B.armR, B.upLegL, B.upLegR]), []);
  const bonePairs = useMemo(
    () => [
      [B.head, B.armL], [B.armL, B.foreArmL], [B.foreArmL, B.handL],
      [B.head, B.armR], [B.armR, B.foreArmR], [B.foreArmR, B.handR],
      [B.head, B.hips],
      [B.hips, B.upLegL], [B.upLegL, B.legL], [B.legL, B.footL],
      [B.hips, B.upLegR], [B.upLegR, B.legR], [B.legR, B.footR],
    ],
    []
  );

  const ready =
    !!nodes[B.hips] && !!nodes[B.armL] && !!nodes[B.armR] && !!nodes[B.foreArmL] && !!nodes[B.foreArmR] &&
    !!nodes[B.upLegL] && !!nodes[B.upLegR] && !!nodes[B.legL] && !!nodes[B.legR];

  useEffect(() => {
    if (!ready) {
      console.warn('[PoseScanCard] expected mixamorig bones were not found. Available names:\n' + Object.keys(nodes).join(', '));
      return;
    }
    restQuats.current = {
      hips: nodes[B.hips].quaternion.clone(),
      armL: CORRECTED_REST_ARM_L.clone(),
      armR: CORRECTED_REST_ARM_R.clone(),
      foreArmL: nodes[B.foreArmL].quaternion.clone(),
      foreArmR: nodes[B.foreArmR].quaternion.clone(),
      upLegL: nodes[B.upLegL].quaternion.clone(),
      upLegR: nodes[B.upLegR].quaternion.clone(),
      legL: nodes[B.legL].quaternion.clone(),
      legR: nodes[B.legR].quaternion.clone(),
    };
    console.info('[PoseScanCard] rig ready, animation driving', Object.keys(restQuats.current).length, 'bones');
  }, [ready, nodes]);

  useFrame((state) => {
    if (!ready || !restQuats.current) return;
    const t = state.clock.getElapsedTime();
    const ex = EXERCISES[exIndex];
    const freq = 0.34;
    const cyclePos = (t * freq) % 1;
    const mix = easeInOutSine((Math.sin(cyclePos * Math.PI * 2 - Math.PI / 2) + 1) / 2);

    if (!repToggled.current && cyclePos < 0.02) {
      repToggled.current = true;
      onRep();
    } else if (cyclePos > 0.05) {
      repToggled.current = false;
    }

    if (lastExIndex.current !== exIndex) {
      lastExIndex.current = exIndex;
      switchStart.current = t;
    }

    const animated = {};
    ANGLE_KEYS.forEach((k) => { animated[k] = lerp(ex.rest[k] ?? 0, ex.peak[k] ?? 0, mix); });

    const blend = Math.min((t - switchStart.current) / 0.5, 1);
    const final = {};
    ANGLE_KEYS.forEach((k) => { final[k] = lerp(prevAngles.current[k] ?? 0, animated[k], blend); });
    if (blend >= 1) prevAngles.current = animated;

    const R = restQuats.current;
    // Compose: bindRotation * extraFlexRotation(around the bone's real hinge axis)
    const flex = (bone, axisKey, angle) =>
      R[bone].clone().multiply(new THREE.Quaternion().setFromAxisAngle(FLEX_AXIS[axisKey], angle));

    nodes[B.armL].quaternion.copy(flex('armL', 'LeftArm', final.shoulderX_L));
    nodes[B.armR].quaternion.copy(flex('armR', 'RightArm', final.shoulderX_R));
    nodes[B.foreArmL].quaternion.copy(flex('foreArmL', 'LeftForeArm', final.elbowX_L));
    nodes[B.foreArmR].quaternion.copy(flex('foreArmR', 'RightForeArm', final.elbowX_R));
    nodes[B.upLegL].quaternion.copy(flex('upLegL', 'LeftUpLeg', final.hipX_L));
    nodes[B.upLegR].quaternion.copy(flex('upLegR', 'RightUpLeg', final.hipX_R));
    nodes[B.legL].quaternion.copy(flex('legL', 'LeftLeg', final.kneeX_L));
    nodes[B.legR].quaternion.copy(flex('legR', 'RightLeg', final.kneeX_R));
    nodes[B.hips].quaternion.copy(flex('hips', 'Hips', final.spineX));

    if (wrapper.current) wrapper.current.position.y = final.lift;

    const v = new THREE.Vector3();

    markerBones.forEach((name) => {
      const m = markerRefs.current[name];
      if (m && nodes[name]) {
        nodes[name].getWorldPosition(v);
        m.position.copy(v);
      }
    });

    const pts = new Float32Array(bonePairs.length * 6);
    bonePairs.forEach(([a, b], i) => {
      nodes[a].getWorldPosition(v);
      pts.set([v.x, v.y, v.z], i * 6);
      nodes[b].getWorldPosition(v);
      pts.set([v.x, v.y, v.z], i * 6 + 3);
    });
    boneLines.current.geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
  });

  if (!ready) return <primitive object={cloned} />;

  return (
    <group>
      <group ref={wrapper}>
        <primitive object={cloned} />
      </group>
      {markerBones.map((name) => (
        <group key={name} ref={(el) => { markerRefs.current[name] = el; }}>
          <Marker socket={socketBones.has(name)} r={socketBones.has(name) ? 0.05 : 0.032} />
        </group>
      ))}
      <lineSegments ref={boneLines}>
        <bufferGeometry />
        <lineBasicMaterial color="#7FE0C4" transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
}

function ScanPlane() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const y = 0.1 + ((Math.sin(t * 0.5) + 1) / 2) * 1.6;
    ref.current.position.y = y;
    ref.current.material.opacity = 0.45 + Math.sin(t * 0.5) * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.9, 0.9]} />
      <meshBasicMaterial color="#7FE0C4" transparent opacity={0.45} side={THREE.DoubleSide} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function Parallax({ children }) {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.35 - 0.35, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.12, 0.06);
  });
  return (
    <group ref={group} onPointerMove={(e) => { pointer.current = { x: e.pointer.x, y: e.pointer.y }; }}>
      {children}
    </group>
  );
}

const PoseScanCard = () => {
  const [exIndex, setExIndex] = useState(0);
  const [reps, setReps] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setExIndex((i) => (i + 1) % EXERCISES.length);
      setReps(0);
    }, 6600);
    return () => clearInterval(id);
  }, []);

  const current = EXERCISES[exIndex];
  const handleRep = () => setReps((r) => (r >= 99 ? 1 : r + 1));

  return (
    <div id="pose-demo" className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#123027] to-[#0B0F0E] p-6 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-[#9CA6A1]">
        <span>Live pose tracking</span>
        <span className="inline-flex items-center gap-1.5 text-[#48C4A4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#48C4A4] animate-pulse" />
          Analyzing
        </span>
      </div>

      <div className="relative mt-6 h-96 rounded-2xl overflow-hidden bg-black/20">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} camera={{ position: [0, 1.15, 3.4], fov: 34 }}>
          <CameraRig />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} color="#F6F4EE" />
          <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#48C4A4" />
          <Suspense fallback={null}>
            <Parallax>
              <CharacterRig exIndex={exIndex} onRep={handleRep} />
              <ScanPlane />
            </Parallax>
          </Suspense>
        </Canvas>

        <span className="absolute top-3 right-3 font-mono text-[10px] bg-[#48C4A4]/15 text-[#48C4A4] px-2 py-1 rounded-full pointer-events-none">{current.category}</span>
        <span className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#48C4A4]/15 text-[#48C4A4] px-2 py-1 rounded-full pointer-events-none">tracking confidence 96%</span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <div className="font-display text-6xl font-semibold text-[#F6F4EE] tabular-nums">{String(reps).padStart(2, '0')}</div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#6C756F] mt-1">Reps &middot; Set 1</div>
        </div>
        <Link to={current.href} className="font-mono text-[11px] tracking-[0.2em] uppercase text-right leading-relaxed text-[#48C4A4] hover:text-[#7FE0C4] transition-colors">
          Now scanning
          <br />
          {current.name} &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PoseScanCard;