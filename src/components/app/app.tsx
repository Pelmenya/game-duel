import React, { useState, useCallback } from 'react';
import { GameCanvas } from '../game-canvas/game-canvas';
import { SettingsMenu } from '../game-menu/game-menu';
import { THeroSettings } from '../../types/t-hero-settings';

import s from './app.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectHeroes } from '../../redux/selectors/gameSettingsSelectors';
import {
    setHeroColor,
    setHeroFrequency,
    setHeroSpeed,
} from '../../redux/slices/gameSettingsSlice';

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const heroes = useAppSelector(selectHeroes);

    const [selectedHero, setSelectedHero] = useState<number | null>(null);
    const [heroSettings, setHeroSettings] = useState<{
        [key: number]: THeroSettings;
    }>({
        1: { color: 'rgba(0, 0, 0, 0.7)', speed: 1, frequency: 2 },
        2: { color: '#ec8928', speed: 1, frequency: 2 },
    });

    const handleHeroClick = useCallback((heroId: number) => {
        setSelectedHero(heroId);
    }, []);

    const handleCloseMenu = () => {
        setSelectedHero(null);
    };

    const handleChangeColor = (heroId: number, color: string) => {
        setHeroSettings((prevSettings) => ({
            ...prevSettings,
            [heroId]: { ...prevSettings[heroId], color },
        }));
        dispatch(setHeroColor({ id: heroId - 1, color }));
    };

    const handleChangeSpeed = (heroId: number, speed: number) => {
        setHeroSettings((prevSettings) => ({
            ...prevSettings,
            [heroId]: { ...prevSettings[heroId], speed },
        }));
        dispatch(setHeroSpeed({ id: heroId - 1, speed }));
    };

    const handleChangeFrequency = (heroId: number, frequency: number) => {
        setHeroSettings((prevSettings) => ({
            ...prevSettings,
            [heroId]: { ...prevSettings[heroId], frequency },
        }));
        dispatch(setHeroFrequency({ id: heroId - 1, frequency }));
    };

    return (
        <div className={s.app}>
            <div className={s.wrapper}>
                <GameCanvas
                    onHeroClick={handleHeroClick}
                    heroSettings={heroSettings}
                />
                {selectedHero && (
                    <div className={selectedHero === 1 ? s.left : s.right}>
                        <SettingsMenu
                            hero={heroes[selectedHero - 1]}
                            onClose={handleCloseMenu}
                            onChangeColor={handleChangeColor}
                            onChangeSpeed={handleChangeSpeed}
                            onChangeFrequency={handleChangeFrequency}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
