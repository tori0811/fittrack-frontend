
import OpcionItem from './OpcionItem';
import '../styles/listaOpciones.css';
import { Plus } from 'lucide-react';


export default function ListaOpciones({opciones, comidaId, agregarOpcion, actualizarOpcion, eliminarOpcion, agregarAlimento,actualizarAlimento, eliminarAlimento}) {


    return (

        <div className='wrapper-general'>

            <div className='header-general'>
                <h4>Opciones:</h4>
                <button onClick={() => agregarOpcion(comidaId)}>
                    <Plus size={20} />
                </button>
            </div>

            <div className='lista-contenedor'>
                {opciones.map(opcion => (
                    <OpcionItem key={opcion.id}
                    opcion={opcion}
                    comidaId={comidaId}
                    actualizarOpcion={actualizarOpcion}
                    eliminarOpcion={eliminarOpcion}
                    agregarAlimento={agregarAlimento}
                    actualizarAlimento={actualizarAlimento}
                    eliminarAlimento={eliminarAlimento}
                    />
                ))}
            </div>
        </div>
                
        

    )
}