import { AulasHeader } from '../components/aulas/AulasHeader';
import { AulasStats } from '../components/aulas/AulasStats';
import { AulasTableContainer } from '../components/aulas/AulasTableContainer';

export function Aulas() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <AulasHeader />
      <AulasStats />
      <AulasTableContainer />
    </div>
  );
}
