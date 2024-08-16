import React, { useState, useCallback } from 'react';



import './app.css'
import { THeroSettings } from './types/t-hero-settings';

const App: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<number | null>(null);
  const [heroSettings, setHeroSettings] = useState<{ [key: number]: THeroSettings }>({
    1: { color: 'red', speed: 0.1, frequency: 2 },
    2: { color: 'blue', speed: 0.1, frequency: 2 },
  });

  const handleHeroClick = useCallback((heroId: number) => {
    setSelectedHero(heroId);
  }, []);

  const handleCloseMenu = () => {
    setSelectedHero(null);
  };

  const handleChangeColor = (heroId: number, color: string) => {
    setHeroSettings(prevSettings => ({
      ...prevSettings,
      [heroId]: { ...prevSettings[heroId], color }
    }));
  };

  const handleChangeSpeed = (heroId: number, speed: number) => {
    setHeroSettings(prevSettings => ({
      ...prevSettings,
      [heroId]: { ...prevSettings[heroId], speed }
    }));
  };

  const handleChangeFrequency = (heroId: number, frequency: number) => {
    setHeroSettings(prevSettings => ({
      ...prevSettings,
      [heroId]: { ...prevSettings[heroId], frequency }
    }));
  };

  return (
    <div className="app">
    </div>
  );
};

export default App;
