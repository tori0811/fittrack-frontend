import { useParams } from "react-router-dom";
import useGestionCliente from "../../../hooks/useGestionCliente";
import "../styles/GestionCliente.css";

export default function GestionCliente() {
    const { id } = useParams();
    const { cliente, bloques, loading } = useGestionCliente(id);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="gestion-cliente">

            <h1>Gestión del Cliente</h1>

            <div className="cliente-info">
                <h2>{cliente?.name}</h2>
                <p>{cliente?.email}</p>
            </div>

            {/* acciones */}
            <div className="acciones-cliente">
                <button>Crear Dieta</button>
                <button>Crear Entrenamiento</button>
            </div>

            <h3>Bloques asignados</h3>

            {bloques.length === 0 ? (
                <p>No hay bloques creados.</p>
            ) : (
                <ul className="lista-bloques">
                    {bloques.map(b => (
                        <li key={b.id} className="bloque-item">
                            <strong>{b.titulo}</strong>
                            <p>{b.descripcion}</p>
                            <button>
                                Ver Microciclos
                            </button>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}
