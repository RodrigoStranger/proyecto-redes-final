import React, { useState } from "react";
import "./styles/UdpHeaderBuilder.css";

const initialState = {
  sourcePort: "1234",
  destPort: "53",
  length: "8",
  checksum: "0000",
  data: ""
};

const campos = [
  { name: "sourcePort", label: "Puerto Origen", maxLength: 5, tooltip: "Puerto de origen (0-65535)", color: "#ffe082" },
  { name: "destPort", label: "Puerto Destino", maxLength: 5, tooltip: "Puerto de destino (0-65535)", color: "#80cbc4" },
  { name: "length", label: "Longitud", maxLength: 5, tooltip: "Longitud del datagrama en bytes (mínimo 8)", color: "#b39ddb" },
  { name: "checksum", label: "Checksum", maxLength: 4, tooltip: "Suma de verificación (4 hex)", color: "#90caf9" },
  { name: "data", label: "Datos", maxLength: 32, tooltip: "Datos opcionales (texto plano)", color: "#fff176" }
];

const UdpHeaderBuilder = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [simulando, setSimulando] = useState(false);
  const [simMsg, setSimMsg] = useState("");
  const [showSim, setShowSim] = useState(false);
  const [showBinary, setShowBinary] = useState(false);
  const [copied, setCopied] = useState(false);

  // Validación específica por tipo de campo
  const validateField = (name, value) => {
    const portRegex = /^\d{1,5}$/;
    const hex4Regex = /^[0-9A-Fa-f]{4}$/;
    
    // Si el campo está vacío pero es requerido
    if ((!value || value.trim() === '') && name !== 'data') {
      return 'Este campo es requerido';
    }
    
    switch (name) {
      case 'sourcePort':
      case 'destPort':
        if (!portRegex.test(value)) return 'Debe ser un número';
        const port = parseInt(value, 10);
        if (port < 0 || port > 65535) return 'Puerto inválido (0-65535)';
        if (port === 0) return 'El puerto 0 está reservado';
        return '';
        
      case 'length':
        if (!/^\d+$/.test(value)) return 'Debe ser un número';
        const length = parseInt(value, 10);
        if (length < 8) return 'Mínimo 8 (cabecera UDP)';
        if (length > 65535) return 'Máximo 65535 bytes';
        return '';
        
      case 'checksum':
        if (!hex4Regex.test(value)) return 'Se requieren 4 dígitos hexadecimales';
        return '';
        
      case 'data':
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
    if (['sourcePort', 'destPort', 'length'].includes(name)) {
      // Solo números
      cleanedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'checksum') {
      // Solo hexadecimal en mayúsculas
      cleanedValue = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    }
    
    // Validar el campo
    const error = validateField(name, cleanedValue);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Actualizar el estado
    setValues(prev => ({
      ...prev,
      [name]: cleanedValue
    }));
  };

  // Generar valores aleatorios
  const generateRandom = () => {
    const randomValues = {
      sourcePort: Math.floor(1024 + Math.random() * 64511).toString(), // 1024-65535
      destPort: Math.floor(1 + Math.random() * 65534).toString(), // 1-65534
      length: Math.floor(8 + Math.random() * 100).toString(), // 8-107
      checksum: Math.floor(Math.random() * 65536).toString(16).padStart(4, '0').toUpperCase(),
      data: ''
    };
    
    setValues(randomValues);
    setErrors({});
  };

  // Simular envío
  const simularEnvio = () => {
    if (!validateAll()) {
      setSimMsg("Por favor, corrija los errores antes de continuar.");
      setShowSim(true);
      return;
    }
    
    setSimulando(true);
    
    // Simular tiempo de envío
    setTimeout(() => {
      setSimulando(false);
      setShowSim(true);
      
      const dataInfo = values.data 
        ? `\nDatos: ${values.data}` 
        : '\nSin datos adjuntos';
      
      setSimMsg(
        `¡Paquete UDP enviado exitosamente!\n\n` +
        `Puerto Origen: ${values.sourcePort}\n` +
        `Puerto Destino: ${values.destPort}\n` +
        `Longitud: ${values.length} bytes\n` +
        `Checksum: 0x${values.checksum}` +
        dataInfo
      );
    }, 1000);
  };

  // Copiar al portapapeles
  const copyToClipboard = () => {
    const header = 
      `Puerto Origen: ${values.sourcePort}\n` +
      `Puerto Destino: ${values.destPort}\n` +
      `Longitud: ${values.length} bytes\n` +
      `Checksum: 0x${values.checksum}`;
    
    navigator.clipboard.writeText(header);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convertir a binario
  const toBinary = (value, bits = 16) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return '0'.repeat(bits);
    return num.toString(2).padStart(bits, '0');
  };

  // Convertir a hexadecimal
  const toHex = (value, digits = 4) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return '0'.repeat(digits / 2);
    return num.toString(16).padStart(digits, '0').toUpperCase();
  };

  // Renderizar campo del formulario
  const renderField = (field) => {
    const { name, label, maxLength } = field;
    const value = values[name];
    const error = errors[name];
    
    return (
      <div key={name} className="udp-form-group">
        <label htmlFor={name}>
          {label}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={error ? 'error' : ''}
          placeholder={name === 'data' ? 'Opcional' : ''}
        />
        {error && <div className="udp-error">{error}</div>}
      </div>
    );
  };

  return (
    <div className="udp-header-builder-row">
      <div className="udp-header-builder">
        <h2>Constructor de Cabecera UDP</h2>
        
        <div className="udp-form">
          {campos.map(field => renderField(field))}
        </div>
        
        <div className="udp-btns-row">
          <button 
            className="udp-sim-btn"
            onClick={simularEnvio}
            disabled={simulando}
          >
            {simulando ? 'Enviando...' : 'Enviar Datagrama'}
          </button>
          
          <button 
            className="udp-sim-btn random"
            onClick={generateRandom}
            disabled={simulando}
          >
            Generar Aleatorio
          </button>
        </div>
        
        {showSim && (
          <div className={`udp-sim-msg ${simulando ? 'sending' : ''}`}>
            {simMsg.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
        
        <div className="udp-header-visual">
          <h3>Visualización de la Cabecera UDP</h3>
          
          <div className="udp-header-graphic">
            <div className="udp-header-field" style={{ backgroundColor: campos[0].color }}>
              <div className="field-name">Puerto Origen</div>
              <div className="field-value">
                {showBinary ? toBinary(values.sourcePort) : values.sourcePort}
              </div>
            </div>
            
            <div className="udp-header-field" style={{ backgroundColor: campos[1].color }}>
              <div className="field-name">Puerto Destino</div>
              <div className="field-value">
                {showBinary ? toBinary(values.destPort) : values.destPort}
              </div>
            </div>
            
            <div className="udp-header-field" style={{ backgroundColor: campos[2].color }}>
              <div className="field-name">Longitud</div>
              <div className="field-value">
                {showBinary ? toBinary(values.length) : values.length}
              </div>
            </div>
            
            <div className="udp-header-field" style={{ backgroundColor: campos[3].color }}>
              <div className="field-name">Checksum</div>
              <div className="field-value">
                {showBinary ? toBinary(parseInt(values.checksum, 16)) : `0x${values.checksum}`}
              </div>
            </div>
          </div>
          
          <div className="udp-view-toggle">
            <button 
              className={!showBinary ? 'active' : ''}
              onClick={() => setShowBinary(false)}
            >
              Decimal/Hex
            </button>
            <button 
              className={showBinary ? 'active' : ''}
              onClick={() => setShowBinary(true)}
            >
              Binario
            </button>
          </div>
          

        </div>
      </div>
      
      <aside className="udp-header-builder-info">
        <h3 className="udp-info-title">Instrucciones</h3>
        <ol className="udp-info-list">
          <li>Ingrese los campos de la cabecera UDP según corresponda. Puede usar el botón de aleatorio para ver ejemplos.</li>
          <li>Los puertos deben estar en el rango 0-65535.</li>
          <li>El campo "Longitud" debe ser al menos 8 (tamaño de la cabecera UDP).</li>
          <li>El campo "Checksum" debe tener 4 dígitos hexadecimales (puede ser 0000).</li>
          <li>El campo "Datos" es opcional y se convierte automáticamente a hexadecimal.</li>
          <li>Haga clic en "Simular envío" para ver la simulación de encapsulamiento.</li>
        </ol>
        
        <h3 className="udp-info-title">Campos de la Cabecera UDP</h3>
        <p className="udp-info-text">
          La cabecera UDP tiene una estructura simple de 8 bytes que contiene la información esencial para el enrutamiento y procesamiento de los datagramas:
        </p>
        <ul className="udp-info-list">
          <li><strong>Puerto Origen (2 bytes):</strong> Identifica la aplicación que envía el datagrama. Puede ser 0 si el origen no requiere respuesta.</li>
          <li><strong>Puerto Destino (2 bytes):</strong> Identifica la aplicación de destino. Debe coincidir con un puerto en escucha en el equipo receptor.</li>
          <li><strong>Longitud (2 bytes):</strong> Especifica la longitud total del datagrama en bytes, incluyendo cabecera y datos. Mínimo 8 bytes (solo cabecera).</li>
          <li><strong>Checksum (2 bytes):</strong> Suma de verificación opcional para detectar errores en la cabecera y datos. Si no se usa, debe ser 0x0000.</li>
          <li><strong>Datos (variable):</strong> Los datos de la aplicación. No es parte de la cabecera pero se incluye en el datagrama.</li>
        </ul>
        
        <h3 className="udp-info-title">Curiosidades y Datos</h3>
        <ul className="udp-info-list">
          <li>UDP es utilizado por el protocolo DNS en consultas estándar, donde la velocidad es más importante que la entrega garantizada.</li>
          <li>Juegos en línea como Fortnite y Call of Duty usan UDP para minimizar la latencia durante las partidas.</li>
          <li>El streaming de video en plataformas como YouTube y Netflix utiliza UDP para transmitir datos de manera eficiente.</li>
          <li>El protocolo DHCP (asignación automática de direcciones IP) utiliza UDP en sus comunicaciones.</li>
          <li>El puerto UDP 53 es uno de los más importantes de Internet, ya que es el estándar para consultas DNS.</li>
        </ul>
        
        <h3 className="udp-info-title">Acerca de</h3>
        <p className="udp-info-text">
          Constructor de cabeceras UDP para aprendizaje sobre redes y protocolos. Esta herramienta te permite experimentar con los diferentes campos de la cabecera UDP y comprender cómo se estructura este protocolo fundamental de la capa de transporte.
        </p>
      </aside>
    </div>
  );
};

export default UdpHeaderBuilder;