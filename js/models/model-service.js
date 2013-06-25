function Service(lat, lon, address, userName, cel) {

	this.lat = lat;
	this.lon = lon;
	this.address = address;
	this.userName = userName;
	this.cel = cel;

	this.checkState = function(taxId) {
		obtenerDatosTaxista(taxId, Service.onConfirm);
	};

	// saves the current Service to localStorage
	this.save = function() {
		localStorage.setItem(Service.name, JSON.stringify(this));
		var lastCode = 00;
		if (this.cel != null) {
			var lastCode = this.cel.substr(cel.length - 2);
		}
		solicitarServicio(this.address, lastCode, this.lat, this.lon, this.checkState);
	}
	// loads a Service from local storage
	Service.load = function() {
		var hash = localStorage.getItem(Service.name);
		return Service.build(JSON.parse(hash));
	}
	// returns null if there is no service in local storage
	Service.exists = function() {
		return localStorage.getItem(Service.name);
	}
	// given a JSON {lat, lon,address,userName,cel} constructs a new Service
	Service.build = function(hash) {
		return new Service(hash.lat, hash.lon, hash.address, hash.userName, hash.cel);
	}
	
}

Service.onConfirm = function(data) {
	console.log("data");
}
new Service(); 