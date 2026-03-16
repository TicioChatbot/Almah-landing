
const AICta = () => {
  return (
    <section style={{ backgroundColor: 'var(--white)', padding: '120px 0 80px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '36px', 
          color: 'var(--mint-green)', 
          fontWeight: 700, 
          lineHeight: '44px',
          marginBottom: '2rem'
        }}>
          Aquí encontrarás análisis y consejos prácticos sobre el lado humano de la inteligencia artificial aplicada al derecho.
        </h2>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#1A1A1A', 
          fontWeight: 400, 
          lineHeight: '22px',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          opacity: 0.8
        }}>
          Nuestro blog es una brújula diseñada para abogados que, como tú, le ponen el almah en su trabajo.
        </p>

        <button style={{ 
          backgroundColor: '#65628C',
          color: 'var(--white)',
          padding: '0.75rem 2.5rem',
          fontSize: '18px',
          fontWeight: 700,
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Explora el blog
        </button>
      </div>
    </section>
  );
};

export default AICta;
