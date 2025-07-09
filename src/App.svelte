<script>
  import { onMount } from 'svelte';
  import Hero from './components/Hero.svelte';
  import Navigation from './components/Navigation.svelte';
  import About from './components/About.svelte';
  import Predictions from './components/Predictions.svelte';
  import Science from './components/Science.svelte';
  import Culture from './components/Culture.svelte';
  import Observatory from './components/Observatory.svelte';
  import Globe from './components/Globe.svelte';
  import Footer from './components/Footer.svelte';
  
  let scrollY = 0;
  let activeSection = 'home';
  
  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      
      // Déterminer la section active
      const sections = ['home', 'about', 'predictions', 'science', 'culture', 'observatory'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection = section;
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<Navigation {activeSection} />

<main>
  <Hero />
  <About />
  <Predictions />
  <Science />
  <Culture />
  <Observatory />
  <Globe />
</main>

<Footer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  
  main {
    position: relative;
    z-index: 1;
  }
</style>
