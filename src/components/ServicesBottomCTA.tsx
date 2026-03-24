import { useState, useEffect } from 'react';
import image1 from '../assets/service-1.jpg';
import image2 from '../assets/service-2.jpg';
import image3 from '../assets/service-3.jpg';

const ServicesBottomCTA = () => {
  const images = [image1, image2, image3];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev: number) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section style={{ backgroundColor: '#BFB3F3', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: 'var(--white)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Lleva tu carrera al siguiente nivel rodeado de <br /> quienes entienden tu mundo.
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '3rem', opacity: 0.9 }}>
            En Almah te ofrecemos una red de apoyo y herramientas para que <br /> tú y tu equipo se conviertan en aliados estratégicos.
          </p>
          <button className="btn-secondary" style={{ 
            padding: '1rem 3rem',
            fontSize: '20px',
            width: 'auto'
          }}>
            Únete a Almah
          </button>
        </div>

        {/* Carousel replaces Video Placeholder */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          position: 'relative',
          aspectRatio: '16/7', 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '12px solid rgba(255, 255, 255, 0.3)'
        }}>
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Comunidad Almah ${idx + 1}`} 
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
      </div>
    </section>
  );
};

export default ServicesBottomCTA;
