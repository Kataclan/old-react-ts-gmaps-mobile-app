//#region [ Import React ]
import * as React from 'react';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { MouseEventHandler } from 'react';
import * as CSSTransitionGroup from 'react-addons-css-transition-group';
//#endregion

//#region [ POI Models ]
import {POIManager, POICategory, POI, POITypes} from '../../../../lib/core-lib/src';
//#endregion

//#region [ Components ]
import {RLoading} from '../../../../lib/app-lib/src';
var Rater: any = require('react-star-rating-component');
//#endregion

function add3Dots(string: string, limit: number) {
    var dots = "...";
    if (string.length > limit) {
        // you can also use substr instead of substring
        string = string.substring(0, limit) + dots;
    }

    return string;
}

interface IRPOIItemProps {
    poi: POI,
    onClick: (poi: POI, containerRef: HTMLDivElement) => void
};
class RPOIItem extends React.Component<IRPOIItemProps, {}>{
    _infoContainerRef: HTMLDivElement;

    constructor(props: IRPOIItemProps) {
        super(props);
        this.handlePOIClick = this.handlePOIClick.bind(this);
    }

    handlePOIClick() {
        this.props.onClick(this.props.poi, this._infoContainerRef);
    }

    render() {
        let poi = this.props.poi;
        let poiPhoto = poi.Photos.length > 0 ? poi.Photos[0] : poi.Thumb;
        let poiDetails = (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                <div style={{
                    width: '30%',
                    height: '100%',
                    backgroundImage: "url('" + poiPhoto + "')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 50%',
                    backgroundSize: 'cover'
                }}>
                </div>
                <div style={{ width: '70%', height: '100%', paddingLeft: 15 }}>
                    <b>Address: </b>{poi.FormattedAddress}<br />
                    <b>Phone: </b>{poi.PhoneNumber}
                </div>
            </div>
        );
        let poiInfo = (
            <div ref={(r) => { this._infoContainerRef = r; }} key={"poi-" + poi.Id + "-details"} className="poi-details-container">
                {
                    poi.IsLoading ?
                        <RLoading
                            imgSrc="img/loading-icon-violet.gif"
                            containerStyle={{ width: '100%', heigth: 75 }}
                            imgStyle={{ width: 25, heigth: 25 }}
                        />
                        :
                        poiDetails
                }
            </div>
        );
        return (
            <li key={"poi-" + poi.Id}>
                <div className="poi-title-container" onClick={this.handlePOIClick}>
                    <span style={{ width: 'calc(100% - 70px)' }}>{add3Dots(poi.Name, 25)}</span>
                    <div style={{ width: 70 }}>
                        <Rater
                            name={poi.Id + '-rater'}
                            interactive={false}
                            value={poi.Rating}
                            starCount={5}
                            editing={false}
                            emptyStarColor={"#ccc"}
                        />
                    </div>
                </div>
                {poi.IsOpen && poiInfo}
            </li>
        );
    }
}

interface IRPOICategoryProps {
    category: POICategory;
    onCategoryClick: (poiCat: POICategory, containerRef: HTMLDivElement) => void,
    onPOIClick: (poi: POI, containerRef: HTMLDivElement) => void
}
class RPOICategory extends React.Component<IRPOICategoryProps, {}>{

    _infoContainerRef: HTMLDivElement;

    constructor(props: IRPOICategoryProps) {
        super(props);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.handlePOIClick = this.handlePOIClick.bind(this);
    }
    handleCategoryClick() {
        this.props.onCategoryClick(this.props.category, this._infoContainerRef);
    }
    handlePOIClick(poi: POI, containerRef: HTMLDivElement) {
        this.props.onPOIClick(poi, containerRef);
    }
    render() {
        let category = this.props.category;
        //Sort by rating

        return (
            <li key={"category-" + category.Name} className="category-list-item">
                <div className="category-title-container" onClick={this.handleCategoryClick}>
                    <img style={{ height: 25, width: 25 }} src={"img/" + category.Icon} />
                    <span style={{ marginLeft: 10 }}>{category.Name}</span>
                </div>
                {
                    category.IsOpen ?
                        <div ref={(r) => { this._infoContainerRef = r; }} id={category.Type + '-list'} className="poi-list-container">
                            <ul className="poi-list">
                                {
                                    category.Children.map((poi, i) => {
                                        if (i < 5) {
                                            return (
                                                <RPOIItem key={"poi-item-" + poi.Id + i} poi={poi} onClick={this.handlePOIClick} />
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        : ''
                }
            </li>
        );
    }
}

///#region [ Props & State Definition ]
interface IRPOIListProps {
    //Map
    map: google.maps.Map;
    categoryTypes: Array<string>;
    loading?: boolean;
    //Events
    onCategoryClick?: (cat: POICategory) => void;
    onPOIClick: (poi: POI) => void;
}
interface IRPOIListState {
    categories: Array<POICategory>;
    isLoading: boolean;
}
///#endregion
export class RPOIList extends React.Component<IRPOIListProps, IRPOIListState> {

    private POIManager: POIManager;

    //Places props
    _mapRef: google.maps.Map; //Necesitamos la ref del mapa ya que empezamos a buscar los POIS cuando nos vienen unas nuevas props,
    //por lo que si llamamos en alguna funcion a this.props no estarán actualizadas. Asi evitamos tener que
    //pasar las nuevas props a todas las funciones que se llaman al actualizar las categorias.
    _defaultSearchRadius: number = 500; //Search POIs radius in meters
    _loadingCatIndex: number = 0;

    //#region [ Constructor ]
    constructor(props: IRPOIListProps) {
        //Init props
        super(props);
        //State
        this.state = {
            categories: [],
            isLoading: props.loading !== null ? props.loading : true //Loading = true cuando creamos por primera vez
        };
        //Bindings
        this.handlePOICategoryClick = this.handlePOICategoryClick.bind(this);
        this.handlePOIClick = this.handlePOIClick.bind(this);
        this.handleGetNearbyPointsResponse = this.handleGetNearbyPointsResponse.bind(this);
        this.getNearbyPlacesByCategoryType = this.getNearbyPlacesByCategoryType.bind(this);
        this.handleGetPOIDetailsResponse = this.handleGetPOIDetailsResponse.bind(this);
        this.initNearbyPoints = this.initNearbyPoints.bind(this);
    }
    //#endregion
    //#region [ Private methods ]
    //#endregion

    //#region [ Public methods ]

    //#endregion

    //#region [ Event Handlers ]
    public handlePOIClick(poi: POI) {
        let _categories = this.state.categories;
        let _poiCategory = _.find(_categories, c => c.Name == poi.Category);
        let _poi = _.find(_poiCategory.Children, p => p.Id == poi.Id);
        _poi.IsOpen = !_poi.IsOpen;
        _poiCategory.Children.forEach((p) => { if (p.Id !== poi.Id) p.IsOpen = false; });
        this.setState(
            { categories: _categories },
            () => {
                if (_poi.IsLoading) {
                    let poiDetailsReq: google.maps.places.PlaceDetailsRequest = {
                        placeId: poi.Id
                    };
                    this.POIManager.PlacesService.getDetails(poiDetailsReq, this.handleGetPOIDetailsResponse.bind(null, poi));
                }
            }
        );
        this.props.onPOIClick(poi);
    }
    public handlePOICategoryClick(category: POICategory) {
        let _categories = this.state.categories;
        let _category = _.find(_categories, c => c.Name == category.Name);
        _category.IsOpen = !_category.IsOpen;
        _categories.forEach((c) => { if (c.Name !== category.Name) c.IsOpen = false; });
        this.setState({ categories: _categories });
    }

    public handleGetPOIDetailsResponse(poi: POI, place: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) {
        if (place !== null) {
            let _categories = this.state.categories;
            let _poiCategory = _.find(_categories, c => c.Name == poi.Category);
            let _poi = _.find(_poiCategory.Children, p => p.Id == poi.Id);
            _poi.UpdateFromPlaceResult(place);
            _poi.IsLoading = false;
            this.setState({ categories: _categories });
        }
    }
    public handleGetNearbyPointsResponse(poiCategories: Array<POICategory>) {
        //El siguiente indice a buscar sera el lenght del array que nos devuelven
        let nextCatIdx = poiCategories.length;
        poiCategories.forEach((category) => {
            category.Children.sort(function compare(a, b) {
                return b.Rating - a.Rating;
            });
        });
        if (nextCatIdx >= this.props.categoryTypes.length) {
            this.setState({
                categories: poiCategories,
                isLoading: false
            });
        } else {
            let nextCatType = this.props.categoryTypes[nextCatIdx];
            this.setState(
                { categories: poiCategories },
                this.getNearbyPlacesByCategoryType.bind(null, nextCatType)
            );
        }
    }
    public getNearbyPlacesByCategoryType(categoryType: string) {
        let request: google.maps.places.PlaceSearchRequest = {
            location: this._mapRef.getCenter(),
            radius: this._defaultSearchRadius,
            types: [categoryType],
        };
        this.POIManager.GetNearbyPlaces(request, this.handleGetNearbyPointsResponse);
    }
    public initNearbyPoints() {
        let firstCategory = this.props.categoryTypes.length > 0 ?
            this.props.categoryTypes[0] : null;
        if (firstCategory !== null) {
            this.getNearbyPlacesByCategoryType(firstCategory);
        } else {
            /* TODO: Mostrar error */
        }
    }
    //#endregion 

    //#region [ React Component ] 
    public componentWillReceiveProps(nextProps: IRPOIListProps) {
        //Si paramos el loading, inicializamos de nuevo el POIManager
        if (this.props.loading && !nextProps.loading) {
            this._mapRef = nextProps.map;
            this.POIManager = new POIManager(this._mapRef);
            this.initNearbyPoints();
        }
    }
    public render() {
        let content = this.state.isLoading ?
            (
                <RLoading
                    imgSrc="img/loading-icon-violet.gif"
                    text="Searching nearby places..."
                />
            ) :
            (
                <ul className="category-list">
                    {
                        this.state.categories.map((cat, i) => {
                            return (
                                <CSSTransitionGroup
                                    key={"category-csstransition-" + i}
                                    transitionEnter={true}
                                    transitionEnterTimeout={300}
                                    transitionAppearTimeout={300}
                                    transitionLeaveTimeout={100}
                                    transitionAppear={true}
                                    transitionName="TCategory">
                                    <RPOICategory
                                        key={"poi-category-" + i}
                                        category={cat}
                                        onCategoryClick={this.handlePOICategoryClick}
                                        onPOIClick={this.handlePOIClick}
                                    />
                                </CSSTransitionGroup>
                            );
                        })
                    }
                </ul>
            );
        return <div id="category-list-container">
            {content}
        </div>;
    }
    //#endregion
}