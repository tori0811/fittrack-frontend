import { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import './planes.css';

function Planes() {

    const [ planes, setPlanes ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/planes')
        .then((response) => response.json())
        .then((data) => {
            setPlanes(data);
        })
        .catch((error) => {
            console.log('Error al obtener los planes:', error);
        });
    }, []);

    return (

        <section className="planes-section">
            <div className="planes-container">
                <h2>Planes de Entrenamiento</h2>
                <p className="planes-subtitulo">
                Elige tu plan ideal y da el siguiente paso con FitTrack.
                </p>

                <div className="planes-grid">
                {planes.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
                </div>
            </div>
        </section>

    );

}

export default Planes;