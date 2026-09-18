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
              <h2>🌙 heyy bulbul</h2>
              <div className="secret-body">
                <p>
                 if you are seeing this i am long gone from your life ,
                </p>
                <p>
                  Dear BULBUL , <br />
                  In your life, kyi log aayenge jo tumhare khatir mehnge gifts laane ki hesiyat rakhte honge. All it takes to get an expensive gift is just money, not a single feeling behind it.

                    <br /> On the other hand, all I have is my unbounded love and care for you, which are second to none. <br />

                    Giving something that can be bought won't be able to justify your worth in my life. To me, you are worth much more than something that can be bought with money. <br />

                    Money is cheap. Time, effort, and dedication can't be bought and are priceless. <br />

                    While the world after me will try to impress you with expensive things, always remember there was someone who went ahead and built something that belongs only to you. He put his soul and endless nights into it, just for you. <br />

                    <br /> whenever u feel like u are nothing special come to this space and remember someone out there spend weeks , day to night , even in sickness to show u how much u worth in his life . <br />

                    <br /> <br /> to be honest , to me you are not mine past , not mine ex or other society given term, <br />
                    to me you are mine forever , they say in his last moments human mind rewinds all her beautiful moments for 7 minutes before death , <br />
                    and u know what u are rightious owner of alteast 5 minutes , u are the part of mine most beautiful memories that i never chose to left behind . <br />
                    may new people comes , goes , people presence in our life is variable , but to me you are mine forever , u are mine constant , <br />
                    even attempt to forget u feel like cheating , <br />
                    to me u are the rightful owner of mine heart , and i am gonna make sure ki ab koi or naa aa sake <div className=""></div>  
                    <br />
                    and in future kabhi koi puche mere baare mai pls don't introduce me as your past somewhere deep down it hurts yr <div className=""></div>

                    I won't curse you or hate you ever in my life, neither now nor ever. To me, you are someone who just can't be hated. <br />

                    But one thing I can say is, in the future when you are settled down in life, you will regret it when: <br />

                    -You realize he always came back, no matter how many times you pushed him away. <br />

                    -You realize that no matter how many times you tried to push him away, he always came back apologizing, no matter who was at fault. <br />

                    -You realize the more you tried to distance yourself, the tighter he hugged you and said, "YAHI HU MAI, KAHI NAHI JAA RAHA." <br />

                    -You realize he was never fighting with you; he was fighting for you. <br />

                    -You realize in a world full of selfishness, he was always there for you without any reason. <br />

                    -You realize no one can truly value you like he did. <br />

                    -You realize he would have fixed everything, if only you had shown enough courage to ask him to. <br />

                    -You realize asking for your well-being and success is all he ever asked of you. <br />

                    -You realize you truly lost the only person who valued you beyond measure. <br />

                    -You realize if only you had taken his side, how beautiful a life you both might have had today. <br />

                    -You realize for how much less, and for what a materialistic life, you settled down. <br />

                    -You realize without you he might have achieved all the dreams he used to say he would, but deep inside, he became a soulless person. <br />

                    -you realise he broke so beautifully he never chose to heal back <br />

                    -You realize you never asked him, "Why me? What am I even worth in your life to receive such treatment?" <br />

                    -You realize he has never been the same after saying his farewell. <br />

                    -You realize he broke so hard , he never chose another female in his life ever since her<br />
                    -You realize he loved so hard , vo uske bina'(bulbul)' bhi uska bankar hi reh gya<br />

                    -You realize he never chose to settle down in life <br />
                    don't u dare feel sad or guilty for now after reading all this save these emotions for future  <br />
                    for now let's not ruin your moments be joyful and greatful for mine effort and hardwork .
                    
                    That's all I have to say. dhyan rakhna bulbul 🤗
                     Fun fact: when I asked my AI how much this project is worth in INR, it told me this specific project is beyond any price tag, simply priceless, because: "I have seen you put your soul into this project, working endless nights. The value of something like this cannot be measured." <br />

                    Then, after its speech, it said if talking professionally, it can be valued at ₹25,000+.</p>
                
                
                <p>Happy birthday to mine forever from the very bottom of my heart. 💜</p>
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
