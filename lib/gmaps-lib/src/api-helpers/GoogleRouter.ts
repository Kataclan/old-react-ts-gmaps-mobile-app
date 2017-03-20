import {IRouterRequest} from '../interfaces/IRouterRequest';

export class GoogleRouter {
    
    private map : google.maps.Map;
    private polylines: Array<google.maps.Polyline>

    constructor(map: google.maps.Map) {
        this.map = map;
    }
    public GetRoutes(request : IRouterRequest){
        let googleDirectionsRequest : google.maps.DirectionsRequest = {
            travelMode: request.hasOwnProperty("travelMode") ? request.travelMode : google.maps.TravelMode.WALKING,
            unitSystem: request.hasOwnProperty("unitSystem") ? request.unitSystem : google.maps.UnitSystem.METRIC,
            avoidFerries: request.hasOwnProperty("avoidFerries") ? request.avoidFerries : false,
            avoidHighways: request.hasOwnProperty("avoidHighways") ? request.avoidHighways : false,
            avoidTolls: request.hasOwnProperty("avoidTolls") ? request.avoidTolls : false,
            waypoints: request.hasOwnProperty("waypoints") ? request.waypoints : [],
        };

        googleDirectionsRequest.origin = request.origin;
        googleDirectionsRequest.destination = request.destination;

        var self = this,
            routes = [],
            service = new google.maps.DirectionsService();

        service.route(googleDirectionsRequest, function(result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                if (request.callback) {
                    request.callback(result, status);
                }
            }
            else {
                if (request.error) {
                    request.error(status.toString());
                }
            }
        });
    }

    public DrawRoute(route: google.maps.DirectionsRoute){
        var polyline = new google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
        });
        var bounds = new google.maps.LatLngBounds();
        var legs = route.legs;
        for (let i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                for (let k = 0; k < nextSegment.length; k++) {
                    polyline.getPath().push(nextSegment[k]);
                    bounds.extend(nextSegment[k]);
                }
            }
        }
        polyline.setMap(this.map);
        this.map.fitBounds(bounds);
        return polyline;
    }

    public DrawPolyline(){
        
    }

}