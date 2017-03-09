$(document).on('ready', function () {
    $('#form_login').on('submit', function (e) {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        e.preventDefault();
        var usuario = $('#signup-email').val();
        var contraseña = $('#signup-password').val();
        if (usuario != "" && contraseña != "") {
            $.ajax({
                type: 'POST',
                url: $('#ruta_Logear').val(),
                data:
                {
                    'user': usuario,
                    'password': contraseña
                }
            }).done(function (respuesta) {
                var data = JSON.parse(respuesta);
                var json = data.json;//Obtiene los json 
                var error = data.error;//Obtiene los posibles errores

                if (error != "") {
                    $('#divError').removeClass('hidden');
                    $('#MensajeError').html(error);
                    return;
                }
                var answer = JSON.parse(json);
                if (answer.length == 0) {
                    sweetAlert("ACCESO DENEGADO", "Usuario o Contraseña incorrecta.", "error");
                    return;
                }
                              
                var id = answer[0].id_usuario;
                var usuario = answer[0].id_usuario;
                var nombre = answer[0].nombre_usuario;
                if (id != undefined &&
                    usuario != undefined &&
                    nombre != undefined) {
                    $.ajax({
                        type: 'POST',
                        url: $('#ruta_ConcederAcceso').val(),
                        data:
                        {
                            'Id': id,
                            'Usuario': usuario,
                            'Nombre': nombre
                        }
                    }).done(function (respuesta) {
                        if (respuesta == "CONCEDIDO") {
                            window.location.href = $('#ruta_redireccion').val();
                        } else {
                            sweetAlert("ACCESO DENEGADO", "No se le ha concedido el acceso al sistema", "error");
                        }
                    });
                    return;
                } else {
                    sweetAlert("ACCESO DENEGADO", "No se le ha concedido el acceso al sistema", "error");
                }

                

            });
        } else {
            sweetAlert("Campos incompletos", "Debe completar el usuario y contraseña", "error");
        }
    });
});