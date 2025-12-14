import React, { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import './App.css'; 

// Importando ícones (adicionei o FaCheckCircle)
import { FaInstagram, FaLinkedin, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeModal, setActiveModal] = useState(null);
  
  // --- NOVO STATE PARA O TOAST ---
  const [showToast, setShowToast] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollToPortfolio = () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  // --- FUNÇÃO DE ENVIO FAKE ---
  const handleSendMessage = (e) => {
    e.preventDefault(); // Impede o reload da página
    
    // Mostra o Toast
    setShowToast(true);

    // Limpa os campos do formulário visualmente
    e.target.reset();

    // Esconde o Toast depois de 4 segundos
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <>
      <div className={`app-container theme-${theme}`}>
        
        <BackgroundAnimation theme={theme} />

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
            <div className="card">
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

            <div className="card">
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
            
            {/* AQUI: Conectei a função handleSendMessage */}
            <form onSubmit={handleSendMessage}>
              <div className="form-group"><input type="text" placeholder="Seu nome" required /></div>
              <div className="form-group"><input type="email" placeholder="seu@email.com" required /></div>
              <div className="form-group"><textarea rows="4" placeholder="Fale sobre seu projeto..." required></textarea></div>
              <button className="btn-liquid" style={{width: '100%'}}>Enviar Mensagem</button>
            </form>
          </div>
        </section>

        <footer className="footer-glass">
            <div className="footer-left">
                <div className="logo" style={{fontSize: '1.2rem', marginBottom:'5px'}}>Lynav <span>.</span></div>
                <p>© 2025 Lynav Innovations. Todos os direitos reservados.</p>
            </div>

            <div className="footer-center">
                <a href="https://instagram.com/navxga" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaInstagram size={24} />
                    <span>Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/lyan-navega-32243721b/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin size={24} />
                    <span>LinkedIn</span>
                </a>
                <a href="https://wa.me/5521997052093?text=Ol%C3%A1!%20Acessei%20o%20site%20da%20Lynav%20e%20gostaria%20de%20saber%20mais%20sobre%20como%20podemos%20transformar%20meu%20neg%C3%B3cio%20com%20tecnologia%20de%20alta%20performance." target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaWhatsapp size={24} />
                    <span>WhatsApp</span>
                </a>
            </div>

            <div className="footer-right">
                <button className="legal-link" onClick={() => openModal('terms')}>Termos de Uso</button>
                <button className="legal-link" onClick={() => openModal('privacy')}>Política de Privacidade</button>
            </div>
        </footer>

        {/* --- TOAST NOTIFICATION COMPONENT --- */}
        <div className={`toast ${showToast ? 'show' : ''}`}>
           <FaCheckCircle size={20} />
           <span>Mensagem enviada com sucesso!</span>
        </div>

        {activeModal && (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}</h3>
                        <button className="btn-close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                       {/* (Conteúdo do modal mantido igual) */}
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
