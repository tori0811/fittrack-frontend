import React, { useEffect, useState } from "react";
import "./Entrenadores.css";
import EntrenadorCard from "./EntrenadorCard";
import Planes from "./Planes";

export default function Entrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/entrenadores")
      .then((r) => r.json())
      .then((data) => {
        setEntrenadores(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section id="entrenadores" className="entrenadores">
        <div className="container">
          <h1>Nuestros Entrenadores</h1>
          <p className="subtitle">
            Conoce a los profesionales que te ayudarán a alcanzar tus metas.
          </p>

          <div className="grid">
            {loading ? (
              <>
                <div className="card skeleton"></div>
                <div className="card skeleton"></div>
              </>
            ) : (
              entrenadores.map(entrenador => (
                <EntrenadorCard key={entrenador.id} entrenador={entrenador} />
              ))
            )}
          </div>
        </div>
      </section>
      
      <section className="planes">
        <Planes />
      </section>
    
    </>
    
  );
}
