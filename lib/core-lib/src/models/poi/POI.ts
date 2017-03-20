import {POITypes} from './POITypes';
import { MouseEventHandler } from 'react';

export class POI {

    public Id: string;
    public Category: string;
    public Name: string;
    public IsOpen: boolean;
    public Type: any;
    public Location: google.maps.LatLng;
    public FormattedAddress: string;
    public PhoneNumber: string;
    public Thumb: string;
    public Photos: Array<string>;
    public Info: string;
    public Rating: number;

    public IsLoading: boolean;
    public OnClick: any;

    constructor(place: google.maps.places.PlaceResult, category: string, isOpen: boolean = false) {
        this.Id = place.place_id;
        this.Category = category;
        this.Name = place.name;
        this.IsOpen = isOpen;
        this.Type = place.types[0];
        this.Location = place.geometry.location;
        this.Thumb = place.icon;
        this.Rating = typeof place.rating !== "undefined" ? place.rating : 0;
        let photoOptions: google.maps.places.PhotoOptions = {
            maxHeight: 75,
            maxWidth: 75
        };
        this.Photos = typeof place.photos !== "undefined" ?
            place.photos.map((f) => { return f.getUrl(photoOptions); }) :
            [];
        this.IsLoading = true;
    }

    SetClickEvent(callback: Function) {
        this.OnClick = callback;
    }

    UpdateFromPlaceResult(place: google.maps.places.PlaceResult) {
        this.FormattedAddress = place.formatted_address;
        this.PhoneNumber = place.formatted_phone_number;
    }
}