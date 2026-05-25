import './pasoObjetivo.css';


export default function PasoObjetivo({ objetivo, setObjetivo,}) {

    return (
        <div className="pregunta">
            <h2>¿Cual es tu objetivo principal?</h2>

            <div className="tarjetas-opciones">
                <div className={`tarjeta ${objetivo === 'perder' ? 'seleccionada' : ''}`} onClick={() => setObjetivo('perder')}>🔥 Perder peso</div>

                <div className={`tarjeta ${objetivo === 'ganar' ? 'seleccionada' : ''}`} onClick={() => setObjetivo('ganar')}>💪 Ganar músculo</div>

                <div className={`tarjeta ${objetivo === 'mantener' ? 'seleccionada' : ''}`} onClick={() => setObjetivo('mantener')}>😊 Mantenerme</div>
            </div>
        
        </div>
    )

}