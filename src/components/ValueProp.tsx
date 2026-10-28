
const ValueProp = () => {
  return (
    <section className="container value-prop-section">
      <div style={{ maxWidth: '600px', textAlign: 'left' }}>
        <h2 className="value-prop-title">
          Eleva tu conocimiento de la mano de los líderes de tu especialidad
        </h2>
        <p className="value-prop-description">
          Una comunidad de abogados para abogados donde puedes compartir tu conocimiento y experiencias y aprender junto a colegas de tu área.
        </p>
        <button 
          onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScwqKR1CqKrJdhyJDGw7Phs3oVQMHyz61BOI591WnNDGWguSw/viewform?usp=header'}
          className="value-prop-btn"
        >
          Únete a Almah
        </button>
      </div>
    </section>
  );
};

export default ValueProp;
