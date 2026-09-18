import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Aulas } from './pages/Aulas';
import { VisualizarAula } from './pages/VisualizarAula';
import { CadastrarAula } from './pages/CadastrarAula';
import { EditarAula } from './pages/EditarAula';
import { Instagram } from './pages/Instagram';
import { CadastrarPost } from './pages/CadastrarPost';
import { Eventos } from './pages/Eventos';
import { CadastrarEvento } from './pages/CadastrarEvento';
import { VisualizarEvento } from './pages/VisualizarEvento';
import { Configuracoes } from './pages/Configuracoes';
import { Login } from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="aulas/cadastrar" element={<CadastrarAula />} />
          <Route path="aulas/:id/editar" element={<EditarAula />} />
          <Route path="aulas/:id" element={<VisualizarAula />} />
          <Route path="instagram" element={<Instagram />} />
          <Route path="instagram/cadastrar" element={<CadastrarPost />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="eventos/cadastrar" element={<CadastrarEvento />} />
          <Route path="eventos/:id" element={<VisualizarEvento />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
