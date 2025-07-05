import React, { useState } from "react";
import "@styles/IpHeaderBuilder.css";
import { randomIpHeader, hexToBin } from "../utils/ipHeaderUtils";
import { textToHex } from "../utils/hexText";

const initialState = {
  version: "4",
  ihl: "5",
  tos: "00",
  totalLength: "0020",
  identification: "0000",
  flags: "0",
  fragmentOffset: "0000",
  ttl: "64",
  protocol: "06",
  headerChecksum: "0000",
  sourceIp: "192.168.0.1",
  destIp: "192.168.0.2",
  data: ""
};

function toHex(num, len = 2) {
  return parseInt(num, 10).toString(16).padStart(len, "0").toUpperCase();
}

function ipToHex(ip) {
  return ip.split(".").map(oct => toHex(oct)).join("");
}

const campos = [
  { name: "version", label: "Versión", maxLength: 1, tooltip: "4 para IPv4, 6 para IPv6", color: "#ffe082" },
  { name: "ihl", label: "IHL", maxLength: 1, tooltip: "Longitud de cabecera (en palabras de 32 bits)", color: "#80cbc4" },
  { name: "tos", label: "Tipo de servicio (TOS)", maxLength: 2, tooltip: "Tipo de servicio en hex (2 dígitos)", color: "#b39ddb" },
  { name: "totalLength", label: "Longitud total", maxLength: 4, tooltip: "Longitud total del paquete en hex (4 dígitos)", color: "#ffd54f" },
  { name: "identification", label: "Identificación", maxLength: 4, tooltip: "Identificador de fragmento (4 dígitos hex)", color: "#ffab91" },
  { name: "flags", label: "Flags", maxLength: 1, tooltip: "Flags (3 bits, 1 dígito hex)", color: "#a5d6a7" },
  { name: "fragmentOffset", label: "Fragment offset", maxLength: 4, tooltip: "Desplazamiento de fragmento (4 dígitos hex)", color: "#ce93d8" },
  { name: "ttl", label: "TTL", maxLength: 2, tooltip: "Tiempo de vida (2 dígitos hex)", color: "#90caf9" },
  { name: "protocol", label: "Protocolo", maxLength: 2, tooltip: "Protocolo superior (TCP=06, UDP=11, ICMP=01)", color: "#f48fb1" },
  { name: "headerChecksum", label: "Checksum", maxLength: 4, tooltip: "Suma de verificación (4 dígitos hex)", color: "#bcaaa4" },
  { name: "sourceIp", label: "IP Origen", maxLength: 15, tooltip: "Dirección IP origen (ej: 192.168.0.1)", color: "#ffe082" },
  { name: "destIp", label: "IP Destino", maxLength: 15, tooltip: "Dirección IP destino (ej: 192.168.0.2)", color: "#ffe082" },
  { name: "data", label: "Datos", maxLength: 32, tooltip: "Datos opcionales (texto plano)", color: "#fff176" }
];

const IpHeaderBuilder = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [simulando, setSimulando] = useState(false);
  const [simMsg, setSimMsg] = useState("");
  const [showSim, setShowSim] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  // Validación simple (puedes mejorarla)
  const validate = () => {
    const errs = {};
    if (!/^\d+$/g.test(values.version) || (values.version !== "4" && values.version !== "6")) {
      errs.version = "Solo 4 o 6";
    }
    if (!/^\d+$/g.test(values.ihl) || parseInt(values.ihl) < 5) {
      errs.ihl = "Mínimo 5";
    }
    if (!/^[0-9A-Fa-f]{2}$/.test(values.tos)) {
      errs.tos = "2 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.totalLength)) {
      errs.totalLength = "4 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.identification)) {
      errs.identification = "4 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{1}$/.test(values.flags)) {
      errs.flags = "1 dígito hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.fragmentOffset)) {
      errs.fragmentOffset = "4 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{2}$/.test(values.ttl)) {
      errs.ttl = "2 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{2}$/.test(values.protocol)) {
      errs.protocol = "2 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.headerChecksum)) {
      errs.headerChecksum = "4 dígitos hex";
    }
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(values.sourceIp)) {
      errs.sourceIp = "IP inválida";
    }
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(values.destIp)) {
      errs.destIp = "IP inválida";
    }
    return errs;
  };

  const handleBlur = () => {
    setErrors(validate());
  };

  // Construcción de la cabecera en hex
  const headerHex =
    toHex(values.version, 1) +
    toHex(values.ihl, 1) +
    values.tos.toUpperCase() +
    values.totalLength.toUpperCase() +
    values.identification.toUpperCase() +
    values.flags.toUpperCase() +
    values.fragmentOffset.toUpperCase() +
    values.ttl.toUpperCase() +
    values.protocol.toUpperCase() +
    values.headerChecksum.toUpperCase() +
    ipToHex(values.sourceIp) +
    ipToHex(values.destIp);

  const headerBin = hexToBin(headerHex);
  const datosHex = textToHex(values.data);

  // Visualización gráfica de campos
  const visualFields = [
    { ...campos[0], value: toHex(values.version, 1) },
    { ...campos[1], value: toHex(values.ihl, 1) },
    { ...campos[2], value: values.tos.toUpperCase() },
    { ...campos[3], value: values.totalLength.toUpperCase() },
    { ...campos[4], value: values.identification.toUpperCase() },
    { ...campos[5], value: values.flags.toUpperCase() },
    { ...campos[6], value: values.fragmentOffset.toUpperCase() },
    { ...campos[7], value: values.ttl.toUpperCase() },
    { ...campos[8], value: values.protocol.toUpperCase() },
    { ...campos[9], value: values.headerChecksum.toUpperCase() },
    { ...campos[10], value: ipToHex(values.sourceIp) },
    { ...campos[11], value: ipToHex(values.destIp) },
    { ...campos[12], value: datosHex },
  ];

  const handleRandom = () => {
    setValues(randomIpHeader());
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
    <div className="ip-header-builder-row">
      <div className="ip-header-builder">
        <h2 className="ip-section-title">Constructor de cabecera IP</h2>
        <form className="ip-form" autoComplete="off">
          {campos.map((campo) => (
            <div className="ip-form-group" key={campo.name}>
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
                <span className="ip-error">{errors[campo.name]}</span>
              )}
            </div>
          ))}
        </form>
        {/* Botones de acción */}
        <div className="ip-btns-row">
          <button className="ip-sim-btn random" type="button" onClick={handleRandom}>
            Generar datos aleatorios
          </button>
          <button 
            className="ip-sim-btn" 
            type="button" 
            onClick={handleSimular}
            disabled={simulando}
          >
            {simulando ? 'Simulando...' : 'Simular envío'}
          </button>
        </div>
        {showSim && (
          <div className="ip-sim-msg">
            <strong>Simulación:</strong> La cabecera fue encapsulada y enviada.<br/>
            <span style={{fontSize:'0.98em',color:'#222',wordBreak:'break-all'}}>
              <strong>Hex:</strong> {headerHex}<br/>
              <strong>Binario:</strong> {headerBin}
            </span>
          </div>
        )}
        <div className="ip-header-visual">
          <h3>Cabecera generada</h3>
          <div className="ip-header-hex">
            <span>Hex:</span> <code>{headerHex || "-"}</code>
          </div>
          <div className="ip-header-bin">
            <span>Binario:</span> <code style={{ wordBreak: "break-all" }}>{headerBin || "-"}</code>
          </div>
          {/* Visualización gráfica */}
          <div className="ip-header-graphic">
            {visualFields.map((field, i) => (
              <span
                key={field.name}
                className="ip-header-field"
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
          <div className="ip-header-datos-hex" style={{marginTop:8}}>
            <span>Datos (hex):</span> <code>{datosHex || "-"}</code>
          </div>
        </div>
      </div>
      <aside className="ip-header-builder-info">
        <h3 className="ip-info-title">Descripción de los campos de la cabecera IP</h3>
        <p><b>Versión:</b> Indica la versión del protocolo IP utilizada (4 para IPv4, 6 para IPv6). Define el formato general del paquete.</p>
        <p><b>IHL (Longitud de cabecera):</b> Especifica el tamaño de la cabecera IP en palabras de 32 bits. Permite saber dónde comienzan los datos.</p>
        <p><b>Tipo de servicio (TOS):</b> Permite asignar prioridades y definir la calidad de servicio para el manejo de los paquetes en la red.</p>
        <p><b>Longitud total:</b> Indica el tamaño total del paquete IP, incluyendo cabecera y datos, expresado en bytes.</p>
        <p><b>Identificación:</b> Número único que identifica cada paquete enviado, útil para la reensambladura de fragmentos.</p>
        <p><b>Flags:</b> Controla la fragmentación de los paquetes. Indica si el paquete puede fragmentarse y si es el último fragmento.</p>
        <p><b>Fragment offset:</b> Especifica la posición de un fragmento dentro del paquete original, permitiendo el reensamblaje correcto.</p>
        <p><b>TTL (Time To Live):</b> Limita la vida útil del paquete en la red, evitando bucles infinitos. Se decrementa en cada salto.</p>
        <p><b>Protocolo:</b> Indica el protocolo de la capa superior al que se entregarán los datos (por ejemplo, TCP, UDP, ICMP).</p>
        <p><b>Checksum:</b> Suma de verificación que permite detectar errores en la cabecera del paquete.</p>
        <p><b>IP Origen:</b> Dirección IP del dispositivo que envía el paquete.</p>
        <p><b>IP Destino:</b> Dirección IP del dispositivo receptor del paquete.</p>
        <p><b>Datos:</b> Información transportada por el paquete, puede ser de cualquier protocolo de capa superior.</p>
        <h3 className="ip-info-title">Curiosidades y Datos</h3>
        <ul className="ip-info-list">
          <li>IPv4 utiliza direcciones de 32 bits, permitiendo unos 4 mil millones de direcciones únicas.</li>
          <li>IPv6, creado por la escasez de direcciones IPv4, usa 128 bits y permite 3.4×10<sup>38</sup> direcciones.</li>
          <li>El campo TTL evita que los paquetes circulen indefinidamente en la red.</li>
          <li>El checksum de la cabecera ayuda a detectar errores en la transmisión.</li>
        </ul>
        <h3 className="ip-info-title">Acerca de</h3>
        <p className="ip-info-text">
          Constructor de cabeceras IP para aprendizaje sobre redes y protocolos. Soporta generación de campos aleatorios y visualización avanzada. Úsalo para experimentar y comprender cómo se construye y analiza una cabecera IP real.
        </p>
      </aside>
    </div>
  );
};

export default IpHeaderBuilder;
