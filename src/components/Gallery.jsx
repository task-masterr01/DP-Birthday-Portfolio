import PageTransition from './PageTransition';

export default function Gallery() {
  return (
    <PageTransition nextPath="/message" nextLabel="Read My Letter 💌">
      <section id="gallery-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">Our Beautiful Moments 📸</h2>
          <p className="section-sub reveal">Every picture tells a story worth a thousand smiles…</p>
          {/* ✏️ REPLACE each src="..." with your actual photo paths */}
          <div className="gallery-grid">
            <div className="photo-card reveal" style={{ '--i': 1 }}>
              <img src="https://picsum.photos/seed/lav01/500/375" alt="Memory 1" loading="lazy" />
              <div className="photo-caption">A memory to cherish forever 🌸</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 2 }}>
              <img src="https://picsum.photos/seed/rose02/500/375" alt="Memory 2" loading="lazy" />
              <div className="photo-caption">The best moments happen when you least expect them 💜</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 3 }}>
              <img src="https://picsum.photos/seed/bloom03/500/375" alt="Memory 3" loading="lazy" />
              <div className="photo-caption">Here's to you and all your beautiful dreams ✨</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 4 }}>
              <img src="https://picsum.photos/seed/soft04/500/375" alt="Memory 4" loading="lazy" />
              <div className="photo-caption">Some friendships are written in the stars 🌟</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 5 }}>
              <img src="https://picsum.photos/seed/dream05/500/375" alt="Memory 5" loading="lazy" />
              <div className="photo-caption">Every laugh, every smile, every tear — shared 🌺</div>
            </div>
            <div className="photo-card reveal" style={{ '--i': 6 }}>
              <img src="https://picsum.photos/seed/magic06/500/375" alt="Memory 6" loading="lazy" />
              <div className="photo-caption">Growing up together is the greatest gift 💕</div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
