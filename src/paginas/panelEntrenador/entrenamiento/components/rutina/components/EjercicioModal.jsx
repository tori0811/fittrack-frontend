import { X } from 'lucide-react';
import SerieRow from './SerieRow';
import "../styles/EjercicioModal.css";

const RPE_OPTIONS = ['SIN RPE', '1 MUY SUAVE', '2-3 SUAVE', '4-6 MODERADO', '7-8 INTENSO', '9 MUY INTENSO', '10 MAX'];

export default function EjercicioModal({
    ejercicio, entrenoId, microcicloId, onAddSerie, onEditSerie, onDeleteSerie, onClose
}) {
    return (
        <div className="detalle-modal-overlay" onClick={onClose}>
            <div className="detalle-modal" onClick={e => e.stopPropagation()}>
                <div className="detalle-modal-header">
                    <div className="detalle-modal-info">
                        <h3>{ejercicio.nombre}</h3>
                        {ejercicio.grupo_muscular && (
                            <span className="detalle-modal-grupo">{ejercicio.grupo_muscular}</span>
                        )}
                    </div>
                    <button className="detalle-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="detalle-modal-body">
                    {(ejercicio.series || []).length > 0 && (
                        <div className="series-container">
                            <div className="series-header-row">
                                <span>SET</span>
                                <span>REPS</span>
                                <span>RPE</span>
                                <span></span>
                            </div>
                            {ejercicio.series.map((serie, i) => (
                                <SerieRow
                                    key={serie.id}
                                    serie={serie}
                                    index={i}
                                    ejercicioId={ejercicio.id}
                                    entrenoId={entrenoId}
                                    microcicloId={microcicloId}
                                    onEdit={onEditSerie}
                                    onDelete={onDeleteSerie}
                                    rpeOptions={RPE_OPTIONS}
                                />
                            ))}
                        </div>
                    )}

                    <button className="serie-add-btn"
                        onClick={() => onAddSerie(ejercicio.id, entrenoId, microcicloId)}>
                        + AÑADIR SET
                    </button>
                </div>

                <div className="detalle-modal-footer">
                    <button className="detalle-modal-aceptar" onClick={onClose}>
                        ACEPTAR
                    </button>
                </div>
            </div>
        </div>
    );
}