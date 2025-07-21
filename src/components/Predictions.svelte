<script>
  import { onMount } from 'svelte';
  import { t } from '../lib/i18n.js';
  import anime from '../lib/anime.js';
  
  let visible = false;
  let selectedLocation = 'moule';
  let calculationInProgress = false;
  let results = null;
  
  const locations = [
    { id: 'moule', name: 'Le Moule', lat: 16.3333, lng: -61.3472 },
    { id: 'deshaies', name: 'Deshaies', lat: 16.3039, lng: -61.7966 },
    { id: 'sainte-anne', name: 'Sainte-Anne', lat: 16.2262, lng: -61.3809 },
    { id: 'port-louis', name: 'Port-Louis', lat: 16.4180, lng: -61.5312 },
    { id: 'marie-galante', name: 'Marie-Galante', lat: 15.9500, lng: -61.2667 },
    { id: 'soufriere', name: 'Route de la Soufrière', lat: 16.0439, lng: -61.6639 },
    { id: 'petite-terre', name: 'Petite-Terre', lat: 16.1700, lng: -61.1200 }
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
            targets: '.calculator-container',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000
          }, '-=400')
          .add({
            targets: '.location-option',
            translateX: [-20, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(50)
          }, '-=600');
        }
      });
    });
    
    const section = document.getElementById('predictions');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  function selectLocation(id) {
    selectedLocation = id;
    calculate();
    
    // Animation de sélection
    anime({
      targets: `.location-option`,
      scale: 1,
      duration: 300
    });
    
    anime({
      targets: `[data-location="${id}"]`,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutElastic(1, .5)'
    });
  }
  
  function calculate() {
    calculationInProgress = true;
    results = null;
    
    // Animation du calcul
    anime({
      targets: '.calculating-indicator',
      opacity: [0, 1],
      duration: 300
    });
    
    // Animation des étoiles pendant le calcul
    anime({
      targets: '.star-indicator',
      rotate: 360,
      duration: 2000,
      easing: 'linear',
      loop: true
    });
    
    setTimeout(() => {
      const location = locations.find(l => l.id === selectedLocation);
      
      // Calculs simplifiés
      const baseDate = new Date('2025-07-22');
      const latitudeAdjustment = (location.lat - 16.25) * 0.5;
      const heliacalDate = new Date(baseDate);
      heliacalDate.setDate(baseDate.getDate() + Math.round(latitudeAdjustment));
      
      results = {
        location: location.name,
        heliacalDate: heliacalDate.toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        bestTime: '05h00 - 05h30',
        duration: '15-20 minutes',
        azimuth: '117° (ESE)',
        altitude: '57.1°',
        magnitude: '-1.46'
      };
      
      calculationInProgress = false;
      
      // Animation des résultats
      anime.timeline({
        easing: 'easeOutQuad'
      })
      .add({
        targets: '.calculating-indicator',
        opacity: [1, 0],
        duration: 300
      })
      .add({
        targets: '.results-container',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add({
        targets: '.result-item',
        translateX: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: anime.stagger(100)
      }, '-=400')
      .add({
        targets: '.result-value',
        scale: [0.8, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .5)'
      }, '-=600');
      
    }, 1500);
  }
  
  // Calculer automatiquement au chargement
  onMount(() => {
    setTimeout(() => {
      if (visible) calculate();
    }, 1000);
  });
</script>

<section id="predictions" class="predictions">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>{$t('predictions_title')}</h2>
      <p class="section-subtitle">
        {$t('predictions_subtitle')}
      </p>
    </div>
    
    <div class="calculator-container" class:visible>
      <div class="location-selector">
        <h3>{$t('predictions_select_location')}</h3>
        <div class="locations-grid">
          {#each locations as location}
            <button 
              class="location-option"
              class:active={selectedLocation === location.id}
              data-location={location.id}
              on:click={() => selectLocation(location.id)}
            >
              <span class="location-name">{location.name}</span>
              <span class="location-coords">{location.lat}°N</span>
            </button>
          {/each}
        </div>
      </div>
      
      <div class="results-section">
        {#if calculationInProgress}
          <div class="calculating-indicator">
            <div class="star-indicator">⭐</div>
            <p>Calcul en cours...</p>
          </div>
        {/if}
        
        {#if results && !calculationInProgress}
          <div class="results-container">
            <h3>{$t('predictions_results_for')} {results.location}</h3>
            
            <div class="results-grid">
              <div class="result-item highlight">
                <div class="result-icon">🌅</div>
                <div class="result-label">{$t('predictions_heliacal_rising')}</div>
                <div class="result-value">{results.heliacalDate}</div>
              </div>
              
              <div class="result-item">
                <div class="result-icon">⏰</div>
                <div class="result-label">{$t('predictions_best_observation')}</div>
                <div class="result-value">{results.bestTime}</div>
              </div>
              
              <div class="result-item">
                <div class="result-icon">⏱️</div>
                <div class="result-label">{$t('predictions_visibility_duration')}</div>
                <div class="result-value">{results.duration}</div>
              </div>
              
              <div class="result-item">
                <div class="result-icon">🧭</div>
                <div class="result-label">{$t('predictions_azimuth')}</div>
                <div class="result-value">{results.azimuth}</div>
              </div>
              
              <div class="result-item">
                <div class="result-icon">📐</div>
                <div class="result-label">{$t('predictions_max_altitude')}</div>
                <div class="result-value">{results.altitude}</div>
              </div>
              
              <div class="result-item">
                <div class="result-icon">✨</div>
                <div class="result-label">{$t('predictions_magnitude')}</div>
                <div class="result-value">{results.magnitude}</div>
              </div>
            </div>
            
            <div class="observation-tips">
              <h4>💡 Conseils d'observation</h4>
              <ul>
                <li>Arrivez 30 minutes avant pour habituer vos yeux</li>
                <li>Cherchez vers l'Est-Sud-Est (ESE)</li>
                <li>Sirius apparaîtra comme l'étoile la plus brillante</li>
                <li>Conditions idéales : ciel dégagé, sans Lune</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .predictions {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-night);
    position: relative;
    overflow: hidden;
  }
  
  .calculator-container {
    opacity: 0;
    margin-top: var(--spacing-lg);
  }
  
  .location-selector {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .location-selector h3 {
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .locations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .location-option {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .location-option:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-primary);
  }
  
  .location-option.active {
    background: rgba(255, 215, 0, 0.1);
    border-color: var(--color-primary);
  }
  
  .location-name {
    font-weight: 600;
    color: var(--color-light);
  }
  
  .location-coords {
    font-size: 0.9rem;
    color: var(--color-primary);
    opacity: 0.8;
  }
  
  .calculating-indicator {
    text-align: center;
    padding: 3rem;
    opacity: 0;
  }
  
  .star-indicator {
    font-size: 3rem;
    display: inline-block;
    margin-bottom: 1rem;
  }
  
  .results-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
  }
  
  .results-container h3 {
    color: var(--color-primary);
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .result-item {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
  }
  
  .result-item.highlight {
    background: rgba(255, 215, 0, 0.1);
    border: 2px solid var(--color-primary);
  }
  
  .result-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .result-label {
    font-size: 0.9rem;
    color: var(--color-light);
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }
  
  .result-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-primary);
  }
  
  .observation-tips {
    background: rgba(255, 215, 0, 0.05);
    border-radius: 15px;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .observation-tips h4 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .observation-tips ul {
    list-style: none;
    padding: 0;
  }
  
  .observation-tips li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .observation-tips li::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }
  
  @media (max-width: 768px) {
    .locations-grid {
      grid-template-columns: 1fr;
    }
    
    .results-grid {
      grid-template-columns: 1fr;
    }
    
    .location-selector, .results-container {
      padding: 1.5rem;
    }
  }
</style>
