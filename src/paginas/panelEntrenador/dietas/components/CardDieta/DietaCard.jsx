

import { useNavigate } from 'react-router-dom';
import './DietaCard.css';

export default function DietaCard({ dieta }) {
    const navigate = useNavigate();
    const totalMenus = dieta.estructura?.menus?.length ?? 0;

    return (
        <div className="dieta-card"
            style={{ backgroundImage: `url(${dieta.tema})` }}
            onClick={() => navigate(`/entrenador/dietas/${dieta.id}`)}>
            <div className="dieta-card-overlay">
                <div className="dieta-card-info">
                    <h3>{dieta.titulo.toUpperCase()}</h3>
                    <span className="dieta-card-meta">
                        {dieta.calorias_on ? `${dieta.calorias_on} KCAL · ` : ''}{totalMenus} {totalMenus === 1 ? 'menú' : 'menús'}
                    </span>
                </div>
                <div className="dieta-card-tags">
                    {dieta.tipo && (
                        <span className="dieta-card-pill">{dieta.tipo.toUpperCase()}</span>
                    )}
                    {dieta.modo_seguro && (
                        <span className="dieta-card-pill">MODO SEGURO</span>
                    )}
                </div>
            </div>
        </div>
    );
}