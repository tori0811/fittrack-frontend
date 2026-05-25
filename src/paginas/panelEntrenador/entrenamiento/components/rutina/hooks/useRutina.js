import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../../../context/AuthContext";

const API = 'http://localhost:8000/api';

export function useRutina(plantillaId) {
    const { token, user } = useContext(AuthContext);
    const [rutina, setRutina] = useState(null);
    const [bloque, setBloque] = useState(null);
    const [microciclos, setMicrociclos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeMicrociclo, setActiveMicrociclo] = useState(0);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const fetchRutina = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await fetch(`${API}/entrenador/plantillas/entrenamiento/${plantillaId}`, { headers });
            const data = await res.json();
            setRutina(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchOCrearBloque = async (rutina) => {
        try {
            const res = await fetch(`${API}/entrenador/bloque/plantilla/${plantillaId}`, { headers });
            const data = await res.json();
            if (data.bloque) {
                setBloque(data.bloque);
                fetchMicrociclos(data.bloque.id);
            } else {
                const res2 = await fetch(`${API}/entrenador/bloque/crear`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        user_id: user.id,
                        trainer_id: user.id,
                        plantilla_entrenamiento_id: parseInt(plantillaId),
                        titulo: rutina.name,
                    })
                });
                const data2 = await res2.json();
                setBloque(data2.bloque);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchMicrociclos = async (bloqueId) => {
        if (!token || !bloqueId) return;
        try {
            const res = await fetch(`${API}/entrenador/microciclo/listar/${bloqueId}`, { headers });
            const data = await res.json();
            setMicrociclos(data.microciclos || []);
        } catch (e) {
            console.error(e);
        }
    };

    const editarPlantilla = async (data) => {
        try {
            const res = await fetch(`${API}/entrenador/plantillas/entrenamiento/${plantillaId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (res.ok) setRutina(json.plantilla);
            return res.ok;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const crearMicrociclo = async (bloqueId) => {
        try {
            const numero = microciclos.length + 1;
            const res = await fetch(`${API}/entrenador/microciclo/crear`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ bloque_id: bloqueId, numero })
            });
            const data = await res.json();
            setMicrociclos([...microciclos, { ...data.microciclo, entrenos: [] }]);
            setActiveMicrociclo(microciclos.length);
        } catch (e) {
            console.error(e);
        }
    };

    const eliminarMicrociclo = async (microcicloId) => {
        try {
            await fetch(`${API}/entrenador/microciclo/eliminar/${microcicloId}`, { method: 'DELETE', headers });
            const nuevos = microciclos.filter(m => m.id !== microcicloId);
            setMicrociclos(nuevos);
            if (activeMicrociclo >= nuevos.length) setActiveMicrociclo(Math.max(0, nuevos.length - 1));
        } catch (e) {
            console.error(e);
        }
    };

    const duplicarMicrociclo = async (microcicloId) => {
        try {
            await fetch(`${API}/entrenador/microciclo/${microcicloId}/duplicar`, { method: 'POST', headers });
            if (bloque) fetchMicrociclos(bloque.id);
        } catch (e) {
            console.error(e);
        }
    };

    const crearEntreno = async (microcicloId) => {
        try {
            const microciclo = microciclos.find(m => m.id === microcicloId);
            const orden = (microciclo?.entrenos?.length || 0) + 1;
            const res = await fetch(`${API}/entrenador/entreno/crear`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ microciclo_id: microcicloId, titulo: '', dia_semana: `DIA ${orden}`, orden })
            });
            const data = await res.json();
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: [...(m.entrenos || []), { ...data.entreno, ejercicios: [] }] }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const editarEntreno = async (entrenoId, titulo, microcicloId) => {
        try {
            await fetch(`${API}/entrenador/entreno/editar/${entrenoId}`, {
                method: 'PUT', headers, body: JSON.stringify({ titulo })
            });
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId ? { ...e, titulo } : e) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const eliminarEntreno = async (entrenoId, microcicloId) => {
        try {
            await fetch(`${API}/entrenador/entreno/eliminar/${entrenoId}`, { method: 'DELETE', headers });
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.filter(e => e.id !== entrenoId) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const duplicarEntreno = async (entrenoId, microcicloId) => {
        try {
            const res = await fetch(`${API}/entrenador/entreno/${entrenoId}/duplicar`, { method: 'POST', headers });
            const data = await res.json();
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: [...m.entrenos, { ...data.entreno_duplicado, ejercicios: [] }] }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const crearEjercicio = async (entrenoId, nombre, grupo_muscular, microcicloId) => {
        try {
            const res = await fetch(`${API}/entrenador/ejercicio/crear`, {
                method: 'POST', headers,
                body: JSON.stringify({ entreno_id: entrenoId, nombre, grupo_muscular })
            });
            const data = await res.json();
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId
                    ? { ...e, ejercicios: [...(e.ejercicios || []), { ...data.ejercicio, series: [] }] }
                    : e) }
                : m
            ));
            return data.ejercicio;
        } catch (e) {
            console.error(e);
        }
    };

    const eliminarEjercicio = async (ejercicioId, entrenoId, microcicloId) => {
        try {
            await fetch(`${API}/entrenador/ejercicio/eliminar/${ejercicioId}`, { method: 'DELETE', headers });
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId
                    ? { ...e, ejercicios: e.ejercicios.filter(ej => ej.id !== ejercicioId) }
                    : e) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const crearSerie = async (ejercicioId, entrenoId, microcicloId) => {
        try {
            const res = await fetch(`${API}/entrenador/serie/crear`, {
                method: 'POST', headers,
                body: JSON.stringify({ ejercicio_id: ejercicioId })
            });
            const data = await res.json();
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId
                    ? { ...e, ejercicios: e.ejercicios.map(ej => ej.id === ejercicioId
                        ? { ...ej, series: [...(ej.series || []), data.serie] }
                        : ej) }
                    : e) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const editarSerie = async (serieId, campo, valor, ejercicioId, entrenoId, microcicloId) => {
        try {
            await fetch(`${API}/entrenador/serie/editar/${serieId}`, {
                method: 'PUT', headers,
                body: JSON.stringify({ [campo]: valor })
            });
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId
                    ? { ...e, ejercicios: e.ejercicios.map(ej => ej.id === ejercicioId
                        ? { ...ej, series: ej.series.map(s => s.id === serieId ? { ...s, [campo]: valor } : s) }
                        : ej) }
                    : e) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    const eliminarSerie = async (serieId, ejercicioId, entrenoId, microcicloId) => {
        try {
            await fetch(`${API}/entrenador/serie/eliminar/${serieId}`, { method: 'DELETE', headers });
            setMicrociclos(microciclos.map(m => m.id === microcicloId
                ? { ...m, entrenos: m.entrenos.map(e => e.id === entrenoId
                    ? { ...e, ejercicios: e.ejercicios.map(ej => ej.id === ejercicioId
                        ? { ...ej, series: ej.series.filter(s => s.id !== serieId) }
                        : ej) }
                    : e) }
                : m
            ));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (token) fetchRutina();
    }, [token]);

    useEffect(() => {
        if (rutina) fetchOCrearBloque(rutina);
    }, [rutina]);

    return {
        rutina, bloque, microciclos, loading, activeMicrociclo, setActiveMicrociclo,
        editarPlantilla, crearMicrociclo, eliminarMicrociclo, duplicarMicrociclo,
        crearEntreno, editarEntreno, eliminarEntreno, duplicarEntreno,
        crearEjercicio, eliminarEjercicio,
        crearSerie, editarSerie, eliminarSerie
    };
}