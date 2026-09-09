import { useLocation, useNavigate } from 'react-router-dom';

export default function HomeButton({ exiting, setExiting }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show on pages other than home
  if (location.pathname === '/') return null;

  const handleHome = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/'), 600); // match PageTransition exit duration
  };


  return (
    <div className={`home-roamer ${exiting ? 'home-btn-exit' : ''}`}>
      <button
        className="home-float-btn"
        onClick={handleHome}
        aria-label="Go to home page"
      >
        <span className="home-btn-icon">🏠</span>
        <span className="home-btn-label">Home</span>
      </button>
    </div>
  );
}


