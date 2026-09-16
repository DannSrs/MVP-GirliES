import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="bg-slate-100 text-slate-800 flex h-screen p-4 gap-6 overflow-hidden antialiased">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-y-auto gap-6 pr-2">
        <Outlet />
      </main>
    </div>
  );
}
