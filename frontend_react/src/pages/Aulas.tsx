import { useState, useEffect, useMemo } from 'react';
import { api, type PlanoAula } from '../services/api';
import { AulasHeader } from '../components/aulas/AulasHeader';
import { AulasStats } from '../components/aulas/AulasStats';
import { AulasTableContainer } from '../components/aulas/AulasTableContainer';

export function Aulas() {
  const [aulas, setAulas] = useState<PlanoAula[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAulas() {
      try {
        const data = await api.getAulas();
        setAulas(data);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAulas();
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
      />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400">Carregando aulas...</p>
        </div>
      ) : (
        <AulasTableContainer aulas={aulas} />
      )}
    </div>
  );
}
