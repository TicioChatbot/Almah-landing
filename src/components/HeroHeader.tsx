const HeroHeader = () => {
  return (
    <section className="container" style={{ padding: '10rem 0 4rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-hero)', 
          lineHeight: '1.2', 
          marginBottom: '3rem',
          fontWeight: 700,
          color: 'var(--text-black)'
        }}>
          <span style={{ color: 'var(--mint-green)' }}>Almah redefine la experiencia jurídica.</span>
          <br />
          Networking, formación e inteligencia artificial en una plataforma integral creada para profesionales en crecimiento
        </h1>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
          <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Explorar Comunidades</button>
          <button className="btn-secondary" style={{ 
            padding: '1rem 2.5rem', 
            fontSize: '1.1rem',
            color: 'var(--text-black)',
            borderColor: 'var(--text-black)' 
          }}>
            Ver más
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
