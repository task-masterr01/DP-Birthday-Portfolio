import { useEffect, useRef } from 'react';

// Export these functions so other components can trigger them
export let launchConfetti = () => {};
export let launchBalloons = () => {};
export let showToast = () => {};

export default function CanvasEffects() {
  const starsRef = useRef(null);
  const sparkleRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    // ── 1. STARFIELD ──────────────────────────────────────
    const cStars = starsRef.current;
    if (!cStars) return;
    const xStars = cStars.getContext('2d');
    let W, H;
    function rsStars() { W = cStars.width = window.innerWidth; H = cStars.height = window.innerHeight; }
    rsStars(); 
    window.addEventListener('resize', rsStars);
    
    const ST = [];
    for (let i = 0; i < 220; i++) ST.push({ x: Math.random() * 1920, y: Math.random() * 1080, r: Math.random() * 1.4 + .2, ph: Math.random() * 6.28, sp: Math.random() * .4 + .1 });
    const SH = [];
    const shInterval = setInterval(() => { 
      SH.push({ x: Math.random() * W, y: Math.random() * H * .45, len: 60 + Math.random() * 80, sp: 6 + Math.random() * 8, ang: Math.PI / 4 + (Math.random() - .5) * .35, a: 1 }); 
    }, 2200);
    
    let t = 0;
    let starsRaf;
    function drawStars() {
      xStars.clearRect(0, 0, W, H); t++;
      ST.forEach((s) => { 
        let a = (Math.sin(s.ph + t * s.sp * .03) + 1) / 2 * .65 + .1; 
        xStars.beginPath(); 
        xStars.arc(s.x % W, s.y % H, s.r, 0, 6.283); 
        xStars.fillStyle = 'rgba(232,213,255,' + a + ')'; 
        xStars.fill(); 
      });
      for (let i = SH.length - 1; i >= 0; i--) { 
        let s = SH[i], ex = s.x + Math.cos(s.ang) * s.len, ey = s.y + Math.sin(s.ang) * s.len, g = xStars.createLinearGradient(s.x, s.y, ex, ey);
        g.addColorStop(0, 'rgba(201,177,255,0)'); 
        g.addColorStop(1, 'rgba(255,182,217,' + s.a + ')');
        xStars.beginPath(); 
        xStars.moveTo(s.x, s.y); 
        xStars.lineTo(ex, ey); 
        xStars.strokeStyle = g; 
        xStars.lineWidth = 2; 
        xStars.stroke();
        s.x += Math.cos(s.ang) * s.sp; 
        s.y += Math.sin(s.ang) * s.sp; 
        s.a -= .013; 
        if (s.a <= 0) SH.splice(i, 1); 
      }
      starsRaf = requestAnimationFrame(drawStars);
    }
    drawStars();

    // ── 2. MOUSE SPARKLES ─────────────────────────────────
    const cSparkle = sparkleRef.current;
    const xSparkle = cSparkle.getContext('2d');
    let WS, HS;
    function rsSparkle() { WS = cSparkle.width = window.innerWidth; HS = cSparkle.height = window.innerHeight; }
    rsSparkle();
    window.addEventListener('resize', rsSparkle);
    
    const SY = ['✨', '💜', '🌸', '⭐', '💕', '✦', '·', '★'], CO = ['#C9B1FF', '#FFB6D9', '#E8D5FF', '#FFD9A8', '#F48EB1'], pool = [];
    const handleMouseMove = (e) => { 
      for (let i = 0; i < 3; i++) pool.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 3, vy: Math.random() * -3 - 1.5, life: 1, sz: 9 + Math.random() * 11, sym: SY[Math.random() * SY.length | 0], col: CO[Math.random() * CO.length | 0] }); 
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    let sparkleRaf;
    function drawSparkle() {
      xSparkle.clearRect(0, 0, WS, HS); 
      for (let i = pool.length - 1; i >= 0; i--) { 
        let p = pool[i]; p.x += p.vx; p.y += p.vy; p.vy += .05; p.life -= .022; 
        if (p.life <= 0) { pool.splice(i, 1); continue; } 
        xSparkle.save(); xSparkle.globalAlpha = p.life; xSparkle.font = p.sz + 'px serif'; xSparkle.fillStyle = p.col; xSparkle.fillText(p.sym, p.x, p.y); xSparkle.restore(); 
      }
      sparkleRaf = requestAnimationFrame(drawSparkle);
    }
    drawSparkle();

    // Implement Confetti
    launchConfetti = (dur) => {
      dur = dur || 3000; 
      const c = confettiRef.current; 
      if(!c) return;
      const x = c.getContext('2d');
      c.width = window.innerWidth; c.height = window.innerHeight;
      const CO_C = ['#C9B1FF', '#FFB6D9', '#E8D5FF', '#FFD9A8', '#F48EB1', '#9B79E8', '#fff'], bits = [];
      for (let i = 0; i < 160; i++) bits.push({ x: Math.random() * c.width, y: Math.random() * c.height - c.height, w: 5 + Math.random() * 9, h: 3 + Math.random() * 5, col: CO_C[Math.random() * CO_C.length | 0], vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4, rot: Math.random() * 6.28, rv: (Math.random() - .5) * .18 });
      const end = Date.now() + dur; 
      function step() {
        x.clearRect(0, 0, c.width, c.height); 
        bits.forEach((b) => { 
          b.x += b.vx; b.y += b.vy; b.rot += b.rv; 
          if (b.y > c.height) { b.y = -10; b.x = Math.random() * c.width; } 
          x.save(); x.translate(b.x + b.w / 2, b.y + b.h / 2); x.rotate(b.rot); x.fillStyle = b.col; x.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); x.restore(); 
        }); 
        if (Date.now() < end) requestAnimationFrame(step); 
        else x.clearRect(0, 0, c.width, c.height); 
      }
      step();
    };

    // Implement Balloons
    launchBalloons = (n) => {
      n = n || 8; 
      const w = document.getElementById('balloons'); 
      if(!w) return;
      const pk = ['🎈', '🎀', '💜', '🌸', '🎊', '✨', '🎁', '💕', '🎉'];
      for (let i = 0; i < n; i++) { 
        const el = document.createElement('div'); 
        el.className = 'balloon'; el.textContent = pk[Math.random() * pk.length | 0]; 
        el.style.left = Math.random() * 100 + 'vw'; 
        const d = 4 + Math.random() * 3; 
        el.style.animationDuration = d + 's'; 
        el.style.animationDelay = Math.random() + 's'; 
        w.appendChild(el); 
        setTimeout(() => el.remove(), (d + 1.5) * 1000); 
      }
    };

    // Implement Toast
    showToast = (msg) => {
      const el = document.getElementById('toast'); 
      if(!el) return;
      el.textContent = msg; el.classList.add('on'); 
      setTimeout(() => el.classList.remove('on'), 3400);
    };

    return () => {
      window.removeEventListener('resize', rsStars);
      clearInterval(shInterval);
      cancelAnimationFrame(starsRaf);
      window.removeEventListener('resize', rsSparkle);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(sparkleRaf);
    };
  }, []);

  return (
    <>
      <canvas id="cv-stars" ref={starsRef}></canvas>
      <canvas id="cv-sparkle" ref={sparkleRef}></canvas>
      <canvas id="cv-confetti" ref={confettiRef}></canvas>
      <div id="balloons"></div>
      <div id="floaters" aria-hidden="true">
        <span>💕</span><span>🌸</span><span>✨</span><span>💜</span><span>🌺</span><span>⭐</span>
      </div>
      <div id="toast" role="status" aria-live="polite"></div>
    </>
  );
}
