import "./pasoLesiones.css";

export default function PasoLesiones({tuvoLesion, setTuvoLesion, lesionPasada, setLesionPasada  }) {

    return (
        <div className="pregunta">
            <h2>¿Has tenido lesiones en el pasado?</h2>

                <div className="lesiones-pasadas-opciones">

                    <div className={`lesion-card ${tuvoLesion === "si" ? "seleccionada" : ""}`} onClick={() => setTuvoLesion("si")}>Sí</div>

                    <div className={`lesion-card ${tuvoLesion === "no" ? "seleccionada" : ""}`} 
                    onClick={() => {setTuvoLesion("no"); setLesionPasada("");}}>No</div>

                </div>

                {tuvoLesion === "si" && (
                    <div className="otra-lesion">
                        <input type="text"placeholder="Describe tu lesión pasada"value={lesionPasada}onChange={(e) => setLesionPasada(e.target.value)}/>
                    </div>        
                )}
        </div>
    );
}
