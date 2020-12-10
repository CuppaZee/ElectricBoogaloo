import day from './day';

export { default as request } from './request';
export { default as retrieve } from './retrieve';
export const mhq = (a: any) => day(a).tz('America/Chicago');
export const mhqStr = (a: any) => (a || day().tz('America/Chicago')).format('YYYY-MM-DD');
export const gameID = function (year: any, month: any) {
  let now = day().tz('America/Chicago');
  let y = year !== undefined ? year : now.year();
  let m = month !== undefined ? month : now.month();
  return (y * 12) + m - 24158;
}