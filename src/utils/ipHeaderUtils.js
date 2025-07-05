// Utilidades para el builder de cabecera IP
import { randomText } from "./ethernetHeaderUtils";

// Genera un número aleatorio en un rango [min, max]
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera una IP aleatoria válida (no de red ni broadcast)
export function randomIp() {
  return [
    randomInt(10, 223),
    randomInt(0, 255),
    randomInt(0, 255),
    randomInt(1, 254)
  ].join(".");
}

// Genera un campo hexadecimal aleatorio de longitud len
export function randomHex(len) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return out;
}

// Genera un objeto con valores aleatorios válidos para la cabecera IP
export function randomIpHeader() {
  return {
    version: "4",
    ihl: "5",
    tos: randomHex(2),
    totalLength: randomHex(4),
    identification: randomHex(4),
    flags: randomHex(1),
    fragmentOffset: randomHex(4),
    ttl: randomHex(2),
    protocol: ["06", "11", "01"][randomInt(0,2)], // TCP, UDP, ICMP
    headerChecksum: randomHex(4),
    sourceIp: randomIp(),
    destIp: randomIp(),
    data: randomText(randomInt(0, 20)),
  };
}

// Convierte un string hexadecimal a binario (usa la de hexText.js)
export { hexToBin } from "./hexText";
