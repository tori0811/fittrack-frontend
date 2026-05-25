
import { useState, useRef } from 'react';
import { Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import '../DietaConstructor.css';
import AddAlimentoModal from './AddAlimentoModal';

function ComidaCard({ comida, menuId, onEliminar, onDuplicar, onRenombrar, onClickComida }) {
    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState(comida.nombre);

    const handleBlur = () => {
        setEditando(false);
        if (nombre.trim() && nombre !== comida.nombre) {
            onRenombrar(menuId, comida.id, nombre);
        }
    };

    return (
        <div className="dieta-comida-card" onClick={() => !editando && onClickComida(comida)}>
            <div className="dieta-comida-header">
                {editando ? (
                    <input
                        className="dieta-comida-nombre-input"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <span
                        className="dieta-comida-nombre"
                        onDoubleClick={() => setEditando(true)}>
                        {comida.nombre}
                    </span>
                )}
                <div className="dieta-comida-actions">
                    <button onClick={() => onDuplicar(menuId, comida.id)} title="Duplicar">
                        <Copy size={15} />
                    </button>
                    <button onClick={() => onEliminar(menuId, comida.id)} title="Eliminar">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>

            {(comida.alimentos ?? []).length === 0 ? (
            <div className="dieta-comida-empty">Sin alimentos</div>
            ) : (
                <div className="dieta-alimentos-list">
                    {(comida.alimentos ?? []).map(a => (
                        <div key={a.id} className="dieta-alimento-item">
                            <span>{a.nombre}</span>
                            <span className="dieta-alimento-cantidad">{a.cantidad} {a.medicion}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function MenuTab({
    menu,
    onAddComida,
    onEliminarComida,
    onDuplicarComida,
    onRenombrarComida,
    onRenombrarMenu,
    onGuardarAlimento
}) {
    const [editandoMenu, setEditandoMenu] = useState(false);
    const [nombreMenu, setNombreMenu] = useState(menu.nombre);
    const [comidaActiva, setComidaActiva] = useState(null);

    const handleBlurMenu = () => {
        setEditandoMenu(false);
        if (nombreMenu.trim() && nombreMenu !== menu.nombre) {
            onRenombrarMenu(menu.id, nombreMenu);
        }
    };

    return (
        <div className="dieta-menu-tab">
            <div className="dieta-dias">
                <div className="dieta-dia-col">
                    <div className="dieta-dia-header">
                        {editandoMenu ? (
                            <input
                                className="dieta-menu-nombre-input"
                                value={nombreMenu}
                                onChange={e => setNombreMenu(e.target.value)}
                                onBlur={handleBlurMenu}
                                autoFocus
                            />
                        ) : (
                            <span
                                className="dieta-menu-nombre"
                                onDoubleClick={() => setEditandoMenu(true)}>
                                {menu.nombre}
                            </span>
                        )}
                    </div>

                    <div className="dieta-comidas-list">
                        {menu.comidas.map(comida => (
                            <ComidaCard
                                key={comida.id}
                                comida={comida}
                                menuId={menu.id}
                                onEliminar={onEliminarComida}
                                onDuplicar={onDuplicarComida}
                                onRenombrar={onRenombrarComida}
                                onClickComida={setComidaActiva}
                            />
                        ))}
                    </div>

                    <button
                        className="dieta-add-comida"
                        onClick={() => onAddComida(menu.id)}>
                        + AÑADIR COMIDA
                    </button>
                </div>
            </div>

            {comidaActiva && (
                <AddAlimentoModal
                    comida={comidaActiva}
                    menuId={menu.id}
                    onClose={() => setComidaActiva(null)}
                    onGuardar={(menuId, comidaId, alimento) => {
                        onGuardarAlimento(menuId, comidaId, alimento);
                        setComidaActiva(null);
                    }}
                />
            )}
        </div>
    );
}
