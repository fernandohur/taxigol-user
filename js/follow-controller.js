
// ------------------------------------
// Declare variables
// ------------------------------------

var driverMapOptions;
var driverMarker;
var userMarker;

// widgets
var driverMap;

var currentLocation;

var driverFirstLoad = true;
// ------------------------------------
// Initialization code
// ------------------------------------
$(document).ready(function(){

	$('#map-page').on('pageshow',function(){
		if (driverFirstLoad){
			driverInitialize();
			driverFirstLoad = false;
		}
	})
});


// ------------------------------------
// Function definitions
// ------------------------------------

function driverInitialize(){

	// init map
	driverMapOptions = {
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	driverMap = new google.maps.Map(document.getElementById('map-canvas2'), driverMapOptions);
	var location = null;
	if (Position.exists()){
		location = Position.load();

	}
	map.setCenter(new google.maps.LatLng(location.lat, location.lon));
	updateMarkers();
}

function updateMarkers(pos){
	if (driverMarker==null){
		driverMarker = new google.maps.Marker(
			{
	            map : map,
	            icon: '../img/taxi-icon.png',	         
	        }
		);
	}
	if(userMarker == null){
		userMarker= new google.maps.Marker(
			{
				position: pos,
				map:map,
				icon: '../img/map_marker.png'
			}
		)
		
	}
}

function updateDriverMarker(){
	var driver = Driver.load();
	var pos = Position.lastPosition(driver.taxiId);
	var gPos = new google.maps.LatLng(pos.lat, pos.lon);
	driverMarker.setPosition(gPos);
}

function computeDistance(){
	
}
