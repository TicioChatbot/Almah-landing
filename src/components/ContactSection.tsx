const ContactSection = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuF29k2z6R2X-qU0YI6j-9-Xy-X-X-X-X/viewform"; // Placeholder


  return (
    <section id="contacto" style={{ backgroundColor: 'var(--off-white)', padding: 'var(--section-padding)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
        {/* Left Column */}
        <div>
          <h2 style={{ 
            fontSize: 'var(--font-size-heading-large)', 
            color: 'var(--text-primary)', 
            fontWeight: 700,
            marginBottom: '2rem' 
          }}>
            Contáctanos
          </h2>
          <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.5' }}>
            Estamos aquí para ayudarte. Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--lilac)', marginBottom: '0.5rem' }}>Email</div>
              <div style={{ fontSize: '18px' }}>Almah@redek.co</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--lilac)', marginBottom: '0.5rem' }}>Ubicación</div>
              <div style={{ fontSize: '18px' }}>Bogotá, Colombia</div>
            </div>
          </div>
        </div>

        {/* Right Column - CTA Button */}
        <div style={{ 
          backgroundColor: 'var(--white)', 
          padding: '4rem 3rem', 
          borderRadius: '12px', 
          border: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '1.5rem' }}>Hablemos de tu proyecto</h3>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Completa nuestro formulario rápido y nos pondremos en contacto contigo.
          </p>
          <button 
            onClick={() => window.open(googleFormUrl, '_blank')}
            className="btn-primary" 
            style={{ 
              padding: '1.25rem 3rem', 
              fontSize: '18px', 
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Ir al formulario
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
