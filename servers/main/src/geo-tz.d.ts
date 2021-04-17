declare function geoTz(latitude: number, longitude: number): string;

declare namespace geoTz {
  interface MapLike {
    set(key: string, value: any): void;
    get(key: string, value: any): void;
  }
  function setCache(options: { preload?: boolean; store?: MapLike }): void;
  function e(latitude: number, longitude: number): string;
}

declare module 'geo-tz' {
  export default geoTz;
}
