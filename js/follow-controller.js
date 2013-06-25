
// ------------------------------------
// Declare variables
// ------------------------------------

var driverMapOptions;
var driverMarker;
var userMarker;
var near;

// widgets
var driverMap;

var userPos;

var driverFirstLoad = true;
// ------------------------------------
// Initialization code
// ------------------------------------
$(document).ready(function(){

	$('#follow-page').on('pageshow',function(){
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
	userPos = null;
	if (Position.exists()){
		userPos = Position.load();

	}
	driverMap.setCenter(new google.maps.LatLng(userPos.lat, userPos.lon));
	updateMarkers();
	near = setInterval(updateDriverMarker(), 2000);
}

function updateMarkers(){
	if (driverMarker==null){
		driverMarker = new google.maps.Marker(
			{
	            map : driverMap,
	            icon: 'img/taxi-icon.png',	         
	        }
		);
	}
    //TODO
	var pos = new google.maps.LatLng(userPos.lat, userPos.lon);
	if(userMarker == null){
		userMarker= new google.maps.Marker(
			{
				position: pos,
				map:driverMap,
				icon: 'img/map_marker.png'
			}
		)
		
	}
}

function updateDriverMarker(){
    var driver=null;
    if(Driver.exists()){
        driver = Driver.load();
    }
	var pos = Position.lastPosition(driver.taxiId);
	var gPos = new google.maps.LatLng(pos.lat, pos.lon);
	driverMarker.setPosition(gPos);
	computeDistance(gPos);
}

function computeDistance(taxiPos){
    if(taxiPos != null){
        var distance = google.maps.geometry.spherical.computeDistanceBetween(userPos, taxiPos);
        if(distance <= 100){
            clearInterval(near);
            alert("llego el taxi");
        }
    }
}
