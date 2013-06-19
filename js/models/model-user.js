function User(name, cel, email){

	this.name = name;
	this.cel = cel;
	this.email = email;

	this.save = function(){
		//localStorage.setItem(User.name, JSON.stringify(this));
		registrarUsuario(name, email, cel, User.saveData);
	}

	// define class-methods (static methods)

	User.load = function(){
		var hash = localStorage.getItem(User.name);
		return User.build(JSON.parse(hash));
	}
	User.exists = function(){
		//localStorage.getItem(User.name);
		return localStorage.getItem("name");
	}
	User.build = function(hash){
		return new User(hash.name, hash.cel, hash.email);
	}
	
	User.saveData = function(){
		window.localStorage.setItem("nombre", this.name);
    	window.localStorage.setItem("email", this.email);
    	window.localStorage.setItem("celular", this.cel);
	}
}

new User();
