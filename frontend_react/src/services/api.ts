export interface ChecklistItem {
  id?: number;
  descricao: string;
  isCompleted: boolean;
}

export interface LinksAtividade {
  id?: number;
  tipo: 'Material' | 'Link Auxiliar';
  titulo?: string;
  link: string;
}

export interface PlanoAula {
  id: number;
  titulo: string;
  descricao?: string;
  categoria?: string;
  dataHora: string;
  local?: string;
  status?: string;
  linkPlanoAula?: string;
  linkSlide?: string;
  linkRoteiro?: string;
  checklist?: ChecklistItem[];
  links?: LinksAtividade[];
  semana?: number;
}

export interface PostInstagram {
  id: number;
  titulo: string;
  descricao?: string;
  status?: string;
  tipoPost: string;
  publicoAlvo?: string;
  deadline: string;
  semana?: number;
}

export interface EventoGeral {
  id: number;
  titulo: string;
  tipoEvento: string;
  regimeEvento: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  local?: string;
  logisticsChecklist?: ChecklistItem[];
  semana?: number;
}

const API_BASE = '/api';

export const api = {
  getAulas: async (): Promise<PlanoAula[]> => {
    const res = await fetch(`${API_BASE}/aulas`);
    if (!res.ok) throw new Error('Erro ao buscar aulas');
    return res.json();
  },
  
  getAulaById: async (id: number | string): Promise<PlanoAula> => {
    const res = await fetch(`${API_BASE}/aulas/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar aula');
    return res.json();
  },

  updateAula: async (id: number | string, aula: Partial<PlanoAula>): Promise<PlanoAula> => {
    const res = await fetch(`${API_BASE}/aulas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aula)
    });
    
    if (!res.ok) {
      let errorMsg = 'Erro ao atualizar aula';
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch (e) {
        errorMsg = `Erro ${res.status}: ${res.statusText}`;
      }
      throw new Error(errorMsg);
    }
    
    return res.json();
  },
  
  createAula: async (aula: Partial<PlanoAula>): Promise<PlanoAula> => {
    const res = await fetch(`${API_BASE}/aulas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aula)
    });
    
    if (!res.ok) {
      let errorMsg = 'Erro ao criar aula';
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch (e) {
        errorMsg = `Erro ${res.status}: ${res.statusText}`;
      }
      throw new Error(errorMsg);
    }
    
    return res.json();
  },


  
  getPosts: async (): Promise<PostInstagram[]> => {
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) throw new Error('Erro ao buscar posts');
    return res.json();
  },

  getEventos: async (): Promise<EventoGeral[]> => {
    const res = await fetch(`${API_BASE}/eventos`);
    if (!res.ok) throw new Error('Erro ao buscar eventos');
    return res.json();
  },

  getConfiguracoesDatas: async (): Promise<{ dataInicioProjeto?: string, dataFimProjeto?: string }> => {
    const res = await fetch(`${API_BASE}/configuracoes/projeto/datas`);
    if (!res.ok) throw new Error('Erro ao buscar configurações');
    return res.json();
  },

  // Helpers to fetch filtered by semana
  getAulasDaSemana: async (semana: number): Promise<PlanoAula[]> => {
    const aulas = await api.getAulas();
    return aulas.filter(a => a.semana === semana);
  },
  
  getPostsDaSemana: async (semana: number): Promise<PostInstagram[]> => {
    const posts = await api.getPosts();
    return posts.filter(p => p.semana === semana);
  },

  getEventosDaSemana: async (semana: number): Promise<EventoGeral[]> => {
    const eventos = await api.getEventos();
    return eventos.filter(e => e.semana === semana);
  },

  toggleChecklistItem: async (id: number): Promise<ChecklistItem> => {
    const res = await fetch(`${API_BASE}/checklists/${id}/toggle`, {
      method: 'PATCH'
    });
    if (!res.ok) throw new Error('Erro ao alternar status do checklist');
    return res.json();
  }
};
