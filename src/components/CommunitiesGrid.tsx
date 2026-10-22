import { useNavigate } from 'react-router-dom';
import communityPrivacyImg from '../assets/community-privacy-new.jpg';
import communityFintechImg from '../assets/community-fintech-new.jpg';
import logoHub from '../assets/logo-hub.png';
import logoRcm from '../assets/logo-rcm.png';

const CommunitiesGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="comunidades" style={{ backgroundColor: 'var(--white)', position: 'relative' }}>
      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Decorative Lavender Bar */}
        <div style={{ 
          width: '100%', 
          height: '12px', 
          backgroundColor: '#BFB3F3', 
          marginTop: '0',
          marginBottom: '60px' 
        }}></div>

        <h2 className="communities-section-title">
          Nuestras comunidades
        </h2>
      </div>

      {/* Grid Container with Pale Background */}
      <div className="communities-grid-wrapper">
        <div className="container communities-cards-grid">
          {/* Hub de Privacidad */}
          <div 
            className="premium-card community-card-item" 
            onClick={() => navigate('/hub')}
          >
            <div>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                backgroundColor: '#eee', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                overflow: 'hidden'
              }}>
                <img 
                  src={communityPrivacyImg} 
                  alt="Hub de Privacidad" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Hub de Privacidad
                </h3>
                <img src={logoHub} alt="Hub Logo" style={{ height: '40px', width: 'auto', flexShrink: 0 }} />
              </div>
              
              <p style={{ fontSize: '18px', color: '#374151', lineHeight: '26px', fontWeight: 400, margin: '0 0 24px' }}>
                Esta comunidad es un espacio de actualización donde la gestión de datos se debate con el rigor de los oficiales de privacidad con la claridad de abogados expertos en derechos digitales.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', color: '#0f766e', fontWeight: 700, fontSize: '16px' }}>
              <span>Conocer comunidad y explorar →</span>
            </div>
          </div>

          {/* Fintech School */}
          <div 
            className="premium-card community-card-item" 
            onClick={() => navigate('/fintech')}
          >
            <div>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                backgroundColor: '#eee', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                overflow: 'hidden'
              }}>
                <img 
                  src={communityFintechImg} 
                  alt="Fintech School" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Fintech School
                </h3>
                <img src={logoRcm} alt="RC&M Logo" style={{ height: '40px', width: 'auto', flexShrink: 0 }} />
              </div>

              <p style={{ fontSize: '18px', color: '#1F1F1F', lineHeight: '26px', fontWeight: 400, margin: '0 0 24px' }}>
                Transformamos la complejidad del mundo Fintech en una experiencia cercana y clara. Esta comunidad es un espacio de aprendizaje donde la regulación financiera se explica sin enredos, con el rigor de los expertos y la calidez de una conversación de amigos.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', color: '#0f766e', fontWeight: 700, fontSize: '16px' }}>
              <span>Conocer comunidad y explorar →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesGrid;
