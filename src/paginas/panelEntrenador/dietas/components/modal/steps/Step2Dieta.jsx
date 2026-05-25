
import { X } from 'lucide-react';


const DIET_GALLERY = [
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
];

export default function Step2Dieta({ dietaData, setDietaData, activeTab, setActiveTab, tempImg, setTempImg }) {

    const handleCloseImg = () => setTempImg('');

    return (
        <div className="tab-wrapper">
            <div className="tab-container">
                <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}>Subir Foto</button>
                <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}>Galería</button>
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
                                    <label htmlFor="tema-dieta" className="custom-file-upload">SELECCIONAR</label>
                                    <input type="file" id="tema-dieta" accept="image/png, image/jpeg"
                                        style={{ display: 'none' }}
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
                        {DIET_GALLERY.map((img, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={img} alt={`tema-${index}`}
                                    className={dietaData.tema === img ? 'selected' : ''}
                                    onClick={() => setDietaData({ ...dietaData, tema: img })} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}