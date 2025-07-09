<script>
  import { onMount } from 'svelte';
  import { worldData } from '../data/world.js';
  
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
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    let rotation = 2.5; // Commencer avec l'Atlantique visible
    let zoom = 1;
    let isDragging = false;
    let lastMouseX = 0;
    let waveAnimation = 0;
    
    // Données des lieux dans l'ordre chronologique
    const locations = [
      { name: 'La Réunion', lat: -21.1151, lon: 55.5364, date: '27 Juin', day: 178 },
      { name: 'Kinshasa', lat: -4.4419, lon: 15.2663, date: '16 Juillet', day: 197 },
      { name: 'Guadeloupe', lat: 16.2650, lon: -61.5510, date: '22 Juillet', day: 203 },
      { name: 'Martinique', lat: 14.6415, lon: -61.0242, date: '23 Juillet', day: 204 },
      { name: 'Dakar', lat: 14.7167, lon: -17.4677, date: '23 Juillet', day: 204 },
      { name: 'Abidjan', lat: 5.3600, lon: -4.0083, date: '28 Juillet', day: 209 },
      { name: 'Le Caire', lat: 30.0444, lon: 31.2357, date: '3 Août', day: 215 },
      { name: 'Paris', lat: 48.8566, lon: 2.3522, date: '12 Août', day: 224 }
    ];
    
    // Gérer le zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoom += e.deltaY * -0.001;
      zoom = Math.min(Math.max(0.5, zoom), 2);
    });
    
    // Gérer la rotation avec la souris
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        rotation -= deltaX * 0.01; // Inverser pour tourner dans le bon sens
        lastMouseX = e.clientX;
      }
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Support tactile
    canvas.addEventListener('touchstart', (e) => {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      e.preventDefault();
    });    
    canvas.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastMouseX;
        rotation -= deltaX * 0.01; // Garder le - pour le tactile aussi
        lastMouseX = e.touches[0].clientX;
        e.preventDefault();
      }
    });
    
    canvas.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Dessiner les continents simplifiés
    function drawContinents(ctx, centerX, centerY, radius, rotation) {
      ctx.save();
      ctx.globalAlpha = 0.8;      // Plus opaque
      ctx.strokeStyle = '#8B7355'; // Marron clair
      ctx.fillStyle = '#DEB887';   // Burlywood (beige)
      ctx.lineWidth = 0.5;
      
      // Afrique (très simplifiée)
      const africa = [
        {lat: 37, lon: 10}, {lat: 35, lon: -5}, {lat: 30, lon: -17},
        {lat: 15, lon: -17}, {lat: 5, lon: -10}, {lat: -5, lon: 8},
        {lat: -15, lon: 15}, {lat: -25, lon: 20}, {lat: -35, lon: 20},
        {lat: -35, lon: 30}, {lat: -25, lon: 35}, {lat: -10, lon: 40},
        {lat: 5, lon: 45}, {lat: 15, lon: 45}, {lat: 30, lon: 35}, {lat: 37, lon: 10}
      ];
      drawLandmass(africa);      
      // Amérique du Sud
      const southAmerica = [
        {lat: 10, lon: -60}, {lat: 5, lon: -50}, {lat: -5, lon: -35},
        {lat: -15, lon: -38}, {lat: -25, lon: -48}, {lat: -35, lon: -58},
        {lat: -45, lon: -65}, {lat: -55, lon: -70}, {lat: -45, lon: -73},
        {lat: -35, lon: -72}, {lat: -25, lon: -70}, {lat: -15, lon: -75},
        {lat: -5, lon: -78}, {lat: 5, lon: -77}, {lat: 10, lon: -60}
      ];
      drawLandmass(southAmerica);
      
      // Europe (simplifiée)
      const europe = [
        {lat: 60, lon: 25}, {lat: 55, lon: 10}, {lat: 50, lon: -5},
        {lat: 45, lon: -5}, {lat: 40, lon: -10}, {lat: 36, lon: -6},
        {lat: 40, lon: 0}, {lat: 45, lon: 10}, {lat: 50, lon: 20},
        {lat: 55, lon: 30}, {lat: 60, lon: 25}
      ];
      drawLandmass(europe);
      
      function drawLandmass(points) {
        const coords = points.map(p => {
          const phi = (90 - p.lat) * Math.PI / 180;
          const theta = (p.lon - rotation * 57.3) * Math.PI / 180;
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          return { x: centerX + x, y: centerY - y, z: z };
        });        
        // Ne dessiner que si au moins un point est visible
        if (coords.some(c => c.z > -radius * 0.5)) {
          ctx.beginPath();
          coords.forEach((c, i) => {
            if (i === 0) ctx.moveTo(c.x, c.y);
            else ctx.lineTo(c.x, c.y);
          });
          ctx.closePath();
          if (coords[0].z > 0) {
            ctx.fill();
          }
          ctx.stroke();
        }
      }
      
      ctx.restore();
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      const currentRadius = radius * zoom;
      
      // Océan (fond du globe)
      const oceanGradient = ctx.createRadialGradient(
        centerX - currentRadius * 0.3, 
        centerY - currentRadius * 0.3, 
        0, 
        centerX, 
        centerY, 
        currentRadius
      );      oceanGradient.addColorStop(0, '#87CEEB');   // Sky blue clair
      oceanGradient.addColorStop(0.7, '#5F9EA0');  // Cadet blue
      oceanGradient.addColorStop(1, '#4682B4');    // Steel blue
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGradient;
      ctx.fill();
      
      // Grille de méridiens et parallèles
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';  // Noir transparent
      ctx.lineWidth = 0.5;
      
      // Méridiens (longitudes)
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (90 - lat) * Math.PI / 180;
          const theta = (lon - rotation * 57.3) * Math.PI / 180;
          
          const x = currentRadius * Math.sin(phi) * Math.cos(theta);
          const y = currentRadius * Math.cos(phi);
          const z = currentRadius * Math.sin(phi) * Math.sin(theta);
          
          if (z > 0) {
            const screenX = centerX + x;
            const screenY = centerY - y;
            if (lat === -90) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }      
      // Parallèles (latitudes)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const phi = (90 - lat) * Math.PI / 180;
          const theta = (lon - rotation * 57.3) * Math.PI / 180;
          
          const x = currentRadius * Math.sin(phi) * Math.cos(theta);
          const y = currentRadius * Math.cos(phi);
          const z = currentRadius * Math.sin(phi) * Math.sin(theta);
          
          if (z > 0) {
            const screenX = centerX + x;
            const screenY = centerY - y;
            if (lon === -180) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }
      
      // Dessiner les continents
      drawContinents(ctx, centerX, centerY, currentRadius, rotation);
      
      // Bordure du globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';  // Noir semi-transparent
      ctx.lineWidth = 2;
      ctx.stroke();      
      // Dessiner la vague de progression
      waveAnimation += 0.02;
      const waveDay = ((Math.sin(waveAnimation) + 1) / 2) * 46 + 178; // Entre jour 178 et 224
      
      // Dessiner les points et la vague
      locations.forEach((loc, i) => {
        const phi = (90 - loc.lat) * Math.PI / 180;
        const theta = (-loc.lon - rotation * 57.3) * Math.PI / 180; // Remettre le - devant loc.lon
        
        const x = currentRadius * Math.sin(phi) * Math.cos(theta);
        const y = currentRadius * Math.cos(phi);
        const z = currentRadius * Math.sin(phi) * Math.sin(theta);
        
        if (z > -currentRadius * 0.3) {
          const screenX = centerX + x;
          const screenY = centerY - y;
          
          // Calculer l'état selon la vague
          const isActive = waveDay >= loc.day;
          const isNear = Math.abs(waveDay - loc.day) < 5;
          
          // Effet de vague
          if (isNear && z > 0) {
            const waveSize = 40 * (1 - Math.abs(waveDay - loc.day) / 5);
            const waveGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, waveSize);
            waveGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            waveGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
            waveGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = waveGradient;
            ctx.fillRect(screenX - waveSize, screenY - waveSize, waveSize * 2, waveSize * 2);
          }          
          // Point
          const opacity = z > 0 ? 1 : 0.3;
          ctx.globalAlpha = opacity;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, isActive ? 6 : 4, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? '#FFD700' : '#666666';
          ctx.fill();
          ctx.strokeStyle = isActive ? '#FFFFFF' : '#999999';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Label
          if (z > 0) {
            ctx.fillStyle = isActive ? '#FFD700' : '#999999';
            ctx.font = `${12 * zoom}px Inter`;
            ctx.textAlign = 'center';
            ctx.fillText(loc.name, screenX, screenY - 12);
            ctx.font = `${10 * zoom}px Inter`;
            ctx.fillText(loc.date, screenX, screenY + 22);
          }
          
          ctx.globalAlpha = 1;
        }
      });
      
      // Légende
      ctx.fillStyle = '#FFD700';
      ctx.font = '16px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('🌟 Vague du Lever Héliaque de Sirius', 20, 30);      ctx.font = '12px Inter';
      ctx.fillStyle = '#CCCCCC';
      const currentDate = locations.find(l => Math.abs(l.day - waveDay) < 2);
      if (currentDate) {
        ctx.fillText(`Animation : ${currentDate.name} - ${currentDate.date}`, 20, 50);
      }
      
      // Rotation automatique lente
      if (!isDragging) {
        rotation += 0.002;
      }
      
      requestAnimationFrame(draw);
    }
    
    draw();
  }
</script>

<section id="globe-section" class="globe-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Globe Original (Canvas simple)</h2>
      <p class="section-subtitle">
        Version actuelle avec formes simplifiées
      </p>
    </div>
    
    <div class="globe-container" class:visible>
      <canvas bind:this={canvas} class="globe-canvas"></canvas>
      
      <div class="globe-controls">
        <p>🖱️ Glisser pour tourner | 🔍 Molette pour zoomer</p>
      </div>      
      <div class="globe-info">
        <div class="info-card card">
          <h3>Le Phénomène Global</h3>
          <p>
            Le lever héliaque de Sirius n'est pas simultané sur Terre. 
            Il progresse comme une vague dorée, commençant dans l'océan Indien 
            (La Réunion en juin) pour traverser l'Afrique, les Caraïbes, 
            puis remonter vers l'Europe (Paris en août).
          </p>
          <p>
            Cette progression suit la géométrie céleste : plus on va vers le nord, 
            plus le phénomène se produit tard. La Guadeloupe se trouve au cœur 
            de cette vague en juillet, bénéficiant de conditions idéales.
          </p>
          <div class="timeline-mini">
            <div class="timeline-item-mini">
              <span class="date">27 Juin</span>
              <span class="location">La Réunion</span>
            </div>
            <div class="timeline-item-mini">
              <span class="date">22-23 Juillet</span>
              <span class="location">Guadeloupe & Caraïbes</span>
            </div>
            <div class="timeline-item-mini">
              <span class="date">12 Août</span>
              <span class="location">Paris</span>
            </div>
          </div>
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
    height: 500px;
    border-radius: 20px;
    background: radial-gradient(circle at center, #0a192f 0%, #020c1b 100%);
    cursor: grab;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
  
  .globe-canvas:active {
    cursor: grabbing;
  }  
  .globe-controls {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-primary);
    opacity: 0.7;
  }
  
  .info-card h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .info-card p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  
  .timeline-mini {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(255, 215, 0, 0.1);
    border-radius: 10px;
  }
  
  .timeline-item-mini {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  .timeline-item-mini:last-child {
    border-bottom: none;
  }  
  .timeline-item-mini .date {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .timeline-item-mini .location {
    color: var(--color-light);
  }
  
  @media (max-width: 768px) {
    .globe-container {
      grid-template-columns: 1fr;
    }
    
    .globe-canvas {
      height: 400px;
    }
  }
</style>
