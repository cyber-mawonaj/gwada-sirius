<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });
    
    const section = document.getElementById('observatory');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const steps = [
    {
      number: 1,
      title: 'Choisir le Site',
      description: 'Trouvez un lieu avec un horizon Est dégagé, loin des lumières urbaines.',
      icon: '🏖️'
    },
    {
      number: 2,
      title: 'Se Préparer',
      description: 'Utilisez Stellarium pour repérer Sirius. Arrivez 20 minutes en avance.',
      icon: '🔭'
    },
    {
      number: 3,
      title: 'Observer',
      description: 'Regardez vers l\'Est-Sud-Est. Sirius apparaîtra brillante et scintillante.',
      icon: '👁️'
    },
    {
      number: 4,
      title: 'Être Patient',
      description: 'La météo peut changer. Observez sur plusieurs jours pour maximiser vos chances.',
      icon: '⏳'
    }
  ];
  
  const equipment = [
    { item: 'Vos yeux', essential: true, description: 'L\'outil le plus important!' },
    { item: 'Jumelles', essential: false, description: 'Utiles mais optionnelles' },
    { item: 'Boussole/App', essential: true, description: 'Pour trouver l\'Est' },
    { item: 'Vêtements chauds', essential: true, description: 'Les matins sont frais' },
    { item: 'Lampe rouge', essential: false, description: 'Préserve la vision nocturne' },
    { item: 'Carnet de notes', essential: false, description: 'Pour documenter l\'observation' }
  ];
</script>

<section id="observatory" class="observatory">
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Guide d'Observation</h2>
      <p class="section-subtitle">
        Votre manuel pratique pour réussir l'observation du lever héliaque
      </p>
    </div>
    
    <div class="guide-content" class:visible>
      <div class="steps-section">
        <h3>Les Étapes Clés</h3>
        <div class="steps-grid">
          {#each steps as step}
            <div class="step-card card">
              <div class="step-number">{step.number}</div>
              <div class="step-icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="equipment-section">
        <h3>Équipement Recommandé</h3>
        <div class="equipment-grid">
          {#each equipment as equip}
            <div class="equipment-item" class:essential={equip.essential}>
              <div class="equipment-icon">
                {equip.essential ? '⭐' : '○'}
              </div>
              <div class="equipment-info">
                <h5>{equip.item}</h5>
                <p>{equip.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="stellarium-guide card">
        <h3>Mini-Guide Stellarium</h3>
        <ol>
          <li><strong>Télécharger :</strong> stellarium.org (gratuit)</li>
          <li><strong>Configurer le lieu (F6) :</strong> Entrez les coordonnées de votre site</li>
          <li><strong>Régler la date (F5) :</strong> Choisissez le 22 juillet 2025, 5h00</li>
          <li><strong>Chercher Sirius (F3) :</strong> Le logiciel pointera l'étoile</li>
          <li><strong>Simuler :</strong> Avancez le temps pour voir le lever</li>
        </ol>
      </div>
      
      <div class="tips-section">
        <h3>Conseils d'Expert</h3>
        <div class="tips-grid">
          <div class="tip-card card">
            <div class="tip-icon">🌤️</div>
            <h4>Météo</h4>
            <p>Surveillez les prévisions. Un ciel dégagé et sec est idéal.</p>
          </div>
          <div class="tip-card card">
            <div class="tip-icon">📍</div>
            <h4>Position</h4>
            <p>Sirius se lève à environ 105° (Est-Sud-Est) en Guadeloupe.</p>
          </div>
          <div class="tip-card card">
            <div class="tip-icon">👥</div>
            <h4>Groupe</h4>
            <p>Observez à plusieurs pour confirmer la première visibilité.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .observatory {
    padding: var(--spacing-xl) 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
  }
  
  .guide-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .guide-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .guide-content h3 {
    color: var(--color-primary);
    font-size: 1.8rem;
    margin-bottom: var(--spacing-md);
    text-align: center;
  }
  
  /* Steps */
  .steps-section {
    margin-bottom: var(--spacing-xl);
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
  }
  
  .step-card {
    position: relative;
    text-align: center;
    padding-top: 3rem;
  }
  
  .step-number {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: var(--gradient-sunrise);
    color: var(--color-dark);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
  }
  
  .step-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .step-card h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  /* Equipment */
  .equipment-section {
    margin-bottom: var(--spacing-xl);
  }
  
  .equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-sm);
  }
  
  .equipment-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: var(--transition-base);
  }
  
  .equipment-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .equipment-icon {
    font-size: 1.5rem;
  }
  
  .equipment-item.essential .equipment-icon {
    color: var(--color-primary);
  }
  
  .equipment-info h5 {
    color: var(--color-light);
    margin-bottom: 0.25rem;
  }
  
  .equipment-info p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  /* Stellarium Guide */
  .stellarium-guide {
    margin-bottom: var(--spacing-xl);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .stellarium-guide h3 {
    margin-bottom: 1rem;
  }
  
  .stellarium-guide ol {
    padding-left: 1.5rem;
  }
  
  .stellarium-guide li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
  
  /* Tips */
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
  }
  
  .tip-card {
    text-align: center;
  }
  
  .tip-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .tip-card h4 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
