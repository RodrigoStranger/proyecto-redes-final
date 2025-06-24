// Validaciones reutilizables para campos de Ethernet

// Valida una dirección MAC en formato XX:XX:XX:XX:XX:XX (hexadecimal, mayúsculas o minúsculas)
export function validarMac(mac) {
  if (!mac) return "Campo requerido";
  const macTrim = mac.trim();
  if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(macTrim)) {
    return `MAC inválida: "${macTrim}". Debe tener el formato XX:XX:XX:XX:XX:XX`;
  }
  return null;
}

// Puedes agregar más validaciones aquí si lo necesitas
