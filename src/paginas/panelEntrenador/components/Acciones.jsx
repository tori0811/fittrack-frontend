import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEnviarSolicitud from "../hooks/useEnviarSolicitud";

import { Send, ClipboardEdit, FolderKanban } from "lucide-react";
import "../styles/Acciones.css";

export default function Acciones({ onScrollToClientes }) {

    const [email, setEmail] = useState("");
    const { enviarSolicitud, mensaje } = useEnviarSolicitud();
    const navigate = useNavigate();

    // color del theme del panel
    const iconColor = "#5A54F2";

    return (
        <section className="trainer-actions">
            
            {/* Enviar solicitud */}
            <div className="action-card card-base">
                
                <div className="accion-title">
                    <Send size={20} color={iconColor} />
                    <h3>Enviar solicitud</h3>
                </div>

                <input 
                    type="email"
                    placeholder="Email del cliente"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={() => enviarSolicitud(email)}>
                    Enviar
                </button>

                {mensaje && <p className="msg">{mensaje}</p>}
            </div>

            {/* Crear dieta o entrenamiento */}
            <div 
                className="action-card card-base accion-click" 
                onClick={onScrollToClientes}
            >
                <div className="accion-title">
                    <ClipboardEdit size={20} color={iconColor} />
                    <h3>Crear dieta o entrenamiento</h3>
                </div>

                <p>Selecciona un cliente para generar o editar su dieta o plan de entrenamiento.</p>
            </div>

            {/* Plantillas */}
            <div 
                className="action-card card-base accion-click"
                onClick={() => navigate("/entrenador/plantillas")}
            >
                <div className="accion-title">
                    <FolderKanban size={20} color={iconColor} />
                    <h3>Plantillas</h3>
                </div>

                <p>Gestiona bloques, microciclos y entrenamientos personalizados.</p>
            </div>

        </section>
    );
}
