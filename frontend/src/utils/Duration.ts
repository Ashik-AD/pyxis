export const duration = (timeStamp: string | Date) => {
  const dateNow:any = new Date();
  const time:any = new Date(timeStamp);
  const sec:number = Math.floor((dateNow - time) / 1000);
  const min = toMinute(sec);
  const hr = toHour(min);
  const day = toDay(hr);
  const month = toMonth(day);
  const year = toYear(month);
  if (year > 0) {
    return toStrings(year, 'year');
  }
  if (month > 0) return toStrings(month, 'month');

  if (day > 0) return toStrings(day, 'day');
  if (hr > 0) return toStrings(hr, 'hr');
  if (min > 0) return toStrings(min, 'min');
  if (sec > 0) return toStrings(sec, 'sec');
};
const toStrings = (date: number, type: string) =>
  `${date} ${type}${date !== 1 ? 's' : ''} ago`;

const toMinute = (sec: number) => Math.floor(sec / 60);
const toHour = (min: number) => Math.floor(min / 60);
const toDay = (hr: number) => Math.floor(hr / 24);
const toMonth = (day: number) => Math.floor(day / 30);
const toYear = (mth: number) => Math.floor(mth / 12);

export const countDown = (dt: Date) => {
  const dates: any[] = [dt, new Date()];
  const milSec = Math.abs((dates[0] - dates[1]));
  let sec = Math.floor(milSec / 1000);
  let min = toMinute(sec);
  let hr = toHour(min);
  let day = toDay(hr);
  let month = toMonth(day);
  let year = toYear(month);
  if(sec >= 60){
    min = sec / 60;
    sec = sec % 60;
  }
  if(min >= 60){
    hr = min / 60;
    min = min %60;
  }
  if(hr >= 24){
    day = hr / 24;
    hr = hr % 24;
  }
  if(day >= 30){
    month = day / 30;
    day = day % 30;
  }
  if(month >= 12){
    year = month / 12;
    month = month % 12;
  }

  return {
    year: Math.floor(year),
    month: Math.floor(month),
    day: Math.floor(day),
    hours: Math.floor(hr),
    minutes: Math.floor(min),
    seconds: Math.floor(sec)
  }
} 

export const convertRuntime = (length: number): string => {
  if (length < 60) {
    return `${length} m`;
  }
  if (length === 60) {
    return `1h`;
  }
  const hr = Math.floor(length / 60);
  const min = length % 60;
  return `${hr}h ${min}m`;
};

export const calcAge = (dob: Date) : number => {
  return (new Date().getFullYear() - new Date(dob).getFullYear());
}