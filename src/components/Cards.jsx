import { useState } from 'react';
import PageTransition from './PageTransition';
import { launchConfetti, showToast } from './CanvasEffects';

/* ✏️  EDIT YOUR CARDS HERE */
const CARDS = [
  {
    category: 'A Little Compliment 💜',
    emoji: '💜',
    message: 'You have this rare quality — you make people feel like they matter, every single time. The way you listen, the way you care, the way you show up without being asked. That is not common. That is you.',
  },
  {
    category: 'A Shayari 🌸',
    emoji: '🌸',
    message: 'तेरी हँसी में जो रौशनी है,\nवो किसी दिये से कम नहीं।\nतू जहाँ भी जाए, महफ़िल सजती है —\nयूँ ही नहीं, तू ख़ास है यहाँ।',
  },
  {
    category: "Something I'm Grateful For 🙏",
    emoji: '🙏',
    message: 'I am genuinely grateful that the universe decided we should know each other. Not everyone gets a person who feels like home — I got lucky. Really lucky.',
  },
  {
    category: 'A Wish for You ⭐',
    emoji: '⭐',
    message: 'I wish you a year that feels like your favourite song on repeat — the kind that makes everything feel okay. I wish you peace, laughter, and all the little things that make your eyes light up.',
  },
  {
    category: 'From the Heart 💌',
    emoji: '💌',
    // ✏️ REPLACE with your own private message
    message: '[Write something personal here — an inside memory, a feeling you never said out loud, or just the simplest truth. This card is entirely yours to fill.]',
  },
];

export default function Cards() {
  const [index,   setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(false);

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
            <div className="cards-done reveal">
              <div className="cards-done-emoji">🌸</div>
              <h3>That's all the cards…</h3>
              <p>Hope they made you smile even a little 💜</p>
            </div>
          ) : (
            /* key={index} forces React to fully remount this block
               every time the index changes → fresh entrance animation,
               zero batching / timing issues */
            <div key={index} className="card-stage reveal card-enter">

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
