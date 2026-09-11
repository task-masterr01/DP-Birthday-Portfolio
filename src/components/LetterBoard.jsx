import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import '../letter.css';

// ✏️ Replace with her actual name
const HER_NAME = 'Her Name';

const PIN_TYPES = ['pin-lav', 'pin-rose', 'pin-gold'];
// Slight random rotations for the pinned cards
const ROTATIONS = [-4, -2, 0, 2, 3, -3, 1, -1, 4, -2, 2, -4, 0, 3, -1];

export default function LetterBoard() {
  const [letters,  setLetters]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'letters'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setLetters(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <div id="board-page">
      <div className="board-header">
        <h1 className="board-title">Letters for {HER_NAME} 💌</h1>
        <p className="board-sub">Everyone had something to say — open each one 🌸</p>
      </div>

      <div className="cork-board">
        {loading && (
          <div className="board-loading">
            <span /><span /><span />
          </div>
        )}

        {!loading && letters.length === 0 && (
          <div className="board-empty">
            No letters yet — be the first to write one 💜
          </div>
        )}

        {letters.map((letter, i) => {
          const rotation = ROTATIONS[i % ROTATIONS.length];
          const pinClass  = PIN_TYPES[i % PIN_TYPES.length];
          return (
            <div
              key={letter.id}
              className="pin-card"
              style={{ transform: `rotate(${rotation}deg)` }}
              onClick={() => setSelected(letter)}
            >
              <div className={`card-pin ${pinClass}`} />

              {letter.photo
                ? <img className="card-photo" src={letter.photo} alt={letter.name} />
                : <div className="card-photo-placeholder">🌸</div>
              }

              <div className="card-name">{letter.from || letter.name}</div>
              <div className="card-snippet">{letter.message}</div>
            </div>
          );
        })}
      </div>

      {/* Full letter overlay */}
      {selected && (
        <div className="letter-overlay" onClick={() => setSelected(null)}>
          <div
            className="letter-overlay-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="overlay-close" onClick={() => setSelected(null)}>✕</button>

            {/* Float photo left — text wraps around it */}
            {selected.photo
              ? <img className="overlay-photo" src={selected.photo} alt={selected.name} />
              : <div className="overlay-photo-placeholder">🌸</div>
            }

            <p className="overlay-message">{selected.message}</p>

            <div className="overlay-from">
              {selected.from
                ? `From, ${selected.from}`
                : `From, ${selected.name}`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
