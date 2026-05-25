import { useState } from 'react';
import { X } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../../../context/AuthContext';
import './AddAlimentoModal.css';

const MEDICIONES = ['Gramos', 'Mililitros', 'Unidad', 'Taza', 'Cucharada', 'Cucharadita'];

export default function AddAlimentoModal({ comida, menuId, onClose, onGuardar }) {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [medicion, setMedicion] = useState('Gramos');
    const [proteinas, setProteinas] = useState('');
    const [carbos, setCarbos] = useState('');
    const [grasas, setGrasas] = useState('');
    const [kcal, setKcal] = useState('');

    const canGuardar = nombre.trim() && cantidad;

    const handleGuardar = () => {
        if (!canGuardar) return;
        onGuardar(menuId, comida.id, {
            id: Date.now(),
            nombre: nombre.trim(),
            cantidad: Number(cantidad),
            medicion,
            proteinas: Number(proteinas) || 0,
            carbos: Number(carbos) || 0,
            grasas: Number(grasas) || 0,
            kcal: Number(kcal) || 0,
        });
        onClose();
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 200 }}>
            <div className="alimento-modal">
                <div className="alimento-modal-header">
                    <h2>{comida.nombre}</h2>
                    <button className="alimento-modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="alimento-modal-body">

                    {/* Nombre */}
                    <div className="alimento-campo-full">
                        <label>Nombre del alimento</label>
                        <input
                            type="text"
                            placeholder="Ej: Pechuga de pollo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="alimento-input"
                            autoFocus
                        />
                    </div>

                    {/* Cantidad y medición */}
                    <div className="alimento-campos">
                        <div className="alimento-campo">
                            <label>Cantidad</label>
                            <input
                                type="number"
                                min={1}
                                placeholder="100"
                                value={cantidad}
                                onChange={e => setCantidad(e.target.value)}
                                className="alimento-input"
                            />
                        </div>
                        <div className="alimento-campo">
                            <label>Medición</label>
                            <select
                                value={medicion}
                                onChange={e => setMedicion(e.target.value)}
                                className="alimento-select">
                                {MEDICIONES.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="alimento-divider" />

                    {/* Macros */}
                    <div className="alimento-campos">
                        <div className="alimento-campo">
                            <label>Proteínas (g)</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={proteinas}
                                onChange={e => setProteinas(e.target.value)}
                                className="alimento-input"
                            />
                        </div>
                        <div className="alimento-campo">
                            <label>Carbos (g)</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={carbos}
                                onChange={e => setCarbos(e.target.value)}
                                className="alimento-input"
                            />
                        </div>
                        <div className="alimento-campo">
                            <label>Grasas (g)</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={grasas}
                                onChange={e => setGrasas(e.target.value)}
                                className="alimento-input"
                            />
                        </div>
                        <div className="alimento-campo">
                            <label>Kcal</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={kcal}
                                onChange={e => setKcal(e.target.value)}
                                className="alimento-input"
                            />
                        </div>
                    </div>

                </div>

                <div className="alimento-modal-footer">
                    <button
                        className={`alimento-aceptar ${!canGuardar ? 'disabled' : ''}`}
                        onClick={handleGuardar}
                        disabled={!canGuardar}>
                        ACEPTAR
                    </button>
                </div>
            </div>
        </div>
    );
}
