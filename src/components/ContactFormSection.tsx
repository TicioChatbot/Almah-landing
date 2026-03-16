
const ContactFormSection = () => {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container" style={{ display: 'flex', gap: '4rem' }}>
        {/* Contact Form */}
        <div style={{ flex: 1 }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '18px', fontWeight: 700 }}>Nombre</label>
              <input 
                type="text" 
                placeholder="Full name" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid #D1D5DB',
                  fontSize: '16px' 
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '18px', fontWeight: 700 }}>Email</label>
              <input 
                type="email" 
                placeholder="firstnamelastname@gmail.com" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid #D1D5DB',
                  fontSize: '16px' 
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '18px', fontWeight: 700 }}>Teléfono</label>
              <input 
                type="text" 
                placeholder="Tell me more about you" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid #D1D5DB',
                  fontSize: '16px' 
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '18px', fontWeight: 700 }}>Mensaje</label>
              <textarea 
                placeholder="Write your message here" 
                rows={4}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid #D1D5DB',
                  fontSize: '16px',
                  resize: 'none'
                }} 
              />
            </div>

            <button style={{ 
              backgroundColor: '#BFB3F3', 
              color: 'var(--white)', 
              padding: '1rem', 
              borderRadius: '100px', 
              border: 'none', 
              fontSize: '18px', 
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* Video Placeholder */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            minHeight: '500px',
            backgroundColor: '#E5E7EB',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            color: '#374151',
            fontSize: '1.25rem'
          }}>
            Video equipo almah / abogados <br /> comunidad felices
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
