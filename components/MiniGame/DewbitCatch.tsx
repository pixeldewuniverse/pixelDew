"use client";

import { useEffect, useRef, useState } from "react";

type Drop = { id: number; x: number; y: number; speed: number };

const GAME_WIDTH = 420;
const GAME_HEIGHT = 260;
const PLAYER_WIDTH = 42;
const PLAYER_HEIGHT = 16;

export default function DewbitCatch() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const playerX = useRef(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const nextId = useRef(0);
  const speedBoost = useRef(1);
  const frameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!running) return;
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        playerX.current = Math.max(0, playerX.current - 24);
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        playerX.current = Math.min(GAME_WIDTH - PLAYER_WIDTH, playerX.current + 24);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const loop = () => {
      setDrops((prev) => {
        const updated = prev
          .map((drop) => ({ ...drop, y: drop.y + drop.speed * speedBoost.current }))
          .filter((drop) => drop.y < GAME_HEIGHT + 20);

        const caught: number[] = [];
        updated.forEach((drop) => {
          const playerY = GAME_HEIGHT - PLAYER_HEIGHT - 8;
          const hitX = drop.x + 10 >= playerX.current && drop.x <= playerX.current + PLAYER_WIDTH;
          const hitY = drop.y >= playerY && drop.y <= playerY + PLAYER_HEIGHT;
          if (hitX && hitY) {
            caught.push(drop.id);
          }
        });

        if (caught.length > 0) {
          setScore((value) => value + caught.length);
        }

        const remaining = updated.filter((drop) => !caught.includes(drop.id));
        const missed = updated.filter((drop) => drop.y > GAME_HEIGHT - 8 && !caught.includes(drop.id));
        if (missed.length > 0) {
          setMisses((value) => value + missed.length);
        }

        return remaining;
      });

      if (Math.random() < 0.08) {
        setDrops((prev) => [
          ...prev,
          {
            id: nextId.current++,
            x: Math.random() * (GAME_WIDTH - 16),
            y: -16,
            speed: 1.6 + Math.random() * 1.8
          }
        ]);
      }

      speedBoost.current = 1 + score * 0.02;
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [running, score]);

  useEffect(() => {
    if (misses >= 3) {
      setRunning(false);
      setGameOver(true);
    }
  }, [misses]);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setDrops([]);
    setGameOver(false);
    speedBoost.current = 1;
    playerX.current = GAME_WIDTH / 2 - PLAYER_WIDTH / 2;
    setRunning(true);
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!running) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left - PLAYER_WIDTH / 2;
    playerX.current = Math.min(GAME_WIDTH - PLAYER_WIDTH, Math.max(0, x));
  };

  return (
    <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/70 shadow-insetPixel">
      <div className="flex items-center justify-between">
        <span className="font-arcade text-white">Dewbit Catch</span>
        <span className="rounded-full border border-dew-mint/40 px-2 py-1 text-[10px] text-dew-mint">Mini Game</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span>Score: {score}</span>
        <span>Miss: {misses}/3</span>
      </div>
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative mt-4 h-[240px] w-full overflow-hidden rounded-lg border border-dew-mint/30 bg-space-900/70"
        style={{ maxWidth: GAME_WIDTH }}
      >
        <div className="absolute inset-0 scanlines opacity-20" />
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="absolute h-3 w-3 rounded-sm bg-neon-cyan shadow-glowBlue"
            style={{ left: drop.x, top: drop.y }}
          />
        ))}
        <div
          className="absolute bottom-2 h-4 w-10 rounded-sm border border-dew-mint bg-dew-mint/30 shadow-glow"
          style={{ left: playerX.current }}
        />
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-space-900/80 text-center">
            <div className="font-arcade text-white">{gameOver ? "Game Over" : "Start"}</div>
            <button
              className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
              onClick={startGame}
            >
              {gameOver ? "Restart" : "Start"}
            </button>
            <div className="text-[10px] text-white/50">Use A/D or ← → or move your cursor.</div>
          </div>
        )}
      </div>
    </div>
  );
}
