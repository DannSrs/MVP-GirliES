import React from 'react';
import { BasicInfoSection } from '../components/aulas/cadastrar/BasicInfoSection';
import { CadastrarAulaHeader } from '../components/aulas/cadastrar/CadastrarAulaHeader';
import { ChecklistSection } from '../components/aulas/cadastrar/ChecklistSection';
import { FooterActions } from '../components/aulas/cadastrar/FooterActions';
import { LogisticsSection } from '../components/aulas/cadastrar/LogisticsSection';
import { MaterialsSection } from '../components/aulas/cadastrar/MaterialsSection';
import { TeamSidebar } from '../components/aulas/cadastrar/TeamSidebar';

export function CadastrarAula() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <CadastrarAulaHeader />

      <form className="flex flex-col xl:flex-row gap-6 items-start w-full">
        {/* LEFT COLUMN: Formulário Principal */}
        <div className="flex-1 flex flex-col gap-6 w-full xl:w-auto">
          <BasicInfoSection />
          <LogisticsSection />
          <MaterialsSection />
          <ChecklistSection />
        </div>

        {/* RIGHT COLUMN: Equipe da Aula */}
        <TeamSidebar />
      </form>

      <FooterActions />
    </div>
  );
}
