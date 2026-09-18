import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Modal } from '../Modal';
import { api } from '../../services/api';
import type { EventoGeral } from '../../services/api';

interface CadastrarEventoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (evento: EventoGeral) => void;
}

const TIPOS_EVENTO = [
  'Acolhida',
  'Roda de Conversa',
  'Oficina Prática',
  'Mostra Científica',
  'Outros',
] as const;

const REGIMES = ['Presencial', 'Online'] as const;

interface FormState {
  titulo: string;
  tipoEvento: string;
  regimeEvento: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  capacidade: string;
}

const INITIAL_FORM: FormState = {
  titulo: '',
  tipoEvento: 'Acolhida',
  regimeEvento: 'Presencial',
  data: '',
  horarioInicio: '',
  horarioFim: '',
  local: '',
  capacidade: '',
};

export function CadastrarEventoModal({ isOpen, onClose, onSuccess }: CadastrarEventoModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.titulo.trim() || !form.data || !form.horarioInicio || !form.horarioFim) {
      setError('Preencha os campos obrigatórios: Título, Data, Horário de Início e Horário de Fim.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        titulo: form.titulo.trim(),
        tipoEvento: form.tipoEvento as EventoGeral['tipoEvento'],
        regimeEvento: form.regimeEvento as EventoGeral['regimeEvento'],
        data: form.data,
        horarioInicio: form.horarioInicio,
        horarioFim: form.horarioFim,
        local: form.local.trim() || undefined,
        capacidade: form.capacidade ? Number(form.capacidade) : undefined,
      };
      const novo = await api.criarEvento(payload as any);
      onSuccess(novo);
      setForm(INITIAL_FORM);
      onClose();
    } catch (err: any) {
      setError(err.message ?? 'Erro ao cadastrar evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Cadastrar Encontro Interno"
      icon={<CalendarDays className="w-5 h-5" />}
      iconBgClass="bg-girlies-purple/10 text-girlies-purple"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Título */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Título do Evento <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ex: Acolhida & Café das Calouras 2026.2"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Tipo + Regime */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tipo do Evento</label>
            <select
              name="tipoEvento"
              value={form.tipoEvento}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all"
            >
              {TIPOS_EVENTO.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Regime</label>
            <select
              name="regimeEvento"
              value={form.regimeEvento}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all"
            >
              {REGIMES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Data */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Data <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all"
          />
        </div>

        {/* Horários */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Horário de Início <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              name="horarioInicio"
              value={form.horarioInicio}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Horário de Fim <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              name="horarioFim"
              value={form.horarioFim}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all"
            />
          </div>
        </div>

        {/* Local + Capacidade */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Local</label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              placeholder="Ex: Auditório Central B"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Capacidade</label>
            <input
              type="number"
              name="capacidade"
              value={form.capacidade}
              onChange={handleChange}
              placeholder="Ex: 60"
              min={1}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/25 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-girlies-purple hover:bg-[#3d004d] text-white text-sm font-semibold transition-colors shadow-md shadow-girlies-purple/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Evento'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
