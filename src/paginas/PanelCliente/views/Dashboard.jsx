
import { usePanelCliente } from '../hooks/usePanelCliente';
import '../styles/cliente.css';

export default function Dashboard() {
    const { data, loading } = usePanelCliente();

    if (loading) return <div className="cliente-page"><p>Cargando...</p></div>;

    const bloque = data?.bloque;
    const dieta = data?.dieta_activa;
    const entrenador = data?.entrenador;
    const frase = data?.frase_motivacional;
    const user = data?.user;

    return (
        <div className="cliente-page">

            {frase && (
                <div className="cliente-frase">
                    <div className="cliente-frase-text">
                        "{frase.frase}"
                        <div className="cliente-frase-autor">— {frase.autor}</div>
                    </div>
                </div>
            )}

            <div className="cliente-grid4">
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Peso actual</div>
                    <div className="cliente-metric-value">{data?.ultimo_peso?.peso ?? '—'} kg</div>
                    <div className="cliente-metric-sub">Último registro</div>
                </div>
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Sesiones semana</div>
                    <div className="cliente-metric-value">
                        {data?.progreso_semanal?.completados ?? 0} / {data?.progreso_semanal?.objetivo ?? 0}
                    </div>
                    <div className="cliente-metric-sub">En progreso</div>
                </div>
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Entrenador</div>
                    <div className="cliente-metric-value" style={{ fontSize: '1.4rem' }}>
                        {entrenador?.name ?? '—'}
                    </div>
                    <div className="cliente-metric-sub">{entrenador?.especialidad ?? ''}</div>
                </div>
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Cuestionario</div>
                    <div className="cliente-metric-value" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                        {data?.cuestionario ? 'Completado' : 'Pendiente'}
                    </div>
                    <div className="cliente-metric-sub">Inicial</div>
                </div>
            </div>

            <div className="cliente-grid2">
                <div>
                    <div className="cliente-section-label">Mi rutina</div>
                    <div className="cliente-card">
                        <div className="cliente-hero">
                            <div>
                                <span className="cliente-tag cliente-tag-red">Entrenamiento</span>
                                <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
                                    {bloque?.titulo ?? 'Sin rutina asignada'}
                                </div>
                            </div>
                        </div>
                        {bloque && (
                            <>
                                <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                                    {data?.progreso_semanal?.completados ?? 0} completados · {data?.progreso_semanal?.restantes ?? 0} restantes
                                </div>
                                <div className="cliente-pbar">
                                    <div
                                        className="cliente-pbar-fill cliente-pbar-fill-red"
                                        style={{ width: `${data?.progreso_semanal?.objetivo > 0 ? (data.progreso_semanal.completados / data.progreso_semanal.objetivo) * 100 : 0}%` }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <div className="cliente-section-label">Mi dieta</div>
                    <div className="cliente-card">
                        <div className="cliente-hero cliente-hero-green">
                            <div>
                                <span className="cliente-tag cliente-tag-green">{dieta?.tipo ?? 'Dieta'}</span>
                                <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, marginTop: 6 }}>
                                    {dieta?.titulo ?? 'Sin dieta asignada'}
                                </div>
                            </div>
                        </div>
                        {dieta && (
                            <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
                                Comida sugerida ahora: <strong>{data?.comida_sugerida ?? '—'}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {data?.ultimo_journal && (
                <>
                    <div className="cliente-section-label">Journal reciente</div>
                    <div className="cliente-card">
                        <div className="journal-date">{data.ultimo_journal.fecha}</div>
                        <div className="journal-text">{data.ultimo_journal.contenido}</div>
                    </div>
                </>
            )}

        </div>
    );
}
