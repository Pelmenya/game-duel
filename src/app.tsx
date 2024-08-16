import React, { useState, useCallback } from 'react';
import { GameCanvas } from './components/game-canvas/game-canvas';
import { SettingsMenu } from './components/game-menu/game-menu';
import { THeroSettings } from './types/t-hero-settings';

import './app.css'

export const App: React.FC = () => {
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
      <GameCanvas onHeroClick={handleHeroClick} heroSettings={heroSettings} />
      {selectedHero !== null && (
        <SettingsMenu
          heroId={selectedHero}
          onClose={handleCloseMenu}
          onChangeColor={handleChangeColor}
          onChangeSpeed={handleChangeSpeed}
          onChangeFrequency={handleChangeFrequency}
        />
      )}
    </div>
  );
};