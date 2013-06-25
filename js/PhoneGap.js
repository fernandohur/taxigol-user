
//Esta función avisa que el dispositivo esta disponible para ser usado con phonegap.
//@param metodo, el metodo que se accede después de que el dispositivo este conectado con phonegap.
function iniciarPhonegap(metodo){
    document.addEventListener('deviceready', metodo, false);
}

//La función que hace una notificación de alerta con una ventana de dialogo
//@param message, el mensaje a mostrar en la ventana de dialogo
//@param alertCallback, el metodo que sigue después de confirmada la ventana de dialogo
//@param buttonLabel, la palabra a mostrar según el botón y la ventana de dialogo.
function notificacionAlerta(message, alertCallback, title, buttonLabel){
    navigator.notification.alert(message, alertCallback, title, buttonLabel);
}

//@param message, el mensaje a mostrar en la ventana de dialogo
//@param confirmCallback, el metodo que sigue después de confirmada la ventana de dialogo
//@param buttonLabel, la palabra a mostrar según el botón y la ventana de dialogo.
function notificacionConfirmacion(message, confirmCallback, title, buttonLabel){
    navigator.notification.confirm(message, confirmCallback, title, buttonLabel);
}