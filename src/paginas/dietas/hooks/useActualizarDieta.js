
import { useState } from "react";
import { API_URL } from "../../../config/api";

export default function useActualizarDieta() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function actualizarDieta(id, payload) {
        
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/plantillas/dieta/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
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

    return {actualizarDieta, loading, error}

}

