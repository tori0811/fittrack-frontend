import "./pasoMedidas.css";

export default function PasoMedidas({ peso, setPeso, altura, setAltura }) {
    return (
        <div className="pregunta">
            <h2>Ingresa tus medidas</h2>

            <div className="inputs-medidas">

                <div className="input-card">
                    <span className="icono">⚖️</span>
                    <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)}/>
                </div>

                <div className="input-card">
                    <span className="icono">📏</span>
                    <input type="number" placeholder="Altura (cm)" value={altura} onChange={(e) => setAltura(e.target.value)}/>
                </div>

            </div>
        </div>
    );
}
