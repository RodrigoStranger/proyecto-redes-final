// Utilidades para el builder de cabecera TCP
import { randomText } from "./ethernetHeaderUtils";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomHex(len) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return out;
}

export function randomTcpHeader() {
  return {
    sourcePort: randomInt(1024, 65535).toString(),
    destPort: randomInt(1, 1023).toString(),
    seqNumber: randomHex(8),
    ackNumber: randomHex(8),
    dataOffset: "5",
    reserved: "0",
    flags: ["02", "10", "18"][randomInt(0,2)], // SYN, ACK, PSH+ACK
    window: randomHex(4),
    checksum: randomHex(4),
    urgentPointer: randomHex(4),
    options: randomHex(randomInt(0, 12)),
    data: randomText(randomInt(0, 20)),
  };
}

export { hexToBin } from "./hexText";
