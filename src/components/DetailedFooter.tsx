

import logo from '../assets/logo-high.png';

const DetailedFooter = () => {
  return (
    <footer style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--white)', padding: '80px 0 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '4rem' }}>
          {/* Logo & Info */}
          <div>
            <img src={logo} alt="Almah Logo" style={{ height: '70px', width: 'auto', marginBottom: '1.5rem' }} />
            <p style={{ color: '#A0A0A0', lineHeight: '1.6', fontSize: '16px' }}>
              Redefiniendo la experiencia jurídica mediante networking, formación e inteligencia artificial avanzada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem' }}>Plataforma</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '16px', color: '#A0A0A0' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
              <a href="#servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
              <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>Sobre nosotros</a>
              <a href="#blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '16px', color: '#A0A0A0' }}>
              <span>Almah@redek.co</span>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
            </div>
          </div>

          {/* Newsletter / Legal Links */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem' }}>Legales</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '14px', color: '#666' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Términos y condiciones</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de privacidad</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de cookies</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#666' }}>
          <p>© {new Date().getFullYear()} ALMAH. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DetailedFooter;
