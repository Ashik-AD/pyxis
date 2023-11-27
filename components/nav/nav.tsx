'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import { usePathname } from 'next/navigation';
import { navList } from './nav-list';

export default function Nav() {
  const renderNav = navList.map((nav) => (
    <NavGroup
      key={nav.groupName}
      groupName={nav.groupName}
      navList={nav.navList}
    />
  ));
  return (
    <aside className={style.nav__wrapper}>
      <span className={style.logo}>PYXIS</span>
      <nav className={style.nav}>{renderNav}</nav>
    </aside>
  );
}

export type NavItemProps = {
  label: string;
  icon: ReactNode;
  path: string;
  onClick?: () => void;
};
export type NavGroupProps = {
  groupName: string;
  navList: NavItemProps[];
};

function NavItem({ label, icon, path, onClick }: NavItemProps) {
  const pathName = usePathname();
  let activeClassName =
    path?.toLowerCase() == pathName?.toLowerCase()
      ? style.nav__list__active
      : '';
  return (
    <li className={activeClassName}>
      <Link
        href={path}
        className={style.nav__list}
        onClick={() => {
          onClick && onClick();
        }}>
        <span className={style.nav__icon}>{icon}</span>
        {label}
      </Link>
    </li>
  );
}
function NavGroup({ groupName, navList }: NavGroupProps) {
  const renderNavItems = navList.map((item) => (
    <NavItem
      key={item.label}
      label={item.label}
      icon={item.icon}
      path={item.path}
      onClick={item.onClick}
    />
  ));
  return (
    <ul className={style.nav_group}>
      <li className={style.group__name}>{groupName}</li>
      {renderNavItems}
    </ul>
  );
}
