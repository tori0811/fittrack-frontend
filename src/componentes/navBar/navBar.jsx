import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import logo from "../../assets/logo.svg";
import "./navBar.css";

export default function NavBar() {
    const { user, role, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [openGestiones, setOpenGestiones] = useState(false);

    return (
        <div className="nav-contenedor">
            <nav className="nav">

                <div className="nav-inner">

                    {/* IZQUIERDA */}
                    <div className="nav-izq">
                        <Link to="/">
                            <img className="nav-logo" src={logo} alt="logo" />
                        </Link>
                        <h1 className="nav-titulo">FitTracker</h1>
                    </div>

                    {/* CENTRO */}
                    <div className="nav-mid">
                        {user && role === "cliente" && (
                            <>
                            </>
                        )}

                        {user && role === "entrenador" && (
                            <>
                                <Link to="/panel-entrenador" className="nav-enlace">Panel</Link>
                            </>
                        )}

                        {user && role === "admin" && (
                            <Link to="/admin" className="nav-enlace">Panel Administrador</Link>
                        )}
                    </div>

                    {/* DERECHA */}
                    <div className="nav-derecha">
                        {!user && (
                            <>
                                <Link to="/login" className="nav-enlace">Login</Link>
                                <Link to="/register" className="nav-enlace">Registrarme</Link>
                            </>
                        )}

                        {user && (
                            <span className="nav-enlace nav-logout" onClick={() => { logout(); navigate('/'); }} >
                                Cerrar Sesión
                            </span>
                        )}
                    </div>

                    {/* BOTÓN MÓVIL */}
                    <div className="nav-menu-btn" onClick={() => setIsOpen(true)}>
                        ☰
                    </div>
                </div>

                {/* MENÚ MÓVIL */}
                <div className={`nav-mobile ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>

                    {!user && (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>Registrarme</Link>
                        </>
                    )}

                    {user && role === "cliente" && (
                        <>
                            
                            <button onClick={logout}>Cerrar sesión</button>
                        </>
                    )}

                    {user && role === "entrenador" && (
                        <>
                            <Link to="/panel-entrenador" onClick={() => setIsOpen(false)}>Panel</Link>
                            <button onClick={logout}>Cerrar sesión</button>
                        </>
                    )}

                    {user && role === "admin" && (
                        <>
                            <Link to="/admin" onClick={() => setIsOpen(false)}>Panel Administrador</Link>
                            <button onClick={logout}>Cerrar sesión</button>
                        </>
                    )}
                </div>

            </nav>
        </div>
    );
}
