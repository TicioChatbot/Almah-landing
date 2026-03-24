import communityPrivacyImg from '../assets/community-privacy-new.jpg';
import communityFintechImg from '../assets/community-fintech-new.jpg';
import logoHub from '../assets/logo-hub.png';
import logoRcm from '../assets/logo-rcm.png';

const CommunitiesGrid = () => {
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

        <h2 style={{ 
          fontSize: '56px', 
          textAlign: 'center', 
          marginBottom: '80px',
          color: '#8F7FEE',
          fontWeight: 700,
          lineHeight: '68px'
        }}>
          Nuestras comunidades
        </h2>
      </div>

      {/* Lavender Background Block */}
      <div style={{ 
        backgroundColor: '#BFB3F3', 
        padding: '60px 0 120px',
        position: 'relative'
      }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '3rem',
          marginTop: '-120px' // Overlap effect
        }}>
          {/* Hub de Privacidad */}
          <div className="premium-card" style={{ 
            padding: '2rem', 
            border: '4px solid rgba(26, 26, 26, 0.1)', 
            backgroundColor: 'var(--white)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Hub de Privacidad
              </h3>
              <img src={logoHub} alt="Hub Logo" style={{ height: '40px', width: 'auto' }} />
            </div>
            
            <p style={{ fontSize: '20px', color: '#374151', lineHeight: '24px', fontWeight: 400 }}>
              Esta comunidad es un espacio de actualización donde la gestión de datos se debate con el rigor de los oficiales de privacidad con la claridad de abogados expertos en derechos digitales.
            </p>
          </div>

          {/* Fintech School */}
          <div className="premium-card" style={{ 
            padding: '2rem', 
            border: '4px solid rgba(26, 26, 26, 0.1)', 
            backgroundColor: 'var(--white)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Fintech School
              </h3>
              <img src={logoRcm} alt="RC&M Logo" style={{ height: '40px', width: 'auto' }} />
            </div>

            <p style={{ fontSize: '20px', color: '#1F1F1F', lineHeight: '24px', fontWeight: 400 }}>
              Transformamos la complejidad del mundo Fintech en una experiencia cercana y clara. Esta comunidad es un espacio de aprendizaje donde la regulación financiera se explica sin enredos, con el rigor de los expertos y la calidez de una conversación de amigos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesGrid;
