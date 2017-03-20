import {POI} from './POI';
export class POICategory {

    public Name: string;
    public Type: string;
    public IsOpen: boolean;
    public Children: Array<POI>;
    public Icon: string;

    public OnClick: any;

    //#region [ Constructor ]
    constructor(name: string, type: string, isOpen: boolean = false) {
        this.Name = name;
        this.Type = type;
        this.Icon = 'icon-' + type + '.png';
        this.IsOpen = isOpen;
        this.Children = new Array<POI>();
    }
    //#endregion 
    SetClickEvent(callback: Function) {
        this.OnClick = callback;
    }
}