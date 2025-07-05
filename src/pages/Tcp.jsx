import "@styles/Tcp.css";
import TcpHeaderBuilder from "./TcpHeaderBuilder";

const Tcp = () => {
  return (
    <div className="tcp-container">
      <h1 className="tcp-title">TCP</h1>
      <section>
        <h2 className="tcp-section-title">¿Qué es TCP?</h2>
        <p>
          El protocolo TCP (Transmission Control Protocol) es uno de los protocolos fundamentales de Internet. Proporciona una comunicación confiable, orientada a la conexión y garantiza la entrega ordenada de los datos entre aplicaciones.
        </p>
        <p>
          TCP se encarga de dividir los datos en segmentos, numerarlos, retransmitir los que se pierden y controlar el flujo para evitar congestión. Es ampliamente utilizado en servicios como web (HTTP), correo electrónico (SMTP), transferencia de archivos (FTP) y muchos más.
        </p>
        <h3 className="tcp-info-title">Importancia de TCP</h3>
        <p className="tcp-info-text">
          TCP es esencial para aplicaciones que requieren fiabilidad y entrega completa de los datos. Sin TCP, servicios como la web o el correo electrónico no podrían garantizar que la información llegue correctamente a su destino.
        </p>
        <ul className="tcp-info-list">
          <li>Proporciona control de errores y retransmisión automática.</li>
          <li>Gestiona el control de flujo y congestión en la red.</li>
          <li>Permite la comunicación bidireccional y ordenada.</li>
          <li>Utiliza el mecanismo de handshake para establecer conexiones seguras.</li>
        </ul>

        <h3 className="tcp-info-title">Ventajas y Desventajas de TCP</h3>
        <div style={{overflowX: 'auto'}}>
          <table className="tcp-table">
            <thead>
              <tr>
                <th style={{width: '50%'}}>Ventajas</th>
                <th style={{width: '50%'}}>Desventajas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Entrega confiable y ordenada de datos</td>
                <td>Mayor sobrecarga de cabecera</td>
              </tr>
              <tr>
                <td>Control de flujo y congestión</td>
                <td>Mayor latencia por el handshake</td>
              </tr>
              <tr>
                <td>Retransmisión de paquetes perdidos</td>
                <td>No es óptimo para transmisiones en tiempo real</td>
              </tr>
              <tr>
                <td>Comunicación full-duplex</td>
                <td>Consumo de recursos del sistema</td>
              </tr>
              <tr>
                <td>Múltiples conexiones concurrentes</td>
                <td>Rendimiento reducido en redes rápidas con baja tasa de error</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="tcp-info-title">Curiosidades y Datos</h3>
        <ul className="tcp-info-list">
          <li>TCP utiliza números de secuencia y acuse (ACK) para garantizar la entrega.</li>
          <li>El handshake de 3 vías (SYN, SYN-ACK, ACK) es clave para iniciar una conexión.</li>
          <li>El campo ventana permite ajustar la cantidad de datos enviados sin acuse.</li>
          <li>TCP puede fragmentar y reensamblar datos de gran tamaño.</li>
        </ul>
      </section>
      <TcpHeaderBuilder />
    </div>
  );
};

export default Tcp;
