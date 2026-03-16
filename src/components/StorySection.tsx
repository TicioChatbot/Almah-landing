
const StorySection = () => {
  return (
    <section id="about" style={{ backgroundColor: 'var(--white)', padding: 'var(--section-padding)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '44px', color: 'var(--lavender)', marginBottom: '2rem' }}>Nuestra historia</h2>
          <p style={{ fontSize: '24px', lineHeight: '1.4', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Somos mentes creativas y manos apasionadas unidas por un mismo propósito: <span style={{ color: 'var(--button-indigo)' }}>dar vida a comunidades con almah</span>.
          </p>
          <div style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>
              Founded by a group of passionate entrepreneurs, our company has grown from a small startup into a leading provider of innovative solutions for businesses across a wide range of industries.
            </p>
            <p>
              En Almah, te ofrecemos un espacio creado para intercambiar experiencias y aprender de colegas que enfrentan tus mismos retos diarios.
            </p>
          </div>
        </div>
        <div style={{ 
          width: '100%', 
          aspectRatio: '4/3', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ccc',
          fontSize: '18px'
        }}>
          Story Image Placeholder
        </div>
      </div>
    </section>
  );
};

export default StorySection;
