<script>
  import { onMount } from 'svelte';
  
  let selectedLocation = 'Pointe des Châteaux';
  let selectedYear = '2025';
  let visible = false;
  
  const predictionsData = {
    "Pointe des Châteaux": {
      coords: "16.2476°N, 61.1771°O",
      "2025": { date: "22 juillet", time: "05:12" },
      "2026": { date: "22 juillet", time: "05:12" },
      "2027": { date: "22 juillet", time: "05:13" },
      "2028": { date: "21 juillet", time: "05:13" },
      "2029": { date: "22 juillet", time: "05:14" }
    },
    "Pointe de la Grande Vigie": {
      coords: "16.5098°N, 61.4666°O",
      "2025": { date: "22 juillet", time: "05:11" },
      "2026": { date: "22 juillet", time: "05:12" },
      "2027": { date: "22 juillet", time: "05:12" },
      "2028": { date: "21 juillet", time: "05:12" },
      "2029": { date: "22 juillet", time: "05:13" }
    },
    "Duzer (Sainte-Rose)": {
      coords: "16.3361°N, 61.7430°O",
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:14" },
      "2029": { date: "22 juillet", time: "05:15" }
    },
    "Saint-Félix (Le Gosier)": {
      coords: "16.2005°N, 61.4605°O",
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:13" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:14" },
      "2029": { date: "22 juillet", time: "05:15" }
    },
    "Grande Pointe (Trois-Rivières)": {
      coords: "15.9696°N, 61.6308°O",
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:15" }
    },
    "Petit-Pérou": {
      coords: "16.0517°N, 61.5567°O",
      "2025": { date: "22 juillet", time: "05:14" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:15" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:16" }
    },
    "Pointe du Vieux-Fort": {
      coords: "15.9483°N, 61.7072°O",
      "2025": { date: "22 juillet", time: "05:14" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:15" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:16" }
    }
  };
  
  $: currentPrediction = predictionsData[selectedLocation][selectedYear];
  $: observationWindow = calculateWindow(currentPrediction.date);
  
  function calculateWindow(dateStr) {
    const day = parseInt(dateStr.split(' ')[0]);
    const month = dateStr.split(' ')[1];
    return `${day - 2} au ${day + 2} ${month}`;
  }
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });
    
    const section = document.getElementById('predictions');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
</script>

<section id="predictions" class="predictions">
  <div class="pattern-bogolan"></div>
  
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Calculateur de Lever Héliaque</h2>
      <p class="section-subtitle">
        Trouvez la date précise pour votre site d'observation
      </p>
    </div>
    
    <div class="calculator-container" class:visible>
      <div class="calculator-inputs">
        <div class="input-group">
          <label for="location-select">Site d'observation</label>
          <select id="location-select" bind:value={selectedLocation}>
            {#each Object.keys(predictionsData) as location}
              <option value={location}>{location}</option>
            {/each}
          </select>
          <small class="coords">{predictionsData[selectedLocation].coords}</small>
        </div>
        
        <div class="input-group">
          <label for="year-select">Année</label>
          <select id="year-select" bind:value={selectedYear}>
            {#each ['2025', '2026', '2027', '2028', '2029'] as year}
              <option value={year}>{year}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <div class="prediction-result card">
        <div class="result-header">
          <h3>{selectedLocation}</h3>
          <span class="year-badge">{selectedYear}</span>
        </div>
        
        <div class="result-content">
          <div class="date-display">
            <div class="date-icon">📅</div>
            <div class="date-text">
              <div class="date-value">{currentPrediction.date}</div>
              <div class="date-label">Date du lever héliaque</div>
            </div>
          </div>
          
          <div class="time-display">
            <div class="time-icon">⏰</div>
            <div class="time-text">
              <div class="time-value">{currentPrediction.time}</div>
              <div class="time-label">Heure locale (UTC-4)</div>
            </div>
          </div>
          
          <div class="window-display">
            <div class="window-icon">👁️</div>
            <div class="window-text">
              <div class="window-value">{observationWindow}</div>
              <div class="window-label">Fenêtre d'observation recommandée</div>
            </div>
          </div>
        </div>
        
        <div class="result-tip">
          <p>💡 <strong>Conseil :</strong> Arrivez 20 minutes avant l'heure indiquée et observez vers l'Est-Sud-Est</p>
        </div>
      </div>
    </div>
    
    <div class="info-cards" class:visible>
      <div class="info-card card">
        <h4>Conditions Idéales</h4>
        <ul>
          <li>Horizon Est dégagé</li>
          <li>Ciel clair sans nuages</li>
          <li>Faible pollution lumineuse</li>
          <li>Temps sec (peu d'humidité)</li>
        </ul>
      </div>
      
      <div class="info-card card">
        <h4>Équipement Recommandé</h4>
        <ul>
          <li>Jumelles (optionnel)</li>
          <li>Application de boussole</li>
          <li>Vêtements chauds</li>
          <li>Stellarium (préparation)</li>
        </ul>
      </div>
      
      <div class="info-card card">
        <h4>Météo & Visibilité</h4>
        <p>La brume de sable sahélienne peut retarder la visibilité. 
        Surveillez les prévisions météo et privilégiez les matins secs.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .predictions {
    position: relative;
    padding: var(--spacing-xl) 0;
    background: var(--gradient-dawn);
  }
  
  .pattern-bogolan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .calculator-container {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .calculator-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .calculator-inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-group label {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .input-group select {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-radius: 10px;
    color: var(--color-light);
    font-size: 1rem;
    transition: var(--transition-base);
  }
  
  .input-group select:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .coords {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .prediction-result {
    background: rgba(255, 215, 0, 0.1);
    border-color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
  }
  
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .result-header h3 {
    color: var(--color-primary);
    margin: 0;
  }
  
  .year-badge {
    background: var(--gradient-sunrise);
    color: var(--color-dark);
    padding: 0.25rem 1rem;
    border-radius: 20px;
    font-weight: 600;
  }
  
  .result-content {
    display: grid;
    gap: var(--spacing-sm);
  }
  
  .date-display,
  .time-display,
  .window-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  .date-icon,
  .time-icon,
  .window-icon {
    font-size: 2rem;
  }
  
  .date-value,
  .time-value,
  .window-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }
  
  .date-label,
  .time-label,
  .window-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .result-tip {
    margin-top: var(--spacing-sm);
    padding: 1rem;
    background: rgba(255, 107, 53, 0.2);
    border-radius: 10px;
    border-left: 4px solid var(--color-accent);
  }
  
  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.6s;
  }
  
  .info-cards.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .info-card h4 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .info-card ul {
    list-style: none;
    padding: 0;
  }
  
  .info-card li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .info-card li::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }
  
  @media (max-width: 768px) {
    .calculator-inputs {
      grid-template-columns: 1fr;
    }
    
    .result-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>
