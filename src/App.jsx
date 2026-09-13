import './index.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CanvasEffects from './components/CanvasEffects';
import Hero from './components/Hero';
import Cake from './components/Cake';
import Gallery from './components/Gallery';
import Message from './components/Message';
import Secret from './components/Secret';
import WriteLetter from './components/WriteLetter';
import LetterBoard from './components/LetterBoard';
import Cards from './components/Cards';

function App() {
  const location = useLocation();
  const audioRef = useRef(null);

  // Handle route changes: play only on '/' and '/cake', with delay and fade-in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const allowedPaths = ['/', '/cake'];
    const isAllowed = allowedPaths.includes(location.pathname);

    // Clear any existing timeouts/intervals
    if (audio.fadeInterval) clearInterval(audio.fadeInterval);
    if (audio.delayTimeout) clearTimeout(audio.delayTimeout);

    if (isAllowed) {
      // 1. Half second delay
      audio.delayTimeout = setTimeout(() => {
        audio.volume = 0;
        
        const tryPlayAndFade = () => {
          audio.play().then(() => {
            // 3. Progressively increase to 20% over ~2 seconds
            const targetVolume = 0.2;
            const steps = 20;
            const stepTime = 100;
            const volStep = targetVolume / steps;

            audio.fadeInterval = setInterval(() => {
              if (audio.volume < targetVolume) {
                audio.volume = Math.min(targetVolume, audio.volume + volStep);
              } else {
                clearInterval(audio.fadeInterval);
              }
            }, stepTime);
          }).catch(e => {
            console.log('Autoplay blocked until interaction');
            // If blocked, wait for user interaction to start the fade
            const onInteract = () => {
              document.removeEventListener('click', onInteract);
              document.removeEventListener('touchstart', onInteract);
              tryPlayAndFade();
            };
            document.addEventListener('click', onInteract, { once: true });
            document.addEventListener('touchstart', onInteract, { once: true });
          });
        };

        if (audio.paused) {
          tryPlayAndFade();
        } else {
          // If already playing (e.g. from previous route), just fade in
          tryPlayAndFade();
        }

      }, 500);
    } else {
      // If navigating away from allowed pages, gracefully fade out and pause
      audio.fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(audio.fadeInterval);
        }
      }, 50);
    }

    return () => {
      if (audio.fadeInterval) clearInterval(audio.fadeInterval);
      if (audio.delayTimeout) clearTimeout(audio.delayTimeout);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Audio is controlled entirely via JS refs now */}
      <audio ref={audioRef} id="bg-music" loop src="/birthday-piano.mp3" />
      <CanvasEffects />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cards" element={<Cards />} />
        
        <Route path="/message" element={<Message />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/write" element={<WriteLetter />} />
        <Route path="/letters" element={<LetterBoard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  );
}

export default App;
