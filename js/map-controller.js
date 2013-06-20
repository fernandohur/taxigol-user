
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
var btnHailConfirm;

var currentLocation;

var firstLoad = true;
// ------------------------------------
// Initialization code
// ------------------------------------
$(document).ready(function(){

	$('#map-page').on('pageshow',function(){
		if (firstLoad){
			initialize();
			firstLoad = false;
		}
	})
});





// ------------------------------------
// Function definitions
// ------------------------------------

function initialize(){

	//init service's handler
	Service.onConfirm = function(service, driverHash){
		var driver = Driver.build({placa: driverHash[0], name: driverHash[1], cel: driverHash[2]});
		driver.save();
		updateDriverLabels();
		$.mobile.changePage("#success-page",{transition: "flip"});
		console.log('confirmed');
	};

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

	// init hail confirm button
	btnHailConfirm = $('#btnHailConfirm');
	btnHailConfirm.click(onHailConfirm);

	// init map
	mapOptions = {
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var location = null;
	if (Position.exists()){
		location = Position.load();

	}
	else{
		var location = Position.build({lat: 4.597942, lon: -74.075725})
		location.save();
	}
	map.setCenter(new google.maps.LatLng(location.lat, location.lon));

	// init geocoder and geolocation
	geo = navigator.geolocation;
	geocoder = new google.maps.Geocoder();
	requestLocation(onLocationUpdated, handleNoGeolocation);
}

function onHail(){
	txtAddressConfirm.html('\"'+txtAddress.val()+'\"');
}

function onHailConfirm(){
	//TODO pedir el taxi
	var location = Position.load();
	var user = User.load();
	var service = Service.build({
		lat: location.lat,
		lon: location.lon,
		address: loadGeocoderResult(),
		userName: user.name,
		cel: user.cel
	});
	service.save();
	$.mobile.changePage( "#loading-page",{ transition: "flip", reverse:false});
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
	else if(geocoderStatus == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
		txtAddress.val('Por favor ingresa tu direccion');
	}
	else{
		txtAddress.val('Por favor ingresa tu direccion');
	}
}



function handleNoGeolocation(){
	showTooltip('lo sentimos', 'no pudimos encontrar tu ubicaci&oacute;n. Porfavor arrastra el marcador hasta tu ubicaci&oacute;n actual.', 'icon-frown');
	var location  = Position.load();
	onLocationUpdated({coords:{latitude:location.lat, longitude:location.lon}});
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
		onMarkerDragEnd();
		google.maps.event.addListener(marker, 'dragstart', onMarkerDragStart);
		google.maps.event.addListener(marker, 'dragend', setTimeout(onMarkerDragEnd,1000));
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

	var location = Position.build({lat: pos.lat(), lon: pos.lng()});
	location.save();
}



function showTooltip(title, message, icon){

}


