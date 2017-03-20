import {IGeoLocateRequest} from '../interfaces/IGeoLocateRequest';

class GeoLocator {
    constructor() {
    }
    public GeoLocate(request : IGeoLocateRequest){
        var complete_callback = request.always || request.complete;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    request.success(position);

                    if (complete_callback) {
                        complete_callback();
                    }
                    }, function(error) {
                    request.error(error);

                    if (complete_callback) {
                        complete_callback();
                    }
                }, 
                request.options);
        }
        else {
            request.not_supported();
            if (complete_callback) {
                complete_callback();
            }
        }
    }
}

export var GoogleGeoLocator = new GeoLocator();