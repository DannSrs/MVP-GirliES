import { createContext, useContext, useState } from 'react';
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
}

interface AulaFormContextType {
  formData: AulaFormData;
  updateField: (field: keyof AulaFormData, value: any) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

function getNextWednesday(): string {
  const date = new Date();
  const daysUntilWednesday = (3 - date.getDay() + 7) % 7;
  // If today is Wednesday, it will return today (0 days). 
  // If we wanted exactly the *next* week when today is Wednesday, we'd change 0 to 7.
  // But usually, if they register on Wednesday, it's for today's class.
  date.setDate(date.getDate() + daysUntilWednesday);
  return date.toISOString().split('T')[0];
}

const AulaFormContext = createContext<AulaFormContextType | undefined>(undefined);

export function AulaFormProvider({ children }: { children: ReactNode }) {
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
    links: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        checklist: formData.checklist.map(({ id, ...rest }) => rest),
        links: formData.links.map(({ id, ...rest }) => rest),
        // Equipe enviada vazia por enquanto
      };
      
      await api.createAula(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AulaFormContext.Provider value={{ formData, updateField, submitForm, isSubmitting }}>
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
