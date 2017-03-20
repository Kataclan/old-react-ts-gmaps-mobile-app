import {IGeoCodeResponse} from './IGeoCodeResponse';

export interface IGeoCodeRequest{
    address?: string;
    lat?: number;
    lng?: number;
    latLng?: google.maps.LatLng;
    googleRequest?: google.maps.GeocoderRequest;
    callback: (response : IGeoCodeResponse) => {};
}