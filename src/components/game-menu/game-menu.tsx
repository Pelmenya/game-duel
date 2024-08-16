import React, { useState, useEffect } from 'react';

interface SettingsMenuProps {
  heroId: number;
  onClose: () => void;
  onChangeColor: (heroId: number, color: string) => void;
  onChangeSpeed: (heroId: number, speed: number) => void;
  onChangeFrequency: (heroId: number, frequency: number) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ heroId, onClose, onChangeColor, onChangeSpeed, onChangeFrequency }) => {
  const [color, setColor] = useState<string>('#000000');
  const [speed, setSpeed] = useState<number>(5);
  const [frequency, setFrequency] = useState<number>(5);

  useEffect(() => {
    // Здесь можно получить текущие параметры героя (цвет, скорость, частота) из какого-либо внешнего источника или контекста
  }, [heroId]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChangeColor(heroId, newColor);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    onChangeSpeed(heroId, newSpeed);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = Number(e.target.value);
    setFrequency(newFrequency);
    onChangeFrequency(heroId, newFrequency);
  };

  return (
    <div className="settings-menu">
      <h3>Settings for Hero {heroId}</h3>
      <label>
        Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
      <label>
        Speed:
        <input type="range" min="1" max="10" value={speed} onChange={handleSpeedChange} />
      </label>
      <label>
        Frequency:
        <input type="range" min="1" max="10" value={frequency} onChange={handleFrequencyChange} />
      </label>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

