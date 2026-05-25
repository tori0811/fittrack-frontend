import "./Steps.css";


export default function Step4Modal({ routineData, setRoutineData }) {
    return (
        <div className="modal-content-description">
            <h4>Descripción</h4>
            <textarea
                name="description"
                className="modal-area"
                autoFocus
                required
                placeholder="Explica brevemente los detalles de la rutina"
                onChange={(e) => setRoutineData({ ...routineData, description: e.target.value })}
                style={{ width: "100%", height: "250px" }}
            />
        </div>
    );
}