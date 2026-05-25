import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function useClienteDetalle(clienteId) {
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [cliente, setCliente] = useState(null);
    const [cuestionario, setCuestionario] = useState(null);
    const [dieta, setDieta] = useState(null);
    
    useEffect(() => {
        if (!clienteId || !token) return;

        const fetchData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/api/entrenador/cliente/${clienteId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    }
                );

                const json = await res.json();

                setCliente(json.cliente || null);
                setCuestionario(json.cuestionario || null);
                setDieta(json.dieta || null);

            } catch (error) {
                console.error("Error cargando cliente:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clienteId, token]);

    return {
        loading,cliente,cuestionario,dieta
    };
}
