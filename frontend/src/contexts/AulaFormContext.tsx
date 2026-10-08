import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';
import type { PlanoAula, ChecklistItem, LinksAtividade } from '../services/api';

interface AulaFormData {
  categoria: string;
  titulo: string;
  descricao: string;
  dataHora: string;
  local: string;
  linkSlide: string;
  linkPlanoAula: string;
  linkRoteiro: string;
  checklist: ChecklistItem[];
  links: LinksAtividade[];
  status: string;
  responsaveisId: number[];
}

interface AulaFormContextType {
  formData: AulaFormData;
  updateField: (field: keyof AulaFormData, value: any) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  isEditing: boolean;
  isLoading: boolean;
}

function getNextWednesday(): string {
  const date = new Date();
  const daysUntilWednesday = (3 - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + daysUntilWednesday);
  return date.toISOString().split('T')[0];
}

const AulaFormContext = createContext<AulaFormContextType | undefined>(undefined);

export function AulaFormProvider({ children, aulaId }: { children: ReactNode, aulaId?: number | string }) {
  const [formData, setFormData] = useState<AulaFormData>({
    categoria: '',
    titulo: '',
    descricao: '',
    dataHora: getNextWednesday(),
    local: 'Lab 04 - Bloco D (Linux/VS Code)',
    linkSlide: '',
    linkPlanoAula: '',
    linkRoteiro: '',
    checklist: [],
    links: [],
    status: 'Em Preparação',
    responsaveisId: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!aulaId);
  
  const isEditing = !!aulaId;

  // Carregar dados se for edição
  useEffect(() => {
    if (isEditing && aulaId) {
      setIsLoading(true);
      api.getAulaById(aulaId).then(aula => {
        setFormData({
          categoria: aula.categoria || '',
          titulo: aula.titulo || '',
          descricao: aula.descricao || '',
          dataHora: aula.dataHora || getNextWednesday(),
          local: aula.local || 'Lab 04 - Bloco D (Linux/VS Code)',
          linkSlide: aula.linkSlide || '',
          linkPlanoAula: aula.linkPlanoAula || '',
          linkRoteiro: aula.linkRoteiro || '',
          checklist: aula.checklist || [],
          links: aula.links || [],
          status: aula.status || 'Em Preparação',
          responsaveisId: aula.responsaveisId || []
        });
      }).catch(err => {
        console.error('Erro ao carregar aula para edição', err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [aulaId, isEditing]);

  const updateField = (field: keyof AulaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = async () => {
    if (!formData.categoria) {
      throw new Error('O módulo temático é obrigatório.');
    }
    if (!formData.titulo.trim()) {
      throw new Error('O título da aula é obrigatório.');
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<PlanoAula> = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        dataHora: formData.dataHora,
        local: formData.local,
        linkSlide: formData.linkSlide,
        linkPlanoAula: formData.linkPlanoAula,
        linkRoteiro: formData.linkRoteiro,
        checklist: formData.checklist.map(({ id, atividadeId, ...rest }: any) => rest),
        links: formData.links.map(({ id, atividadeId, ...rest }: any) => rest),
        status: formData.status,
        responsaveisId: formData.responsaveisId,
      };
      
      if (isEditing && aulaId) {
        await api.updateAula(aulaId, payload);
      } else {
        await api.createAula(payload);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AulaFormContext.Provider value={{ formData, updateField, submitForm, isSubmitting, isEditing, isLoading }}>
      {children}
    </AulaFormContext.Provider>
  );
}


export function useAulaForm() {
  const context = useContext(AulaFormContext);
  if (!context) {
    throw new Error('useAulaForm must be used within an AulaFormProvider');
  }
  return context;
}
