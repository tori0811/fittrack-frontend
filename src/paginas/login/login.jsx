import { use, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Login.css';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {

    const { login } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const iniciarSesion = async (e) => {
        e.preventDefault();

        setError('');
        
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            
            if(!response.ok) {
                console.log('Error en login:' , data);
                alert(data.error || 'Credenciales incorrectas.');
                return;
            }
            
            alert("Inicio de sesión exitoso");
            console.log("Usuario:", data.user);

            // Guardar en localStorage
            login(data.user, data.role, data.token);

            console.log("Token guardado:", data.token);

             // Redirigir según rol
            if (data.role === "admin") {
                navigate("/admin");
            } else if (data.role === "entrenador") {
                navigate("/panel-entrenador");
            } else {
                const checkCuestionario = await fetch("http://localhost:8000/api/cuestionario/check", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${data.token}`
                }
            });

            const respuesta = await checkCuestionario.json();

            if (respuesta.completed) {
                navigate("/panel");
            } else {
                navigate("/cuestionario");
            }
        
            }
        
        } catch (error) {
            setError("Error en la conexión con el servidor");
            console.error(error);
        }
    };


    return (
        <section className="login">
            <div className="login-contenedor">
                <h1>Iniciar Sesión</h1>

                <form className="login-form" onSubmit={iniciarSesion}>
                    <input
                        type="email"
                        placeholder="Correo electronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    
                    <div className="input-password">
                        <input
                            type={mostrarPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span 
                            className="toggle" 
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                            {mostrarPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <button type="submit">Entrar</button>
                    
                    <Link to='/recuperar' className="enlace-form">¿Olvidaste tu contraseña?</Link>

                    <Link to="/register" className="enlace-form">¿No tienes cuenta? Regístrate</Link>

                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
        </section>
    );
}

