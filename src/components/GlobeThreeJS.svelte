<script>
  import { onMount } from 'svelte';
  
  let container;
  let visible = false;
  let animationId;
  let scene, camera, renderer, globe, markers;
  
  onMount(async () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !scene) {
          visible = true;
          initGlobe();
        }
      });
    });
    
    const section = document.getElementById('threejs-section');
    if (section) observer.observe(section);
    
    return () => {
      observer.disconnect();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  });
  
  async function initGlobe() {
    // Charger Three.js depuis CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      createThreeJSGlobe();
    };
    document.head.appendChild(script);
  }
  
  function createThreeJSGlobe() {
    const THREE = window.THREE;
    
    // Scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);
    
    // Caméra
    camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Texture de la Terre
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      () => { renderer.render(scene, camera); }
    );
    
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color('grey'),
      shininess: 10
    });
    
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Atmosphère
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4444ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Marqueurs
    markers = new THREE.Group();
    scene.add(markers);
    
    const locations = [
      { name: 'La Réunion', lat: -21.1151, lon: 55.5364, color: 0xFF6B35 },
      { name: 'Kinshasa', lat: -4.4419, lon: 15.2663, color: 0xFFA500 },
      { name: 'Guadeloupe', lat: 16.2650, lon: -61.5510, color: 0xFFD700 },
      { name: 'Martinique', lat: 14.6415, lon: -61.0242, color: 0xFFD700 },
      { name: 'Dakar', lat: 14.7167, lon: -17.4677, color: 0xFFE44D },
      { name: 'Le Caire', lat: 30.0444, lon: 31.2357, color: 0xFFFACD }
    ];
    
    locations.forEach(loc => {
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: loc.color });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Convertir lat/lon en position 3D
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lon + 180) * (Math.PI / 180);
      
      marker.position.x = -1.05 * Math.sin(phi) * Math.cos(theta);
      marker.position.y = 1.05 * Math.cos(phi);
      marker.position.z = 1.05 * Math.sin(phi) * Math.sin(theta);
      
      markers.add(marker);
    });
    
    // Contrôles de la souris
    let mouseX = 0, mouseY = 0;
    let isMouseDown = false;
    
    container.addEventListener('mousedown', () => { isMouseDown = true; });
    container.addEventListener('mouseup', () => { isMouseDown = false; });
    container.addEventListener('mouseleave', () => { isMouseDown = false; });
    
    container.addEventListener('mousemove', (e) => {
      if (isMouseDown) {
        mouseX = (e.clientX - container.offsetLeft) / container.clientWidth * 2 - 1;
        mouseY = -(e.clientY - container.offsetTop) / container.clientHeight * 2 + 1;
      }
    });
    
    // Animation
    function animate() {
      animationId = requestAnimationFrame(animate);
      
      // Rotation automatique
      if (!isMouseDown) {
        globe.rotation.y += 0.002;
        markers.rotation.y += 0.002;
      } else {
        // Rotation manuelle
        globe.rotation.y += mouseX * 0.05;
        globe.rotation.x = mouseY * 0.5;
        markers.rotation.y = globe.rotation.y;
        markers.rotation.x = globe.rotation.x;
      }
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Responsive
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
</script>

<section id="threejs-section" class="globe-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Globe avec Three.js</h2>
      <p class="section-subtitle">
        Rendu 3D WebGL avec textures réalistes
      </p>
    </div>
    
    <div class="globe-container threejs" class:visible>
      <div bind:this={container} class="threejs-container"></div>
      
      <div class="globe-info">
        <div class="info-card card">
          <h3>Three.js</h3>
          <p><strong>Avantages :</strong></p>
          <ul>
            <li>✅ Rendu 3D réaliste</li>
            <li>✅ Textures haute qualité</li>
            <li>✅ Effets atmosphériques</li>
            <li>✅ Très bien documenté</li>
          </ul>
          <p><strong>Inconvénients :</strong></p>
          <ul>
            <li>❌ Plus lourd (~150KB)</li>
            <li>❌ Nécessite WebGL</li>
            <li>❌ Plus complexe à personnaliser</li>
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
  
  .threejs-container {
    width: 100%;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    cursor: grab;
  }
  
  .threejs-container:active {
    cursor: grabbing;
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
    
    .threejs-container {
      height: 400px;
    }
  }
</style>