import React from 'react';
import CardSlider from '../slider/CardSlider';
import MyDiv from './MyDiv';

const Similar: React.FC<PropTypes> = (props) => {
  return (
    <MyDiv title='Recommend for you' color={props.color}>
      <CardSlider url={props.url} renderType={props.renderType} />
    </MyDiv>
  );
};
interface PropTypes {
  renderType: 'movie' | 'tv';
  url: string;
  color?: string;
}
export default Similar;
