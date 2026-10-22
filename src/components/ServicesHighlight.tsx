import heroVideo from '../assets/hero-video.mp4';

const ServicesHighlight = () => {
  const services = [
    { title: "Comunidades jurídicas especializadas" },
    { title: "Explorador y vista de documentos" },
    { title: "Chatbot con citas y referencia directa" },
    { title: "Herramientas legales enfocadas por nicho" }
  ];

  return (
    <section className="services-highlight-section">
      <div className="container">
        {/* Service Titles Bar */}
        <div className="services-highlight-grid">
          {services.map((service, i) => (
            <div key={i} style={{ padding: '0 10px' }}>
              <h4 className="services-highlight-item-title">
                {service.title}
              </h4>
            </div>
          ))}
        </div>
        
        {/* Main Banner Video */}
        <div className="services-highlight-video-wrapper">
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
