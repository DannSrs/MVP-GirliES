import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Aulas } from './pages/Aulas';
import { VisualizarAula } from './pages/VisualizarAula';
import { CadastrarAula } from './pages/CadastrarAula';
import { EditarAula } from './pages/EditarAula';
import { Instagram } from './pages/Instagram';
import { CadastrarPost } from './pages/CadastrarPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="aulas/cadastrar-aula" element={<CadastrarAula />} />
          <Route path="aulas/:id/editar" element={<EditarAula />} />
          <Route path="aulas/:id" element={<VisualizarAula />} />
          <Route path="instagram" element={<Instagram />} />
          <Route path="instagram/cadastrar" element={<CadastrarPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
