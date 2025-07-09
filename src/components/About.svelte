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
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  });
  
  const features = [
    {
      icon: '🌟',
      title: 'L\'Étoile la Plus Brillante',
      description: 'Sirius brille avec une magnitude de -1.46, dominant notre ciel nocturne.'
    },
    {
      icon: '🌅',
      title: 'Le Lever Héliaque',
      description: 'Sa première apparition à l\'aube après 70 jours d\'invisibilité marque un événement cosmique.'
    },
    {
      icon: '🗿',
      title: 'Héritage Ancestral',
      description: 'De l\'Égypte ancienne aux Dogons du Mali, Sirius guide l\'humanité depuis des millénaires.'
    }
  ];
</script>

<section id="about" class="about">
  <div class="pattern-kente"></div>
  
  <div class="container">
    <div class="section-header" class:visible>
      <h2>Sirius et Wep Ronpet</h2>
      <p class="section-subtitle">
        L'Ouverture de l'Année - Le Nouvel An Cosmique des Anciens Égyptiens
      </p>
    </div>
    
    <div class="about-content" class:visible>
      <div class="about-text">
        <p>
          <strong>Wep Ronpet</strong> - "l'Ouverture de l'Année" en égyptien ancien - 
          marquait le jour le plus sacré du calendrier égyptien. Ce jour correspondait 
          au lever héliaque de Sirius, quand l'étoile réapparaissait à l'aube après 
          70 jours d'invisibilité.
        </p>
        <p>
          Le lever héliaque de Sirius n'est pas qu'un simple phénomène astronomique. 
          C'est un rendez-vous millénaire entre l'humanité et le cosmos, un moment où 
          science et spiritualité se rencontrent dans la lumière de l'aube.
        </p>
        <p>
          En Guadeloupe, observer ce phénomène nous connecte directement aux racines 
          africaines, où Sirius était vénérée comme l'annonciatrice de la vie et du renouveau.
        </p>
      </div>
      
      <div class="features-grid">
        {#each features as feature, i}
          <div class="feature-card card" style="animation-delay: {i * 0.2}s">
            <div class="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    position: relative;
    padding: var(--spacing-xl) 0;
    overflow: hidden;
  }
  
  .pattern-kente {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    z-index: 0;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .section-header.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-subtitle {
    font-size: 1.5rem;
    color: var(--color-primary);
    font-family: var(--font-heading);
  }
  
  .about-content {
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.3s;
  }
  
  .about-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-text {
    max-width: 800px;
    margin: 0 auto var(--spacing-lg);
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.8;
  }
  
  .about-text p {
    margin-bottom: 1rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }
  
  .feature-card {
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
  }
  
  .feature-card h3 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
