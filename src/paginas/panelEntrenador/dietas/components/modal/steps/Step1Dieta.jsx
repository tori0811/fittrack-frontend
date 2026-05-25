import { Lock } from 'lucide-react';
import "../../../styles/steps.css";

const DIET_TYPES = ['Normal', 'Flexitariana', 'Vegetariana', 'Vegana', 'Paleo', 'Otro'];

const ALERGENOS = [
    'Gluten', 'Crustáceos', 'Huevos', 'Pescado', 'Cacahuetes',
    'Soja', 'Lácteos', 'Frutos de cáscara', 'Apio', 'Mostaza',
    'Granos de sésamo', 'Moluscos', 'Dióxido de azufre y sulfitos', 'Altramuces'
];

const ADVERTENCIAS = [
    'Alto en FODMAPs', 'Alto en sodio', 'Alto en azúcares simples',
    'Contiene edulcorantes artificiales', 'Alto en fructosa y sorbitol',
    'Contiene cafeína', 'Contiene alcohol', 'Contiene picante',
    'Contiene aditivos cuestionables', 'Contiene polioles',
    'Contiene histamina', 'Alto en grasas saturadas',
    'Contiene grasas trans', 'Ultraprocesado', 'Alto índice glucémico'
];

export default function Step1Dieta({ dietaData, setDietaData }) {

    const toggleAlergeno = (item) => {
        const current = dietaData.alergenos || [];
        setDietaData({
            ...dietaData,
            alergenos: current.includes(item)
                ? current.filter(a => a !== item)
                : [...current, item]
        });
    };

    const toggleAdvertencia = (item) => {
        const current = dietaData.advertencias || [];
        setDietaData({
            ...dietaData,
            advertencias: current.includes(item)
                ? current.filter(a => a !== item)
                : [...current, item]
        });
    };

    return (
        <div className="modal-content">
            <div className="form-group">
                <h4>Nombre de la dieta</h4>
                <input
                    type="text"
                    placeholder="Nombre de la dieta (Tu cliente no ve esto)"
                    value={dietaData.titulo || ''}
                    onChange={e => setDietaData({ ...dietaData, titulo: e.target.value })}
                />
            </div>

            <div className="form-group">
                <h4>Tipo</h4>
                <div className="pills">
                    {DIET_TYPES.map(type => (
                        <button
                            key={type}
                            className={`pill ${dietaData.tipo === type ? 'selected' : ''}`}
                            onClick={() => setDietaData({ ...dietaData, tipo: type })}>
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <h4>Modos especiales</h4>
                <div
                    className={`modo-card ${dietaData.modo_seguro ? 'active' : ''}`}
                    onClick={() => setDietaData({ ...dietaData, modo_seguro: !dietaData.modo_seguro })}>
                    <div className="modo-card-left">
                        <Lock size={20} />
                        <span>MODO SEGURO</span>
                    </div>
                    <p className="modo-card-desc">Ayuda a crear dietas para personas con alergias, intolerancias y otras necesidades especiales.</p>
                    <div className={`toggle-switch ${dietaData.modo_seguro ? 'on' : ''}`} />
                </div>
            </div>

            {dietaData.modo_seguro && (
                <>
                    <div className="form-group">
                        <h4>Alérgenos</h4>
                        <div className="pills">
                            {ALERGENOS.map(a => (
                                <button
                                    key={a}
                                    className={`pill ${(dietaData.alergenos || []).includes(a) ? 'selected' : ''}`}
                                    onClick={() => toggleAlergeno(a)}>
                                    {a.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <h4>Advertencias nutricionales</h4>
                        <div className="pills">
                            {ADVERTENCIAS.map(a => (
                                <button
                                    key={a}
                                    className={`pill ${(dietaData.advertencias || []).includes(a) ? 'selected' : ''}`}
                                    onClick={() => toggleAdvertencia(a)}>
                                    {a.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}