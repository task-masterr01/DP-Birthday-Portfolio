import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <>
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
