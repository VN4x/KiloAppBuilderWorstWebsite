"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Pg3() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [showFart, setShowFart] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setTrail((prev) => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
      if (newTrail.length > 5) newTrail.shift();
      return newTrail;
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (!showFart && !showCongrats) {
      setShowFart(true);
    } else if (showFart && !showCongrats) {
      setShowFart(false);
      setShowCongrats(true);
      setTimeout(() => {
        router.push('/pg4');
      }, 4000);
    }
    // If clicking on congrats, do nothing, timeout will handle
  }, [showFart, showCongrats, router]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.08) {
        setShowError(true);
        setTimeout(() => setShowError(false), 2200);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pg3-page">
      {/* Custom Cursor */}
      <div
        className="pg3-cursor"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />
      {/* Trail */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="trail-dot"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: (5 - index) / 5,
          }}
        />
      ))}
      {/* Prize Image */}
      <div className="flex justify-center mt-10">
        <Image
          src="/prize.png"
          alt="Claim Prize"
          width={300}
          height={200}
          className="prize-image"
        />
      </div>
      {/* Content */}
      <div className="text-center px-4 py-8">
        <h1 className="chaotic-element fruktur text-4xl mb-4">claim prize you win</h1>
        <p className="chaotic-element fruktur text-2xl mb-2">Join our email club</p>
        <button className="chaotic-element fruktur bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mb-2 rounded">
          add credit
        </button>
        <p className="chaotic-element fruktur text-xl mb-2">soon</p>
        <p className="chaotic-element fruktur text-xl">upcoming</p>
      </div>
      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <span className="chaotic-element fruktur text-xl cursor-pointer">Facebook</span>
        <span className="chaotic-element fruktur text-xl cursor-pointer">Instagram</span>
        <span className="chaotic-element fruktur text-xl cursor-pointer">Twitter</span>
      </div>
      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-gray-800 text-white p-4 text-center chaotic-element fruktur">
        <div>Contacts: email@example.com | Phone: 123-456-7890</div>
      </footer>
      {/* Popups */}
      {showFart && <div className="popup">you fart</div>}
      {showCongrats && <div className="popup">congratulations you have claimed your value</div>}
      {showError && <div className="error-popup">error=virus</div>}
    </div>
  );
}