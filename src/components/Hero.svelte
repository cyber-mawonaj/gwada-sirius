<script>
  import { onMount } from 'svelte';
  import { t } from '../lib/i18n.js';
  import anime from '../lib/anime.js';
  
  let starsCanvas;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let heroSection;
  
  onMount(() => {
    const ctx = starsCanvas.getContext('2d');
    const stars = [];
    const starCount = 150;
    const shootingStars = [];
    
    // Animation d'entrée avec AnimeJS
    anime.timeline({
      easing: 'easeOutQuad'
    })
    .add({
      targets: '.title-line',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(200)
    })
    .add({
      targets: '.hero-subtitle',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600')
    .add({
      targets: '.hero-description',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=400')
    .add({
      targets: '.hero-date',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=400')
    .add({
      targets: '.hero-cta .btn',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100)
    }, '-=400');
    
    // Animation des patterns africains
    // Animation du système solaire gérée par CSS
    
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
              speed: 0.1 + Math.random() * 0.5,
              pulseSpeed: 2000 + Math.random() * 3000
            });
          }
          
          // Animer les étoiles avec AnimeJS
          stars.forEach((star, i) => {
            anime({
              targets: star,
              brightness: [0.1, 1, 0.1],
              duration: star.pulseSpeed,
              easing: 'easeInOutSine',
              loop: true,
              delay: i * 20
            });
          });
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
        
        // Dessiner les étoiles
        stars.forEach(star => {
          // Mouvement subtil
          star.x += Math.sin(Date.now() * 0.0001 * star.speed) * 0.5;
          star.y += Math.cos(Date.now() * 0.0001 * star.speed) * 0.3;
          
          // Garder dans les limites
          if (star.x < 0) star.x = starsCanvas.width;
          if (star.x > starsCanvas.width) star.x = 0;
          if (star.y < 0) star.y = starsCanvas.height;
          if (star.y > starsCanvas.height) star.y = 0;
          
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
        });
        
        // Dessiner les étoiles filantes
        shootingStars.forEach((star, index) => {
          if (star.opacity <= 0) {
            shootingStars.splice(index, 1);
            return;
          }
          
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.vx * 20, star.y - star.vy * 20);
          ctx.strokeStyle = `rgba(255, 215, 0, ${star.opacity})`;
          ctx.lineWidth = star.size;
          ctx.stroke();
          
          star.x += star.vx;
          star.y += star.vy;
          star.opacity -= 0.02;
        });
        
        // Créer occasionnellement une étoile filante
        if (Math.random() < 0.01 && shootingStars.length < 3) {
          shootingStars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height * 0.5,
            vx: 5 + Math.random() * 10,
            vy: 2 + Math.random() * 5,
            size: 1 + Math.random() * 2,
            opacity: 1
          });
        }
        
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
  
  // Animation du bouton au survol
  function handleButtonHover(e) {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutElastic(1, .5)'
    });
  }
  
  function handleButtonLeave(e) {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 300,
      easing: 'easeOutElastic(1, .5)'
    });
  }
</script>

<section id="home" class="hero" on:mousemove={handleMouseMove} bind:this={heroSection}>
  <canvas bind:this={starsCanvas} class="stars-canvas"></canvas>
  
  <div class="hero-pattern">
    <!-- Système solaire à gauche -->
    <div class="solar-system">
      <div class="sun"></div>
      <div class="orbit orbit-1">
        <div class="planet planet-1"></div>
      </div>
      <div class="orbit orbit-2">
        <div class="planet planet-2"></div>
      </div>
      <div class="orbit orbit-3">
        <div class="planet planet-3"></div>
      </div>
      <div class="orbit orbit-4">
        <div class="planet planet-4"></div>
      </div>
      <div class="orbit orbit-5">
        <div class="planet planet-5"></div>
      </div>
      <div class="orbit orbit-sirius">
        <div class="planet sirius"></div>
      </div>
    </div>
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
          <a 
            href="#predictions" 
            class="btn btn-primary"
            on:mouseenter={handleButtonHover}
            on:mouseleave={handleButtonLeave}
          >
            {$t('hero_cta_predictions')}
          </a>
          <a 
            href="#about" 
            class="btn btn-outline"
            on:mouseenter={handleButtonHover}
            on:mouseleave={handleButtonLeave}
          >
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
  
  
  .solar-system {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 0.8 !important;
    mix-blend-mode: normal !important;
  }

  .sun {
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #FFD700, #FFA500);
    border-radius: 50%;
    box-shadow: 0 0 20px #FFD700, 0 0 40px #FFA500;
    z-index: 10;
    animation: pulse 4s ease-in-out infinite;
  }

  .orbit {
    position: absolute;
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 50%;
    animation: rotate linear infinite;
  }

  .orbit-1 {
    width: 80px;
    height: 80px;
    animation-duration: 8s;
  }

  .orbit-2 {
    width: 120px;
    height: 120px;
    animation-duration: 12s;
  }

  .orbit-3 {
    width: 160px;
    height: 160px;
    animation-duration: 16s;
  }

  .orbit-4 {
    width: 200px;
    height: 200px;
    animation-duration: 20s;
  }

  .orbit-5 {
    width: 240px;
    height: 240px;
    animation-duration: 24s;
  }

  .orbit-sirius {
    width: 300px;
    height: 300px;
    animation-duration: 30s;
    border-color: rgba(135, 206, 250, 0.3);
  }

  .planet {
    position: absolute;
    border-radius: 50%;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
  }

  .planet-1 {
    width: 4px;
    height: 4px;
    background: #8C7853;
  }

  .planet-2 {
    width: 6px;
    height: 6px;
    background: #FFC649;
  }

  .planet-3 {
    width: 6px;
    height: 6px;
    background: #6B93D6;
  }

  .planet-4 {
    width: 5px;
    height: 5px;
    background: #C1440E;
  }

  .planet-5 {
    width: 8px;
    height: 8px;
    background: #D8CA9D;
  }

  .sirius {
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #87CEEB, #4169E1);
    box-shadow: 0 0 10px #87CEEB, 0 0 20px #4169E1;
    animation: twinkle 2s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 0.7;
      transform: translateX(-50%) scale(1.2);
    }
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
  }
  
  .title-line:nth-child(2) {
    color: var(--color-primary);
  }
  
  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: var(--color-primary);
    font-family: var(--font-heading);
    margin-bottom: 0.5rem;
    opacity: 0;
  }
  
  .hero-description {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: var(--color-light);
    margin-bottom: 1rem;
    opacity: 0;
  }
  
  .hero-date {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0;
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
  }
  
  .btn {
    opacity: 0;
    transform-origin: center;
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