import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomeButton({ exiting, setExiting }) {
  const navigate = useNavigate();
  const location = useLocation();
  const posRef = useRef({ x: 20, y: 20 });
  const velRef = useRef({ x: 0.18, y: 0.12 });
  const rafRef = useRef(null);
  const [style, setStyle] = useState({ left: '20px', top: '20px' });

  const BTN_W = 90;  // approx button width px
  const BTN_H = 36;  // approx button height px

  useEffect(() => {
    const drift = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let { x, y } = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      // Slightly randomize velocity each frame for organic feel
      vx += (Math.random() - 0.5) * 0.03;
      vy += (Math.random() - 0.5) * 0.03;

      // Clamp velocity so it never moves too fast or stops
      const MAX_SPD = 0.55;
      const MIN_SPD = 0.08;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_SPD) { vx = (vx / speed) * MAX_SPD; vy = (vy / speed) * MAX_SPD; }
      if (speed < MIN_SPD) { vx *= 1.05; vy *= 1.05; }

      x += vx;
      y += vy;

      // Bounce off walls
      if (x < 10)            { x = 10;            vx = Math.abs(vx); }
      if (x > vw - BTN_W - 10) { x = vw - BTN_W - 10; vx = -Math.abs(vx); }
      if (y < 10)            { y = 10;            vy = Math.abs(vy); }
      if (y > vh - BTN_H - 10) { y = vh - BTN_H - 10; vy = -Math.abs(vy); }

      posRef.current = { x, y };
      velRef.current = { x: vx, y: vy };
      setStyle({ left: `${x}px`, top: `${y}px` });
      rafRef.current = requestAnimationFrame(drift);
    };

    rafRef.current = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (location.pathname === '/') return null;

  const handleHome = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/'), 600);
  };

  return (
    <button
      className={`home-float-btn ${exiting ? 'home-btn-exit' : ''}`}
      style={style}
      onClick={handleHome}
      aria-label="Go to home page"
    >
      <span className="home-btn-icon">🏠</span>
      <span className="home-btn-label">Home</span>
    </button>
  );
}
