import { useState } from 'react';
import { Mars, Venus, VenusAndMars, Trash2, Copy, EllipsisVertical, Pencil } from 'lucide-react';
import './RoutineCard.css';
import { useNavigate } from 'react-router-dom';

const genderIcon = (gender) => {
    if (gender === 'Hombre') return <Mars size={16} />;
    if (gender === 'Mujer') return <Venus size={16} />;
    return <VenusAndMars size={16} />;
};

export default function RoutineCard({ routine, onEliminar, onEditar }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleEliminar = async (e) => {
        e.stopPropagation();
        if (confirm('¿Seguro que quieres eliminar esta rutina?')) {
            await onEliminar(routine.id);
        }
        setShowMenu(false);
    };

    const handleEditar = (e) => {
        e.stopPropagation();
        onEditar(routine);
        setShowMenu(false);
    };

    return (
        <div className="routine-card" style={{ backgroundImage: `url(${routine.theme})` }}
            onClick={() => navigate(`/entrenador/rutinas/${routine.id}`)}>
            <div className="routine-card-overlay">
                <div className="routine-card-info">
                    <h3>{routine.name.toUpperCase()}</h3>
                    <span className="routine-card-type">{routine.routineType === 'weekly' ? 'PROGRAMA SEMANAL' : 'RUTINA ESTÁTICA'}</span>
                </div>
                <div className="routine-card-tags">
                    <span className="tag tag-gender">{genderIcon(routine.gender)}</span>
                    {routine.type && <span className="tag">{routine.type.toUpperCase()}</span>}
                    {routine.level && <span className="tag">{routine.level.toUpperCase()}</span>}
                </div>
            </div>

            <div className="routine-card-menu" onClick={e => e.stopPropagation()}>
                <button className="routine-card-menu-btn"
                    onClick={() => setShowMenu(!showMenu)}>
                    <EllipsisVertical size={18} />
                </button>
                {showMenu && (
                    <div className="routine-card-dropdown">
                        <button onClick={handleEditar}>
                            <Pencil size={14} /> Editar
                        </button>
                        <button onClick={handleEliminar}>
                            <Trash2 size={14} /> Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}