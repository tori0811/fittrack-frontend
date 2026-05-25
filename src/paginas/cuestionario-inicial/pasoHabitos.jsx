

export default function PasoHabitos({agua, setAgua, sueno, setSueno, estres, setEstres}){

    // Opciones de agua
    const opcionesAgua = ["Menos de 1L","1-2L","2-3L","Más de 3L"];
        

    // Opciones de sueño
    const opcionesSueno = ["Menos de 5 horas","5-6 horas", "6-7 horas","7-8 horas","Más de 8 horas"];
        

    // Opciones de estrés
    const opcionesEstres = ["Bajo","Moderado","Alto"];

    return (
        
        <div className="habitos">

            <div className="seccion">
                <h2>¿Cuanta agua bebes al dia?</h2>
                    <div className="tarjetas-opciones">
                        {opcionesAgua.map(item => (
                            <div key={item} className={`tarjeta ${agua === item ? 'seleccionada' : ''}`} onClick={() => setAgua(item)}>{item}</div>
                        ))}
                    </div>
            </div>
            
            <div className="seccion">
                <h2>¿Cuántas horas duermes normalmente?</h2>
                <div className="tarjetas-opciones">
                        {opcionesSueno.map(item => (
                            <div key={item} className={`tarjeta ${sueno === item ? 'seleccionada' : ''}`} onClick={() => setSueno(item)}>{item}</div>
                        ))}
                    </div>
            </div>

            <div className="seccion">
                <h2>¿Cómo describirias tu nivel de estrés?</h2>
                <div className="tarjetas-opciones">
                        {opcionesEstres.map(item => (
                            <div key={item} className={`tarjeta ${estres === item ? 'seleccionada' : ''}`} onClick={() => setEstres(item)}>{item}</div>
                        ))}
                    </div>
            </div>


        </div>
    )
}