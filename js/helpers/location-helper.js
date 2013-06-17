//
// Location helpers
//




//
// Helper method for requesting location.
// @param onLocationUpdated : function({coords:{latitude, longitude}})
// @param handleNoGeolocation : function()
//
function requestLocation(onLocationUpdated, handleNoGeolocation){

	// Try HTML5 geolocation
	if (geo) {
		geo.getCurrentPosition(onLocationUpdated, handleNoGeolocation);
	}
	else{
		handleNoGeolocation();
	}
}

// helper
function saveLocation(lat, lon){
	localStorage.setItem("lat", lat);
	localStorage.setItem("lon", lon);
}

// helper
function getSavedLocation(){
	var lat = localStorage.getItem("lat");
	var lon = localStorage.getItem("lon");
	return {latitude : lat, longitude : lon};
}

function saveGeocoderResult(address){
	localStorage.setItem("geocoder-result", address);
}

function loadGeocoderResult(){
	return localStorage.getItem("geocoder-result");
}