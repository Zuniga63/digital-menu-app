export default function currencyFormat(value: string | number | undefined, fractionDigits: number = 0): string {
  if (value) {
    const style = 'currency';
    const currency = 'COP';
    const formarter = new Intl.NumberFormat('es-CO', {
      style,
      currency,
      minimumFractionDigits: fractionDigits,
    });

    if (typeof value === 'string') {
      const parseValue = parseFloat(value);
      if (Number.isNaN(parseValue)) {
        return value.toString();
      }

      return formarter.format(parseValue);
    }

    return formarter.format(value);
  }

  return String(value);
}
