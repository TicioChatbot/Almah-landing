/*
 * Espacio para la pasarela de pago. Los datos de tarjeta no se piden en
 * nuestro formulario: los captura la pasarela (Wompi, Mercado Pago, Stripe...)
 * en su propio iframe, así no entramos en PCI-DSS.
 *
 * Para conectarla:
 * 1. Cargar el SDK de la pasarela.
 * 2. Montarlo en #pasarela-slot.
 * 3. Cambiar el envío del formulario por la creación de la transacción con
 *    montoCOP y la referencia del pedido.
 */
export function PasarelaSlot({ montoCOP }: { montoCOP: number | null }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-xl font-bold text-white">Pago</h3>

      <div
        id="pasarela-slot"
        className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/65 bg-white/5 p-6 text-center"
      >
        <p className="font-display font-bold text-white">
          Pasarela de pago pendiente de conexión
        </p>
        {/* Blanco sólido, con opacidad no pasa el contraste */}
        <p className="max-w-[52ch] text-sm text-white">
          Los datos de tarjeta los recogerá directamente la pasarela, sin pasar
          por este sitio.
        </p>
      </div>

      <p className="flex items-baseline justify-between border-t border-white/60 pt-4">
        <span className="font-display text-lg font-bold text-white">
          Total a pagar
        </span>
        <span className="font-display text-2xl font-bold text-white">
          {montoCOP === null
            ? "Por confirmar"
            : montoCOP.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              })}
        </span>
      </p>
    </div>
  );
}
