
import React from "react";
import { useState } from "react";


import useClienteDetalle from "./hooks/useClienteDetalle";
import { useParams } from "react-router-dom";

import './styles/ClienteGestion.css';

import DatosPersonales from "./components/DatosPersonales";
import DatosCuestionario from "./components/DatosCuestionario";
import Dieta from "./components/Dieta";

export default function ClienteGestion(){
    
    const { id } = useParams();
    const { cliente, cuestionario, dieta, loading } = useClienteDetalle(id);

    //Estado para las secciones abiertas 
    const [openSections, setOpenSections] = useState(new Set([0]));

    //Funcion para abrir y cerrar seccion
    const toggleSection = (index) => {
        const nueva = new Set(openSections);

        //verificar que la seccion esta abierta
        if(nueva.has(index)) {
            nueva.delete(index);
        } else {
            nueva.add(index);
        }

        setOpenSections(nueva)

    } 

    if(loading) {
        return <p>Cargando cliente...</p>
    }

    if(!cliente) {
       return <p>No hay cliente encontrado</p>
    } 


    return (
        <div>
         
            {/* Contenedor */ }

            <div className="contenedor">

                {/* Seccion 1 */}
                <div className="item">
                    <button onClick={() => toggleSection(0)}>
                        <span>👤 Datos personales</span>
                        <span>
                            {openSections.has(0) ?  "▲" : "▼"}
                        </span>
                    </button>

                    {openSections.has(0) && (
                        
                        <div className="contenido">
                            <DatosPersonales cliente={cliente} />
                        </div>
                        
                    )}
                </div>

                {/* Seccion 2 */}
                <div className="item">
                    <button onClick={() => toggleSection(1)}>
                        <span>📝Cuestionario Inicial</span>
                        <span>
                            {openSections.has(1) ?  "▲" : "▼"}
                        </span>
                    </button>

                    {openSections.has(1) && (
                        <div className="contenido">
                            {cuestionario ? (
                                <DatosCuestionario cuestionario={cuestionario} />
                            ) : (
                                <p>Este usuario no ha completado el cuestionario</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Seccion 3 */}
                <div className="item">
                    <button onClick={() => toggleSection(2)}>
                        <span>🍎Plan de dieta</span>
                        <span>
                            {openSections.has(2) ?  "▲" : "▼"}
                        </span>
                    </button>

                    {openSections.has(2) && (
                        <div className="contenido">
                            {dieta ? (
                                <Dieta dieta={dieta} />
                            ) : (
                                <p>Todavia no hay dieta asignada</p>
                            )}
                            
                        </div>
                    )}
                </div>

                {/* Seccion 4 */}
                <div className="item">
                    <button onClick={() => toggleSection(3)}>
                        <span>💪Plan de entrenamiento</span>
                        <span>
                            {openSections.has(3) ?  "▲" : "▼"}
                        </span>
                    </button>

                    {openSections.has(3) && (
                        <div className="contenido">
                        
                        </div>
                    )}
                </div>

                {/* Seccion 5 */}
                <div className="item">
                    <button onClick={() => toggleSection(4)}>
                        <span>📊 Progreso y Medidas</span>
                        <span>
                            {openSections.has(4) ?  "▲" : "▼"}
                        </span>
                    </button>

                    {openSections.has(4) && (
                        <div className="contenido">
                            <p>Contenido del progreso y medidas</p>
                        </div>
                    )}
                </div>
                
            </div>
        </div>

    )
}