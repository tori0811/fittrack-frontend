import "./pasoObjetivo.css"; 

export default function PasoDisponibilidad({ dias, setDias }) {
    return (
        <div className="pregunta">
            <h2>¿Cuántos días a la semana puedes entrenar?</h2>

            <div className="tarjetas-opciones">

                {[2,3,4,5,6,7].map((num) => (
                    <div key={num} className={`tarjeta ${dias === num ? "seleccionada" : ""}`} onClick={() => setDias(num)}>{num} días/semana</div>
                ))}

            </div>
        </div>
    );
}
