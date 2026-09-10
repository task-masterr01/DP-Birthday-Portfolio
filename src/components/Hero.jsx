import PageTransition from './PageTransition';
import { launchBalloons, launchConfetti } from './CanvasEffects';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const holdTimer = useRef(null);

  useEffect(() => {
    // fire the welcome balloons & confetti on mount
    const t = setTimeout(() => {
      launchBalloons(7);
      launchConfetti(3000);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const handleHoldStart = () => {
    holdTimer.current = setTimeout(() => {
      navigate('/secret');
    }, 5000);
  };

  const handleHoldEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <PageTransition nextPath="/cake" nextLabel="Make a Wish 🕯️">
      <section id="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">A Special birthday present for universe's favourite girl</p>
          {/* ✏️ REPLACE "Her Name" with your friend's actual name */}
          <h1 className="hero-name">Her Name</h1>
          <p className="hero-sub">Happiest birthday , dear cutie pie 🎂</p>
          <div 
            className="hero-pill"
            style={{ cursor: 'default', userSelect: 'none', WebkitUserSelect: 'none' }}
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
