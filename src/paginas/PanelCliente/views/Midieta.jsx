
import { useState } from 'react';
import { usePanelCliente } from '../hooks/usePanelCliente';
import '../styles/cliente.css';

export default function MiDieta() {
    const { data, loading } = usePanelCliente();
    const [menuActivo, setMenuActivo] = useState(0);

    if (loading) return <div className="cliente-page"><p>Cargando...</p></div>;

    const dieta = data?.dieta_activa;

    if (!dieta) return (
        <div className="cliente-page">
            <div className="cliente-page-title">Mi dieta</div>
            <p style={{ color: 'var(--color-text-muted)' }}>No tienes ninguna dieta asignada todavía.</p>
        </div>
    );

    const menus = dieta.estructura?.menus ?? [];
    const menuActual = menus[menuActivo];

    return (
        <div className="cliente-page">
            <div className="cliente-page-header">
                <div className="cliente-page-title">{dieta.titulo}</div>
                <span className="cliente-tag cliente-tag-green">{dieta.tipo}</span>
            </div>

            <div className="menu-tabs-cliente">
                {menus.map((menu, i) => (
                    <div
                        key={menu.id}
                        className={`menu-tab-cliente ${menuActivo === i ? 'active' : ''}`}
                        onClick={() => setMenuActivo(i)}>
                        {menu.nombre}
                    </div>
                ))}
            </div>

            {menuActual && (
                <div className="cliente-grid2">
                    <div>
                        <div className="cliente-section-label">Comidas</div>
                        {(menuActual.comidas ?? []).map(comida => (
                            <div key={comida.id} className="comida-card-cliente">
                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
                                    {comida.nombre}
                                </div>
                                {(comida.alimentos ?? []).map(a => (
                                    <div key={a.id} className="alim-row-cliente">
                                        <span>{a.nombre}</span>
                                        <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                                            {a.cantidad} {a.medicion}
                                        </span>
                                    </div>
                                ))}
                                {(!comida.alimentos || comida.alimentos.length === 0) && (
                                    <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Sin alimentos</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="cliente-section-label">Resumen nutricional</div>
                        <div className="cliente-card">
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>
                                {menuActivo === 0 ? dieta.calorias_on : dieta.calorias_off ?? '—'}
                                <span style={{ fontSize: '1.1rem', fontWeight: 400 }}> kcal</span>
                            </div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                                {menuActual.nombre}
                            </div>

                            {[
                                { label: 'Proteínas', val: menuActivo === 0 ? dieta.proteinas_on : dieta.proteinas_off, color: 'var(--color-primary)' },
                                { label: 'Carbohidratos', val: menuActivo === 0 ? dieta.carbohidratos_on : dieta.carbohidratos_off, color: 'var(--color-accent)' },
                                { label: 'Grasas', val: menuActivo === 0 ? dieta.grasas_on : dieta.grasas_off, color: '#1D9E75' },
                            ].map(macro => (
                                <div key={macro.label} style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: 4 }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>{macro.label}</span>
                                        <span style={{ fontWeight: 700 }}>{macro.val ?? '—'}g</span>
                                    </div>
                                    <div className="cliente-pbar">
                                        <div className="cliente-pbar-fill" style={{ width: '50%', background: macro.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
