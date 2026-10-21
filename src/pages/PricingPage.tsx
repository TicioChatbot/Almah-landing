import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoRcm from '../assets/logo-rcm.png';
import logoHub from '../assets/logo-hub.png';
import {
  signupUser,
  loginUser,
  fetchWompiMerchantAcceptance,
  tokenizeCardWithWompi,
  createWompiTrialSubscription,
  type WompiMerchantAcceptance,
} from '../services/paymentApi';

interface InstanceOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  logo: string;
  redirectUrl: string;
  backendUrl: string;
}

interface HubPlanOption {
  id: 'START' | 'PRO' | 'TEAM' | 'STRATEGIC';
  name: 'START' | 'PRO' | 'TEAM' | 'STRATEGIC';
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
    redirectUrl: import.meta.env.VITE_HUB_APP_URL || 'https://hubprivacidad.almah.ai',
    backendUrl: import.meta.env.VITE_HUB_BACKEND_URL || 'https://hubprivacidad-backend-production.up.railway.app',
  },
  {
    id: 'fintech-school',
    name: 'Fintech School',
    badge: 'Comunidad Activa',
    description: 'Regulación financiera, sandbox, open finance y banca digital.',
    logo: logoRcm,
    redirectUrl: import.meta.env.VITE_FINTECH_APP_URL || 'https://fintech.almah.ai',
    backendUrl: import.meta.env.VITE_FINTECH_BACKEND_URL || 'https://almah-fintech-staging.up.railway.app',
  },
];

const hubPlans: HubPlanOption[] = [
  {
    id: 'START',
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
      'Búsqueda avanzada por autoridad y sanción',
    ],
  },
  {
    id: 'PRO',
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
      'Eventos y credencial oficial',
    ],
  },
  {
    id: 'TEAM',
    name: 'TEAM',
    tagline: 'Para consultoras pequeñas y firmas de abogados',
    monthlyPriceNum: 650000,
    annualPriceNum: 6500000,
    monthlyPrice: '$650.000 COP',
    annualPrice: '$6.500.000 COP',
    features: [
      '3 usuarios incluidos (1 titular + 2 invitados)',
      'Acceso completo a herramientas colaborativas',
      'Capacitaciones y webinars incluidos',
      'Soporte especializado para el equipo',
    ],
  },
  {
    id: 'STRATEGIC',
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
      'Soporte prioritario 24/7 y formación ejecutiva',
    ],
  },
];

const presetAvatars = [
  'https://ui-avatars.com/api/?name=Legal+Pro&background=0f172a&color=fff',
  'https://ui-avatars.com/api/?name=Jurista&background=0f766e&color=fff',
  'https://ui-avatars.com/api/?name=Abogado&background=10b981&color=fff',
  'https://ui-avatars.com/api/?name=Consultor&background=4f46e5&color=fff',
];

const STORAGE_KEY = 'almah_checkout_session';

const PricingPage = () => {
  const navigate = useNavigate();

  // Paso 1: Instancia
  // Paso 2: Tipo de Licencia (Personal vs Corporativa)
  // Paso 3: Selección de Plan (Licencia para mí con 2 meses gratis)
  // Paso 4: Crear Cuenta + Inscripción de Tarjeta (Trial)
  // Paso 5: Éxito / Confirmación
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Instancia, Modalidad y Plan
  const [selectedInstance, setSelectedInstance] = useState<InstanceOption>(instances[0]);
  const [licenseType, setLicenseType] = useState<'PERSONAL' | 'CORPORATE'>('PERSONAL');
  const [selectedPlan, setSelectedPlan] = useState<HubPlanOption>(hubPlans[1]); // PRO
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Datos de Cuenta de Usuario
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl] = useState(presetAvatars[0]);
  const [pendingEmailVerification, setPendingEmailVerification] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ id?: string; email: string; full_name?: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Datos de Tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState(''); // MM/AA
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [installments, setInstallments] = useState(1);

  // Aceptación Wompi
  const [merchantAcceptance, setMerchantAcceptance] = useState<WompiMerchantAcceptance | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPersonalData, setAcceptedPersonalData] = useState(false);

  // Estados de proceso
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Inscribiendo tarjeta y activando tu suscripción...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ email: string; planName: string } | null>(null);

  const activePrice = billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const cycleLabel = billingCycle === 'annual' ? 'Anual' : 'Mensual';
  const subscriptionDuration: 'ANUAL' | 'MENSUAL' = billingCycle === 'annual' ? 'ANUAL' : 'MENSUAL';

  // Cargar sesión guardada si existe
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.instanceId) {
          const foundInst = instances.find((i) => i.id === parsed.instanceId);
          if (foundInst) setSelectedInstance(foundInst);
        }
        if (parsed.planId) {
          const foundPlan = hubPlans.find((p) => p.id === parsed.planId);
          if (foundPlan) setSelectedPlan(foundPlan);
        }
        if (parsed.billingCycle) setBillingCycle(parsed.billingCycle);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.username) setUsername(parsed.username);
      }
    } catch {
      // Ignorar
    }
  }, []);

  // Guardar progreso en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          instanceId: selectedInstance.id,
          planId: selectedPlan.id,
          billingCycle,
          email,
          fullName,
          username,
        })
      );
    } catch {
      // Ignorar
    }
  }, [selectedInstance, selectedPlan, billingCycle, email, fullName, username]);

  // Cargar tokens de Wompi al llegar al paso 4
  useEffect(() => {
    if (currentStep === 4) {
      fetchWompiMerchantAcceptance()
        .then((tokens) => setMerchantAcceptance(tokens))
        .catch((err) => {
          console.warn('Error cargando aceptación de Wompi:', err);
        });
    }
  }, [currentStep]);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 19);
    return digits.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleSelectInstance = (inst: InstanceOption) => {
    setSelectedInstance(inst);
    setCurrentStep(2);
  };

  const handleSelectLicenseType = (type: 'PERSONAL' | 'CORPORATE') => {
    setLicenseType(type);
    if (type === 'PERSONAL') {
      setCurrentStep(3);
    }
  };

  const handleSelectPlan = (plan: HubPlanOption) => {
    setSelectedPlan(plan);
    setCurrentStep(4);
  };

  const handleLoginExistingUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const loginRes = await loginUser(selectedInstance.backendUrl, email.trim(), password);
      setLoggedInUser({
        id: loginRes.user?.id,
        email: loginRes.email || email.trim(),
        full_name: loginRes.user?.full_name,
      });
      if (loginRes.user?.full_name && !cardHolder) {
        setCardHolder(loginRes.user.full_name);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión.';
      setErrorMessage(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Flujo principal: Tokenizar -> POST /wompi/subscriptions/trial -> POST /auth/signup_user (si es nuevo)
  const handleSubmitSubscriptionAndAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const userEmail = (loggedInUser?.email || email).trim();

    if (authMode === 'signup' && (!fullName.trim() || !username.trim())) {
      setErrorMessage('Por favor completa tu nombre y nombre de usuario.');
      return;
    }

    if (!userEmail) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (authMode === 'signup' && (!password || password.length < 8)) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    const cleanCardNumber = cardNumber.replace(/\s+/g, '');
    const [expMonthRaw, expYearRaw] = expDate.split('/');
    const expMonth = (expMonthRaw || '').trim().padStart(2, '0');
    const expYear = (expYearRaw || '').trim().slice(-2);

    if (!cleanCardNumber || !expMonth || !expYear || !cvv.trim() || !cardHolder.trim()) {
      setErrorMessage('Por favor completa todos los datos de tu tarjeta.');
      return;
    }

    if (!acceptedTerms || !acceptedPersonalData) {
      setErrorMessage('Debes aceptar los términos y condiciones y la autorización de datos personales.');
      return;
    }

    setIsProcessing(true);
    setProcessingMessage('Tokenizando tarjeta de crédito de forma segura con Wompi...');

    try {
      // 1. Obtener acceptance token si no estuviera cargado
      let acceptance = merchantAcceptance;
      if (!acceptance || !acceptance.acceptance_token) {
        acceptance = await fetchWompiMerchantAcceptance();
        setMerchantAcceptance(acceptance);
      }

      // 2. Tokenizar la tarjeta directamente con Wompi
      const cardToken = await tokenizeCardWithWompi({
        number: cleanCardNumber,
        cvc: cvv.trim(),
        exp_month: expMonth,
        exp_year: expYear,
        card_holder: cardHolder.trim(),
      });

      // 3. Inscribir la suscripción con 2 meses gratis (Trial)
      setProcessingMessage('Inscribiendo tarjeta e iniciando período de prueba (2 meses gratis)...');
      await createWompiTrialSubscription(selectedInstance.backendUrl, {
        subscription_type: selectedPlan.id,
        subscription_duration: subscriptionDuration,
        customer_email: userEmail,
        acceptance_token: acceptance.acceptance_token,
        accept_personal_auth: acceptance.accept_personal_auth,
        card_token: cardToken,
        token: cardToken,
        installments: Number(installments) || 1,
        trial_months: 2,
        payment_source: {
          type: 'CARD',
          token: cardToken,
          installments: Number(installments) || 1,
        },
      });

      // 4. SOLO tras respuesta exitosa de la suscripción, se crea el usuario si era nuevo
      if (authMode === 'signup') {
        setProcessingMessage('¡Suscripción confirmada! Creando tu cuenta de usuario...');
        const signupRes = await signupUser(selectedInstance.backendUrl, {
          email: userEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              username: username.trim(),
              avatar_url: avatarUrl,
            },
          },
        });

        if (!signupRes.access_token) {
          try {
            await loginUser(selectedInstance.backendUrl, userEmail, password);
          } catch {
            setPendingEmailVerification(true);
          }
        }
      }

      setSuccessInfo({
        email: userEmail,
        planName: selectedPlan.name,
      });
      setCurrentStep(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ocurrió un error al procesar la inscripción.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedirectToApp = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    window.location.href = selectedInstance.redirectUrl;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '100px',
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: '#f8fafc',
        color: '#0f172a',
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
        {/* Stepper Superior */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: 1, label: '1. Instancia' },
            { num: 2, label: '2. Modalidad' },
            { num: 3, label: '3. Plan y Precios' },
            { num: 4, label: '4. Cuenta y Tarjeta' },
            { num: 5, label: '5. Confirmación' },
          ].map((s, idx) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div
                    style={{
                      width: '24px',
                      height: '2px',
                      backgroundColor: currentStep >= s.num ? '#00DC94' : '#e2e8f0',
                      transition: 'all 0.3s',
                    }}
                  />
                )}
                <div
                  onClick={() => {
                    if (s.num < currentStep && !isProcessing && currentStep !== 5) {
                      setCurrentStep(s.num as 1 | 2 | 3 | 4);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: s.num < currentStep && !isProcessing && currentStep !== 5 ? 'pointer' : 'default',
                    opacity: currentStep >= s.num ? 1 : 0.45,
                  }}
                >
                  <div
                    style={{
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
                      transition: 'all 0.2s',
                    }}
                  >
                    {isCompleted ? '✓' : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#0f172a' : '#64748b',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* ===================== PASO 1: SELECCIONAR INSTANCIA ===================== */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '36px' }}>
              <h1
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  margin: '0 0 12px',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                Selecciona tu comunidad
              </h1>
              <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                Elige el entorno de conocimiento e inteligencia artificial al que deseas unirte.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))',
                gap: '28px',
                justifyContent: 'center',
                width: '100%',
              }}
            >
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
                      position: 'relative',
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
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          backgroundColor: '#ccfbf1',
                          color: '#0f766e',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {inst.badge}
                      </div>
                    )}

                    <div
                      style={{
                        height: '110px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: '20px',
                      }}
                    >
                      <img
                        src={inst.logo}
                        alt={inst.name}
                        style={{ maxHeight: '85px', maxWidth: '85%', objectFit: 'contain' }}
                      />
                    </div>

                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        margin: '0 0 8px',
                        color: '#0f172a',
                        textAlign: 'center',
                      }}
                    >
                      {inst.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', margin: 0 }}>
                      {inst.description}
                    </p>

                    <button
                      type="button"
                      style={{
                        marginTop: '20px',
                        backgroundColor: '#00DC94',
                        color: '#042f2e',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 24px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
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

        {/* ===================== PASO 2: MODALIDAD DE LICENCIA ===================== */}
        {currentStep === 2 && (
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  backgroundColor: '#ccfbf1',
                  borderRadius: '20px',
                  color: '#0f766e',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                {selectedInstance.name}
              </div>
              <h1
                style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  margin: '0 0 10px',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                ¿Qué tipo de suscripción necesitas?
              </h1>
              <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
                Elige si buscas una licencia para tu uso personal/profesional o una solución para tu empresa o equipo.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              {/* Opción 1: Tarjeta de crédito */}
              <div
                onClick={() => handleSelectLicenseType('PERSONAL')}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '36px 30px',
                  border: licenseType === 'PERSONAL' ? '3px solid #00DC94' : '2px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#00DC94',
                    color: '#042f2e',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                  }}
                >
                  2 MESES GRATIS
                </div>

                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                    Pago con Tarjeta de crédito
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: '0 0 18px' }}>
                    Para consultores, abogados, DPOs y profesionales individuales. Acceso inmediato inscribiendo tu tarjeta con <strong>2 meses 100% gratis</strong> de prueba.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ fontSize: '13px', color: '#334155', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#00DC94', fontWeight: 800 }}>✓</span> 2 meses gratis en cualquier plan
                    </li>
                    <li style={{ fontSize: '13px', color: '#334155', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#00DC94', fontWeight: 800 }}>✓</span> Cancela en cualquier momento sin penalidad
                    </li>
                    <li style={{ fontSize: '13px', color: '#334155', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#00DC94', fontWeight: 800 }}>✓</span> Activación instantánea de tu cuenta
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLicenseType('PERSONAL');
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#00DC94',
                    color: '#042f2e',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  Continuar
                </button>
              </div>

              {/* Opción 2: Otros medios de pago */}
              <div
                onClick={() => handleSelectLicenseType('CORPORATE')}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '36px 30px',
                  border: licenseType === 'CORPORATE' ? '3px solid #0f172a' : '2px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  EQUIPOS Y EMPRESAS
                </div>

                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                    Otros medios de pago
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: '0 0 24px' }}>
                    Planes para equipos, firmas y departamentos legales. Facturación corporativa con soporte por órdenes de compra, múltiples usuarios y acompañamiento a medida.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLicenseType('CORPORATE');
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #0f172a',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  Contacta ventas
                </button>
              </div>
            </div>

            {/* SECCIÓN PAGO CORPORATIVO: Precios de todas las suscripciones + Botón Contacta Ventas */}
            {licenseType === 'CORPORATE' && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '36px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                  marginBottom: '30px',
                }}
              >
                <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 28px' }}>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                    Planes y Tarifas Corporativas
                  </h2>
                  <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 20px' }}>
                    Revisa las opciones disponibles y coordina la activación corporativa de tu equipo con un asesor dedicado.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate('/contacto')}
                    style={{
                      padding: '14px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#00DC94',
                      color: '#042f2e',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 18px rgba(0, 220, 148, 0.35)',
                    }}
                  >
                    💬 Contactar a Ventas Corporativas →
                  </button>
                </div>

                {/* Grid con todos los planes y precios */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '16px',
                    marginTop: '28px',
                  }}
                >
                  {hubPlans.map((plan) => (
                    <div
                      key={plan.id}
                      style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        padding: '24px 20px',
                        border: plan.id === 'STRATEGIC' || plan.id === 'TEAM' ? '2px solid #00DC94' : '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>{plan.name}</h4>
                          {(plan.id === 'STRATEGIC' || plan.id === 'TEAM') && (
                            <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#0f172a', color: '#00DC94', padding: '2px 8px', borderRadius: '6px' }}>
                              EMPRESAS
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', minHeight: '34px', margin: '0 0 14px' }}>
                          {plan.tagline}
                        </p>
                        <div style={{ marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{plan.monthlyPrice}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Facturación mensual o {plan.annualPrice} anual</div>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {plan.features.map((feat, i) => (
                            <li key={i} style={{ fontSize: '12px', color: '#334155', display: 'flex', gap: '6px' }}>
                              <span style={{ color: '#00DC94', fontWeight: 800 }}>✓</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('/contacto')}
                        style={{
                          marginTop: '20px',
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        Cotizar {plan.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                  cursor: 'pointer',
                }}
              >
                ← Cambiar comunidad / instancia
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: SELECCIONAR PRECIO (LICENCIA PARA MÍ - 2 MESES GRATIS) ===================== */}
        {currentStep === 3 && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
              <h1
                style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  margin: '0 0 24px',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                Selecciona tu plan personal en {selectedInstance.name}
              </h1>

              {/* Selector Mensual / Anual */}
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: '#e2e8f0',
                  padding: '4px',
                  borderRadius: '12px',
                  gap: '4px',
                }}
              >
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
                    transition: 'all 0.2s',
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
                    gap: '6px',
                  }}
                >
                  <span>Anual</span>
                  <span
                    style={{
                      backgroundColor: '#00DC94',
                      color: '#042f2e',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '6px',
                    }}
                  >
                    Ahorro
                  </span>
                </button>
              </div>
            </div>

            {/* Grid de Planes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '36px',
              }}
            >
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
                      borderRadius: '18px',
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
                      position: 'relative',
                    }}
                  >
                    {/* Badge 2 meses gratis en cada card */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#00DC94',
                        color: '#042f2e',
                        padding: '3px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {plan.popular ? '★ Más Elegido • 2 Meses Gratis' : '2 Meses Gratis'}
                    </div>

                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: '8px',
                          marginTop: '6px',
                        }}
                      >
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          {plan.name}
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: '13px',
                          color: '#64748b',
                          minHeight: '38px',
                          margin: '0 0 16px',
                          lineHeight: 1.4,
                        }}
                      >
                        {plan.tagline}
                      </p>

                      <div
                        style={{
                          marginBottom: '18px',
                          borderBottom: '1px solid #f1f5f9',
                          paddingBottom: '16px',
                        }}
                      >
                        <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                          {price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
                          Facturación {period}
                        </div>
                      </div>

                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        {plan.features.map((feat, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: '13px',
                              color: '#334155',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                            }}
                          >
                            <span style={{ color: '#00DC94', fontWeight: 800, fontSize: '14px' }}>✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan);
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
                        transition: 'all 0.2s',
                      }}
                    >
                      {isSelected ? 'Elegir' : 'Seleccionar'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ← Volver a modalidad
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#00DC94',
                  color: '#042f2e',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 220, 148, 0.3)',
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 4: CREAR CUENTA + INSCRIPCIÓN DE TARJETA ===================== */}
        {currentStep === 4 && (
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                Crea tu cuenta e inscribe tu tarjeta
              </h1>
              <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
                Inscribimos tu tarjeta para validar tu identidad e iniciar tu período gratuito de 2 meses. No se realizará ningún cobro hoy.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '24px',
                alignItems: 'start',
              }}
            >
              {/* Formulario Unificado: Cuenta + Tarjeta */}
              <form
                onSubmit={handleSubmitSubscriptionAndAccount}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Selector Crear Cuenta / Ya tengo cuenta */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    backgroundColor: '#f1f5f9',
                    padding: '4px',
                    borderRadius: '12px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage(null);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      backgroundColor: authMode === 'signup' ? '#ffffff' : 'transparent',
                      color: authMode === 'signup' ? '#0f172a' : '#64748b',
                      boxShadow: authMode === 'signup' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    Crear Cuenta Nueva
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      backgroundColor: authMode === 'login' ? '#ffffff' : 'transparent',
                      color: authMode === 'login' ? '#0f172a' : '#64748b',
                      boxShadow: authMode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    Ya tengo cuenta
                  </button>
                </div>

                {errorMessage && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      color: '#b91c1c',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Si authMode === 'login' y AÚN no se ha autenticado: mostrar formulario de inicio de sesión */}
                {authMode === 'login' && !loggedInUser ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      Inicia sesión en tu cuenta de {selectedInstance.name}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                      Ingresa tus credenciales para identificarte antes de inscribir tu tarjeta.
                    </p>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
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
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Contraseña
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isLoggingIn}
                      onClick={handleLoginExistingUser}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                        marginTop: '6px',
                      }}
                    >
                      {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Sección 1: Datos de Usuario / Cuenta Autenticada */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          1. Datos de tu Cuenta ({selectedInstance.name})
                        </h4>
                        {loggedInUser && (
                          <button
                            type="button"
                            onClick={() => {
                              setLoggedInUser(null);
                              setPassword('');
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#0f766e',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            Cambiar cuenta
                          </button>
                        )}
                      </div>

                      {loggedInUser ? (
                        <div
                          style={{
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #86efac',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '12px', color: '#166534', fontWeight: 700 }}>
                              ✓ Sesión iniciada como:
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 800 }}>
                              {loggedInUser.email} {loggedInUser.full_name ? `(${loggedInUser.full_name})` : ''}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                Nombre completo
                              </label>
                              <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => {
                                  setFullName(e.target.value);
                                  if (!cardHolder) setCardHolder(e.target.value);
                                }}
                                placeholder="Juan Pérez"
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  borderRadius: '8px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '14px',
                                  boxSizing: 'border-box',
                                }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                Nombre de usuario
                              </label>
                              <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="juan_legal"
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  borderRadius: '8px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '14px',
                                  boxSizing: 'border-box',
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
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
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              Contraseña (mínimo 8 caracteres)
                            </label>
                            <input
                              type="password"
                              required
                              minLength={8}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

                    {/* Sección 2: Inscripción de Tarjeta de Crédito/Débito */}
                    <div>
                      <div style={{ marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          2. Inscripción tarjeta
                        </h4>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                            Número de tarjeta
                          </label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              fontSize: '14px',
                              boxSizing: 'border-box',
                            }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              Vencimiento
                            </label>
                            <input
                              type="text"
                              required
                              value={expDate}
                              onChange={(e) => setExpDate(formatExpiry(e.target.value))}
                              placeholder="MM/AA"
                              maxLength={5}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              CVV / CVC
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={4}
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="123"
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              Cuotas
                            </label>
                            <select
                              value={installments}
                              onChange={(e) => setInstallments(Number(e.target.value))}
                              style={{
                                width: '100%',
                                padding: '10px 8px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '14px',
                                backgroundColor: '#ffffff',
                                boxSizing: 'border-box',
                              }}
                            >
                              {[1, 2, 3, 6, 12].map((n) => (
                                <option key={n} value={n}>
                                  {n} {n === 1 ? 'cuota' : 'cuotas'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
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
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              fontSize: '14px',
                              boxSizing: 'border-box',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Consentimientos Wompi */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          style={{ marginTop: '2px' }}
                        />
                        <span>
                          Acepto el{' '}
                          <a
                            href={merchantAcceptance?.terms_permalink || 'https://wompi.com/es/co/reglamento-usuarios-colombia'}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#0f766e', fontWeight: 600 }}
                          >
                            reglamento y términos de Wompi
                          </a>{' '}
                          para la inscripción de mi tarjeta.
                        </span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={acceptedPersonalData}
                          onChange={(e) => setAcceptedPersonalData(e.target.checked)}
                          style={{ marginTop: '2px' }}
                        />
                        <span>
                          Autorizo la{' '}
                          <a
                            href={merchantAcceptance?.personal_data_permalink || 'https://wompi.com/es/co/autorizacion-administracion-datos-personales'}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#0f766e', fontWeight: 600 }}
                          >
                            administración y tratamiento de datos personales
                          </a>.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      style={{
                        padding: '15px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#00DC94',
                        color: '#042f2e',
                        fontWeight: 800,
                        fontSize: '15px',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 220, 148, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        opacity: isProcessing ? 0.7 : 1,
                      }}
                    >
                      {isProcessing ? (
                        <>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              border: '2px solid #042f2e',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          <span>{processingMessage}</span>
                        </>
                      ) : (
                        <span>Continuar</span>
                      )}
                    </button>
                  </>
                )}
              </form>

              {/* Resumen Lateral */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#64748b',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Resumen de la Suscripción
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={selectedInstance.logo}
                    alt={selectedInstance.name}
                    style={{ height: '42px', objectFit: 'contain' }}
                  />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                      {selectedInstance.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#0f766e', fontWeight: 600 }}>
                      Plan {selectedPlan.name} • Licencia para mí
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9',
                    padding: '14px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '13px',
                    color: '#64748b',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Ciclo de renovación:</span>
                    <strong style={{ color: '#0f172a' }}>{cycleLabel}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Cobro hoy:</span>
                    <strong style={{ color: '#16a34a', fontSize: '15px' }}>$0 COP</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tarifa después de 60 días:</span>
                    <strong style={{ color: '#0f172a' }}>{activePrice}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ← Cambiar de plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== PASO 5: CONFIRMACIÓN Y ÉXITO ===================== */}
        {currentStep === 5 && (
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '44px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <div
              style={{
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
                fontWeight: 800,
              }}
            >
              ✓
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              ¡Tarjeta Inscrita y Cuenta Creada!
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 28px', lineHeight: 1.5 }}>
              Tu suscripción al <strong>Plan {successInfo?.planName || selectedPlan.name}</strong> en{' '}
              <strong>{selectedInstance.name}</strong> está lista. Se han activado tus <strong>2 meses gratis</strong> para la cuenta <strong>{successInfo?.email || email}</strong>.
            </p>

            {pendingEmailVerification && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '20px',
                  color: '#166534',
                  fontSize: '13px',
                  textAlign: 'left',
                }}
              >
                ✉️ Te enviamos un correo de verificación. Por favor revisa tu bandeja de entrada para validar tu acceso.
              </div>
            )}

            <div
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Comunidad:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedInstance.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Plan:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>
                  {selectedPlan.name} ({cycleLabel})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Período de prueba:</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>2 Meses Gratis ($0 COP)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Cuenta asociada:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{successInfo?.email || email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRedirectToApp}
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
                boxShadow: '0 4px 14px rgba(0, 220, 148, 0.4)',
              }}
            >
              Ingresar a {selectedInstance.name} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
