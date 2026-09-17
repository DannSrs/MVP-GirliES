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

const AulaFormContext = createContext<AulaFormContextType | undefined>(undefined);

export function AulaFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<AulaFormData>({
    categoria: 'Módulo 2: Python Fundamentos & Estruturas',
    titulo: '',
    descricao: '',
    dataHora: '2026-10-21', // Default value
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
