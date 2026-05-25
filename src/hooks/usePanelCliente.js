import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function usePanelCliente() {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/cliente/panel", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error cargando panel:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { data, loading };
}
