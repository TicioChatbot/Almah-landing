
const ServicesBottomCTA = () => {
  return (
    <section style={{ backgroundColor: '#BFB3F3', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: 'var(--white)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Lleva tu carrera al siguiente nivel rodeado de <br /> quienes entienden tu mundo.
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '3rem', opacity: 0.9 }}>
            En Almah te ofrecemos una red de apoyo y herramientas para que <br /> tú y tu equipo se conviertan en aliados estratégicos.
          </p>
          <button style={{ 
            backgroundColor: 'var(--white)', 
            color: '#65628C', 
            padding: '1rem 3rem',
            fontSize: '20px',
            fontWeight: 700,
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Únete a Almah
          </button>
        </div>

        {/* Video Placeholder */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          backgroundColor: '#E5E7EB', 
          aspectRatio: '16/7', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#374151',
          fontSize: '24px',
          textAlign: 'center',
          padding: '2rem'
        }}>
          Video de una comunidad interactuando.
        </div>
      </div>
    </section>
  );
};

export default ServicesBottomCTA;
