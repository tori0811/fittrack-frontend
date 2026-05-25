
import { useState } from 'react';
import { X } from 'lucide-react';
import "../styles/EjercicioModal.css";

export default function CrearEjercicioModal({ entrenoId, microcicloId, onAdd, onClose }) {
    const [nombre, setNombre] = useState('');
    const [grupoMuscular, setGrupoMuscular] = useState('');

    const handleAdd = async () => {
        if (!nombre.trim()) return;
        await onAdd(entrenoId, nombre, grupoMuscular || 'General', microcicloId);
        onClose();
    };

   return (
        <div className="detalle-modal-overlay" onClick={onClose}>
            <div className="detalle-modal" onClick={e => e.stopPropagation()}>
                <div className="detalle-modal-header">
                    <div className="detalle-modal-info">
                        <h3>Añadir Ejercicio</h3>
                    </div>
                    <button className="detalle-modal-close" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="detalle-modal-body">
                    <div className="ejercicio-modal-field">
                        <label>Nombre del ejercicio</label>
                        <input
                            type="text"
                            placeholder="Press banca, Sentadilla..."
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAdd()}
                            autoFocus
                        />
                    </div>
                    <div className="ejercicio-modal-field">
                        <label>Grupo muscular</label>
                        <input
                            type="text"
                            placeholder="Pecho, Espalda, Pierna..."
                            value={grupoMuscular}
                            onChange={e => setGrupoMuscular(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                </div>
                <div className="detalle-modal-footer">
                    <button className="ejercicio-modal-cancel" onClick={onClose}>Cancelar</button>
                    <button className="detalle-modal-aceptar" onClick={handleAdd}>Añadir</button>
                </div>
            </div>
        </div>
        );
}