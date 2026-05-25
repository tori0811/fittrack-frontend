
import { useState } from "react";
import { API_URL } from "../../../config/api";

export default function useEliminarDieta() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function eliminarDieta(id) {
        
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/plantillas/dieta/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if(!response.ok) {
                const err = await response.json();
                throw err;
            }

            return await response.json();
                
        } catch (err) {

            setError(err);

        }finally {

            setLoading(false)
        }
    }

    return {eliminarDieta, loading, error}

}

