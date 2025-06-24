// Convierte un string de texto plano a hexadecimal
export function textToHex(str) {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('').toUpperCase();
}

// Convierte un string hexadecimal a texto plano
export function hexToText(hex) {
  let out = '';
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (!isNaN(code)) out += String.fromCharCode(code);
  }
  return out;
}

// Convierte un string hexadecimal a binario
export function hexToBin(hex) {
  return hex
    .replace(/[^0-9A-Fa-f]/g, "")
    .split("")
    .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
    .join("");
}

// Formatea un string hexadecimal (quita caracteres no hex y lo pone en mayúsculas)
export function formatHex(str) {
  return str.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
}
