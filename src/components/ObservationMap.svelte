<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let selectedSite = null;
  let mapCanvas;
  let ctx;
  let guadeloupeGeoJson = null;
  
  const sites = [
    {
      id: 'moule',
      name: 'Le Moule',
      lat: 16.3333,
      lng: -61.3472,
      description: 'Plage de l\'Autre Bord - Vue dégagée sur l\'Est',
      features: ['Plage isolée', 'Horizon Est dégagé', 'Peu de pollution lumineuse'],
      bestTime: '5h00 - 5h30',
      image: '🏖️'
    },
    {
      id: 'deshaies',
      name: 'Deshaies',
      lat: 16.3039,
      lng: -61.7966,
      description: 'Plage de Grande Anse - Cadre idyllique',
      features: ['Plage populaire', 'Montagnes en arrière-plan', 'Accès facile'],
      bestTime: '5h15 - 5h45',
      image: '🌅'
    },
    {
      id: 'sainte-anne',
      name: 'Sainte-Anne',
      lat: 16.2262,
      lng: -61.3809,
      description: 'Plage de Bois Jolan - Tranquillité garantie',
      features: ['Plage sauvage', 'Très peu fréquentée', 'Nature préservée'],
      bestTime: '5h00 - 5h30',
      image: '🌴'
    },
    {
      id: 'port-louis',
      name: 'Port-Louis',
      lat: 16.4180,
      lng: -61.5312,
      description: 'Plage du Souffleur - Vue panoramique',
      features: ['Vue à 180°', 'Site historique', 'Calme au petit matin'],
      bestTime: '5h00 - 5h30',
      image: '🏛️'
    },
    {
      id: 'marie-galante',
      name: 'Marie-Galante',
      lat: 15.9500,
      lng: -61.2667,
      description: 'Plage de la Feuillère - Horizon infini',
      features: ['Île préservée', 'Ciel très noir', 'Conditions optimales'],
      bestTime: '4h45 - 5h15',
      image: '🏝️'
    },
    {
      id: 'soufriere',
      name: 'Route de la Soufrière',
      lat: 16.0439,
      lng: -61.6639,
      description: 'Parking de Savane à Mulets - Altitude',
      features: ['1000m altitude', 'Air pur', 'Vue dégagée', 'Nuits fraîches'],
      bestTime: '5h00 - 5h30',
      image: '🌋'
    },
    {
      id: 'petite-terre',
      name: 'Petite-Terre',
      lat: 16.1700,
      lng: -61.1200,
      description: 'Réserve naturelle - Conditions parfaites',
      features: ['Aucune pollution lumineuse', 'Réserve protégée', 'Accès réglementé'],
      bestTime: '4h45 - 5h15',
      image: '🦎'
    }
  ];
  
  onMount(async () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !ctx) {
          visible = true;
          initMap();
        }
      });
    });
    
    const section = document.getElementById('observation-map');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  async function initMap() {
    ctx = mapCanvas.getContext('2d');
    
    // Charger les données GeoJSON de la Guadeloupe
    try {
      const response = await fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/guadeloupe/departements-guadeloupe.geojson');
      guadeloupeGeoJson = await response.json();
      
      // Redimensionner le canvas
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Dessiner la carte
      drawMap();
    } catch (error) {
      console.error('Erreur de chargement GeoJSON:', error);
      // Fallback : dessiner une carte simple
      drawSimpleMap();
    }
  }
  
  function resizeCanvas() {
    const container = mapCanvas.parentElement;
    mapCanvas.width = container.offsetWidth;
    mapCanvas.height = container.offsetWidth * 0.75; // Ratio 4:3
    if (guadeloupeGeoJson) drawMap();
  }
  
  function drawMap() {
    if (!ctx || !guadeloupeGeoJson) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    
    // Fond océan
    ctx.fillStyle = '#1a3a52';
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
    
    // Calculer les limites et l'échelle
    const bounds = calculateBounds(guadeloupeGeoJson);
    const scale = calculateScale(bounds, mapCanvas.width, mapCanvas.height);
    
    // Dessiner chaque feature
    guadeloupeGeoJson.features.forEach(feature => {
      drawFeature(feature, bounds, scale);
    });
    
    // Dessiner les sites
    drawSites(bounds, scale);
  }
  
  function drawSimpleMap() {
    if (!ctx) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    
    // Fond océan
    ctx.fillStyle = '#1a3a52';
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
    
    // Dessiner une forme approximative de la Guadeloupe
    const centerX = mapCanvas.width / 2;
    const centerY = mapCanvas.height / 2;
    const scale = mapCanvas.width / 4;
    
    // Grande-Terre
    ctx.fillStyle = '#2d5a3d';
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX + scale * 0.5, centerY - scale * 0.2, scale * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Basse-Terre
    ctx.beginPath();
    ctx.arc(centerX - scale * 0.3, centerY, scale * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Marie-Galante
    ctx.beginPath();
    ctx.arc(centerX + scale * 0.2, centerY + scale * 0.8, scale * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Dessiner les sites avec des positions approximatives
    const bounds = { minLng: -62, maxLng: -61, minLat: 15.8, maxLat: 16.5 };
    const simpleScale = {
      x: mapCanvas.width / (bounds.maxLng - bounds.minLng),
      y: mapCanvas.height / (bounds.maxLat - bounds.minLat)
    };
    
    drawSites(bounds, simpleScale);
  }
  
  function calculateBounds(geoJson) {
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;
    
    function processBounds(coords) {
      if (Array.isArray(coords[0])) {
        coords.forEach(processBounds);
      } else {
        minLng = Math.min(minLng, coords[0]);
        maxLng = Math.max(maxLng, coords[0]);
        minLat = Math.min(minLat, coords[1]);
        maxLat = Math.max(maxLat, coords[1]);
      }
    }
    
    geoJson.features.forEach(feature => {
      if (feature.geometry && feature.geometry.coordinates) {
        processBounds(feature.geometry.coordinates);
      }
    });
    
    // Ajouter une marge
    const margin = 0.1;
    return {
      minLng: minLng - margin,
      maxLng: maxLng + margin,
      minLat: minLat - margin,
      maxLat: maxLat + margin
    };
  }
  
  function calculateScale(bounds, width, height) {
    return {
      x: width / (bounds.maxLng - bounds.minLng),
      y: height / (bounds.maxLat - bounds.minLat)
    };
  }
  
  function projectPoint(lng, lat, bounds, scale) {
    return {
      x: (lng - bounds.minLng) * scale.x,
      y: mapCanvas.height - (lat - bounds.minLat) * scale.y
    };
  }
  
  function drawFeature(feature, bounds, scale) {
    ctx.fillStyle = '#2d5a3d';
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    
    function drawCoordinates(coords) {
      if (!coords || coords.length === 0) return;
      
      if (Array.isArray(coords[0][0])) {
        coords.forEach(drawCoordinates);
        return;
      }
      
      ctx.beginPath();
      coords.forEach((coord, i) => {
        const point = projectPoint(coord[0], coord[1], bounds, scale);
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    
    if (feature.geometry && feature.geometry.coordinates) {
      drawCoordinates(feature.geometry.coordinates);
    }
  }
  
  function drawSites(bounds, scale) {
    sites.forEach(site => {
      const point = projectPoint(site.lng, site.lat, bounds, scale);
      
      // Cercle du marqueur
      ctx.beginPath();
      ctx.arc(point.x, point.y, selectedSite?.id === site.id ? 15 : 10, 0, Math.PI * 2);
      ctx.fillStyle = selectedSite?.id === site.id ? '#FFD700' : '#FF6B35';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Icône du site
      ctx.fillStyle = 'white';
      ctx.font = selectedSite?.id === site.id ? '18px sans-serif' : '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(site.image, point.x, point.y);
      
      // Nom du site si sélectionné
      if (selectedSite?.id === site.id) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(site.name, point.x, point.y + 25);
      }
    });
  }
  
  function handleMapClick(event) {
    const rect = mapCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Vérifier si on clique sur un site
    const bounds = guadeloupeGeoJson ? 
      calculateBounds(guadeloupeGeoJson) : 
      { minLng: -62, maxLng: -61, minLat: 15.8, maxLat: 16.5 };
    
    const scale = guadeloupeGeoJson ? 
      calculateScale(bounds, mapCanvas.width, mapCanvas.height) :
      { x: mapCanvas.width / (bounds.maxLng - bounds.minLng), 
        y: mapCanvas.height / (bounds.maxLat - bounds.minLat) };
    
    let clickedSite = null;
    sites.forEach(site => {
      const point = projectPoint(site.lng, site.lat, bounds, scale);
      const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
      if (distance < 20) {
        clickedSite = site;
      }
    });
    
    if (clickedSite) {
      selectedSite = selectedSite?.id === clickedSite.id ? null : clickedSite;
      drawMap();
    }
  }
  
  function selectSite(site) {
    selectedSite = selectedSite?.id === site.id ? null : site;
    if (guadeloupeGeoJson) {
      drawMap();
    } else {
      drawSimpleMap();
    }
  }
</script>

<section id="observation-map" class="map-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Carte des Sites d'Observation</h2>
      <p class="section-subtitle">
        Les meilleurs endroits en Guadeloupe pour observer le lever héliaque
      </p>
    </div>
    
    <div class="map-wrapper" class:visible>
      <!-- Carte Canvas de la Guadeloupe -->
      <div class="map-container">
        <canvas 
          bind:this={mapCanvas} 
          class="guadeloupe-map"
          on:click={handleMapClick}
        ></canvas>
      </div>
      
      <!-- Liste des sites -->
      <div class="sites-list">
        <h3>Sites d'Observation</h3>
        {#each sites as site}
          <div 
            class="site-card"
            class:active={selectedSite?.id === site.id}
            on:click={() => selectSite(site)}
          >
            <div class="site-header">
              <span class="site-icon">{site.image}</span>
              <h4>{site.name}</h4>
            </div>
            <p class="site-description">{site.description}</p>
            
            {#if selectedSite?.id === site.id}
              <div class="site-details">
                <div class="features">
                  <h5>Caractéristiques :</h5>
                  <ul>
                    {#each site.features as feature}
                      <li>{feature}</li>
                    {/each}
                  </ul>
                </div>
                <div class="observation-time">
                  <h5>🕐 Meilleur créneau :</h5>
                  <p>{site.bestTime}</p>
                </div>
                <div class="coordinates">
                  <h5>📍 Coordonnées GPS :</h5>
                  <p>{site.lat}°N, {Math.abs(site.lng)}°O</p>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Conseils d'observation -->
    <div class="observation-tips" class:visible>
      <h3>Conseils pour l'Observation</h3>
      <div class="tips-grid">
        <div class="tip-card">
          <span class="tip-icon">🌙</span>
          <h4>Phase Lunaire</h4>
          <p>Privilégiez les nuits sans Lune ou avec un fin croissant</p>
        </div>
        <div class="tip-card">
          <span class="tip-icon">☁️</span>
          <h4>Météo</h4>
          <p>Vérifiez l'absence de nuages à l'Est, surtout près de l'horizon</p>
        </div>
        <div class="tip-card">
          <span class="tip-icon">⏰</span>
          <h4>Horaire</h4>
          <p>Arrivez 30 minutes avant pour habituer vos yeux à l'obscurité</p>
        </div>
        <div class="tip-card">
          <span class="tip-icon">🔦</span>
          <h4>Équipement</h4>
          <p>Lampe rouge, jumelles optionnelles, vêtements chauds</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .map-section {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-night);
  }
  
  .map-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .map-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Carte Canvas */
  .map-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
  }
  
  .guadeloupe-map {
    width: 100%;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
  }
  
  /* Liste des sites */
  .sites-list {
    max-height: 600px;
    overflow-y: auto;
    padding-right: 1rem;
  }
  
  .sites-list h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .site-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .site-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-primary);
  }
  
  .site-card.active {
    background: rgba(255, 215, 0, 0.1);
    border-color: var(--color-primary);
  }
  
  .site-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .site-icon {
    font-size: 1.5rem;
  }
  
  .site-header h4 {
    color: var(--color-primary);
    margin: 0;
  }
  
  .site-description {
    color: var(--color-light);
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .site-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideDown 0.3s ease-out;
  }
  
  .site-details h5 {
    color: var(--color-secondary);
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
  
  .site-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .site-details li {
    padding: 0.25rem 0;
    padding-left: 1rem;
    position: relative;
    font-size: 0.85rem;
  }
  
  .site-details li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }
  
  .observation-time, .coordinates {
    margin-top: 0.5rem;
  }
  
  .observation-time p, .coordinates p {
    margin: 0;
    color: var(--color-light);
    font-size: 0.9rem;
  }
  
  /* Conseils d'observation */
  .observation-tips {
    margin-top: var(--spacing-xl);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.2s;
  }
  
  .observation-tips.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .observation-tips h3 {
    color: var(--color-primary);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .tip-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .tip-card:hover {
    transform: translateY(-5px);
  }
  
  .tip-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 1rem;
  }
  
  .tip-card h4 {
    color: var(--color-primary);
    margin: 0 0 0.5rem 0;
  }
  
  .tip-card p {
    color: var(--color-light);
    margin: 0;
    font-size: 0.9rem;
  }
  
  /* Scrollbar personnalisée */
  .sites-list::-webkit-scrollbar {
    width: 8px;
  }
  
  .sites-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  .sites-list::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 4px;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 300px;
    }
  }
  
  @media (max-width: 768px) {
    .map-wrapper {
      grid-template-columns: 1fr;
    }
    
    .map-container {
      padding: 1rem;
    }
    
    .sites-list {
      max-height: none;
    }
    
    .tips-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>