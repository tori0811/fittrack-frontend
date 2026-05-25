
export default function DatosPersonales({cliente}) {

    return (                
        <div className="form">
            <form className="form-cont" method="GET">
                <label>Nombre</label>
                <input type="text" name="name" defaultValue={cliente.name} readOnly></input>

                <label>Apellido</label>
                <input type="text" name="apellido" defaultValue={cliente.profile.apellido} readOnly></input>

                <label>Email</label>
                <input type="email" name="email" defaultValue={cliente.email} readOnly></input>

                <label>Telefono</label>
                <input type="tel" name="telefono" defaultValue={cliente.profile.telefono} readOnly></input>

            </form>
            
        </div>
            
       
        
    )
}