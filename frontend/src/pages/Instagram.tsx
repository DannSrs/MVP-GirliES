import { InstagramProvider } from '../contexts/InstagramContext';
import { InstagramHeader } from '../components/instagram/InstagramHeader';
import { KanbanBoard } from '../components/instagram/KanbanBoard';

export function Instagram() {
  return (
    <InstagramProvider>
      <div className="h-full flex flex-col pt-2">
        <InstagramHeader />
        <KanbanBoard />
      </div>
    </InstagramProvider>
  );
}
