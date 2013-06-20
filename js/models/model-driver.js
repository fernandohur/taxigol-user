function Driver(placa, name, cel){

	this.placa = placa;
	this.name = name;
	this.cel = cel;
	this.location = null;
	
	this.save = function(){		
		localStorage.setItem(Driver.name, JSON.stringify(this));
	}

	// define class-methods (static methods)

	Driver.load = function(){
		var hash = localStorage.getItem(Driver.name);
		return Driver.build(JSON.parse(hash));
	}
	
	Driver.exists = function(){
		return localStorage.getItem(Driver.name);
	}
	
	Driver.build = function(hash){
		return new Driver(hash.placa, hash.name, hash.cel);
	}
}

new Driver();
