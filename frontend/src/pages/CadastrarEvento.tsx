import { EventoFormProvider } from '../contexts/EventoFormContext';
import { CadastrarEventoHeader } from '../components/eventos/cadastrar/CadastrarEventoHeader';
import { DetalhesGeraisSection } from '../components/eventos/cadastrar/DetalhesGeraisSection';
import { DataLocalizacaoSection } from '../components/eventos/cadastrar/DataLocalizacaoSection';
import { LogisticaChecklistSection } from '../components/eventos/cadastrar/LogisticaChecklistSection';
import { EquipeMonitoriaSection } from '../components/eventos/cadastrar/EquipeMonitoriaSection';
import { EventoFooterActions } from '../components/eventos/cadastrar/EventoFooterActions';

export function CadastrarEvento() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <EventoFormProvider>
        <CadastrarEventoHeader />

        <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
          {/* Coluna Principal */}
          <div className="flex-1 flex flex-col gap-6 w-full xl:w-auto">
            <DetalhesGeraisSection />
            <DataLocalizacaoSection />
          </div>

          {/* Sidebar Direita */}
          <div className="w-full xl:w-80 flex flex-col gap-6 flex-shrink-0">
            <LogisticaChecklistSection />
            <EquipeMonitoriaSection />
          </div>
        </div>

        <EventoFooterActions />
      </EventoFormProvider>
    </div>
  );
}
