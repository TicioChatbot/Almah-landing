
const AboutBottomCTA = () => {
  return (
    <section style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '44px', 
          fontWeight: 700, 
          color: '#1A1A1A', 
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Impulsa tu carrera con profesionales que te entienden
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#4B5563', 
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Conecta, comparte y aprende con profesionales de tu misma especialidad
        </p>
        <button style={{ 
          backgroundColor: '#65628C', 
          color: 'var(--white)',
          padding: '0.75rem 3rem',
          fontSize: '20px',
          fontWeight: 700,
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Únete a Almah
        </button>
      </div>
    </section>
  );
};

export default AboutBottomCTA;
