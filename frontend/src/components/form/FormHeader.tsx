import React from "react";
type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};
const FormHeader = ({ title, subtitle, className }: Props) => (
  <div
    className={`form-head mb-50 color-white cursor-default z-2 ${
      className ? className : ""
    }`}
  >
    <h1 className="text-xlg font-semibold">{title}</h1>
    {subtitle && <span className="text-regular font-medium">{subtitle}</span>}
  </div>
);
export default React.memo(FormHeader);
