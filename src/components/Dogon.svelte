<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let activeTab = 'cosmogonie';
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });
    
    const section = document.getElementById('dogon');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const tabs = [
    { id: 'cosmogonie', label: 'Cosmogonie', icon: '🌌' },
    { id: 'sirius', label: 'Système de Sirius', icon: '⭐' },
    { id: 'astronomie', label: 'Astronomie Dogon', icon: '🔭' },
    { id: 'heritage', label: 'Héritage', icon: '🌍' }
  ];
</script>

<section id="dogon" class="dogon-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Les Dogons et Sirius</h2>
      <p class="section-subtitle">
        Une connaissance astronomique millénaire
      </p>
    </div>
    
    <div class="content-wrapper" class:visible>
      <!-- Navigation par onglets -->
      <div class="tabs-nav">
        {#each tabs as tab}
          <button 
            class="tab-btn" 
            class:active={activeTab === tab.id}
            on:click={() => activeTab = tab.id}
          >
            <span class="tab-icon">{tab.icon}</span>
            <span class="tab-label">{tab.label}</span>
          </button>
        {/each}
      </div>
      
      <!-- Contenu des onglets -->
      <div class="tabs-content">
        {#if activeTab === 'cosmogonie'}
          <div class="tab-panel">
            <h3>La Cosmogonie Dogon</h3>
            <div class="content-grid">
              <div class="content-text">
                <p>
                  Les Dogons du Mali possèdent une cosmogonie complexe centrée sur <strong>Sigu Tolo</strong> (Sirius), 
                  l'étoile la plus brillante du ciel. Leur savoir astronomique, transmis oralement depuis des millénaires, 
                  révèle une compréhension sophistiquée du cosmos.
                </p>
                <p>
                  Le <strong>Sigui</strong>, cérémonie célébrée tous les 60 ans, marque le renouvellement du monde 
                  et commémore la révélation de la parole aux hommes. Cette périodicité correspond étrangement 
                  à l'orbite de Sirius B autour de Sirius A (50 ans), ajustée par des considérations rituelles.
                </p>
                <div class="highlight-box">
                  <h4>Le Nommo</h4>
                  <p>
                    Être primordial amphibie venu de Sirius, le Nommo apporta la civilisation 
                    et les connaissances fondamentales aux ancêtres des Dogons.
                  </p>
                </div>
              </div>
              <div class="content-visual">
                <div class="cosmogony-diagram">
                  <svg viewBox="0 0 400 400" class="diagram-svg">
                    <!-- Amma (Dieu créateur) au centre -->
                    <circle cx="200" cy="200" r="30" fill="var(--color-primary)" opacity="0.8"/>
                    <text x="200" y="205" text-anchor="middle" fill="white" font-weight="bold">Amma</text>
                    
                    <!-- Oeuf cosmique -->
                    <ellipse cx="200" cy="200" rx="150" ry="100" fill="none" stroke="var(--color-secondary)" stroke-width="2" stroke-dasharray="5,5" opacity="0.6"/>
                    
                    <!-- Les 4 éléments -->
                    <g class="elements">
                      <circle cx="200" cy="100" r="25" fill="var(--color-accent)"/>
                      <text x="200" y="105" text-anchor="middle" fill="white" font-size="12">Eau</text>
                      
                      <circle cx="300" cy="200" r="25" fill="#FF6B35"/>
                      <text x="300" y="205" text-anchor="middle" fill="white" font-size="12">Feu</text>
                      
                      <circle cx="200" cy="300" r="25" fill="#4CAF50"/>
                      <text x="200" y="305" text-anchor="middle" fill="white" font-size="12">Terre</text>
                      
                      <circle cx="100" cy="200" r="25" fill="#87CEEB"/>
                      <text x="100" y="205" text-anchor="middle" fill="white" font-size="12">Air</text>
                    </g>
                    
                    <!-- Lignes de connexion -->
                    <line x1="200" y1="230" x2="200" y2="275" stroke="var(--color-light)" stroke-width="1" opacity="0.5"/>
                    <line x1="225" y1="200" x2="275" y2="200" stroke="var(--color-light)" stroke-width="1" opacity="0.5"/>
                    <line x1="200" y1="175" x2="200" y2="125" stroke="var(--color-light)" stroke-width="1" opacity="0.5"/>
                    <line x1="175" y1="200" x2="125" y2="200" stroke="var(--color-light)" stroke-width="1" opacity="0.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        {/if}
        
        {#if activeTab === 'sirius'}
          <div class="tab-panel">
            <h3>Le Système de Sirius selon les Dogons</h3>
            <div class="sirius-system">
              <div class="star-info">
                <h4>Sigu Tolo (Sirius A)</h4>
                <p>L'étoile principale, source de lumière et de vie</p>
                <ul>
                  <li>Associée à la féminité et à la fécondité</li>
                  <li>Guide des saisons et des récoltes</li>
                  <li>Centre du système stellaire</li>
                </ul>
              </div>
              
              <div class="star-info">
                <h4>Po Tolo (Sirius B)</h4>
                <p>L'étoile compagne invisible à l'œil nu</p>
                <ul>
                  <li>Décrite comme "lourde" et "blanche"</li>
                  <li>Orbite de 50 ans autour de Sirius A</li>
                  <li>Découverte par les astronomes occidentaux en 1862</li>
                </ul>
              </div>
              
              <div class="star-info">
                <h4>Emme Ya Tolo (Sirius C ?)</h4>
                <p>Troisième étoile hypothétique du système</p>
                <ul>
                  <li>Quatre fois plus légère que Po Tolo</li>
                  <li>Orbite plus large</li>
                  <li>Non confirmée par l'astronomie moderne</li>
                </ul>
              </div>
            </div>
            
            <div class="knowledge-mystery">
              <h4>Le Mystère de la Connaissance</h4>
              <p>
                Comment les Dogons connaissaient-ils l'existence de Sirius B, 
                invisible à l'œil nu et découverte en Occident seulement en 1862 ?
              </p>
              <div class="theories">
                <div class="theory-card">
                  <h5>Transmission Ancienne</h5>
                  <p>Héritage d'une civilisation antérieure avancée</p>
                </div>
                <div class="theory-card">
                  <h5>Contact Extraterrestre</h5>
                  <p>Les Nommos venus de Sirius</p>
                </div>
                <div class="theory-card">
                  <h5>Observation Minutieuse</h5>
                  <p>Déduction à partir des perturbations de Sirius A</p>
                </div>
              </div>
            </div>
          </div>
        {/if}
        
        {#if activeTab === 'astronomie'}
          <div class="tab-panel">
            <h3>L'Astronomie Dogon</h3>
            <div class="astronomy-content">
              <div class="concept-grid">
                <div class="concept-card">
                  <h4>📐 Géométrie Sacrée</h4>
                  <p>
                    Les Dogons utilisent des figures géométriques complexes pour 
                    représenter les mouvements célestes et les cycles cosmiques.
                  </p>
                </div>
                
                <div class="concept-card">
                  <h4>🌙 Calendrier Lunaire</h4>
                  <p>
                    Un système calendaire sophistiqué basé sur les phases lunaires 
                    et la position de Sirius pour l'agriculture.
                  </p>
                </div>
                
                <div class="concept-card">
                  <h4>🪐 Connaissance Planétaire</h4>
                  <p>
                    Description des anneaux de Saturne et des lunes de Jupiter, 
                    invisibles sans télescope.
                  </p>
                </div>
                
                <div class="concept-card">
                  <h4>🌌 Structure de l'Univers</h4>
                  <p>
                    Concept d'univers infini avec des mondes multiples, 
                    similaire aux théories modernes.
                  </p>
                </div>
              </div>
              
              <div class="calculation-example">
                <h4>Calcul de la Période Sigui</h4>
                <pre><code>Période orbitale Po Tolo : 50 ans
Ajustement rituel : × 1.2
Période Sigui : 60 ans

Correspondance avec Sirius B :
- Orbite réelle : 50.1 ans
- Précision : 99.8%</code></pre>
              </div>
            </div>
          </div>
        {/if}
        
        {#if activeTab === 'heritage'}
          <div class="tab-panel">
            <h3>Héritage et Influence</h3>
            <div class="heritage-content">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-date">Antiquité</div>
                  <div class="timeline-content">
                    <h4>Origines Égyptiennes</h4>
                    <p>Liens possibles avec les prêtres de l'Égypte ancienne qui vénéraient Sothis (Sirius)</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-date">XIIIe siècle</div>
                  <div class="timeline-content">
                    <h4>Migration vers le Mali</h4>
                    <p>Installation dans les falaises de Bandiagara, préservation des traditions</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-date">1931-1956</div>
                  <div class="timeline-content">
                    <h4>Marcel Griaule</h4>
                    <p>Étude ethnographique révélant les connaissances astronomiques dogons</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-date">Aujourd'hui</div>
                  <div class="timeline-content">
                    <h4>Patrimoine Mondial</h4>
                    <p>Les Dogons inspirent scientifiques et chercheurs du monde entier</p>
                  </div>
                </div>
              </div>
              
              <div class="influence-map">
                <h4>Influence sur la Caraïbe</h4>
                <p>
                  Les traditions astronomiques africaines, incluant celles des Dogons, 
                  ont traversé l'Atlantique avec la diaspora, enrichissant les pratiques 
                  spirituelles et calendaires des Antilles.
                </p>
                <ul>
                  <li>🇭🇹 Haïti : Vaudou et astronomie sacrée</li>
                  <li>🇬🇵 Guadeloupe : Traditions Gwoka et cycles cosmiques</li>
                  <li>🇲🇶 Martinique : Bèlè et rythmes stellaires</li>
                  <li>🇯🇲 Jamaïque : Rastafari et conscience cosmique</li>
                </ul>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .dogon-section {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-night);
  }
  
  .content-wrapper {
    margin-top: var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Onglets */
  .tabs-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-radius: 50px;
    color: var(--color-light);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--color-primary);
  }
  
  .tab-btn.active {
    background: var(--color-primary);
    color: var(--color-dark);
    border-color: var(--color-primary);
  }
  
  .tab-icon {
    font-size: 1.2rem;
  }
  
  /* Contenu des onglets */
  .tab-panel {
    animation: fadeIn 0.5s ease-out;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    align-items: start;
  }
  
  .highlight-box {
    background: rgba(255, 215, 0, 0.1);
    border-left: 4px solid var(--color-primary);
    padding: 1rem;
    margin: 1.5rem 0;
    border-radius: 0 8px 8px 0;
  }
  
  .highlight-box h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  /* Diagramme cosmogonie */
  .cosmogony-diagram {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
  }
  
  .diagram-svg {
    width: 100%;
    height: auto;
  }
  
  .elements circle {
    animation: pulse 3s ease-in-out infinite;
  }
  
  .elements circle:nth-child(2) { animation-delay: 0.5s; }
  .elements circle:nth-child(4) { animation-delay: 1s; }
  .elements circle:nth-child(6) { animation-delay: 1.5s; }
  
  /* Système de Sirius */
  .sirius-system {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .star-info {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .star-info h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  .star-info ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }
  
  .star-info li {
    padding: 0.25rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .star-info li::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }
  
  /* Mystère de la connaissance */
  .knowledge-mystery {
    background: rgba(255, 215, 0, 0.05);
    padding: 2rem;
    border-radius: 15px;
    margin-top: 2rem;
  }
  
  .theories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .theory-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  
  .theory-card h5 {
    color: var(--color-secondary);
    margin-bottom: 0.5rem;
  }
  
  /* Astronomie */
  .concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .concept-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 15px;
    transition: transform 0.3s ease;
  }
  
  .concept-card:hover {
    transform: translateY(-5px);
  }
  
  .concept-card h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  .calculation-example {
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    border-radius: 10px;
  }
  
  .calculation-example pre {
    margin: 0;
    color: var(--color-light);
    font-family: 'Courier New', monospace;
  }
  
  /* Timeline */
  .timeline {
    position: relative;
    padding-left: 3rem;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-primary);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: var(--color-primary);
    border-radius: 50%;
  }
  
  .timeline-date {
    color: var(--color-primary);
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .timeline-content h4 {
    color: var(--color-secondary);
    margin-bottom: 0.25rem;
  }
  
  /* Carte d'influence */
  .influence-map {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 15px;
    margin-top: 2rem;
  }
  
  .influence-map ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.5rem;
  }
  
  .influence-map li {
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    
    .tabs-nav {
      gap: 0.5rem;
    }
    
    .tab-btn {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
    
    .tab-label {
      display: none;
    }
    
    .timeline {
      padding-left: 2rem;
    }
  }
</style>