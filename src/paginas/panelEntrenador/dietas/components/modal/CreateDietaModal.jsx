
import { useState } from 'react';
import { ArrowLeft, UtensilsCrossed, CameraIcon, Info } from 'lucide-react';
import { X } from 'lucide-react';
import { useCrearDieta } from '../../hooks/dieta.hooks';
import Step1Dieta from './steps/Step1Dieta';
import Step2Dieta from './steps/Step2Dieta';
import Step3Dieta from './steps/Step3Dieta';

import "../../styles/CreateDietaModal.css";


export default function CreateDietaModal({ showModal, setShowModal, onSuccess }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [dietaData, setDietaData] = useState({
        titulo: '',
        tipo: '',
        tema: '',
        descripcion: '',
        modo_seguro: false,
        alergenos: [],
        advertencias: [],
        comidas: []
    });
    const [activeTab, setActiveTab] = useState('gallery');
    const [tempImg, setTempImg] = useState('');
    const { crearDieta } = useCrearDieta();

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentStep(1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleNextStep = async () => {
        if (!canAdvance) return;
        if (currentStep === 3) {
            const ok = await crearDieta(dietaData);
            if (ok) {
                setShowModal(false);
                setCurrentStep(1);
                onSuccess();
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const headerConfig = {
        1: { icon: <UtensilsCrossed size={30} />, title: 'NUEVA DIETA' },
        2: { icon: <CameraIcon size={30} />, title: 'TEMA' },
        3: { icon: <Info size={30} />, title: 'INFO' },
    };

    const canAdvance = !(currentStep === 1 && !dietaData.titulo.trim());

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-menu">
                        <div className="modal-header">
                            <div className="modal-icon">{headerConfig[currentStep].icon}</div>
                            <h1>{headerConfig[currentStep].title}</h1>
                            <div className="close-modal">
                                <button onClick={handleCloseModal}><X size={30} /></button>
                            </div>
                        </div>

                        {currentStep > 1 && (
                            <button className="btn-back" onClick={handlePrevStep}>
                                <ArrowLeft size={40} />
                            </button>
                        )}

                        <div className="modal-body">
                            {currentStep === 1 && <Step1Dieta dietaData={dietaData} setDietaData={setDietaData} />}
                            {currentStep === 2 && <Step2Dieta dietaData={dietaData} setDietaData={setDietaData} activeTab={activeTab} setActiveTab={setActiveTab} tempImg={tempImg} setTempImg={setTempImg} />}
                            {currentStep === 3 && <Step3Dieta dietaData={dietaData} setDietaData={setDietaData} />}
                        </div>

                        <div className="modal-footer">
                            <div></div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                            </div>
                            <div className={`btn-next-wrapper ${!canAdvance ? 'disabled' : ''}`}>
                                <button onClick={handleNextStep}>
                                    {currentStep !== 3 ? 'Siguiente' : 'Finalizar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}