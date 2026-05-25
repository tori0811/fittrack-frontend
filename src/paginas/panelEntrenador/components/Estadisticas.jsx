import '../styles/Estadisticas.css';
import { Users, Dumbbell, Utensils } from "lucide-react";

export default function Estadisticas({ stats = [] }) {

    // Mapa de iconos por label:
    const iconMap = {
        "Clientes activos": Users,
        "Rutinas creadas": Dumbbell,
        "Dietas activas": Utensils
    };

    const iconColor = "#5A54F2";

    return (
        <section className="trainer-stats">
            {stats.map((item, i) => {
                const IconComponent = iconMap[item.label] || Users;

                return (
                    <div className="stat-card card-base" key={i}>
                        
                        <div className="stat-icon-circle">
                            <IconComponent size={20} color="white" />
                        </div>

                        <h3>{item.label}</h3>

                        <p className="stat-number">{item.value}</p>

                    </div>
                );
            })}
        </section>
    );
}
