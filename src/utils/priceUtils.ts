/**
 * Converte o preço de centavos para reais
 * @param priceInCents Preço em centavos
 * @returns Preço formatado em reais com 2 casas decimais
 */
export function formatPrice(priceInCents: number): string {
  const priceInReais = Math.floor(priceInCents) / 100;
  return priceInReais.toFixed(2);
}

/**
 * Converte o preço de centavos para reais (valor numérico)
 * @param priceInCents Preço em centavos
 * @returns Preço em reais como número
 */
export function convertPrice(priceInCents: number): number {
  return Math.floor(priceInCents) / 100;
}
