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
  const pianoRef = useRef(null);
  const romanticRef = useRef(null);

  // Handle route changes to crossfade between two audio tracks
  useEffect(() => {
    const piano = pianoRef.current;
    const romantic = romanticRef.current;
    if (!piano || !romantic) return;

    const pianoPaths = ['/', '/cake'];
    const isPianoAllowed = pianoPaths.includes(location.pathname);

    const fadeAudio = (audio, shouldPlay) => {
      // Clear any existing timeouts/intervals
      if (audio.fadeInterval) clearInterval(audio.fadeInterval);
      if (audio.delayTimeout) clearTimeout(audio.delayTimeout);

      if (shouldPlay) {
        if (audio.paused) {
           audio.volume = 0;
        }
        
        const tryPlayAndFade = () => {
          audio.play().then(() => {
            // Progressively increase to 15% volume over ~2 seconds
            const targetVolume = 0.15;
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

        tryPlayAndFade();
      } else {
        // If navigating away, gracefully fade out and pause
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
    };

    fadeAudio(piano, isPianoAllowed);
    fadeAudio(romantic, !isPianoAllowed);

    return () => {
      if (piano) {
        piano.pause();
        if (piano.fadeInterval) clearInterval(piano.fadeInterval);
        if (piano.delayTimeout) clearTimeout(piano.delayTimeout);
      }
      if (romantic) {
        romantic.pause();
        if (romantic.fadeInterval) clearInterval(romantic.fadeInterval);
        if (romantic.delayTimeout) clearTimeout(romantic.delayTimeout);
      }
    };
  }, [location.pathname]);

  return (
    <>
      {/* Audio elements are controlled entirely via JS refs now */}
      <audio ref={pianoRef} id="bg-piano" loop src="/birthday-piano.mp3" />
      <audio ref={romanticRef} id="bg-romantic" loop src="/leberch-romantic-583353.mp3" />
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
