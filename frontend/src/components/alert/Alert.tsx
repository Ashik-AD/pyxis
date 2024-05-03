import { FC, ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";
const alert = document.getElementById("alert");
const wrapper = document.createElement("div");

const Alert: FC<PropTypes> = (props) => {
  wrapper.setAttribute("class", "py-20 flex content-center");
  useEffect(() => {
    alert?.append(wrapper);
    const clearChild = setTimeout(() => {
      if (alert?.hasChildNodes()) {
        alert?.removeChild(wrapper);
      }
      props.handleAlert && props.handleAlert();
    }, 3000);
    return () => {
      if (alert?.hasChildNodes()) {
        alert?.removeChild(wrapper);
      }
      clearTimeout(clearChild);
    };
  }, []);
  return createPortal(props.children, wrapper);
};

interface PropTypes {
  handleAlert?: (arg?: any) => void;
  children: ReactElement;
}

export default Alert;
