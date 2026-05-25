import { Delete } from "lucide-react";
import '../styles/alimentoItem.css';

export default function AlimentoItem({comidaId, opcionId, alimento, actualizarAlimento, eliminarAlimento}) {
    
    return (

        <div className="contenedor-lista-general">

            <div className="acciones-general">
                <input placeholder="Nombre alimento" onChange={(e) => actualizarAlimento(comidaId, opcionId, 'alimento', e.target.value) } />
                <input placeholder="gr del alimento" type="number" onChange={(e) => actualizarAlimento(comidaId, opcionId, 'gramos', e.target.value) } />
                
                <button onClick={() => eliminarAlimento(comidaId,opcionId, alimento.id)}>
                    <Delete size={20} />
                </button>
            </div>
                
        </div>
    )
}