import React from "react";
type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};
const FormHeader = ({ title, subtitle, className }: Props) => (
  <div
    className={`form-head flex flex-col gap-10 text-center mb-50 color-white cursor-default z-2 ${
      className ? className : ""
    }`}
  >
    <h1 className="text-heading font-semibold">{title}</h1>
    {subtitle && <span className="text-medium font-medium color-fade">{subtitle}</span>}
  </div>
);
export default React.memo(FormHeader);
