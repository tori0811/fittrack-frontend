import { UtensilsCrossed, Plus } from "lucide-react";

import ComidaItem from "./ComidaItem";
import '../styles/ListaComidas.css';


export default function ListaComidas({comidas, setComidas}) {

    //FUNCIONES
    const agregarComida = () => {
        const nuevo = {
            id: Date.now(),
            tipo: '',
            dia: '',
            opciones: []
        };
            setComidas([...comidas, nuevo]);
    }

    const actualizarComida = (id, campo, valor) => {
        setComidas(comidas.map(comida => {
            //si la comida.id es igual al id recibido
            if(comida.id === id) {
                //devolvemos el valor actualizado
                return {
                    ...comida, 
                    [campo]:valor
                };
            }     
            return comida;  
    }))
    }

    const eliminarComida = (id) => {
        setComidas(comidas.filter(comida => {
            return comida.id !== id
        }))
    }

    const agregarOpcion = (comidaId) => {
        const nuevaOpcion = {
            id: Date.now(),
            titulo: '',
            alimentos:[]
        };

        setComidas(comidas.map(comida => {
            if(comida.id === comidaId ) {
                return {
                    ...comida,
                    opciones: [...comida.opciones, nuevaOpcion]
                }
            }
            return comida;
        }))
    }

    const actualizarOpcion = (comidaId, opcionId, campo, valor) => {
        setComidas(comidas.map(comida => {
            if (comida.id === comidaId) {
                return {
                    ...comida,
                    opciones: comida.opciones.map(opcion => {
                        if(opcion.id === opcionId) {
                            return {
                                ...opcion,
                                [campo]:valor
                            }
                        }
                        return opcion;
                    })
                };
            }
            return comida;
        }));
    };


    const eliminarOpcion = (comidaId, opcionId) => {
        //recorremos todas las comidas con map.
        setComidas(comidas.map(comida => {
            //Si encuentro la comida correcta,comparo la comida con la comida id
            if(comida.id === comidaId) {
                return {
                    ...comida,
                    opciones: comida.opciones.filter(opcion => {
                        return opcion.id !== opcionId;
                    })
                };
            }
            return comida;
        })) 
    }

     //que necesita alimento para poder agregarse
    //saber la comida id, la opcion id 
    const agregarAlimento = (comidaId, opcionId) => {
        const nuevoAlimento = {
            id: Date.now(),
            alimento: '',
            gramos: ''
        };
        setComidas(comidas.map(comida => {
            if(comida.id === comidaId) {
                return {
                    ...comida,
                    opciones: comida.opciones.map(opcion => {
                        if(opcion.id === opcionId) {
                            return {
                                ...opcion,
                                alimentos:[...opcion.alimentos,nuevoAlimento]
                            }
                        };
                        return opcion;
                    })
                };
            }
            return comida;
        }))

    }

    //primero,saber que comidaId y opcionId es,campo,valor
    const actualizarAlimento = (comidaId, opcionId,alimentoId, campo, valor) => {

       setComidas(comidas.map(comida => {
        if(comida.id === comidaId) {
            return {
                ...comida,
                opciones: comida.opciones.map(opcion => {
                    if(opcion.id === opcionId) {
                        return {
                            ...opcion,
                            alimentos:opcion.alimentos.map(alimento => {
                                if(alimento.id === alimentoId ) {
                                    return {
                                        ...alimento,
                                        [campo]:valor
                                    }
                                };
                                return alimento;
                            })
                        }
                    }
                    return opcion;
                })
            };
        }
        return comida;
       }))

    }

    //necesito comidaid y opcionId para eliminar el alimento
    //.filter()
    const eliminarAlimento = (comidaId, opcionId, alimentoId) => {
        setComidas(
            comidas.map(comida => {
            if (comida.id === comidaId) {
                return {
                ...comida,
                opciones: comida.opciones.map(opcion => {
                    if (opcion.id === opcionId) {
                    return {
                        ...opcion,
                        alimentos: opcion.alimentos.filter(alimento => {
                        return alimento.id !== alimentoId;
                        })
                    };
                    }
                    return opcion;
                })
                };
            }
            return comida;
            })
        );
    };


    return ( 
        <div className="card-base comida-card">

            <div className="header-comida">
                <UtensilsCrossed size={20} color="#5454f2" />
                <h4>Comidas</h4>
                <button className="add-btn" onClick={agregarComida}>
                    <Plus size={30} />
                </button>   
            </div>

            <div className="lista-comidas">
                {comidas.map((comida) => (
                    <ComidaItem 
                        key={comida.id}
                        comida={comida}
                        actualizarComida={actualizarComida}
                        eliminarComida={eliminarComida}
                        actualizarOpcion={actualizarOpcion}
                        eliminarOpcion={eliminarOpcion}
                        agregarOpcion={agregarOpcion}
                        agregarAlimento={agregarAlimento}
                        actualizarAlimento={actualizarAlimento}
                        eliminarAlimento={eliminarAlimento}
                    />
                ))}
            </div>
        </div>

    )
}

