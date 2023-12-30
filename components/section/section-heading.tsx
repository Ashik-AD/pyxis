import style from "./style.module.scss";
import Link from "next/link";

export type SectionHeadingProps = {
  title: string;
  trailingLabel?: string;
  trailingLink?: string;
};

export default function SectionHeading({
  title,
  trailingLink,
  trailingLabel,
}: SectionHeadingProps) {
  return (
    <div className={style.section__heading}>
      <h2>{title}</h2>
    {trailingLabel && <Link href={trailingLink || "#"} className={style.section__link}>{trailingLabel}</Link>}
    </div>
  );
}
