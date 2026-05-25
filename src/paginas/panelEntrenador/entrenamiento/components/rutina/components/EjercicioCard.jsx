import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import EjercicioDetalleModal from './EjercicioModal';
import "../styles/EjercicioCard.css";
import EjercicioModal from './EjercicioModal';

export default function EjercicioCard({
    ejercicio, entrenoId, microcicloId, onDelete, onAddSerie, onEditSerie, onDeleteSerie
}) {
    const [hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const totalSeries = ejercicio.series?.length || 0;
    const repsResumen = ejercicio.series?.[0]?.reps_objetivo || '-';

    return (
        <>
            <div
                className="ejercicio-card"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setShowModal(true)}>
                <div className="ejercicio-header">
                    <span className="ejercicio-nombre">{ejercicio.nombre}</span>
                    {hover && (
                        <button className="ejercicio-delete" onClick={e => {
                            e.stopPropagation();
                            onDelete(ejercicio.id, entrenoId, microcicloId);
                        }}>
                            <Trash2 size={15} />
                        </button>
                    )}
                </div>
                {totalSeries > 0 && (
                    <div className="ejercicio-resumen">
                        <span>{totalSeries} {totalSeries === 1 ? 'set' : 'sets'}</span>
                        <span>x{repsResumen} reps</span>
                    </div>
                )}
            </div>

            {showModal && (
                <EjercicioModal
                    ejercicio={ejercicio}
                    entrenoId={entrenoId}
                    microcicloId={microcicloId}
                    onAddSerie={onAddSerie}
                    onEditSerie={onEditSerie}
                    onDeleteSerie={onDeleteSerie}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}