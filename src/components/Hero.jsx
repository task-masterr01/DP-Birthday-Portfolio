import PageTransition from './PageTransition';
import { launchBalloons, launchConfetti } from './CanvasEffects';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // fire the welcome balloons & confetti on mount
    const t = setTimeout(() => {
      launchBalloons(7);
      launchConfetti(3000);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageTransition nextPath="/cake" nextLabel="Make a Wish 🕯️">
      <section id="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">A Special birthday present for universe's favourite girl</p>
          {/* ✏️ REPLACE "Her Name" with your friend's actual name */}
          <h1 className="hero-name">Her Name</h1>
          <p className="hero-sub">Happiest birthday , dear Deepanshu 🎂</p>
          <div className="hero-pill">18th September 🌸</div>
          <p className="scroll-hint">↓ tap continue for a surprise ↓</p>
        </div>
      </section>
    </PageTransition>
  );
}
