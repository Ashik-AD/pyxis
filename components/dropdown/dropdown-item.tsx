'use client';
import { HTMLAttributes, ReactNode } from 'react';
import style from './dropdown.module.scss';

export interface DropdownItemProps extends HTMLAttributes<HTMLElement> {
  label: string;
  icon?: ReactNode;
}

export default function DItem({ label, icon, ...rest }: DropdownItemProps) {
  const itemLabel = <span className={style.item__label}>{label}</span>;
  const itemIcon = <span className={style.item__icon}>{icon}</span>;
  let renderLabelAndIcon;

  if (label && icon) {
    renderLabelAndIcon = (
      <>
        {itemIcon} {itemLabel}
      </>
    );
  }

  if (label && !icon) {
    renderLabelAndIcon = itemLabel;
  }

  if (icon && !label) {
    renderLabelAndIcon = itemIcon;
  }

  return (
    <li className={style.dropdown__item} {...rest}>
      {renderLabelAndIcon}
    </li>
  );
}
