import { useState } from 'react';
import PageTransition from './PageTransition';
import { launchConfetti, showToast } from './CanvasEffects';

/*
  ✏️  ADD YOUR CARDS HERE
  Each object has:
    - category : the floating hint title shown above the card
    - emoji    : shown on the card back (big, centred)
    - message  : the text revealed on the front after flip
*/
const CARDS = [
  {
    category: 'A Little Compliment 💜',
    emoji: '💜',
    message:
      'You have this rare quality — you make people feel like they matter, every single time. The way you listen, the way you care, the way you show up without being asked. That is not common. That is you.',
  },
  {
    category: 'A Shayari 🌸',
    emoji: '🌸',
    message:
      'तेरी हँसी में जो रौशनी है,\nवो किसी दिये से कम नहीं।\nतू जहाँ भी जाए, महफ़िल सजती है —\nयूँ ही नहीं, तू ख़ास है यहाँ।',
  },
  {
    category: 'Something I\'m Grateful For 🙏',
    emoji: '🙏',
    message:
      'I am genuinely grateful that the universe decided we should know each other. Not everyone gets a person who feels like home — I got lucky. Really lucky.',
  },
  {
    category: 'A Wish for You ⭐',
    emoji: '⭐',
    message:
      'I wish you a year that feels like your favourite song on repeat — the kind that makes everything feel okay. I wish you peace, laughter, and all the little things that make your eyes light up.',
  },
  {
    category: 'From the Heart 💌',
    emoji: '💌',
    // ✏️ REPLACE this with your own personal message
    message:
      '[Write something personal here — an inside memory, a feeling you never said out loud, or just the simplest truth. This card is entirely yours to fill.]',
  },
];

export default function Cards() {
  const [index, setIndex]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exiting, setExiting] = useState(false); // card slide-out animation
  const [done, setDone]       = useState(false);

  const card = CARDS[index];
  const isLast = index === CARDS.length - 1;

  const handleShow = () => {
    if (flipped) return;
    setFlipped(true);
    showToast(`${card.category}`);
  };

  const handleNext = () => {
    if (!flipped) return;
    setExiting(true);
    setTimeout(() => {
      if (isLast) {
        setDone(true);
        launchConfetti(3000);
        showToast('That\'s all the cards 💜');
      } else {
        // 1) Swap the card content (still in exit position)
        setIndex(i => i + 1);
        setFlipped(false);
        // 2) Use a short timeout to ensure React commits the new card state
        //    before we remove the exit class. This forces the CSS transition.
        setTimeout(() => setExiting(false), 50);
      }
    }, 400);
  };

  return (
    <PageTransition nextPath="/secret" nextLabel="Unlock a Secret 🔐">
      <section id="cards-section">
        <div className="wrap">
          <div className="divider reveal" />
          <h2 className="section-title reveal">Something Special for You 🃏</h2>
          <p className="section-sub reveal">Each card holds a little piece of my heart — flip to read it</p>

          {done ? (
            /* ── All cards done ── */
            <div className="cards-done reveal">
              <div className="cards-done-emoji">🌸</div>
              <h3>That's all the cards…</h3>
              <p>Hope they made you smile even a little 💜</p>
            </div>
          ) : (
            <div className="card-stage reveal">
              {/* Floating category title */}
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

              {/* The flip card container - we fade this out during exit */}
              <div className={`flip-card-container ${exiting ? 'card-exiting' : ''}`}>
                <div key={index} className={`flip-card ${flipped ? 'flipped' : ''}`}>
                  {/* Back */}
                  <div className="flip-card-back">
                    <div className="card-back-pattern" />
                    <div className="card-back-emoji">{card.emoji}</div>
                    <p className="card-back-hint">Tap "Show Card" to reveal</p>
                  </div>

                  {/* Front */}
                  <div className="flip-card-front">
                    <div className="card-front-category">{card.category}</div>
                    <p className="card-front-message">{card.message}</p>
                    <div className="card-front-deco">✦</div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="card-actions">
                {!flipped ? (
                  <button className="card-btn show-btn" onClick={handleShow} disabled={exiting}>
                    ✨ Show Card
                  </button>
                ) : (
                  <button className="card-btn next-card-btn" onClick={handleNext} disabled={exiting}>
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
