import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { launchBalloons, launchConfetti } from './CanvasEffects';

const HOLD_DURATION = 5000; // 5 seconds

export default function Hero() {
  const navigate   = useNavigate();
  const timerRef   = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // fire the welcome balloons & confetti on mount
    const t = setTimeout(() => {
      launchBalloons(7);
      launchConfetti(3000);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const handleHoldStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    timerRef.current = setTimeout(() => {
      navigate('/secret');
    }, HOLD_DURATION);
  };

  const handleHoldEnd = () => {
    startedRef.current = false;
    clearTimeout(timerRef.current);
  };

  return (
    <PageTransition nextPath="/cake" nextLabel="Make a Wish 🕯️">
      <section id="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">A Special birthday present for universe's favourite girl</p>
          {/* ✏️ REPLACE "Her Name" with your friend's actual name */}
          <h1 className="hero-name">Deepanshu Poswal</h1>
          <p className="hero-sub">Happiest birthday , dear cutie pie 🎂</p>

          {/* Secret easter egg — hold for 5s to unlock /secret */}
          <div
            className="hero-pill"
            style={{ 
              cursor: 'default', 
              userSelect: 'none', 
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            onTouchCancel={handleHoldEnd}
          >
            18th September 🌸
          </div>

          <p className="scroll-hint">↓ tap continue for a surprise ↓</p>
        </div>
      </section>
    </PageTransition>
  );
}
