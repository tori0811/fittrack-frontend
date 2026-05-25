import React from "react";
import "./EntrenadorCard.css";
import { Link } from "react-router-dom";

export default function EntrenadorCard({ entrenador }) {
  return (
    <div className="card">
      <img className="card-img" src={entrenador.imagen} alt={entrenador.nombre} />

      <div className="card-body">
        <h3 className="card-title">{entrenador.nombre}</h3>
        <p className="card-specialty">{entrenador.especialidad}</p>

        {entrenador.experiencia && (
          <p className="card-experience">{entrenador.experiencia} años de experiencia</p>
        )}

        <p className="card-description">{entrenador.descripcion}</p>

        
        <Link to="#" className="inicio-enlace card-btn-full">
          Conocer más
        </Link>
      </div>
    </div>
  );
}
