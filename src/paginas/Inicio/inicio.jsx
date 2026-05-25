import  './inicio.css';
import { Link } from 'react-router-dom';
import img from '../../assets/imagen1.jpg'

import Portada from './portada.jsx';
import InfoEntrenadores from './infoEntrenadores.jsx';
import Caracteristicas from './caracteristicas.jsx';




function Inicio() {

    return (
        <>
        <div className="inicio-contenedor">
            <main className="inicio">
                
                <Portada />
                <InfoEntrenadores />
                <Caracteristicas />

               
            </main>
        </div>
        </>
    );
    
}

export default Inicio;