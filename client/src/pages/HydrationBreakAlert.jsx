import { useState, useEffect } from "react";


const HydrationBreakAlert = () => {
  const [showWaterAlert, setShowWaterAlert] = useState(false);
  const [showBreakAlert, setShowBreakAlert] = useState(false);

  useEffect(() => {
    // Water reminder every 2 hours
    const waterInterval = setInterval(() => {
      setShowWaterAlert(true);
      setTimeout(() => setShowWaterAlert(false), 5000); // Hide after 5s
    }, 2 * 60 * 60 * 1000);

    // Break reminder after 1 hour of screen time
    let screenTime = 0;
    const screenInterval = setInterval(() => {
      screenTime += 1;
      if (screenTime >= 60) {
        setShowBreakAlert(true);
        setTimeout(() => setShowBreakAlert(false), 5000);
        screenTime = 0; // Reset screen time after alert
      }
    }, 60 * 1000);

    return () => {
      clearInterval(waterInterval);
      clearInterval(screenInterval);
    };
  }, []);

  return (
    <div>
      {showWaterAlert && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
          💧 Time to drink some water!
        </div>
      )}

      {showBreakAlert && (
        <div className="fixed top-16 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg">
          🧘 Take a break! Look away from the screen.
        </div>
      )}
    </div>
  );
};

export default HydrationBreakAlert;
