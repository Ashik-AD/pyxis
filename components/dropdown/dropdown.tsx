'use client';
import { ReactNode, useRef } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const className = show
    ? style.dropdown__list_show
    : style.dropdown__list_hide;

  const handleToggle = (ev: any) => {
    const content = contentRef.current!;
    const { clientWidth, clientHeight } = content;
    const { x, y, height, width } =
      triggerRef.current?.getBoundingClientRect()!!;

    const calcY =
      y + clientHeight + 50 > window.innerHeight
        ? y - clientHeight
        : y + height;

    content!.style!.top = `${calcY}px`;
    content!.style!.left = `${x + width - clientWidth}px`;
    onToggle(ev);
  };
  return (
    <div className={style.dropdown}>
      <div
        className={style.dropdown__trigger}
        onClick={handleToggle}
        ref={triggerRef}>
        {trigger}
      </div>

      <div className={`${style.dropdown__list} ${className}`} ref={contentRef}>
        {list.map(renderItem)}
      </div>
      {show && (
        <div className={style.dropdown__overlay} onClick={onToggle}></div>
      )}
    </div>
  );
}
