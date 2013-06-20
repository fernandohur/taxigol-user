function Driver(placa, name, cel){

	this.placa = placa;
	this.name = name;
	this.cel = cel;
	this.location = null;
	
	Driver.loadData = function(){
		var taxiId = window.sessionStorage.getItem("taxiId");
		var resul = obtenerDatosTaxista(taxiId);
		this.placa = resul[0];
		this.name = resul[1];
		this.cel = resul[2]; 
	}
}