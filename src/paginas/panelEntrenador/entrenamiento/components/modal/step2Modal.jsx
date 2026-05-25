
import { WORKOUT_TYPES, DIFFICULTY_LEVELS, GENDER_OPTIONS } from "../../../../../constants/workoutOptions";
import "./Steps.css";

export default function Step2Modal({ routineData, setRoutineData }) {
    return (
        <div className="modal-content">
            <div className="form-group">
                <h4>Nombre de la rutina</h4>
                <input type="text" placeholder="Nombre de la rutina"
                    onChange={(e) => setRoutineData({ ...routineData, name: e.target.value })} />
            </div>
            <div className="form-group">
                <h4>Sexo</h4>
                <div className="pills">
                    {GENDER_OPTIONS.map(gender => (
                        <button key={gender} className={`pill ${routineData.gender === gender ? 'selected' : ''}`}
                            onClick={() => setRoutineData({ ...routineData, gender })}>
                            {gender.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <h4>Tipo</h4>
                <div className="pills">
                    {WORKOUT_TYPES.map(type => (
                        <button key={type} className={`pill ${routineData.type === type ? 'selected' : ''}`}
                            onClick={() => setRoutineData({ ...routineData, type })}>
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <h4>Nivel</h4>
                <div className="pills">
                    {DIFFICULTY_LEVELS.map(level => (
                        <button key={level} className={`pill ${routineData.level === level ? 'selected' : ''}`}
                            onClick={() => setRoutineData({ ...routineData, level })}>
                            {level.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}