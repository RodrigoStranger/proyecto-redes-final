import React, { useState } from "react";
import "./EthernetHeaderBuilder.css";
import { textToHex, hexToText, hexToBin, formatHex } from "../utils/hexText";
import { esEthertypeValido, ETHERTYPES_VALIDOS, validarEthertype, ETHERTYPES_INFO } from "../utils/ethertypes";
import { validarMac } from "../utils/validation";
import { randomMac, randomEthertype, randomText } from "../utils/ethernetHeaderUtils";

const initialState = {
  macDestino: "",
  macOrigen: "",
  tipo: "0800",
  datos: "",
};

const campos = [
  {
    name: "macDestino",
    label: "MAC Destino",
    placeholder: "AA:BB:CC:DD:EE:FF",
    tooltip: "Dirección MAC de destino (6 bytes, 12 dígitos hexadecimales)",
    maxLength: 17,
  },
  {
    name: "macOrigen",
    label: "MAC Origen",
    placeholder: "11:22:33:44:55:66",
    tooltip: "Dirección MAC de origen (6 bytes, 12 dígitos hexadecimales)",
    maxLength: 17,
  },
  {
    name: "tipo",
    label: "Tipo/Ethertype",
    placeholder: "0800",
    tooltip: "Tipo de protocolo (2 bytes, por ejemplo 0800 para IPv4)",
    maxLength: 4,
  },
  {
    name: "datos",
    label: "Datos",
    placeholder: "Datos hexadecimales",
    tooltip: "Datos de la trama (en hexadecimal, longitud variable)",
    maxLength: 46 * 2, // Mínimo 46 bytes en Ethernet clásico
  },
];

const EthernetHeaderBuilder = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [simulando, setSimulando] = useState(false);
  const [simMsg, setSimMsg] = useState("");
  const [showSim, setShowSim] = useState(false);
  const [datosModo, setDatosModo] = useState("text"); // "text" o "hex"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  // Validación simple
  const validate = () => {
    const errs = {};
    const macDestinoError = validarMac(values.macDestino);
    if (macDestinoError) {
      errs.macDestino = macDestinoError;
    }
    const macOrigenError = validarMac(values.macOrigen);
    if (macOrigenError) {
      errs.macOrigen = macOrigenError;
    }
    // Validar que el tipo/ethertype sea uno conocido
    const tipoError = validarEthertype(values.tipo);
    if (tipoError) {
      errs.tipo = tipoError;
    }
    if (values.datos && values.datos.length > 46 * 2) {
      errs.datos = "Máximo 92 caracteres (46 bytes)";
    }
    return errs;
  };

  const handleBlur = () => {
    const newErrors = validate();
    setErrors(newErrors);
    // Si el Ethertype es válido, elimina el error de tipo
    if (!newErrors.tipo) {
      setErrors((prev) => ({ ...prev, tipo: undefined }));
    }
  };

  // Construcción de la cabecera
  const datosHex = textToHex(values.datos);
  const headerHex =
    formatHex(values.macDestino.replace(/:/g, "")) +
    formatHex(values.macOrigen.replace(/:/g, "")) +
    formatHex(values.tipo) +
    datosHex;
  const headerBin = hexToBin(headerHex);

  // Visualización gráfica de la cabecera Ethernet
  const visualFields = [
    {
      name: "macDestino",
      label: "MAC Destino",
      length: 12, // 6 bytes, 12 hex
      color: "#ffe082",
      tooltip: "Debe tener el formato AA:BB:CC:DD:EE:FF (6 bytes, 12 dígitos hexadecimales). Cada par representa un byte. Ejemplo válido: 01:23:45:67:89:AB",
    },
    {
      name: "macOrigen",
      label: "MAC Origen",
      length: 12, // 6 bytes, 12 hex
      color: "#80cbc4",
      tooltip: "Debe tener el formato 11:22:33:44:55:66 (6 bytes, 12 dígitos hexadecimales). No puede ser igual a la MAC destino. Ejemplo válido: 0A:1B:2C:3D:4E:5F",
    },
    {
      name: "tipo",
      label: "Tipo/Ethertype",
      length: 4, // 2 bytes, 4 hex
      color: "#b39ddb",
      tooltip: "Debe ser un valor hexadecimal de 4 dígitos (2 bytes). Ejemplo válido: 0800 para IPv4, 0806 para ARP. No debe contener letras fuera del rango A-F.",
    },
    {
      name: "datos",
      label: "Datos",
      length: values.datos.length || 0,
      color: "#ffd54f",
      tooltip: "Debe ser una cadena hexadecimal. Mínimo 46 bytes (92 dígitos hexadecimales) para Ethernet clásico. Si es menor, se rellena con ceros. Ejemplo válido: 48656C6C6F20576F726C64 (equivale a 'Hello World').",
    },
  ];

  // Extraer los valores hex de cada campo para visualización
  const hexParts = [
    formatHex(values.macDestino.replace(/:/g, "")),
    formatHex(values.macOrigen.replace(/:/g, "")),
    formatHex(values.tipo),
    formatHex(values.datos),
  ];

  const handleSimular = () => {
    setSimulando(true);
    setSimMsg("");
    setTimeout(() => {
      setSimulando(false);
      setShowSim(true);
    }, 1200);
  };

  const handleRandom = () => {
    const newValues = {
      macDestino: randomMac(),
      macOrigen: randomMac(),
      tipo: randomEthertype(),
      datos: randomText(20 + Math.floor(Math.random() * 26)), // entre 20 y 45 caracteres
    };
    setValues(newValues);
    setShowSim(false);
    setSimMsg("");
    // Limpiar errores al generar aleatorio
    setErrors({});
  };

  // Mostrar info del Ethertype seleccionado
  const ethertypeInfo = ETHERTYPES_INFO.find(e => e.value.toUpperCase() === values.tipo.toUpperCase());

  return (
    <>
      <h2 className="ethernet-section-title">Constructor de cabecera Ethernet</h2>
      <div className="ethernet-builder-row">
        <div className="ethernet-builder">
          <form className="ethernet-form" autoComplete="off">
            {campos.filter(campo => campo.name !== "datos").map((campo) => (
              <div className="ethernet-form-group" key={campo.name}>
                <label title={campo.tooltip} htmlFor={campo.name}>
                  {campo.label}
                </label>
                <input
                  id={campo.name}
                  name={campo.name}
                  type="text"
                  maxLength={campo.maxLength}
                  value={values[campo.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={campo.placeholder}
                  className={errors[campo.name] ? "error" : ""}
                  title={campo.tooltip}
                />
                {errors[campo.name] && (
                  <span className="ethernet-error">{errors[campo.name]}</span>
                )}
              </div>
            ))}
            <div className="ethernet-form-group">
              <label htmlFor="datos">
                Datos
              </label>
              <input
                id="datos"
                name="datos"
                type="text"
                maxLength={46 * 2}
                value={values.datos}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Texto plano (ej: Hola edmundo)"
                className={errors.datos ? "error" : ""}
                title="Datos de la trama (texto plano, se convertirá a hexadecimal para la cabecera)"
              />
              {errors.datos && (
                <span className="ethernet-error">{errors.datos}</span>
              )}
            </div>
          </form>
          {/* Info contextual del Ethertype */}
          {values.tipo && ethertypeInfo && (
            <div className="ethernet-ethertype-info">
              <strong>Ethertype {ethertypeInfo.value}:</strong> {ethertypeInfo.desc}
            </div>
          )}
          {/* Botones de acción */}
          <div className="ethernet-btns-row">
            <button className="ethernet-sim-btn random" type="button" onClick={handleRandom}>
              Generar datos aleatorios
            </button>
          </div>
          {showSim && (
            <div className="ethernet-sim-msg">
              <strong>Simulación:</strong> La cabecera fue encapsulada y enviada.<br/>
              <span style={{fontSize:'0.98em',color:'#222',wordBreak:'break-all'}}>
                <strong>Hex:</strong> {headerHex}<br/>
                <strong>Binario:</strong> {headerBin}
              </span>
            </div>
          )}
          <div className="ethernet-header-visual">
            <h3>Cabecera generada</h3>
            <div className="ethernet-header-hex">
              <span>Hex:</span>
              <code>{headerHex || "-"}</code>
            </div>
            <div className="ethernet-header-bin">
              <span>Binario:</span>
              <code style={{ wordBreak: "break-all" }}>{headerBin || "-"}</code>
            </div>
            {/* Visualización gráfica */}
            <div className="ethernet-header-graphic">
              {visualFields.map((field, i) => (
                <span
                  key={field.name}
                  className="ethernet-header-field"
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
                  {field.label}: {hexParts[i] || "-"}
                </span>
              ))}
            </div>
            {/* Mostrar solo los datos en hex */}
            <div className="ethernet-header-datos-hex" style={{marginTop:8}}>
              <span>Datos (hex):</span> <code>{datosHex || "-"}</code>
            </div>
          </div>
        </div>
        <aside className="ethernet-builder-info">
          <h3 className="ethernet-info-title">Instrucciones</h3>
          <ol className="ethernet-info-list">
            <li>Ingrese las direcciones MAC de destino y origen en formato hexadecimal, separadas por dos puntos (:)</li>
            <li>Especifique el Ethertype según el protocolo que desea utilizar (por ejemplo, 0800 para IPv4)</li>
            <li>Agregue los datos que desea enviar en formato hexadecimal. Asegúrese de que la longitud sea adecuada según el protocolo Ethernet.</li>
            <li>Haga clic en "Generar datos aleatorios" para obtener un ejemplo automático para ver cómo se vería la cabecera en hexadecimal y binario.</li>
          </ol>
          <h3 className="ethernet-info-title">Ética y Legalidad</h3>
          <p className="ethernet-info-text">
            Esta herramienta es solo para fines educativos y de investigación. No use esta información para actividades ilegales o no éticas.
          </p>
          <h3 className="ethernet-info-title">Acerca de</h3>
          <p className="ethernet-info-text">
            Constructor de cabeceras Ethernet para aprendizaje sobre redes y protocolos. Soporta generación de direcciones MAC y Ethertypes comunes.
          </p>
        </aside>
      </div>
    </>
  );
};

export default EthernetHeaderBuilder;
