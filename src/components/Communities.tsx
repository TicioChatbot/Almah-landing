
const Communities = () => {
  const communities = [
    { title: "Comunidad de Litigantes", description: "Espacio para compartir estrategias y experiencias en juicios." },
    { title: "Derecho y Tecnología", description: "Análisis de las nuevas tendencias legales en el mundo digital." },
    { title: "Propiedad Intelectual", description: "Protección de creaciones y marcas en el mercado actual." }
  ];

  return (
    <section id="comunidades" className="container">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        Nuestras comunidades
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
        Únete a grupos de discusión enfocados en áreas específicas del derecho y colabora con expertos.
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {communities.map((comm, index) => (
          <div key={index} className="premium-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>{comm.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{comm.description}</p>
            <button style={{ marginTop: '1.5rem', backgroundColor: 'transparent', color: 'var(--secondary)', border: '1px solid var(--secondary)', width: '100%' }}>
              Saber más
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Communities;
