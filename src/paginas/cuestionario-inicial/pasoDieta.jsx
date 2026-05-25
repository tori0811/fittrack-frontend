

export default function PasoDieta({alimentos, setAlimentos, intolerancias, setIntolerancias, estiloAlimentacion, setEstiloAlimentacion}) {

  /*  Array de posibles intolerancias   */
    const opcionesIntolerancias = [
        'Gluten',
        'Lactosa',
        'Frutos secos',
        'Soja',
        'Huevo',
        'Marisco'
    ];

    /* Estilos alimentarios  */
    const estilos = ['Omnívoro','Vegetariano', 'Vegano'];

    // Funcion para doble seleccion
    const toggleIntolerancias = (item) => {
        if(intolerancias.includes(item)){
            setIntolerancias(intolerancias.filter(i => i !== item ));
        }else {
            setIntolerancias([...intolerancias, item]);
        }
    }

    return (
        
        <div className="alimentos">
          <div className="seccion">
            <h2>¿Tienes alguna intolerancia alimentaria?</h2>
            <div className="tarjetas-opciones">
              {opcionesIntolerancias.map(item => (
                <div key={item} className={`tarjeta ${intolerancias.includes(item) ? 'seleccionada' : ''}`}
                  onClick={() => toggleIntolerancias(item)}>{item}</div>
                  ))}
            </div>
          </div>
         
            <div className="seccion">
              <h2>¿Qué estilo de alimentación sigues??</h2>
              <div className="tarjetas-opciones">
                {estilos.map(item => (
                  <div key={item} className={`tarjeta ${estiloAlimentacion === item ? 'seleccionada' : ''}`}
                  onClick={() => setEstiloAlimentacion(item)}>{item}</div>
                ))}
                    
              </div>
            </div>
            
            <div className="seccion">
              <h2>¿Que alimentos NO te gustan?</h2>
              <textarea value={alimentos} onChange={(e) => setAlimentos(e.target.value)} placeholder="Por ejemplo: tomate,atun,pescado..."></textarea>
            </div>
      
        </div>
    )
}

