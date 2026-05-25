
export default function DatosCuestionario({cuestionario}){

    return (
        <div className="contenido">
            <div className="form">
                <form className="form-cont" method="GET">
                    <label>Peso</label>
                    <input type="text" name="Peso" defaultValue={cuestionario.peso} readOnly></input>
                    
                    <label>Altura</label>
                    <input type="text" name="altura" defaultValue={cuestionario.altura} readOnly></input>
                    
                    <label>Actividad</label>
                    <input type="text" name="actividad" defaultValue={cuestionario.actividad} readOnly></input>
                    
                    <label>Dias Entrenamiento</label>
                    <input type="text" name="entrenamiento" defaultValue={cuestionario.dias} readOnly></input>
                    
                    <label>Objetivo atleta</label>
                    <input type="text" name="objetivo" defaultValue={cuestionario.objetivo} readOnly></input>
                    
                    <label>Tipo de alimentacion</label>
                    <input type="text" name="alimentacion" defaultValue={cuestionario.estilo_alimentacion} readOnly></input>
                    
                    <label>Agua</label>
                    <input type="text" name="agua" defaultValue={cuestionario.agua} readOnly></input>
                    
                    <label>Sueño</label>
                    <input type="text" name="sueno" defaultValue={cuestionario.sueno} readOnly></input>
                    
                    <label>Estres</label>
                    <input type="text" name="estres" defaultValue={cuestionario.estres} readOnly></input>



                </form>
                
            </div>
            
        </div>
    )
}