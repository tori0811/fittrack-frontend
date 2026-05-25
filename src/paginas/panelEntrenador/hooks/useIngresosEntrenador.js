import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function useIngresosEntrenador() {
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchIngresos = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/entrenador/ingresos", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error cargando ingresos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchIngresos();
    }, [token]);

    return { loading, data };
}
