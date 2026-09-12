import PageTransition from './PageTransition';
import img1 from '../assets/BIRTHDAY SPECIAL/20260427_205706.jpg';
import img2 from '../assets/BIRTHDAY SPECIAL/A1.1.jpg';
import img3 from '../assets/BIRTHDAY SPECIAL/20260427_205707.jpg';
import img4 from '../assets/BIRTHDAY SPECIAL/Snapchat-989639929.jpg';
import img5 from '../assets/BIRTHDAY SPECIAL/IMG-20231222-WA0077.jpg';
import img6 from '../assets/BIRTHDAY SPECIAL/P1.jpg';

export default function Gallery() {
  return (
    <PageTransition nextPath="/message" nextLabel="Read My Letter 💌">
      <section id="gallery-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">Our Beautiful Moments 📸</h2>
          <p className="section-sub reveal">Every picture tells a story worth a thousand smiles…</p>
          <div className="gallery-grid">
            <div className="photo-card reveal" style={{ '--i': 1, '--rot': '-4deg' }}>
              <img src={img1} alt="Memory 1" loading="lazy" />
              <div className="photo-caption">A memory to cherish forever 🌸</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 2, '--rot': '3deg' }}>
              <img src={img2} alt="Memory 2" loading="lazy" />
              <div className="photo-caption">The best moments happen when you least expect them 💜</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 3, '--rot': '-2deg' }}>
              <img src={img3} alt="Memory 3" loading="lazy" />
              <div className="photo-caption">Here's to you and all your beautiful dreams ✨</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 4, '--rot': '5deg' }}>
              <img src={img4} alt="Memory 4" loading="lazy" />
              <div className="photo-caption">Some friendships are written in the stars 🌟</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 5, '--rot': '-5deg' }}>
              <img src={img5} alt="Memory 5" loading="lazy" />
              <div className="photo-caption">Every laugh, every smile, every tear — shared 🌺</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 6, '--rot': '2deg' }}>
              <img src={img6} alt="Memory 6" loading="lazy" />
              <div className="photo-caption">Growing up together is the greatest gift 💕</div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
