const deviceType: 'mobile' | 'tablet' | 'desktop' = window.matchMedia(
  '(max-width: 640px)'
).matches
  ? 'mobile'
  : window.matchMedia('(max-width: 768px)').matches
  ? 'tablet'
  : 'desktop';
console.log(deviceType);

export const imageUrl = (url: string) =>
  url
    ? `https://image.tmdb.org/t/p/${
        deviceType === 'desktop'
          ? 'w154'
          : deviceType === 'tablet'
          ? 'w185'
          : 'w154'
      }/${url}`
    : url;

type IMAGEURL = string;
type IMAGESIZE =
  | '45'
  | '92'
  | '154'
  | '185'
  | '300'
  | '342'
  | '500'
  | '632'
  | '780'
  | '1280'
  | 'original';

export const imageUrlWithSize = (url: IMAGEURL, size: IMAGESIZE) =>
  `https://image.tmdb.org/t/p/${size === 'original' ? '' : 'w'}${size}${url}`;
