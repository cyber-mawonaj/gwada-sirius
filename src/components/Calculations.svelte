<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let selectedCalculation = 'heliacal';
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });
    
    const section = document.getElementById('calculations');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const calculations = {
    heliacal: {
      title: 'Lever Héliaque',
      description: 'Calcul de la première visibilité de Sirius avant l\'aube'
    },
    arcus: {
      title: 'Arcus Visionis',
      description: 'Angle minimal entre le Soleil et Sirius pour la visibilité'
    }
  };
</script>
<section id="calculations" class="calculations-section">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Calculs Astronomiques</h2>
      <p class="section-subtitle">
        La science précise derrière le lever héliaque
      </p>
    </div>
    
    <div class="calculations-wrapper" class:visible>
      <!-- Sélecteur de calcul -->
      <div class="calc-selector">
        {#each Object.entries(calculations) as [key, calc]}
          <button 
            class="calc-btn"
            class:active={selectedCalculation === key}
            on:click={() => selectedCalculation = key}
          >
            <h4>{calc.title}</h4>
            <p>{calc.description}</p>
          </button>
        {/each}
      </div>
      
      <!-- Contenu des calculs -->
      <div class="calc-content">
        {#if selectedCalculation === 'heliacal'}
          <div class="calc-panel">
            <h3>Calcul du Lever Héliaque de Sirius</h3>            
            <div class="formula-box">
              <h4>Formule Principale</h4>
              <div class="formula">
                <p><strong>Date du lever héliaque = </strong></p>
                <p>Date de conjonction + Arcus Visionis / Vitesse angulaire du Soleil</p>
              </div>
            </div>
            
            <div class="calculation-steps">
              <h4>Étapes du Calcul pour la Guadeloupe</h4>
              
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h5>Coordonnées de la Guadeloupe</h5>
                  <code>Latitude: 16.25°N, Longitude: 61.58°O</code>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h5>Position de Sirius</h5>
                  <code>Ascension droite: 6h 45m 09s</code>
                  <code>Déclinaison: -16° 42' 58"</code>
                </div>
              </div>
            </div>
          </div>        {/if}
        
        {#if selectedCalculation === 'arcus'}
          <div class="calc-panel">
            <h3>Arcus Visionis - L'Arc de Vision</h3>
            
            <div class="explanation">
              <p>
                L'Arcus Visionis est l'angle minimal entre le Soleil et une étoile 
                pour que celle-ci devienne visible.
              </p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .calculations-section {
    padding: var(--spacing-xl) 0;
    background: var(--gradient-dawn);
  }
  
  .calculations-wrapper {
    margin-top: var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }  
  .calculations-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .calc-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .calc-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .calc-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
  
  .calc-btn.active {
    background: rgba(255, 215, 0, 0.1);
    border-color: var(--color-primary);
  }  
  .calc-btn h4 {
    color: var(--color-primary);
    margin: 0 0 0.5rem 0;
  }
  
  .calc-btn p {
    color: var(--color-light);
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .calc-panel {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem;
  }
  
  .formula-box {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .formula {
    font-family: 'Courier New', monospace;
    color: var(--color-light);
    margin: 1rem 0;
  }
  
  .calculation-steps {
    margin: 2rem 0;
  }  
  .step {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;
  }
  
  .step-number {
    background: var(--color-primary);
    color: var(--color-dark);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-content h5 {
    color: var(--color-secondary);
    margin: 0 0 0.5rem 0;
  }
  
  .step-content code {
    display: block;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin: 0.25rem 0;
    font-family: 'Courier New', monospace;
  }
  
  @media (max-width: 768px) {
    .calc-selector {
      grid-template-columns: 1fr;
    }
    
    .calc-panel {
      padding: 1rem;
    }
  }
</style>