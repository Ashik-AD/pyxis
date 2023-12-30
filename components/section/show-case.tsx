import { ReactNode } from "react";
import style from "./style.module.scss";

export type ShowCaseProps = {
  heading: ReactNode;
  children: ReactNode;
};

export default function ShowCase({
  heading,
  children,
}: ShowCaseProps) {
  return (
    <section className={style.wrapper}>
      {heading}
      {children}
    </section>
  );
}
