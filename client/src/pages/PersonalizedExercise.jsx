import React, { useState } from 'react';

const PersonalizedExercise = () => {
  // State for storing the selected body part and related exercises
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [exercises, setExercises] = useState([]);

  // Mapping body parts to exercises
  const exercisesMapping = {
    head: ["Neck Stretch", "Neck Strengthening"],
    left_arm: ["Bicep Curl", "Tricep Extension"],
    right_leg: ["Leg Squats", "Lunges", "Hamstring Stretch", "Calf Raises"],
    torso: ["Core Crunch", "Side Plank", "Plank"],
  };

  // Handle the click on a body part and set the corresponding exercises
  const handleBodyPartClick = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setExercises(exercisesMapping[bodyPart] || []); // Set exercises for selected body part
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left Section with iframe */}
      <div style={{ width: '70%', height: '600px', marginBottom: '20px' }}>
        <iframe
          title="Human Body App"
          src="https://maya-gans.shinyapps.io/human_body_app/"
          style={{ width: '50%', height: '100%' }}
          frameBorder="0"
        />
      </div>

      {/* Right Section with Buttons and Exercise List */}
      <div style={{ width: '25%', paddingLeft: '0px' }}>
        <h2 className='text-4xl font-bold'>Personalized Exercise</h2>

        {/* Body Part Buttons */}
        <div>
          <h3>Click on a body part to get exercises:</h3>
          <button onClick={() => handleBodyPartClick('right_leg')}>Right Leg</button>
          <button onClick={() => handleBodyPartClick('left_arm')}>Left Arm</button>
          <button onClick={() => handleBodyPartClick('torso')}>Torso</button>
          <button onClick={() => handleBodyPartClick('head')}>Head</button>
        </div>

        {/* Display Exercises for the Selected Body Part */}
        <div>
          <h3>Recommended Exercises for {selectedBodyPart ? selectedBodyPart.replace('_', ' ').toUpperCase() : 'Select a body part'}:</h3>
          {exercises.length === 0 ? (
            <p>Select a body part to get exercises.</p>
          ) : (
            <ul>
              {exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedExercise;
