'use client';
import { ReactNode } from 'react';
import style from './dropdown.module.scss';
import useToggle from '@/hooks/useToggle';

export default function Dropdown<D>({
  trigger,
  list,
  renderItem,
}: {
  trigger: ReactNode;
  list: D[];
  renderItem: (item: D) => ReactNode;
}) {
  const { show, onToggle } = useToggle();
  const className = show
    ? style.dropdown__list_show
    : style.dropdown__list_hide;
  return (
    <div className={style.dropdown}>
      <div className={style.dropdown__trigger} onClick={onToggle}>
        {trigger}
      </div>
      {show && (
        <div className={`${style.dropdown__list} ${className}`}>
          {list.map(renderItem)}
        </div>
      )}
    </div>
  );
}
