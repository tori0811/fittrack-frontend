import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import './register.css';

export default function Register() {

    const [role, setRole] = useState("cliente");

    // IDENTIDAD
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");

    // CONTACTO
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    // UBICACIÓN
    const [pais, setPais] = useState("");
    const [provincia, setProvincia] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [direccion, setDireccion] = useState("");
    const [direccionSecundaria, setDireccionSecundaria] = useState("");

    // ENTRENADOR
    const [especialidad, setEspecialidad] = useState("");

    // SEGURIDAD
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);

    //Token vincular cliente / entrenador
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); 

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setRole("cliente");
        }
    }, [token]);

    const registrarUsuario = async (e) => {
        e.preventDefault();

        if (password !== confirmarPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
2
        if (name.trim().length < 2) {
            alert("El nombre es demasiado corto");
            return;
        }

        if (!email.includes("@")) {
            alert("El correo no es válido");
            return;
        }

        if (!aceptaTerminos) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }

        const body = role === 'entrenador' ? {
            name, email, password, especialidad, telefono, role
        } : {
            name, apellido, documento, email, telefono,
            pais, provincia, ciudad,
            codigo_postal: codigoPostal,
            direccion, direccion_secundaria: direccionSecundaria,
            password, role,
            token
        };

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Error al registrarse");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Registro exitoso, ahora inicia sesión!");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <section className="registro">
            <div className="registro-contenedor">
                <h1>Crear Cuenta</h1>

                <form className="registro-form" onSubmit={registrarUsuario}>

                    {/* SELECTOR ROL */}
                    <div className="role-selector">
                        <button
                            type="button"
                            className={role === 'cliente' ? 'active' : ''}
                            onClick={() => setRole('cliente')}>
                            Cliente
                        </button>
                        <button
                            type="button"
                            className={role === 'entrenador' ? 'active' : ''}
                            onClick={() => setRole('entrenador')}>
                            Entrenador
                        </button>
                    </div>

                    {/* CAMPOS COMUNES */}
                    <input type="text" placeholder="Nombre" value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <input type="email" placeholder="Correo electrónico" value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input type="text" placeholder="Número de teléfono" value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} />

                    {/* CAMPOS ENTRENADOR */}
                    {role === 'entrenador' && (
                        <input type="text" placeholder="Especialidad" value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)} />
                    )}

                    {/* CAMPOS CLIENTE */}
                    {role === 'cliente' && (
                        <>
                            <input type="text" placeholder="Apellido" value={apellido}
                                onChange={(e) => setApellido(e.target.value)} />

                            <input type="text" placeholder="Documento de identidad (DNI/NIE/Pasaporte)" value={documento}
                                onChange={(e) => setDocumento(e.target.value)} />

                            <input type="text" placeholder="País" value={pais}
                                onChange={(e) => setPais(e.target.value)} />

                            <input type="text" placeholder="Provincia" value={provincia}
                                onChange={(e) => setProvincia(e.target.value)} />

                            <input type="text" placeholder="Ciudad" value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)} />

                            <input type="text" placeholder="Código postal" value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)} />

                            <input type="text" placeholder="Dirección" value={direccion}
                                onChange={(e) => setDireccion(e.target.value)} />

                            <input type="text" placeholder="Dirección secundaria (opcional)" value={direccionSecundaria}
                                onChange={(e) => setDireccionSecundaria(e.target.value)} />
                        </>
                    )}

                    {/* SEGURIDAD */}
                    <div className="input-password">
                        <input
                            type={mostrarPassword ? "text" : "password"}
                            placeholder="Contraseña (mínimo 6 caracteres)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="toggle" onClick={() => setMostrarPassword(!mostrarPassword)}>
                            {mostrarPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <div className="input-password">
                        <input
                            type={mostrarConfirmarPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                        />
                        <span className="toggle" onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}>
                            {mostrarConfirmarPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* TÉRMINOS */}
                    <div className="terminos">
                        <input type="checkbox" checked={aceptaTerminos}
                            onChange={() => setAceptaTerminos(!aceptaTerminos)} />
                        <label>Acepto los <a href="#">Términos y Condiciones</a></label>
                    </div>

                    <button type="submit">Crear Cuenta</button>

                    <p className="link-login">
                        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
                    </p>
                </form>
            </div>
        </section>
    );
}