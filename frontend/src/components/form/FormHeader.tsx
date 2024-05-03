import React from "react";
const FormHeader: React.FC<{ title: string; classNames?: string }> = ({
  title,
  classNames,
}) => (
  <div
    className={`form-head font-bold text-heading color-white cursor-default z-2 ${
      classNames ? classNames : ""
    }`}
    style={{ marginBottom: 50 }}
  >
    {title}
  </div>
);
export default React.memo(FormHeader);
