
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-high.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001 }}>
          <img src={logo} alt="Almah Logo" className="navbar-logo-img" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="navbar-links-desktop">
          <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none' }}>Home</Link>
          <Link to="/servicios" style={{ color: 'var(--white)', textDecoration: 'none' }}>Servicios</Link>
          <Link to="/cursos" style={{ color: 'var(--white)', textDecoration: 'none' }}>Cursos</Link>
          <Link to="/sobre-nosotros" style={{ color: 'var(--white)', textDecoration: 'none' }}>Sobre nosotros</Link>
          <Link to="/precios" style={{ color: 'var(--white)', textDecoration: 'none' }}>Precios</Link>
          <Link to="/contacto" style={{ color: 'var(--white)', textDecoration: 'none' }}>Contacto</Link>
        </nav>

        {/* Auth Actions Desktop */}
        <div className="navbar-actions-desktop">
          <a href="https://fintech.almah.ai" style={{ color: 'var(--white)', fontWeight: 700, textDecoration: 'none', fontSize: 'var(--font-size-nav)' }}>Iniciar sesión</a>
          
          <button 
            onClick={() => window.location.href = 'https://forms.gle/EgnBCy7TNZ3rSksdA'}
            style={{ 
              backgroundColor: 'var(--white)', 
              color: 'var(--text-black)',
              padding: '0.65rem 1.8rem',
              fontSize: 'var(--font-size-nav)',
              borderRadius: '100px',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Registrarse
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="navbar-hamburger-btn"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="navbar-mobile-drawer animate-fade-in">
          <nav className="navbar-mobile-links">
            <Link to="/" onClick={closeMenu} className="navbar-mobile-link">Home</Link>
            <Link to="/servicios" onClick={closeMenu} className="navbar-mobile-link">Servicios</Link>
            <Link to="/cursos" onClick={closeMenu} className="navbar-mobile-link">Cursos</Link>
            <Link to="/sobre-nosotros" onClick={closeMenu} className="navbar-mobile-link">Sobre nosotros</Link>
            <Link to="/precios" onClick={closeMenu} className="navbar-mobile-link">Precios</Link>
            <Link to="/contacto" onClick={closeMenu} className="navbar-mobile-link">Contacto</Link>
          </nav>
          
          <div className="navbar-mobile-cta">
            <a 
              href="https://fintech.almah.ai" 
              onClick={closeMenu}
              className="navbar-mobile-login"
            >
              Iniciar sesión
            </a>
            <button 
              onClick={() => {
                closeMenu();
                window.location.href = 'https://forms.gle/EgnBCy7TNZ3rSksdA';
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem 1.5rem',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '100px',
                textAlign: 'center'
              }}
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
