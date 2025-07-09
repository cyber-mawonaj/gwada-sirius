<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let activeTab = 'mechanics';
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });
    
    const section = document.getElementById('science');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const tabs = [
    { id: 'mechanics', label: 'Mécanique Céleste', icon: '🌌' },
    { id: 'arcus', label: 'Arcus Visionis', icon: '📐' },
    { id: 'factors', label: 'Facteurs d\'Influence', icon: '🌡️' }
  ];
</script>

<section id="science" class="science">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>La Science du Lever Héliaque</h2>
      <p class="section-subtitle">
        Comprendre la danse cosmique entre Terre, Soleil et Sirius
      </p>
    </div>
    
    <div class="science-content" class:visible>
      <div class="tabs">
        {#each tabs as tab}
          <button 
            class="tab-button" 
            class:active={activeTab === tab.id}
            on:click={() => activeTab = tab.id}
          >
            <span class="tab-icon">{tab.icon}</span>
            <span class="tab-label">{tab.label}</span>
          </button>
        {/each}
      </div>
      
      <div class="tab-content">
        {#if activeTab === 'mechanics'}
          <div class="content-section">
            <h3>Le Ballet Cosmique</h3>
            <p>
              Le lever héliaque est le fruit d'une chorégraphie céleste précise. 
              Pendant environ 70 jours, Sirius reste invisible, cachée par l'éclat du Soleil. 
              Son retour à l'aube marque un moment unique où l'étoile se lève juste avant 
              le Soleil, visible quelques instants dans les lueurs du crépuscule matinal.
            </p>
            
            <div class="diagram card">
              <div class="celestial-body sun">
                <span>☀️</span>
                <label>Soleil</label>
              </div>
              <div class="orbit-path"></div>
              <div class="celestial-body earth">
                <span>🌍</span>
                <label>Terre</label>
              </div>
              <div class="celestial-body sirius">
                <span>⭐</span>
                <label>Sirius</label>
              </div>
            </div>
            
            <p>
              La Terre, dans son mouvement orbital annuel, modifie notre perspective 
              sur les étoiles. Quand le Soleil se trouve entre nous et Sirius, 
              l'étoile devient invisible. C'est seulement quand l'angle devient 
              favorable que Sirius réapparaît.
            </p>
          </div>
        {/if}
        
        {#if activeTab === 'arcus'}
          <div class="content-section">
            <h3>L'Arc de Visibilité</h3>
            <p>
              L'Arcus Visionis est l'angle critique : le Soleil doit être à environ 
              9-10° sous l'horizon pour que Sirius devienne visible. C'est un équilibre 
              délicat entre la brillance de l'étoile et la luminosité du ciel.
            </p>
            
            <div class="arcus-diagram card">
              <div class="horizon-line">
                <span>Horizon</span>
              </div>
              <div class="angle-indicator">
                <div class="angle-arc"></div>
                <span class="angle-value">9-10°</span>
              </div>
              <div class="sirius-position">
                <span>⭐ Sirius</span>
              </div>
              <div class="sun-position">
                <span>☀️ Soleil</span>
              </div>
            </div>
            
            <p>
              Pour Sirius, avec sa magnitude exceptionnelle de -1.46, cet angle 
              est relativement faible comparé à d'autres étoiles moins brillantes. 
              C'est pourquoi elle est l'une des premières à être visible à l'aube.
            </p>
          </div>
        {/if}
        
        {#if activeTab === 'factors'}
          <div class="content-section">
            <h3>Les Variables en Jeu</h3>
            
            <div class="factors-grid">
              <div class="factor-card card">
                <div class="factor-icon">🌟</div>
                <h4>Magnitude</h4>
                <p>
                  Sirius brille à -1.46, la rendant visible même dans des conditions 
                  difficiles. Plus une étoile est brillante, plus tôt elle perce 
                  les lueurs de l'aube.
                </p>
              </div>
              
              <div class="factor-card card">
                <div class="factor-icon">🗺️</div>
                <h4>Latitude</h4>
                <p>
                  À 16°N en Guadeloupe, les astres se lèvent presque verticalement. 
                  Cette géométrie tropicale influence la durée du crépuscule et 
                  la visibilité.
                </p>
              </div>
              
              <div class="factor-card card">
                <div class="factor-icon">💨</div>
                <h4>Atmosphère</h4>
                <p>
                  L'humidité caribéenne et les brumes de sable peuvent retarder 
                  la visibilité de plusieurs jours. Un ciel sec et clair est idéal.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .science {
    padding: var(--spacing-xl) 0;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 100%);
  }
  
  .science-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .science-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
  }
  
  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-radius: 50px;
    color: var(--color-light);
    cursor: pointer;
    transition: var(--transition-base);
  }
  
  .tab-button:hover,
  .tab-button.active {
    background: rgba(255, 215, 0, 0.2);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  
  .tab-icon {
    font-size: 1.5rem;
  }
  
  .content-section {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .content-section h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .content-section p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }
  
  /* Diagramme orbital */
  .diagram {
    position: relative;
    height: 300px;
    margin: 2rem 0;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .celestial-body {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .celestial-body span {
    font-size: 3rem;
  }
  
  .celestial-body label {
    font-size: 0.9rem;
    color: var(--color-primary);
  }
  
  .sun {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .earth {
    top: 20%;
    left: 20%;
  }
  
  .sirius {
    top: 20%;
    right: 20%;
  }
  
  .orbit-path {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border: 2px dashed rgba(255, 215, 0, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  /* Diagramme Arcus */
  .arcus-diagram {
    position: relative;
    height: 250px;
    margin: 2rem 0;
    overflow: hidden;
  }
  
  .horizon-line {
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .horizon-line span {
    background: var(--color-dark);
    padding: 0 1rem;
    color: var(--color-primary);
  }
  
  .sirius-position {
    position: absolute;
    top: 30%;
    left: 30%;
  }
  
  .sun-position {
    position: absolute;
    bottom: 20%;
    right: 30%;
  }
  
  .angle-indicator {
    position: absolute;
    bottom: 50%;
    right: 40%;
  }
  
  .angle-arc {
    width: 60px;
    height: 60px;
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    border-bottom: none;
    border-left: none;
  }
  
  .angle-value {
    position: absolute;
    top: -10px;
    right: -30px;
    color: var(--color-accent);
    font-weight: 600;
  }
  
  /* Grille des facteurs */
  .factors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
    margin-top: 2rem;
  }
  
  .factor-card {
    text-align: center;
  }
  
  .factor-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .factor-card h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
    }
    
    .tab-button {
      width: 100%;
      justify-content: center;
    }
    
    .diagram {
      height: 250px;
    }
  }
</style>
