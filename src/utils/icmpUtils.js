/**
 * Utilidades para el manejo y validación de cabeceras ICMP
 */

/**
 * Valida un campo según su tipo
 * @param {string} name - Nombre del campo
 * @param {string} value - Valor a validar
 * @returns {string} - Mensaje de error o cadena vacía si es válido
 */
export const validateField = (name, value) => {
  const hex2Regex = /^[0-9A-Fa-f]{0,2}$/;
  const hex4Regex = /^[0-9A-Fa-f]{0,4}$/;
  
  // Si el campo está vacío pero es requerido
  if ((!value || value.trim() === '') && name !== 'data') {
    return 'Este campo es requerido';
  }
  
  switch (name) {
    case 'type':
    case 'code':
      if (!hex2Regex.test(value)) return '2 dígitos hexadecimales';
      return '';
      
    case 'checksum':
    case 'identifier':
    case 'sequence':
      if (!hex4Regex.test(value)) return '4 dígitos hexadecimales';
      return '';
      
    case 'data':
      // Validar que los datos sean ASCII imprimibles
      if (value && !/^[\x20-\x7E\s]*$/.test(value)) {
        return 'Solo caracteres ASCII imprimibles';
      }
      return '';
      
    default:
      return '';
  }
};

/**
 * Valida todos los campos del formulario
 * @param {Object} values - Valores del formulario
 * @returns {Object} - Objeto con errores
 */
export const validateAllFields = (values) => {
  const errors = {};
  
  Object.keys(values).forEach(key => {
    const error = validateField(key, values[key]);
    if (error) {
      errors[key] = error;
    }
  });
  
  return errors;
};

/**
 * Genera valores aleatorios para los campos
 * @returns {Object} - Objeto con valores aleatorios
 */
export const generateRandomValues = () => {
  const randomHex = (bytes) => {
    const max = Math.pow(16, bytes * 2) - 1;
    return Math.floor(Math.random() * max).toString(16).padStart(bytes * 2, '0');
  };
  
  return {
    type: '08', // Echo Request
    code: '00',
    checksum: randomHex(2),
    identifier: randomHex(2),
    sequence: randomHex(2),
    data: 'Ping ' + Math.floor(Math.random() * 1000)
  };
};

/**
 * Calcula el checksum de la cabecera ICMP
 * @param {Object} values - Valores de la cabecera
 * @returns {string} - Checksum en formato hexadecimal
 */
export const calculateChecksum = (values) => {
  // Convertir todos los campos a una cadena hexadecimal
  const { type, code, checksum, identifier, sequence } = values;
  const data = values.data ? stringToHex(values.data) : '';
  
  // Crear un buffer con los datos
  const hexStr = (
    type.padStart(2, '0') +
    code.padStart(2, '0') +
    '0000' + // checksum inicial en 0
    identifier.padStart(4, '0') +
    sequence.padStart(4, '0') +
    data
  );
  
  // Si la longitud es impar, agregar un 0 al final
  const paddedHex = hexStr.length % 2 === 0 ? hexStr : hexStr + '0';
  
  // Calcular el checksum
  let sum = 0;
  for (let i = 0; i < paddedHex.length; i += 4) {
    const word = paddedHex.substr(i, 4);
    sum += parseInt(word, 16);
  }
  
  // Sumar el acarreo
  while (sum > 0xFFFF) {
    sum = (sum & 0xFFFF) + (sum >> 16);
  }
  
  // Complemento a uno
  const calculatedChecksum = (~sum & 0xFFFF).toString(16).toUpperCase();
  return calculatedChecksum.padStart(4, '0');
};

/**
 * Convierte una cadena a su representación hexadecimal
 * @param {string} str - Cadena a convertir
 * @returns {string} - Representación hexadecimal
 */
export const stringToHex = (str) => {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
};

/**
 * Obtiene la descripción de un tipo de mensaje ICMP
 * @param {string} type - Tipo de mensaje en hexadecimal
 * @returns {string} - Descripción del tipo
 */
export const getTypeDescription = (type) => {
  const types = {
    "00": "Echo Reply",
    "03": "Destination Unreachable",
    "04": "Source Quench",
    "05": "Redirect Message",
    "08": "Echo Request",
    "0B": "Time Exceeded",
    "0C": "Parameter Problem",
    "0D": "Timestamp",
    "0E": "Timestamp Reply",
    "0F": "Information Request",
    "10": "Information Reply"
  };
  return types[type] || "Tipo desconocido";
};

/**
 * Formatea un valor para mostrarlo en binario
 * @param {string} value - Valor en hexadecimal
 * @param {number} bytes - Número de bytes a formatear
 * @returns {string} - Valor formateado en binario
 */
export const toBinary = (value, bytes = 2) => {
  if (!value) return "";
  const hex = value.toString(16).padStart(bytes * 2, '0');
  return parseInt(hex, 16)
    .toString(2)
    .padStart(bytes * 8, '0')
    .match(new RegExp(`.{1,${bytes > 1 ? 8 : 4}}`, 'g'))
    .join(' ');
};
