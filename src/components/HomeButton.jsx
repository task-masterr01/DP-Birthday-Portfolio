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
    <button
      className={`home-btn ${exiting ? 'home-btn-exit' : ''}`}
      onClick={handleHome}
      aria-label="Go to home page"
    >
      <span className="home-btn-icon">🏠</span>
      <span className="home-btn-label">Home</span>
    </button>
  );
}
