import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./cuestionario.css";
//Imports Componentes Cuestionario
import PasoObjetivo from "./pasoObjetivo";
import PasoActividad from "./pasoActividad";
import PasoMedidas from "./pasoMedidas";
import PasoDisponibilidad from "./pasoDisponibilidad";
import PasoExperiencia from "./pasoExperiencia";
import PasoLesiones from "./pasoLesiones";
import PasoDieta from "./pasoDieta";
import PasoHabitos from "./pasoHabitos";


export default function CuestionarioInicial() {

    const [ paso, setPaso ] = useState(1);


    //Estados de las preguntas
    const [ objetivo,setObjetivo ] = useState('');
    const [ actividad, setActividad ] = useState('');
    const [ peso, setPeso ] = useState('');
    const [ altura, setAltura ] = useState('');
    const [ dias, setDias ] = useState('');
    const [ experiencia, setExperiencia ] = useState('');
    const [ tuvoLesion, setTuvoLesion ] = useState('');
    const [ lesionPasada, setLesionPasada ] = useState('');
    const [alimentos, setAlimentos ] = useState('');
    const [ intolerancias, setIntolerancias ] = useState([]);
    const [ estiloAlimentacion, setEstiloAlimentacion] = useState('');
    const [agua,setAgua] = useState('');
    const [sueno, setSueno] = useState('');
    const [estres, setEstres] = useState('');
    
    const navigate = useNavigate();

    //Total pasos cuestionario
    const totalPasos = 8;

    //Progreso calculo
    const progreso = (paso / totalPasos ) * 100;

    const siguiente = () => {
        setPaso(paso + 1);
    };

    const atras = () => {
        setPaso(paso - 1);
    };

    const enviarCuestionario = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8000/api/cuestionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                objetivo,
                actividad,
                peso,
                altura,
                dias,
                experiencia,
                tuvo_lesion: tuvoLesion,
                lesion_pasada: lesionPasada,
                intolerancias,
                estilo_alimentacion: estiloAlimentacion,
                alimentos_no_gustan: alimentos,
                agua,
                sueno,
                estres
                })
            });

            const data = await response.json();
            console.log(data);

            if(!response.ok){
                alert('Error al enviar el cuestionario');
                return;
            }

            alert('Cuestionario completado correctamente');
            navigate('/panel');
        } catch (error) {
            console.error(error);
            alert('Error de conexion con el servidor');
        }
    };

    return (
        
        <section className="cuestionario">
            <div className="cuestionario-contenedor">
                <h1>Cuestionario Inicial</h1>
                
                <div className="barra-progreso">
                    <div className="barra-progreso-relleno" style={{ width: `${progreso}%` }}></div>
                </div>
                
                <p className="paso-indicador">Paso {paso} de {totalPasos}</p>

                
                            {paso === 1 && (
                                <PasoObjetivo objetivo={objetivo} setObjetivo={setObjetivo} />
                            )}

                            {paso === 2 && (
                                <PasoActividad actividad={actividad} setActividad={setActividad} />
                            )}

                            {paso === 3 && (
                                <PasoMedidas peso={peso} setPeso={setPeso} altura={altura} setAltura={setAltura}/>
                            )}

                            {paso === 4 && (
                                <PasoDisponibilidad dias={dias} setDias={setDias} />
                            )}

                            {paso === 5 && (
                                <PasoExperiencia experiencia={experiencia} setExperiencia={setExperiencia} />
                            )}

                            {paso === 6 && (
                                <PasoLesiones tuvoLesion={tuvoLesion} setTuvoLesion={setTuvoLesion} lesionPasada={lesionPasada} setLesionPasada={setLesionPasada}/>
                            )}

                            {paso === 7 && (
                                <PasoDieta alimentos={alimentos} setAlimentos={setAlimentos} intolerancias={intolerancias} setIntolerancias={setIntolerancias}
                                estiloAlimentacion={estiloAlimentacion} setEstiloAlimentacion={setEstiloAlimentacion}/>
                            )}

                            {paso === 8 && (
                                <PasoHabitos agua={agua} setAgua={setAgua} sueno={sueno} setSueno={setSueno} estres={estres} setEstres={setEstres} />
                            )}

                <div className="botones-paso">
                    {paso > 1 ? (
                        <button className="btn-atras" onClick={atras}>Atrás</button>
                    ) : (
                        <div></div>
                    )}

                    {paso < totalPasos ? (
                        <button className="btn-siguiente" onClick={siguiente} disabled={(paso === 1 && !objetivo) || 
                            (paso === 2 && !actividad) || 
                            (paso === 3 && (!peso || !altura)) || 
                            (paso === 4 && (!dias)) ||
                            (paso === 5 && !experiencia) ||
                            (paso === 6 && (
                                tuvoLesion === '' || 
                                (tuvoLesion === 'si' && !lesionPasada))) ||
                            (paso === 7 && (!alimentos && intolerancias.length === 0 && !estiloAlimentacion))
                        }>Siguiente</button>
                    ) : (
                        <button className="btn-siguiente finalizar" onClick={enviarCuestionario}>Finalizar</button>
                    )}
                </div>
            </div>
        </section>
    );
}
