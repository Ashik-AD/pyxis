import React from 'react';

const Title: React.FC<PropTypes> = ({ title, tagline }) => {
  return (
    <div className='flex flex-col color-white'>
      <span
        className={`title text-heading ${
          title.length > 30 ? 'sm:text-heading' : 'sm:text-heading-lg'
        } font-bold color-white`}>
        {title}
      </span>
      {tagline && (
        <span
          className='text-medium font-semibold'
          style={{ fontStyle: 'italic' }}>
          "{tagline}"
        </span>
      )}
    </div>
  );
};

interface PropTypes {
  title: string;
  tagline?: string;
}

export default Title;
