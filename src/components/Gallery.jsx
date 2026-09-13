import PageTransition from './PageTransition';
import img1 from '../assets/BIRTHDAY SPECIAL/20260427_205706.jpg';
import img2 from '../assets/BIRTHDAY SPECIAL/AR1.jpeg';
import img3 from '../assets/BIRTHDAY SPECIAL/IMG-20231222-WA0077.jpg';
import img4 from '../assets/BIRTHDAY SPECIAL/P1.jpg';
import img5 from '../assets/BIRTHDAY SPECIAL/Snapchat-989639929.jpg';
import img6 from '../assets/BIRTHDAY SPECIAL/A1.1.jpg';
import img7 from '../assets/BIRTHDAY SPECIAL/A14.jpeg';
import img8 from '../assets/BIRTHDAY SPECIAL/A13.jpeg';

export default function Gallery() {
  return (
    <PageTransition nextPath="/message" nextLabel="Read My Letter 💌">
      <section id="gallery-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">Beautiful Moments 📸</h2>
          <p className="section-sub reveal">Every picture tells a story worth a thousand smiles…</p>
          <div className="gallery-grid">
            <div className="photo-card reveal" style={{ '--i': 1, '--rot': '-4deg' }}>
              <img src={img1} alt="Memory 1" loading="lazy" />
              <div className="photo-caption">Effortless elegance in every single frame 🌸🌸</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 2, '--rot': '3deg' }}>
              <img src={img2} alt="Memory 2" loading="lazy" />
              <div className="photo-caption">A living goddess in every sense of the word 🌟🌟</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 3, '--rot': '-2deg' }}>
              <img src={img3} alt="Memory 3" loading="lazy" />
              <div className="photo-caption">She doesn't even have to try; her charm just naturally steals the show 🌺🌺</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 4, '--rot': '5deg' }}>
              <img src={img4} alt="Memory 4" loading="lazy" />
              <div className="photo-caption">When you're this charming, all the nakhre are fully justified 💕💕</div>
            </div>
            
            <div className="photo-card reveal" style={{ '--i': 6, '--rot': '2deg' }}>
              <img src={img6} alt="Memory 6" loading="lazy" />
              <div className="photo-caption">The ultimate standard of what a perfect daughter looks like 💜💜</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 7, '--rot': '-3deg' }}>
              <img src={img7} alt="Memory 7" loading="lazy" />
              <div className="photo-caption">The kind of smile that effortlessly melts  heart ✨✨</div>
            </div>
            
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
