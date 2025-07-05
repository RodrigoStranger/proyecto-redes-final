import React from "react";
import "./Ip.css";
import IpHeaderBuilder from "./IpHeaderBuilder"; // Asegúrate de que la ruta sea correcta

const Ip = () => {
  return (
    <div className="ip-container">
      <h1 className="ip-title">IP</h1>
      <section>
        <h2 className="ip-section-title">¿Qué es IP?</h2>
        <p>
          El protocolo IP (Internet Protocol) es el encargado de direccionar y enrutar los paquetes de datos en una red, permitiendo la comunicación entre dispositivos a través de direcciones IP únicas.
        </p>
        <p>
          Existen dos versiones principales: IPv4 (32 bits) e IPv6 (128 bits). IP define la estructura de la cabecera, los campos de control y la forma en que los datos se fragmentan y reensamblan en la red.
        </p>
        <h3 className="ip-info-title">Importancia del Protocolo IP</h3>
        <p className="ip-info-text">
          El protocolo IP es la base de la comunicación en Internet y redes modernas. Permite que los datos viajen de un dispositivo a otro, sin importar la distancia o la tecnología de red utilizada. Sin IP, no existiría la interconexión global que conocemos hoy.
        </p>
        <ul className="ip-info-list">
          <li>Permite el direccionamiento único de cada dispositivo en la red.</li>
          <li>Hace posible el enrutamiento eficiente de paquetes a través de múltiples redes.</li>
          <li>Soporta fragmentación y reensamblado para adaptarse a diferentes tecnologías físicas.</li>
          <li>Es independiente del hardware y de la tecnología de transmisión.</li>
        </ul>
        <h3 className="ip-info-title">Curiosidades y Datos</h3>
        <ul className="ip-info-list">
          <li>IPv4 utiliza direcciones de 32 bits, permitiendo unos 4 mil millones de direcciones únicas.</li>
          <li>IPv6, creado por la escasez de direcciones IPv4, usa 128 bits y permite 3.4×10<sup>38</sup> direcciones.</li>
          <li>El campo TTL evita que los paquetes circulen indefinidamente en la red.</li>
          <li>El checksum de la cabecera ayuda a detectar errores en la transmisión.</li>
        </ul>
      </section>
      <section>
        <h2 className="ip-section-title">Estructura de la cabecera IP</h2>
        <p>
          La cabecera IP contiene información esencial para el enrutamiento y entrega de los paquetes, como la versión, longitud, direcciones de origen y destino, TTL, protocolo, y suma de verificación.
        </p>
        <ul>
          <li><strong>Versión:</strong> Indica si es IPv4 o IPv6.</li>
          <li><strong>Longitud de cabecera:</strong> Tamaño de la cabecera en palabras de 32 bits.</li>
          <li><strong>Tipo de servicio:</strong> Prioridad y calidad del servicio.</li>
          <li><strong>Longitud total:</strong> Tamaño total del paquete (cabecera + datos).</li>
          <li><strong>Identificación, flags y fragment offset:</strong> Para fragmentación y reensamblado.</li>
          <li><strong>TTL:</strong> Tiempo de vida del paquete.</li>
          <li><strong>Protocolo:</strong> Indica el protocolo de la capa superior (TCP, UDP, ICMP, etc.).</li>
          <li><strong>Suma de verificación:</strong> Verifica la integridad de la cabecera.</li>
          <li><strong>Dirección IP origen y destino:</strong> Identifican el emisor y receptor.</li>
        </ul>
      </section>
      <section>
        <h2 className="ip-section-title">Ventajas y desventajas</h2>
        <table className="ip-table">
          <thead>
            <tr>
              <th>Ventajas</th>
              <th>Desventajas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Permite la interconexión global de redes.</td>
              <td>IPv4 tiene espacio de direcciones limitado.</td>
            </tr>
            <tr>
              <td>Soporta fragmentación y reensamblado de paquetes.</td>
              <td>La fragmentación puede afectar el rendimiento.</td>
            </tr>
            <tr>
              <td>Es la base de Internet y redes modernas.</td>
              <td>La cabecera añade sobrecarga a los datos.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="ip-section-title">Acerca de</h2>
        <p className="ip-info-text">
          Visualizador educativo de la cabecera IP para aprendizaje sobre redes y protocolos. Pronto podrás construir y analizar cabeceras IP de forma interactiva.
        </p>
      </section>
      <IpHeaderBuilder />
    </div>
  );
};

export default Ip;
