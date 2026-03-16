
const HeroHeader = () => {
  return (
    <section className="container" style={{ padding: '10rem 0 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-hero)', 
          lineHeight: '61px', 
          marginBottom: '3rem',
          fontWeight: 700
        }}>
          <span style={{ color: 'var(--mint-green)' }}>Almah redefine la experiencia jurídica.</span>
          <br />
          <span style={{ color: 'var(--text-black)' }}>Networking, formación e inteligencia artificial en una plataforma integral creada para profesionales en crecimiento</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroHeader;
