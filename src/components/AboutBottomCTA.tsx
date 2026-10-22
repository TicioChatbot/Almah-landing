
const AboutBottomCTA = () => {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: 'clamp(28px, 4vw, 44px)', 
          fontWeight: 700, 
          color: '#1A1A1A', 
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Impulsa tu carrera con profesionales que te entienden
        </h2>
        <p style={{ 
          fontSize: 'clamp(16px, 2vw, 18px)', 
          color: '#4B5563', 
          marginBottom: '2.5rem',
          maxWidth: '800px',
          margin: '0 auto 2.5rem'
        }}>
          Conecta, comparte y aprende con profesionales de tu misma especialidad
        </p>
        <button 
          onClick={() => window.location.href = 'https://forms.gle/EgnBCy7TNZ3rSksdA'}
          style={{ 
            backgroundColor: '#65628C', 
            color: 'var(--white)',
            padding: '0.75rem 2.5rem',
            fontSize: '18px',
            fontWeight: 700,
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer',
            maxWidth: '100%'
          }}
        >
          Únete a Almah
        </button>
      </div>
    </section>
  );
};

export default AboutBottomCTA;
