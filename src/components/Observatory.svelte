<script>
  import { onMount } from 'svelte';
  import anime from 'animejs/lib/anime.es.js';
  
  let visible = false;
  let activePhase = 0;
  
  const observationPhases = [
    {
      time: '04h30',
      title: 'Préparation',
      description: 'Arrivez sur site, laissez vos yeux s\'adapter',
      icon: '🌙'
    },
    {
      time: '05h00',
      title: 'Recherche',
      description: 'Cherchez vers l\'Est-Sud-Est, près de l\'horizon',
      icon: '🔭'
    },
    {
      time: '05h15',
      title: 'Apparition',
      description: 'Sirius émerge de la lueur de l\'aube',
      icon: '⭐'
    },
    {
      time: '05h30',
      title: 'Observation',
      description: 'Moment optimal pour contempler',
      icon: '✨'
    }
  ];
  
  const equipment = [
    { item: 'Jumelles', essential: false, description: '7x50 ou 10x50 recommandées' },
    { item: 'Lampe rouge', essential: true, description: 'Préserve la vision nocturne' },
    { item: 'Boussole', essential: true, description: 'Pour trouver l\'Est' },
    { item: 'Vêtements chauds', essential: true, description: 'Les matins sont frais' },
    { item: 'Carnet de notes', essential: false, description: 'Pour documenter l\'observation' }
  ];
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
          
          // Animation d'entrée
          anime.timeline({
            easing: 'easeOutQuad'
          })
          .add({
            targets: '.section-header',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800
          })
          .add({
            targets: '.timeline-container',
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 1000
          }, '-=400')
          .add({
            targets: '.timeline-phase',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(150)
          }, '-=600')
          .add({
            targets: '.equipment-grid',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800
          }, '-=400');
          
          // Animation de la timeline automatique
          startTimelineAnimation();
        }
      });
    });
    
    const section = document.getElementById('observatory');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  function startTimelineAnimation() {
    // Progression automatique de la timeline
    const timeline = anime.timeline({
      loop: true,
      autoplay: true
    });
    
    observationPhases.forEach((phase, index) => {
      timeline.add({
        targets: {},
        duration: 3000,
        changeBegin: () => {
          activePhase = index;
          animatePhaseChange(index);
        }
      });
    });
  }
  
  function animatePhaseChange(index) {
    // Animation de l'indicateur actif
    anime({
      targets: '.timeline-indicator',
      left: `${index * 25}%`,
      duration: 800,
      easing: 'easeInOutQuad'
    });
    
    // Pulsation de la phase active
    anime({
      targets: `.timeline-phase:nth-child(${index + 1}) .phase-icon`,
      scale: [1, 1.2, 1],
      duration: 600,
      easing: 'easeInOutQuad'
    });
  }
</script>

<section id="observatory" class="observatory">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Guide d'Observation</h2>
      <p class="section-subtitle">
        Tout ce qu'il faut savoir pour observer le lever héliaque
      </p>
    </div>
    
    <div class="observatory-content" class:visible>
      <!-- Timeline d'observation -->
      <div class="timeline-container">
        <h3>Chronologie de l'Observation</h3>
        <div class="timeline">
          <div class="timeline-track"></div>
          <div class="timeline-indicator"></div>
          {#each observationPhases as phase, i}
            <div class="timeline-phase" class:active={activePhase === i}>
              <div class="phase-icon">{phase.icon}</div>
              <div class="phase-time">{phase.time}</div>
              <div class="phase-info">
                <h4>{phase.title}</h4>
                <p>{phase.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Équipement recommandé -->
      <div class="equipment-section">
        <h3>Équipement Recommandé</h3>
        <div class="equipment-grid">
          {#each equipment as item, i}
            <div 
              class="equipment-card" 
              class:essential={item.essential}
              style="animation-delay: {i * 0.1}s"
            >
              <div class="equipment-header">
                <span class="equipment-name">{item.item}</span>
                {#if item.essential}
                  <span class="essential-badge">Essentiel</span>
                {/if}
              </div>
              <p class="equipment-desc">{item.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Conseils pratiques -->
      <div class="tips-section">
        <h3>Conseils Pratiques</h3>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon">🌤️</div>
            <h4>Météo Idéale</h4>
            <p>Ciel dégagé à l'Est, pas de nuages bas, humidité modérée</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🌑</div>
            <h4>Phase Lunaire</h4>
            <p>Nouvelle lune ou croissant fin pour un ciel plus sombre</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">📱</div>
            <h4>Applications Utiles</h4>
            <p>Stellarium, SkySafari, Star Walk pour repérer les constellations</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">👥</div>
            <h4>En Groupe</h4>
            <p>Partagez ce moment unique avec famille et amis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .observatory {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-dawn);
  }
  
  .observatory-content {
    margin-top: var(--spacing-lg);
  }
  
  /* Timeline */
  .timeline-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 3rem;
    opacity: 0;
  }
  
  .timeline-container h3 {
    color: var(--color-primary);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .timeline {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
  }
  
  .timeline-track {
    position: absolute;
    top: 3rem;
    left: 5%;
    right: 5%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  .timeline-indicator {
    position: absolute;
    top: 3rem;
    left: 0;
    width: 25%;
    height: 4px;
    background: var(--color-primary);
    border-radius: 2px;
    transition: left 0.8s ease-in-out;
  }
  
  .timeline-phase {
    flex: 1;
    text-align: center;
    position: relative;
    opacity: 0;
    transform: scale(0.8);
  }
  
  .phase-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    filter: grayscale(1);
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .timeline-phase.active .phase-icon {
    filter: grayscale(0);
    opacity: 1;
  }
  
  .phase-time {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  .phase-info h4 {
    color: var(--color-light);
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .phase-info p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  /* Équipement */
  .equipment-section {
    margin-bottom: 3rem;
  }
  
  .equipment-section h3 {
    color: var(--color-primary);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    opacity: 0;
  }
  
  .equipment-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 1.5rem;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .equipment-card.essential {
    border-color: var(--color-primary);
    background: rgba(255, 215, 0, 0.05);
  }
  
  .equipment-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .equipment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .equipment-name {
    font-weight: 600;
    color: var(--color-light);
  }
  
  .essential-badge {
    background: var(--color-primary);
    color: var(--color-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .equipment-desc {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  /* Conseils */
  .tips-section h3 {
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
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .tip-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .tip-card h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  .tip-card p {
    font-size: 0.9rem;
    opacity: 0.8;
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
    .timeline {
      flex-direction: column;
      gap: 2rem;
    }
    
    .timeline-track {
      display: none;
    }
    
    .timeline-indicator {
      display: none;
    }
    
    .equipment-grid, .tips-grid {
      grid-template-columns: 1fr;
    }
  }
</style>