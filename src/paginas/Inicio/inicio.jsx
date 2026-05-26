import  './inicio.css';
import { Link } from 'react-router-dom';
import img from '../../assets/imagen1.jpg'

import Portada from './Portada.jsx';
import InfoEntrenadores from './InfoEntrenadores.jsx';
import Caracteristicas from './Caracteristicas.jsx';




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