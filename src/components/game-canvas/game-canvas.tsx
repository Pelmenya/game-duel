import React, { useRef, useEffect, useState } from 'react';
import { THeroSettings } from '../../types/t-hero-settings';
import { THero } from '../../types/t-hero';
import { TSpell } from '../../types/t-spell';

export type TGameCanvasProps = {
    onHeroClick: (heroId: number) => void;
    heroSettings: { [key: number]: THeroSettings };
};

export const GameCanvas: React.FC<TGameCanvasProps> = ({
    onHeroClick,
    heroSettings,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [scores, setScores] = useState<{ [key: number]: number }>({
        1: 0,
        2: 0,
    });
    const heroes = useRef<THero[]>([
        {
            id: 1,
            x: 50,
            y: 300,
            radius: 20,
            color: heroSettings[1].color,
            speed: heroSettings[1].speed / 10,
            direction: 1,
        },
        {
            id: 2,
            x: 750,
            y: 300,
            radius: 20,
            color: heroSettings[2].color,
            speed: heroSettings[2].speed / 10,
            direction: -1,
        },
    ]);
    const spells = useRef<TSpell[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawHeroes(ctx);
                drawSpells(ctx);
                updateHeroes();
                updateSpells();
                checkCollisions();
                requestAnimationFrame(render);
            };
            render();
        }
    }, []);

    useEffect(() => {
        const intervalIds = heroes.current.map((hero) => {
            const settings = heroSettings[hero.id];
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
    }, [heroSettings]);

    useEffect(() => {
        heroes.current.forEach((hero) => {
            const dx = hero.x - mousePos.x;
            const dy = hero.y - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < hero.radius + 10) {
                // 10 - радиус курсора мыши
                hero.direction *= -1;
            }
        });
    }, [heroes, mousePos]);

    const drawHeroes = (ctx: CanvasRenderingContext2D) => {
        heroes.current.forEach((hero) => {
            ctx.beginPath();
            ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
            ctx.fillStyle = hero.color;
            ctx.fill();
            ctx.closePath();
        });
    };

    const drawSpells = (ctx: CanvasRenderingContext2D) => {
        spells.current.forEach((spell) => {
            ctx.beginPath();
            ctx.arc(spell.x, spell.y, spell.radius, 0, Math.PI * 2);
            ctx.fillStyle = spell.color;
            ctx.fill();
            ctx.closePath();
        });
    };

    const updateHeroes = () => {
        heroes.current.forEach((hero) => {
            hero.y += hero.speed * hero.direction;
            if (hero.y <= hero.radius || hero.y >= 600 - hero.radius) {
                hero.direction *= -1;
            }
        });
    };

    const updateSpells = () => {
        spells.current.forEach((spell) => {
            spell.x += spell.speed * spell.direction;
        });
        // Удаление заклинаний, вышедших за границы поля
        spells.current = spells.current.filter(
            (spell) => spell.x > 0 && spell.x < 800
        );
    };

    const shootSpell = (hero: THero) => {
        spells.current.push({
            x: hero.x + hero.radius * hero.direction,
            y: hero.y,
            radius: 5,
            color: hero.color,
            speed: 5,
            direction: hero.direction,
            ownerId: hero.id,
        });
    };

    const checkCollisions = () => {
        spells.current.forEach((spell) => {
            heroes.current.forEach((hero) => {
                if (hero.id !== spell.ownerId && isColliding(spell, hero)) {
                    spells.current = spells.current.filter((s) => s !== spell);
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
            const clickedHero = heroes.current.find((hero) => {
                const dx = x - hero.x;
                const dy = y - hero.y;
                return Math.sqrt(dx * dx + dy * dy) < hero.radius;
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

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
            />
            <div className="scores">
                <div>Hero 1 Score: {scores[1]}</div>
                <div>Hero 2 Score: {scores[2]}</div>
            </div>
        </div>
    );
};
