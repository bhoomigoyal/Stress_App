import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './MoodTracker.css'; // Import the CSS file

const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Relaxed' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😩', label: 'Tired' },
  { emoji: '😄', label: 'Excited' },
  { emoji: '😴', label: 'Sleepy' },
  { emoji: '😠', label: 'Angry' },
];

// Stress level mapping for each mood
const MOOD_STRESS_LEVELS = {
  '😊': 1,   // Happy
  '😌': 2,   // Relaxed
  '🙂': 3,   // Okay
  '😔': 4,   // Sad
  '😐': 3,   // Neutral
  '😩': 5,   // Tired
  '😄': 1,   // Excited
  '😴': 4,   // Sleepy
  '😠': 5,   // Angry
};

// Function to generate color class based on stress level
const getColorClass = (stressLevel) => {
  switch (stressLevel) {
    case 1: return 'low';
    case 2: return 'medium';
    case 3: return 'medium';
    case 4: return 'high';
    case 5: return 'very-high';
    default: return '';
  }
};

const MoodHeatmap = ({ moods }) => {
  // Sort moods by date and get the last 7 entries
  const recentMoods = moods.slice(-7);

  return (
    <div className="heatmap">
      <h2 className="text-lg font-bold mb-2 text-purple-700">Mood & Stress Tracking</h2>
      <div className="flex justify-between space-x-2">
        {recentMoods.map((mood, index) => (
          <div 
            key={index} 
            className={`heatmap-box ${getColorClass(MOOD_STRESS_LEVELS[mood.emoji])}`}
          >
            <span className="text-2xl">{mood.emoji}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-600">Stress Level: Low → High</p>
      </div>
    </div>
  );
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const recordMood = () => {
    if (selectedMood !== null) {
      const newMoodEntry = {
        ...MOODS[selectedMood],
        timestamp: new Date()
      };
      
      setMoodHistory(prevHistory => [...prevHistory, newMoodEntry]);
      console.log('Mood recorded:', MOODS[selectedMood].label);
    }
  };

  return (
    <div className="mood-tracker">
      <button className="mood-button" onClick={() => {/* Handle back navigation */}}>
        <ChevronLeft className="text-black" size={24} />
      </button>

      <MoodHeatmap moods={moodHistory} />
      

      <div className="mood-header">
        <h1>Let's Track Your Mood!</h1>
        <p>How are you feeling today?</p>
      </div>

      <div className="mood-buttons">
        {MOODS.map((mood, index) => (
          <button
            key={index}
            className={`mood-button ${selectedMood === index ? 'selected' : ''}`}
            onClick={() => setSelectedMood(index)}
          >
            <span className="emoji">{mood.emoji}</span>
            <span className="label">{mood.label}</span>
          </button>
        ))}
      </div>

      <button
        className={`record-button ${selectedMood !== null ? '' : 'disabled'}`}
        disabled={selectedMood === null}
        onClick={recordMood}
      >
        Let us Record it on Heatmap!
      </button>
    </div>
  );
};

export default MoodTracker;
