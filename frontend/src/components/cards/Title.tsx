import React from 'react';
import { Link } from 'react-router-dom';
const Title: React.FC<TitlePropTypes> = ({ title, link }) => {
  return (
    <div className='flex space-between items-center color-white py-10 sm:py-20'>
      <span className='text-regular sm:text-lg font-semibold'>{title}</span>
      {link && (
        <Link to={link} className='text-sm font-semibold color-info'>
          See more
        </Link>
      )}
    </div>
  );
};
interface TitlePropTypes {
  title: string;
  link?: string;
}
export default Title;
