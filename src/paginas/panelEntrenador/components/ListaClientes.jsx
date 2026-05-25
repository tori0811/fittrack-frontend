import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListaCLientes.css";


export default function ListaCLientes({ clientes }) {

    const navigate = useNavigate();
    
    return (
        <section className="clients-section">

            {clientes.length === 0 ? (
                <p className="no-clients">No tienes clientes asignados aún.</p>
            ) : (
                <div className="clients-list">
                    {clientes.map(c => (
                        <div className="client-card card-base" key={c.id}>
                            
                            <div className="client-avatar">
                                {c.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="client-info">
                                <h3>{c.name}</h3>
                                <p>{c.email}</p>
                            </div>

                            <div className="client-actions">
                                <button onClick={() => navigate(`/entrenador/cliente/${c.id}`)}>Gestionar</button>

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
