import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface EventoChecklistItem {
  descricao: string;
  subDescricao?: string;
  isCompleted: boolean;
}

export interface EventoMonitora {
  id?: number; // referência ao usuário do backend (quando selecionado do sistema)
  nome: string;
  papel: string;
  letra: string;
  cor: string; // Tailwind bg class
}

export interface EventoFormData {
  titulo: string;
  tipoEvento: string;
  regimeEvento: string;
  publicoAlvo: string;
  resumo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  espacoCampus: string;
  capacidade: number;
  linkInscricao: string;
  logisticsChecklist: EventoChecklistItem[];
  monitoras: EventoMonitora[];
}

interface EventoFormContextType {
  formData: EventoFormData;
  updateField: (field: keyof EventoFormData, value: any) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

// ─── Valores Padrão ───────────────────────────────────────────────────────────

function getNextSaturday(): string {
  const date = new Date();
  const daysUntilSat = (6 - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilSat);
  return date.toISOString().split('T')[0];
}

const DEFAULT_FORM: EventoFormData = {
  titulo: '',
  tipoEvento: 'Acolhida & Recepção',
  regimeEvento: 'Presencial (Campus IFPE)',
  publicoAlvo: 'Calouras de Eng. de Software & Integrado',
  resumo: '',
  data: getNextSaturday(),
  horarioInicio: '14:00',
  horarioFim: '17:00',
  espacoCampus: '',
  capacidade: 30,
  linkInscricao: '',
  logisticsChecklist: [
    { descricao: 'Solicitar liberação e chaves do laboratório', subDescricao: 'Ofício enviado à Diretoria de Ensino do IFPE', isCompleted: false },
    { descricao: 'Kits de boas-vindas GirliES', subDescricao: 'Ecobags, adesivos pixel do Pip e bottons da turma', isCompleted: false },
    { descricao: 'Equipamentos audiovisuais', subDescricao: 'Projetor HDMI, caixa amplificada e microfone sem fio', isCompleted: false },
  ],
  monitoras: [
    { nome: 'Letícia Silva', papel: 'Monitora Principal', letra: 'L', cor: 'bg-violet-500' },
    { nome: 'Clara Albuquerque', papel: 'Monitora de Apoio', letra: 'C', cor: 'bg-blue-500' },
  ],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const EventoFormContext = createContext<EventoFormContextType | undefined>(undefined);

export function EventoFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<EventoFormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (field: keyof EventoFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Sem backend — apenas simula o submit
  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      console.log('[EventoForm] Dados do formulário:', formData);
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate('/eventos');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EventoFormContext.Provider value={{ formData, updateField, submitForm, isSubmitting }}>
      {children}
    </EventoFormContext.Provider>
  );
}

export function useEventoForm() {
  const context = useContext(EventoFormContext);
  if (!context) {
    throw new Error('useEventoForm must be used within an EventoFormProvider');
  }
  return context;
}
