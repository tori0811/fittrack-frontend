import { Outlet } from "react-router-dom"
import Sidebar from '../componentes/sideBar/Sidebar';
import './styles/EntrenadorLayout.css';

export default function EntrenadorLayout() {

    return (

        <div className="entrenador-layout">
            <Sidebar />
            <main className="entrenador-container">
                <Outlet />
            </main>
        </div>


    )
    
}
