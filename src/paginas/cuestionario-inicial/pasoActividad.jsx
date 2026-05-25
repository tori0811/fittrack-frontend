import './pasoObjetivo.css';

export default function PasoActividad( {actividad, setActividad}) {

    return (
        <div className="pregunta">
            <h2>¿Cuál es tu nivel de actividad física?</h2>

            <div className="tarjetas-opciones">

                <div className={`tarjeta ${actividad === 'sedentario' ? 'seleccionada' : ''}`} onClick={() => setActividad('sedentario')}>🛋 Sedentario</div>

                <div className={`tarjeta ${actividad === 'ligero' ? 'seleccionada' : ''}`} onClick={() => setActividad('ligero')}>🚶 Ligero</div>

                <div className={`tarjeta ${actividad === 'moderado' ? 'seleccionada' : ''}`} onClick={() => setActividad('moderado')}>🏃 Moderado</div>

                <div className={`tarjeta ${actividad === 'intenso' ? 'seleccionada' : ''}`} onClick={() => setActividad('intenso')}>💪 Intenso</div>

                <div className={`tarjeta ${actividad === 'atleta' ? 'seleccionada' : ''}`} onClick={() => setActividad('atleta')}>🔥 Atleta</div>
            </div>

        </div>
    )

}