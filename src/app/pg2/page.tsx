"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Pg2() {
  const router = useRouter();
  const [fartPopup, setFartPopup] = useState(false);
  const [cleanPopup, setCleanPopup] = useState(false);
  const [addCreditPopup, setAddCreditPopup] = useState(false);
  const [nxtLvlPopup, setNxtLvlPopup] = useState(false);
  const [questionFlash, setQuestionFlash] = useState(true);
  const [fartFlash, setFartFlash] = useState(true);
  const [cleanFlash, setCleanFlash] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const mouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('page2-cursor-container');
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('page2-cursor-container');
    };
  }, []);

  useEffect(() => {
    // Slow flash for question
    const qInterval = setInterval(() => setQuestionFlash(!questionFlash), 2000);
    return () => clearInterval(qInterval);
  }, [questionFlash]);

  // Random flash for fart and clean
  useEffect(() => {
    const fartInterval = setInterval(() => setFartFlash(Math.random() > 0.5), 500 + Math.random() * 1000);
    const cleanInterval = setInterval(() => setCleanFlash(Math.random() > 0.5), 500 + Math.random() * 1000);
    return () => {
      clearInterval(fartInterval);
      clearInterval(cleanInterval);
    };
  }, []);

  const handleFartClick = () => {
    setFartPopup(true);
    setTimeout(() => {
      setFartPopup(false);
      setNxtLvlPopup(true);
    }, 6000);
  };

  const handleCleanClick = () => {
    setCleanPopup(true);
    setTimeout(() => {
      setCleanPopup(false);
      setNxtLvlPopup(true);
    }, 6000);
  };

  const handleFakeLinkClick = () => {
    setAddCreditPopup(true);
    setTimeout(() => setAddCreditPopup(false), 6000);
  };

  const handleNxtLvl = () => {
    router.push('/pg3');
  };

  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

  return (
    <div className="min-h-screen relative bg-[#608040] p-4 overflow-hidden">
      {/* Cursor */}
      <div 
        ref={mouseRef}
        className="page2-cursor"
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />

      {/* Lorem behind doll */}
      <div className="lorem-ipsum absolute" style={{ left: '18%', top: '12%', zIndex: 1 }}>
        <p>{loremText}</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Nisi ut aliquip ex ea commodo consequat.</p>
      </div>

      {/* Doll image with glitch */}
      <div className="glitch shake jitter color-cycle absolute" style={{ left: '18%', top: '12%', zIndex: 2 }}>
        <Image src="/doll.png" alt="babydoll" width={200} height={200} className="shake jitter" />
      </div>

      {/* Loading bar - flicker */}
      <div className="flicker absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-red-500">
        <div className="bg-green-500 h-full animate-pulse" style={{ width: '100%' }} />
      </div>

      {/* Question text - flash slow */}
      <div className={`text-center text-2xl flicker ${questionFlash ? '' : 'opacity-50'} shake`} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)' }}>
        YOU MUST ANWSER THESE GUESTIONS GORRECTLY
      </div>

      {/* Buttons - random flash */}
      <div className="absolute top-50% left-1/2 transform -translate-x-1/2 flex flex-col gap-4">
        <button 
          onClick={handleFartClick}
          className={`bg-yellow-500 text-black p-4 rounded-none ${fartFlash ? 'flicker color-cycle' : 'opacity-30'} shake jitter`}
        >
          I FART
        </button>
        <button 
          onClick={handleCleanClick}
          className={`bg-blue-500 text-white p-4 rounded-none ${cleanFlash ? 'flicker color-cycle' : 'opacity-30'} shake jitter`}
        >
          I am CLEAN
        </button>
      </div>

      {/* Fake links */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-4 text-sm">
        <a href="#" onClick={handleFakeLinkClick} className="color-cycle shake">photo with babydoll</a>
        <a href="#" onClick={handleFakeLinkClick} className="fruktur color-cycle shake">add credit</a>
        <a href="#" onClick={handleFakeLinkClick} className="color-cycle shake">soon</a>
        <a href="#" onClick={handleFakeLinkClick} className="color-cycle shake">upcoming</a>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 flex justify-between items-center shake flicker">
        <span>E 9 L</span>
        <div className="flex gap-4">
          <a href="#" className="color-cycle">UPCOMING</a>
          <a href="#" className="color-cycle">SOON</a>
        </div>
      </div>

      {/* Popups */}
      {fartPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-500 text-white p-8 text-4xl flicker shake jitter">
            fart again
          </div>
        </div>
      )}

      {cleanPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-8 text-4xl flex flex-col items-center gap-4 flicker shake jitter">
            <div style={{ fontSize: '5rem' }}>👍</div> {/* Ugly thumb up */}
            you are clean
          </div>
        </div>
      )}

      {addCreditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-500 text-white p-8 text-2xl fruktur flicker shake jitter">
            add credit
          </div>
        </div>
      )}

      {nxtLvlPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-yellow-500 text-black p-8 text-4xl flex flex-col items-center gap-4 flicker shake jitter">
            nxt lvl
            <button onClick={handleNxtLvl} className="bg-red-500 text-white px-4 py-2 mt-4 shake">Proceed</button>
          </div>
        </div>
      )}
    </div>
  );
}