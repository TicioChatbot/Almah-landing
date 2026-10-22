import { useState, useEffect } from 'react';
import image1 from '../assets/service-1.jpg';
import image2 from '../assets/service-2.jpg';
import image3 from '../assets/service-3.jpg';

const ContactFormSection = () => {
  const images = [image1, image2, image3];
  const [currentIdx, setCurrentIdx] = useState(0);
  const googleFormUrl = "https://forms.gle/EgnBCy7TNZ3rSksdA";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev: number) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);


  return (
    <section className="contact-form-section">
      <div className="container contact-form-container">
        {/* Contact CTA Info */}
        <div style={{ flex: 1, paddingTop: '1rem' }}>
          <h2 className="contact-form-title">
            ¿Listo para llevar tu comunidad al <span style={{ color: 'var(--lilac)' }}>siguiente nivel?</span>
          </h2>
          <p className="contact-form-desc">
            Haz clic en el botón de abajo para completar nuestro formulario de contacto en Google Forms y nos comunicaremos contigo lo antes posible.
          </p>
          
          <button 
            onClick={() => window.open(googleFormUrl, '_blank')}
            className="btn-primary" 
            style={{ 
              padding: '1.25rem 2rem', 
              fontSize: '18px', 
              width: '100%',
              textAlign: 'center'
            }}
          >
            Ir al formulario de contacto
          </button>

          <div className="contact-form-info-row">
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--lilac)', marginBottom: '0.5rem' }}>Email</div>
              <div style={{ fontSize: '16px' }}>Almah@redek.co</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--lilac)', marginBottom: '0.5rem' }}>Ubicación</div>
              <div style={{ fontSize: '16px' }}>Bogotá, Colombia</div>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="contact-form-carousel-col">
          <div style={{ 
            width: '100%', 
            aspectRatio: '1/1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Equipo Almah ${idx + 1}`} 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  opacity: currentIdx === idx ? 1 : 0,
                  transition: 'opacity 1s ease-in-out'
                }}
              />
            ))}
          </div>
          <p style={{ 
            marginTop: '1.5rem', 
            textAlign: 'center', 
            fontSize: '18px', 
            fontWeight: 500, 
            color: 'var(--text-muted)' 
          }}>
            Únete a una comunidad de abogados felices
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
