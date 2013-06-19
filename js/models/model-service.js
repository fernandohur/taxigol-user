var nameId = "servicio";

function Service(lat, lon, address, userName, cel) {

	this.lat = lat;
	this.lon = lon;
	this.address = address;
	this.userName = userName;
	this.cel = cel;

	this.checkState = function(service, taxiId) {
		window.sessionStorage.setItem("taxiId", taxiId);
		Service.onConfirm(service);
	};

	// saves the current Service to localStorage
	this.save = function() {
		localStorage.setItem(Service.name, JSON.stringify(this));
		var lastCode = 00;
		var celular = window.localStorage.getItem("celular");
		if (celular != null) {
			var lastCode = celular.substr(celular.length - 2);
		}
		solicitarServicio(address, lastCode, lat, lon, this.checkState, this);
		//esto se agrega en el servicio
		//window.setInterval(this.checkState(this), 10000);
	}
	// loads a Service from local storage
	Service.load = function() {
		var hash = localStorage.getItem(Service.name);
		return Service.build(JSON.parse(hash));
	}
	// returns null if there is no service in local storage
	Service.exists = function() {
		//TODO Esto la verdad no se en donde se tiene lo de Service.name, 
		//sería más como lo presento ahorita
		return localStorage.getItem(nameId);
	}
	// given a JSON {lat, lon,address,userName,cel} constructs a new Service
	Service.build = function(hash) {
		return new Service(hash.lat, hash.lon, hash.address, hash.userName, hash.cel);
	}
	
}

Service.onConfirm = function(data) {
	console.log(data);
}
new Service(); 