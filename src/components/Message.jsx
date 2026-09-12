import PageTransition from './PageTransition';

export default function Message() {
  return (
    <PageTransition nextPath="/cards" nextLabel="Flip Some Cards 🃏">
      <section id="message-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">From My Heart 💌</h2>
          <p className="section-sub reveal">Some things are better said in writing…</p>
          <div className="letter-card reveal">
            {/* ✏️ REPLACE [Her Name] and customize these paragraphs */}
            <div className="letter-dear">Dear [Her Name],</div>
            <div className="letter-body">
              <p>
                There are people who come into your life and quietly change everything —
                the way you laugh, the way you see yourself, the way you feel understood.
                You are that person for me.
              </p>
              <p>
                Today, on this beautiful September day, the whole universe paused to
                celebrate the fact that you exist. And honestly? It should celebrate you
                every single day. You carry so much grace, so much warmth, and so much
                magic in everything you do — often without even realising it.
              </p>
              <p>
                I hope this year brings you everything your heart quietly wishes for.
                I hope you get more of the moments that make you laugh until your stomach hurts,
                more of the places that make you feel alive, and more of the people who see your light and
                never take it for granted.
              </p>
              <p>Happy Birthday, beautiful. Here's to you — now and always. 🌸</p>
            </div>
            <div className="letter-sign">With all my heart 💜<br />— Your best friend</div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
