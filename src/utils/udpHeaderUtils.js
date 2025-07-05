/**
 * Genera una cabecera UDP aleatoria
 * @returns {Object} Objeto con los campos de la cabecera UDP
 */
export const randomUdpHeader = () => {
  // Puertos bien conocidos (0-1023), registrados (1024-49151) y dinámicos/privados (49152-65535)
  const sourcePort = Math.floor(Math.random() * 65536);
  const destPort = [53, 67, 68, 69, 123, 161, 162, 500, 514, 520][Math.floor(Math.random() * 10)];
  
  return {
    sourcePort: sourcePort.toString(),
    destPort: destPort.toString(),
    length: '8', // Mínimo 8 bytes (solo cabecera)
    checksum: Math.floor(Math.random() * 65536).toString(16).padStart(4, '0').toUpperCase()
  };
};

/**
 * Convierte un número a su representación binaria de 16 bits
 * @param {number} num - Número a convertir
 * @returns {string} Representación binaria de 16 bits
 */
export const to16BitBinary = (num) => {
  return parseInt(num, 10).toString(2).padStart(16, '0');
};

/**
 * Valida un puerto UDP
 * @param {string} port - Puerto a validar
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export const validatePort = (port) => {
  if (!/^\d+$/.test(port)) return 'Debe ser un número';
  const portNum = parseInt(port, 10);
  if (portNum < 0 || portNum > 65535) return 'Puerto inválido (0-65535)';
  if (portNum === 0) return 'El puerto 0 está reservado';
  return '';
};
