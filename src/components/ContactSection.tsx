
const ContactSection = () => {
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
              <div style={{ fontSize: '18px' }}>hola@almah.com</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--lilac)', marginBottom: '0.5rem' }}>Ubicación</div>
              <div style={{ fontSize: '18px' }}>Ciudad de México, México</div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="text" placeholder="Nombre completo" style={{ padding: '1rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '16px' }} />
            <input type="email" placeholder="Correo electrónico" style={{ padding: '1rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '16px' }} />
            <textarea placeholder="¿En qué podemos ayudarte?" rows={4} style={{ padding: '1rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '16px', resize: 'none' }}></textarea>
            <button type="submit" style={{ 
              backgroundColor: 'var(--button-indigo)', 
              color: 'var(--white)', 
              padding: '1rem', 
              borderRadius: '6px', 
              border: 'none', 
              fontSize: '18px', 
              fontWeight: 700,
              cursor: 'pointer'
            }}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
