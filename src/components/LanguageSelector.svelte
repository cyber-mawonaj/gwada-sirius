<script>
  import { currentLanguage, availableLanguages, setLanguage } from '../lib/i18n.js';
  
  let isOpen = false;
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectLanguage(lang) {
    setLanguage(lang);
    isOpen = false;
  }
  
  // Fermer le dropdown si on clique ailleurs
  function handleClickOutside(event) {
    if (!event.target.closest('.language-selector')) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-selector">
  <button class="language-button" on:click={toggleDropdown}>
    <span class="flag">
      {availableLanguages.find(l => l.code === $currentLanguage)?.flag}
    </span>
    <span class="language-name">
      {availableLanguages.find(l => l.code === $currentLanguage)?.name}
    </span>
    <span class="arrow" class:open={isOpen}>▼</span>
  </button>
  
  {#if isOpen}
    <div class="language-dropdown">
      {#each availableLanguages as lang}
        <button 
          class="language-option"
          class:active={$currentLanguage === lang.code}
          on:click={() => selectLanguage(lang.code)}
        >
          <span class="flag">{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-selector {
    position: relative;
  }
  
  .language-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: var(--color-light);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .language-button:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--color-primary);
  }
  
  .flag {
    font-size: 1.2rem;
  }
  
  .language-name {
    font-size: 0.9rem;
  }
  
  .arrow {
    font-size: 0.7rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  .arrow.open {
    transform: rotate(180deg);
  }
  
  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: var(--color-dark);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  }
  
  .language-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    color: var(--color-light);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .language-option:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .language-option.active {
    background: rgba(255, 215, 0, 0.2);
    color: var(--color-primary);
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .language-name {
      display: none;
    }
    
    .language-button {
      padding: 0.5rem;
    }
  }
</style>