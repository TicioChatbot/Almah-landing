
const TeamSection = () => {
  const team = [
    { name: "Jacobo Gomez", role: "Director de tecnología e innovación" },
    { name: "Nicolás Lozada", role: "CEO" },
    { name: "Juan Camilo Girón", role: "Coordinador jurídico" },
    { name: "Shirlei Plaza", role: "CAO" }
  ];

  return (
    <section style={{ backgroundColor: 'var(--off-white)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '44px', color: 'var(--mint-green)', marginBottom: '1rem' }}>Equipo Almah</h2>
          <h3 style={{ fontSize: '52px', lineHeight: '1.1', color: 'var(--text-primary)' }}>Conoce al equipo detrás de Almah</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {team.map((member, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                backgroundColor: '#ddd', 
                borderRadius: '8px', 
                marginBottom: '1.5rem' 
              }}></div>
              <h4 style={{ fontSize: '24px', marginBottom: '0.5rem' }}>{member.name}</h4>
              <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>{member.role}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center', backgroundColor: 'var(--lavender)', padding: '4rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '44px', color: 'var(--white)', marginBottom: '2rem' }}>
            Lleva tu carrera al siguiente nivel rodeado de quienes entienden tu mundo.
          </h2>
          <button style={{ 
            backgroundColor: 'var(--white)', 
            color: 'var(--button-indigo)',
            padding: '1rem 2.5rem',
            fontSize: '24px',
            borderRadius: '8px',
            fontWeight: 700
          }}>
            Únete a Almah
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
