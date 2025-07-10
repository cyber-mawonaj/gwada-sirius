<script>
  import { t } from '../lib/i18n.js';
  import LanguageSelector from './LanguageSelector.svelte';
  import anime from 'animejs/lib/anime.es.js';
  import { onMount } from 'svelte';
  
  export let activeSection = 'home';
  
  let isMenuOpen = false;
  let navbar;
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      anime({
        targets: '.nav-menu',
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad'
      });
      
      anime({
        targets: '.nav-menu li',
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(50),
        easing: 'easeOutQuad'
      });
    }
  };
  
  onMount(() => {
    // Animation d'entrée de la navbar
    anime({
      targets: navbar,
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad'
    });
    
    // Animation du logo
    anime({
      targets: '.logo-icon',
      rotate: [0, 360],
      duration: 2000,
      delay: 500,
      easing: 'easeInOutQuad'
    });
  });
  
  const menuItems = [
    { id: 'home', label: 'nav_home', icon: '🌟' },
    { id: 'about', label: 'nav_about', icon: '✨' },
    { id: 'predictions', label: 'nav_predictions', icon: '📅' },
    { id: 'science', label: 'nav_science', icon: '🔭' },
    { id: 'culture', label: 'nav_culture', icon: '🌍' },
    { id: 'observatory', label: 'nav_observatory', icon: '👁️' }
  ];
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    isMenuOpen = false;
  };
</script>

<nav class="navbar" class:scrolled={activeSection !== 'home'} bind:this={navbar}>
  <div class="container">
    <div class="nav-content">
      <a href="#home" class="logo" on:click|preventDefault={() => scrollToSection('home')}>
        <span class="logo-icon">☥</span>
        <span class="logo-text">Sirius Gwada</span>
      </a>
      
      <button class="menu-toggle" on:click={toggleMenu} aria-label="Menu">
        <span class="hamburger" class:active={isMenuOpen}></span>
      </button>
      
      <ul class="nav-menu" class:open={isMenuOpen}>
        {#each menuItems as item}
          <li>
            <a 
              href="#{item.id}" 
              class:active={activeSection === item.id}
              on:click|preventDefault={() => scrollToSection(item.id)}
            >
              <span class="nav-icon">{item.icon}</span>
              <span class="nav-label">{$t(item.label)}</span>
            </a>
          </li>
        {/each}
      </ul>
      
      <LanguageSelector />
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(10px);
    transition: var(--transition-base);
    border-bottom: 1px solid transparent;
  }
  
  .navbar.scrolled {
    border-bottom-color: rgba(255, 215, 0, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--color-primary);
    font-family: var(--font-display);
    font-size: 1.5rem;
    transition: var(--transition-base);
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
  
  .logo-icon {
    font-size: 2rem;
    animation: rotate 20s linear infinite;
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .hamburger {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--color-primary);
    position: relative;
    transition: var(--transition-base);
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-primary);
    transition: var(--transition-base);
  }
  
  .hamburger::before {
    top: -8px;
  }
  
  .hamburger::after {
    bottom: -8px;
  }
  
  .hamburger.active {
    background: transparent;
  }
  
  .hamburger.active::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .hamburger.active::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
  
  .nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-menu a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--color-light);
    transition: var(--transition-base);
    position: relative;
  }
  
  .nav-menu a:hover,
  .nav-menu a.active {
    color: var(--color-primary);
  }
  
  .nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transition: var(--transition-base);
  }
  
  .nav-menu a.active::after {
    transform: scaleX(1);
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
  
  /* Mobile */
  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }
    
    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(26, 26, 46, 0.98);
      flex-direction: column;
      padding: 2rem;
      transform: translateY(-100%);
      opacity: 0;
      transition: var(--transition-base);
      border-bottom: 2px solid var(--color-primary);
    }
    
    .nav-menu.open {
      transform: translateY(0);
      opacity: 1;
    }
    
    .nav-menu a {
      padding: 0.5rem 0;
    }
  }
</style>
