import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, route }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };
  return (
    <div
      className="card"
      onClick={route ? handleClick : undefined}
      style={route ? { cursor: "pointer" } : {}}
    >
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
