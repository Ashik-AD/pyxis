import React from 'react';

const Icon: React.FC<IconPropTypes> = (props) => {
  const { icon, classes, handleClick } = props;

  return (
    <span className={classes} onClick={handleClick}>
      {icon}
    </span>
  );
};
interface IconPropTypes {
  icon: any;
  classes?: string;
  handleClick?: () => void;
}
export default Icon;
