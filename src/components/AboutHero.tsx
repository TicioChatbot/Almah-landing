import aboutHeroImg from '../assets/about-hero.png';

const AboutHero = () => {
  return (
    <section className="about-hero-section">
      <div className="container about-hero-container">
        {/* Left Column: Text */}
        <div style={{ flex: 1 }}>
          <h1 className="about-hero-title">
            Conoce al equipo <br /> detrás de Almah
          </h1>
          <p className="about-hero-desc">
            Somos mentes creativas y manos apasionadas unidas por un mismo propósito: <span style={{ color: '#8F7FEE' }}>dar vida a comunidades con almah</span>
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="about-hero-img-col">
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
