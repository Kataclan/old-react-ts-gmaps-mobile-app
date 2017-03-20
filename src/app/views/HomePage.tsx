//#region [ Import React ]
import * as React from 'react';
import * as $ from "jquery";
//#endregion

//#region [ Import App inline styles ]
import { AppStyles } from '../AppStyles';
//#endregion

//#region [ Map models ]
import { GoogleGeoLocator, GoogleRouter, IGeoCodeResponse, IRouterRequest, IRouteProps } from '../../../lib/gmaps-lib';
import { GeoLocation } from '../../../lib/core-lib/src';
//#endregion

//#region [ POI Models]
import { POIManager, POICategory, POI } from '../../../lib/core-lib/src'
//#endregion

//#region [ Components ]
import { RGoogleMap , RGoogleSearchBox as RSearchBox } from '../../../lib/gmaps-lib';
import { RMoreInfoContainer } from '../../../lib/app-lib/src';
import {RPOIList} from '../components/poi/RPOIList';
import {GoFooter} from '../components/GoFooter';


import {IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';
//#endregion



interface IHomePageState {
	isMapLoading: boolean;
	mapMarkers: Array<google.maps.Marker>;
	mapPolilynes: Array<google.maps.Polyline>;
	mapCenter: google.maps.LatLng;
	mapZoom: number;
	routeProps: IRouteProps;
	showRouteProps: boolean;
}

export default class AppMaps extends React.Component<{}, IHomePageState> {


	public _defaultMapCenter: google.maps.LatLng;
	public _defaultMapZoom: number = 15;


	public _refMapComponent: RGoogleMap;
	public _googleMap: google.maps.Map;

	public _defaultCategoryTypes: Array<string> = ["museum", "restaurant", "bar", "night_club", "shopping_mall", "movie_theater"];

	panPosX: number = 0;
	panPosY: number = 0;

	//#region [ Constructor ]
	constructor() {
		super();
		//Bindings
		this.setBindings = this.setBindings.bind(this);
		this.setBindings();

		this._defaultMapCenter = new google.maps.LatLng(
			41.37215570000001,
			2.1637241
		); //Nexcommunity office
		//State
		this.state = {
			isMapLoading: true,
			mapMarkers: [],
			mapCenter: this._defaultMapCenter,
			mapZoom: this._defaultMapZoom,
			mapPolilynes: [],
			routeProps: null,
			showRouteProps: false
		};
	}
	setBindings() {
		//Geolocation
		this.handleCenterNode = this.handleCenterNode.bind(this);
		//Map
		this.onMapMounted = this.onMapMounted.bind(this);
		this.hideMarkers = this.hideMarkers.bind(this);
		this.cleanMarkers = this.cleanMarkers.bind(this);
		//POI
		this.handlePOIClick = this.handlePOIClick.bind(this);
		//SearchBox
		this.handleSearchAddressSuccess = this.handleSearchAddressSuccess.bind(this);
		this.handleSearchAddressError = this.handleSearchAddressError.bind(this);
	}
	//#endregion	

	//#region [ GEO LOCATION ]
	// private _sendGeoLocationRequest() {
	// 	//Centramos en nuestra localización
	// 	let geoLocReq: IGeoLocateReq = {
	// 		success: this._handleGeoLocationResponse.bind(this),
	// 		error: (error: any) => { alert('Geolocation error: ' + error.message) }
	// 	};
	// 	GoogleMapGeoLocator.GeoLocate(geoLocReq);
	// }
	private handleCenterNode() {
		this.hideMarkers();
		this.hidePolilynes();
		let markerOps: google.maps.MarkerOptions = {
			position: this._defaultMapCenter
		};
		let marker = new google.maps.Marker(markerOps);
		this.setState({
			mapMarkers: [marker],
			mapCenter: this._defaultMapCenter
		});
	}
	//#endregion

	//#region [ MAP ]
	public onMapMounted(map: google.maps.Map) {
		this._googleMap = map;
		let centerMarker = this.getMapCenterMarker();
		this.setState({
			isMapLoading: false,
			mapMarkers: [centerMarker],
			mapCenter: this._defaultMapCenter,
		});
	}
	public getMapCenterMarker(): google.maps.Marker {
		let markerOps: google.maps.MarkerOptions = {
			position: this._defaultMapCenter
		};
		return new google.maps.Marker(markerOps);
	}
	public hideMarkers() {
		this.state.mapMarkers.forEach((m) => { m.setMap(null); });
	}
	public cleanMarkers() {
		this.hideMarkers();
		this.setState({
			mapMarkers: []
		});
	}
	public hidePolilynes() {
		this.state.mapPolilynes.forEach((p) => { p.setMap(null); });
	}
	public cleanPolilynes() {
		this.hidePolilynes();
		this.setState({
			mapPolilynes: []
		});
	}
	//#endregion

	//#region [ ROUTER ]
	public handleRouterResponse(response: google.maps.DirectionsResult) {
		let routerManager = new GoogleRouter(this._googleMap);
		let route = response.routes[0];
		let routeLeg = route.legs[0];
		let routeProps: IRouteProps = {
			DistValue: routeLeg.distance.value,
			DistText: routeLeg.distance.text,
			DurationValue: routeLeg.duration.value,
			DurationText: routeLeg.duration.text
		};
		this.state.mapPolilynes.forEach((p) => { p.setMap(null); });
		let polyline = routerManager.DrawRoute(route);
		this.setState({
			mapPolilynes: [polyline],
			routeProps: routeProps,
			showRouteProps: true
		});
	}
	//#endregion

	//#region [ POI LIST ]
	public handleReceiveNearbyPoints(categories: Array<POICategory>) {
	}
	//#endregion

	//#region [ Event handlers ]
	public handleSearchAddressSuccess(response: IGeoCodeResponse) {
		this.hideMarkers();
		this.hidePolilynes();
		//Añadimos marker
		var addressPos: google.maps.LatLng = response.results[0].geometry.location;
		var formattedAddress = response.results[0].formatted_address;

		//Actualizamos estado
		let markerOps: google.maps.MarkerOptions = {
			position: addressPos
		};
		let marker = new google.maps.Marker(markerOps);
		this.setState({
			mapMarkers: [marker],
			mapCenter: addressPos,
			routeProps: null
		});
	}
	public handleSearchAddressError(response: IGeoCodeResponse) {
		alert('Error searching address');
	}
	public handlePOIClick(poi: POI) {
		//Añadimos marcador al punto y en el hotel
		this.hideMarkers();
		let centerMarker = this.getMapCenterMarker();
		let markerOps: google.maps.MarkerOptions = {
			position: poi.Location
		};
		let poiMarker = new google.maps.Marker(markerOps);
		this.setState(
			{
				mapMarkers: [centerMarker, poiMarker]
			}, () => {
				//Buscamos ruta desde mi pos al punto
				let routerReq: IRouterRequest = {
					origin: this.state.mapCenter,
					destination: poi.Location,
					callback: this.handleRouterResponse.bind(this),
					error: (status: string) => { alert('Error al buscar ruta: ' + status); }
				};
				let router = new GoogleRouter(this._refMapComponent.map);
				router.GetRoutes(routerReq);
			});
	}
	//#endregion

	//#region [ Render Partials ]
	renderInfoNode() {
		return (
			<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
				<span></span>
			</div>
		);
	}
	renderContent() {
		return (
			<div id="content-container">
				<div style={AppStyles.SearchBox.container}>
					<RSearchBox
						onCenterNodeClick={this.handleCenterNode}
						onSearchAddressSuccess={this.handleSearchAddressSuccess}
						onSearchAddressError={this.handleSearchAddressError}
					/>
				</div>
				<div style={AppStyles.Map.container}>
					<RGoogleMap
						ref={(ref: RGoogleMap) => { this._refMapComponent = ref; }}
						containerStyle={{ width: "100%", height: "100%" }}
						markers={this.state.mapMarkers}

						//Map options
						defaultCenter={this._defaultMapCenter}
						center={this.state.mapCenter}
						defaultZoom={this._defaultMapZoom}
						zoom={this.state.mapZoom}

						//Route options
						routeProps={this.state.routeProps}
						displayRouteInfo={true}

						onMapMounted={this.onMapMounted}
					/>

				</div>

				<div style={AppStyles.POIList.container}>
					<RMoreInfoContainer
						infoText={"Discover the most interesting nearby places"}
						contentNode={
							<RPOIList
								map={this._googleMap}
								categoryTypes={this._defaultCategoryTypes}
								onPOIClick={this.handlePOIClick}
								loading={this.state.isMapLoading}
							/>
						}
						infoNodeHeight={75}
						containerDivStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
					/>
				</div>
			</div>
		);
	}
	private renderFooter() {
		let onFooterClick = () => {
			
		};
		return GoFooter(onFooterClick);
	}

	private renderAppBar(){
		return (
			<div id="app-bar">
				<div className="left">
					<IconButton onClick={() => {}}>
						<AppsIcon color="#9C27B0" />
					</IconButton>
				</div>
				<div className="right">
					<IconButton onClick={() => {}}>
						<PowerIcon color="#9C27B0" />
					</IconButton>
				</div>
				<div className="center">
					<div className="title-square">
						<span>MAPS</span>
					</div>
				</div>
			</div>
		);
	}
	//#endregion

	//#region [ React Component ]
	public render() {
		return (
			<div id="wrapper">
				{this.renderAppBar()}
				<div id="content">
					{this.renderContent()}
					{this.renderFooter()}
				</div>
			</div>
		);
	}
	//#endregion 
}
