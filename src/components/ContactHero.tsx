
const ContactHero = () => {
  return (
    <section className="container" style={{ padding: 'clamp(100px, 12vw, 160px) 0 40px', textAlign: 'center' }}>
      <h1 style={{ 
        fontSize: 'clamp(32px, 5vw, 56px)', 
        fontWeight: 700, 
        color: '#1A1A1A', 
        marginBottom: '1rem',
        lineHeight: 1.2
      }}>
        Únete a Almah
      </h1>
      <p style={{ 
        fontSize: 'clamp(17px, 2.5vw, 24px)', 
        color: 'var(--mint-green)', 
        maxWidth: '700px', 
        margin: '0 auto',
        lineHeight: '1.4'
      }}>
        Ponte en contacto con nosotros. Estamos listos para ayudarte a encontrar tu comunidad.
      </p>
    </section>
  );
};

export default ContactHero;
