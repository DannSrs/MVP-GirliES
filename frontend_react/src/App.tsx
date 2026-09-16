import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Aulas } from './pages/Aulas';
import { VisualizarAula } from './pages/VisualizarAula';
import { CadastrarAula } from './pages/CadastrarAula';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="aulas/cadastrar-aula" element={<CadastrarAula />} />
          <Route path="aulas/:id" element={<VisualizarAula />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
