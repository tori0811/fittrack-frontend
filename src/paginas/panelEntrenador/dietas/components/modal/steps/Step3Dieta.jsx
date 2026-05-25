import "../../../styles/steps.css";

export default function Step3Dieta({ dietaData, setDietaData }) {
    return (
        <div className="step3-wrapper">
            <h4>Descripción</h4>
            <textarea
                className="step3-area"
                autoFocus
                placeholder="Explica brevemente los detalles de la dieta"
                value={dietaData.descripcion || ''}
                onChange={e => setDietaData({ ...dietaData, descripcion: e.target.value })}
            />
        </div>
    );
}