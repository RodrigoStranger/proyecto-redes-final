import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Página no encontrada</h2>
      <p className="notfound-text">La ruta que buscas no existe.</p>
      <button className="notfound-btn" onClick={() => navigate("/")}>
        Regresar
      </button>
    </div>
  );
};

export default NotFound;
