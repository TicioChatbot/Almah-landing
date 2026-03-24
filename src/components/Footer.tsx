

import logo from '../assets/logo-high.png';

const Footer = () => {
  return (
    <footer id="contacto" style={{ backgroundColor: 'var(--text-primary)', color: 'white', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <div>
            <img src={logo} alt="Almah Logo" style={{ height: '60px', width: 'auto', marginBottom: '1.5rem' }} />
            <p style={{ opacity: 0.6 }}>La red profesional definitiva para abogados líderes en su especialidad.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Navegación</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
              <li><a href="#inicio" style={{ color: 'white', textDecoration: 'none' }}>Inicio</a></li>
              <li><a href="#comunidades" style={{ color: 'white', textDecoration: 'none' }}>Comunidades</a></li>
              <li><a href="#contacto" style={{ color: 'white', textDecoration: 'none' }}>Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Contacto</h4>
            <p style={{ opacity: 0.8 }}>Almah@redek.co</p>
            <p style={{ opacity: 0.8 }}>+57 300 000 0000</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Síguenos</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ opacity: 0.6 }}>LinkedIn</span>
              <span style={{ opacity: 0.6 }}>Instagram</span>
              <span style={{ opacity: 0.6 }}>Twitter</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center', opacity: 0.4 }}>
          <p>© 2026 Almah Legal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
