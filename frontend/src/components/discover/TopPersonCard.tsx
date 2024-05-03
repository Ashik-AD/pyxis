import React from 'react';
import { imageUrl } from '../../utils/imageUrl';
import { noImage } from '../../utils/noImage';

const TopPersonCard: React.FC<PropTypes> = (props) => {
  const { name, profile_path, gender, known_for_department } = props;
  return (
    <>
      <img
        src={
          profile_path
            ? imageUrl(profile_path)
            : gender === 1
            ? noImage.female
            : noImage.male
        }
        alt={name}
        className='w-200 h-300 rounded-lg'
      />
      <div className='flex flex-col gap-20 meta py-20'>
        <div className='text-lg font-semibold'>
          <p>{name}</p>
          <span
            className='bg-primary item-center uppercase font-semibold text-xsm px-10 py-6 rounded-xlg'
            style={{ letterSpacing: 1.5 }}>
            {known_for_department.toLowerCase() === 'acting'
              ? 'Artist'
              : known_for_department}
          </span>
        </div>
      </div>
    </>
  );
};
interface PropTypes {
  profile_path: string;
  name: string;
  media_type: string;
  known_for_department: string;
  gender: 1 | 2;
}

export default TopPersonCard;
