import logo from '../assets/logo-high.png';

const DetailedFooter = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
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
              <a href="#/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
              <a href="#/servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
              <a href="#/hub" style={{ color: 'inherit', textDecoration: 'none' }}>Hub de Privacidad</a>
              <a href="#/fintech" style={{ color: 'inherit', textDecoration: 'none' }}>Fintech School</a>
              <a href="#/cursos" style={{ color: 'inherit', textDecoration: 'none' }}>Cursos</a>
              <a href="#/sobre-nosotros" style={{ color: 'inherit', textDecoration: 'none' }}>Sobre nosotros</a>
              <a href="#/precios" style={{ color: 'inherit', textDecoration: 'none' }}>Precios</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '16px', color: '#A0A0A0' }}>
              <span>Almah@redek.co</span>
              <a href="https://www.linkedin.com/company/almahcol/?viewAsMember=true" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              <a href="https://www.instagram.com/almah_col/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
            </div>
          </div>

          {/* Newsletter / Legal Links */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem' }}>Legales</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '14px', color: '#666' }}>
              <a href="/legal/terminos-y-condiciones.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Términos y condiciones</a>
              <a href="/legal/politica-de-privacidad.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Política de privacidad</a>
              <a href="/legal/politica-de-privacidad.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Política de cookies</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} ALMAH. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DetailedFooter;
