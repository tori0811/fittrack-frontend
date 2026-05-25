
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "../../../../../constants/workoutOptions";
import "./Steps.css";
export default function Step3Modal({ routineData, setRoutineData, activeTab, setActiveTab, tempImg, setTempImg }) {
    
    const handleCloseImg = () => setTempImg('');

    return (
        <div className="tab-wrapper">
            <div className="tab-container">
                <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}>Subir Foto</button>
                <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}>Galeria</button>
            </div>
            <div className="tab-content">
                {activeTab === 'upload' && (
                    <>
                        <div className="upload-area">
                            {tempImg ? (
                                <>
                                    <button className="close-img" onClick={handleCloseImg}><X size={30} /></button>
                                    <div className="upload-img-area">
                                        <img src={URL.createObjectURL(tempImg)} alt="preview" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>Selecciona una foto del PC</p>
                                    <label htmlFor="theme" className="custom-file-upload">SELECCIONAR</label>
                                    <input type="file" id="theme" name="theme" accept="image/png, image/jpeg"
                                        style={{ display: "none" }}
                                        onChange={(e) => setTempImg(e.target.files[0])} />
                                </>
                            )}
                        </div>
                        <div className="description-area">
                            <p>Tamaño recomendado:<span>1920x1080</span></p>
                            <p>Tamaño máximo:<span>6 MB</span></p>
                        </div>
                    </>
                )}
                {activeTab === 'gallery' && (
                    <div className="gallery-grid">
                        {GALLERY_IMAGES.map((img, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={img} alt={`tema-${index}`}
                                    className={routineData.theme === img ? 'selected' : ''}
                                    onClick={() => setRoutineData({ ...routineData, theme: img })} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}