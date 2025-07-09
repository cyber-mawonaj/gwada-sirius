<script>
  import { onMount } from 'svelte';
  
  let starsCanvas;
  let mouseX = 0;
  let mouseY = 0;
  
  onMount(() => {
    const ctx = starsCanvas.getContext('2d');
    const stars = [];
    
    // Créer les étoiles
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random()
      });
    }
    
    // Animation des étoiles
    const animate = () => {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      
      stars.forEach(star => {
        // Effet parallaxe avec la souris
        const offsetX = (mouseX - 0.5) * star.speed * 20;
        const offsetY = (mouseY - 0.5) * star.speed * 20;
        
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX, 
          star.y + offsetY, 
          star.size, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 215, 0, ${star.brightness})`;
        ctx.fill();
        
        // Animer la brillance
        star.brightness += (Math.random() - 0.5) * 0.05;
        star.brightness = Math.max(0.1, Math.min(1, star.brightness));
      });
      
      requestAnimationFrame(animate);
    };
    
    // Redimensionner le canvas
    const resize = () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    };
    
    resize();
    animate();
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  });
  
  const handleMouseMove = (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  };
</script>

<section id="home" class="hero" on:mousemove={handleMouseMove}>
  <canvas bind:this={starsCanvas} class="stars-canvas"></canvas>
  
  <div class="hero-pattern pattern-adinkra"></div>
  
  <div class="hero-content">
    <div class="container">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line">Sirius</span>
          <span class="title-line">en Guadeloupe</span>
        </h1>
        <p class="hero-subtitle">
          Wep Ronpet - L'Ouverture de l'Année Cosmique
        </p>
        <p class="hero-description">
          Le rendez-vous millénaire entre Ciel, Science et Culture
        </p>
        <p class="hero-date">
          Lever héliaque : <strong>22 Juillet 2025</strong>
        </p>
        <div class="hero-cta">
          <a href="#predictions" class="btn btn-primary">
            Découvrir les Prédictions
          </a>
          <a href="#about" class="btn btn-outline">
            En Savoir Plus
          </a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="sirius-glow"></div>
        <div class="ankh-symbol">☥</div>
      </div>
    </div>
  </div>
  
  <div class="scroll-indicator">
    <span>Défiler pour explorer</span>
    <div class="scroll-arrow">↓</div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  .stars-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: 2;
  }
  
  .hero-content {
    position: relative;
    z-index: 3;
    width: 100%;
  }
  
  .hero-content .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .hero-title {
    font-size: clamp(3rem, 10vw, 6rem);
    line-height: 1;
    margin-bottom: 1rem;
  }
  
  .title-line {
    display: block;
    animation: fadeInUp 1s ease-out;
    animation-fill-mode: both;
  }
  
  .title-line:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: var(--color-primary);
    font-family: var(--font-heading);
    margin-bottom: 0.5rem;
    animation: fadeInUp 1s ease-out 0.4s;
    animation-fill-mode: both;
  }
  
  .hero-description {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: var(--color-light);
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease-out 0.5s;
    animation-fill-mode: both;
  }
  
  .hero-date {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease-out 0.6s;
    animation-fill-mode: both;
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease-out 0.8s;
    animation-fill-mode: both;
  }
  
  .btn-outline {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
  
  .btn-outline:hover {
    background: var(--color-primary);
    color: var(--color-dark);
  }
  
  .hero-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sirius-glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
    opacity: 0.5;
    animation: glow 3s ease-in-out infinite;
  }
  
  .ankh-symbol {
    font-size: 15rem;
    color: var(--color-primary);
    animation: float 6s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.5));
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: fadeInUp 1s ease-out 1s;
    animation-fill-mode: both;
  }
  
  .scroll-arrow {
    font-size: 2rem;
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
  
  /* Mobile */
  @media (max-width: 768px) {
    .hero-content .container {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-visual {
      display: none;
    }
    
    .hero-cta {
      justify-content: center;
    }
  }
</style>
