
import { useState, useEffect, useCallback,  useContext } from 'react';
import { AuthContext } from '../../../../../../../../context/AuthContext';

const API = 'http://localhost:8000/api/entrenador/plantillas/dieta';

function getHeaders(token) {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

export function useDieta(id) {
    const { token } = useContext(AuthContext);
    const [plantilla, setPlantilla] = useState(null);
    const [menus, setMenus] = useState([]);
    const [activeMenu, setActiveMenu] = useState(0);

    // --- Cargar plantilla ---
    const cargarPlantilla = useCallback(async () => {
    const res = await fetch(`${API}/${id}`, { headers: getHeaders(token) });
    const data = await res.json();
    setPlantilla(data);
    const menus = (data.estructura?.menus ?? []).map(m => ({
        ...m,
        comidas: (m.comidas ?? []).map(c => ({
            ...c,
            alimentos: c.alimentos ?? []  
        }))
    }));
    setMenus(menus);
}, [id, token]);

    useEffect(() => { cargarPlantilla(); }, [cargarPlantilla]);

    // --- Guardar estructura en backend ---
    const guardarEstructura = useCallback(async (nuevosMenus) => {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: getHeaders(token),
            body: JSON.stringify({
                titulo: plantilla?.titulo,
                comidas: { menus: nuevosMenus },
            }),
        });
    }, [id, token, plantilla]);

    const actualizarMenus = useCallback((nuevosMenus) => {
        setMenus(nuevosMenus);
        guardarEstructura(nuevosMenus);
    }, [guardarEstructura]);

    // --- Editar nombre plantilla ---
    const editarPlantilla = useCallback(async (datos) => {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: getHeaders(token),
            body: JSON.stringify({ titulo: datos.titulo, comidas: { menus } }),
        });
        setPlantilla(prev => ({ ...prev, titulo: datos.titulo }));
    }, [id, token, menus]);

    // --- MENÚS ---
    const crearMenu = useCallback(() => {

        if (menus.length >= 2) return;
        const nombres = ['Día On', 'Día Off'];
        const nuevo = {
            id: Date.now(),
            nombre: nombres[menus.length],
            comidas: [],
        };
        
        const nuevos = [...menus, nuevo];
        actualizarMenus(nuevos);
        setActiveMenu(nuevos.length - 1);

    }, [menus, actualizarMenus]);

    const eliminarMenu = useCallback((menuId) => {
        const nuevos = menus.filter(m => m.id !== menuId);
        actualizarMenus(nuevos);
        setActiveMenu(prev => Math.max(0, prev - 1));
    }, [menus, actualizarMenus]);

    const duplicarMenu = useCallback((menuId) => {
        const menu = menus.find(m => m.id === menuId);
        if (!menu) return;
        const copia = {
            ...menu,
            id: Date.now(),
            nombre: `${menu.nombre} (copia)`,
            comidas: menu.comidas.map(c => ({ ...c, id: Date.now() + Math.random() })),
        };
        const nuevos = [...menus, copia];
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    const renombrarMenu = useCallback((menuId, nombre) => {
        const nuevos = menus.map(m => m.id === menuId ? { ...m, nombre } : m);
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    // --- COMIDAS ---
    const crearComida = useCallback((menuId) => {
        const nuevos = menus.map(m => {
            if (m.id !== menuId) return m;
            return {
                ...m,
                comidas: [...m.comidas, {
                    id: Date.now(),
                    nombre: `Comida ${m.comidas.length + 1}`,
                    alimentos: [],
                }],
            };
        });
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    const eliminarComida = useCallback((menuId, comidaId) => {
        const nuevos = menus.map(m => {
            if (m.id !== menuId) return m;
            return { ...m, comidas: m.comidas.filter(c => c.id !== comidaId) };
        });
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    const duplicarComida = useCallback((menuId, comidaId) => {
        const nuevos = menus.map(m => {
            if (m.id !== menuId) return m;
            const comida = m.comidas.find(c => c.id === comidaId);
            if (!comida) return m;
            const copia = { ...comida, id: Date.now() };
            return { ...m, comidas: [...m.comidas, copia] };
        });
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    const renombrarComida = useCallback((menuId, comidaId, nombre) => {
        const nuevos = menus.map(m => {
            if (m.id !== menuId) return m;
            return {
                ...m,
                comidas: m.comidas.map(c => c.id === comidaId ? { ...c, nombre } : c),
            };
        });
        actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    const guardarAlimento = useCallback((menuId, comidaId, alimento) => {
        const nuevos = menus.map(m => {
            if (m.id !== menuId) return m;
            return {
                ...m,
                comidas: m.comidas.map(c => {
                    if (c.id !== comidaId) return c;
                    return { ...c, alimentos: [...c.alimentos, alimento] };
                }),
            };
        });
    actualizarMenus(nuevos);
    }, [menus, actualizarMenus]);

    return {
        plantilla,
        menus,
        activeMenu,
        setActiveMenu,
        editarPlantilla,
        crearMenu,
        eliminarMenu,
        duplicarMenu,
        renombrarMenu,
        crearComida,
        eliminarComida,
        duplicarComida,
        renombrarComida,
        guardarAlimento,
    };
}