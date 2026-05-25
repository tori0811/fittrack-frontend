
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const API = 'http://localhost:8000/api';

export function usePanelCliente() {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API}/panel`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!res.ok) throw new Error('Error al cargar el panel');
                const json = await res.json();
                setData(json);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return { data, loading, error };
}
