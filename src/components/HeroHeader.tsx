const HeroHeader = () => {
  return (
    <section className="container hero-header-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="hero-header-title">
          <span style={{ color: 'var(--mint-green)' }}>Almah redefine la experiencia jurídica.</span>
          <br />
          Networking, formación e inteligencia artificial en una plataforma integral creada para profesionales en crecimiento
        </h1>
        <div className="hero-header-buttons">
          <button 
            onClick={() => window.location.href = 'https://forms.gle/EgnBCy7TNZ3rSksdA'}
            className="btn-primary hero-btn"
          >
            Explorar Comunidades
          </button>
          <button 
            onClick={() => window.location.href = 'https://forms.gle/EgnBCy7TNZ3rSksdA'}
            className="btn-secondary hero-btn"
            style={{ 
              color: 'var(--text-black)',
              borderColor: 'var(--text-black)' 
            }}
          >
            Ver más
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
