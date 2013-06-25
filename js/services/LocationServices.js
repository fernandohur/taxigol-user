var urlLastPosition = "http://arcane-lowlands-6512.herokuapp.com/positions/get_last";

//función que retorna el último método de la posición de un taxista
//@param taxiId, es el identificador del taxista. 
//@ret se retorna la latitud y la longitu
function lastPosition(taxiId) {
    if(taxiId != null) {
        var lat, lon;
        var result = [];
        $.get(urlLastPosition, {taxi_id : taxiId})
        .done(function(data) {
              lat = data.latitude;
              lon = data.longitude;
              })
    }
    result.push(lat);
    result.push(lon);
    return result;
}