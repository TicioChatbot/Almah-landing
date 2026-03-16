
const ContactHelpSection = () => {
  return (
    <section style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 700, 
          color: '#65628C', 
          marginBottom: '3rem' 
        }}>
          ¿Tienes dudas?
        </h2>

        <div style={{ 
          backgroundColor: '#65628C', 
          padding: '60px', 
          borderRadius: '12px', 
          color: 'var(--white)',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '2rem' }}>Llámanos</h3>
            <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
              +123 456 789 101 <br />
              +235 456 789 101
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '2rem' }}>Escribenos</h3>
            <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
              info@company.com <br />
              hello@company.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHelpSection;
