import PageTransition from './PageTransition';
import { useEffect } from 'react';
import { launchConfetti, launchBalloons, showToast } from './CanvasEffects';

export default function Secret() {
  useEffect(() => {
    const t = setTimeout(() => {
      launchConfetti(3000);
      launchBalloons(6);
      showToast('🌙 A secret message just for you ✨');
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageTransition>
      <section id="secret-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          
          <div className="secret-reveal active shown" style={{ display: 'block', opacity: 1, transform: 'none', marginTop: '2rem' }}>
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
