var taxiUrl = "http://arcane-lowlands-6512.herokuapp.com/taxis/";
var driverUrl = "http://arcane-lowlands-6512.herokuapp.com/drivers/";

//función para obtener los datos del taxista
//@ret retorna los valores del taxista en un arreglo, placa, nombre, celular del taxista
//y el código de seguridad del servicio de taxi.
function obtenerDatosTaxista(taxiID, metodo){
    var driverId;
    var result[];
    result.push(taxiID);
    $.get(taxiUrl + taxiId + ".json")
    .done(function(data){
          driverId = data.current_driver_id;
          result.push(data.installation_id);
          });
    $.get(driverUrl + driverId + ".json")
    .done(function(data){
          result.push(data.name);
          result.push(data.cel_number);
          metodo(result);
          });
}