import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
const FETCH_URL = 'http://localhost:8000/api';

export function useCrearPlantilla() {
      
    const { token } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const crearPlantilla = async (routineData) => {
        try {
            setLoading(true);
            const response = await fetch(`${ FETCH_URL }/entrenador/plantillas/entrenamiento`, {
                method : "POST",
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify(routineData)
            });

            const json = await response.json();

            if(!response.ok) {
                setError(json.error || "Error inesperado");
                return false;
            }

            return true;
                  
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError("Error al conectar con el servidor");
            return false;
        } finally {
            setLoading(false);
        } 
    };

    return { crearPlantilla, loading, error }
}

export function useEditarPlantilla() {

    const { token } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const editarPlantilla = async (id, routineData) => {
        try {
            setLoading(true);
            const response = await fetch(`${FETCH_URL}/entrenador/plantillas/entrenamiento/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(routineData)
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || "Error inesperado");
                return false;
            }

            return true;

        } catch (error) {
            console.error('Error al editar plantilla:', error);
            setError("Error al conectar con el servidor");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { editarPlantilla, loading, error };
}

export function usePlantillas() {

    const { token } = useContext(AuthContext);
    const [ plantillas, setPlantillas ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchPlantillas = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const response = await fetch(`${FETCH_URL}/entrenador/plantillas/entrenamiento`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || "Error inesperado");
                return;
            }

            setPlantillas(json);

        } catch (error) {
            console.error('Error al cargar plantillas:', error);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const eliminarPlantilla = async (id) => {
        try {
            const response = await fetch(`${FETCH_URL}/entrenador/plantillas/entrenamiento/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) return false;
            setPlantillas(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    useEffect(() => {
        fetchPlantillas();
    }, [token]);

    return { plantillas, loading, error, fetchPlantillas, eliminarPlantilla };
}