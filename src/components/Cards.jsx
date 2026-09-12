import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { launchConfetti, showToast } from './CanvasEffects';

/* ✏️  EDIT YOUR CARDS HERE */
const CARDS = [
  {
    category: 'A Little Compliment 💜',
    emoji: '💜',
    message: 'They say men are the strongest, but they clearly haven\'t met miss. Deepnashu -- you are someone with the kindest heart, the purest intentions , the kindest soul ,the ultimate definition of a green flag, your presence feels like a blessing ',
  },
  {
    category: 'A Shayari 🌸',
    emoji: '🌸',
    message: 'Gulab se gore gaal rakhti hai .\nKhayalo mai gum karne layak julfo ke jaal rakhti hai . \t Mann ko baichain rakhti hai dil ko behal rakhti hai\n Chehre pe uske kudrati noor bin makeup bhi bawal lagti hai  .',
  },
  {
    category: "Something I'm Grateful For 🙏",
    emoji: '🙏',
    message: 'I am genuinely grateful that the universe decided we should know each other. Not everyone gets a person who feels like home — I got lucky. Really lucky.',
  },
  {
    category: 'A Wish for You ⭐',
    emoji: '⭐',
    message: 'May your life be filled with the happiest of moments. \nMay you conquer all the hidden battles within you, \nand may your success shine so bright that it blinds all evil eyes  ',
  },
  {
    category: 'From the Heart 💌',
    emoji: '💌',
    // ✏️ REPLACE with your own private message
    message: 'May your Kanha bless you with all the happiness in the world. \nI truly wish to see you reach such incredible heights that not even the echo of my shouting and cheering could ever reach you. ',
  },
];

export default function Cards() {
  const [index,   setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(false);
  const navigate = useNavigate();

  const card   = CARDS[index];
  const isLast = index === CARDS.length - 1;

  const handleShow = () => {
    setFlipped(true);
    showToast(card.category);
  };

  const handleNext = () => {
    if (isLast) {
      setDone(true);
      launchConfetti(3000);
      showToast("That's all the cards 💜");
    } else {
      // Bump index — the key={index} on the stage div makes React
      // unmount the old card and mount a brand-new one, which plays
      // the CSS entrance animation automatically. No timing hacks needed.
      setIndex(i => i + 1);
      setFlipped(false);
    }
  };

  return (
    <PageTransition>
      <section id="cards-section">
        <div className="wrap">
          <div className="divider reveal" />
          <h2 className="section-title reveal">Something Special for You 🃏</h2>
          <p className="section-sub reveal">Each card holds a little piece of my heart — flip to read it</p>

          {done ? (
            <div className="cards-done card-enter">
              <div className="cards-done-emoji">🌸</div>
              <h3>That's all the cards…</h3>
              <p>Hope they made you smile even a little 💜</p>
              <button 
                className="card-btn" 
                style={{ marginTop: '2rem' }} 
                onClick={() => navigate('/letters')}
              >
                Read Letters 💌 →
              </button>
            </div>
          ) : (
            /* key={index} forces React to fully remount this block
               every time the index changes → fresh entrance animation,
               zero batching / timing issues */
            <div key={index} className="card-stage card-enter">

              {/* Floating hint label */}
              <div className="card-category-label">
                <span>{card.category}</span>
              </div>

              {/* Progress dots */}
              <div className="card-dots">
                {CARDS.map((_, i) => (
                  <span
                    key={i}
                    className={`card-dot ${i === index ? 'active' : ''} ${i < index ? 'done' : ''}`}
                  />
                ))}
              </div>

              {/* The flip card */}
              <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
                <div className="flip-card-back">
                  <div className="card-back-pattern" />
                  <div className="card-back-emoji">{card.emoji}</div>
                  <p className="card-back-hint">Tap "Show Card" to reveal</p>
                </div>
                <div className="flip-card-front">
                  <div className="card-front-category">{card.category}</div>
                  <p className="card-front-message">{card.message}</p>
                  <div className="card-front-deco">✦</div>
                </div>
              </div>

              {/* Action button */}
              <div className="card-actions">
                {!flipped ? (
                  <button className="card-btn show-btn" onClick={handleShow}>
                    ✨ Show Card
                  </button>
                ) : (
                  <button className="card-btn next-card-btn" onClick={handleNext}>
                    {isLast ? '🌸 Finish' : 'Next Card →'}
                  </button>
                )}
              </div>

            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
