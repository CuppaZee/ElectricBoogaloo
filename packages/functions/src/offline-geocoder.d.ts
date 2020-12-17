declare function offlineGeocoder(options: {
  database: string;
}): OfflineGeocoder;

type GeocoderLocation = {
  id: number;
  name: string;
  formatted: string;
  country: {
    id: string;
    name: string;
  };
  admin1: {
    id: string;
    name: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

declare type OfflineGeocoder = {
  reverse: (latitude: number, longitude: number, callback?: (error?: Error, result?: GeocoderLocation) => void) => Promise<GeocoderLocation>;
}

declare module 'offline-geocoder' {
  export default offlineGeocoder;
}
