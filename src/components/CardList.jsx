import Card from "./Card";
import "./CardList.css";

const cards = [
  {
    title: "Ethernet",
    description: "Construye y visualiza la cabecera del protocolo Ethernet.",
    route: "/ethernet"
  },
  {
    title: "IP",
    description: "Explora los campos y funciones de la cabecera IP.",
    route: "/ip"
  },
  {
    title: "TCP",
    description: "Analiza y comprende la cabecera del protocolo TCP."
  },
  {
    title: "UDP",
    description: "Visualiza la estructura de la cabecera UDP."
  },
  {
    title: "ICMP",
    description: "Descubre los campos y usos de la cabecera ICMP."
  }
];

const CardList = () => (
  <div className="card-list">
    {cards.map((card, idx) => (
      <Card key={idx} {...card} />
    ))}
  </div>
);

export default CardList;
