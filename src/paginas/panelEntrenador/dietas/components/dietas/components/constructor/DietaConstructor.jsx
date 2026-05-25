
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Plus, Pencil, MoreVertical } from 'lucide-react';
import { useDieta } from './hooks/useDieta';
import MenuTab from './components/MenuTab';
import './DietaConstructor.css';

function MenuButton({ menu, index, active, onClick, onEliminar, onDuplicar }) {
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setShowMenu(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className={`microciclo-tab-wrapper ${active ? 'active' : ''}`} ref={ref}>
            <button
                className={`microciclo-tab ${active ? 'active' : ''}`}
                onClick={onClick}>
                {menu.nombre}
                <span
                    className="microciclo-tab-menu-btn"
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}>
                    <MoreVertical size={14} />
                </span>
            </button>
            {showMenu && (
                <div className="microciclo-tab-dropdown">
                    <button onClick={() => { onDuplicar(menu.id); setShowMenu(false); }}>
                        Duplicar
                    </button>
                    <button onClick={() => { onEliminar(menu.id); setShowMenu(false); }}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default function DietaConstructor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
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
        guardarAlimento
    } = useDieta(id);

    const menuActual = menus[activeMenu];

    return (
        <div className="constructor">
            <div className="constructor-header">
                <button className="constructor-back" onClick={() => navigate('/entrenador/dietas')}>
                    <ArrowLeft size={30} />
                </button>
                {plantilla?.tema && (
                    <img src={plantilla.tema} alt="tema" className="constructor-theme-img" />
                )}
                <span className="constructor-nombre">
                    {plantilla?.titulo?.toUpperCase()}
                </span>
            </div>

            <div className="constructor-microciclos">
                {menus.map((m, i) => (
                    <MenuButton
                        key={m.id}
                        menu={m}
                        index={i}
                        active={activeMenu === i}
                        onClick={() => setActiveMenu(i)}
                        onEliminar={eliminarMenu}
                        onDuplicar={duplicarMenu}
                    />
                ))}
                {menus.length < 2 && (
                    <button className="microciclo-add" onClick={crearMenu}>
                        <Plus size={18} />
                    </button>
                )}
            </div>

            <div className="constructor-divider" />

            {menuActual && (
                <MenuTab
                    menu={menuActual}
                    onAddComida={crearComida}
                    onEliminarComida={eliminarComida}
                    onDuplicarComida={duplicarComida}
                    onRenombrarComida={renombrarComida}
                    onRenombrarMenu={renombrarMenu}
                    onGuardarAlimento={guardarAlimento}
                />
            )}

            {!menus.length && (
                <div className="constructor-empty">
                    <p>No hay menús. Pulsa + para añadir uno.</p>
                </div>
            )}
        </div>
    );
}
