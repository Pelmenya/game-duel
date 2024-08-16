import React, { useState, useCallback } from 'react';
import { GameCanvas } from '../game-canvas/game-canvas';
import { SettingsMenu } from '../game-menu/game-menu';

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

    const handleHeroClick = useCallback((heroId: number) => {
        setSelectedHero(heroId);
    }, []);

    const handleCloseMenu = () => {
        setSelectedHero(null);
    };

    const handleChangeColor = (heroId: number, color: string) => {
        dispatch(setHeroColor({ id: heroId - 1, color }));
    };

    const handleChangeSpeed = (heroId: number, speed: number) => {
        dispatch(setHeroSpeed({ id: heroId - 1, speed }));
    };

    const handleChangeFrequency = (heroId: number, frequency: number) => {
        dispatch(setHeroFrequency({ id: heroId - 1, frequency }));
    };

    return (
        <div className={s.app}>
            <div className={s.wrapper}>
                <GameCanvas
                    heroes={heroes}
                    onHeroClick={handleHeroClick}
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
