import { ClipboardList, Zap, Moon } from "lucide-react";
import '../styles/DatosGenerales.css';

export default function DatosGenerales({dieta, setDieta}){


    return (

        <div className="card-base datos-contenedor">
            
            <div className="header-datos">
                <div className="wrapper-header">
                    <ClipboardList size={20} color="#5A54F2" />
                    <h3>Datos Generales</h3>
                </div>
                <input placeholder="titulo de la dieta" value={dieta.titulo} onChange={(e) => setDieta({... dieta,titulo: e.target.value})} />
            </div>

            <div className="columnas">
                    
                <div className="columna">
                    {/* Columna DIA ON */ }
                    <div className="columna-header">
                        <Zap size={20} color="#5454F2" />
                        <h4>Dia ON</h4>
                    </div>
                    <div className="wrapper-columna">
                        <input placeholder="calorias" value={dieta.calorias_on} onChange={(e) => setDieta({... dieta,calorias_on: e.target.value})} />
                        <input placeholder="proteina" value={dieta.proteinas_on} onChange={(e) => setDieta({... dieta,proteinas_on: e.target.value})} />
                        <input placeholder="carbohidratos" value={dieta.carbohidratos_on} onChange={(e) => setDieta({... dieta,carbohidratos_on: e.target.value})} />
                        <input placeholder="grasas" value={dieta.grasas_on} onChange={(e) => setDieta({... dieta,grasas_on: e.target.value})} />
                        <input placeholder="actividad/NEAT" value={dieta.actividad_on} onChange={(e) => setDieta({... dieta,actividad_on: e.target.value})} />
                    </div>
                </div>
                
                <div className="columna">
                    {/* Columna DIA OFF */ }
                    <div className="columna-header">
                        <Moon size={20} color="#5454F2" />
                        <h4>Dia OFF</h4>
                    </div>
                    <div className="wrapper-columna">
                        <input placeholder="calorias" value={dieta.calorias_off} onChange={(e) => setDieta({... dieta,calorias_off: e.target.value})} />
                        <input placeholder="proteina" value={dieta.proteina_off} onChange={(e) => setDieta({... dieta,proteina_off: e.target.value})} />
                        <input placeholder="carbohidratos" value={dieta.carbohidratos_off} onChange={(e) => setDieta({... dieta,carbohidratos_off: e.target.value})} />
                        <input placeholder="grasas" value={dieta.grasas_off} onChange={(e) => setDieta({... dieta,grasas_off: e.target.value})} />
                        <input placeholder="actividad/NEAT" value={dieta.actividad_off} onChange={(e) => setDieta({... dieta,actividad_off: e.target.value})} />
                    </div>
                </div>
            </div>
        </div>
            
        

    )
}