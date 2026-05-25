import { useState } from "react";
import ListaAlimentos from "./ListaAlimentos";
import '../styles/opcionItem.css';
import { Delete } from "lucide-react";

export default function OpcionItem({opcion, comidaId, actualizarOpcion, eliminarOpcion,agregarAlimento,actualizarAlimento, eliminarAlimento}) {

    const [alimentosAbiertos, setAlimentosAbiertos ] = useState(false);
    
    return (

        <div className="contenedor-lista-general">

            <div className="acciones-general">
                    <input placeholder="ej:Opcion 1" 
                    value={opcion.titulo}
                    onChange={(e) => actualizarOpcion(comidaId,opcion.id, 'titulo', e.target.value)}></input>
                
                <div className="acciones-btn">

                     <button onClick={() => setAlimentosAbiertos(!alimentosAbiertos)}>
                    {alimentosAbiertos ? '▼' : '▶'}
                    </button>
                    
                    <button  onClick={() => eliminarOpcion(comidaId, opcion.id)}>
                        <Delete size={20} />
                    
                    </button>
                </div>
                
                   
                
            </div>
            
            
                <div className="lista-general">

                    {alimentosAbiertos && (
                        <ListaAlimentos 
                            comidaId={comidaId}
                            opcionId={opcion.id}
                            alimentos={opcion.alimentos}
                            agregarAlimento={agregarAlimento}
                            actualizarAlimento={actualizarAlimento}
                            eliminarAlimento={eliminarAlimento}
                        />
                    )}
                </div>    
        </div>

    )
}