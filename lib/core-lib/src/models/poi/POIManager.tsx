//#region [ Import React ]
import * as React from 'react';
//#endRegion

import {POICategory} from './POICategory';
import {POI} from './POI';


class POICategoryNamesClass {
    getNameByType(type: string) {
        switch (type) {
            case "museum": return 'Museums';
            case "bar": return 'Bars';
            case "night_club": return 'Night clubs';
            case "restaurant": return 'Restaurants';
            case "movie_theater": return 'Theaters';
            case "shopping_mall": return 'Shopping';
        }
    }
    getIconByTag(type: string) {
        switch (type) {
            case "museum": return 'Museums';
            case "bar": return 'Bars';
            case "night_club": return 'Night clubs';
            case "restaurant": return 'Restaurants';
            case "movie_theater": return 'Theaters';
            case "shopping_mall": return 'Shopping';
        }
    }
}
var categoryNamesManager = new POICategoryNamesClass();

export class POIManager {
    //#region [ Properties ]
    public Map: google.maps.Map;
    public PlacesService: google.maps.places.PlacesService;
    public POICategories: Array<POICategory>;
    //#endregion

    //#region [ Private properties ]
    private _defaultSearchRadius: number = 500;
    //#endregion 

    //#region [ Constructor ]
    constructor(map: google.maps.Map) {
        this.Map = map;
        this.PlacesService = new google.maps.places.PlacesService(this.Map);
        this.POICategories = new Array<POICategory>();
    }
    //#endregion

    //#region [ Private Methods ]
    private _setPOICategoryFromPlaces(catType: string, places: Array<google.maps.places.PlaceResult>, pagination: google.maps.places.PlaceSearchPagination): Array<POICategory> {
        //#region [ Create category ]
        let isCategoryInitialized: boolean = this._isCategorySetByType(catType);

        //Si no hay una categoria creada con ese tipo, la creamos
        if (!isCategoryInitialized) {
            this.POICategories.push(
                new POICategory(categoryNamesManager.getNameByType(catType), catType)
            );
        }
        //#endregion
        places.forEach((place, i) => {
            //#region [ Create POI ]
            let poi = new POI(place, categoryNamesManager.getNameByType(catType));
            let poiCategory = this._getCategoryByType(catType);
            poiCategory.Children.push(poi);

            //setTimeout(this._sendPlaceDetailsRequest.bind(this, place.place_id, catType), i * 500);
            //#endRegion
        });
        if (pagination.hasNextPage) {
            pagination.nextPage();
        }
        return this.POICategories;
    }

    private _sendPlaceDetailsRequest(placeId: string, catType: string) {
        let poiDetailsReq: google.maps.places.PlaceDetailsRequest = {
            placeId: placeId
        };
        this.PlacesService.getDetails(poiDetailsReq, this._handlePlaceDetailsResponse.bind(this, catType));
    }

    private _handlePlaceDetailsResponse(catType: string, place: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) {
        if (place !== null) {
            let poi = new POI(place, catType);
            let poiCategory = this._getCategoryByType(catType);
            poiCategory.Children.push(poi);
        }
    }

    private _isCategorySetByType(type: string) {
        let isCategoryInitialized = false;
        this.POICategories.every((c, i) => {
            if (c.Type === type) {
                isCategoryInitialized = true;
                return false;
            }
            else {
                return true;
            }
        });
        return isCategoryInitialized;
    }
    private _getCategoryByType(type: string): POICategory {
        let cat: POICategory = null;
        this.POICategories.every((c) => {
            if (c.Type === type) {
                cat = c;
                return false;
            }
            else {
                return true;
            }
        });
        return cat;
    }
    private _logAll() {
        this.POICategories.forEach((c) => {
            console.log("Categoria: " + c.Name);
            c.Children.forEach((poi) => {
                console.log(
                    "Nombre: " + poi.Name + " Tipo: " + poi.Type
                );
            });
        });
    }
    //#endregion
    //#region [ Public Methods ]
    public GetNearbyPlaces(request: google.maps.places.PlaceSearchRequest, cbSuccess: (categories: Array<POICategory>) => void, cbError?: (status: google.maps.places.PlacesServiceStatus) => void) {
        console.log('Sending category ' + request.types[0].toUpperCase() + ' request');
        let timeOut = setTimeout(
            this.PlacesService.nearbySearch(
                request,
                (results: Array<google.maps.places.PlaceResult>, status: google.maps.places.PlacesServiceStatus, pagination: google.maps.places.PlaceSearchPagination) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let category = request.types[0];
                        let poiCategories = this._setPOICategoryFromPlaces(category, results, pagination);
                        console.log('Received category ' + category.toUpperCase() + ' response');
                        cbSuccess(poiCategories);
                    } else {
                        if (typeof cbError !== "undefined") {
                            cbError(status)
                        } else {
                            console.log('GetNearbyPlaces() ERROR: ' + status);
                        }
                    }
                }
            ),
            200 //timeout time
        );
    }
    //#endregion
}