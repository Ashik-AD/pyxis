import React from 'react';
import { Link } from 'react-router-dom';

const DrpWrapper: React.FC<DrpWrapperPropTypes> = (props) => {
  const { link, title, children } = props;
  return (
    <ul
      className='bg-secondary w-300 rounded-lg shadow-medium px-16 py-6'
      style={{ marginTop: 13, maxHeight: 600 }}>
      {title && (
        <p
          className='text-medium font-semibold py-6 border-fade cursor-default'
          style={{ borderBottom: '1px solid' }}>
          {title}
        </p>
      )}
      {children}
      {link && (
        <Link
          to={link}
          className='flex text-regular font-semibold text-center py-6 color-gray'>
          See all
        </Link>
      )}
    </ul>
  );
};

interface DrpWrapperPropTypes {
  children: any;
  link?: string;
  title?: string;
}

export default DrpWrapper;
