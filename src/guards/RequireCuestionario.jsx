import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RequireCuestionario({ children }) {
    const [loading, setLoading] = useState(true);
    const [tieneCuestionario, setTieneCuestionario] = useState(null);

    useEffect(() => {
        const verificar = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setTieneCuestionario(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/cuestionario/check", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();
                setTieneCuestionario(data.completed);
            } catch (e) {
                setTieneCuestionario(false);
            }

            setLoading(false);
        };

        verificar();
    }, []);

    if (loading) return <div>Cargando...</div>;

    
    if (tieneCuestionario) {
        return <Navigate to="/panel-cliente" replace />;
    }

    return children;
}
