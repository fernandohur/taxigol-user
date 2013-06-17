var txtName;
var txtCel;
var txtEmail;
var btnRegister;

$(document).ready(function(){


	txtName = $('#txtName');
	txtCel = $('#txtCel');
	txtEmail = $('#txtEmail');
	btnRegister = $('#btnRegister');
	btnRegister.click(handleClickRegister);

});

$('#page-register').on("pagecreate", pageSet);
$('#page-register').on("pageshow", pageSet);

function pageSet(event) {
	if (User.exists()){
		goToMapPage();
	}
}

function goToMapPage(){
	$.mobile.changePage( "#map-page",{ transition: "flip"});
}

function handleClickRegister(){
	var name = txtName.val();
	var cel = txtCel.val();
	var email = txtEmail.val();
	user = User.build({name:name, cel:cel, email:email });
	user.save();
	goToMapPage();
}



