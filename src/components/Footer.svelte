<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-pattern pattern-kente"></div>
  
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Sirius en Guadeloupe</h3>
        <p>
          Un projet célébrant le patrimoine astronomique africain 
          et caribéen à travers l'observation du lever héliaque de Sirius.
        </p>
        <div class="social-links">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="Instagram">📷</a>
        </div>
      </div>
      
      <div class="footer-section">
        <h4>Liens Rapides</h4>
        <ul>
          <li><a href="#predictions">Calculateur</a></li>
          <li><a href="#science">Science</a></li>
          <li><a href="#culture">Culture</a></li>
          <li><a href="#observatory">Observer</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Ressources</h4>
        <ul>
          <li><a href="https://stellarium.org" target="_blank" rel="noopener">Stellarium</a></li>
          <li><a href="#">Guide PDF</a></li>
          <li><a href="#">Références</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Prochaine Observation</h4>
        <div class="countdown">
          <div class="countdown-item">
            <div class="countdown-value">22</div>
            <div class="countdown-label">Juillet</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">2025</div>
            <div class="countdown-label">05:12</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {currentYear} Sirius Gwada. Levez les yeux vers le ciel.</p>
      <p class="footer-quote">
        "Les étoiles sont les ancêtres qui veillent sur nous" - Proverbe africain
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    background: var(--color-dark);
    padding: var(--spacing-xl) 0 var(--spacing-md);
    border-top: 2px solid rgba(255, 215, 0, 0.3);
    overflow: hidden;
  }
  
  .footer-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    z-index: 0;
  }
  
  .footer-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }
    font-size: 1.5rem;
  }
  
  .countdown {
    display: flex;
    gap: 1rem;
  }
  
  .countdown-item {
    background: rgba(255, 215, 0, 0.1);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  
  .countdown-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }
  
  .countdown-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  .footer-quote {
    margin-top: 0.5rem;
    font-style: italic;
    color: var(--color-primary);
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .social-links {
      justify-content: center;
    }
  }
</style>
