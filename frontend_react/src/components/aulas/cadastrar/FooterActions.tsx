import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterActions() {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-end gap-4 mt-6 mb-2 w-full">
      <button type="button" className="text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2 transition-colors">Cancelar</button>
      <Link to="/aulas" className="bg-girlies-purple hover:bg-[#3d004d] text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center gap-2.5 hover:-translate-y-0.5">
        <CalendarCheck className="w-5 h-5" />
        Confirmar e Agendar Aula
      </Link>
    </div>
  );
}
