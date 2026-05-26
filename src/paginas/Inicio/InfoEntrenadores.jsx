import './infoEntrenadores.css';
import { Link } from 'react-router-dom';
import img from '../../assets/imagen1.jpg';

function InfoEntrenadores() {

    return (

        <div className="contenido-informacion">
                    <div className='informacion-inner'>

                        <div className='informacion-texto'>
                            
                            <h3 className="titulo-informacion">
                                Entrenadores certificados
                            </h3>

                            <p className="secundario-informacion">Contamos con entrenadores especializados en fuerza, pérdida de peso y rendimiento físico;
                            listos para ayudarte a superar tus límites.
                            </p>

                            <ul className='info-lista'>
                                <li>Entrenamientos personalizados</li>
                                <li>+5 años de experiencia</li>
                                <li>Resultados comprobados</li>
                            </ul>

                            <Link to="/entrenadores" className="informacion-boton">
                            Descubre tu entrenador
                            </Link>

                        </div>
                        
                        <div className='informacion-media'>
                            <img className="imagen-secundario" src={img} alt="imagen secundaria" />
                        </div>

                    </div>

                </div>


    )
}

export default InfoEntrenadores;