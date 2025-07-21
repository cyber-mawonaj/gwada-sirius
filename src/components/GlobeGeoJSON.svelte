<script>
import { onMount } from 'svelte';
import anime from '../lib/anime.js';
  
  let canvas;
  let visible = false;
  let ctx;
  let animationId;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !ctx) {
          visible = true;
          initGlobe();
        }
      });
    });
    
    const section = document.getElementById('geojson-section');
    if (section) observer.observe(section);
    
    return () => {
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  });
  
  async function initGlobe() {
    ctx = canvas.getContext('2d');
    
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
    let waveProgress = 0;    
    // Animation d'entrée
    anime.timeline({
      easing: 'easeOutQuad'
    })
    .add({
      targets: canvas,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1200
    })
    .add({
      targets: '.globe-info',
      translateX: [50, 0],
      opacity: [0, 1],
      duration: 1000
    }, '-=600');
    
    
    // Charger les données GeoJSON des continents
    let worldData = null;
    try {
      const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
      worldData = await response.json();
    } catch (error) {
      console.error('Erreur chargement GeoJSON:', error);
    }
    // Données des lieux avec animation de vague (juin à septembre)
    const locations = [
      { name: 'La Réunion', lat: -21.1151, lon: 55.5364, date: '27 Juin', color: '#FF6B35', day: 0 },
      { name: 'Kinshasa', lat: -4.4419, lon: 15.2663, date: '16 Juillet', color: '#FFA500', day: 19 },
      { name: 'Douala', lat: 4.0511, lon: 9.7679, date: '18 Juillet', color: '#FFA500', day: 21 },
      { name: 'Yaoundé', lat: 3.8480, lon: 11.5021, date: '19 Juillet', color: '#FFA500', day: 22 },
      { name: 'Abidjan', lat: 5.3600, lon: -4.0083, date: '20 Juillet', color: '#FFD700', day: 23 },
      { name: 'Accra', lat: 5.6037, lon: -0.1870, date: '21 Juillet', color: '#FFD700', day: 24 },
      { name: 'Guadeloupe', lat: 16.2650, lon: -61.5510, date: '22 Juillet', color: '#FFD700', day: 25 },
      { name: 'Martinique', lat: 14.6415, lon: -61.0242, date: '23 Juillet', color: '#FFD700', day: 26 },
      { name: 'Dakar', lat: 14.7167, lon: -17.4677, date: '23 Juillet', color: '#FFE44D', day: 26 },
      { name: 'Cayenne', lat: 4.9346, lon: -52.3281, date: '24 Juillet', color: '#FFE44D', day: 27 },
      { name: 'Bamako', lat: 12.6392, lon: -8.0029, date: '25 Juillet', color: '#FFE44D', day: 28 },
      { name: 'Le Caire', lat: 30.0444, lon: 31.2357, date: '3 Août', color: '#FFFACD', day: 37 },
      { name: 'Paris', lat: 48.8566, lon: 2.3522, date: '15 Août', color: '#F0F8FF', day: 49 }
    ];
    
    // Animation de la progression de la vague (juin à septembre)
    anime({
      targets: { progress: 0 },
      progress: 92, // Juin (jour 152) à septembre (jour 244) = 92 jours
      duration: 12000, // 12 secondes pour 4 mois
      easing: 'linear',
      loop: true,
      update: function(anim) {
        waveProgress = anim.animations[0].currentValue;
      }
    });
    
    // Particules pour l'effet de vague
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: radius + Math.random() * 50,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.02 + 0.01,
        opacity: 0
      });
    }
    
    // Animation des particules
    particles.forEach((particle, i) => {
      anime({
        targets: particle,
        opacity: [0, 0.8, 0],
        radius: [radius, radius + 100],
        duration: 3000,
        delay: i * 60,
        easing: 'easeOutQuad',
        loop: true
      });
    });
    
    // Gestion de la souris
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      canvas.style.cursor = 'grabbing';
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        rotation -= deltaX * 0.01;
        lastMouseX = e.clientX;
      }
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    });
    
    // Zoom avec la molette
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = zoom * zoomDelta;
      
      anime({
        targets: { zoom },
        zoom: Math.max(0.5, Math.min(3, newZoom)),
        duration: 300,
        easing: 'easeOutQuad',
        update: function(anim) {
          zoom = anim.animations[0].currentValue;
        }
      });
    });
    
    // Projection 3D (lon/lat to screen coordinates)
    function project(lon, lat, r) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = lon * Math.PI / 180 - rotation;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      return {
        x: centerX - x,
        y: centerY - y,
        z: z,
        visible: z > 0
      };
    }
    
    // Dessiner le globe
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Calculer le rayon actuel avec zoom
      const currentRadius = radius * zoom;
      
      // Fond avec dégradé
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius);
      gradient.addColorStop(0, 'rgba(10, 22, 40, 0.2)');
      gradient.addColorStop(1, 'rgba(10, 22, 40, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Ombre du globe
      ctx.beginPath();
      ctx.arc(centerX + 10, centerY + 10, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      
      // Globe principal
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      const globeGradient = ctx.createRadialGradient(
        centerX - radius * 0.3 * zoom, 
        centerY - radius * 0.3 * zoom, 
        0,
        centerX, centerY, currentRadius
      );
      globeGradient.addColorStop(0, '#1a3a5a');
      globeGradient.addColorStop(0.5, '#0f2847');
      globeGradient.addColorStop(1, '#0a1628');
      ctx.fillStyle = globeGradient;
      ctx.fill();
      
    // Grille de latitude/longitude
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.lineWidth = 1;
      
      // Lignes de latitude
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const p = project(lon, lat, currentRadius);
          if (p.visible) {
            if (lon === -180) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }
      
      // Lignes de longitude
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = project(lon, lat, currentRadius);
          if (p.visible) {
            if (lat === -90) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }
      
      // Dessiner les continents
      if (worldData) {
        ctx.save();
        ctx.strokeStyle = '#4CAF50';
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
        ctx.lineWidth = 2;

        worldData.features.forEach(feature => {
          if (feature.geometry.type === 'Polygon') {
            drawPolygon(feature.geometry.coordinates[0]);
          } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => {
              drawPolygon(polygon[0]);
            });
          }
        });
        ctx.restore();
      }
      
      // Dessiner les particules de la vague
      particles.forEach(particle => {
        const p = project(
          particle.angle * 180 / Math.PI - 180,
          Math.sin(Date.now() * 0.001 * particle.speed) * 30,
          currentRadius + (particle.radius - radius)
        );
        
        if (p.visible && particle.opacity > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
          ctx.fill();
        }
      });
      
      // Dessiner les marqueurs avec effet de pulsation
      locations.forEach((location, index) => {
        const p = project(location.lon, location.lat, currentRadius);
        
        if (p.visible) {
          // Vérifier si la vague est passée
          const isActive = waveProgress >= location.day && waveProgress <= location.day + 10;
          const scale = isActive ? 1 + Math.sin(Date.now() * 0.005) * 0.3 : 1;
          
          // Cercle de base
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8 * scale, 0, Math.PI * 2);
          ctx.fillStyle = location.color;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Onde de propagation si actif
          if (isActive) {
            const waveRadius = 20 + (Date.now() * 0.02) % 30;
            const waveOpacity = 1 - (waveRadius - 20) / 30;
            ctx.beginPath();
            ctx.arc(p.x, p.y, waveRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 215, 0, ${waveOpacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          
          // Label
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(location.name, p.x, p.y - 15);
          
          // Date si proche
          if (Math.abs(waveProgress - location.day) < 20) {
            ctx.font = '10px Inter';
            ctx.fillStyle = location.color;
            ctx.fillText(location.date, p.x, p.y + 25);
          }
        }
      });
      
      // Indicateur de progression de la vague
      const startDate = new Date(2025, 5, 27); // 27 juin 2025
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + Math.floor(waveProgress));
      
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        `Progression de la vague : ${currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`,
        centerX, height - 30
      );
      
      // Rotation automatique
      if (!isDragging) {
        rotation += 0.002;
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    function drawPolygon(coordinates) {
      ctx.beginPath();
      let firstPoint = true;
      const currentRadius = radius * zoom;
      
      coordinates.forEach(coord => {
        const p = project(coord[0], coord[1], currentRadius);
        if (p.visible) {
          if (firstPoint) {
            ctx.moveTo(p.x, p.y);
            firstPoint = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
      });
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    
    draw();
  }
</script>
<section id="geojson-section" class="globe-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>La Vague Planétaire de Sirius</h2>
      <p class="section-subtitle">
        Visualisation de la progression du lever héliaque à travers le monde
      </p>
    </div>
    
    <div class="globe-container" class:visible>
      <canvas bind:this={canvas} class="globe-canvas"></canvas>
      
      <div class="globe-controls">
        <p>🖱️ Glisser pour tourner | 🔍 Molette pour zoomer</p>
      </div>
      
      <div class="globe-info">
        <div class="info-card card">
          <h3>Le Phénomène de la Vague</h3>
          <p>
            Le lever héliaque de Sirius ne se produit pas simultanément sur toute la Terre. 
            Tel une vague cosmique, il progresse d'Est en Ouest, touchant d'abord La Réunion 
            fin juin, puis traversant l'Afrique, pour finalement atteindre les Caraïbes en juillet.
          </p>
          <p>
            Cette animation montre la progression de cette "vague planétaire" qui suit 
            la rotation terrestre et la position de Sirius dans le ciel. Chaque lieu 
            expérimente ce moment sacré à une date précise, créant un calendrier 
            cosmique naturel qui a guidé les civilisations pendant des millénaires.
          </p>
          <div class="wave-timeline">
            <div class="timeline-entry">
              <span class="date">27 Juin</span>
              <span class="location">La Réunion</span>
            </div>
            <div class="timeline-entry">
              <span class="date">16-19 Juillet</span>
              <span class="location">Kinshasa, Douala, Yaoundé</span>
            </div>
            <div class="timeline-entry">
              <span class="date">20-24 Juillet</span>
              <span class="location">Abidjan, Accra, Antilles, Cayenne</span>
            </div>
            <div class="timeline-entry">
              <span class="date">25 Juillet</span>
              <span class="location">Bamako, Dakar</span>
            </div>
            <div class="timeline-entry">
              <span class="date">3-15 Août</span>
              <span class="location">Le Caire, Paris</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="associations" class="associations-section">
  <div class="container">
    <div class="section-header">
      <h2>Associations qui fêtent le Wep Ronpet</h2>
      <p class="section-subtitle">
        Découvrez les événements et communautés qui célèbrent le Nouvel An Kamit
      </p>
    </div>
    
    <div class="associations-content">
      <div class="events-grid">
        <div class="event-card card">
          <h3>Événements Wep Ronpet 2025</h3>
          <div class="event-links">
            <a href="https://my.weezevent.com/nouvel-an-kamite" target="_blank" rel="noopener noreferrer" class="event-link">
              <span class="event-icon">🎊</span>
              <div class="event-info">
                <span class="event-title">Nouvel An Kamite</span>
                <span class="event-platform">Afrocentricity International & Famille Muntu • GRATUIT - de 16 ans</span>
                <span class="event-description">Temps sacré de passage vers une nouvelle rotation cosmique, vécu en harmonie avec les lois de l'univers. Renouons avec nos racines spirituelles, honorons nos ancêtres, et réalignons nos vies sur les principes de Maât. Cérémonie et rituels, gastronomie kamite, marché artisanal.</span>
              </div>
            </a>
            <a href="https://my.weezevent.com/nouvel-an-kamit" target="_blank" rel="noopener noreferrer" class="event-link">
              <span class="event-icon">✨</span>
              <div class="event-info">
                <span class="event-title">Nouvel An Kamit 6262</span>
                <span class="event-platform">Mouvement Politique Spirituel MUN • Le Lamentin, Martinique</span>
                <span class="event-description">Célébration avec la Nouvelle Lune au KAY NZINGHA. Cérémonie, rituels, conférences, dîner kamit, soirée dansante pour la puissance et la confiance du pays. De 15h à minuit.</span>
              </div>
            </a>
          </div>
        </div>
        
        <div class="community-card card">
          <h3>Communauté & Ressources</h3>
          <div class="community-links">
            <a href="https://14eme-membre.net/site-web/#événements" target="_blank" rel="noopener noreferrer" class="community-link">
              <span class="community-icon">🌍</span>
              <div class="community-info">
                <span class="community-title">14ème Membre</span>
                <span class="community-desc">Site web - Événements</span>
              </div>
            </a>
            <a href="https://www.facebook.com/people/Mouvement-Politique-Spirituel-MUN" target="_blank" rel="noopener noreferrer" class="community-link">
              <span class="community-icon">📘</span>
              <div class="community-info">
                <span class="community-title">Mouvement Politique Spirituel MUN</span>
                <span class="community-desc">Page Facebook officielle</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div class="video-section">
        <h3>Découvrir le Wep Ronpet</h3>
        <div class="video-container">
          <iframe
            src="https://www.youtube.com/embed/0_8kWlDTf94"
            title="Vidéo sur le Wep Ronpet"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="youtube-video"
          ></iframe>
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
    opacity: 0;
    transform: scale(0.8);
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
  
  .globe-info {
    opacity: 0;
    transform: translateX(50px);
  }
  
  .info-card h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .info-card p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .wave-timeline {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .timeline-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: rgba(255, 215, 0, 0.1);
    border-radius: 8px;
    border-left: 3px solid var(--color-primary);
    position: relative;
    overflow: hidden;
  }
  
  .timeline-entry::before {
    content: '';
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .timeline-entry .date {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .timeline-entry .location {
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

  /* Styles pour la section associations */
  .associations-section {
    padding: var(--spacing-xl) 0;
    background: linear-gradient(135deg, #0f1419 0%, #1a2332 100%);
  }

  .associations-content {
    margin-top: var(--spacing-lg);
  }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .event-card, .community-card {
    background: rgba(255, 215, 0, 0.05);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 16px;
    padding: var(--spacing-lg);
    transition: all 0.3s ease;
  }

  .event-card:hover, .community-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-primary);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
  }

  .event-card h3, .community-card h3 {
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
    font-size: 1.25rem;
  }

  .event-links, .community-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .event-link, .community-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    background: rgba(255, 215, 0, 0.1);
    border-radius: 12px;
    text-decoration: none;
    color: var(--color-light);
    transition: all 0.3s ease;
  }

  .event-link:hover, .community-link:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateX(5px);
  }

  .event-icon, .community-icon {
    font-size: 1.5rem;
    min-width: 32px;
  }

  .event-info, .community-info {
    display: flex;
    flex-direction: column;
  }

  .event-title, .community-title {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 2px;
  }

  .event-platform, .community-desc {
    font-size: 0.9rem;
    color: var(--color-muted);
  }

  .event-description {
    font-size: 0.85rem;
    color: var(--color-light);
    margin-top: 4px;
    line-height: 1.4;
    opacity: 0.9;
  }

  .video-section {
    text-align: center;
  }

  .video-section h3 {
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
    font-size: 1.5rem;
  }

  .video-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    aspect-ratio: 16/9;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .youtube-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    .events-grid {
      grid-template-columns: 1fr;
    }
    
    .video-container {
      max-width: 100%;
    }
  }
</style>
