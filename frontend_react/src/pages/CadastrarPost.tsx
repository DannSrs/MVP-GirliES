import { CadastrarPostHeader } from '../components/instagram/cadastrar/CadastrarPostHeader';
import { PostBasicInfoSection } from '../components/instagram/cadastrar/PostBasicInfoSection';
import { PostDescriptionSection } from '../components/instagram/cadastrar/PostDescriptionSection';
import { PostScheduleSection } from '../components/instagram/cadastrar/PostScheduleSection';
import { PostAssignmentSection } from '../components/instagram/cadastrar/PostAssignmentSection';
import { PostChecklistSection } from '../components/instagram/cadastrar/PostChecklistSection';
import { PostTeamSidebar } from '../components/instagram/cadastrar/PostTeamSidebar';
import { PostFooterActions } from '../components/instagram/cadastrar/PostFooterActions';
import { PostFormProvider } from '../contexts/PostFormContext';

export function CadastrarPost() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <PostFormProvider>
        <CadastrarPostHeader />

        <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
          <div className="flex-1 flex flex-col gap-6 w-full xl:w-auto">
            <PostBasicInfoSection />
            <PostDescriptionSection />
            <PostScheduleSection />
            <PostAssignmentSection />
            <PostChecklistSection />
          </div>

          <PostTeamSidebar />
        </div>
        
        <PostFooterActions />
      </PostFormProvider>
    </div>
  );
}
