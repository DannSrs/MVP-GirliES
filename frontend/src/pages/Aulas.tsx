import { useState, useEffect, useMemo } from 'react';
import { api, type PlanoAula, type Usuario, type Modulo } from '../services/api';
import { AulasHeader } from '../components/aulas/AulasHeader';
import { AulasStats } from '../components/aulas/AulasStats';
import { AulasTableContainer } from '../components/aulas/AulasTableContainer';

export function Aulas() {
  const [aulas, setAulas] = useState<PlanoAula[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [monitorasTotais, setMonitorasTotais] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [aulasData, usuariosData, modulosData] = await Promise.all([
          api.getAulas(),
          api.getUsuarios(),
          api.getModulos()
        ]);
        setAulas(Array.isArray(aulasData) ? aulasData : []);
        setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
        setModulos(Array.isArray(modulosData) ? modulosData : []);
        
        const monitoras = Array.isArray(usuariosData) 
          ? usuariosData.filter(u => u.role === 'voluntaria' || u.funcaoInterna?.toLowerCase().includes('monitora'))
          : [];
          
        setMonitorasTotais(monitoras.length);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const { semanasTotais, cargaHorariaTotal } = useMemo(() => {
    let horas = 0;

    aulas.forEach(() => {
      // Como não temos a duração exata na API, vamos assumir 3 horas por aula
      // Ou se a API retornar dataHora, podemos tentar deduzir se houver 'fim', mas vamos assumir 3h padrão.
      horas += 3;
    });

    return {
      semanasTotais: aulas.length,
      cargaHorariaTotal: horas,
    };
  }, [aulas]);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <AulasHeader />
      <AulasStats
        semanasTotais={semanasTotais}
        cargaHorariaTotal={cargaHorariaTotal}
        monitorasVoluntarias={monitorasTotais}
      />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400">Carregando aulas...</p>
        </div>
      ) : (
        <AulasTableContainer aulas={aulas} usuarios={usuarios} modulos={modulos} />
      )}
    </div>
  );
}
