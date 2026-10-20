import React, { useState, useEffect, useCallback } from 'react';
import logoRcm from '../assets/logo-rcm.png';
import logoHub from '../assets/logo-hub.png';
import {
  signupUser,
  loginUser,
  fetchWompiMerchantAcceptance,
  fetchPseFinancialInstitutions,
  tokenizeCardWithWompi,
  generateWompiTransaction,
  verifyWompiTransaction,
  type FinancialInstitution,
  type WompiMerchantAcceptance,
  type CreateWompiTransactionRequest,
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
  // Step 1: Instancia
  // Step 2: Plan (Precios)
  // Step 3: Crear Cuenta / Iniciar Sesión (en el backend de la instancia elegida)
  // Step 4: Pago (Wompi vinculado con Bearer token de la cuenta creada)
  // Step 5: Confirmación y activación de suscripción
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Instancia y Plan seleccionados
  const [selectedInstance, setSelectedInstance] = useState<InstanceOption>(instances[0]);
  const [selectedPlan, setSelectedPlan] = useState<HubPlanOption>(hubPlans[1]); // PRO por defecto
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Paso 3: Estado de Autenticación y Creación de Cuenta
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(presetAvatars[0]);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [pendingEmailVerification, setPendingEmailVerification] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Paso 4: Estado de Pago Wompi
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'PSE' | 'NEQUI'>('CARD');
  const [merchantAcceptance, setMerchantAcceptance] = useState<WompiMerchantAcceptance | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPersonalData, setAcceptedPersonalData] = useState(false);

  // Datos de Tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState(''); // MM/AA
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [installments, setInstallments] = useState(1);

  // Datos de PSE
  const [pseBanks, setPseBanks] = useState<FinancialInstitution[]>([]);
  const [pseBankCode, setPseBankCode] = useState('');
  const [pseUserType, setPseUserType] = useState<number>(0); // 0 Natural, 1 Jurídica
  const [pseDocType, setPseDocType] = useState('CC');
  const [pseDocNumber, setPseDocNumber] = useState('');

  // Datos de Nequi
  const [nequiPhone, setNequiPhone] = useState('');

  // Estado de Transacción Wompi (Paso 4 y 5)
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Procesando tu pago con Wompi...');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR' | null>(null);
  const [asyncPaymentUrl, setAsyncPaymentUrl] = useState<string | null>(null);

  const activePrice = billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const activePriceInCents = (billingCycle === 'annual' ? selectedPlan.annualPriceNum : selectedPlan.monthlyPriceNum) * 100;
  const subscriptionDuration: 'ANUAL' | 'MENSUAL' = billingCycle === 'annual' ? 'ANUAL' : 'MENSUAL';
  const cycleLabel = billingCycle === 'annual' ? 'Anual' : 'Mensual';

  // Cargar sesión previa (ej. al volver de redirección PSE o confirmación de correo)
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
        if (parsed.accessToken) setAccessToken(parsed.accessToken);
        if (parsed.transactionId && parsed.transactionReference && parsed.accessToken) {
          setTransactionId(parsed.transactionId);
          setTransactionReference(parsed.transactionReference);
          setCurrentStep(5);
        }
      }
    } catch {
      // Ignorar errores de sessionStorage
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
          accessToken,
          transactionId,
          transactionReference,
        })
      );
    } catch {
      // Ignorar errores
    }
  }, [selectedInstance, selectedPlan, billingCycle, email, fullName, username, accessToken, transactionId, transactionReference]);

  // Cargar tokens de aceptación de Wompi y bancos PSE al llegar al paso 4
  useEffect(() => {
    if (currentStep === 4) {
      fetchWompiMerchantAcceptance()
        .then((tokens) => setMerchantAcceptance(tokens))
        .catch((err) => {
          console.warn('Error cargando aceptación Wompi:', err);
        });

      fetchPseFinancialInstitutions()
        .then((banks) => {
          setPseBanks(banks);
          if (banks.length > 0 && !pseBankCode) {
            const validBank = banks.find((b) => b.financial_institution_code !== '0') || banks[0];
            setPseBankCode(validBank.financial_institution_code);
          }
        })
        .catch((err) => {
          console.warn('Error cargando bancos PSE:', err);
        });
    }
  }, [currentStep, pseBankCode]);

  // Polling / Verificación de transacción en el Paso 5
  const pollTransactionVerification = useCallback(
    async (txId: string, ref: string, token: string, backendUrl: string) => {
      setIsProcessing(true);
      setProcessingMessage('Verificando el estado de la transacción y activando tu cuenta...');
      setPaymentError(null);

      const maxAttempts = 12; // ~36 segundos de polling automático
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const verifyRes = await verifyWompiTransaction(backendUrl, token, txId, ref);
          setTransactionStatus(verifyRes.wompi_status);

          if (verifyRes.async_payment_url) {
            setAsyncPaymentUrl(verifyRes.async_payment_url);
          }

          if (verifyRes.wompi_status === 'APPROVED') {
            setIsProcessing(false);
            return;
          }

          if (
            verifyRes.wompi_status === 'DECLINED' ||
            verifyRes.wompi_status === 'VOIDED' ||
            verifyRes.wompi_status === 'ERROR'
          ) {
            setIsProcessing(false);
            setPaymentError(
              `La transacción fue rechazada o cancelada por la pasarela (Estado: ${verifyRes.wompi_status}).`
            );
            return;
          }

          // Si es PSE y ya tenemos la URL bancaria asíncrona, abrimos o mostramos el botón de inmediato
          if (verifyRes.wompi_status === 'PENDING' && verifyRes.async_payment_url && attempt >= 2) {
            setIsProcessing(false);
            return;
          }
        } catch (err: unknown) {
          console.warn(`Intento de verificación ${attempt} falló:`, err);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      // Si después de los intentos sigue en PENDING (ej. Nequi esperando push en el celular o PSE)
      setTransactionStatus('PENDING');
      setIsProcessing(false);
    },
    []
  );

  // Si entramos al paso 5 con una transacción pendiente de verificar
  useEffect(() => {
    if (currentStep === 5 && transactionId && transactionReference && accessToken && !transactionStatus) {
      pollTransactionVerification(transactionId, transactionReference, accessToken, selectedInstance.backendUrl);
    }
  }, [currentStep, transactionId, transactionReference, accessToken, transactionStatus, pollTransactionVerification, selectedInstance.backendUrl]);

  const handleSelectInstance = (inst: InstanceOption) => {
    if (inst.id !== selectedInstance.id) {
      // Si cambia de instancia, requerimos autenticar en el backend de la nueva instancia
      setAccessToken(null);
      setPendingEmailVerification(false);
    }
    setSelectedInstance(inst);
    setCurrentStep(2);
  };

  const handleProceedToAccount = () => {
    setAuthError(null);
    if (accessToken) {
      setCurrentStep(4);
    } else {
      setCurrentStep(3);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authMode === 'signup') {
        const res = await signupUser(selectedInstance.backendUrl, {
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              username: username.trim(),
              avatar_url: avatarUrl,
            },
          },
        });

        // Si Supabase tiene desactivada la confirmación o devuelve sesión directa:
        if (res.access_token) {
          setAccessToken(res.access_token);
          if (!cardHolder && fullName) setCardHolder(fullName.trim());
          setCurrentStep(4);
        } else {
          // Intentar login inmediato por si Supabase lo permite; si requiere confirmar email con Resend, mostramos aviso
          try {
            const loginRes = await loginUser(selectedInstance.backendUrl, email.trim(), password);
            setAccessToken(loginRes.access_token);
            if (!cardHolder && fullName) setCardHolder(fullName.trim());
            setCurrentStep(4);
          } catch {
            setPendingEmailVerification(true);
          }
        }
      } else {
        // Modo Login ("Ya tengo cuenta" o después de confirmar el correo enviado por Resend)
        const loginRes = await loginUser(selectedInstance.backendUrl, email.trim(), password);
        setAccessToken(loginRes.access_token);
        if (loginRes.user?.full_name) {
          setFullName(loginRes.user.full_name);
          if (!cardHolder) setCardHolder(loginRes.user.full_name);
        }
        if (loginRes.user?.username) {
          setUsername(loginRes.user.username);
        }
        setPendingEmailVerification(false);
        setCurrentStep(4);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar la cuenta.';
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setAuthError('Tu sesión expiró. Por favor inicia sesión nuevamente.');
      setCurrentStep(3);
      return;
    }

    if (!acceptedTerms || !acceptedPersonalData) {
      setPaymentError('Debes aceptar los términos y condiciones y la autorización de datos personales de Wompi.');
      return;
    }

    setPaymentError(null);
    setTransactionStatus(null);
    setAsyncPaymentUrl(null);
    setCurrentStep(5);
    setIsProcessing(true);

    try {
      // 1. Asegurar tokens de aceptación de Wompi
      let acceptance = merchantAcceptance;
      if (!acceptance || !acceptance.acceptance_token) {
        setProcessingMessage('Obteniendo tokens de seguridad del comercio...');
        acceptance = await fetchWompiMerchantAcceptance();
        setMerchantAcceptance(acceptance);
      }

      // 2. Construir payment_method_data según el método seleccionado
      let paymentMethodData: CreateWompiTransactionRequest['payment_method_data'];

      if (paymentMethod === 'CARD') {
        setProcessingMessage('Tokenizando tarjeta de forma segura con Wompi...');
        const cleanCardNumber = cardNumber.replace(/\s+/g, '');
        const [expMonthRaw, expYearRaw] = expDate.split('/');
        const expMonth = (expMonthRaw || '').trim().padStart(2, '0');
        const expYear = (expYearRaw || '').trim().slice(-2);

        if (!cleanCardNumber || !expMonth || !expYear || !cvv || !cardHolder) {
          throw new Error('Por favor completa todos los campos de la tarjeta.');
        }

        const cardToken = await tokenizeCardWithWompi({
          number: cleanCardNumber,
          cvc: cvv.trim(),
          exp_month: expMonth,
          exp_year: expYear,
          card_holder: cardHolder.trim(),
        });

        paymentMethodData = {
          type: 'CARD',
          token: cardToken,
          installments: Number(installments) || 1,
        };
      } else if (paymentMethod === 'PSE') {
        if (!pseBankCode || !pseDocNumber) {
          throw new Error('Por favor selecciona tu banco e ingresa tu número de documento para PSE.');
        }
        paymentMethodData = {
          type: 'PSE',
          user_legal_id_type: pseDocType,
          user_legal_id: pseDocNumber.trim(),
          user_type: pseUserType,
          financial_institution_code: pseBankCode,
          payment_description: `Plan ${selectedPlan.name} ${selectedInstance.name}`.slice(0, 30),
        };
      } else {
        const cleanPhone = nequiPhone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          throw new Error('Ingresa un número de celular Nequi válido de 10 dígitos.');
        }
        paymentMethodData = {
          type: 'NEQUI',
          phone_number: cleanPhone,
        };
      }

      // 3. Registrar transacción en el backend de Sherlock con la cuenta del usuario
      setProcessingMessage('Registrando pago en tu cuenta y procesando con Wompi...');
      const returnUrl = window.location.href;

      const txRes = await generateWompiTransaction(selectedInstance.backendUrl, accessToken, {
        subscription_type: selectedPlan.id,
        subscription_duration: subscriptionDuration,
        amount_in_cents: activePriceInCents,
        currency: 'COP',
        customer_email: email.trim(),
        payment_method_type: paymentMethod,
        redirect_url: returnUrl,
        payment_method_data: paymentMethodData,
        acceptance_token: acceptance.acceptance_token,
        accept_personal_auth: acceptance.accept_personal_auth,
      });

      setTransactionId(txRes.transaction_id);
      setTransactionReference(txRes.reference);

      // 4. Verificar la transacción y activar la suscripción en la tabla `profiles`
      await pollTransactionVerification(
        txRes.transaction_id,
        txRes.reference,
        accessToken,
        selectedInstance.backendUrl
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ocurrió un error al procesar el pago.';
      setPaymentError(msg);
      setTransactionStatus('ERROR');
      setIsProcessing(false);
    }
  };

  const handleManualVerify = () => {
    if (transactionId && transactionReference && accessToken) {
      pollTransactionVerification(transactionId, transactionReference, accessToken, selectedInstance.backendUrl);
    }
  };

  const handleRedirect = () => {
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
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        {/* Stepper / Indicador de 5 Pasos */}
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
            { num: 2, label: '2. Plan' },
            { num: 3, label: '3. Crear Cuenta' },
            { num: 4, label: '4. Pago' },
            { num: 5, label: '5. Confirmación' },
          ].map((s, idx) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div
                    style={{
                      width: '28px',
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
                Selecciona la comunidad
              </h1>
              <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                Elige la instancia donde se creará tu cuenta y se activará tu suscripción.
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

        {/* ===================== PASO 2: SELECCIONAR PLAN ===================== */}
        {currentStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px' }}>
              <div
                style={{
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
                  textTransform: 'uppercase',
                }}
              >
                Precios de Lanzamiento • {selectedInstance.name}
              </div>
              <h1
                style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  margin: '0 0 12px',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                Selecciona tu plan
              </h1>
              <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 24px' }}>
                Tarifas especiales de lanzamiento con acceso completo a la plataforma.
              </p>

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

            {/* Grid de 4 Planes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                      position: 'relative',
                    }}
                  >
                    {plan.popular && (
                      <div
                        style={{
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
                          textTransform: 'uppercase',
                        }}
                      >
                        Más Elegido
                      </div>
                    )}

                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: '8px',
                        }}
                      >
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          {plan.name}
                        </h3>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#0f766e',
                            backgroundColor: '#ccfbf1',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontWeight: 700,
                          }}
                        >
                          Lanzamiento
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '13px',
                          color: '#64748b',
                          minHeight: '38px',
                          margin: '0 0 18px',
                          lineHeight: 1.4,
                        }}
                      >
                        {plan.tagline}
                      </p>

                      <div
                        style={{
                          marginBottom: '20px',
                          borderBottom: '1px solid #f1f5f9',
                          paddingBottom: '16px',
                        }}
                      >
                        <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>{price}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
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
                        setSelectedPlan(plan);
                        handleProceedToAccount();
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
                      {isSelected ? 'Continuar con este plan →' : 'Elegir plan'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
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
                ← Cambiar instancia
              </button>

              <button
                type="button"
                onClick={handleProceedToAccount}
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
                Continuar a crear cuenta ({selectedPlan.name} • {activePrice}) →
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: CREAR CUENTA / INICIAR SESIÓN ===================== */}
        {currentStep === 3 && (
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}
              >
                {selectedInstance.name} • Plan {selectedPlan.name} ({cycleLabel})
              </div>
              <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                {authMode === 'signup' ? 'Crea tu cuenta en la instancia' : 'Inicia sesión en tu cuenta'}
              </h1>
              <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
                {authMode === 'signup'
                  ? 'Primero registramos tu usuario para asociar el pago y activar tu suscripción inmediatamente.'
                  : 'Ingresa con tus credenciales para continuar con el pago de tu suscripción.'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
              }}
            >
              {/* Selector Crear cuenta vs Iniciar sesión */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  backgroundColor: '#f1f5f9',
                  padding: '4px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError(null);
                    setPendingEmailVerification(false);
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
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
                    setAuthError(null);
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: authMode === 'login' ? '#ffffff' : 'transparent',
                    color: authMode === 'login' ? '#0f172a' : '#64748b',
                    boxShadow: authMode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  Ya tengo cuenta
                </button>
              </div>

              {pendingEmailVerification && (
                <div
                  style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '20px',
                    color: '#166534',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '6px' }}>
                    ✉️ ¡Cuenta creada! Confirma tu correo electrónico
                  </div>
                  <p style={{ margin: '0 0 12px' }}>
                    Hemos enviado un enlace de confirmación a <strong>{email}</strong> a través de Resend. Una vez
                    confirmes tu correo, haz clic abajo para iniciar sesión y continuar al pago.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setPendingEmailVerification(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Ya confirmé mi correo → Continuar al pago
                  </button>
                </div>
              )}

              {authError && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    color: '#b91c1c',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  ⚠️ {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {authMode === 'signup' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Juan Pérez"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Nombre de usuario (username)
                      </label>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="juan_legal"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '6px',
                    }}
                  >
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
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '6px',
                    }}
                  >
                    Contraseña {authMode === 'signup' && '(mínimo 8 caracteres)'}
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
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#334155',
                        marginBottom: '8px',
                      }}
                    >
                      Selecciona un avatar para tu perfil
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {presetAvatars.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(url)}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            padding: 0,
                            overflow: 'hidden',
                            border: avatarUrl === url ? '3px solid #00DC94' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <img src={url} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    ← Volver a planes
                  </button>
                  <button
                    type="submit"
                    disabled={authLoading}
                    style={{
                      flex: 2,
                      padding: '14px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: '#00DC94',
                      color: '#042f2e',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: authLoading ? 'not-allowed' : 'pointer',
                      opacity: authLoading ? 0.7 : 1,
                    }}
                  >
                    {authLoading
                      ? 'Procesando cuenta...'
                      : authMode === 'signup'
                      ? 'Crear cuenta y continuar al pago →'
                      : 'Iniciar sesión y continuar al pago →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== PASO 4: PAGO WOMPI ===================== */}
        {currentStep === 4 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                Paso 4: Realiza tu pago
              </h1>
              <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
                El pago quedará registrado directamente en tu cuenta <strong>{email}</strong> en{' '}
                <strong>{selectedInstance.name}</strong>.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
                alignItems: 'start',
              }}
            >
              {/* Resumen de Compra y Cuenta Asociada */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    margin: 0,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Resumen de la suscripción
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
                      Plan {selectedPlan.name} (Lanzamiento)
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9',
                    padding: '16px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                    <span>Cuenta autenticada:</span>
                    <strong style={{ color: '#0f172a' }}>{email}</strong>
                  </div>
                  {username && (
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}
                    >
                      <span>Usuario:</span>
                      <strong style={{ color: '#0f172a' }}>@{username}</strong>
                    </div>
                  )}
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

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: '#64748b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>🔒 Pagos seguros procesados por Wompi Bancolombia</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAccessToken(null);
                      setCurrentStep(3);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0f766e',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '12px',
                      textDecoration: 'underline',
                    }}
                  >
                    Cambiar cuenta
                  </button>
                </div>
              </div>

              {/* Formulario de Pago Wompi */}
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
                  gap: '18px',
                }}
              >
                {paymentError && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#b91c1c',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    ⚠️ {paymentError}
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '8px',
                    }}
                  >
                    Método de pago
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'CARD', name: '💳 Tarjeta' },
                      { id: 'PSE', name: '🏦 PSE' },
                      { id: 'NEQUI', name: '📱 Nequi' },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as 'CARD' | 'PSE' | 'NEQUI')}
                        style={{
                          padding: '12px',
                          borderRadius: '10px',
                          border: paymentMethod === m.id ? '2px solid #00DC94' : '1px solid #cbd5e1',
                          backgroundColor: paymentMethod === m.id ? '#f0fdf4' : '#ffffff',
                          fontWeight: paymentMethod === m.id ? 700 : 500,
                          fontSize: '14px',
                          cursor: 'pointer',
                          color: '#0f172a',
                        }}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos para TARJETA */}
                {paymentMethod === 'CARD' && (
                  <>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
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
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '6px',
                          }}
                        >
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
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '6px',
                          }}
                        >
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
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '6px',
                          }}
                        >
                          Cuotas
                        </label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          style={{
                            width: '100%',
                            padding: '12px 10px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '15px',
                            backgroundColor: '#ffffff',
                            boxSizing: 'border-box',
                          }}
                        >
                          {[1, 2, 3, 6, 12, 24, 36].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'cuota' : 'cuotas'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
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
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Campos para PSE */}
                {paymentMethod === 'PSE' && (
                  <>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Selecciona tu Banco
                      </label>
                      <select
                        required
                        value={pseBankCode}
                        onChange={(e) => setPseBankCode(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          backgroundColor: '#ffffff',
                          boxSizing: 'border-box',
                        }}
                      >
                        {pseBanks.length === 0 && <option value="1">Banco que aprueba (Sandbox)</option>}
                        {pseBanks.map((b) => (
                          <option key={b.financial_institution_code} value={b.financial_institution_code}>
                            {b.financial_institution_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '6px',
                          }}
                        >
                          Tipo de persona
                        </label>
                        <select
                          value={pseUserType}
                          onChange={(e) => setPseUserType(Number(e.target.value))}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '14px',
                            backgroundColor: '#ffffff',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value={0}>Persona Natural</option>
                          <option value={1}>Persona Jurídica</option>
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '6px',
                          }}
                        >
                          Tipo de documento
                        </label>
                        <select
                          value={pseDocType}
                          onChange={(e) => setPseDocType(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '14px',
                            backgroundColor: '#ffffff',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value="CC">Cédula de Ciudadanía (CC)</option>
                          <option value="NIT">NIT</option>
                          <option value="CE">Cédula de Extranjería (CE)</option>
                          <option value="PP">Pasaporte (PP)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#334155',
                          marginBottom: '6px',
                        }}
                      >
                        Número de identificación
                      </label>
                      <input
                        type="text"
                        required
                        minLength={5}
                        value={pseDocNumber}
                        onChange={(e) => setPseDocNumber(e.target.value)}
                        placeholder="Ej: 1020304050"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Campos para NEQUI */}
                {paymentMethod === 'NEQUI' && (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#334155',
                        marginBottom: '6px',
                      }}
                    >
                      Número de celular Nequi (10 dígitos)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={nequiPhone}
                      onChange={(e) => setNequiPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="3001234567"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0' }}>
                      Recibirás una notificación push en tu app de Nequi para aprobar la suscripción.
                    </p>
                  </div>
                )}

                {/* Checkboxes legales obligatorios de Wompi */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '12px',
                    color: '#475569',
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      style={{ marginTop: '2px' }}
                    />
                    <span>
                      Acepto haber leído los{' '}
                      <a
                        href={
                          merchantAcceptance?.terms_permalink ||
                          'https://wompi.com/es/co/reglamento-usuarios-colombia'
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#0f766e', fontWeight: 600 }}
                      >
                        términos y condiciones y la política de privacidad
                      </a>{' '}
                      para realizar este pago.
                    </span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={acceptedPersonalData}
                      onChange={(e) => setAcceptedPersonalData(e.target.checked)}
                      style={{ marginTop: '2px' }}
                    />
                    <span>
                      Acepto la{' '}
                      <a
                        href={
                          merchantAcceptance?.personal_data_permalink ||
                          'https://wompi.com/es/co/autorizacion-administracion-datos-personales'
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#0f766e', fontWeight: 600 }}
                      >
                        autorización para la administración de datos personales
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    ← Cambiar plan
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      padding: '14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#00DC94',
                      color: '#042f2e',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    Pagar {activePrice}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== PASO 5: CONFIRMACIÓN Y ACTIVACIÓN ===================== */}
        {currentStep === 5 && (
          <div>
            {isProcessing ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '90px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '5px solid #ccfbf1',
                    borderTopColor: '#00DC94',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '28px',
                  }}
                />
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 10px', color: '#0f172a' }}>
                  {processingMessage}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Por favor no cierres esta ventana mientras vinculamos la suscripción a tu cuenta.
                </p>
              </div>
            ) : transactionStatus === 'APPROVED' ? (
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
                  ¡Pago Completado y Cuenta Activada!
                </h2>
                <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 28px' }}>
                  Tu suscripción al <strong>Plan {selectedPlan.name}</strong> en{' '}
                  <strong>{selectedInstance.name}</strong> ha sido activada en la base de datos para la cuenta{' '}
                  <strong>{email}</strong>.
                </p>

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
                    <span style={{ color: '#64748b' }}>Instancia:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedInstance.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Plan activado:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {selectedPlan.name} ({cycleLabel})
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Cuenta asociada:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{email}</span>
                  </div>
                  {transactionReference && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: '#64748b' }}>Referencia Wompi:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{transactionReference}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b' }}>Monto pagado:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{activePrice}</span>
                  </div>
                </div>

                <button
                  type="button"
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
                    boxShadow: '0 4px 14px rgba(0, 220, 148, 0.4)',
                  }}
                >
                  Ingresar a {selectedInstance.name} →
                </button>
              </div>
            ) : transactionStatus === 'PENDING' ? (
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
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: '#fef9c3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#ca8a04',
                    fontSize: '32px',
                    fontWeight: 800,
                  }}
                >
                  ⏳
                </div>

                <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                  Pago pendiente de confirmación
                </h2>
                <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>
                  Tu transacción (Ref: <strong>{transactionReference}</strong>) está registrada en tu cuenta{' '}
                  <strong>{email}</strong> y está esperando confirmación de tu entidad financiera.
                </p>

                {asyncPaymentUrl && (
                  <a
                    href={asyncPaymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '15px',
                      textDecoration: 'none',
                      marginBottom: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    Ir a la pasarela bancaria (PSE) para completar el pago ↗
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleManualVerify}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#00DC94',
                    color: '#042f2e',
                    fontSize: '15px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginBottom: '12px',
                  }}
                >
                  🔄 Ya realicé el pago • Verificar estado ahora
                </button>
              </div>
            ) : (
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
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: '#fee2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#dc2626',
                    fontSize: '32px',
                    fontWeight: 800,
                  }}
                >
                  ✕
                </div>

                <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
                  No se pudo completar el pago
                </h2>
                <p style={{ fontSize: '15px', color: '#b91c1c', margin: '0 0 24px', lineHeight: 1.5 }}>
                  {paymentError || 'La transacción fue declinada o presentó un error. No se realizó ningún cobro.'}
                </p>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  ← Intentar con otro medio de pago
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
