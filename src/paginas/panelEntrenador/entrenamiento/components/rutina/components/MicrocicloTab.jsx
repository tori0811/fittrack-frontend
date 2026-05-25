import { Plus } from 'lucide-react';
import EntrenoCard from './EntrenoCard';
import "../styles/MicrocicloTab.css";

export default function MicrocicloTab({
    microciclo, onAddEntreno, onEditEntreno, onDeleteEntreno,
    onDuplicarEntreno, onAddEjercicio, onDeleteEjercicio,
    onAddSerie, onEditSerie, onDeleteSerie
}) {
    return (
        <div className="microciclo-content">
            <div className="entrenos-grid">
                {(microciclo.entrenos || []).map(entreno => (
                    <EntrenoCard
                        key={entreno.id}
                        entreno={entreno}
                        microcicloId={microciclo.id}
                        onEdit={onEditEntreno}
                        onDelete={onDeleteEntreno}
                        onDuplicar={onDuplicarEntreno}
                        onAddEjercicio={onAddEjercicio}
                        onDeleteEjercicio={onDeleteEjercicio}
                        onAddSerie={onAddSerie}
                        onEditSerie={onEditSerie}
                        onDeleteSerie={onDeleteSerie}
                    />
                ))}
                <button className="entreno-add-btn" onClick={onAddEntreno}>
                    + AÑADIR DÍA
                </button>
            </div>
        </div>
    );
}