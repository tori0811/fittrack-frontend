import './App.css';
import './estilos/normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import NavBar from './componentes/navBar/navBar.jsx';
import Inicio from './paginas/Inicio/inicio.jsx';
import Entrenadores from './paginas/entrenadores/entrenadores.jsx';
import Footer from './componentes/footer/footer.jsx';
import Login from './paginas/login/login.jsx'
import Register from './paginas/registro/register.jsx';
import CuestionarioInicial from './paginas/cuestionario-inicial/cuestionarioInicial.jsx';
import RequireCuestionario from './guards/RequireCuestionario.jsx';
import PanelEntrenador from './paginas/panelEntrenador/PanelEntrenador.jsx';
import ClienteGestion from './paginas/ClienteGestion/ClienteGestion.jsx';
import EntrenadorLayout from './layouts/entrenadorLayout.jsx';
import Entrenamiento from './paginas/panelEntrenador/entrenamiento/Entrenamiento.jsx';
import RutinaConstructor from './paginas/panelEntrenador/entrenamiento/components/rutina/RutinaConstructor.jsx';
import Dietas from './paginas/panelEntrenador/dietas/Dietas.jsx';
import DietaConstructor from './paginas/panelEntrenador/dietas/components/dietas/components/constructor/DietaConstructor.jsx';

import ClienteLayout from './layouts/clienteLayout.jsx';
import Dashboard from './paginas/PanelCliente/views/Dashboard.jsx';
import MiRutina from './paginas/PanelCliente/views/Mirutina.jsx';
import MiDieta from './paginas/PanelCliente/views/Midieta.jsx';
import Journal from './paginas/PanelCliente/views/Journal.jsx';
import MiPerfil from './paginas/PanelCliente/views/MiPerfil.jsx';




function App() {

  const location = useLocation();
  const esHome = location.pathname === '/';
  return (
    
    <>

      <header className="app-header">
          <NavBar />
      </header>

      <div className={`app-content ${esHome ? "no-padding" : ""}`}>
        <main className='app-main'>
        
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/entrenadores' element={<Entrenadores />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cuestionario' element={<RequireCuestionario><CuestionarioInicial/></RequireCuestionario>} />

          <Route element={<EntrenadorLayout />}>
            <Route path='/panel-entrenador' element={<PanelEntrenador />} />
            <Route path="/entrenador/cliente/:id" element={<ClienteGestion />} />
            <Route path="/entrenador/plantillas" element={<Entrenamiento />} />
            <Route path="/entrenador/rutinas/:id" element={<RutinaConstructor />} />
            <Route path="/entrenador/dietas" element={<Dietas />} />
            <Route path="/entrenador/dietas/:id" element={<DietaConstructor />} />
          </Route>
          
          <Route element={<ClienteLayout />}>
            <Route path="/panel" element={<Dashboard />} />
            <Route path="/panel/rutina" element={<MiRutina />} />
            <Route path="/panel/dieta" element={<MiDieta />} />
            <Route path="/panel/journal" element={<Journal />} />
            <Route path="/panel/perfil" element={<MiPerfil />} />
        </Route>
          
        </Routes>
      </main>
      </div>
        <footer className='footer'>
          <Footer />
        </footer>
    </>

   
      

      
    
);
}

export default App;