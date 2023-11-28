import { ReactNode } from 'react';
import style from './style.module.scss';

export default function CI({
  children,
  ...rest
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`${style.carousel__item} ${
        rest.className ? rest.className : ''
      }`}>
      {children}
    </article>
  );
}
