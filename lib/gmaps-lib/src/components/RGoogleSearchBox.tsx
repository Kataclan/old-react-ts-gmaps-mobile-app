//#region [ Import React ]
import * as React from 'react';
import * as $ from "jquery";
import { MouseEventHandler } from 'react';
//#endregion

import { SearchBoxStyles as DefaultStyles} from './styles/SearchBoxStyles';

//#region [ Import Material ]
import { IconButton } from 'material-ui';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import SearchIcon from 'material-ui/svg-icons/action/search';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';

import { GoogleGeoCoder, IGeoCodeRequest, IGeoCodeResponse } from '../../../gmaps-lib';

///#region [ Props & State Definition ]
interface ISearchBoxProps {
	//Styles
	containerStyle?:any;
	searchboxContainerStyle?:any;
	inputStyle?:any;
	btnContainerStyle?:any;
	iconBtnStyle?:any;
	iconBtnColor?:any;
	//Event handlers
	onCenterNodeClick: Function;
	onSearchAddressRequest?: Function;
	onSearchAddressSuccess: Function;
	onSearchAddressError?: Function;
}
///#endregion

export class RGoogleSearchBox extends React.Component<ISearchBoxProps, {}> {

	private _inputAddressId: string;
	private _inputAddresRef: HTMLInputElement;
	private _searchBox: google.maps.places.SearchBox;

	//#region [ Constructor ]
	constructor(props: ISearchBoxProps) {
		super(props);
		this._inputAddressId = "input-address";
		this._inputAddresRef = null;
	}
	//#endregion

	//#region [ Event Handlers ]
	private onSearchAddressRequest() {
		let address = $('#' + this._inputAddressId).val();
		let geoCoderRequest: google.maps.GeocoderRequest = {
			address: address
		}
		let req: IGeoCodeRequest = {
			address: address,
			googleRequest: geoCoderRequest,
			callback: this.onSearchAddressResponse.bind(this)
		};
		GoogleGeoCoder.GeoCode(req);
	}
	private onSearchAddressResponse(response: IGeoCodeResponse) {
		if (response.status == google.maps.GeocoderStatus.OK) {
			this.props.onSearchAddressSuccess(response);
		}
		else {
			this.props.onSearchAddressError(response);
		}
	}
	//#endregion 

	//#region [ Render Partials ]
	//#endregion 

	//#region [ React Component ] 
	componentDidMount() {
		this._searchBox = new google.maps.places.SearchBox(this._inputAddresRef);
	}
	public render() {
		let props = this.props;
		return (
			<div style={props.containerStyle === undefined ? DefaultStyles.Searchbox.containerStyle : props.containerStyle}>
				<div style={props.searchboxContainerStyle === undefined ? DefaultStyles.Searchbox.searchboxContainerStyle : props.searchboxContainerStyle}>
					<input
						id={this._inputAddressId}
						ref={(r: HTMLInputElement) => { this._inputAddresRef = r; }}
						type="text"
						placeholder="Search in maps"
						style={props.inputStyle === undefined ? DefaultStyles.Searchbox.inputStyle : props.inputStyle}
					/>
				</div>
				<div style={props.btnContainerStyle === undefined ? DefaultStyles.Searchbox.btnContainerStyle : props.btnContainerStyle}>
					<IconButton onClick={this.onSearchAddressRequest.bind(this)}>
						<ArrowForward 
							style={props.iconBtnStyle === undefined ? DefaultStyles.Searchbox.iconBtnStyle : props.iconBtnStyle}
							color={props.iconBtnStyle === undefined ? DefaultStyles.Colors.white : props.iconBtnColor} 
						/>
					</IconButton>
				</div>
				<div style={props.btnContainerStyle === undefined ? DefaultStyles.Searchbox.btnContainerStyle : props.btnContainerStyle}>
					<IconButton onClick={() => { this.props.onCenterNodeClick(); }}>
						<LocationIcon 
							style={props.iconBtnStyle === undefined ? DefaultStyles.Searchbox.iconBtnStyle : props.iconBtnStyle}
							color={props.iconBtnStyle === undefined ? DefaultStyles.Colors.white : props.iconBtnColor} 
						/>
					</IconButton>
				</div>
			</div>
		);
	}
	//#endregion
}