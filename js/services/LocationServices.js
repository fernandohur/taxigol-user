var urlLastPosition = "http://arcane-lowlands-6512.herokuapp.com/positions/get_last.json";

//función que retorna el último método de la posición de un taxista
//@param taxiId, es el identificador del taxista. 
//@ret se retorna la latitud y la longitu
function lastPosition(taxiId) {
    var lat, lon;
    var result = [];
    var dataPrueba;
    if(taxiId) {
        $.get("http://arcane-lowlands-6512.herokuapp.com/positions/get_last.json?taxi_id=16",function(data){
              lat = data.latitude;
              lon = data.longitude;
              });
    }
    result.push(lat);
    result.push(lon);
    return result;
}