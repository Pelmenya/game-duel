import React, { useRef, useEffect, useState } from 'react';
import { THero } from '../../types/t-hero';
import { TSpell } from '../../types/t-spell';
import { GameScores } from '../game-scores/game-scores';
import { TPoint } from '../../types/t-point';

import s from './game-canvas.module.css';

export type TGameCanvasProps = {
    heroes: THero[];
    onHeroClick: (heroId: number) => void;
};

export const GameCanvas: React.FC<TGameCanvasProps> = ({
    heroes,
    onHeroClick,
}) => {
    const [mousePos, setMousePos] = useState<TPoint>({
        x: 50,
        y: 50,
    });
    const [scores, setScores] = useState<{ [key: number]: number }>({
        1: 0,
        2: 0,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroesRef = useRef<THero[]>([{...heroes[0]},{...heroes[1]}]);
    const spellsRef = useRef<TSpell[]>([]);
    const cursor = useRef<{x: number; y: number}>(mousePos);


    const drawheroesRef = (ctx: CanvasRenderingContext2D) => {
        heroesRef.current.forEach((hero) => {
            ctx.beginPath();
            ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
            ctx.fillStyle = hero.color;
            ctx.fill();
            ctx.closePath();
        });
    };

    const drawspellsRef = (ctx: CanvasRenderingContext2D) => {
        spellsRef.current.forEach((spell) => {
            ctx.beginPath();
            ctx.arc(spell.x, spell.y, spell.radius, 0, Math.PI * 2);
            ctx.fillStyle = spell.color;
            ctx.fill();
            ctx.closePath();
        });
    };

    const drawCursor = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2); // Радиус курсора - 5
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
        ctx.fill();
        ctx.closePath();
      };

    const updateheroesRef = () => {
        heroesRef.current.forEach((hero) => {
            hero.y += hero.speed * hero.direction;
            if (hero.y <= hero.radius || hero.y >= 600 - hero.radius) {
                hero.direction *= -1;
            }
            const dx = hero.x - cursor.current.x;
            const dy = hero.y - cursor.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= hero.radius + 5) {
                // 5 - радиус курсора мыши
                hero.direction *= -1;
            }
        });
    };

    const updatespellsRef = () => {
        spellsRef.current.forEach((spell) => {
            spell.x += spell.speed * spell.direction;
        });
        // Удаление заклинаний, вышедших за границы поля
        spellsRef.current = spellsRef.current.filter(
            (spell) => spell.x > 0 && spell.x < 800
        );
    };

    const shootSpell = (hero: THero) => {
        spellsRef.current.push({
            x: hero.x + hero.radius * hero.direction,
            y: hero.y,
            radius: 5,
            color: hero.color,
            speed: 5,
            direction: hero.direction,
            ownerId: hero.id,
            frequency: hero.frequency
        });
    };

    const checkCollisions = () => {
        spellsRef.current.forEach((spell) => {
            heroesRef.current.forEach((hero) => {
                if (hero.id !== spell.ownerId && isColliding(spell, hero)) {
                    spellsRef.current = spellsRef.current.filter((s) => s !== spell);
                    setScores((prevScores) => ({
                        ...prevScores,
                        [spell.ownerId]: prevScores[spell.ownerId] + 1,
                    }));
                }
            });
        });
    };

    const isColliding = (spell: TSpell, hero: THero) => {
        const dx = spell.x - hero.x;
        const dy = spell.y - hero.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < spell.radius + hero.radius;
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const clickedHero = heroesRef.current.find((hero) => {
                const dx = x - hero.x;
                const dy = y - hero.y;
                return Math.sqrt(dx * dx + dy * dy) < hero.radius + 5;
            });
            if (clickedHero) {
                onHeroClick(clickedHero.id);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawheroesRef(ctx);
                drawspellsRef(ctx);
                drawCursor(ctx);
                updateheroesRef();
                updatespellsRef();
                checkCollisions();
                requestAnimationFrame(render);
            };
            render();
        }
    }, []);

    useEffect(() => {
        const intervalIds = heroesRef.current.map((hero) => {
            const settings = heroes[hero.id - 1];
            hero.color = settings.color;
            hero.speed = settings.speed / 10;
            return setInterval(
                () => shootSpell(hero),
                1000 / settings.frequency
            );
        });

        return () => {
            intervalIds.forEach(clearInterval);
        };
    }, [heroes]);

    useEffect(() => {
        cursor.current.x = mousePos.x;
        cursor.current.y = mousePos.y;
    }, [cursor, mousePos]);


    return (
        <div className={s.wrapper}>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
            />
            <GameScores scores={scores} />
        </div>
    );
};
