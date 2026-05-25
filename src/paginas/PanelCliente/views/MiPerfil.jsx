

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { usePanelCliente } from '../hooks/usePanelCliente';
import '../styles/cliente.css';

export default function MiPerfil() {
    const { user } = useContext(AuthContext);
    const { data, loading } = usePanelCliente();

    if (loading) return <div className="cliente-page"><p>Cargando...</p></div>;

    const entrenador = data?.entrenador;
    const peso = data?.ultimo_peso;
    const bloque = data?.bloque;
    const dieta = data?.dieta_activa;

    const iniciales = user?.name
        ?.split(' ')
        .map(p => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) ?? 'CL';

    return (
        <div className="cliente-page">
            <div className="perfil-banner" />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="perfil-avatar">{iniciales}</div>
                <div style={{ paddingBottom: 8 }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>{user?.name}</div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                        Cliente · {user?.email}
                    </div>
                </div>
            </div>

            <div className="cliente-grid4">
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Peso actual</div>
                    <div className="cliente-metric-value">{peso?.peso ?? '—'} kg</div>
                    <div className="cliente-metric-sub">{peso?.fecha ?? 'Sin registros'}</div>
                </div>
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Rutina activa</div>
                    <div className="cliente-metric-value" style={{ fontSize: '1.4rem' }}>{bloque?.titulo ?? '—'}</div>
                    <div className="cliente-metric-sub">Asignada por entrenador</div>
                </div>
                <div className="cliente-metric">
                    <div className="cliente-metric-label">Dieta activa</div>
                    <div className="cliente-metric-value" style={{ fontSize: '1.4rem' }}>{dieta?.titulo ?? '—'}</div>
                    <div className="cliente-metric-sub">{dieta?.tipo ?? ''}</div>
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
                    <div className="cliente-section-label">Datos personales</div>
                    <div className="cliente-card">
                        <table style={{ width: '100%', fontSize: '1.1rem', borderCollapse: 'collapse' }}>
                            {[
                                { label: 'Nombre', val: user?.name },
                                { label: 'Email', val: user?.email },
                                { label: 'Entrenador', val: entrenador?.name ?? '—' },
                                { label: 'Rutina', val: bloque?.titulo ?? '—' },
                                { label: 'Dieta', val: dieta?.titulo ?? '—' },
                            ].map(row => (
                                <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '10px 0', color: 'var(--color-text-muted)' }}>{row.label}</td>
                                    <td style={{ padding: '10px 0', textAlign: 'right', color: 'var(--color-text)', fontWeight: 700 }}>{row.val}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>

                {entrenador && (
                    <div>
                        <div className="cliente-section-label">Mi entrenador</div>
                        <div className="cliente-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: '50%',
                                    background: 'var(--color-accent)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.4rem', fontWeight: 800, color: 'white', flexShrink: 0
                                }}>
                                    {entrenador.name?.[0]?.toUpperCase() ?? 'E'}
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text)' }}>
                                        {entrenador.name}
                                    </div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
                                        {entrenador.especialidad ?? 'Entrenador personal'}
                                    </div>
                                </div>
                                <span className="cliente-tag cliente-tag-green" style={{ marginLeft: 'auto' }}>Activo</span>
                            </div>
                            {entrenador.experiencia && (
                                <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                                    {entrenador.experiencia} años de experiencia.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
