function Location(lat, lon, address){

	this.lat = lat;
	this.lon = lon;
	this.address = address;

	this.locationChangeHandler = function(location){};

	this.notifyChanges = function() {
		this.locationChangeHandler(this);
	}

	this.save = function(){
		localStorage.setItem(Location.name, JSON.stringify({lat:lat, lon:lon, address:address}));
	}

	Location.load = function(){
		var hash = JSON.load(localStorage.getItem(Location.name));
		return Location.build(hash);
	}

	Location.exists = function(){
		return localStorage.getItem(Location.name);
	}

	Location.build = function(hash){
		return new Location(hash.lat, hash.lon, hash.address);
	}
}

new Location();