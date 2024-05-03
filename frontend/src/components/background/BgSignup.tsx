import React from 'react';
const BgSignup: React.FC = (props) => {
  return (
    <svg
      className='absolute -right-10 signup-bg transition-1'
      width='100%'
      height='100vh'
      viewBox='0 0 325 635'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g id='curve'>
        <g id='back' filter='url(#filter0_f_246_861)'>
          <path
            d='M117.294 321.171C73.6926 143.691 266.04 38.2415 360 6.45963V637.516H-1C96.0822 580.184 171.797 543.021 117.294 321.171Z'
            fill='url(#paint0_linear_246_861)'
          />
        </g>
        <path
          id='front'
          d='M130.294 317.196C86.6926 139.716 263.711 31.7819 357.671 0V640H0C97.0822 582.668 184.797 539.046 130.294 317.196Z'
          fill='url(#paint1_linear_246_861)'
          fillOpacity='0.5'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_246_861'
          x='-21'
          y='-13.5404'
          width='401'
          height='671.056'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='10'
            result='effect1_foregroundBlur_246_861'
          />
        </filter>
        <linearGradient
          id='paint0_linear_246_861'
          x1='173.5'
          y1='3.97515'
          x2='173.5'
          y2='643.975'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#640F72' />
          <stop offset='1' stopColor='#ED18FF' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_246_861'
          x1='186.5'
          y1='0'
          x2='186.5'
          y2='640'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#980AAF' />
          <stop offset='1' stopColor='#ED18FF' />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default React.memo(BgSignup);
