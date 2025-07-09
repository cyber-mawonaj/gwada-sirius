<script>
  import { onMount } from 'svelte';
  import { t } from '../lib/i18n.js';
  
  let starsCanvas;
  let mouseX = 0.5;
  let mouseY = 0.5;
  
  onMount(() => {
    const ctx = starsCanvas.getContext('2d');
    const stars = [];
    const starCount = 150;
    
    // Attendre que le DOM soit prêt
    setTimeout(() => {
      // Redimensionner le canvas
      const resize = () => {
        const hero = starsCanvas.parentElement;
        starsCanvas.width = hero.offsetWidth;
        starsCanvas.height = hero.offsetHeight;
        
        // Réinitialiser les étoiles après redimensionnement
        if (stars.length === 0) {
          for (let i = 0; i < starCount; i++) {
            stars.push({
              x: Math.random() * starsCanvas.width,
              y: Math.random() * starsCanvas.height,
              size: Math.random() * 2,
              brightness: Math.random(),
              speed: 0.1 + Math.random() * 0.5
            });
          }
        }
      };
      
      resize();
      window.addEventListener('resize', resize);
      
      // Animation des étoiles
      const animate = () => {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        
        // Effet de parallaxe avec la souris
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;
        
        stars.forEach(star => {
          // Mouvement subtil
          star.x += Math.sin(Date.now() * 0.0001 * star.speed) * 0.5;
          star.y += Math.cos(Date.now() * 0.0001 * star.speed) * 0.3;
          
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
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, 100);
  });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  };
</script>

<section id="home" class="hero" on:mousemove={handleMouseMove}>
  <canvas bind:this={starsCanvas} class="stars-canvas"></canvas>
  
  <div class="hero-pattern">
    <!-- Patterns africains visibles -->
    <div class="pattern-overlay pattern-kente"></div>
    <div class="pattern-overlay pattern-adinkra"></div>
    <div class="pattern-overlay pattern-bogolan"></div>
  </div>
  
  <div class="hero-content">
    <div class="container">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line">{$t('hero_title1')}</span>
          <span class="title-line">{$t('hero_title2')}</span>
        </h1>
        <p class="hero-subtitle">
          {$t('hero_subtitle')}
        </p>
        <p class="hero-description">
          {$t('hero_description')}
        </p>
        <p class="hero-date">
          {$t('hero_date')}<strong>{$t('hero_date_value')}</strong>
        </p>
        <div class="hero-cta">
          <a href="#predictions" class="btn btn-primary">
            {$t('hero_cta_predictions')}
          </a>
          <a href="#about" class="btn btn-outline">
            {$t('hero_cta_learn')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    background: var(--gradient-dawn);
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
    pointer-events: none;
  }
  
  .hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .pattern-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-size: 200px 200px;
    mix-blend-mode: overlay;
  }
  
  .pattern-kente {
    background-image: 
      repeating-linear-gradient(
        45deg,
        var(--color-primary) 0px,
        var(--color-primary) 10px,
        transparent 10px,
        transparent 20px,
        var(--color-secondary) 20px,
        var(--color-secondary) 30px,
        transparent 30px,
        transparent 40px
      ),
      repeating-linear-gradient(
        -45deg,
        var(--color-accent) 0px,
        var(--color-accent) 10px,
        transparent 10px,
        transparent 20px
      );
    animation: slidePattern 30s linear infinite;
  }
  
  .pattern-adinkra {
    background-image: 
      radial-gradient(circle at 20% 20%, var(--color-primary) 2px, transparent 2px),
      radial-gradient(circle at 80% 80%, var(--color-secondary) 2px, transparent 2px),
      radial-gradient(circle at 50% 50%, var(--color-accent) 3px, transparent 3px);
    background-size: 50px 50px;
    animation: rotatePattern 40s linear infinite;
  }
  
  .pattern-bogolan {
    background-image: 
      repeating-conic-gradient(
        from 0deg at 50% 50%,
        var(--color-primary) 0deg 10deg,
        transparent 10deg 20deg
      );
    background-size: 100px 100px;
    opacity: 0.05;
    animation: pulsePattern 20s ease-in-out infinite;
  }
  
  @keyframes slidePattern {
    from { transform: translateX(0); }
    to { transform: translateX(200px); }
  }
  
  @keyframes rotatePattern {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulsePattern {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.15; }
  }
  
  .hero-content {
    position: relative;
    z-index: 10;
    width: 100%;
    padding: var(--spacing-xl) 0;
  }
  
  .hero-text {
    max-width: 600px;
    text-align: center;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
    color: var(--color-light);
  }
  
  .title-line {
    display: block;
    opacity: 0;
    animation: fadeInUp 1s ease-out forwards;
  }
  
  .title-line:nth-child(2) {
    color: var(--color-primary);
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
  
  .hero-date strong {
    color: var(--color-primary);
    font-weight: 700;
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
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
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: clamp(2.5rem, 10vw, 4rem);
    }
    
    .hero-cta {
      flex-direction: column;
      align-items: center;
    }
    
    .btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>