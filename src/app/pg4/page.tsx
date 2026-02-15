"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Pg4() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [showDontFart, setShowDontFart] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setTrail((prev) => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
      if (newTrail.length > 5) newTrail.shift();
      return newTrail;
    });
  }, []);

  const triggerEndSequence = useCallback(() => {
    if (!showDontFart && !showEndGame) {
      setShowDontFart(true);
      setTimeout(() => {
        setShowDontFart(false);
        setShowEndGame(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }, 2000);
    }
  }, [showDontFart, showEndGame, router]);

  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    triggerEndSequence();
  }, [triggerEndSequence]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    triggerEndSequence();
  }, [triggerEndSequence]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMouseMove, handleClick, handleKeyDown]);

  return (
    <div className="pg4-page">
      {/* Custom Cursor */}
      <div
        className="pg4-cursor"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
      {/* Trail */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="pg4-trail-dot"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (5 - index) / 5,
          }}
        />
      ))}
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="pg4-square">
          <h1 className="pg4-text">Go work now</h1>
        </div>
      </div>
      {/* Popups */}
      {showDontFart && <div className="pg4-popup">don&apos;t fart</div>}
      {showEndGame && <div className="pg4-popup">end of game</div>}
    </div>
  );
}
