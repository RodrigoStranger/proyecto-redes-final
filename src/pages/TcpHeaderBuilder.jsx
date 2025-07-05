import React, { useState } from "react";
import "./TcpHeaderBuilder.css";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!/^\d{1,5}$/.test(values.sourcePort) || parseInt(values.sourcePort) > 65535) {
      errs.sourcePort = "Puerto inválido (0-65535)";
    }
    if (!/^\d{1,5}$/.test(values.destPort) || parseInt(values.destPort) > 65535) {
      errs.destPort = "Puerto inválido (0-65535)";
    }
    if (!/^[0-9A-Fa-f]{8}$/.test(values.seqNumber)) {
      errs.seqNumber = "8 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{8}$/.test(values.ackNumber)) {
      errs.ackNumber = "8 dígitos hex";
    }
    if (!/^\d{1}$/.test(values.dataOffset) || parseInt(values.dataOffset) < 5) {
      errs.dataOffset = "Mínimo 5";
    }
    if (!/^\d{1}$/.test(values.reserved)) {
      errs.reserved = "Debe ser 0";
    }
    if (!/^[0-9A-Fa-f]{2}$/.test(values.flags)) {
      errs.flags = "2 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.window)) {
      errs.window = "4 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.checksum)) {
      errs.checksum = "4 dígitos hex";
    }
    if (!/^[0-9A-Fa-f]{4}$/.test(values.urgentPointer)) {
      errs.urgentPointer = "4 dígitos hex";
    }
    if (values.options && !/^[0-9A-Fa-f]{0,12}$/.test(values.options)) {
      errs.options = "Máx 12 dígitos hex";
    }
    return errs;
  };

  const handleBlur = () => {
    setErrors(validate());
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
          <button className="tcp-sim-btn" type="button" onClick={handleSimular}>
            Simular envío
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
      </aside>
    </div>
  );
};

export default TcpHeaderBuilder;
