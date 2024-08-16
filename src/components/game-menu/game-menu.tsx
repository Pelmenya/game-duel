import React, { useState, useEffect } from 'react';
import s from './game-menu.module.css';
import { THero } from '../../types/t-hero';

interface SettingsMenuProps {
    hero: THero;
    onClose: () => void;
    onChangeColor: (heroId: number, color: string) => void;
    onChangeSpeed: (heroId: number, speed: number) => void;
    onChangeFrequency: (heroId: number, frequency: number) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
    hero,
    onClose,
    onChangeColor,
    onChangeSpeed,
    onChangeFrequency,
}) => {
    const [color, setColor] = useState<string>(hero.color);
    const [speed, setSpeed] = useState<number>(hero.speed);
    const [frequency, setFrequency] = useState<number>(hero.frequency);

    useEffect(() => {
        setColor(hero.color);
        setSpeed(hero.speed);
        setFrequency(hero.frequency)
    }, [hero]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
        onChangeColor(hero.id, newColor);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = Number(e.target.value);
        setSpeed(newSpeed);
        onChangeSpeed(hero.id, newSpeed);
    };

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFrequency = Number(e.target.value);
        setFrequency(newFrequency);
        onChangeFrequency(hero.id, newFrequency);
    };

    return (
        <div className={s.menu}>
            <fieldset className={s.fieldset}>
                <legend className={s.legend}>Game Settings</legend>
                <h3>Hero #{hero.id}</h3>
                <div className={s.wrapper}>
                    <label htmlFor="color">Color:</label>
                    <input
                        id="color"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>
                <label htmlFor="speed">Speed:</label>
                <input
                    id="speed"
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={handleSpeedChange}
                />

                <label htmlFor='frequency'>Frequency:</label>
                <input
                    id="frequency"
                    type="range"
                    min="1"
                    max="10"
                    value={frequency}
                    onChange={handleFrequencyChange}
                />

                <button className={s.button} onClick={onClose}>
                    Close
                </button>
            </fieldset>
        </div>
    );
};
