import React, { useRef, useEffect } from "react";
import type { InputProps } from "./input.type";

const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    type = "text",
    label,
    onInputChange,
    icon,
    classes,
    value,
    error,
    handleOnBlur,
    handleFocus,
    isShowError,
    className,
    ...restProps
  } = props;
  const labelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (error) {
      inputRef.current?.select();
      return;
    }
  }, [error]);
  const handleAnimateLabel = (): void => {
    if (label) {
      labelRef.current?.classList.add("animate-label");
    }
  };
  const removeAnimateLabel = () => {
    if (label) {
      if (value !== "") {
        handleAnimateLabel();
      } else {
        labelRef.current?.classList.remove("animate-label");
      }
    }
  };

  return (
    <div className={`input-wrapper relative z-1 ${classes}`}>
      {label && (
        <span
          ref={labelRef}
          className={`input-label absolute left-20 font-semibold color-white select-none -z-1 transition bg-secondary ${
            error ? "color-red" : ""
          }
        ${value ? "animate-label text-xsm" : "text-sm"}
        `}
          style={{ top: 14 }}
        >
          {label}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onInputChange}
        className={`py-14 px-20 w-full bg-transparent border-1 border-fade font-medium rounded-lg z-1 color-white text-regular ${
          error
            ? "border-red select-danger"
            : value && "color-success border-success"
        } ${className || ''}`}
        style={icon ? { paddingRight: 30 } : {}}
        onFocus={(eve) => {
          handleAnimateLabel();
          if (handleFocus) {
            handleFocus(eve);
          }
        }}
        onBlur={(eve) => {
          removeAnimateLabel();
          if (handleOnBlur) {
            handleOnBlur(eve);
          }
        }}
        onClick={props.onClickInput ? props.onClickInput : undefined}
        ref={inputRef}
        {...restProps}
      />
      {isShowError && (
        <p className="color-red right-10 text-sm font-semibold transition">
          {error}
        </p>
      )}
      {icon ? (
        <span
          className={`absolute flex right-10 text-lg color-white ${
            error ? "color-red" : value && "color-success"
          }`}
          style={{ top: 13 }}
        >
          {icon}
        </span>
      ) : null}
    </div>
  );
};

export default React.memo(Input);
