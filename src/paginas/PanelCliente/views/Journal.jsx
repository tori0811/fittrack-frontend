

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import '../styles/cliente.css';

const MOODS = ['Muy bien', 'Bien', 'Regular', 'Mal'];
const API = 'http://localhost:8000/api';

export default function Journal() {
    const { token } = useContext(AuthContext);
    const [entries, setEntries] = useState([]);
    const [contenido, setContenido] = useState('');
    const [mood, setMood] = useState('Bien');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchEntries = async () => {
        try {
            const res = await fetch(`${API}/journal`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setEntries(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEntries(); }, []);

    const handleGuardar = async () => {
        if (!contenido.trim()) return;
        setSaving(true);
        try {
            await fetch(`${API}/journal`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contenido, estado_animo: mood, fecha: new Date().toISOString().split('T')[0] })
            });
            setContenido('');
            setMood('Bien');
            fetchEntries();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="cliente-page">
            <div className="cliente-page-title">Journal</div>

            <div className="cliente-card">
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.8rem' }}>
                    Nueva entrada — hoy
                </div>
                <textarea
                    style={{
                        width: '100%', border: '1px solid var(--color-border)', borderRadius: 10,
                        padding: '1rem', fontSize: '1.1rem', resize: 'none', fontFamily: 'inherit',
                        background: 'var(--color-secondary)', color: 'var(--color-text)',
                        marginBottom: '1rem'
                    }}
                    rows={4}
                    placeholder="¿Cómo te has sentido hoy? ¿Qué has hecho?"
                    value={contenido}
                    onChange={e => setContenido(e.target.value)}
                />
                <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
                    Estado de ánimo
                </div>
                <div className="mood-selector">
                    {MOODS.map(m => (
                        <button
                            key={m}
                            className={`mood-opt ${mood === m ? 'active' : ''}`}
                            onClick={() => setMood(m)}>
                            {m}
                        </button>
                    ))}
                </div>
                <button
                    className="btn-aceptar"
                    onClick={handleGuardar}
                    disabled={saving || !contenido.trim()}
                    style={{ marginTop: '0.5rem', background: 'var(--color-primary)' }}>
                    {saving ? 'Guardando...' : 'Guardar entrada'}
                </button>
            </div>

            <div className="cliente-section-label">Entradas anteriores</div>

            {loading && <p style={{ color: 'var(--color-text-muted)' }}>Cargando...</p>}

            {!loading && entries.length === 0 && (
                <p style={{ color: 'var(--color-text-muted)' }}>No hay entradas todavía.</p>
            )}

            {entries.map(entry => (
                <div key={entry.id} className="journal-card">
                    <div className="journal-date">{entry.fecha}</div>
                    <div className="journal-text">{entry.contenido}</div>
                    {entry.estado_animo && (
                        <span className="journal-mood">Estado: {entry.estado_animo}</span>
                    )}
                </div>
            ))}
        </div>
    );
}
