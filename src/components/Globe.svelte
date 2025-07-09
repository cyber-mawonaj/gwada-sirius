<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
          if (!canvas.hasAttribute('data-initialized')) {
            initGlobe();
            canvas.setAttribute('data-initialized', 'true');
          }
        }
      });
    });
    
    const section = document.getElementById('globe-section');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  function initGlobe() {
    // Version simplifiée avec Canvas 2D au lieu de Three.js pour la performance
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    let rotation = 0;
    
    const locations = [
      { name: 'Guadeloupe', lat: 16.2650, lon: -61.5510, date: '22 Juillet' },
      { name: 'Martinique', lat: 14.6415, lon: -61.0242, date: '23 Juillet' },
      { name: 'Dakar', lat: 14.7167, lon: -17.4677, date: '23 Juillet' },
      { name: 'Le Caire', lat: 30.0444, lon: 31.2357, date: '3 Août' },
      { name: 'Kinshasa', lat: -4.4419, lon: 15.2663, date: '16 Juillet' }
    ];
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Méridiens et parallèles
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.cos(angle), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Points des villes
      locations.forEach((loc, i) => {
        const phi = (90 - loc.lat) * Math.PI / 180;
        const theta = (loc.lon + rotation) * Math.PI / 180;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        // Ne dessiner que si visible (z > 0)
        if (z > 0) {
          const screenX = centerX + x;
          const screenY = centerY - y;
          
          // Point
          ctx.beginPath();
          ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
          
          // Glow
          const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 20);
          gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(screenX - 20, screenY - 20, 40, 40);
          
          // Label
          ctx.fillStyle = '#FFD700';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(loc.name, screenX, screenY - 15);
          ctx.fillText(loc.date, screenX, screenY + 25);
        }
      });
      
      rotation += 0.005;
      requestAnimationFrame(draw);
    }
    
    draw();
  }
</script>

<section id="globe-section" class="globe-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>La Vague Planétaire de Sirius</h2>
      <p class="section-subtitle">
        Le lever héliaque progresse d'Est en Ouest à travers le monde
      </p>
    </div>
    
    <div class="globe-container" class:visible>
      <canvas bind:this={canvas} class="globe-canvas"></canvas>
      
      <div class="globe-info">
        <div class="info-card card">
          <h3>Le Phénomène Global</h3>
          <p>
            Le lever héliaque de Sirius n'est pas simultané sur Terre. 
            Il progresse comme une vague, commençant dans l'hémisphère sud 
            pour remonter vers le nord. Cette progression suit la géométrie 
            céleste et dépend de la latitude de chaque lieu.
          </p>
          <p>
            En Guadeloupe, nous sommes privilégiés : le phénomène se produit 
            fin juillet, dans des conditions météorologiques généralement favorables.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .globe-section {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-dawn);
  }
  
  .globe-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    align-items: center;
    margin-top: var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .globe-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .globe-canvas {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .info-card h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .info-card p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  
  @media (max-width: 768px) {
    .globe-container {
      grid-template-columns: 1fr;
    }
    
    .globe-canvas {
      height: 300px;
    }
  }
</style>
