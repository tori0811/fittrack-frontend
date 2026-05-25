import AlimentoItem from "./AlimentoItem"
import { Plus } from "lucide-react";
 

export default function ListaAlimentos({comidaId, opcionId,alimentos, agregarAlimento,actualizarAlimento, eliminarAlimento}) {
    

    return (

        <div className="wrapper-general">

            <div className="header-general">
                
                <h4>Alimentos</h4>
                
                <button onClick={() => agregarAlimento(comidaId, opcionId)}>
                    <Plus size={20} />
                </button>
            
            </div>
            
            <div className="lista-contenedor">
                {alimentos.map(alimento => (
                    <AlimentoItem
                    key={alimento.id}
                    comidaId={comidaId}
                    opcionId={opcionId}
                    alimento={alimento}
                    actualizarAlimento={actualizarAlimento}
                    eliminarAlimento={eliminarAlimento}
                    />
                ))}
            </div>
        </div>
    )
}