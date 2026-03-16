
const ValueProp = () => {
  return (
    <section className="container" style={{ padding: '100px 0 120px' }}>
      <div style={{ maxWidth: '600px', textAlign: 'left' }}>
        <h2 style={{ 
          fontSize: '44px', 
          lineHeight: '53px', 
          color: '#030303', 
          fontWeight: 700,
          marginBottom: '1.5rem' 
        }}>
          Eleva tu conocimiento de la mano de los líderes de tu especialidad
        </h2>
        <p style={{ 
          fontSize: '20px', 
          lineHeight: '24px', 
          color: '#1C1C1E', 
          marginBottom: '3rem',
          fontWeight: 400
        }}>
          Una comunidad de abogados para abogados donde puedes compartir tu conocimiento y experiencias y aprender junto a colegas de tu área.
        </p>
        <button style={{ 
          backgroundColor: '#65628C', 
          color: 'var(--white)',
          padding: '0.75rem 2.5rem',
          fontSize: '24px',
          fontWeight: 700,
          borderRadius: '100px', // Pill shape from screenshot
          border: 'none',
          cursor: 'pointer'
        }}>
          Únete a Almah
        </button>
      </div>
    </section>
  );
};

export default ValueProp;
