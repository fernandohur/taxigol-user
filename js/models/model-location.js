function Position(lat, lon){

	this.lat = lat;
	this.lon = lon;

	this.save = function(){
		localStorage.setItem(Position.name, JSON.stringify(this));
	}

	Position.load = function(){
		var hash = localStorage.getItem(Position.name);
		return Position.build(JSON.parse(hash));
	}

	Position.exists = function(){
		return localStorage.getItem(Position.name);
	}

	Position.build = function(hash){
		return new Position(hash.lat, hash.lon);
	}
}

new Position();