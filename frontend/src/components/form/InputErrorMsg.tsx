import { FC } from "react";

const InputErrorMsg: FC<{ error: string; styles?: string }> = ({
  error,
  styles,
}) => {
  return (
    <div className={`color-red font-semibold ${styles && styles}`}>{error}</div>
  );
};

export default InputErrorMsg;
