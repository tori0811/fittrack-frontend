import ListaOpciones from "./ListaOpciones";
import  { useState } from 'react';
import { LucideDelete } from "lucide-react";
import '../styles/ComidaItem.css';

export default function ComidaItem({comida, actualizarComida, eliminarComida, agregarOpcion, actualizarOpcion, eliminarOpcion, agregarAlimento,actualizarAlimento, eliminarAlimento}) {

    const [opcionesAbiertas, setOpcionesAbiertas ] = useState(false);
    
    
    return (
        <div className="item-contenedor">
            
            <div className="fila-principal">
                
                <div className="comida-inputs">
                    <input placeholder="Tipo Comida (ej: Desayuno)" 
                    value={comida.tipo}
                    onChange={(e) => actualizarComida(comida.id, 'tipo', e.target.value)} />

                
                    <select value={comida.dia}
                    onChange={(e) => actualizarComida(comida.id, 'dia', e.target.value)}>
                        <option value=''>Selecciona dia</option>
                        <option value='on'>DIA ON</option>
                        <option value='off'>DIA OFF</option>
                    </select>
                </div>
                
                <div className="comida-acciones">
                    <button onClick={() => setOpcionesAbiertas(!opcionesAbiertas)}>
                        {opcionesAbiertas ? '▼' : '▶'}
                    </button>
                
                    <button onClick={() => eliminarComida(comida.id)}>
                        <LucideDelete size={20} />
                    </button>
                </div>
            </div>
            
            
            
                {opcionesAbiertas && (
                    <ListaOpciones 
                    opciones={comida.opciones} 
                    comidaId={comida.id} 
                    agregarOpcion={agregarOpcion}
                    actualizarOpcion={actualizarOpcion}
                    eliminarOpcion={eliminarOpcion}
                    agregarAlimento={agregarAlimento}
                    actualizarAlimento={actualizarAlimento}
                    eliminarAlimento={eliminarAlimento}
                    />
                )}
        </div>
    )
}