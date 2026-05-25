import React from "react";
import { useState, useRef } from "react";
import usePanelEntrenador from "./hooks/usePanelEntrenador";

import Resumen from "./components/Resumen";
import Acciones from "./components/Acciones";
import ListaCLientes from "./components/ListaClientes";
import FiltroClientes from "./components/FiltroClientes";
import Estadisticas from "./components/Estadisticas";
import Ingresos from "./components/Ingresos";

import { BarChart3, Zap, Users, Wallet, Star } from "lucide-react";

import './styles/base.css';
import "./styles/PanelEntrenador.css";
import ClienteGestion from "../ClienteGestion/ClienteGestion";

export default function PanelEntrenador() {

    const { clientes, loading, stats } = usePanelEntrenador();

    const [search, setSearch] = useState("");
    const [nivel, setNivel] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);

    const clientesRef = useRef(null);

    if (loading) return <p>Cargando...</p>;

    const filtered = clientes
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .filter(c => nivel === "" ? true : c.nivel === nivel);

    const scrollToClientes = () => {
        clientesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="panel-entrenador">

            <Resumen />

            {/* SECCIÓN RESUMEN */}
            <section className="seccion-contenedor">
                <h2 className="seccion-titulo">
                   <span className="titulo-icono"><BarChart3 size={18} /></span>
                        Resumen 
                </h2>
                <Estadisticas stats={stats || []} />
            </section>

            {/* SECCIÓN ACCIONES */}
            <section className="seccion-contenedor">
                <h2 className="seccion-titulo">
                    <span className="titulo-icono"><Zap size={18} /></span>
                        Acciones rápidas
                </h2>
                <Acciones onScrollToClientes={scrollToClientes} />
            </section>

            {/* SECCIÓN CLIENTES */}
            <section className="seccion-contenedor" ref={clientesRef}>
                
                <div className="seccion-clientes-cabecera">
                    <h2 className="seccion-titulo">
                        <span className="titulo-icono"><Users size={18} /></span>
                            Clientes asignados
                    </h2>

                    <FiltroClientes
                        search={search}
                        setSearch={setSearch}
                        nivel={nivel}
                        setNivel={setNivel}
                    />
                </div>

                <ListaCLientes
                    clientes={filtered}
                    onSelectClient={setSelectedClient}
                />
            </section>

            {/* SECCIÓN INGRESOS */}
            <section className="seccion-contenedor">
                <h2 className="seccion-titulo">
                    <span className="titulo-icono"><Wallet size={18} /></span>
                        Ingresos
                </h2>
                <Ingresos />
            </section>

        </div>
    );
}
