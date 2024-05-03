import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
const modal = document.getElementById('modal');

const Modal: React.FC<PropsTypes> = (props) => {
  const element = document.createElement('div');
  element.style.zIndex = '99999';
  useEffect(() => {
    const handleClick = (event: any) => {
      if (!props.childClick) {
        if (event.target.classList.contains('modal-content-wrapper')) {
          modal?.hasChildNodes() && modal?.removeChild(element);
          props.handleClick && props.handleClick();
          return;
        }
        return;
      }
      if (modal?.hasChildNodes()) {
        props.handleClick && props.handleClick();
        modal?.removeChild(element);
      }
    };
    const className = `modal-content-wrapper flex content-center w-screen h-screen  fixed top-0 left-0 ${
      props.styles ? props.styles : 'bg-fade'
    }`;
    element.setAttribute('class', className);
    modal?.appendChild(element);
    element.addEventListener('click', handleClick);
    return () => {
      if (modal?.hasChildNodes()) {
        modal?.removeChild(element);
      }
    };
  }, [element, props]);
  return ReactDOM.createPortal(props.children, element);
};

interface PropsTypes {
  children: ReactElement;
  handleClick?: () => void;
  styles?: string;
  childClick?: true | false;
}
export default React.memo(Modal);
