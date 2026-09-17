import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useCicloAtivo() {
  const [cicloAtivo, setCicloAtivo] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCiclo = async () => {
      try {
        const config = await api.getConfiguracoesDatas();
        let cicloCalculado = 1;

        if (config.dataInicioProjeto) {
          const dataInicio = new Date(config.dataInicioProjeto);
          const hoje = new Date();
          const diffMs = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime() -
            new Date(dataInicio.getFullYear(), dataInicio.getMonth(), dataInicio.getDate()).getTime();

          if (diffMs >= 0) {
            cicloCalculado = Math.floor(diffMs / (1000 * 60 * 60 * 24) / 7) + 1;
          }
        }
        setCicloAtivo(cicloCalculado);
      } catch (error) {
        console.error("Erro ao buscar configurações para o ciclo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCiclo();
  }, []);

  return { cicloAtivo, loading };
}
