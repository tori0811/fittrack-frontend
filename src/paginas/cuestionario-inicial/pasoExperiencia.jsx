import "./pasoObjetivo.css";

export default function PasoExperiencia({ experiencia, setExperiencia }) {

    return (
        <div className="pregunta">
            <h2>¿Cuál es tu nivel de experiencia entrenando?</h2>

            <div className="tarjetas-opciones">

                <div 
                    className={`tarjeta ${experiencia === 'principiante' ? 'seleccionada' : ''}`}
                    onClick={() => setExperiencia('principiante')}
                >
                    🟢 Principiante<br />
                    <small>Poco o nada de experiencia</small>
                </div>

                <div 
                    className={`tarjeta ${experiencia === 'intermedio' ? 'seleccionada' : ''}`}
                    onClick={() => setExperiencia('intermedio')}
                >
                    🔵 Intermedio<br />
                    <small>1+ año de entrenamiento continuo</small>
                </div>

                <div 
                    className={`tarjeta ${experiencia === 'avanzado' ? 'seleccionada' : ''}`}
                    onClick={() => setExperiencia('avanzado')}
                >
                    🔴 Avanzado<br />
                    <small>2+ años de entrenamiento serio</small>
                </div>

            </div>
        </div>
    );
}
