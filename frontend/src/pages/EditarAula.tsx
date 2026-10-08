import { useParams } from 'react-router-dom';
import { CadastrarAulaHeader } from '../components/aulas/cadastrar/CadastrarAulaHeader';
import { BasicInfoSection } from '../components/aulas/cadastrar/BasicInfoSection';
import { LogisticsSection } from '../components/aulas/cadastrar/LogisticsSection';
import { MaterialsSection } from '../components/aulas/cadastrar/MaterialsSection';
import { ChecklistSection } from '../components/aulas/cadastrar/ChecklistSection';
import { TeamSidebar } from '../components/aulas/cadastrar/TeamSidebar';
import { FooterActions } from '../components/aulas/cadastrar/FooterActions';
import { AulaFormProvider } from '../contexts/AulaFormContext';

export function EditarAula() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
        <AulaFormProvider aulaId={id}>
          <CadastrarAulaHeader />

          <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
            <div className="flex-1 flex flex-col gap-6 w-full xl:w-auto">
              <BasicInfoSection />
              <LogisticsSection />
              <MaterialsSection />
              <ChecklistSection />
            </div>

            <TeamSidebar />
          </div>
          
          <FooterActions />
        </AulaFormProvider>
    </div>
  );
}
