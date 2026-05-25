import { useState, useMemo } from "react";
import useResenasEntrenador from "../hooks/useResenasEntrenador";
import "../styles/ResenasEntrenador.css";

export default function ResenasEntrenador() {

    const { loading, rating, reviews } = useResenasEntrenador();

    const [filtro, setFiltro] = useState("todas");

    // ICONO ESTRELLA
    const Star = ({ filled }) => (
        <svg width="18" height="18" viewBox="0 0 24 24"
            fill={filled ? "#ffb400" : "none"}
            stroke="#ffb400" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15 10 23 10 17 14.5 19 22 12 17.5 5 22 7 14.5 1 10 9 10" />
        </svg>
    );

    // FORMATEO FECHA
    const formatFecha = (fecha) =>
        new Date(fecha).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    // FILTROS
    const filtradas = useMemo(() => {
        if (!reviews) return [];

        let arr = [...reviews];

        if (filtro === "recientes") {
            arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        if (filtro === "mejor") {
            arr.sort((a, b) => b.rating - a.rating);
        }
        if (filtro === "peor") {
            arr.sort((a, b) => a.rating - b.rating);
        }
        if (filtro === "comentario") {
            arr = arr.filter(r => r.comentario?.trim() !== "");
        }

        return arr;
    }, [filtro, reviews]);

    if (loading) return <p>Cargando reseñas...</p>;
    if (!rating) return <p>No hay datos.</p>;

    return (
        <div className="resenas-wrapper">

            {/* FILTROS */}
            <div className="filtros">
                <button className={filtro === "todas" ? "active" : ""} onClick={() => setFiltro("todas")}>Todas</button>
                <button className={filtro === "recientes" ? "active" : ""} onClick={() => setFiltro("recientes")}>Más recientes</button>
                <button className={filtro === "mejor" ? "active" : ""} onClick={() => setFiltro("mejor")}>Mejor valoradas</button>
                <button className={filtro === "peor" ? "active" : ""} onClick={() => setFiltro("peor")}>Peor valoradas</button>
                <button className={filtro === "comentario" ? "active" : ""} onClick={() => setFiltro("comentario")}>Con comentario</button>
            </div>

            {/* LISTA DE RESEÑAS */}
            <div className="lista-resenas-row">
                {filtradas.length === 0 ? (
                    <p>No hay reseñas con este filtro.</p>
                ) : (
                    filtradas.map((r) => {
                        const inicial = r.cliente?.name?.charAt(0)?.toUpperCase() || "U";

                        return (
                            <div className="resena-card" key={r.id}>

                                {/* HEADER */}
                                <div className="resena-header">
                                    <div className="avatar"><span>{inicial}</span></div>

                                    <div className="resena-info">
                                        <div className="nombre-linea">
                                            <strong>{r.cliente.name} {r.cliente.apellido}</strong>
                                        </div>

                                        <div className="resena-stars-row">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} filled={i < r.rating} />
                                            ))}
                                        </div>

                                        <span className="fecha">{formatFecha(r.created_at)}</span>
                                    </div>
                                </div>

                                {/* COMENTARIO */}
                                <p className="texto-resena">{r.comentario || "Sin comentario"}</p>

                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
}
