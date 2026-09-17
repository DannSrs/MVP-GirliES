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
    categoria: 'Módulo 2: Python Fundamentos & Estruturas',
    titulo: '',
    descricao: '',
    dataHora: getNextWednesday(),
    local: 'Lab 04 - Bloco D (Linux/VS Code)',
    linkSlide: '',
    linkPlanoAula: '',
    linkRoteiro: '',
    checklist: [],
    links: [],
    status: 'Em Preparação'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!aulaId);
  
  const isEditing = !!aulaId;

  // Carregar dados se for edição
  useEffect(() => {
    if (aulaId) {
      setIsLoading(true);
      api.getAulaById(aulaId).then((data) => {
        setFormData({
          categoria: data.categoria || 'Módulo 2: Python Fundamentos & Estruturas',
          titulo: data.titulo,
          descricao: data.descricao || '',
          dataHora: data.dataHora,
          local: data.local || 'Lab 04 - Bloco D (Linux/VS Code)',
          linkSlide: data.linkSlide || '',
          linkPlanoAula: data.linkPlanoAula || '',
          linkRoteiro: data.linkRoteiro || '',
          checklist: data.checklist || [],
          links: data.links || [],
          status: data.status || 'Em Preparação'
        });
      }).catch(err => {
        console.error("Erro ao carregar aula para edição:", err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [aulaId]);

  const updateField = (field: keyof AulaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = async () => {
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
