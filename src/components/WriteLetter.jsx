import { useState, useRef, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, provider, db } from '../firebase';
import '../letter.css';

// ✏️ Replace with her actual name
const HER_NAME = 'Her Name';

// ── Birthday countdown to Sept 18 ────────────────────
function getCountdown() {
  const now    = new Date();
  const target = new Date(now.getFullYear(), 8, 18);
  if (now > target) target.setFullYear(target.getFullYear() + 1);
  const diff   = target - now;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const SCREEN = {
  SIGNIN:    'signin',
  COUNTDOWN: 'countdown',
  ENVELOPE:  'envelope',
  LETTER:    'letter',
  THANKYOU:  'thankyou',
};

const MAX_CHARS = 500;

export default function WriteLetter() {
  const [screen,    setScreen]    = useState(SCREEN.SIGNIN);
  const [user,      setUser]      = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [envOpen,   setEnvOpen]   = useState(false);
  const [photo,     setPhoto]     = useState(null);
  const [message,   setMessage]   = useState('');
  const [fromText,  setFrom]      = useState('');
  const [sending,   setSending]   = useState(false);
  const [countdown, setCountdown] = useState(getCountdown());
  const photoInputRef = useRef(null);

  // Restore session if user already signed in previously
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) { setUser(u); setScreen(SCREEN.COUNTDOWN); }
      setAuthReady(true);
    });
    return unsub;
  }, []);

  // Live countdown ticker
  useEffect(() => {
    if (screen !== SCREEN.COUNTDOWN) return;
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, [screen]);

  // ── Google sign-in (popup — preserves user gesture for mobile) ──
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user);
        setScreen(SCREEN.COUNTDOWN);
      })
      .catch(e => {
        console.error(e);
        alert('Could not sign in: ' + e.code);
      });
  };

  // ── Open envelope ──────────────────────────────────
  const handleOpenEnvelope = () => {
    setEnvOpen(true);
    setTimeout(() => setScreen(SCREEN.LETTER), 700);
  };

  // ── Photo upload ───────────────────────────────────
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Submit letter ──────────────────────────────────
  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'letters'), {
        uid:       user?.uid || 'anonymous',
        name:      user?.displayName || 'A Friend',
        photo:     photo || user?.photoURL || null,
        message:   message.trim(),
        from:      fromText.trim(),
        createdAt: serverTimestamp(),
      });
      setScreen(SCREEN.THANKYOU);
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const pad = (n) => String(n).padStart(2, '0');
  const charsLeft = MAX_CHARS - message.length;

  // Don't render until Firebase auth state is resolved
  if (!authReady) {
    return (
      <div className="write-world">
        <div className="signin-card">
          <div className="signin-emoji">🌸</div>
          <p className="signin-sub">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="write-world">

      {/* ── SIGN IN ── */}
      {screen === SCREEN.SIGNIN && (
        <div className="signin-card">
          <div className="signin-emoji">💌</div>
          <h1 className="signin-title">A Gift for {HER_NAME}</h1>
          <p className="signin-sub">
            Her birthday is coming. Leave her a letter she'll carry forever.
            Sign in so she knows it's really from you 💜
          </p>
          <button className="google-btn" onClick={handleSignIn}>
            <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
              <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
              <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/>
              <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      )}

      {/* ── COUNTDOWN ── */}
      {screen === SCREEN.COUNTDOWN && (
        <div className="countdown-card">
          <h2 className="countdown-title">Her birthday is almost here 🌸</h2>
          <div className="countdown-dials">
            {[['days', countdown.days], ['hours', countdown.hours], ['min', countdown.minutes], ['sec', countdown.seconds]].map(([lbl, val]) => (
              <div className="countdown-dial" key={lbl}>
                <span className="countdown-num">{pad(val)}</span>
                <span className="countdown-label">{lbl}</span>
              </div>
            ))}
          </div>
          <p className="countdown-msg">
            Something beautiful is being made for {HER_NAME}.<br />
            Add your words to it — she'll cherish every single one 💜
          </p>
          <button className="write-btn" onClick={() => setScreen(SCREEN.ENVELOPE)}>
            Write My Letter ✉️
          </button>
        </div>
      )}

      {/* ── ENVELOPE ── */}
      {screen === SCREEN.ENVELOPE && (
        <div className="envelope-scene">
          <div className="envelope-wrap" onClick={handleOpenEnvelope}>
            <div className="env-body" />
            <div className={`env-flap ${envOpen ? 'open' : ''}`} />
            <div className="env-seal">🌸</div>
          </div>
          <p className="envelope-hint">Click the envelope to begin ✨</p>
        </div>
      )}

      {/* ── LETTER ── */}
      {screen === SCREEN.LETTER && (
        <div className="letter-scene">
          <div style={{ width: '100%', maxWidth: 640 }}>
            <div className="letter-paper">
              <div className="letter-photo-wrap">
                <div
                  className="letter-photo-box"
                  onClick={() => photoInputRef.current?.click()}
                >
                  {photo
                    ? <img src={photo} alt="your photo" />
                    : <span>📷<br />Add a<br />photo</span>
                  }
                </div>
                <p className="letter-photo-hint">tap to upload</p>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload}
                />
              </div>

              <div
                className="letter-textarea"
                contentEditable
                suppressContentEditableWarning
                data-placeholder={`Dear ${HER_NAME},\n\nWrite your heart out here…`}
                onInput={(e) => {
                  const text = e.currentTarget.innerText;
                  if (text.length > MAX_CHARS) {
                    e.currentTarget.innerText = text.slice(0, MAX_CHARS);
                    const range = document.createRange();
                    range.selectNodeContents(e.currentTarget);
                    range.collapse(false);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                  }
                  setMessage(e.currentTarget.innerText.slice(0, MAX_CHARS));
                }}
              />
              <div style={{ clear: 'both' }} />

              <div className="letter-from-wrap">
                <input
                  className="letter-from-input"
                  type="text"
                  placeholder="From,"
                  value={fromText}
                  onChange={(e) => setFrom(e.target.value)}
                  maxLength={60}
                />
              </div>

              <p className={`letter-counter ${charsLeft < 60 ? 'near' : ''}`}>
                {charsLeft} characters remaining
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="letter-submit-btn"
                onClick={handleSubmit}
                disabled={!message.trim() || sending}
              >
                {sending ? 'Sealing… 💜' : 'Seal & Send ✉️'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── THANK YOU ── */}
      {screen === SCREEN.THANKYOU && (
        <div className="thankyou-card">
          <div className="thankyou-emoji">💌</div>
          <h2 className="thankyou-title">Your letter is sealed 💜</h2>
          <p className="thankyou-msg">
            It's safely on its way to {HER_NAME}.<br />
            She'll receive it on September 18th 🌸<br /><br />
            Thank you for being part of something truly special.
          </p>
        </div>
      )}

    </div>
  );
}
