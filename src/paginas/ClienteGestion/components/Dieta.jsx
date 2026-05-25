
export default function Dieta({dieta}) {

    if(!dieta) {
        return <p>No tiene dieta asignada</p>
    }

    const comidasOn = dieta.comidas.filter( c => c.dia === 'on' );
    const comidaOff = dieta.comidas.filter(c => c.dia === 'off' );

   
    return (
        <>
            
                <h3>Dia de entrenamiento ON</h3>
                <p>Calorias: <strong>{dieta.calorias_on}</strong></p>
                <p> <strong>{dieta.proteinas_on}gr</strong> Proteina,  <strong>{dieta.carbohidratos_on}gr</strong> Hidratos de carbono,  <strong>{dieta.grasas_on}gr</strong> Grasas </p>
            
                <h3>Dia de entrenamiento OFF</h3>
                <p>Calorias: <strong>{dieta.calorias_off}</strong></p>
                <p> <strong>{dieta.proteinas_off}gr</strong> Proteina,  <strong>{dieta.carbohidratos_off}gr</strong> Hidratos de carbono,  <strong>{dieta.grasas_off}gr</strong> Grasas </p>

                <div className="contenido">
                    
                    <div className="contenido-izq">
                        
                        <h4>Plan de dieta personalizada dia <strong>ON</strong></h4>
                        {comidasOn.map(comida => (
                        <div key={comida.id}>
                            <h4>{comida.tipo}</h4>

                            {comida.opciones.map(opcion => (
                                <div key={opcion.id}>
                                    {opcion.alimentos.map((alimento, i) => (
                                        <div key={i}>
                                            <span>{alimento.alimento}</span>
                                            <input type="numb" value={alimento.gramos} readOnly></input><span>gr</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        ))}
                        
                    </div>
                    
                        <div className="contenido-der">
                            <h4>Plan de dieta personalizada dia <strong>OFF</strong></h4>
                            {comidaOff.map(comida => (
                                <div key={comida.id}>
                                    <h4>{comida.tipo}</h4>

                                    {comida.opciones.map(opcion => (
                                        <div key={opcion.id}>
                                            {opcion.alimentos.map((alimento, i) => (
                                                <div key={i}>
                                                    <span>{alimento.alimento}</span>
                                                    <input type="number" value={alimento.gramos} readOnly></input><span>gr</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                
        </>


    )
}