import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÃO DE ESTILO E VARIÁVEIS CSS ---
const styles = `
  /* Trocamos a Orbitron pela 'Outfit', que é moderna, geométrica e limpa */
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;800&family=Rajdhani:wght@400;500;600&display=swap');

  :root {
    --primary-rose: #ff0055;
    --primary-rose-glow: rgba(255, 0, 85, 0.5);
    --bg-dark: #0b0b0b;
    --bg-light: #f4f4f5;
    --text-dark: #ffffff;
    --text-light: #1a1a1a;
    --glass-dark: rgba(20, 20, 20, 0.6);
    --glass-light: rgba(255, 255, 255, 0.6);
    --border-dark: rgba(255, 255, 255, 0.1);
    --border-light: rgba(0, 0, 0, 0.1);
  }

  /* --- 1. SELEÇÃO DE TEXTO CUSTOMIZADA --- */
  ::selection {
    background: var(--primary-rose);
    color: white;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

  body {
    font-family: 'Rajdhani', sans-serif; /* Corpo do texto técnico mas legível */
    font-size: 16px;
    overflow-x: hidden;
    transition: background-color 0.5s ease;
  }

  .theme-dark { background-color: var(--bg-dark); color: var(--text-dark); }
  .theme-light { background-color: var(--bg-light); color: var(--text-light); }

  /* --- 2. NOVAS FONTES E REMOÇÃO DE CAIXA ALTA FORÇADA --- */
  h1, h2, h3 {
    font-family: 'Outfit', sans-serif; /* Fonte moderna */
    font-weight: 700;
    /* Removemos o text-transform: uppercase global */
  }

  .app-container { position: relative; z-index: 1; min-height: 100vh; }
  #canvas-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: auto; }

  header {
    display: flex; justify-content: space-between; align-items: center; padding: 2rem 5%; position: fixed; width: 100%; z-index: 10;
    backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 0, 85, 0.05);
  }
  .logo { font-family: 'Outfit'; font-size: 1.5rem; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .logo span { color: var(--primary-rose); }
  .theme-light .logo { color: var(--text-light); }

  .theme-toggle {
    background: transparent; border: 1px solid rgba(255,255,255,0.2); color: inherit; padding: 8px 20px;
    cursor: pointer; font-family: 'Outfit', sans-serif; transition: 0.3s; font-size: 0.9rem; border-radius: 50px;
  }
  .theme-light .theme-toggle { border-color: rgba(0,0,0,0.2); }
  .theme-toggle:hover { border-color: var(--primary-rose); color: var(--primary-rose); }

  section { min-height: 100vh; padding: 4rem 5%; display: flex; flex-direction: column; justify-content: center; position: relative; }
  
  /* --- 3. HERO SECTION CENTRALIZADA --- */
  .hero-content {
    width: 100%;
    max-width: 1000px;
    z-index: 2;
    margin: 0 auto;
    text-align: center; /* Centraliza tudo */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-title {
    font-size: 8rem; /* Título Gigante */
    line-height: 1;
    margin-bottom: 0px;
    letter-spacing: -3px; /* Letras mais juntas pra ficar moderno */
    background: linear-gradient(135deg, #fff 0%, #aaa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .theme-light .main-title {
    background: linear-gradient(135deg, #000 0%, #555 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 2.5rem;
    color: var(--primary-rose);
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }

  .hero-desc {
    font-size: 1.2rem;
    max-width: 600px;
    line-height: 1.6;
    opacity: 0.8;
    margin-bottom: 3rem;
  }

  /* Botão Moderno */
  .btn-cta {
    padding: 1rem 3.5rem;
    background: var(--primary-rose);
    border: none;
    color: white;
    font-family: 'Outfit';
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 50px; /* Botão arredondado é mais moderno que quadrado */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .btn-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4);
  }

  .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; width: 100%; margin-top: 3rem; }
  
  .card {
    background: var(--glass-dark); backdrop-filter: blur(12px);
    border: 1px solid var(--border-dark);
    padding: 30px; border-radius: 16px; /* Bordas arredondadas */
    transition: 0.4s ease;
    height: 350px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; overflow: hidden;
  }
  .theme-light .card { background: var(--glass-light); border-color: var(--border-light); }
  
  .card:hover { transform: translateY(-10px); border-color: var(--primary-rose); }
  
  .card h3 { font-size: 1.5rem; margin-bottom: 10px; }
  .card a { text-decoration: none; color: var(--primary-rose); font-weight: 600; margin-top: auto; display: inline-block; }

  .contact-container {
    background: var(--glass-dark); padding: 4rem; border-radius: 20px; border: 1px solid var(--border-dark);
    max-width: 600px; width: 100%; backdrop-filter: blur(12px); margin: 0 auto;
  }
  .theme-light .contact-container { background: var(--glass-light); border-color: var(--border-light); }
  
  .form-group { margin-bottom: 1.5rem; }
  input, textarea {
    width: 100%; padding: 1.2rem; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
    color: inherit; font-family: 'Rajdhani'; font-size: 1.1rem; outline: none; transition: 0.3s; border-radius: 8px;
  }
  .theme-light input, .theme-light textarea { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
  input:focus, textarea:focus { border-color: var(--primary-rose); background: rgba(0,0,0,0.4); }

  footer { text-align: center; padding: 3rem; font-size: 0.9rem; opacity: 0.6; }
  
  @media (max-width: 768px) {
    .main-title { font-size: 5rem; }
    .subtitle { font-size: 1.8rem; }
    section { padding: 4rem 1.5rem; }
  }
`;

// --- COMPONENTE DO BACKGROUND (O MESMO CÓDIGO DO SEU PREFERIDO) ---
const ParticleBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.baseColor = color;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      draw() {
        this.pulseAngle += this.pulseSpeed;
        const pulsatingSize = this.size + Math.sin(this.pulseAngle) * 0.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, pulsatingSize), 0, Math.PI * 2, false);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.baseColor;
        ctx.fillStyle = this.baseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * 2;
        let directionY = forceDirectionY * force * 2;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        }

        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX * 0.4;
        this.y += this.directionY * 0.4;

        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 10000;
      let color = theme === 'dark' ? 'rgb(255, 0, 85)' : 'rgb(20, 20, 20)';

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    function connect() {
      const baseRgb = theme === 'dark' ? '255, 0, 85' : '20, 20, 20';
      const maxDistance = (canvas.width / 8) * (canvas.height / 8);

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distPoints = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distPoints < maxDistance) {
            let opacity = 1 - (distPoints / maxDistance);
            let lineWidth = 0.5;
            let midX = (particlesArray[a].x + particlesArray[b].x) / 2;
            let midY = (particlesArray[a].y + particlesArray[b].y) / 2;
            let distMouse = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);

            if (distMouse < mouse.radius) {
              const mousePower = 1 - (distMouse / mouse.radius);
              lineWidth = 0.5 + (mousePower * 2.5);
              opacity = Math.min(1, opacity + mousePower * 0.5);
              ctx.shadowBlur = 15 * mousePower;
              ctx.shadowColor = `rgba(${baseRgb}, 0.8)`;
            } else {
              ctx.shadowBlur = 0;
            }

            ctx.strokeStyle = `rgba(${baseRgb}, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    });

    return () => {
      window.removeEventListener('resize', null);
      cancelAnimationFrame(animationFrameId);
    }
  }, [theme]);

  return <canvas ref={canvasRef} id="canvas-bg"></canvas>;
};

// --- APP PRINCIPAL ---
function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <style>{styles}</style>
      <div className={`app-container theme-${theme}`}>
        
        <ParticleBackground theme={theme} />

        <header>
          <div className="logo">Lynav <span>.</span></div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <section id="home">
          <div className="hero-content">
            {/* Título Centralizado, Sem Glitch, Fonte Nova */}
            <h1 className="main-title">Lynav</h1>
            <h2 className="subtitle">Innovations</h2>
            
            <p className="hero-desc">
              De automações RPA complexas a ecossistemas Full-Stack escaláveis. Transformamos lógica de negócios em software de alta performance.

            </p>
            <button className="btn-cta" onClick={() => document.getElementById('contact').scrollIntoView()}>
              Iniciar Projeto
            </button>
          </div>
        </section>

        <section id="portfolio">
          <h2 style={{textAlign:'center', fontSize: '2.5rem'}}>Portfólio Selecionado</h2>
          <div className="portfolio-grid">
            {[1, 2, 3].map((item) => (
              <div className="card" key={item}>
                <div style={{
                    width:'100%', height:'150px', background:'linear-gradient(45deg, #222, #111)', 
                    borderRadius:'8px', marginBottom:'20px', opacity:0.6
                }}></div>
                <div>
                  <h3>Projeto Cyber {item}</h3>
                  <p style={{marginBottom: '15px', fontSize: '1rem', opacity: 0.7}}>UX/UI / Development</p>
                  <a href="#">Ver detalhes &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2 style={{textAlign:'center', marginBottom:'2rem', fontSize: '2.5rem'}}>Vamos conversar?</h2>
          <div className="contact-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Seu nome" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <textarea rows="4" placeholder="Fale sobre seu projeto..."></textarea>
              </div>
              <button className="btn-cta" style={{width: '100%'}}>Enviar Mensagem</button>
            </form>
          </div>
        </section>

        <footer>
          <p>© 2024 Lynav Innovations. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default App;