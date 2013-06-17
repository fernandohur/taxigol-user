function User(name, cel, email){

	this.name = name;
	this.cel = cel;
	this.email = email;

	this.save = function(){
		localStorage.setItem(User.name, JSON.stringify(this));
	}

	// define class-methods (static methods)

	User.load = function(){
		var hash = localStorage.getItem(User.name);
		return User.build(JSON.load(hash));
	}
	User.exists = function(){
		return localStorage.getItem(User.name);
	}
	User.build = function(hash){
		return new User(hash.name, hash.cel, hash.email);
	}
}

new User();
