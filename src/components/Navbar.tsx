
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header style={{ 
      position: 'fixed', 
      top: '2.5rem', 
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      height: '80px',
      background: 'linear-gradient(90deg, #BFB3F3 0%, #00DC94 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      borderRadius: '12px',
      zIndex: 1000,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
    }}>
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Almah Logo" style={{ height: '56px', width: 'auto' }} />
        </Link>
        
        {/* Navigation Links */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2.5rem',
          fontSize: 'var(--font-size-nav)', 
          fontWeight: 600 
        }}>
          <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none' }}>Home</Link>
          <Link to="/servicios" style={{ color: 'var(--white)', textDecoration: 'none' }}>Servicios</Link>
          <Link to="/sobre-nosotros" style={{ color: 'var(--white)', textDecoration: 'none' }}>Sobre nosotros</Link>
          <Link to="/contacto" style={{ color: 'var(--white)', textDecoration: 'none' }}>Contacto</Link>
        </nav>

        {/* Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: 'var(--white)', fontWeight: 700, textDecoration: 'none', fontSize: 'var(--font-size-nav)' }}>Iniciar sesión</a>
          
          <button style={{ 
            backgroundColor: 'var(--white)', 
            color: 'var(--text-black)',
            padding: '0.65rem 1.8rem',
            fontSize: 'var(--font-size-nav)',
            borderRadius: '100px',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease'
          }}>
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
