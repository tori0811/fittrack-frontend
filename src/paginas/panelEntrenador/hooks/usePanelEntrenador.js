import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function usePanelEntrenador() {
    const { token } = useContext(AuthContext);

    const [clientes, setClientes] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/entrenador/dashboard", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const json = await res.json();

                // Clientes
                setClientes(json.clientes || []);

                // Estadísticas — si tu backend NO las envía, creamos unas por defecto
                setStats([
                    { label: "Clientes activos", value: json.clientes?.length || 0 },
                    { label: "Rutinas creadas", value: json.rutinas?.length || 0 },
                    { label: "Dietas activas", value: json.dietas?.length || 0 },
                ]);

            } catch (error) {
                console.error("Error cargando dashboard entrenador:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { clientes, stats, loading };
}
