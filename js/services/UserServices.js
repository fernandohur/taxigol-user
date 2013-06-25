var userUrl ="http://arcane-lowlands-6512.herokuapp.com/users.json";

function registrarUsuario(nombre, eMail, cel, metodo){
    $.post(userUrl, {
           phone_number : cel,
           email : eMail,
           name : nombre
           }).done(function(data){
                   metodo;
                   })
}