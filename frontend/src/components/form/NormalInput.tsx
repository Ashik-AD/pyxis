import React, { CSSProperties, HTMLInputTypeAttribute } from 'react';

const NormalInput = React.forwardRef((props: PropsType, ref: any) => {
  const {
    type,
    name,
    value,
    handleOnChange,
    handleOnClick,
    styles,
    styling,
    placeholder,
    error,
    handleFocusOut,
  } = props;
  return (
    <input
      type={type}
      name={name}
      value={value}
      style={{ ...styling, maxWidth: 400 }}
      onChange={handleOnChange}
      onClick={handleOnClick}
      className={`bg-transparent py-10 px-16 border-2 border-fade rounded-xlg color-white font-semibold text-regular  ${
        styles && styles
      } ${error && ' border-red color-red '}`}
      onBlur={handleFocusOut}
      ref={ref}
      readOnly={!handleOnChange && true}
      placeholder={placeholder}
    />
  );
});

interface PropsType {
  type: HTMLInputTypeAttribute;
  name: string;
  value?: string | number;
  handleOnChange?: (event?: any) => void;
  handleOnClick?: (event?: React.FormEvent<HTMLInputElement>) => void;
  handleFocusOut?: (event?: React.FormEvent<HTMLInputElement>) => void;
  styles?: string;
  ref: any;
  styling?: CSSProperties;
  placeholder?: string;
  error?: boolean | undefined;
}

export default NormalInput;
