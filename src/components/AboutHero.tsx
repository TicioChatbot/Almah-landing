import aboutHeroImg from '../assets/about-hero.png';

const AboutHero = () => {
  return (
    <section style={{ padding: '160px 0 0', backgroundColor: 'var(--white)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
        {/* Left Column: Text */}
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: 'var(--mint-green)', 
            marginBottom: '2rem',
            lineHeight: '1.2'
          }}>
            Conoce al equipo <br /> detrás de Almah
          </h1>
          <p style={{ 
            fontSize: '24px', 
            lineHeight: '1.4', 
            color: '#1A1A1A',
            fontWeight: 500,
            maxWidth: '450px'
          }}>
            Somos mentes creativas y manos apasionadas unidas por un mismo propósito: <span style={{ color: '#8F7FEE' }}>dar vida a comunidades con almah</span>
          </p>
        </div>

        {/* Right Column: Image */}
        <div style={{ flex: 1.2 }}>
          <div style={{ 
            width: '100%', 
            borderRadius: '12px', 
            overflow: 'hidden',
            aspectRatio: '5/4'
          }}>
            <img 
              src={aboutHeroImg} 
              alt="Equipo Almah" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
