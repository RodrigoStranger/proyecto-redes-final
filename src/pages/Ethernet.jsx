import "@styles/Ethernet.css";
import EthernetHeaderBuilder from "./EthernetHeaderBuilder";

const Ethernet = () => {
  return (
    <div className="ethernet-container">
      <h1 className="ethernet-title">Ethernet</h1>
      <section>
        <h2 className="ethernet-section-title">¿Qué es Ethernet?</h2>
        <p>
          Ethernet es una tecnología de red utilizada para conectar dispositivos en
          una red local (LAN). Es el estándar más común para redes cableadas y
          define cómo se transmiten los datos a través de cables y dispositivos.
        </p>
        <p>
          Fue diseñada para ser simple, robusta y escalable, permitiendo la
          comunicación eficiente entre computadoras, impresoras, servidores y otros
          equipos dentro de una misma organización o edificio. Ethernet utiliza un
          esquema de direccionamiento único (dirección MAC) para identificar cada
          dispositivo en la red y emplea protocolos de control para evitar
          colisiones y asegurar la entrega de los datos.
        </p>
        <p>
          Gracias a su flexibilidad y bajo costo, Ethernet se ha convertido en la
          base de la mayoría de redes empresariales, educativas y domésticas en
          todo el mundo. Además, su evolución constante ha permitido que soporte
          desde pequeñas redes hasta grandes infraestructuras de centros de datos
          y aplicaciones industriales.
        </p>
      </section>
      <section>
        <h2 className="ethernet-section-title">Evolución en la historia</h2>
        <div className="ethernet-timeline">
          <p><strong>1973:</strong> Robert Metcalfe y su equipo en Xerox PARC desarrollan Ethernet, operando a 2.94 Mbps con cable coaxial grueso.</p>
          <p><strong>1980:</strong> Se publica el estándar Ethernet (DIX), base para futuras implementaciones.</p>
          <p><strong>1983:</strong> Ethernet se convierte en el estándar IEEE 802.3, funcionando a 10 Mbps.</p>
          <p><strong>Años 90:</strong> Aparece Fast Ethernet (100 Mbps), mejorando la velocidad para redes empresariales.</p>
          <p><strong>Finales de los 90:</strong> Surge Gigabit Ethernet (1 Gbps), permitiendo mayor ancho de banda.</p>
          <p><strong>2002:</strong> Se lanza 10 Gigabit Ethernet (10 Gbps), usado en centros de datos y backbone de red.</p>
          <p><strong>2010s:</strong> Se popularizan versiones de 40 y 100 Gbps, con soporte para fibra óptica y cobre.</p>
          <p><strong>2020s:</strong> Ethernet alcanza 400 Gbps y evoluciona para soportar IoT, redes industriales y centros de datos de alta velocidad.</p>
        </div>
      </section>
      <section>
        <h2 className="ethernet-section-title">Características principales</h2>
        <div className="ethernet-features">
          <p><strong>Transmisión por cable:</strong> Ethernet utiliza diferentes tipos de cables para la transmisión de datos, como par trenzado (UTP/STP), fibra óptica y, en sus inicios, cable coaxial. El par trenzado es común en redes domésticas y de oficina, mientras que la fibra óptica se usa para largas distancias y altas velocidades.</p>
          <p><strong>Topología en estrella o bus:</strong> Originalmente, Ethernet usaba una topología en bus, donde todos los dispositivos compartían un mismo cable. Actualmente, la topología en estrella es la más utilizada, donde cada dispositivo se conecta a un switch central, mejorando la gestión y el rendimiento de la red.</p>
          <p><strong>Velocidades desde 10 Mbps hasta 400 Gbps:</strong> Ethernet ha evolucionado desde sus primeras versiones de 10 Mbps hasta alcanzar velocidades de 100, 400 Gbps y más, adaptándose a las necesidades de redes domésticas, empresariales y de centros de datos.</p>
          <p><strong>Utiliza tramas para la transmisión de datos:</strong> Los datos en Ethernet se envían en unidades llamadas tramas, que incluyen información de control, dirección de origen y destino, y los datos propiamente dichos. Esto permite una transmisión eficiente y controlada en la red.</p>
          <p><strong>Soporta comunicación full-duplex y half-duplex:</strong> En modo half-duplex, los dispositivos pueden enviar o recibir datos, pero no ambos al mismo tiempo. En full-duplex, la comunicación es simultánea en ambas direcciones, lo que incrementa la eficiencia y el rendimiento de la red.</p>
        </div>
      </section>
      <section>
        <h2 className="ethernet-section-title">Ventajas y desventajas</h2>
        <table className="ethernet-table">
          <thead>
            <tr>
              <th>Ventajas</th>
              <th>Desventajas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alta velocidad y baja latencia.</td>
              <td>
                Requiere cableado físico, lo que puede ser costoso y difícil de
                instalar en grandes distancias.
              </td>
            </tr>
            <tr>
              <td>Estabilidad y fiabilidad en la conexión.</td>
              <td>
                Movilidad limitada comparado con redes inalámbricas.
              </td>
            </tr>
            <tr>
              <td>
                Fácil integración y compatibilidad con equipos de red.
              </td>
              <td>
                Puede ser afectado por interferencias electromagnéticas si el
                cableado no es adecuado.
              </td>
            </tr>
            <tr>
              <td>
                Bajo costo por puerto en switches y routers.
              </td>
              <td>
                El cableado puede ser vulnerable a daños físicos.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="ethernet-section-title">Tipos de cables y estándares Ethernet</h2>
        <div className="ethernet-cables">
          <p>El grupo de trabajo <strong>IEEE 802.3</strong> aprobó el primer estándar Ethernet en 1983. Desde entonces, la tecnología ha seguido evolucionando y adoptando nuevos medios, mayores velocidades de transmisión y cambios en el contenido de las tramas:</p>
          <ul>
            <li><strong>802.3ac:</strong> Introducido para dar cabida a la VLAN y al etiquetado de prioridad.</li>
            <li><strong>802.3af:</strong> Define la alimentación a través de Ethernet (PoE), crucial para la mayoría de las implantaciones de Wi-Fi y telefonía IP.</li>
            <li><strong>802.11a/b/g/n/ac/ax:</strong> Definen el equivalente de Ethernet para las redes inalámbricas (WLAN).</li>
            <li><strong>802.3u:</strong> Introdujo <strong>100BASE-T</strong> (Fast Ethernet) con velocidades de hasta 100 Mbps. BASE-T indica el uso de cableado de par trenzado.</li>
            <li><strong>Gigabit Ethernet:</strong> Velocidades de <strong>1.000 Mbps (1 Gbps)</strong>, <strong>10 GbE (10 Gbps)</strong> y superiores, usados para conexiones de alta velocidad y segmentos troncales.</li>
          </ul>
          <p>Los ingenieros de redes utilizan <strong>100BASE-T</strong> principalmente para conectar computadoras, impresoras y otros dispositivos de usuario final, así como para gestionar servidores y almacenamiento. Con el tiempo, la velocidad típica de cada conexión tiende a aumentar.</p>
          <p>Los cables Ethernet conectan los dispositivos de red a routers o módems, y existen diferentes tipos según el estándar y la velocidad:</p>
          <ul>
            <li><strong>Cat5:</strong> Soporta Ethernet tradicional y 100BASE-T.</li>
            <li><strong>Cat5e:</strong> Puede manejar Gigabit Ethernet (GbE).</li>
            <li><strong>Cat6:</strong> Trabaja con 10 Gigabit Ethernet (10 GbE).</li>
            <li><strong>Cables cruzados:</strong> Permiten conectar dos dispositivos del mismo tipo (por ejemplo, dos computadoras) sin necesidad de un switch o router intermedio.</li>
          </ul>
        </div>
      </section>
      <EthernetHeaderBuilder />
    </div>
  );
};

export default Ethernet;
