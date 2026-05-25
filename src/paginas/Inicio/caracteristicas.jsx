import "./Caracteristicas.css";

function Caracteristicas() {
  return (
    <section className="caracteristicas">
                
        <h3 className="titulo-caracteristicas">Características</h3>

        <p className="caracteristicas-descripcion">
            FitTracker es una plataforma diseñada para ayudarte a alcanzar tus metas fitness
            mediante entrenamientos personalizados, seguimiento inteligente del progreso y el
            apoyo de entrenadores certificados.
        </p>

        <div className="caracteristica-item">
            <p className="caracteristicas-contenido">Rutinas diseñadas para ti</p>
            <p className="caracteristicas-texto">
            Obtén planes de entrenamiento adaptados a tu objetivo, nivel y disponibilidad.
            </p>
        </div>

        <div className="caracteristica-item">
            <p className="caracteristicas-contenido">Seguimiento inteligente</p>
            <p className="caracteristicas-texto">
            Monitorea tu evolución y recibe ajustes automáticos para seguir progresando.
            </p>
        </div>

        <div className="caracteristica-item">
            <p className="caracteristicas-contenido">Entrenadores certificados</p>
            <p className="caracteristicas-texto">
            Accede a entrenadores profesionales listos para guiarte en cada paso.
            </p>
        </div>

        <div className="caracteristica-item">
            <p className="caracteristicas-contenido">Dietas personalizadas</p>
            <p className="caracteristicas-texto">
            Planes alimenticios hechos a tu medida según tus preferencias y objetivos.
            </p>
        </div>

        <div className="caracteristica-item">
            <p className="caracteristicas-contenido">Mensajería personalizada</p>
            <p className="caracteristicas-texto">
            Comunícate directamente con expertos para resolver dudas y mejorar tu rendimiento.
            </p>
        </div>
                
                
    </section>
  );
}

export default Caracteristicas;