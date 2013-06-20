var userUrl ="http://agile-crag-3095.herokuapp.com/users.json";

function registrarUsuario(nombre, eMail, cel, metodo){
    $.post(userUrl, {
           phone_number : cel,
           email : eMail,
           name : nombre
           }).done(function(data){
                   metodo;
                   })
}

/*function exitoso(nombre, eMail, cel){
    window.localStorage.setItem("userId", 1);
    window.localStorage.setItem("nombre", nombre);
    window.localStorage.setItem("email", eMail);
    window.localStorage.setItem("celular", cel);
}*/