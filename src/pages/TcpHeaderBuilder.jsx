import React, { useState } from "react";
import "@styles/TcpHeaderBuilder.css";
import { randomTcpHeader, hexToBin } from "../utils/tcpHeaderUtils";
import { textToHex } from "../utils/hexText";

const initialState = {
  sourcePort: "1234",
  destPort: "80",
  seqNumber: "00000000",
  ackNumber: "00000000",
  dataOffset: "5",
  reserved: "0",
  flags: "02",
  window: "4000",
  checksum: "0000",
  urgentPointer: "0000",
  options: "",
  data: ""
};

const campos = [
  { name: "sourcePort", label: "Puerto Origen", maxLength: 5, tooltip: "Puerto de origen (0-65535)", color: "#ffe082" },
  { name: "destPort", label: "Puerto Destino", maxLength: 5, tooltip: "Puerto de destino (0-65535)", color: "#80cbc4" },
  { name: "seqNumber", label: "Número de secuencia", maxLength: 8, tooltip: "Número de secuencia (32 bits, 8 hex)", color: "#b39ddb" },
  { name: "ackNumber", label: "Número de acuse (ACK)", maxLength: 8, tooltip: "Número de acuse de recibo (32 bits, 8 hex)", color: "#ffd54f" },
  { name: "dataOffset", label: "Data Offset", maxLength: 1, tooltip: "Longitud de cabecera en palabras de 32 bits", color: "#ffab91" },
  { name: "reserved", label: "Reservado", maxLength: 1, tooltip: "Bits reservados (debe ser 0)", color: "#a5d6a7" },
  { name: "flags", label: "Flags", maxLength: 2, tooltip: "Flags de control (2 hex: ej. 02=SYN, 10=ACK, 18=PSH+ACK)", color: "#ce93d8" },
  { name: "window", label: "Ventana", maxLength: 4, tooltip: "Tamaño de ventana (4 hex)", color: "#90caf9" },
  { name: "checksum", label: "Checksum", maxLength: 4, tooltip: "Suma de verificación (4 hex)", color: "#f48fb1" },
  { name: "urgentPointer", label: "Urgent Pointer", maxLength: 4, tooltip: "Puntero urgente (4 hex)", color: "#bcaaa4" },
  { name: "options", label: "Opciones", maxLength: 12, tooltip: "Opciones TCP (hex, opcional)", color: "#ffe082" },
  { name: "data", label: "Datos", maxLength: 32, tooltip: "Datos opcionales (texto plano)", color: "#fff176" }
];

const TcpHeaderBuilder = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [simulando, setSimulando] = useState(false);
  const [simMsg, setSimMsg] = useState("");
  const [showSim, setShowSim] = useState(false);

  // Validación específica por tipo de campo
  const validateField = (name, value) => {
    const portRegex = /^\d{1,5}$/;
    const hex8Regex = /^[0-9A-Fa-f]{8}$/;
    const hex2Regex = /^[0-9A-Fa-f]{2}$/;
    const hex4Regex = /^[0-9A-Fa-f]{4}$/;
    const hexVarRegex = /^[0-9A-Fa-f]{0,12}$/;
    
    // Si el campo está vacío pero es requerido
    if ((!value || value.trim() === '') && name !== 'options' && name !== 'data') {
      return 'Este campo es requerido';
    }
    
    switch (name) {
      case 'sourcePort':
      case 'destPort':
        if (!portRegex.test(value)) return 'Debe ser un número';
        const port = parseInt(value, 10);
        if (port < 0 || port > 65535) return 'Puerto inválido (0-65535)';
        if (port === 0) return 'El puerto 0 está reservado';
        if (port < 1024) return 'Puerto bien conocido (0-1023) - requiere privilegios';
        if (port < 49152) return 'Puerto registrado (1024-49151)';
        return '';
        
      case 'seqNumber':
      case 'ackNumber':
        if (!hex8Regex.test(value)) return 'Se requieren exactamente 8 dígitos hexadecimales';
        return '';
        
      case 'dataOffset':
        if (!/^\d+$/.test(value)) return 'Debe ser un número entre 5 y 15';
        const offset = parseInt(value, 10);
        if (offset < 5) return 'Mínimo 5 (20 bytes de cabecera)';
        if (offset > 15) return 'Máximo 15 (60 bytes de cabecera)';
        return '';
        
      case 'reserved':
        return value === '0' ? '' : 'Debe ser 0 (reservado según RFC 793)';
        
      case 'flags':
        if (!hex2Regex.test(value)) return 'Se requieren exactamente 2 dígitos hexadecimales';
        // Validar combinaciones comunes de flags
        const flags = parseInt(value, 16);
        // Verificar bits reservados (bits 6 y 7 deben ser 0)
        if ((flags & 0xC0) !== 0) return 'Bits 6 y 7 están reservados (deben ser 0)';
        // Validar combinaciones inválidas
        if ((flags & 0x01) && (flags & 0x04)) return 'FIN y RST no pueden estar activos juntos';
        if ((flags & 0x01) && !(flags & 0x02) && (flags & 0x10)) return 'FIN sin SYN no es común con ACK';
        return '';
        
      case 'window':
        if (!hex4Regex.test(value)) return 'Se requieren exactamente 4 dígitos hexadecimales';
        const windowSize = parseInt(value, 16);
        if (windowSize === 0) return 'Ventana de tamaño 0 no permitida';
        return '';
        
      case 'checksum':
        if (!hex4Regex.test(value)) return 'Se requieren exactamente 4 dígitos hexadecimales';
        return '';
        
      case 'urgentPointer':
        if (!hex4Regex.test(value)) return 'Se requieren exactamente 4 dígitos hexadecimales';
        const urgent = parseInt(value, 16);
        if (urgent > 0 && !(parseInt(values.flags || '00', 16) & 0x20)) {
          return 'URG debe estar activo si se usa Urgent Pointer';
        }
        return '';
        
      case 'options':
        if (value && !hexVarRegex.test(value)) return 'Máx 12 dígitos hexadecimales (hasta 40 bytes)';
        // Validar formato de opciones TCP si se proporcionan
        if (value) {
          const options = value.match(/.{1,2}/g) || [];
          for (let i = 0; i < options.length; i++) {
            const opt = parseInt(options[i], 16);
            
            // No-Operation (1 byte)
            if (opt === 1) continue;
            
            // End of Option List (1 byte)
            if (opt === 0) {
              // Debe ser la última opción
              if (i !== options.length - 1) return 'End of Option debe ser la última opción';
              continue;
            }
            
            // MSS (2 bytes de tipo y longitud + 2 bytes de valor)
            if (opt === 2) {
              if (i + 3 >= options.length) return 'Opción MSS incompleta';
              const len = parseInt(options[i + 1], 16);
              if (len !== 4) return 'Longitud MSS debe ser 4';
              i += 3; // Saltar los bytes de MSS
              continue;
            }
            
            // Window Scale (3 bytes)
            if (opt === 3) {
              if (i + 2 >= options.length) return 'Opción Window Scale incompleta';
              const len = parseInt(options[i + 1], 16);
              if (len !== 3) return 'Longitud Window Scale debe ser 3';
              i += 2; // Saltar los bytes de Window Scale
              continue;
            }
            
            // Timestamp (10 bytes)
            if (opt === 8) {
              if (i + 9 >= options.length) return 'Opción Timestamp incompleta';
              const len = parseInt(options[i + 1], 16);
              if (len !== 10) return 'Longitud Timestamp debe ser 10';
              i += 9; // Saltar los bytes de Timestamp
              continue;
            }
            
            // Si no es una opción reconocida
            if (i + 1 >= options.length) return 'Opción desconocida o incompleta';
            const len = parseInt(options[i + 1], 16);
            if (isNaN(len) || len < 2 || i + len > options.length) return 'Longitud de opción inválida';
            i += len - 1; // Saltar según la longitud de la opción
          }
        }
        return '';
        
      case 'data':
        // Validar longitud máxima de datos (opcional)
        if (value.length > 32) return 'Máximo 32 caracteres';
        return '';
        
      default:
        return '';
    }
  };

  // Validar todos los campos
  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Limpieza de entrada según el tipo de campo
    let cleanedValue = value;
    if (['sourcePort', 'destPort', 'dataOffset'].includes(name)) {
      // Solo números
      cleanedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'reserved') {
      // Forzar a 0 y no permitir otros valores
      cleanedValue = '0';
      // No permitir que el usuario cambie este valor
      e.target.value = '0';
    } else if (['seqNumber', 'ackNumber', 'flags', 'window', 'checksum', 'urgentPointer', 'options'].includes(name)) {
      // Solo hexadecimal
      cleanedValue = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    }
    
    // Aplicar límites de longitud
    const field = campos.find(f => f.name === name);
    if (field && field.maxLength && cleanedValue.length > field.maxLength) {
      cleanedValue = cleanedValue.slice(0, field.maxLength);
    }
    
    // Actualizar estado
    setValues(prev => ({
      ...prev,
      [name]: cleanedValue
    }));
    
    // Validación en tiempo real
    const error = validateField(name, cleanedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
  };

  // Construcción de la cabecera en hex
  const headerHex =
    parseInt(values.sourcePort).toString(16).padStart(4, "0").toUpperCase() +
    parseInt(values.destPort).toString(16).padStart(4, "0").toUpperCase() +
    values.seqNumber.toUpperCase() +
    values.ackNumber.toUpperCase() +
    parseInt(values.dataOffset).toString(16).padStart(1, "0").toUpperCase() +
    parseInt(values.reserved).toString(16).padStart(1, "0").toUpperCase() +
    values.flags.toUpperCase() +
    values.window.toUpperCase() +
    values.checksum.toUpperCase() +
    values.urgentPointer.toUpperCase() +
    (values.options ? values.options.toUpperCase() : "");

  const headerBin = hexToBin(headerHex);
  const datosHex = textToHex(values.data);

  // Visualización gráfica de campos
  const visualFields = [
    { ...campos[0], value: parseInt(values.sourcePort).toString(16).padStart(4, "0").toUpperCase() },
    { ...campos[1], value: parseInt(values.destPort).toString(16).padStart(4, "0").toUpperCase() },
    { ...campos[2], value: values.seqNumber.toUpperCase() },
    { ...campos[3], value: values.ackNumber.toUpperCase() },
    { ...campos[4], value: parseInt(values.dataOffset).toString(16).padStart(1, "0").toUpperCase() },
    { ...campos[5], value: parseInt(values.reserved).toString(16).padStart(1, "0").toUpperCase() },
    { ...campos[6], value: values.flags.toUpperCase() },
    { ...campos[7], value: values.window.toUpperCase() },
    { ...campos[8], value: values.checksum.toUpperCase() },
    { ...campos[9], value: values.urgentPointer.toUpperCase() },
    { ...campos[10], value: values.options ? values.options.toUpperCase() : "-" },
    { ...campos[11], value: datosHex },
  ];

  const handleRandom = () => {
    setValues(randomTcpHeader());
    setShowSim(false);
    setSimMsg("");
    setErrors({});
  };

  const handleSimular = () => {
    setSimulando(true);
    setSimMsg("");
    setTimeout(() => {
      setSimulando(false);
      setShowSim(true);
    }, 1200);
  };

  return (
    <div className="tcp-header-builder-row">
      <div className="tcp-header-builder">
        <h2 className="tcp-section-title">Constructor de cabecera TCP</h2>
        <form className="tcp-form" autoComplete="off">
          {campos.map((campo) => (
            <div className="tcp-form-group" key={campo.name}>
              <label title={campo.tooltip} htmlFor={campo.name}>{campo.label}</label>
              <input
                id={campo.name}
                name={campo.name}
                type="text"
                maxLength={campo.maxLength}
                value={values[campo.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={campo.label}
                className={errors[campo.name] ? "error" : ""}
                title={campo.tooltip}
              />
              {errors[campo.name] && (
                <span className="tcp-error">{errors[campo.name]}</span>
              )}
            </div>
          ))}
        </form>
        <div className="tcp-btns-row">
          <button className="tcp-sim-btn random" type="button" onClick={handleRandom}>
            Generar datos aleatorios
          </button>
          <button 
            className="tcp-sim-btn" 
            type="button" 
            onClick={handleSimular}
            disabled={simulando}
          >
            {simulando ? 'Simulando...' : 'Simular envío'}
          </button>
        </div>
        {showSim && (
          <div className="tcp-sim-msg">
            <strong>Simulación:</strong> La cabecera fue encapsulada y enviada.<br/>
            <span style={{fontSize:'0.98em',color:'#222',wordBreak:'break-all'}}>
              <strong>Hex:</strong> {headerHex}<br/>
              <strong>Binario:</strong> {headerBin}
            </span>
          </div>
        )}
        <div className="tcp-header-visual">
          <h3>Cabecera generada</h3>
          <div className="tcp-header-hex">
            <span>Hex:</span> <code>{headerHex || "-"}</code>
          </div>
          <div className="tcp-header-bin">
            <span>Binario:</span> <code style={{ wordBreak: "break-all" }}>{headerBin || "-"}</code>
          </div>
          <div className="tcp-header-graphic">
            {visualFields.map((field, i) => (
              <span
                key={field.name}
                className="tcp-header-field"
                data-tooltip={field.tooltip}
                style={{
                  background: field.color,
                  padding: "0.2em 0.4em",
                  marginRight: 4,
                  borderRadius: 6,
                  fontWeight: 600,
                  color: "#222",
                  cursor: "pointer",
                }}
              >
                {field.label}: {field.value || "-"}
              </span>
            ))}
          </div>
          <div className="tcp-header-datos-hex" style={{marginTop:8}}>
            <span>Datos (hex):</span> <code>{datosHex || "-"}</code>
          </div>
        </div>
      </div>
      <aside className="tcp-header-builder-info">
        <h3 className="tcp-info-title">Instrucciones</h3>
        <ol className="tcp-info-list">
          <li>Ingrese los campos de la cabecera TCP según corresponda. Puede usar el botón de aleatorio para ver ejemplos.</li>
          <li>Los puertos deben estar en el rango 0-65535.</li>
          <li>Los campos hexadecimales deben tener la longitud indicada y solo contener dígitos hexadecimales válidos.</li>
          <li>El campo "Datos" es opcional y se convierte automáticamente a hexadecimal.</li>
          <li>Puede ver la cabecera generada en hexadecimal, binario y visualmente por campo.</li>
          <li>Haga clic en "Simular envío" para ver la simulación de encapsulamiento.</li>
        </ol>
        <h3 className="tcp-info-title">Acerca de</h3>
        <p className="tcp-info-text">
          Constructor de cabeceras TCP para aprendizaje sobre redes y protocolos. Soporta generación de campos aleatorios y visualización avanzada.
        </p>
        <h3 className="tcp-info-title">Descripción de la cabecera TCP</h3>
        <p><b>Puerto Origen:</b> Puerto del dispositivo que envía el segmento.</p>
        <p><b>Puerto Destino:</b> Puerto del dispositivo receptor.</p>
        <p><b>Número de secuencia:</b> Identifica el orden de los bytes enviados, esencial para la entrega ordenada y la retransmisión.</p>
        <p><b>Número de acuse (ACK):</b> Indica el siguiente byte que el receptor espera recibir, confirmando la recepción de datos previos.</p>
        <p><b>Data Offset:</b> Longitud de la cabecera TCP en palabras de 32 bits.</p>
        <p><b>Reservado:</b> Bits reservados para uso futuro, deben estar en cero.</p>
        <p><b>Flags:</b> Bits de control que gestionan el establecimiento, finalización y control de la conexión (SYN, ACK, FIN, RST, PSH, URG).</p>
        <p><b>Ventana:</b> Tamaño de la ventana de recepción, usado para control de flujo.</p>
        <p><b>Checksum:</b> Suma de verificación para detectar errores en la cabecera y los datos.</p>
        <p><b>Urgent Pointer:</b> Indica si hay datos urgentes en el segmento.</p>
        <p><b>Opciones:</b> Permite funcionalidades adicionales como escalado de ventana o timestamps.</p>
        <p><b>Datos:</b> Información transportada por el segmento, normalmente datos de la aplicación.</p>
      </aside>
    </div>
  );
};

export default TcpHeaderBuilder;
