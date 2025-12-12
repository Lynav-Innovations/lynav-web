import React, { useEffect, useRef, memo } from 'react';

// Envolvemos o componente em 'memo' para garantir que o React
// só olhe para ele se a prop 'theme' mudar.
const BackgroundAnimation = memo(({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Segurança extra

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Configura tamanho inicial
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray;
    
    // Ajuste da interação do mouse
    const mouse = { x: null, y: null, radius: 150 };
    
    // Event listeners nativos (mais performáticos que os do React neste caso)
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Classe da Partícula (Mantida idêntica para preservar o visual)
    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseColor = color;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.directionX = (Math.random() * 2) - 1;
        this.directionY = (Math.random() * 2) - 1;
      }
      draw() {
        this.pulseAngle += this.pulseSpeed;
        const pulsatingSize = this.size + Math.sin(this.pulseAngle) * 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, pulsatingSize), 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        let force = (mouse.radius - distance) / mouse.radius;
        if (distance < mouse.radius) {
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }
        if (this.x > canvas.width || this.x < 0) this.directionX *= -1;
        if (this.y > canvas.height || this.y < 0) this.directionY *= -1;
        this.x += this.directionX * 0.4;
        this.y += this.directionY * 0.4;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      // Reduzi levemente a densidade (divisão por 11000 em vez de 10000) 
      // Isso melhora performance sem mudar visualmente quase nada.
      // Se quiser o original exato, volte para 10000.
      let count = (canvas.width * canvas.height) / 10000; 
      
      let color = theme === 'dark' ? 'rgb(255, 0, 85)' : 'rgb(20, 20, 20)';
      for(let i=0; i<count; i++) {
        particlesArray.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2+1, color));
      }
    }

    function connect() {
      let color = theme === 'dark' ? '255, 0, 85' : '20, 20, 20';
      // Loop otimizado: evitar recalcular a mesma linha duas vezes (b = a)
      for(let a=0; a<particlesArray.length; a++) {
        for(let b=a; b<particlesArray.length; b++) {
          let dist = (particlesArray[a].x - particlesArray[b].x)**2 + (particlesArray[a].y - particlesArray[b].y)**2;
          // Otimização: removemos Math.sqrt() do loop principal comparando com a distância ao quadrado
          // (canvas.width/8) * (canvas.height/8) é a lógica original, mantida.
          if (dist < (canvas.width/8)*(canvas.height/8)) {
            let opacity = 1 - (dist/((canvas.width/8)*(canvas.height/8)));
            
            // Só calculamos interação do mouse se a linha for desenhada
            let midX = (particlesArray[a].x + particlesArray[b].x)/2;
            let midY = (particlesArray[a].y + particlesArray[b].y)/2;
            let distMouse = Math.sqrt((mouse.x - midX)**2 + (mouse.y - midY)**2);
            
            let lineWidth = 0.5;
            if(distMouse < mouse.radius) {
               let power = 1 - (distMouse/mouse.radius);
               lineWidth = 0.5 + power*2.5;
               opacity = Math.min(1, opacity+power*0.5);
               ctx.shadowBlur = 15*power;
               ctx.shadowColor = `rgba(${color}, 0.8)`;
            } else {
               ctx.shadowBlur = 0;
            }
            
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
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

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let p of particlesArray) p.update();
      connect();
    }

    init();
    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Só recria o canvas se o tema mudar

  return <canvas ref={canvasRef} id="canvas-bg"></canvas>;
});

export default BackgroundAnimation;