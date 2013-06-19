// es el valor que indica si un servicio fue confirmado.
var confirmado = false;

//La url con la que se conecta para solicitar el servicio.
var servicesUrl =  "http://agile-crag-3095.herokuapp.com/services";


//esta función hace una solicitud de un servicio de taxi.
//@param direccion, es la dirección que se envía al taxista para la solicitud del servicio
//@param lastCode, es el código de seguridad del servicio de taxi
//@param lat, la latitud de la ubicación de la persona.
//@param lng, la longitud de la ubicación de la persona. 
function solicitarServicio(direccion, lastCode, lat, lng){
    $.post(servicesUrl + ".json", {
           address : direccion,
           verification_code : lastCode,
           latitude: lat,
           longitude: lng
           }).done(function(data) {
                   var serviceId = data.id;
                   var x = setInterval(function() {
                                       if (confirmado === false) {
                                       getState(serviceId);
                                       }else if(confirmado === true)
                                       {
                                       clearInterval(x);
                                       }
                                       }, 2000);
                   });

}


//Esta función indica el estado de la solicitud de un servicio de taxi dado un serviceId
//@param serviceId, es el identificador del servicio de taxi. 
function getState(serviceId) {
	$.get(servicesUrl + "/"+ serviceId + ".json")
    .done(function(data) {
          if (data.state === "confirmado") {
          confirmado = true;
          var taxId = data.taxi_id;
          window.sessionStorage.setItem("taxiId", taxId);
          }
          });
    
}