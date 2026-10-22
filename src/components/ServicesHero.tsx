
const ServicesHero = () => {
  return (
    <section className="container" style={{ padding: 'clamp(100px, 12vw, 160px) 0 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: 'clamp(26px, 4vw, 44px)', 
          lineHeight: '1.25', 
          fontWeight: 700,
          color: '#1A1A1A'
        }}>
          <span style={{ color: 'var(--mint-green)' }}>En Almah</span>, te ofrecemos un conjunto de soluciones diseñadas para que tu trabajo sea más ágil, conectado y preciso. Aquí, <span style={{ color: 'var(--mint-green)' }}>la IA trabaja para ti</span>
        </h1>
      </div>
    </section>
  );
};

export default ServicesHero;
