import { useState,  useEffect } from "react";
import DatosGenerales from "./components/DatosGenerales";
import ListaComidas from "./components/ListaComidas";
import useGuardarDieta  from './hooks/useGuardarDieta';
import './styles/CrearDieta.css';
import { AlertTriangle } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useActualizarDieta from "./hooks/useActualizarDieta";

export default function CrearDieta() {


    const navigate = useNavigate();
    const { guardarDieta, loading, error } = useGuardarDieta();
    const {actualizarDieta} = useActualizarDieta();
    const  { id } = useParams();
    const esEdicion = Boolean(id);
    const [dieta, setDieta] = useState ({
        titulo: '',
        calorias_on : '',
        calorias_off: '',
        proteinas_on: '',
        proteinas_off: '',
        carbohidratos_on: '',
        carbohidratros_off: '',
        grasas_on: '',
        grasas_off: '',
        actividad_on: '',
        actividad_off: '',
        pre_entreno: '',
        intra_entreno: '',
        activa: '',
        comidas: []

    });

    useEffect(() => {
            if(!esEdicion) return;
    
            async function cargarDieta(){
                 const token = localStorage.getItem('token');
                 const response = await fetch(`http://localhost:8000/api/entrenador/plantillas/dieta/${id}`,
                    {
                        headers: {
                             'Authorization': `Bearer ${token}`
                        }
                    }
                 );
                const data = await response.json();
                //Comprobacion para ver si recibe bien los datos
                console.log('Datos recibidos:', data);
    
                //Actualizar los datos de la plantilla
                setDieta({
                    titulo: data.titulo,
                    calorias_on: data.calorias_on,
                    calorias_off: data.calorias_off,
                    proteinas_on: data.proteinas_on,
                    proteinas_off: data.proteinas_off,
                    carbohidratos_on: data.carbohidratos_on,
                    carbohidratos_off: data.carbohidratos_off,
                    grasas_on: data.grasas_on,
                    grasas_off: data.grasas_off,
                    actividad_on: data.actividad_on,
                    actividad_off: data.actividad_off,
                    pre_entreno: data.pre_entreno,
                    post_entreno: data.post_entreno,
                    activa: data.activa,
                    comidas: data.estructura 
                });
            }
            //llamar a la funcion
            cargarDieta();
        },[esEdicion, id]) //dependencias
    

    if(loading) {
        return <p>Cargando plantilla</p>
    }

    if(error) {
        return <p>Error al cargar la plantilla</p>
    }

    //coger todos los datos, de datos generales y listacomidas y guardarlo en la base de datos
    const onGuardar = async () => {

        //Validar datos primero
        if(!dieta.titulo.trim()) {
            alert('El titulo es obligatorio');
            return;
        }

        if(dieta.comidas.length === 0 ) {
            alert('Debes agregar al menos una comida');
            return;
        }

        // Validar que cada comida tenga al menos 1 opción
        const comidasSinOpciones = dieta.comidas.filter(c => c.opciones.length === 0);
        if (comidasSinOpciones.length > 0) {
            alert('Cada comida debe tener al menos una opción');
            return;
        }

        //Validar que cada opcion tenga al menos 1 alimento
        const opcionesSinAlimetos = dieta.comidas.some(comida =>
            comida.opciones.some(opcion => opcion.alimentos.length === 0)
        );
        if(opcionesSinAlimetos) {
            alert('Cada opcion tiene que tener un alimento');
            return;
        }

        //preparar los datos

        const payload =  {
                    titulo: dieta.titulo,
                    calorias_on: dieta.calorias_on,
                    calorias_off: dieta.calorias_off,
                    proteinas_on: dieta.proteinas_on,
                    proteinas_off: dieta.proteinas_off,
                    carbohidratos_on: dieta.carbohidratos_on,
                    carbohidratos_off: dieta.carbohidratros_off,
                    grasas_on: dieta.grasas_on,
                    grasas_off: dieta.grasas_off,
                    actividad_on: dieta.actividad_on,
                    actividad_off: dieta.actividad_off,
                    pre_entreno: dieta.pre_entreno,
                    post_entreno: dieta.post_entreno,
                    activa: dieta.activa,
                    comidas: dieta.comidas,
        }

        // Si pasa validación, guardar
        try {
            
            if(esEdicion) {
                await actualizarDieta(id,payload)
            } else {
                await guardarDieta(payload);
            }
            console.log('Dieta guardada correctamente');
            alert('Dieta guardada correctamente');
            navigate('/entrenador/plantillas');
        
        } catch (error) {
            
            console.error('Error: ', error);
            alert('Error al guardar la dieta');
        }
    }

    return (
        <div className="constructor-wrapper">
            
            <div className="constructor-contenedor">
                <DatosGenerales dieta={dieta} setDieta={setDieta} />
                <ListaComidas comidas={dieta.comidas} setComidas={(nuevasComidas) => setDieta({...dieta,comidas: nuevasComidas})} />
                
                <div className="contenedor-btn">
                    <button onClick={onGuardar} disabled={loading} className="btn-guardar">
                        {loading ? 'Guardando...' : 'Guardar Plantilla'}
                    </button>
                </div>
            
            </div>
            
            
        </div>
    )
}