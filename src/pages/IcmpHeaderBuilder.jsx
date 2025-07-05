import React, { useState } from "react";
import "@styles/IcmpHeaderBuilder.css";
import {
  validateField,
  validateAllFields,
  generateRandomValues,
  calculateChecksum,
  getTypeDescription,
  toBinary
} from "../utils/icmpUtils";

const initialState = {
  type: "08",
  code: "00",
  checksum: "0000",
  identifier: "0000",
  sequence: "0000",
  data: ""
};

const campos = [
  { name: "type", label: "Tipo", maxLength: 2, tooltip: "Tipo de mensaje ICMP (ej: 08 para Echo Request)", color: "#ffe082" },
  { name: "code", label: "Código", maxLength: 2, tooltip: "Código del tipo de mensaje", color: "#80cbc4" },
  { name: "checksum", label: "Checksum", maxLength: 4, tooltip: "Suma de verificación (4 dígitos hex)", color: "#b39ddb" },
  { name: "identifier", label: "Identificador", maxLength: 4, tooltip: "Identificador (2 bytes en hex)", color: "#90caf9" },
  { name: "sequence", label: "Número de secuencia", maxLength: 4, tooltip: "Número de secuencia (2 bytes en hex)", color: "#a5d6a7" },
  { name: "data", label: "Datos", maxLength: 32, tooltip: "Datos opcionales (texto plano)", color: "#fff176" }
];

const IcmpHeaderBuilder = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [simulando, setSimulando] = useState(false);
  const [simMsg, setSimMsg] = useState("");
  const [showSim, setShowSim] = useState(false);
  const [showBinary, setShowBinary] = useState(false);
  const [copied, setCopied] = useState(false);

  // Validación específica por tipo de campo
  const validateField = (name, value) => {
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
        if (value.length > 32) return 'Máximo 32 caracteres';
        return '';
        
      default:
        return '';
    }
  };

  // Validar todos los campos
  const validateAll = () => {
    const newErrors = validateAllFields(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setValues(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Generar valores aleatorios
  const generateRandom = () => {
    const randomValues = generateRandomValues();
    setValues(randomValues);
    setErrors({});
  };

  // Reiniciar formulario
  const handleReset = () => {
    setValues(initialState);
    setErrors({});
    setShowSim(false);
    setShowBinary(false);
  };

  // Simular envío
  const simularEnvio = () => {
    if (!validateAll()) return;
    
    // Calcular el checksum antes de enviar
    const calculatedChecksum = calculateChecksum(values);
    
    setSimulando(true);
    setShowSim(true);
    
    // Simular tiempo de envío
    setTimeout(() => {
      setSimulando(false);
      setSimMsg(
        `¡Paquete ICMP enviado con éxito!\n` +
        `Tipo: ${values.type} (${getTypeDescription(values.type)})\n` +
        `Código: ${values.code}\n` +
        `Checksum calculado: 0x${calculatedChecksum}\n` +
        `Identificador: 0x${values.identifier}\n` +
        `Número de secuencia: 0x${values.sequence}`
      );
    }, 1500);
  };

  // Usamos getTypeDescription de icmpUtils.js

  // Usamos toBinary de icmpUtils.js

  // Copiar al portapapeles
  const copyToClipboard = () => {
    const header = `${values.type}${values.code}${values.checksum}${values.identifier}${values.sequence}${values.data}`;
    navigator.clipboard.writeText(header);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Renderizar campo del formulario
  const renderField = (field) => {
    const { name, label, maxLength } = field;
    const value = values[name];
    const error = errors[name];
    
    return (
      <div key={name} className="icmp-form-group">
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
          placeholder={field.placeholder || ''}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  return (
    <div className="icmp-header-builder-row">
      <div className="icmp-header-builder">
        <h2>Constructor de Cabecera ICMP</h2>
        
        <div className="icmp-form">
          {campos.map(renderField)}
        </div>

        <div className="icmp-btns-row">
          <button 
            className="icmp-sim-btn random"
            onClick={generateRandom}
            disabled={simulando}
          >
            Generar Aleatorio
          </button>
          <button 
            className="icmp-sim-btn"
            onClick={simularEnvio}
            disabled={simulando}
          >
            {simulando ? 'Simulando...' : 'Simular envío'}
          </button>
        </div>

        {showSim && (
          <div className={`simulation-message ${simulando ? 'sending' : ''}`}>
            {simMsg.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}

        <div className="icmp-header-visual">
          <h3>Visualización de la Cabecera ICMP</h3>
          
          <div className="icmp-header-grid">
            <div className="icmp-header-field" style={{ backgroundColor: campos[0].color }}>
              <div className="field-label">Tipo</div>
              <div className="field-value">
                {showBinary ? toBinary(values.type) : values.type}
              </div>
            </div>
            
            <div className="icmp-header-field" style={{ backgroundColor: campos[1].color }}>
              <div className="field-label">Código</div>
              <div className="field-value">
                {showBinary ? toBinary(values.code) : values.code}
              </div>
            </div>
            
            <div className="icmp-header-field" style={{ backgroundColor: campos[2].color }}>
              <div className="field-label">Checksum</div>
              <div className="field-value">
                {showBinary ? toBinary(values.checksum) : values.checksum}
              </div>
            </div>
            
            <div className="icmp-header-field" style={{ backgroundColor: campos[3].color }}>
              <div className="field-label">Identificador</div>
              <div className="field-value">
                {showBinary ? toBinary(values.identifier) : values.identifier}
              </div>
            </div>
            
            <div className="icmp-header-field" style={{ backgroundColor: campos[4].color }}>
              <div className="field-label">Núm. Secuencia</div>
              <div className="field-value">
                {showBinary ? toBinary(values.sequence) : values.sequence}
              </div>
            </div>
            
            {values.data && (
              <div className="icmp-header-field" style={{ backgroundColor: campos[5].color, gridColumn: '1 / -1' }}>
                <div className="field-label">Datos</div>
                <div className="field-value">
                  {values.data}
                </div>
              </div>
            )}
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
      
      <aside className="icmp-info-panel">
        <h3 className="icmp-info-title">Instrucciones</h3>
        <ol className="icmp-info-list">
          <li>Ingrese los campos de la cabecera ICMP según corresponda. Puede usar el botón de aleatorio para ver ejemplos.</li>
          <li>Los campos Tipo y Código deben tener 2 dígitos hexadecimales.</li>
          <li>Los campos Checksum, Identificador y Número de Secuencia deben tener 4 dígitos hexadecimales.</li>
          <li>El campo Datos es opcional y se convierte automáticamente a hexadecimal.</li>
          <li>Haga clic en "Simular envío" para ver la simulación de encapsulamiento.</li>
        </ol>
        
        <h3 className="icmp-info-title">Campos de la Cabecera ICMP</h3>
        <ul className="icmp-info-list">
          <li><strong>Tipo (1 byte):</strong> Identifica el tipo de mensaje ICMP. Por ejemplo, 08 para Echo Request (ping) y 00 para Echo Reply (respuesta).</li>
          <li><strong>Código (1 byte):</strong> Proporciona información adicional sobre el tipo de mensaje. Por ejemplo, en mensajes de "Destination Unreachable", especifica el motivo de la inaccesibilidad.</li>
          <li><strong>Checksum (2 bytes):</strong> Suma de verificación usada para detectar errores en la cabecera ICMP. Se calcula sobre toda la cabecera ICMP.</li>
          <li><strong>Identificador (2 bytes):</strong> En mensajes Echo Request/Reply, ayuda a hacer coincadir solicitudes con respuestas. Útil cuando hay múltiples pings en ejecución.</li>
          <li><strong>Número de secuencia (2 bytes):</strong> En mensajes Echo, se incrementa con cada mensaje enviado, permitiendo detectar paquetes perdidos o fuera de orden.</li>
          <li><strong>Datos (variable):</strong> Contenido opcional del mensaje. En pings, típicamente contiene una marca de tiempo y datos de relleno.</li>
        </ul>
        
        <h3 className="icmp-info-title">Acerca de</h3>
        <p className="icmp-info-text">
          Constructor de cabeceras ICMP para aprendizaje sobre redes y protocolos. Esta herramienta te permite experimentar con los diferentes campos de la cabecera ICMP y comprender cómo se estructura este protocolo fundamental para el diagnóstico de redes.
        </p>
      </aside>
    </div>
  );
};

export default IcmpHeaderBuilder;