import { useState, useEffect } from 'react';
import PageTransition from './PageTransition';
import { launchConfetti, launchBalloons, showToast } from './CanvasEffects';

export default function Cake() {
  const [blown, setBlown] = useState(false);
  const [msg, setMsg] = useState('Close your eyes and make a wish 💜');



  const handleBlow = () => {
    if (blown) return;
    setBlown(true);

    setTimeout(() => {
      setMsg('🌟 Your wish is on its way! May every dream come true 💜');
      launchConfetti(4500);
      launchBalloons(8);
      showToast('🌠 A wish sent to the stars!');
    }, 1200);
  };

  return (
    <PageTransition nextPath="/gallery" nextLabel="See Our Moments 📸">
      {/* Native audio tag has better chances of autoplaying when navigating via React Router */}
      <audio autoPlay loop src="/birthday-piano.mp3" />
      <section id="cake-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">Make a Wish 🕯️</h2>
          <p className="section-sub reveal">Every flame holds a wish — blow them all 💨</p>
          <div className="cake-wrap reveal">
            <div className="cake">
              <div className="candles">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="candle" key={i}>
                    <div
                      className={`flame ${blown ? 'out' : ''}`}
                      style={{ transitionDelay: `${i * 180}ms` }}
                    ></div>
                    <div className="candle-body"></div>
                  </div>
                ))}
              </div>
              <div className="tier tier-top">
                🌸 &nbsp; 🌸 &nbsp; 🌸
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
              </div>
              <div className="tier tier-mid">
                💜 &nbsp; Happy Birthday &nbsp; 💜
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
              </div>
              <div className="tier tier-bot">
                ✨ &nbsp; 18 September &nbsp; ✨
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
              </div>
              <div className="cake-plate"></div>
            </div>
          </div>
          <p className="cake-msg reveal">{msg}</p>
          <button
            className="blow-btn reveal"
            onClick={handleBlow}
            disabled={blown}
          >
            {blown ? '✨ Wish Sent!' : '🌬️ Blow the Candles!'}
          </button>
        </div>
      </section>
    </PageTransition>
  );
}
