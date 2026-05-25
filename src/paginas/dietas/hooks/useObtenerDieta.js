
import { useState } from "react";
import { API_URL } from "../../../config/api";

export default function useObtenerDieta() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dietas, setDietas] = useState([]);

    async function obtenerDieta() {
        
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/plantillas/dieta`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if(!response.ok) {
                const err = await response.json();
                throw err;
            }

            const data =  await response.json();
            setDietas(data);
                
        } catch (err) {

            setError(err);

        }finally {

            setLoading(false)
        }
    }

    return {obtenerDieta, loading, error, dietas}

}

