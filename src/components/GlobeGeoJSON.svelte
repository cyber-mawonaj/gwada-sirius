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
    
    const section = document.getElementById('geojson-section');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  async function initGlobe() {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    let rotation = 2.5;
    let zoom = 1;
    let isDragging = false;
    let lastMouseX = 0;
    let waveAnimation = 0;
    
    // Charger les données GeoJSON des continents
    let worldData = null;
    try {
      const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
      worldData = await response.json();
    } catch (error) {
      console.error('Erreur chargement GeoJSON:', error);
    }
    
    // Données des lieux
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
    
    // Gérer les interactions
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoom += e.deltaY * -0.001;
      zoom = Math.min(Math.max(0.5, zoom), 2);
    });
    
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        rotation -= deltaX * 0.01;
        lastMouseX = e.clientX;
      }
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Fonction pour projeter les coordonnées
    function project(lon, lat, r) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (-lon - rotation * 57.3) * Math.PI / 180;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      
      return { x: centerX + x, y: centerY - y, z: z };
    }
    
    // Dessiner un chemin GeoJSON
    function drawPath(coordinates, ctx, radius) {
      ctx.beginPath();
      let started = false;
      
      coordinates.forEach(([lon, lat], i) => {
        const p = project(lon, lat, radius);
        if (p.z > -radius * 0.3) {
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
      });
      
      return started;
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      const currentRadius = radius * zoom;
      
      // Ombre du globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX + 5, centerY + 5, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.filter = 'blur(10px)';
      ctx.fill();
      ctx.restore();
      
      // Océan
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#4A90E2';
      ctx.fill();
      
      // Gradient pour l'effet 3D
      const gradient = ctx.createRadialGradient(
        centerX - currentRadius * 0.3,
        centerY - currentRadius * 0.3,
        0,
        centerX,
        centerY,
        currentRadius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Dessiner les continents depuis GeoJSON
      if (worldData && worldData.features) {
        ctx.save();
        ctx.fillStyle = '#228B22';
        ctx.strokeStyle = '#1F5F1F';
        ctx.lineWidth = 0.5;
        
        worldData.features.forEach(feature => {
          if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates.forEach(ring => {
              if (drawPath(ring, ctx, currentRadius)) {
                ctx.fill();
                ctx.stroke();
              }
            });
          } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => {
              polygon.forEach(ring => {
                if (drawPath(ring, ctx, currentRadius)) {
                  ctx.fill();
                  ctx.stroke();
                }
              });
            });
          }
        });
        
        ctx.restore();
      }
      
      // Grille
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Méridiens
      for (let lon = -180; lon <= 180; lon += 30) {
        const coords = [];
        for (let lat = -90; lat <= 90; lat += 5) {
          coords.push([lon, lat]);
        }
        drawPath(coords, ctx, currentRadius);
        ctx.stroke();
      }
      
      // Parallèles
      for (let lat = -60; lat <= 60; lat += 30) {
        const coords = [];
        for (let lon = -180; lon <= 180; lon += 5) {
          coords.push([lon, lat]);
        }
        drawPath(coords, ctx, currentRadius);
        ctx.stroke();
      }
      
      // Bordure
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Animation de la vague
      waveAnimation += 0.02;
      const waveDay = ((Math.sin(waveAnimation) + 1) / 2) * 46 + 178;
      
      // Dessiner les points
      locations.forEach((loc, i) => {
        const p = project(loc.lon, loc.lat, currentRadius);
        
        if (p.z > -currentRadius * 0.3) {
          const isActive = waveDay >= loc.day;
          const isNear = Math.abs(waveDay - loc.day) < 5;
          
          // Effet de vague
          if (isNear && p.z > 0) {
            const waveSize = 40 * (1 - Math.abs(waveDay - loc.day) / 5);
            const waveGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, waveSize);
            waveGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            waveGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
            waveGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = waveGradient;
            ctx.fillRect(p.x - waveSize, p.y - waveSize, waveSize * 2, waveSize * 2);
          }
          
          // Point
          const opacity = p.z > 0 ? 1 : 0.3;
          ctx.globalAlpha = opacity;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, isActive ? 6 : 4, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? '#FFD700' : '#666666';
          ctx.fill();
          ctx.strokeStyle = isActive ? '#FFFFFF' : '#999999';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Label
          if (p.z > 0) {
            ctx.fillStyle = isActive ? '#FFD700' : '#999999';
            ctx.font = `${12 * zoom}px Inter`;
            ctx.textAlign = 'center';
            ctx.fillText(loc.name, p.x, p.y - 12);
            ctx.font = `${10 * zoom}px Inter`;
            ctx.fillText(loc.date, p.x, p.y + 22);
          }
          
          ctx.globalAlpha = 1;
        }
      });
      
      // Rotation automatique
      if (!isDragging) {
        rotation -= 0.002;
      }
      
      requestAnimationFrame(draw);
    }
    
    draw();
  }
</script>

<section id="geojson-section" class="globe-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Globe avec GeoJSON</h2>
      <p class="section-subtitle">
        Canvas 2D avec données géographiques précises
      </p>
    </div>
    
    <div class="globe-container" class:visible>
      <canvas bind:this={canvas} class="globe-canvas"></canvas>
      
      <div class="globe-controls">
        <p>🖱️ Glisser pour tourner | 🔍 Molette pour zoomer</p>
      </div>
      
      <div class="globe-info">
        <div class="info-card card">
          <h3>GeoJSON + Canvas 2D</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>✅ Léger et rapide</li>
            <li>✅ Contrôle total du rendu</li>
            <li>✅ Animation personnalisée de la vague</li>
            <li>✅ Pas de dépendances externes</li>
          </ul>
          <p><strong>Inconvénients :</strong></p>
          <ul>
            <li>❌ Calculs de projection manuels</li>
            <li>❌ Pas de textures satellite</li>
            <li>❌ Performance limitée avec beaucoup de détails</li>
          </ul>
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
  
  .info-card ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
  }
  
  .info-card li {
    padding: 0.25rem 0;
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
