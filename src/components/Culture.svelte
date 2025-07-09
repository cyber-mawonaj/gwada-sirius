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
    
    const section = document.getElementById('culture');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const cultures = [
    {
      id: 'egypt',
      title: 'Égypte : Sothis, la Déesse du Nil',
      icon: '🏺',
      content: `Pour les anciens Égyptiens, le lever héliaque de Sirius (Sothis) 
      était l'événement le plus important de l'année. Il annonçait la crue du Nil, 
      source de vie et de fertilité. Ce "retour" de l'étoile marquait le Nouvel An 
      et symbolisait la renaissance, associée à la déesse Isis.`
    },
    {
      id: 'dogon',
      title: 'Dogon : Les Gardiens du Savoir Stellaire',
      icon: '🌍',
      content: `Le peuple Dogon du Mali possède un savoir stupéfiant sur Sirius. 
      Ils connaissaient l'existence de Sirius B, une naine blanche invisible à l'œil nu, 
      bien avant sa découverte scientifique. Leur cycle rituel de 60 ans, le Sigui, 
      est directement lié à leur compréhension du système de Sirius.`
    },
    {
      id: 'caribbean',
      title: 'Caraïbes : La Navigation Stellaire',
      icon: '⛵',
      content: `Dans les Caraïbes, Sirius a guidé les navigateurs depuis des siècles. 
      Les peuples autochtones et les marins africains utilisaient son lever pour 
      marquer les saisons et naviguer entre les îles. Aujourd'hui encore, elle reste 
      un repère fondamental pour les pêcheurs traditionnels.`
    }
  ];
</script>

<section id="culture" class="culture">
  <div class="pattern-adinkra"></div>
  
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Sirius, Miroir des Cultures</h2>
      <p class="section-subtitle">
        Un héritage millénaire qui unit l'Afrique et les Caraïbes
      </p>
    </div>
    
    <div class="cultures-grid" class:visible>
      {#each cultures as culture, i}
        <div class="culture-card card" style="animation-delay: {i * 0.2}s">
          <div class="culture-icon">{culture.icon}</div>
          <h3>{culture.title}</h3>
          <p>{culture.content}</p>
        </div>
      {/each}
    </div>
    
    <div class="timeline" class:visible>
      <h3>Chronologie du Savoir</h3>
      <div class="timeline-items">
        <div class="timeline-item">
          <div class="timeline-date">3000 BCE</div>
          <div class="timeline-content">
            <h4>Égypte Ancienne</h4>
            <p>Premier calendrier basé sur Sirius</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">XIIIe siècle</div>
          <div class="timeline-content">
            <h4>Migration Dogon</h4>
            <p>Préservation du savoir astronomique</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">XVe-XVIIe siècle</div>
          <div class="timeline-content">
            <h4>Traversée Atlantique</h4>
            <p>Le savoir africain voyage vers les Caraïbes</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2025</div>
          <div class="timeline-content">
            <h4>Renaissance</h4>
            <p>Redécouverte et célébration en Guadeloupe</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .culture {
    position: relative;
    padding: var(--spacing-xl) 0;
    background: var(--gradient-dawn);
  }
  
  .pattern-adinkra {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .cultures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .cultures-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .culture-card {
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .culture-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
  }
  
  .culture-card h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.6s;
  }
  
  .timeline.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .timeline h3 {
    text-align: center;
    color: var(--color-primary);
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
  }
  
  .timeline-items {
    position: relative;
    padding-left: 40px;
  }
  
  .timeline-items::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-sunrise);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: var(--spacing-md);
    display: flex;
    gap: var(--spacing-md);
  }
  
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -34px;
    top: 8px;
    width: 16px;
    height: 16px;
    background: var(--color-primary);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  
  .timeline-date {
    font-weight: 600;
    color: var(--color-primary);
    min-width: 100px;
  }
  
  .timeline-content h4 {
    color: var(--color-light);
    margin-bottom: 0.25rem;
  }
  
  .timeline-content p {
    color: rgba(255, 255, 255, 0.7);
  }
  
  @media (max-width: 768px) {
    .timeline-items {
      padding-left: 20px;
    }
    
    .timeline-item {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .timeline-item::before {
      left: -24px;
    }
  }
</style>
