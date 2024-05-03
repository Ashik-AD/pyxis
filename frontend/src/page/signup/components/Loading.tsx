import React from 'react';
import './Animate.css';

const Loading: React.FC<{ success: boolean }> = (props) => {
  return (
    <div className='flex flex-col content-center space-y-20'>
      <div className='loader'>
        {props.success ? (
          <svg
            width='94'
            height='90'
            viewBox='0 0 94 90'
            fill='none'
            className='loading transition-1'
            style={{ animation: 'success 1s' }}
            xmlns='http://www.w3.org/2000/svg'>
            <g id='success'>
              <path
                id='outer'
                opacity='0.8'
                d='M45 85C67.0914 85 85 67.0914 85 45C85 22.9086 67.0914 5 45 5C22.9086 5 5 22.9086 5 45C5 67.0914 22.9086 85 45 85Z'
                stroke='#5EC9F6'
                strokeWidth='9'
              />
              <path
                id='check-mark'
                d='M27 34.5L50.25 59L89 10'
                stroke='#E1FBFF'
                strokeWidth='9'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
          </svg>
        ) : (
          <svg
            width='114'
            height='114'
            viewBox='0 0 114 114'
            fill='none'
            style={{ animation: 'loading 1s infinite' }}
            xmlns='http://www.w3.org/2000/svg'>
            <g id='loading-icon'>
              <path
                id='outer'
                opacity='0.5'
                d='M57 9.5C47.6054 9.5 38.4218 12.2858 30.6104 17.5052C22.7991 22.7246 16.7109 30.143 13.1157 38.8225C9.52058 47.502 8.57992 57.0527 10.4127 66.2668C12.2455 75.4809 16.7695 83.9446 23.4124 90.5876C30.0554 97.2306 38.5191 101.755 47.7332 103.587C56.9473 105.42 66.498 104.479 75.1775 100.884C83.857 97.2891 91.2755 91.2009 96.4948 83.3896C101.714 75.5783 104.5 66.3946 104.5 57C104.5 50.7622 103.271 44.5855 100.884 38.8225C98.4972 33.0596 94.9984 27.8232 90.5876 23.4124C86.1768 19.0016 80.9405 15.5028 75.1775 13.1157C69.4145 10.7286 63.2378 9.5 57 9.5ZM57 95C49.4843 95 42.1374 92.7713 35.8884 88.5958C29.6393 84.4203 24.7687 78.4856 21.8926 71.542C19.0165 64.5984 18.2639 56.9578 19.7302 49.5866C21.1964 42.2153 24.8156 35.4443 30.13 30.1299C35.4444 24.8155 42.2153 21.1964 49.5866 19.7302C56.9579 18.2639 64.5984 19.0164 71.542 21.8926C78.4856 24.7687 84.4204 29.6393 88.5959 35.8883C92.7714 42.1374 95 49.4843 95 57C95 67.0782 90.9965 76.7437 83.8701 83.8701C76.7437 90.9964 67.0782 95 57 95Z'
                fill='#5EC9F7'
              />
              <path
                id='inner'
                d='M94.7036 52.2622C95.0307 54.8651 97.1266 57 99.75 57V57C102.373 57 104.525 54.8681 104.263 52.2579C103.8 47.6469 102.664 43.1197 100.884 38.8225C98.4972 33.0596 94.9984 27.8232 90.5876 23.4124C86.1768 19.0016 80.9404 15.5028 75.1775 13.1157C70.8803 11.3358 66.3531 10.2 61.7421 9.7373C59.1319 9.4754 57 11.6266 57 14.25V14.25C57 16.8734 59.1349 18.9693 61.7378 19.2964C70.0691 20.3431 77.8697 24.1295 83.8701 30.1299C89.8705 36.1303 93.6569 43.9309 94.7036 52.2622Z'
                fill='#43E0F5'
              />
            </g>
          </svg>
        )}
      </div>

      {props.success ? (
        <div className='flex flex-col content-center space-y-10 fade-up'>
          <p className='text-heading font-semibold color-info'>Success!</p>
          <p className='w-75 text-center color-white font-semibold '>
            Your account successfully created. Now you can enjoy all the
            features we're providing'.
          </p>
        </div>
      ) : (
        <div className='flex flex-col text-center color-white space-y-10'>
          <h1 className='font-medium text-medium'>Setting up your account.</h1>
          <h2 className='font-semibold text-lg'>Please Wait...</h2>
        </div>
      )}
    </div>
  );
};
export default Loading;
