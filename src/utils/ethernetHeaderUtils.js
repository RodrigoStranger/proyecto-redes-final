// Funciones utilitarias para EthernetHeaderBuilder

// Genera un string hexadecimal aleatorio de longitud len
export function randomHex(len) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return out;
}

// Genera un string de texto aleatorio de longitud len
export function randomText(len) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

// Genera una dirección MAC aleatoria válida
export function randomMac() {
  return Array(6)
    .fill(0)
    .map(() => {
      const val = randomHex(2).padStart(2, '0');
      return val.length === 2 ? val : '00';
    })
    .join(":");
}

// Selecciona un Ethertype válido aleatorio de la lista importada
import { ETHERTYPES_VALIDOS } from "./ethertypes";
export function randomEthertype() {
  return ETHERTYPES_VALIDOS[Math.floor(Math.random() * ETHERTYPES_VALIDOS.length)];
}
