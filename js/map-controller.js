// ------------------------------------
// Declare variables
// ------------------------------------


var geocoder;
var geo;
var mapOptions;
var marker;

// widgets
var txtAddress;
var txtAddressConfirm;
var map;
var btnHail;

var currentLocation;

// ------------------------------------
// Initialization code
// ------------------------------------
$(document).ready(function(){

	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src  = "http://maps.google.com/maps/api/js?v=3&sensor=true&callback=gmap_draw";
	window.gmap_draw = function(){
		initialize();
	};
	$("head").append(s);

});





// ------------------------------------
// Function definitions
// ------------------------------------

function initialize(){

	//current locaiton object
	currentLocation = new Location(0,0,"");

	// init text address field
	txtAddress = $('#txtAddress');
	txtAddressConfirm = $('#txtAddressConfirm');

	var savedAddress = loadGeocoderResult();
	if (savedAddress){
		txtAddress.val(savedAddress);
	}

	//init hail button
	btnHail = $('#btnHail');
	btnHail.click(onHail);

	// init map
	mapOptions = {
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	if (Location.exists()){
		var location = Location.load();
		map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
	}
	else{
		map.setCenter(new google.maps.LatLng(4.597942,-74.075725));
	}

	// init geocoder and geolocation
	geo = navigator.geolocation;
	geocoder = new google.maps.Geocoder();

	requestLocation(onLocationUpdated, handleNoGeolocation);
}

function onHail(){
	// TODO pedir el taxi
	txtAddressConfirm.html('\"'+txtAddress.val()+'\"');
}

function onLocationUpdated(position){

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	var pos = new google.maps.LatLng(lat, lon);

	map.setCenter(pos);
	updateMarker(pos);

}


// helper
function onGeocoderCallback(geocoderResult, geocoderStatus){

	if (geocoderStatus === google.maps.GeocoderStatus.OK && geocoderResult[0] != null){
		var address = geocoderResult[0].formatted_address;
		txtAddress.val(address.split(',')[0]);
		saveGeocoderResult(txtAddress.val());
	}
	else{
		txtAddress.val('Por favor ingresa tu direccion');
	}
}



function handleNoGeolocation(){

	showTooltip('lo sentimos', 'no pudimos encontrar tu ubicaci&oacute;n. Porfavor arrastra el marcador hasta tu ubicaci&oacute;n actual.', 'icon-frown');
	var location = getSavedLocation();
	if (location && location.latitude && location.longitude){
		onLocationUpdated({coords:{latitude:location.latitude, longitude:location.longitude}});
	}
}

function updateMarker(pos){
	if (marker==null){
		marker = new google.maps.Marker(
			{
	        	position : pos,
	            map : map,
	            icon: '../img/map_marker.png',
	            draggable : true
	        }
		);
		google.maps.event.addListener(marker, 'dragstart', onMarkerDragStart);
		google.maps.event.addListener(marker, 'dragend', onMarkerDragEnd);
	}
	else{
		marker.setPosition(pos);
	}
}

function onMarkerDragStart(){
	txtAddress.val('buscando...');
	showTooltip('buscando direcci&oacute;n', '', 'icon-time');
}

function onMarkerDragEnd(){
	var pos = marker.getPosition();
	map.panTo(pos);
	geocoder.geocode({location:pos}, onGeocoderCallback);
	txtAddress.focus();

	saveLocation(pos.jb, pos.kb);
}



function showTooltip(title, message, icon){

}


