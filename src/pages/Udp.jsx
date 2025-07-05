import React from "react";
import "./styles/Udp.css";
import UdpHeaderBuilder from "./UdpHeaderBuilder";

const Udp = () => {
  return (
    <div className="udp-container">
      <h1 className="udp-title">UDP</h1>
      <section>
        <h2 className="udp-section-title">¿Qué es UDP?</h2>
        <p>
          El protocolo UDP (User Datagram Protocol) es un protocolo de la capa de transporte que permite el envío de datagramas sin conexión a través de una red IP. A diferencia de TCP, UDP no garantiza la entrega ni el orden de los paquetes, pero es más rápido y tiene menos sobrecarga.
        </p>
        <p>
          UDP es ideal para aplicaciones que requieren transmisión rápida y pueden tolerar cierta pérdida de paquetes, como transmisiones multimedia en tiempo real, juegos en línea y servicios de resolución de nombres.
        </p>
        
        <h3 className="udp-info-title">Importancia de UDP</h3>
        <p className="udp-info-text">
          UDP es esencial para aplicaciones que priorizan la velocidad sobre la fiabilidad. Su diseño simple y sin estado lo hace perfecto para comunicaciones en tiempo real donde la entrega inmediata es más importante que la entrega ordenada.
        </p>
        <ul className="udp-info-list">
          <li>Ideal para transmisiones en tiempo real (voz, video, juegos).</li>
          <li>Mínima sobrecarga de protocolo.</li>
          <li>No hay retrasos por establecimiento de conexión.</li>
          <li>Eficiente para transmisiones unidireccionales.</li>
        </ul>

        <h3 className="udp-info-title">Ventajas y Desventajas de UDP</h3>
        <div style={{overflowX: 'auto'}}>
          <table className="udp-table">
            <thead>
              <tr>
                <th style={{width: '50%'}}>Ventajas</th>
                <th style={{width: '50%'}}>Desventajas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mayor velocidad de transmisión</td>
                <td>No garantiza la entrega de paquetes</td>
              </tr>
              <tr>
                <td>Menor sobrecarga de cabecera</td>
                <td>No hay control de flujo ni congestión</td>
              </tr>
              <tr>
                <td>Sin retraso por establecimiento de conexión</td>
                <td>Los paquetes pueden llegar en desorden</td>
              </tr>
              <tr>
                <td>Eficiente para transmisiones unidireccionales</td>
                <td>Sin recuperación de errores incorporada</td>
              </tr>
              <tr>
                <td>Ideal para aplicaciones en tiempo real</td>
                <td>Puede saturar la red si no se implementan controles</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="udp-info-title">Curiosidades y Datos</h3>
        <ul className="udp-info-list">
          <li>La cabecera UDP tiene solo 8 bytes de longitud.</li>
          <li>El checksum es opcional en IPv4 pero obligatorio en IPv6.</li>
          <li>DNS utiliza UDP por defecto en el puerto 53.</li>
          <li>UDP es la base para protocolos como RTP y QUIC.</li>
        </ul>
      </section>
      <UdpHeaderBuilder />
    </div>
  );
};

export default Udp;