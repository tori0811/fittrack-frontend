import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useGestionCliente(clienteId) {
    const { token } = useContext(AuthContext);

    const [cliente, setCliente] = useState(null);
    const [bloques, setBloques] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !clienteId) return;

        const fetchData = async () => {
            try {
                // 1. Cargar datos del cliente
                const resCliente = await fetch(`http://localhost:8000/api/user/${clienteId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const clienteData = await resCliente.json();

                // 2. Cargar bloques del cliente (entrenamientos completos)
                const resBloques = await fetch(`http://localhost:8000/api/entrenador/bloques/${clienteId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const bloquesData = await resBloques.json();

                setCliente(clienteData);
                setBloques(bloquesData);
            } catch (error) {
                console.error("Error cargando cliente:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, clienteId]);

    return { cliente, bloques, loading };
}
