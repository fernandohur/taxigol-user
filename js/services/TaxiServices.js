var taxiUrl = "http://agile-crag-3095.herokuapp.com/taxis/";
var driverUrl = "http://agile-crag-3095.herokuapp.com/drivers/";

//función para obtener los datos del taxista
//@ret retorna los valores del taxista en un arreglo, placa, nombre, celular del taxista
//y el código de seguridad del servicio de taxi.
function obtenerDatosTaxista(taxiID, celular){
    var driverId;
    var result[];
    $.get(taxiUrl + taxiId + ".json")
    .done(function(data){
          driverId = data.current_driver_id;
          result.push(data.installation_id);
          });
    $.get(driverUrl + driverId + ".json")
    .done(function(data){
          result.push(data.name);
          result.push(data.cel_number);
          });
    if (celular != null){
        var lastCode = celular.substr(celular.length - 2);
        result.push(lastCode);
    }
    return result;
}