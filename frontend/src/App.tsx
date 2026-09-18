import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Aulas } from './pages/Aulas';
import { VisualizarAula } from './pages/VisualizarAula';
import { CadastrarAula } from './pages/CadastrarAula';
import { EditarAula } from './pages/EditarAula';
import { Instagram } from './pages/Instagram';
import { CadastrarPost } from './pages/CadastrarPost';
import { VisualizarPost } from './pages/VisualizarPost';
import { Eventos } from './pages/Eventos';
import { CadastrarEvento } from './pages/CadastrarEvento';
import { VisualizarEvento } from './pages/VisualizarEvento';
import { Configuracoes } from './pages/Configuracoes';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="aulas" element={<Aulas />} />
              <Route path="aulas/cadastrar" element={<CadastrarAula />} />
              <Route path="aulas/:id/editar" element={<EditarAula />} />
              <Route path="aulas/:id" element={<VisualizarAula />} />
              <Route path="instagram" element={<Instagram />} />
              <Route path="instagram/cadastrar" element={<CadastrarPost />} />
              <Route path="instagram/:id/editar" element={<CadastrarPost />} />
              <Route path="instagram/:id" element={<VisualizarPost />} />
              <Route path="eventos" element={<Eventos />} />
              <Route path="eventos/cadastrar" element={<CadastrarEvento />} />
              <Route path="eventos/:id" element={<VisualizarEvento />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
