import './portada.css';
import video from '../../assets/hero.mp4';
import { Link } from 'react-router-dom';


function Portada() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    return (

        <section className='portada'>

            <div className="contenido-principal">
                    <video className="video-inicio"  loop autoPlay muted playsInline >
                        <source type='video/mp4' src={video} alt="imagen principal" />
                    </video>

                    <div className='overlay'></div>

                    <div className='inicio-inner'>
                        <h2 className="inicio-titulo">“Tu camino al cambio empieza hoy”</h2>
                        <p className='inicio-parrafo'>Entrena con profesionales certificados y lleva tu físico al siguiente nivel.</p>
                        {token ? (
                            <Link to={role === 'entrenador' ? 'panel-entrenador' : '/panel'} className='inicio-enlace'>
                                Ir al panel
                            </Link>
                        ) : (
                            <Link to='/register' className='inicio-enlace'>Empieza ahora!</Link>
                        )}
                    </div>
                </div>

        </section>

    )
}

export default Portada;