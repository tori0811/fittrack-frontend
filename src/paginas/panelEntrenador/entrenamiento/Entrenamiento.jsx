import { useState, useEffect, useMemo } from "react";
import './Entrenamiento.css';
import Filters from "./components/filters";
import CreateModal from "./components/modal/createModal";
import RoutineCard from "./components/CardRoutine/RoutineCard";
import { usePlantillas, useEditarPlantilla } from "./hook/entrenamiento.hooks";

export default function Entrenamiento() {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [rutinaEditando, setRutinaEditando] = useState(null);
    const { plantillas, fetchPlantillas, eliminarPlantilla } = usePlantillas();
    const { editarPlantilla } = useEditarPlantilla();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        types: [],
        levels: [],
        genders: []
    });

    useEffect(() => {
        document.body.style.overflow = (showModal || showEditModal) ? 'hidden' : 'visible';
        return () => { document.body.style.overflow = 'visible'; };
    }, [showModal, showEditModal]);

    const plantillasFiltradas = useMemo(() => {
        return plantillas.filter(r => {
            const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchType = filters.types.length === 0 || filters.types.includes(r.type);
            const matchLevel = filters.levels.length === 0 || filters.levels.includes(r.level);
            const matchGender = filters.genders.length === 0 || filters.genders.includes(r.gender);
            return matchSearch && matchType && matchLevel && matchGender;
        });
    }, [plantillas, search, filters]);

    return (
        <div className="contaniner">
            <div className="header">
                <h2>Entrenamiento</h2>
            </div>
            <div className="wrapper">
                <div className="border-wrapper">
                    <h3>Mis rutinas</h3>
                </div>
                <div className="toolbar">
                    <Filters
                        filters={filters}
                        setFilters={setFilters}
                        search={search}
                        setSearch={setSearch}
                    />
                    <div className="btn-rutine">
                        <button className="btn-rutine-item" onClick={() => setShowModal(true)}>NUEVA RUTINA</button>
                    </div>
                </div>
                <div className="rutinas-grid">
                    {plantillasFiltradas.length > 0 ? (
                        plantillasFiltradas.map(routine => (
                            <RoutineCard
                                key={routine.id}
                                routine={routine}
                                onEliminar={eliminarPlantilla}
                                onEditar={(routine) => { setRutinaEditando(routine); setShowEditModal(true); }}
                            />
                        ))
                    ) : (
                        <div className="rutinas-empty">
                            <p className="rutinas-empty-title">No hay rutinas que coincidan</p>
                            <p className="rutinas-empty-subtitle">Prueba a cambiar los filtros o crea una nueva rutina</p>
                        </div>
                    )}
                </div>
            </div>

            <CreateModal
                showModal={showModal}
                setShowModal={setShowModal}
                onSuccess={fetchPlantillas}
            />

            <CreateModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                onSuccess={fetchPlantillas}
                editMode={true}
                initialData={rutinaEditando}
                onEdit={(data) => editarPlantilla(rutinaEditando.id, data)}
            />
        </div>
    );
}