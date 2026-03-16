
const Hero = () => {
  return (
    <section id="inicio" className="container">
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '4rem' }}>
        <h1 className="hero-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: 'var(--text-primary)' }}>
          Eleva tu conocimiento de la mano de los líderes de tu especialidad
        </h1>
        <p className="sub-text animate-fade-in delay-1" style={{ margin: '2rem auto', fontSize: '1.25rem', opacity: 0.8 }}>
          Una comunidad de abogados para abogados donde puedes compartir tu conocimiento y experiencias y aprender junto a colegas de tu área.
        </p>
        <div className="animate-fade-in delay-2" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem' }}>
          <button style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explorar Comunidades</button>
          <button style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--text-primary)' }}>Ver más</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
