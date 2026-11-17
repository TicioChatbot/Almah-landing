import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import logoHub from '../assets/logo-hub.png';
import logoRcm from '../assets/logo-rcm.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InstanceOption {
  id: 'hub' | 'fintech';
  name: string;
  domain: string;
  url: string;
  logo: string;
  tag: string;
  description: string;
  btnLabel: string;
}

const instances: InstanceOption[] = [
  {
    id: 'hub',
    name: 'Hub de Privacidad',
    domain: 'hubprivacidad.almah.ai',
    url: 'https://hubprivacidad.almah.ai',
    logo: logoHub,
    tag: 'Privacidad & Datos',
    description: 'Gestión de privacidad, gobernanza de datos y doctrina jurídica especializada.',
    btnLabel: 'Ingresar a Hub',
  },
  {
    id: 'fintech',
    name: 'Fintech School',
    domain: 'fintech.almah.ai',
    url: 'https://fintech.almah.ai',
    logo: logoRcm,
    tag: 'Fintech & Regulación',
    description: 'Regulación financiera, tecnología e innovación en banca, pagos y crédito digital.',
    btnLabel: 'Ingresar a Fintech',
  },
];

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="login-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        className="login-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="login-modal-close-btn"
          aria-label="Cerrar modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="12" x2="6" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="login-modal-header">
          <div className="login-modal-tag">
            <span className="login-modal-tag-dot"></span>
            Plataforma Almah
          </div>
          <h2 id="login-modal-title" className="login-modal-title">
            Iniciar sesión
          </h2>
          <p className="login-modal-subtitle">
            Selecciona la instancia a la que deseas acceder:
          </p>
        </div>

        {/* Instances Grid */}
        <div className="login-modal-grid">
          {instances.map((instance) => (
            <a
              key={instance.id}
              href={instance.url}
              className={`login-instance-card ${instance.id === 'hub' ? 'hub-card' : 'fintech-card'}`}
            >
              <div>
                <div className="login-instance-top">
                  <img 
                    src={instance.logo} 
                    alt={`Logo ${instance.name}`} 
                    className="login-instance-logo" 
                  />
                  <span className="login-instance-tag">
                    {instance.tag}
                  </span>
                </div>

                <h3 className="login-instance-name">
                  {instance.name}
                </h3>

                <div className="login-instance-domain-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>{instance.domain}</span>
                </div>

                <p className="login-instance-desc">
                  {instance.description}
                </p>
              </div>

              <div className="login-instance-btn">
                <span>{instance.btnLabel}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="login-modal-footer">
          <span>¿Aún no tienes una membresía activa? </span>
          <Link to="/precios" onClick={onClose}>
            Conoce nuestros planes
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
