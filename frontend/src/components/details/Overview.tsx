import React from 'react';
import MyDiv from './MyDiv';

const Overview: React.FC<PropTypes> = ({ color, overview }) => {
  return (
    <MyDiv title='Overview' color={color}>
      <span className='w-90 text-regular font-medium py-10'>{overview}</span>
    </MyDiv>
  );
};
interface PropTypes {
  overview: string;
  color: string;
}
export default Overview;
