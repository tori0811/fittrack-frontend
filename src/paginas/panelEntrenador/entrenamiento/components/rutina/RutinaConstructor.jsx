import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Plus, Pencil, MoreVertical } from 'lucide-react';
import { useRutina } from './hooks/useRutina';
import MicrocicloTab from './components/MicrocicloTab';
import CreateModal from '../modal/createModal';
import './RutinaConstructor.css';

function MicrocicloButton({ microciclo, index, active, onClick, onEliminar, onDuplicar }) {
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
            <button className={`microciclo-tab ${active ? 'active' : ''}`} onClick={onClick}>
                MICROCICLO {microciclo.numero}
                <span
                    className="microciclo-tab-menu-btn"
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}>
                    <MoreVertical size={14} />
                </span>
            </button>
            {showMenu && (
                <div className="microciclo-tab-dropdown">
                    <button onClick={() => { onDuplicar(microciclo.id); setShowMenu(false); }}>
                        Duplicar
                    </button>
                    <button onClick={() => { onEliminar(microciclo.id); setShowMenu(false); }}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
);
}

export default function RutinaConstructor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);

    const {
        rutina, bloque, microciclos, activeMicrociclo, setActiveMicrociclo,
        editarPlantilla, crearMicrociclo, eliminarMicrociclo, duplicarMicrociclo,
        crearEntreno, editarEntreno, eliminarEntreno, duplicarEntreno,
        crearEjercicio, eliminarEjercicio,
        crearSerie, editarSerie, eliminarSerie
    } = useRutina(id);

    const microcicloActual = microciclos[activeMicrociclo];

    return (
        <div className="constructor">
            <div className="constructor-header">
                <button className="constructor-back" onClick={() => navigate('/entrenador/plantillas')}>
                    <ArrowLeft size={30} />
                </button>
                {rutina?.theme && (
                    <img src={rutina.theme} alt="tema" className="constructor-theme-img" />
                )}
                <span className="constructor-nombre">{rutina?.name?.toUpperCase()}</span>
                <button className="constructor-nombre-btn" onClick={() => setShowEditModal(true)}>
                    <Pencil size={18} />
                </button>
            </div>

            <div className="constructor-microciclos">
                {microciclos.map((m, i) => (
                    <MicrocicloButton
                        key={m.id}
                        microciclo={m}
                        index={i}
                        active={activeMicrociclo === i}
                        onClick={() => setActiveMicrociclo(i)}
                        onEliminar={eliminarMicrociclo}
                        onDuplicar={duplicarMicrociclo}
                    />
                ))}
                <button className="microciclo-add" onClick={() => bloque && crearMicrociclo(bloque.id)}>
                    <Plus size={18} />
                </button>
            </div>

            <div className="constructor-divider" />

            {microcicloActual && (
                <MicrocicloTab
                    microciclo={microcicloActual}
                    onAddEntreno={() => crearEntreno(microcicloActual.id)}
                    onEditEntreno={editarEntreno}
                    onDeleteEntreno={eliminarEntreno}
                    onDuplicarEntreno={duplicarEntreno}
                    onAddEjercicio={crearEjercicio}
                    onDeleteEjercicio={eliminarEjercicio}
                    onAddSerie={crearSerie}
                    onEditSerie={editarSerie}
                    onDeleteSerie={eliminarSerie}
                />
            )}

            {!microcicloActual && !microciclos.length && (
                <div className="constructor-empty">
                    <p>No hay microciclos. Pulsa + para añadir uno.</p>
                </div>
            )}

            <CreateModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                onSuccess={() => {}}
                editMode={true}
                initialData={rutina}
                onEdit={editarPlantilla}
            />
        </div>
    );
}