import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "../styles/Resumen.css";

export default function Resumen() {
    const { user } = useContext(AuthContext);

    return (
        <section className="trainer-overview card-base">
            <h1>Panel del Entrenador</h1>
            <p>
                Hola {user?.name} 👋  
                Gestiona tus clientes, crea rutinas y planifica sus dietas.
            </p>
        </section>
    );
}
