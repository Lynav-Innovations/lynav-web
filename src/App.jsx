import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÃO DE ESTILO E VARIÁVEIS CSS ---
const styles = `
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

  ::selection {
    background: var(--primary-rose);
    color: white;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

  body {
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    overflow-x: hidden;
    transition: background-color 0.5s ease;
  }

  .theme-dark { background-color: var(--bg-dark); color: var(--text-dark); }
  .theme-light { background-color: var(--bg-light); color: var(--text-light); }

  h1, h2, h3 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }

  .app-container { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; }
  #canvas-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: auto; }

  /* --- HEADER GLASS --- */
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

  /* --- FOOTER GLASS --- */
  .footer-glass {
    margin-top: auto;
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 0, 85, 0.1);
    background: rgba(10, 10, 10, 0.4);
    padding: 3rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    position: relative;
    z-index: 10;
  }

  .footer-left p { opacity: 0.6; font-size: 0.9rem; }
  
  .footer-center { display: flex; gap: 20px; }
  .social-link { 
    color: white; opacity: 0.7; transition: 0.3s; display: flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .social-link:hover { color: var(--primary-rose); opacity: 1; }

  .footer-right { display: flex; gap: 20px; }
  .legal-link {
    background: none; border: none; color: white; opacity: 0.6; cursor: pointer;
    font-family: 'Rajdhani'; font-size: 0.9rem; transition: 0.3s; text-decoration: underline; text-decoration-color: transparent;
  }
  .legal-link:hover { opacity: 1; color: var(--primary-rose); text-decoration-color: var(--primary-rose); }

  /* --- MODAL --- */
  .modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
    z-index: 100;
    display: flex; justify-content: center; align-items: center;
    padding: 20px;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    background: rgba(15, 15, 15, 0.9);
    border: 1px solid var(--primary-rose);
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 30px rgba(255, 0, 85, 0.2);
    animation: slideUp 0.3s ease;
  }

  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
  .modal-header h3 { font-size: 1.5rem; color: var(--primary-rose); }
  .btn-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; transition: 0.3s; }
  .btn-close:hover { color: var(--primary-rose); transform: scale(1.1); }
  
  .modal-body { font-size: 0.95rem; line-height: 1.6; opacity: 0.9; }
  .modal-body p { margin-bottom: 15px; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* Hero Section */
  section#home { 
    min-height: 100vh; 
    padding: 4rem 5%; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    position: relative; 
  }
  
  .hero-content {
    width: 100%;
    max-width: 1000px;
    z-index: 2;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-title {
    font-size: 8rem;
    line-height: 1;
    margin-bottom: 0px;
    letter-spacing: -3px;
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
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 2rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 
        0 0 5px rgba(255, 0, 85, 0.8),
        0 0 10px rgba(255, 0, 85, 0.6),
        0 0 20px rgba(255, 0, 85, 0.4),
        0 0 40px rgba(255, 0, 85, 0.2);
  }

  .hero-desc { font-size: 1.2rem; max-width: 600px; line-height: 1.6; opacity: 0.8; margin-bottom: 3rem; }

  /* --- BOTÃO LÍQUIDO --- */
  .btn-liquid {
    padding: 1rem 3.5rem;
    background: transparent;
    border: 2px solid var(--primary-rose);
    color: var(--primary-rose);
    font-family: 'Outfit';
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    transition: color 0.4s ease, box-shadow 0.4s ease;
    z-index: 1;
  }
  .btn-liquid::before {
    content: ''; position: absolute; top: 0; left: 0; width: 0%; height: 100%;
    background: var(--primary-rose); transition: width 0.4s ease-in-out; z-index: -1;
  }
  .btn-liquid:hover { color: white; box-shadow: 0 0 20px var(--primary-rose-glow); }
  .btn-liquid:hover::before { width: 100%; }

  /* --- SCROLL INDICATOR --- */
  .scroll-indicator {
    position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; cursor: pointer;
    z-index: 5; opacity: 0.8; transition: opacity 0.3s;
  }
  .scroll-indicator:hover { opacity: 1; }
  .chevron {
    width: 24px; height: 24px; border-bottom: 2px solid var(--primary-rose); border-right: 2px solid var(--primary-rose);
    transform: rotate(45deg); margin: -5px; animation: scroll-flow 2s infinite;
  }
  .chevron:nth-child(2) { animation-delay: 0.15s; }
  .chevron:nth-child(3) { animation-delay: 0.3s; }

  @keyframes scroll-flow {
    0% { opacity: 0; transform: rotate(45deg) translate(-10px, -10px); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: rotate(45deg) translate(10px, 10px); }
  }

  section:not(#home) { padding: 4rem 5%; display: flex; flex-direction: column; justify-content: center; position: relative; }

  .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; width: 100%; margin-top: 3rem; }
  
  .card {
    background: var(--glass-dark); backdrop-filter: blur(12px); border: 1px solid var(--border-dark);
    padding: 30px; border-radius: 16px; transition: 0.4s ease;
    min-height: 300px; display: flex; flex-direction: column; justify-content: flex-start; position: relative; overflow: hidden;
  }
  .theme-light .card { background: var(--glass-light); border-color: var(--border-light); }
  .card:hover { transform: translateY(-10px); border-color: var(--primary-rose); box-shadow: 0 5px 20px rgba(255,0,85,0.15); }
  .card h3 { font-size: 1.5rem; margin-bottom: 10px; }
  .card a { text-decoration: none; color: var(--primary-rose); font-weight: 600; margin-top: auto; display: inline-block; }

  /* Estilo do Ícone de Identidade do Produto */
  .product-icon-box {
    width: 60px; height: 60px;
    background: rgba(255, 0, 85, 0.1);
    border: 1px solid rgba(255, 0, 85, 0.2);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: var(--primary-rose);
    margin-bottom: 20px;
    box-shadow: 0 0 10px rgba(255, 0, 85, 0.1);
  }

  /* --- CONTATO --- */
  .contact-wrapper {
    width: 100%; max-width: 900px; margin: 0 auto;
    background: var(--glass-dark); backdrop-filter: blur(12px);
    border: 1px solid var(--border-dark); border-radius: 24px;
    padding: 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  }
  .theme-light .contact-wrapper { background: var(--glass-light); border-color: var(--border-light); }

  .contact-info h3 { font-size: 2rem; margin-bottom: 1rem; color: #fff; }
  .contact-info p { opacity: 0.8; margin-bottom: 2rem; line-height: 1.6; }
  .info-item { display: flex; align-items: center; margin-bottom: 1rem; font-size: 1.1rem; }
  .info-item span { margin-right: 15px; color: var(--primary-rose); font-size: 1.2rem; }
  
  .form-group { margin-bottom: 1.5rem; }
  input, textarea {
    width: 100%; padding: 1.2rem; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
    color: inherit; font-family: 'Rajdhani'; font-size: 1.1rem; outline: none; transition: 0.3s; border-radius: 8px;
  }
  textarea { resize: vertical; min-height: 100px; max-height: 300px; }
  .theme-light input, .theme-light textarea { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
  input:focus, textarea:focus { border-color: var(--primary-rose); background: rgba(0,0,0,0.4); box-shadow: 0 0 10px rgba(255,0,85,0.2); }

  @media (max-width: 768px) {
    .main-title { font-size: 5rem; }
    .subtitle { font-size: 1.8rem; }
    .contact-wrapper { grid-template-columns: 1fr; padding: 2rem; gap: 2rem; }
    section { padding: 4rem 1.5rem; }
    .footer-glass { flex-direction: column; text-align: center; gap: 1.5rem; }
  }
`;

// --- COMPONENTE DO BACKGROUND ---
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
    window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });

    class Particle {
      constructor(x, y, size, color) {
        this.x = x; this.y = y; this.size = size; this.baseColor = color;
        this.pulseSpeed = Math.random() * 0.05 + 0.02; this.pulseAngle = Math.random() * Math.PI * 2;
        this.directionX = (Math.random() * 2) - 1; this.directionY = (Math.random() * 2) - 1;
      }
      draw() {
        this.pulseAngle += this.pulseSpeed;
        const pulsatingSize = this.size + Math.sin(this.pulseAngle) * 0.5;
        ctx.beginPath(); ctx.arc(this.x, this.y, Math.max(0.1, pulsatingSize), 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor; ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx/distance; let forceDirectionY = dy/distance;
        let force = (mouse.radius - distance) / mouse.radius;
        if (distance < mouse.radius) { this.x -= forceDirectionX * force * 2; this.y -= forceDirectionY * force * 2; }
        if (this.x > canvas.width || this.x < 0) this.directionX *= -1;
        if (this.y > canvas.height || this.y < 0) this.directionY *= -1;
        this.x += this.directionX * 0.4; this.y += this.directionY * 0.4;
        this.draw();
      }
    }
    function init() {
      particlesArray = []; let count = (canvas.width * canvas.height) / 10000;
      let color = theme === 'dark' ? 'rgb(255, 0, 85)' : 'rgb(20, 20, 20)';
      for(let i=0; i<count; i++) particlesArray.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2+1, color));
    }
    function animate() {
      animationFrameId = requestAnimationFrame(animate); ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let p of particlesArray) p.update();
      connect();
    }
    function connect() {
      let color = theme === 'dark' ? '255, 0, 85' : '20, 20, 20';
      for(let a=0; a<particlesArray.length; a++) {
        for(let b=a; b<particlesArray.length; b++) {
          let dist = (particlesArray[a].x - particlesArray[b].x)**2 + (particlesArray[a].y - particlesArray[b].y)**2;
          if (dist < (canvas.width/8)*(canvas.height/8)) {
            let opacity = 1 - (dist/((canvas.width/8)*(canvas.height/8)));
            let midX = (particlesArray[a].x + particlesArray[b].x)/2;
            let midY = (particlesArray[a].y + particlesArray[b].y)/2;
            let distMouse = Math.sqrt((mouse.x - midX)**2 + (mouse.y - midY)**2);
            let lineWidth = 0.5;
            if(distMouse < mouse.radius) {
               let power = 1 - (distMouse/mouse.radius); lineWidth = 0.5 + power*2.5; opacity = Math.min(1, opacity+power*0.5);
               ctx.shadowBlur = 15*power; ctx.shadowColor = `rgba(${color}, 0.8)`;
            } else { ctx.shadowBlur = 0; }
            ctx.strokeStyle = `rgba(${color}, ${opacity})`; ctx.lineWidth = lineWidth;
            ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke(); ctx.shadowBlur = 0;
          }
        }
      }
    }
    init(); animate(); window.addEventListener('resize', () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; init(); });
    return () => cancelAnimationFrame(animationFrameId);
  }, [theme]);
  return <canvas ref={canvasRef} id="canvas-bg"></canvas>;
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeModal, setActiveModal] = useState(null);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollToPortfolio = () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

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
            <h1 className="main-title">Lynav</h1>
            <h2 className="subtitle">Innovations</h2>
            <p className="hero-desc">
              De automações RPA complexas a ecossistemas Full-Stack escaláveis. Transformamos lógica de negócios em software de alta performance.
            </p>
            <button className="btn-liquid" onClick={() => document.getElementById('contact').scrollIntoView()}>
              Iniciar Projeto
            </button>
          </div>
          <div className="scroll-indicator" onClick={scrollToPortfolio}>
             <div className="chevron"></div><div className="chevron"></div><div className="chevron"></div>
          </div>
        </section>

        <section id="portfolio">
          <h2 style={{textAlign:'center', fontSize: '2.5rem', marginBottom:'3rem'}}>Conheça nossas inovações</h2>
          <div className="portfolio-grid">
            
            {/* CARD 1 - Stockie */}
            <div className="card">
              {/* Avatar do Produto (Substituindo o div cinza) */}
              <div className="product-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              
              <div>
                <h3>Stockie</h3>
                <p style={{marginBottom: '15px', fontSize: '1rem', opacity: 0.7}}>
                  Stockie é o seu painel de controle definitivo para a gestão de estoque e finanças. 
                  Pare de adivinhar o que tem na prateleira. 
                  Saiba exatamente quanto você ganhou, quanto perdeu e qual produto está impulsionando seu negócio, 
                  em tempo real e com design que funciona para você.
                </p>
                <a href="https://stockie.com.br" target="_blank">Ver detalhes &rarr;</a>
              </div>
            </div>

            {/* CARD 2 - QuoteApp */}
            <div className="card">
              {/* Avatar do Produto (Substituindo o div cinza) */}
              <div className="product-icon-box">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                 </svg>
              </div>

              <div>
                <h3>QuoteApp</h3>
                <p style={{marginBottom: '15px', fontSize: '1rem', opacity: 0.7}}>
                  Quote App é o seu estúdio de orçamentos no bolso. 
                  Transforme a burocracia de criar propostas em segundos. 
                  Gerencie cada pedido, gere PDFs padronizados instantaneamente com o design limpo e o logotipo da sua empresa.
                  Elimine erros e garanta a melhor primeira impressão.
                </p>
                <a href="#">Ver detalhes &rarr;</a>
              </div>
            </div>

          </div>
        </section>

        <section id="contact">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3>Vamos construir o futuro?</h3>
              <p>Estamos prontos para levar sua operação para o próximo nível. Preencha o formulário ou entre em contato direto.</p>
              <div className="info-item"><span>&#9993;</span> contact@lynav.com</div>
              <div className="info-item"><span>&#128222;</span> (21) 99705-2093</div>
              <div className="info-item"><span>&#128205;</span> Rio de Janeiro, Brasil</div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><input type="text" placeholder="Seu nome" /></div>
              <div className="form-group"><input type="email" placeholder="seu@email.com" /></div>
              <div className="form-group"><textarea rows="4" placeholder="Fale sobre seu projeto..."></textarea></div>
              <button className="btn-liquid" style={{width: '100%'}}>Enviar Mensagem</button>
            </form>
          </div>
        </section>

        <footer className="footer-glass">
            <div className="footer-left">
                <div className="logo" style={{fontSize: '1.2rem', marginBottom:'5px'}}>Lynav <span>.</span></div>
                <p>© 2024 Lynav Innovations. Todos os direitos reservados.</p>
            </div>

            <div className="footer-center">
                <a href="https://instagram.com/navxga" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/lyan-navega-32243721b/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://wa.me/5521997052093?text=Ol%C3%A1!%20Acessei%20o%20site%20da%20Lynav%20e%20gostaria%20de%20saber%20mais%20sobre%20como%20podemos%20transformar%20meu%20neg%C3%B3cio%20com%20tecnologia%20de%20alta%20performance." target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>WhatsApp</span>
                </a>
            </div>

            <div className="footer-right">
                <button className="legal-link" onClick={() => openModal('terms')}>Termos de Uso</button>
                <button className="legal-link" onClick={() => openModal('privacy')}>Política de Privacidade</button>
            </div>
        </footer>

        {activeModal && (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}</h3>
                        <button className="btn-close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {activeModal === 'terms' ? (
                            <>
                                <p><strong>1. Aceitação</strong><br/>Ao utilizar os serviços da Lynav Innovations, você concorda com estes termos.</p>
                                <p><strong>2. Serviços</strong><br/>Nós fornecemos desenvolvimento de software e consultoria em inovação de alta performance.</p>
                                <p><strong>3. Propriedade Intelectual</strong><br/>Todo o código, design e inovações apresentadas são propriedade da Lynav ou de seus respectivos clientes conforme contrato.</p>
                                <p><strong>4. Limitação de Responsabilidade</strong><br/>Não nos responsabilizamos por uso indevido das plataformas desenvolvidas fora do escopo contratado.</p>
                            </>
                        ) : (
                            <>
                                <p><strong>1. Coleta de Dados</strong><br/>Coletamos apenas os dados necessários para comunicação e execução do projeto (Nome, Email, Telefone).</p>
                                <p><strong>2. Uso das Informações</strong><br/>Seus dados nunca serão vendidos a terceiros. Eles são usados exclusivamente para a prestação de nossos serviços.</p>
                                <p><strong>3. Segurança</strong><br/>Utilizamos criptografia de ponta e servidores seguros para proteger suas informações.</p>
                                <p><strong>4. Seus Direitos</strong><br/>Você pode solicitar a exclusão dos seus dados de nossa base a qualquer momento entrando em contato.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </>
  );
}

export default App;