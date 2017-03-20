export interface IRouterRequest {
    origin: google.maps.LatLng;
    destination: google.maps.LatLng;

    travelMode?: google.maps.TravelMode;
    unitSystem?: google.maps.UnitSystem;
    avoidHighways?: boolean;
    avoidFerries?: boolean;
    avoidTolls?: boolean;
    waypoints?: Array<google.maps.DirectionsWaypoint>

    callback: (result : google.maps.DirectionsResult, status : google.maps.DirectionsStatus) => {};
    error?: (status:string) => void;
}