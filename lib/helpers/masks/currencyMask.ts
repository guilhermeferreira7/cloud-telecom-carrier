/** 123,00 */
export function currencyMask(value: string) {
  // Remove qualquer caractere que não seja número
  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    // Para números com 3 ou menos dígitos, adiciona o prefixo "0"
    cleaned = cleaned.padStart(3, "0");
  }

  // Insere a vírgula antes dos últimos dois dígitos
  let formatted = cleaned.replace(/(\d+)(\d{2})$/, "$1,$2");

  // Remove zeros à esquerda
  formatted = formatted.replace(/^0+(\d+,\d{2})$/, "$1");

  return formatted;
}
