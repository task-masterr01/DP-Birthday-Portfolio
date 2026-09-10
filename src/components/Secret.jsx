import { useState, useRef } from 'react';
import PageTransition from './PageTransition';
import { launchConfetti, launchBalloons, showToast } from './CanvasEffects';

export default function Secret() {
  const [unlocked, setUnlocked] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  const CIRC = 2 * Math.PI * 50;
  const DUR = 3000;

  const t0Ref = useRef(null);
  const rafRef = useRef(null);

  const onStart = () => {
    if (unlocked) return;
    setHolding(true);
    t0Ref.current = Date.now();
    frameLoop();
  };

  const onStop = () => {
    if (unlocked) return;
    setHolding(false);
    setProgress(0);
    cancelAnimationFrame(rafRef.current);
  };

  const frameLoop = () => {
    const now = Date.now();
    const p = Math.min((now - t0Ref.current) / DUR, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(frameLoop);
    } else {
      doUnlock();
    }
  };

  const doUnlock = () => {
    setUnlocked(true);
    setHolding(false);
    setProgress(1);
    setTimeout(() => {
      launchConfetti(3000);
      launchBalloons(6);
      showToast('🌙 A secret message just for you ✨');
    }, 100);
  };

  const strokeDashoffset = CIRC * (1 - progress);
  const sc = Math.ceil((DUR - progress * DUR) / 1000);

  // Last page — no nextPath
  return (
    <PageTransition>
      <section id="secret-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">A Secret Just for You 🔐</h2>
          <p className="secret-hint reveal">
            ✨ Hold the button below for 3 seconds to unlock something only you should read ✨
          </p>
          <div className="hold-wrap reveal">
            <button
              className="hold-btn"
              aria-label="Hold to unlock secret message"
              onMouseDown={onStart}
              onMouseUp={onStop}
              onMouseLeave={onStop}
              onTouchStart={onStart}
              onTouchEnd={onStop}
              onTouchCancel={onStop}
            >
              <svg className="ring-svg" viewBox="0 0 112 112" aria-hidden="true">
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9B1FF" />
                    <stop offset="100%" stopColor="#FFB6D9" />
                  </linearGradient>
                </defs>
                <circle className="ring-track" cx="56" cy="56" r="50" />
                <circle
                  className="ring-fill"
                  cx="56" cy="56" r="50"
                  style={{
                    strokeDasharray: CIRC,
                    strokeDashoffset,
                    transition: holding
                      ? 'stroke-dashoffset .05s linear'
                      : 'stroke-dashoffset .3s ease',
                  }}
                />
              </svg>
              <span className="hold-icon">
                {unlocked ? '🌙' : progress > 0.5 ? '🔓' : '🔐'}
              </span>
            </button>
            <p className="hold-lbl">
              {unlocked
                ? '✨ Unlocked!'
                : holding && sc > 0
                  ? `Hold for ${sc}s…`
                  : holding && sc <= 0
                    ? 'Unlocking ✨'
                    : 'Press and hold'}
            </p>
          </div>

          <div
            className={`secret-reveal ${unlocked ? 'active shown' : ''}`}
            style={unlocked ? { display: 'block', opacity: 1, transform: 'none' } : {}}
          >
            <div className="secret-card">
              <h2>🌙 Just Between Us</h2>
              <div className="secret-body">
                <p>
                  If you found this, it means you held on — and that's kind of exactly like you.
                  You always hold on. 🌙
                </p>
                <p>
                  This is where the real stuff lives. The things I'd whisper but could never say
                  out loud. The inside jokes nobody else would get. The memories that are only ours.
                </p>
                {/* ✏️ REPLACE THIS with your private secret message — just for her */}
                <p>
                  [Write your private message here — the things only you two know, the moments
                  that define your story, the words you've been meaning to say. This space is
                  just for you both.]
                </p>
                <p>Happy birthday, from the very bottom of my heart. 💜</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Made with 💜 · For the most special person · September 18th</p>
      </footer>
    </PageTransition>
  );
}
