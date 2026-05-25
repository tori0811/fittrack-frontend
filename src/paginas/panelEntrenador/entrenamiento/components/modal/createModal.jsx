import { useState, useEffect } from "react";
import { ArrowLeft, CameraIcon, Dumbbell, FireExtinguisherIcon, LucideTableConfig } from "lucide-react";
import { X } from 'lucide-react';
import { useCrearPlantilla } from "../../hook/entrenamiento.hooks";
import Step1Modal from "./step1Modal";
import Step2Modal from "./step2Modal";
import Step3Modal from "./Step3Modal";
import Step4Modal from "./Step4Modal";
import "./CreateModal.css";

export default function CreateModal({ showModal, setShowModal, onSuccess, editMode = false, initialData = null, onEdit }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [routineData, setRoutineData] = useState({
        routineType: '', name: '', gender: '', type: '', level: '', theme: '', description: ''
    });
    const [activeTab, setActiveTab] = useState('gallery');
    const [tempImg, setTempImg] = useState('');
    const { crearPlantilla } = useCrearPlantilla();

    useEffect(() => {
        if (editMode && initialData) {
            setRoutineData({
                routineType: initialData.routineType || '',
                name: initialData.name || '',
                gender: initialData.gender || '',
                type: initialData.type || '',
                level: initialData.level || '',
                theme: initialData.theme || '',
                description: initialData.description || ''
            });
        }
    }, [editMode, initialData]);

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentStep(1);
    };

    const handlePrevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const handleNextStep = async () => {
        if (!canAdvance) return;
        if (currentStep === 4) {
            if (editMode) {
                const ok = await onEdit(routineData);
                if (ok) {
                    setShowModal(false);
                    setCurrentStep(1);
                    onSuccess();
                }
            } else {
                const ok = await crearPlantilla(routineData);
                if (ok) {
                    setShowModal(false);
                    setCurrentStep(1);
                    onSuccess();
                }
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const headerConfig = {
        1: { icon: <Dumbbell size={30} />, title: editMode ? 'EDITAR RUTINA' : 'NUEVA RUTINA' },
        2: { icon: <LucideTableConfig size={30} />, title: 'CONFIGURACION' },
        3: { icon: <CameraIcon size={30} />, title: 'TEMA' },
        4: { icon: <FireExtinguisherIcon size={30} />, title: 'INFO' },
    };

    const canAdvance = !((currentStep === 1 && routineData.routineType === '') || (currentStep === 2 && routineData.name === ''));

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-menu">
                        <div className="modal-header">
                            <div className="modal-icon">{headerConfig[currentStep].icon}</div>
                            <h1>{headerConfig[currentStep].title}</h1>
                            <div className="close-modal">
                                <button className="close-modal" onClick={handleCloseModal}><X size={30} /></button>
                            </div>
                        </div>

                        {currentStep > 1 && (
                            <button className="btn-back" onClick={handlePrevStep}><ArrowLeft size={40} /></button>
                        )}

                        <div className="modal-body">
                            {currentStep === 1 && <Step1Modal routineData={routineData} setRoutineData={setRoutineData} />}
                            {currentStep === 2 && <Step2Modal routineData={routineData} setRoutineData={setRoutineData} />}
                            {currentStep === 3 && <Step3Modal routineData={routineData} setRoutineData={setRoutineData} activeTab={activeTab} setActiveTab={setActiveTab} tempImg={tempImg} setTempImg={setTempImg} />}
                            {currentStep === 4 && <Step4Modal routineData={routineData} setRoutineData={setRoutineData} />}
                        </div>

                        <div className="modal-footer">
                            <div></div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
                            </div>
                            <div className={`btn-next-wrapper ${!canAdvance ? 'disabled' : ''}`}>
                                <button onClick={handleNextStep}>
                                    {currentStep !== 4 ? 'Siguiente' : editMode ? 'Guardar' : 'Finalizar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}