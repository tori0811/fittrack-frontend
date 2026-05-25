
import { useState, useContext } from 'react';
import { Dumbbell, X, ChevronRight } from 'lucide-react';
import { usePanelCliente } from '../hooks/usePanelCliente';
import '../styles/cliente.css';

function SeriesModal({ ejercicio, onClose }) {
    if (!ejercicio) return null;

    return (
        <div className="series-modal-overlay" onClick={onClose}>
            <div className="series-modal" onClick={e => e.stopPropagation()}>
                <div className="series-modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="series-modal-icon">
                            <Dumbbell size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>
                                {ejercicio.nombre}
                            </div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
                                {ejercicio.series?.length ?? 0} sets
                            </div>
                        </div>
                    </div>
                    <button className="series-modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="series-modal-body">
                    <table className="series-table">
                        <thead>
                            <tr>
                                <th>Set</th>
                                <th>Reps objetivo</th>
                                <th>RPE</th>
                                <th>Reps</th>
                                <th>Kg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(ejercicio.series ?? []).map((serie, i) => (
                                <tr key={serie.id ?? i}>
                                    <td style={{ textAlign: 'left', fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                                        Set {i + 1}
                                    </td>
                                    <td><span className="series-obj-val">{serie.reps}</span></td>
                                    <td><span className="series-rpe">RPE {serie.rpe ?? '—'}</span></td>
                                    <td><input className="series-input" type="number" placeholder="—" /></td>
                                    <td><input className="series-input" type="number" placeholder="—" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {ejercicio.observaciones && (
                        <div className="series-obs">{ejercicio.observaciones}</div>
                    )}
                </div>

                <div className="series-modal-footer">
                    <button className="btn-aceptar" onClick={onClose}>ACEPTAR</button>
                </div>
            </div>
        </div>
    );
}

export default function MiRutina() {
    const { data, loading } = usePanelCliente();
    const [diaActivo, setDiaActivo] = useState(0);
    const [ejercicioActivo, setEjercicioActivo] = useState(null);

    if (loading) return <div className="cliente-page"><p>Cargando...</p></div>;

    const bloque = data?.bloque;
    const microciclo = bloque?.microciclos?.[0];
    const entrenos = microciclo?.entrenos ?? [];
    const entrenoActual = entrenos[diaActivo];

    if (!bloque) return (
        <div className="cliente-page">
            <div className="cliente-page-title">Mi rutina</div>
            <p style={{ color: 'var(--color-text-muted)' }}>No tienes ninguna rutina asignada todavía.</p>
        </div>
    );

    return (
        <div className="cliente-page">
            <div className="cliente-page-header">
                <div className="cliente-page-title">{bloque.titulo}</div>
            </div>

            <div className="dia-tabs-cliente">
                {entrenos.map((entreno, i) => (
                    <div
                        key={entreno.id}
                        className={`dia-tab-cliente ${diaActivo === i ? 'active' : ''}`}
                        onClick={() => setDiaActivo(i)}>
                        Día {i + 1} · {entreno.nombre}
                    </div>
                ))}
            </div>

            {entrenoActual && (
                <>
                    <div className="cliente-hero">
                        <div>
                            <span className="cliente-tag cliente-tag-red">Fuerza</span>
                            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginTop: 6 }}>
                                Día {diaActivo + 1} · {entrenoActual.nombre}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginTop: 2 }}>
                                {entrenoActual.ejercicios?.length ?? 0} ejercicios
                            </div>
                        </div>
                    </div>

                    <div className="cliente-section-label">Ejercicios</div>

                    {(entrenoActual.ejercicios ?? []).map(ej => (
                        <div
                            key={ej.id}
                            className="ej-card-cliente"
                            onClick={() => setEjercicioActivo(ej)}>
                            <div className="ej-img-cliente">
                                <Dumbbell size={22} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text)' }}>
                                    {ej.nombre}
                                </div>
                                <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                                    {ej.series?.length ?? 0} sets
                                </div>
                            </div>
                            <ChevronRight size={20} color="var(--color-text-muted)" />
                        </div>
                    ))}
                </>
            )}

            {ejercicioActivo && (
                <SeriesModal
                    ejercicio={ejercicioActivo}
                    onClose={() => setEjercicioActivo(null)}
                />
            )}
        </div>
    );
}
