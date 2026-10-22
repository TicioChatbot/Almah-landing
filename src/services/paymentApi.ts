// Servicio de comunicación con el Backend de Sherlock y la API pública de Wompi

export interface SignupPayload {
  email: string;
  password: string;
  options: {
    data: {
      full_name: string;
      username: string;
      avatar_url?: string;
    };
  };
}

export interface SignupResponse {
  message: string;
  status: string;
  email: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface LoginResponse {
  message: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    role: string;
    full_name: string;
    username: string;
    avatar_url: string;
  };
}

export interface UserMeResponse {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  role?: string;
  is_subscribed?: boolean;
  last_payment_at?: string;
  subscription_expires_at?: string;
  subscription_type?: string;
  subscription_duration?: string;
}

export interface CardMethodData {
  type: 'CARD';
  token: string;
  installments: number;
}

export interface PseMethodData {
  type: 'PSE';
  user_legal_id_type: string;
  user_legal_id: string;
  user_type: number; // 0 = Persona Natural, 1 = Persona Jurídica
  financial_institution_code: string;
  payment_description: string;
}

export interface NequiMethodData {
  type: 'NEQUI';
  phone_number: string;
}

export interface CustomerData {
  full_name: string;
  phone_number: string;
}

export type PaymentMethodUnion = CardMethodData | PseMethodData | NequiMethodData;

export interface CreateWompiTransactionRequest {
  subscription_type: 'START' | 'PRO' | 'TEAM' | 'STRATEGIC';
  subscription_duration: 'MENSUAL' | 'ANUAL';
  amount_in_cents: number;
  currency: string;
  customer_email: string;
  payment_method_type: 'CARD' | 'PSE' | 'NEQUI' | 'BANCOLOMBIA_TRANSFER';
  redirect_url?: string;
  payment_method_data: PaymentMethodUnion;
  customer_data?: CustomerData;
  acceptance_token: string;
  accept_personal_auth: string;
}

export interface WompiGenerateResponse {
  transaction_id: string;
  reference: string;
  payment_method_type: string;
  amount_in_cents: number;
  currency: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
  async_payment_url?: string | null;
}

export interface WompiVerifyResponse {
  status: 'still_pending' | 'processed' | 'already_processed';
  reference: string;
  payment_method_type: string;
  amount_in_cents: number;
  wompi_status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
  async_payment_url?: string | null;
  status_message?: string | null;
}

export interface FinancialInstitution {
  financial_institution_code: string;
  financial_institution_name: string;
}

export interface WompiMerchantAcceptance {
  acceptance_token: string;
  accept_personal_auth: string;
  terms_permalink: string;
  personal_data_permalink: string;
}

const getWompiApiUrl = () =>
  (import.meta.env.VITE_WOMPI_API_URL || 'https://sandbox.wompi.co/v1').replace(/\/$/, '');

const getWompiPublicKey = () =>
  import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf';

function extractErrorMessage(errBody: unknown, status: number): string {
  if (!errBody || typeof errBody !== 'object') {
    return `Error del servidor (${status})`;
  }
  const body = errBody as Record<string, unknown>;
  if (typeof body.detail === 'string') return body.detail;
  if (Array.isArray(body.detail)) {
    const msgs = body.detail
      .map((item) => {
        if (item && typeof item === 'object' && 'msg' in item) {
          const field = Array.isArray((item as { loc?: unknown[] }).loc)
            ? (item as { loc: unknown[] }).loc.slice(-1)[0]
            : '';
          return field ? `${String(field)}: ${String((item as { msg: unknown }).msg)}` : String((item as { msg: unknown }).msg);
        }
        return JSON.stringify(item);
      })
      .filter(Boolean);
    if (msgs.length > 0) return msgs.join(', ');
  }
  if (body.detail && typeof body.detail === 'object') {
    const detailObj = body.detail as Record<string, unknown>;
    if (typeof detailObj.message === 'string') return detailObj.message;
    if (typeof detailObj.detail === 'string') return detailObj.detail;
    const flatMessages = Object.entries(detailObj)
      .map(([key, val]) => {
        if (Array.isArray(val)) return `${key}: ${val.join(', ')}`;
        if (typeof val === 'string') return `${key}: ${val}`;
        return null;
      })
      .filter(Boolean);
    if (flatMessages.length > 0) return flatMessages.join(' | ');
    return JSON.stringify(detailObj);
  }
  if (typeof body.message === 'string') return body.message;
  return `Error en la solicitud (${status})`;
}

/**
 * Registra un usuario en la instancia seleccionada (`POST /auth/signup_user`)
 */
export async function signupUser(backendUrl: string, payload: SignupPayload): Promise<SignupResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');
  const res = await fetch(`${baseUrl}/auth/signup_user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as SignupResponse;
}

/**
 * Inicia sesión en la instancia seleccionada (`POST /auth/login_user`)
 */
export async function loginUser(backendUrl: string, email: string, password: string): Promise<LoginResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');
  const res = await fetch(`${baseUrl}/auth/login_user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as LoginResponse;
}

/**
 * Obtiene el perfil del usuario autenticado (`GET /auth/me`)
 */
export async function getCurrentUser(backendUrl: string, accessToken: string): Promise<UserMeResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');
  const res = await fetch(`${baseUrl}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as UserMeResponse;
}

/**
 * Obtiene los tokens de aceptación de términos y datos personales del comercio en Wompi
 * (`GET https://.../v1/merchants/{PUBLIC_KEY}`)
 */
export async function fetchWompiMerchantAcceptance(customPublicKey?: string): Promise<WompiMerchantAcceptance> {
  const pubKey = customPublicKey || getWompiPublicKey();
  const wompiUrl = getWompiApiUrl();

  const res = await fetch(`${wompiUrl}/merchants/${pubKey}`);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || !json?.data) {
    throw new Error('No se pudieron obtener los tokens de aceptación de Wompi. Verifica VITE_WOMPI_PUBLIC_KEY.');
  }

  const presignedAcceptance = json.data.presigned_acceptance || {};
  const presignedPersonal = json.data.presigned_personal_data_auth || {};

  return {
    acceptance_token: presignedAcceptance.acceptance_token || '',
    accept_personal_auth: presignedPersonal.acceptance_token || presignedAcceptance.acceptance_token || '',
    terms_permalink: presignedAcceptance.permalink || 'https://wompi.com/es/co/reglamento-usuarios-colombia',
    personal_data_permalink: presignedPersonal.permalink || 'https://wompi.com/es/co/autorizacion-administracion-datos-personales',
  };
}

/**
 * Obtiene la lista de bancos disponibles para PSE desde Wompi
 * (`GET https://.../v1/pse/financial_institutions`)
 */
export async function fetchPseFinancialInstitutions(customPublicKey?: string): Promise<FinancialInstitution[]> {
  const pubKey = customPublicKey || getWompiPublicKey();
  const wompiUrl = getWompiApiUrl();

  const res = await fetch(`${wompiUrl}/pse/financial_institutions`, {
    headers: {
      Authorization: `Bearer ${pubKey}`,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !Array.isArray(json?.data)) {
    throw new Error('No se pudo cargar la lista de bancos PSE desde Wompi.');
  }
  return json.data as FinancialInstitution[];
}

/**
 * Tokeniza una tarjeta de crédito/débito directamente con Wompi (`POST /v1/tokens/cards`)
 * Nunca envía el PAN/CVV al backend de Sherlock, sino el token seguro `tok_...`
 */
export async function tokenizeCardWithWompi(
  card: {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
  },
  customPublicKey?: string
): Promise<string> {
  const pubKey = customPublicKey || getWompiPublicKey();
  const wompiUrl = getWompiApiUrl();

  const res = await fetch(`${wompiUrl}/tokens/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pubKey}`,
    },
    body: JSON.stringify(card),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status !== 'CREATED' || !json?.data?.id) {
    const errMessages = json?.error?.messages
      ? Object.values(json.error.messages).flat().join(', ')
      : 'Datos de tarjeta inválidos o rechazados por Wompi.';
    throw new Error(errMessages);
  }

  return json.data.id as string;
}

/**
 * Crea la transacción en el backend de Sherlock y la registra a la cuenta autenticada
 * (`POST /wompi/transactions/generate`)
 */
export async function generateWompiTransaction(
  backendUrl: string,
  accessToken: string,
  payload: CreateWompiTransactionRequest
): Promise<WompiGenerateResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');
  const res = await fetch(`${baseUrl}/wompi/transactions/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as WompiGenerateResponse;
}

/**
 * Consulta directamente el estado público de una transacción en Wompi (`GET /v1/transactions/{id}`)
 * Útil para obtener `async_payment_url` (PSE) o `status_message` en tiempo real.
 */
export async function fetchWompiTransactionDirect(wompiTransactionId: string): Promise<{
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
  payment_method_type: string;
  amount_in_cents: number;
  reference: string;
  async_payment_url: string | null;
  status_message: string | null;
} | null> {
  try {
    const wompiUrl = getWompiApiUrl();
    const res = await fetch(`${wompiUrl}/transactions/${encodeURIComponent(wompiTransactionId)}`);
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.data) return null;
    const tx = json.data;
    const extra = tx?.payment_method?.extra || {};
    return {
      status: tx.status || 'PENDING',
      payment_method_type: tx.payment_method_type || tx?.payment_method?.type || '',
      amount_in_cents: tx.amount_in_cents || 0,
      reference: tx.reference || '',
      async_payment_url: extra?.async_payment_url || null,
      status_message: tx.status_message || null,
    };
  } catch {
    return null;
  }
}

/**
 * Verifica el estado de una transacción en el backend de Sherlock y activa la suscripción en `profiles` si fue `APPROVED`
 * (`POST /wompi/transactions/verify` con fallback automático a `POST /wompitransactions/verify`)
 */
export async function verifyWompiTransaction(
  backendUrl: string,
  accessToken: string,
  wompiTransactionId: string,
  reference: string
): Promise<WompiVerifyResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');
  const reqInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      wompi_transaction_id: wompiTransactionId,
      reference,
    }),
  };

  let res = await fetch(`${baseUrl}/wompi/transactions/verify`, reqInit);
  if (res.status === 404) {
    res = await fetch(`${baseUrl}/wompitransactions/verify`, reqInit);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Si el backend aún está esperando que Wompi inicialice `payment_method.extra` (ej. primeros segundos de PSE/Nequi),
    // consultamos directamente el estado en Wompi para no interrumpir el flujo de redirección o espera.
    const directTx = await fetchWompiTransactionDirect(wompiTransactionId);
    if (directTx) {
      return {
        status: directTx.status === 'PENDING' ? 'still_pending' : 'processed',
        reference: directTx.reference || reference,
        payment_method_type: directTx.payment_method_type,
        amount_in_cents: directTx.amount_in_cents,
        wompi_status: directTx.status,
        async_payment_url: directTx.async_payment_url,
        status_message: directTx.status_message,
      };
    }
    throw new Error(extractErrorMessage(data, res.status));
  }

  const result = data as WompiVerifyResponse;

  // Enriquecer con datos directos de Wompi si aún no trae async_payment_url o status_message
  if (
    (result.wompi_status === 'PENDING' && !result.async_payment_url) ||
    result.wompi_status === 'DECLINED' ||
    result.wompi_status === 'ERROR'
  ) {
    const directTx = await fetchWompiTransactionDirect(wompiTransactionId);
    if (directTx) {
      if (!result.async_payment_url && directTx.async_payment_url) {
        result.async_payment_url = directTx.async_payment_url;
      }
      if (!result.status_message && directTx.status_message) {
        result.status_message = directTx.status_message;
      }
    }
  }

  return result;
}

export interface CreateWompiTrialSubscriptionRequest {
  subscription_type: 'START' | 'PRO' | 'TEAM' | 'STRATEGIC';
  subscription_duration: 'MENSUAL' | 'ANUAL';
  customer_email: string;
  acceptance_token: string;
  accept_personal_auth: string;
  payment_source?: {
    type: 'CARD';
    token: string;
    installments?: number;
  };
  card_token?: string;
  token?: string;
  installments?: number;
  trial_months?: number;
  metadata?: Record<string, unknown>;
}

export interface WompiTrialSubscriptionResponse {
  message?: string;
  status?: string;
  subscription_id?: string;
  id?: string;
  trial_end?: string;
  [key: string]: unknown;
}

/**
 * Inscribe una tarjeta e inicia el período de prueba (Trial) de la suscripción
 * (POST /wompi/subscriptions/trial)
 */
export async function createWompiTrialSubscription(
  backendUrl: string,
  payload: CreateWompiTrialSubscriptionRequest,
  accessToken?: string
): Promise<WompiTrialSubscriptionResponse> {
  const baseUrl = backendUrl.replace(/\/$/, '');

  const cardTok = payload.card_token || payload.payment_source?.token || payload.token || '';
  const requestBody = {
    ...payload,
    payment_source: payload.payment_source || {
      type: 'CARD' as const,
      token: cardTok,
      installments: payload.installments || 1,
    },
    card_token: cardTok,
    token: cardTok,
    installments: payload.installments || payload.payment_source?.installments || 1,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(baseUrl + '/wompi/subscriptions/trial', {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }
  return data as WompiTrialSubscriptionResponse;
}
