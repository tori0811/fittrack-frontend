
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext"; 

const API = 'http://localhost:8000/api';

export function useCrearDieta() {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const crearDieta = async (dietaData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API}/entrenador/plantillas/dieta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dietaData)
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Error inesperado');
                return false;
            }

            return true;
        } catch (e) {
            console.error(e);
            setError('Error al conectar con el servidor');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { crearDieta, loading, error };
}

export function useDietas() {
    const { token } = useContext(AuthContext);
    const [dietas, setDietas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDietas = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const response = await fetch(`${API}/entrenador/plantillas/dieta`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Error inesperado');
                return;
            }

            setDietas(json);
        } catch (e) {
            console.error(e);
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchDietas();
    }, [token]);

    return { dietas, loading, error, fetchDietas };
}