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
            <div className="letter-dear">Dear Deepanshu ,</div>
            <div className="letter-body">
              <p>
                It rarely happens that someone comes into your life whose presence genuinely feels like a blessing. You are one of those rare people, and I thank God every day for your existence.
              </p>
              <p>
                I wish the universe grants everything your heart quietly wishes for. <br />
                I hope you get more of the moments that make you laugh until your stomach hurts, 
                and more of the places that make you feel truly alive.
              </p>
              <p>
                Happiest Birthday, beautiful. Live your life to the fullest, because you will never be this young again. This exact moment is truly yours—whatever the past was, whatever the future will be, all you have is this beautiful present. 🌸
              </p>
            </div>
            <div className="letter-sign">With all my heart 💜<br />— Your best friend</div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
