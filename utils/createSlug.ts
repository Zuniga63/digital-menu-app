/**
 * Normaliza el texto, cambia los espacios por (-) ademas de eliminar
 * los signos de puntucacion.
 * @param {string} text Texto a normalizar
 * @returns String
 */
const createSlug = (text: string) =>
  text
    ? text
        .trim()
        .toLocaleLowerCase()
        .replace(/\s/gi, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    : '';

export default createSlug;
