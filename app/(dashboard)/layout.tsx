import { ReactNode } from 'react';
import Nav from '@/components/nav/nav';
import style from './style.module.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className={style.dashboard}>
      <Nav />
      <div className={style.main__content}>{children}</div>
      <aside>
        <h1>Sidebar content</h1>
      </aside>
    </main>
  );
}
