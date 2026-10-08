import React, { useState } from 'react';
import logoRcm from '../assets/logo-rcm.png';
import logoHub from '../assets/logo-hub.png';

interface InstanceOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  logo: string;
  redirectUrl: string;
}

interface HubPlanOption {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceNum: number;
  annualPriceNum: number;
  monthlyPrice: string;
  annualPrice: string;
  popular?: boolean;
  features: string[];
}

const instances: InstanceOption[] = [
  {
    id: 'hub-privacidad',
    name: 'Hub de Privacidad',
    badge: 'Recomendado',
    description: 'Gestión de datos personales, gobernanza y normativas de privacidad.',
    logo: logoHub,
    redirectUrl: 'https://hubprivacidad.almah.ai'
  },
  {
    id: 'fintech-school',
    name: 'Fintech School',
    badge: 'Comunidad Activa',
    description: 'Regulación financiera, sandbox, open finance y banca digital.',
    logo: logoRcm,
    redirectUrl: 'https://fintech.almah.ai'
  }
];

const hubPlans: HubPlanOption[] = [
  {
    id: 'start',
    name: 'START',
    tagline: 'Ideal para estudiantes y profesionales iniciando en privacidad',
    monthlyPriceNum: 90000,
    annualPriceNum: 900000,
    monthlyPrice: '$90.000 COP',
    annualPrice: '$900.000 COP',
    features: [
      '1 usuario incluido',
      'Acceso al gestor conversacional con IA',
      'Repositorio normativo y doctrina',
      'Búsqueda avanzada por autoridad y sanción'
    ]
  },
  {
    id: 'pro',
    name: 'PRO',
    tagline: 'Para DPO y consultores independientes',
    monthlyPriceNum: 310000,
    annualPriceNum: 3100000,
    monthlyPrice: '$310.000 COP',
    annualPrice: '$3.100.000 COP',
    popular: true,
    features: [
      '1 usuario incluido',
      'Comunidad privada de DPO y consultores',
      'Webinars exclusivos (4 al año)',
      'Eventos y credencial oficial'
    ]
  },
  {
    id: 'team',
    name: 'TEAM',
    tagline: 'Para consultoras pequeñas y firmas de abogados',
    monthlyPriceNum: 650000,
    annualPriceNum: 6500000,
    monthlyPrice: '$650.000 COP',
    annualPrice: '$6.500.000 COP',
    features: [
      '3 usuarios incluidos',
      'Acceso completo a herramientas colaborativas',
      'Capacitaciones y webinars incluidos',
      'Soporte especializado para el equipo'
    ]
  },
  {
    id: 'strategic',
    name: 'STRATEGIC',
    tagline: 'Solución corporativa y acompañamiento estratégico a medida',
    monthlyPriceNum: 2500000,
    annualPriceNum: 25000000,
    monthlyPrice: '$2.500.000 COP',
    annualPrice: '$25.000.000 COP',
    features: [
      'Usuarios ilimitados / equipo corporativo',
      'Consultas IA asistidas y trazables ilimitadas',
      'Sesiones 1:1 mensuales de acompañamiento',
      'Soporte prioritario 24/7 y formación ejecutiva'
    ]
  }
];

const PricingPage = () => {
  // Step 1: Solo logos (selección de instancia)
  // Step 2: Precios para Hub (planes de lanzamiento mensual / anual)
  // Step 3: Pago (datos de tarjeta / método)
  // Step 4: Procesando / Pago completado (Cargando -> Pago exitoso con botón Ingresar)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Instancia seleccionada
  const [selectedInstance, setSelectedInstance] = useState<InstanceOption>(instances[0]);

  // Selección de plan y ciclo de facturación
  const [selectedPlan, setSelectedPlan] = useState<HubPlanOption>(hubPlans[1]); // PRO por defecto
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Datos de usuario y pago
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse' | 'nequi'>('card');

  // Estado interno de carga durante el paso 4
  const [isProcessing, setIsProcessing] = useState(false);

  const activePrice = billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const cycleLabel = billingCycle === 'annual' ? 'Anual' : 'Mensual';

  const handleSelectInstance = (inst: InstanceOption) => {
    setSelectedInstance(inst);
    setCurrentStep(2);
  };

  const handleProceedToPayment = () => {
    setCurrentStep(3);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const handleRedirect = () => {
    window.location.href = selectedInstance.redirectUrl;
  };

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '130px',
      paddingBottom: '100px',
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: '#f8fafc',
      color: '#0f172a'
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>

        {/* Stepper / Indicador de Pasos */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {[
            { num: 1, label: '1. Instancia' },
            { num: 2, label: '2. Precios' },
            { num: 3, label: '3. Pago' },
            { num: 4, label: '4. Pago Completado' }
          ].map((s, idx) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div style={{
                    width: '36px',
                    height: '2px',
                    backgroundColor: currentStep >= s.num ? '#00DC94' : '#e2e8f0',
                    transition: 'all 0.3s'
                  }} />
                )}
                <div
                  onClick={() => {
                    if (s.num < currentStep && !isProcessing) {
                      setCurrentStep(s.num as 1 | 2 | 3);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: s.num < currentStep && !isProcessing ? 'pointer' : 'default',
                    opacity: currentStep >= s.num ? 1 : 0.45
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    backgroundColor: isCompleted ? '#00DC94' : isActive ? '#0f172a' : '#e2e8f0',
                    color: isCompleted ? '#042f2e' : isActive ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s'
                  }}>
                    {isCompleted ? '✓' : s.num}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0f172a' : '#64748b'
                  }}>
                    {s.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* ===================== PANTALLA 1: SOLO LOGOS ===================== */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '36px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px', color: '#0f172a', letterSpacing: '-0.02em' }}>
                Selecciona la comunidad
              </h1>
              <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                Elige la instancia a la que deseas acceder.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))',
              gap: '28px',
              justifyContent: 'center',
              width: '100%'
            }}>
              {instances.map((inst) => {
                const isSelected = selectedInstance.id === inst.id;
                return (
                  <div
                    key={inst.id}
                    onClick={() => handleSelectInstance(inst)}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '20px',
                      padding: '48px 32px',
                      border: isSelected ? '3px solid #00DC94' : '2px solid #e2e8f0',
                      boxShadow: isSelected
                        ? '0 16px 36px rgba(0, 220, 148, 0.16)'
                        : '0 6px 18px rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '260px',
                      transition: 'all 0.25s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      if (!isSelected) e.currentTarget.style.borderColor = '#94a3b8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {inst.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: '#ccfbf1',
                        color: '#0f766e',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {inst.badge}
                      </div>
                    )}

                    <div style={{
                      height: '110px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      marginBottom: '20px'
                    }}>
                      <img
                        src={inst.logo}
                        alt={inst.name}
                        style={{ maxHeight: '85px', maxWidth: '85%', objectFit: 'contain' }}
                      />
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#0f172a', textAlign: 'center' }}>
                      {inst.name}
                    </h3>

                    <button
                      style={{
                        marginTop: '20px',
                        backgroundColor: '#00DC94',
                        color: '#042f2e',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 24px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Seleccionar →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== PANTALLA 2: PRECIOS HUB PRIVACIDAD (LANZAMIENTO) ===================== */}
        {currentStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#ccfbf1',
                borderRadius: '20px',
                color: '#0f766e',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Precios de Lanzamiento • {selectedInstance.name}
              </div>
              <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 12px', color: '#0f172a', letterSpacing: '-0.02em' }}>
                Selecciona tu plan
              </h1>
              <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 24px' }}>
                Tarifas especiales de lanzamiento con acceso completo a la plataforma.
              </p>

              {/* Selector Mensual / Anual */}
              <div style={{
                display: 'inline-flex',
                backgroundColor: '#e2e8f0',
                padding: '4px',
                borderRadius: '12px',
                gap: '4px'
              }}>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: billingCycle === 'monthly' ? '#ffffff' : 'transparent',
                    color: billingCycle === 'monthly' ? '#0f172a' : '#64748b',
                    boxShadow: billingCycle === 'monthly' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Mensual
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: billingCycle === 'annual' ? '#ffffff' : 'transparent',
                    color: billingCycle === 'annual' ? '#0f172a' : '#64748b',
                    boxShadow: billingCycle === 'annual' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Anual</span>
                  <span style={{
                    backgroundColor: '#00DC94',
                    color: '#042f2e',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '6px'
                  }}>
                    Ahorro
                  </span>
                </button>
              </div>
            </div>

            {/* Grid de 4 Planes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '36px'
            }}>
              {hubPlans.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                const period = billingCycle === 'annual' ? '/ año' : '/ mes';

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '28px 22px',
                      border: isSelected ? '3px solid #00DC94' : '2px solid #e2e8f0',
                      boxShadow: isSelected
                        ? '0 12px 30px rgba(0, 220, 148, 0.18)'
                        : '0 4px 12px rgba(0, 0, 0, 0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    {plan.popular && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#0f172a',
                        color: '#00DC94',
                        padding: '3px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        Más Elegido
                      </div>
                    )}

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          {plan.name}
                        </h3>
                        <span style={{
                          fontSize: '11px',
                          color: '#0f766e',
                          backgroundColor: '#ccfbf1',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontWeight: 700
                        }}>
                          Lanzamiento
                        </span>
                      </div>

                      <p style={{ fontSize: '13px', color: '#64748b', minHeight: '38px', margin: '0 0 18px', lineHeight: 1.4 }}>
                        {plan.tagline}
                      </p>

                      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>
                          {price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                          Facturación {period}
                        </div>
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {plan.features.map((feat, i) => (
                          <li key={i} style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: '#00DC94', fontWeight: 800, fontSize: '14px' }}>✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlan(plan);
                        handleProceedToPayment();
                      }}
                      style={{
                        marginTop: '24px',
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: isSelected ? '#00DC94' : '#f1f5f9',
                        color: isSelected ? '#042f2e' : '#334155',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isSelected ? 'Continuar con este plan →' : 'Elegir plan'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ← Cambiar instancia
              </button>

              <button
                type="button"
                onClick={handleProceedToPayment}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#00DC94',
                  color: '#042f2e',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 220, 148, 0.3)'
                }}
              >
                Continuar al pago ({selectedPlan.name} • {activePrice}) →
              </button>
            </div>
          </div>
        )}

        {/* ===================== PANTALLA 3: PAGO ===================== */}
        {currentStep === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                Paso 3: Pago
              </h1>
              <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
                Completa tus datos para confirmar tu suscripción.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.4fr)',
              gap: '28px',
              alignItems: 'start'
            }}>
              {/* Resumen de Compra */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Resumen de la suscripción
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={selectedInstance.logo} alt={selectedInstance.name} style={{ height: '42px', objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{selectedInstance.name}</div>
                    <div style={{ fontSize: '13px', color: '#0f766e', fontWeight: 600 }}>Plan {selectedPlan.name} (Lanzamiento)</div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                    <span>Usuario / Correo:</span>
                    <strong style={{ color: '#0f172a' }}>{email}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                    <span>Ciclo de facturación:</span>
                    <strong style={{ color: '#0f172a' }}>{cycleLabel}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                    <span>Subtotal:</span>
                    <strong style={{ color: '#0f172a' }}>{activePrice}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>Total a pagar</span>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>{activePrice}</span>
                </div>
              </div>

              {/* Formulario de Pago */}
              <form
                onSubmit={handlePay}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                    Método de pago
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'card', name: 'Tarjeta' },
                      { id: 'pse', name: 'PSE' },
                      { id: 'nequi', name: 'Nequi' }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as 'card' | 'pse' | 'nequi')}
                        style={{
                          padding: '12px',
                          borderRadius: '10px',
                          border: paymentMethod === m.id ? '2px solid #00DC94' : '1px solid #cbd5e1',
                          backgroundColor: paymentMethod === m.id ? '#f0fdf4' : '#ffffff',
                          fontWeight: paymentMethod === m.id ? 700 : 500,
                          fontSize: '14px',
                          cursor: 'pointer',
                          color: '#0f172a'
                        }}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      required
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      placeholder="MM/AA"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Como aparece en la tarjeta"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      flex: '1',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    ← Volver a planes
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: '2',
                      padding: '14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#00DC94',
                      color: '#042f2e',
                      fontWeight: 700,
                      fontSize: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    Pagar {activePrice}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== PANTALLA 4: PAGO COMPLETADO ===================== */}
        {currentStep === 4 && (
          <div>
            {isProcessing ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '90px 20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '5px solid #ccfbf1',
                  borderTopColor: '#00DC94',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '28px'
                }} />
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 10px', color: '#0f172a' }}>
                  Cargando...
                </h2>
              </div>
            ) : (
              <div style={{
                maxWidth: '560px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '44px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#16a34a',
                  fontSize: '36px',
                  fontWeight: 800
                }}>
                  ✓
                </div>

                <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                  ¡Pago Completado!
                </h2>
                <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 28px' }}>
                  Tu suscripción al <strong>Plan {selectedPlan.name}</strong> en <strong>{selectedInstance.name}</strong> ha sido activada con éxito para la cuenta <strong>{email}</strong>.
                </p>

                <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Instancia:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedInstance.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Plan:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedPlan.name} ({cycleLabel})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Usuario / Correo:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Monto pagado:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{activePrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleRedirect}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#00DC94',
                    color: '#042f2e',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(0, 220, 148, 0.4)'
                  }}
                >
                  Ingresar
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default PricingPage;
