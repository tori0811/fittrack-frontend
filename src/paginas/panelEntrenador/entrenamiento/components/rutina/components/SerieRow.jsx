
import { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import "../styles/SerieRow.css";

export default function SerieRow({ serie, index, ejercicioId, entrenoId, microcicloId, onEdit, onDelete, rpeOptions }) {
    const [showRpe, setShowRpe] = useState(false);
    const rpeRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (rpeRef.current && !rpeRef.current.contains(e.target)) setShowRpe(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = (campo, valor) => {
        onEdit(serie.id, campo, valor, ejercicioId, entrenoId, microcicloId);
    };

    return (
        <div className="serie-row">
            <span className="serie-index">SET {index + 1}</span>
            <input
                className="serie-input"
                placeholder="-"
                defaultValue={serie.reps_objetivo || ''}
                onBlur={(e) => handleChange('reps_objetivo', e.target.value)}
            />
            <div className="rpe-selector" ref={rpeRef}>
                <button className="rpe-btn" onClick={() => setShowRpe(!showRpe)}>
                    {serie.rpe_objetivo || 'RPE'} <ChevronDown size={12} />
                </button>
                {showRpe && (
                    <div className="rpe-dropdown">
                        {rpeOptions.map(opt => (
                            <button key={opt} className="rpe-option"
                                onClick={() => { handleChange('rpe_objetivo', opt); setShowRpe(false); }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <button className="serie-delete" onClick={() => onDelete(serie.id, ejercicioId, entrenoId, microcicloId)}>
                <Trash2 size={13} />
            </button>
        </div>
    );
}