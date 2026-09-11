import { useState, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
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
  const [senderName, setSenderName] = useState('');
  const [nameError,  setNameError]  = useState(false);
  const [envOpen,   setEnvOpen]   = useState(false);
  const [photo,     setPhoto]     = useState(null);
  const [message,   setMessage]   = useState('');
  const [fromText,  setFrom]      = useState('');
  const [sending,   setSending]   = useState(false);
  const [countdown, setCountdown] = useState(getCountdown());
  const photoInputRef = useRef(null);

  // Live countdown ticker
  useEffect(() => {
    if (screen !== SCREEN.COUNTDOWN) return;
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, [screen]);

  // ── Name submit ────────────────────────────────────
  const handleNameSubmit = () => {
    if (!senderName.trim()) { setNameError(true); return; }
    setNameError(false);
    setScreen(SCREEN.COUNTDOWN);
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
        name:      senderName.trim() || 'A Friend',
        photo:     photo || null,
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

  return (
    <div className="write-world">

      {/* ── NAME / SIGN IN ── */}
      {screen === SCREEN.SIGNIN && (
        <div className="signin-card">
          <div className="signin-emoji">💌</div>
          <h1 className="signin-title">A Gift for {HER_NAME}</h1>
          <p className="signin-sub">
            Her birthday is coming. Leave her a letter she'll carry forever.
            Tell us your name so she knows it's from you 💜
          </p>
          <input
            className={`name-input ${nameError ? 'name-input--error' : ''}`}
            type="text"
            placeholder="Your name…"
            value={senderName}
            maxLength={50}
            onChange={(e) => { setSenderName(e.target.value); setNameError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
          />
          {nameError && <p className="name-error">Please enter your name 💜</p>}
          <button className="google-btn" onClick={handleNameSubmit}>
            Continue ✨
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
              {/* Photo — floated left */}
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

              {/* Letter text — flows right of photo, then full width below */}
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

              {/* From — bottom right */}
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
