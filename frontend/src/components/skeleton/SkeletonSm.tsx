import React from 'react';
import CardSm from './CardSm';

const SkeletonSm: React.FC<{ noOfCard: number; styles?: string }> = ({
  noOfCard,
  styles,
}) => {
  return (
    <div className={`${styles && styles}`}>
      {Array(noOfCard)
        .fill(0)
        .map((_, index: number) => (
          <CardSm key={index} />
        ))}
    </div>
  );
};

export default SkeletonSm;
