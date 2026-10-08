import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface EventoChecklistItem {
  descricao: string;
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
  resumo: '',
  data: getNextSaturday(),
  horarioInicio: '14:00',
  horarioFim: '17:00',
  espacoCampus: '',
  capacidade: 30,
  linkInscricao: '',
  logisticsChecklist: [],
  monitoras: [],
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

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      console.log('[EventoForm] Enviando dados:', formData);
      
      const tipoEventoMapped = formData.tipoEvento.includes('Acolhida') ? 'Acolhida' :
                               formData.tipoEvento.includes('Roda') ? 'Roda de Conversa' :
                               formData.tipoEvento.includes('Oficina') ? 'Oficina Prática' :
                               formData.tipoEvento.includes('Mostra') ? 'Mostra Científica' : 'Outros';

      const regimeEventoMapped = formData.regimeEvento.includes('Presencial') ? 'Presencial' : 'Online';

      // Mapeamos monitoras com id (selecionadas do sistema) para responsaveisId
      const responsaveisId = formData.monitoras
        .filter(m => m.id != null)
        .map(m => m.id as number);

      await api.criarEvento({
        titulo: formData.titulo,
        tipo: 'EVENTO',
        tipoEvento: tipoEventoMapped,
        regimeEvento: regimeEventoMapped,
        data: formData.data,
        horarioInicio: formData.horarioInicio,
        horarioFim: formData.horarioFim,
        local: formData.espacoCampus,
        descricao: formData.resumo || undefined,
        responsaveisId: responsaveisId.length > 0 ? responsaveisId : undefined,
        logisticsChecklist: formData.logisticsChecklist.map(c => ({
          descricao: c.descricao,
          isCompleted: c.isCompleted
        }))
      } as any);
      
      navigate('/eventos');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar evento. Verifique os dados e tente novamente.');
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
