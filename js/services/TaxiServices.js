var taxiUrl = "http://arcane-lowlands-6512.herokuapp.com/taxis";
var driverUrl = "http://arcane-lowlands-6512.herokuapp.com/drivers";

//función para obtener los datos del taxista
//@ret retorna los valores del taxista en un arreglo, placa, nombre, celular del taxista
//y el código de seguridad del servicio de taxi.
function obtenerDatosTaxista(taxId, metodo){
    var drivId;
    var result = new Array();
    result.push(taxId);
    $.get(taxiUrl + "/" + taxId + ".json")
    .done(function(data){
          drivId = data.current_driver_id;
          result.push(data.installation_id);
          obtenerDatosDriver(drivId, metodo, result);
          });
}


function obtenerDatosDriver(drivId, metodo, result){
    $.get(driverUrl + "/" + drivId + ".json")
    .done(function(data){
          result.push(data.name);
          result.push(data.cel_number);
          metodo(result);
          });
}