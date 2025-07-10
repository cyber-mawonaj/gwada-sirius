<script>
  import { onMount } from 'svelte';
  import anime from 'animejs/lib/anime.es.js';
  
  let loading = true;
  let progress = 0;
  
  onMount(() => {
    // Animation de la barre de progression
    anime({
      targets: { value: 0 },
      value: 100,
      duration: 2000,
      easing: 'easeInOutQuad',
      update: function(anim) {
        progress = Math.round(anim.animations[0].currentValue);
      },
      complete: function() {
        setTimeout(() => {
          loading = false;
          // Animation de sortie
          anime({
            targets: '.loader',
            opacity: [1, 0],
            duration: 600,
            easing: 'easeOutQuad'
          });
        }, 300);
      }
    });
    
    // Animation des étoiles du loader
    anime({
      targets: '.loader-star',
      rotate: 360,
      duration: 2000,
      easing: 'linear',
      loop: true
    });
    
    // Animation du texte
    anime({
      targets: '.loader-text span',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)'
    });
  });
</script>

{#if loading}
  <div class="loader">
    <div class="loader-content">
      <div class="loader-star">⭐</div>
      <div class="loader-text">
        <span>S</span>
        <span>i</span>
        <span>r</span>
        <span>i</span>
        <span>u</span>
        <span>s</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
      <div class="progress-text">{progress}%</div>
    </div>
  </div>
{/if}

<style>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: none;
  }
  
  .loader-content {
    text-align: center;
  }
  
  .loader-star {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
  
  .loader-text {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 2rem;
    letter-spacing: 0.5rem;
  }
  
  .loader-text span {
    display: inline-block;
    opacity: 0;
  }
  
  .progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto 1rem;
  }
  
  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    transition: width 0.3s ease;
  }
  
  .progress-text {
    color: var(--color-light);
    font-size: 0.9rem;
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    .loader-text {
      font-size: 2rem;
    }
    
    .loader-star {
      font-size: 3rem;
    }
  }
</style>