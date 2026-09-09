import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Wraps a page in a full-screen container with a fade-up entrance animation.
 * Each page fills the viewport so every route feels like a "landing page".
 */
export default function PageTransition({ children, nextPath, nextLabel }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    // small delay to trigger the CSS entrance transition
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Re-run the reveal observer whenever the page enters
  useEffect(() => {
    if (!visible || !containerRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    containerRef.current.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  const handleNext = () => {
    if (!nextPath) return;
    setExiting(true);
    setTimeout(() => navigate(nextPath), 600); // match the CSS exit duration
  };

  return (
    <div
      ref={containerRef}
      className={`page-transition ${visible ? 'page-enter' : ''} ${exiting ? 'page-exit' : ''}`}
    >
      <div className="page-content">
        {children}
      </div>

      {nextPath && (
        <div className="next-btn-wrap">
          <button className="next-btn" onClick={handleNext}>
            <span className="next-btn-text">{nextLabel || 'Continue'}</span>
            <span className="next-btn-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
