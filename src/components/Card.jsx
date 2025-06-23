import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Ethernet") {
      navigate("/ethernet");
    }
  };
  return (
    <div
      className="card"
      onClick={handleClick}
      style={title === "Ethernet" ? { cursor: "pointer" } : {}}
    >
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
