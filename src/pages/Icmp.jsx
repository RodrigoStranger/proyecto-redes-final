import "./styles/Icmp.css";
import IcmpHeaderBuilder from "./IcmpHeaderBuilder";

const Icmp = () => {
  return (
    <div className="ip-container">
      <h1 className="ip-title">ICMP</h1>
      <section>
        <h2 className="ip-section-title">¿Qué es ICMP?</h2>
        <p>
          El Protocolo de Mensajes de Control de Internet (ICMP) se utiliza para enviar mensajes de error y operacionales que indican el estado de la red. Es esencial para el diagnóstico de problemas de conectividad.
        </p>
        <p>
          ICMP opera en la capa de red del modelo OSI y es utilizado por herramientas comunes como ping y traceroute para diagnosticar problemas de conectividad en redes IP.
        </p>
        <h3 className="ip-info-title">Importancia del Protocolo ICMP</h3>
        <p className="ip-info-text">
          ICMP es fundamental para el diagnóstico de redes y la notificación de errores. Permite a los administradores de red detectar y solucionar problemas de conectividad, así como optimizar el rendimiento de la red.
        </p>
        <ul className="ip-info-list">
          <li>Permite verificar la disponibilidad de hosts en una red.</li>
          <li>Proporciona información sobre problemas de entrega de paquetes.</li>
          <li>Es utilizado por herramientas de diagnóstico como ping y traceroute.</li>
          <li>Ayuda a determinar la ruta que siguen los paquetes a través de la red.</li>
        </ul>
        <h3 className="ip-info-title">Curiosidades y Datos</h3>
        <ul className="ip-info-list">
          <li>El comando ping utiliza mensajes ICMP Echo Request y Echo Reply.</li>
          <li>ICMP no tiene puertos como TCP o UDP, ya que opera en la capa de red.</li>
          <li>Algunos tipos de mensajes ICMP requieren que se devuelva una respuesta.</li>
          <li>Los firewalls a menudo bloquean ciertos tipos de mensajes ICMP por razones de seguridad.</li>
        </ul>
      </section>
      <section>
        <h2 className="ip-section-title">Estructura del mensaje ICMP</h2>
        <p>
          Los mensajes ICMP tienen una estructura sencilla que incluye un campo de tipo, código, checksum y datos específicos del mensaje.
        </p>
        <ul>
          <li><strong>Tipo (1 byte):</strong> Identifica el tipo de mensaje ICMP (ej: 8 para Echo Request, 0 para Echo Reply).</li>
          <li><strong>Código (1 byte):</strong> Proporciona información adicional sobre el tipo de mensaje.</li>
          <li><strong>Checksum (2 bytes):</strong> Verifica la integridad del mensaje ICMP.</li>
          <li><strong>Identificador (2 bytes):</strong> Usado para asociar solicitudes y respuestas.</li>
          <li><strong>Número de secuencia (2 bytes):</strong> Ayuda a hacer seguimiento de solicitudes y respuestas.</li>
          <li><strong>Datos (variable):</strong> Contiene información adicional según el tipo de mensaje.</li>
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
              <td>Herramienta esencial para diagnóstico de red.</td>
              <td>Puede ser utilizado en ataques de red (ej: ping flood).</td>
            </tr>
            <tr>
              <td>No requiere configuración adicional en los hosts.</td>
              <td>Algunos mensajes pueden revelar información de la red.</td>
            </tr>
            <tr>
              <td>Implementado en prácticamente todos los dispositivos de red.</td>
              <td>Puede ser bloqueado por firewalls, limitando su utilidad.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="ip-section-title">Visualizador educativo</h2>
        <p className="ip-info-text">
          Visualizador educativo de mensajes ICMP para aprendizaje sobre redes y protocolos. Utiliza el constructor de mensajes ICMP para experimentar con diferentes tipos de mensajes y ver su estructura.
        </p>
      </section>
      <IcmpHeaderBuilder />
    </div>
  );
};

export default Icmp;