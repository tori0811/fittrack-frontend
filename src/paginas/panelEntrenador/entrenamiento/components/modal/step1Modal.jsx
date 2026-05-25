
import { LayoutGrid, LayoutTemplate } from "lucide-react";
import "./Steps.css";

const routineDescription = {
    '': 'Selecciona el tipo de rutina',
    'weekly': 'Programa hasta 14 semanas',
    'static': 'Misma rutina cada dia hasta que tu decidas cambiarlo'
};

export default function Step1Modal({ routineData, setRoutineData }) {
    return (
        <div className="modal-content">
            <div className="modal-steps">
                <div className="modal-card disabled">
                    <LayoutTemplate size={50} />
                    <h4>Rutina estática</h4>
                    <span>Próximamente</span>
                </div>
                <div className={`modal-card ${routineData.routineType === 'weekly' ? 'selected' : ''}`}
                    onClick={() => setRoutineData({ ...routineData, routineType: routineData.routineType === 'weekly' ? '' : 'weekly' })}>
                    <LayoutGrid size={40} />
                    <h4>Programa por semanas</h4>
                </div>
            </div>
            <div className="modal-description">
                <p>{routineDescription[routineData.routineType]}</p>
            </div>
        </div>
    );
}