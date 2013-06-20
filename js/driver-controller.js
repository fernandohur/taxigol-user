// ------------------------------------
// Declare variables
// ------------------------------------

//el texto de la placa del taxista 
var txtPlaca;

//Texto que mantiene el nombre del taxista
var txtDriverName;

//Texto que mantiene el celular del taxista
var txtDriverCel;

//Botón para ver el taxi en el mapa
var btnFollowTaxi;

// ------------------------------------
// Initialization code
// ------------------------------------

$(document).ready(function(){
	txtPlaca = $('#txtPlaca');
	txtDriverName = $('#txtDriverName');
	txtDriverCel = $('#txtDriverCel');
	btnFollowTaxi = $('#btnFollowTaxi');
	btnFollowTaxi.click(handleFollowClick);
	
});

function goToFollowPage(){
	$.mobile.changePage( "#follow-page",{ transition: "flip"});
}

function updateDriverLabels(){
	var driver = Driver.load();
	txtPlaca.val(driver.placa);
	txtDriverCel.val(driver.cel);
	txtDriverName.val(driver.name);	
}

function handleFollowClick(){
	
	goToFollowPage();
}


