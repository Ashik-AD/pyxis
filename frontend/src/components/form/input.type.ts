import { FormEvent, InputHTMLAttributes, ReactComponentElement } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange?: (eve: FormEvent<HTMLInputElement>) => void;
  onClickInput?: (eve: FormEvent<HTMLInputElement>) => void;
  handleOnBlur?: (eve: FormEvent<HTMLInputElement>) => void;
  handleFocus?: (eve: FormEvent<HTMLInputElement>) => void;
  label?: string;
  icon?: ReactComponentElement<any>;
  classes?: string;
  error?: string | null;
  isShowError?: boolean;
}

export interface DateProps {
  day: number;
  month: string;
  year: number;
  onDatePicked: (name: string, value: number | string) => void;
  onBlur: (eve: FormEvent<HTMLInputElement>) => void;
  error?: {
    day: string | null;
    month: string | null;
    year: string | null;
  };
}
