import Nav from '@/components/nav/nav';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Nav />
      <div className='main__content'>{children}</div>
    </main>
  );
}
