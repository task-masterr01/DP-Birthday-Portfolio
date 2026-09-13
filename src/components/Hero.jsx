import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { launchBalloons, launchConfetti } from './CanvasEffects';

const SECRET_HOLD_DURATION = 5000; // 5 seconds for secret page

export default function Hero() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const secretTimerRef = useRef(null);
  const secretStartedRef = useRef(false);
  const gateIntervalRef = useRef(null);

  useEffect(() => {
    // Only fire balloons & confetti once unlocked
    if (!unlocked) return;
    const t = setTimeout(() => {
      launchBalloons(7);
      launchConfetti(3000);
    }, 900);
    return () => clearTimeout(t);
  }, [unlocked]);

  // --- Gate Click Logic ---
  const handleGateClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 10) {
        setUnlocked(true);
      }
      return next;
    });
  };

  // --- Secret Page Logic ---
  const handleSecretHoldStart = () => {
    if (secretStartedRef.current) return;
    secretStartedRef.current = true;
    secretTimerRef.current = setTimeout(() => {
      navigate('/secret');
    }, SECRET_HOLD_DURATION);
  };

  const handleSecretHoldEnd = () => {
    secretStartedRef.current = false;
    clearTimeout(secretTimerRef.current);
  };

  if (!unlocked) {
    const progress = (clickCount / 10) * 100;
    
    return (
      <section id="hero" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h2 className="section-title reveal" style={{fontSize: '1.8rem', textAlign: 'center', marginBottom: '25px', padding: '0 20px'}}>
          Make an effort to get your birthday present 🎁
        </h2>
        <div
          className="hero-pill"
          style={{ 
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer', 
            userSelect: 'none', 
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onClick={handleGateClick}
        >
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: `${progress}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            transition: 'width 100ms ease-out'
          }}></div>
          <span style={{ position: 'relative', zIndex: 2 }}>Click me 10 times 🌸</span>
        </div>
        <p className="letter-photo-hint" style={{marginTop: '15px'}}>
          {clickCount === 0 ? "Let's see how much you want it!" : `Only ${10 - clickCount} clicks left!`}
        </p>
      </section>
    );
  }

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
            onMouseDown={handleSecretHoldStart}
            onMouseUp={handleSecretHoldEnd}
            onMouseLeave={handleSecretHoldEnd}
            onTouchStart={handleSecretHoldStart}
            onTouchEnd={handleSecretHoldEnd}
            onTouchCancel={handleSecretHoldEnd}
          >
            18th September 🌸
          </div>

          <p className="scroll-hint">↓ tap continue for a surprise ↓</p>
        </div>
      </section>
    </PageTransition>
  );
}
