import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('../');
  return (
    <div className='flex absolute top-0 left-0 flex-col bg-primary w-full h-screen content-center select-none'>
      <h1
        className='text-center'
        style={{
          fontSize: '35vw',
          color: '#ff0dff',
          textShadow: '0px 1px 13px',
        }}>
        404
      </h1>
      <button className='border-0 text-lg color-info' onClick={handleRedirect}>
        Go Back
      </button>
    </div>
  );
};
export default React.memo(NotFound);
