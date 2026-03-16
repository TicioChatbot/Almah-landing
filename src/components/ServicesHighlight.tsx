import servicesPreviewImg from '../assets/services-preview.png';

const ServicesHighlight = () => {
  const services = [
    { title: "Comunidades jurídicas especializadas" },
    { title: "Explorador y vista de documentos" },
    { title: "Chatbot con citas y referencia directa" },
    { title: "Herramientas legales enfocadas por nicho" }
  ];

  return (
    <section style={{ backgroundColor: '#BFB3F3', padding: '60px 0 100px' }}>
      <div className="container">
        {/* Service Titles Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1rem', 
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          {services.map((service, i) => (
            <div key={i} style={{ padding: '0 10px' }}>
              <h4 style={{ 
                fontSize: '18px', 
                lineHeight: '22px', 
                color: 'var(--white)',
                fontWeight: 700,
                textAlign: 'center',
                margin: 0
              }}>
                {service.title}
              </h4>
            </div>
          ))}
        </div>
        
        {/* Main UI Placeholder Box */}
        <div style={{ 
          width: '100%', 
          backgroundColor: '#D9D9F2', 
          border: '12px solid rgba(255, 255, 255, 0.3)', 
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={servicesPreviewImg} 
            alt="Interfaz de servicios" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
