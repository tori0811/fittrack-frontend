import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function useEnviarSolicitud() {
    const { token } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState("");

    const enviarSolicitud = async (email) => {
        try {
            const res = await fetch("http://localhost:8000/api/entrenador/solicitud", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });

            const json = await res.json();

            if (!res.ok) {
                setMensaje(json.error || "Error inesperado");
                return false;
            }

            setMensaje(json.message);
            return true;

        } catch (err) {
            console.error("Error en solicitud:", err);
            setMensaje("Error al conectar con el servidor");
            return false;
        }
    };

    return { enviarSolicitud, mensaje };
}
