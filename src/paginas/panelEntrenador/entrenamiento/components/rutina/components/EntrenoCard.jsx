import { useState, useRef, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import EjercicioCard from './EjercicioCard';
import CrearEjercicioModal from './CrearEjercicioModal';
import "../styles/EntrenoCard.css";

export default function EntrenoCard({
    entreno, microcicloId, onEdit, onDelete, onDuplicar,
    onAddEjercicio, onDeleteEjercicio, onAddSerie, onEditSerie, onDeleteSerie
}) {
    const [titulo, setTitulo] = useState(entreno.titulo || '');
    const [editando, setEditando] = useState(!entreno.titulo);
    const [hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editando && inputRef.current) inputRef.current.focus();
    }, [editando]);

    const handleTituloChange = (e) => {
        setTitulo(e.target.value.toUpperCase());
    };

    const handleTituloBlur = () => {
        if (titulo.trim()) {
            setEditando(false);
            onEdit(entreno.id, titulo, microcicloId);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleTituloBlur();
    };

    return (
        <div className="entreno-card">
            <div
                className="entreno-header"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <span className="entreno-dia">DÍA {entreno.orden}</span>
                {editando ? (
                    <input
                        ref={inputRef}
                        className="entreno-titulo-input"
                        value={titulo}
                        onChange={handleTituloChange}
                        onBlur={handleTituloBlur}
                        onKeyDown={handleKeyDown}
                        placeholder="PRESS, TORSO, PIERNA..."
                    />
                ) : (
                    <span className="entreno-titulo" onClick={() => setEditando(true)}>
                        {titulo || 'Sin título'}
                    </span>
                )}
                {hover && !editando && (
                    <div className="entreno-actions">
                        <button onClick={() => onDuplicar(entreno.id, microcicloId)}><Copy size={16} /></button>
                        <button onClick={() => onDelete(entreno.id, microcicloId)}><Trash2 size={16} /></button>
                    </div>
                )}
            </div>

            <div className="entreno-ejercicios">
                {(entreno.ejercicios || []).map(ejercicio => (
                    <EjercicioCard
                        key={ejercicio.id}
                        ejercicio={ejercicio}
                        entrenoId={entreno.id}
                        microcicloId={microcicloId}
                        onDelete={onDeleteEjercicio}
                        onAddSerie={onAddSerie}
                        onEditSerie={onEditSerie}
                        onDeleteSerie={onDeleteSerie}
                    />
                ))}
            </div>

            <button className="ejercicio-add-btn" onClick={() => setShowModal(true)}>
                + AÑADIR EJERCICIO
            </button>

            {showModal && (
                <CrearEjercicioModal
                    entrenoId={entreno.id}
                    microcicloId={microcicloId}
                    onAdd={onAddEjercicio}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}