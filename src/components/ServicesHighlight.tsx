import heroVideo from '../assets/hero-video.mp4';

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
        
        {/* Main Banner Video */}
        <div style={{ 
          width: '100%', 
          backgroundColor: '#000', 
          border: '12px solid rgba(255, 255, 255, 0.3)', 
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
