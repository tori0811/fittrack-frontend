
import { Outlet } from 'react-router-dom';
import ClienteSidebar from '../paginas/PanelCliente/components/sidebar/ClienteSidebar';
import '../paginas/PanelCliente/styles/cliente.css';

export default function ClienteLayout() {
    return (
        <div className="entrenador-layout">
            <ClienteSidebar />
            <main className="entrenador-container">
                <Outlet />
            </main>
        </div>
    );
}
