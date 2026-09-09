import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exiting, setExiting] = useState(false);

  // Only show on pages other than home
  if (location.pathname === '/') return null;

  const handleHome = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/'), 400);
  };

  return (
    <div className={`home-roamer ${exiting ? 'home-btn-exit' : ''}`}>
      <button
        className="home-balloon-btn"
        onClick={handleHome}
        aria-label="Go to home page"
      >
        <div className="home-balloon-string"></div>
        <span className="home-btn-icon">🎈</span>
        <span className="home-btn-label">Home</span>
      </button>
    </div>
  );
}

