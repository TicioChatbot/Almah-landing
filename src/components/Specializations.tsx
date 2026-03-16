
const Specializations = () => {
  const items = [
    "Derecho Civil",
    "Derecho Penal",
    "Derecho Laboral",
    "Derecho Comercial",
    "Derecho Tributario",
    "Derecho Administrativo"
  ];

  return (
    <section style={{ backgroundColor: 'var(--primary)', padding: '5rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Comunidades jurídicas especializadas
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {items.map((item, index) => (
            <div key={index} className="premium-card" style={{ 
              backgroundColor: 'white', 
              color: 'var(--text-primary)',
              textAlign: 'center',
              padding: '2.5rem'
            }}>
              <h3 style={{ fontSize: '1.5rem' }}>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;
