// Los valores "Pendiente" no se muestran
export function esDato(valor: string) {
  return !/pendiente/i.test(valor);
}
