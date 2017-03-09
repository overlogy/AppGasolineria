$(document).on('ready', function () {
    $('#contenedorFormulario').hide();
    var n = 0;
    $('#abrirForm').on('click', function () {
        if (n % 2 == 0) {
            $('#contenedorFormulario').fadeIn();
            $(this).html('<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i> Cerrar');
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            $('#btnCancelar').click();
        } else {
            $('#contenedorFormulario').fadeOut();
            $(this).html('<i class="fa fa-plus-square fa-2x" aria-hidden="true"></i> Agregar Nuevo');
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            $('#btnCancelar').click();
        }
        n++;
    });
    var tblUsuarios = $('#tblUsuarios').dataTable({
        "columnDefs": [
            {
                "targets": [0, 3],
                "visible": false,
                "searchable": false
            }],
        responsive: true
    });
    var tblPermisos = $('#tblPermisos').dataTable(
        {
            "columnDefs": [
               { className: "text-center", "targets": [0] }
            ]
        }
    );

    cargarTipos = function () {
        $('#divError2').addClass('hidden');
        $('#MensajeError2').val('');
        $('#cboTipoUsuario').html("<option value='0'>Seleccione un tipo</option>");
        $.ajax({
            type: 'GET',
            url: $('#ruta_GetTipos').val()
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
            for (var i = 0; i < answer.length; i++) {
                $('#cboTipoUsuario').append("<option value='" + answer[i].id_tipo + "'>" + answer[i].tipo + "</option>");
            }

        });
    };
    cargarTipos();

    $('#btnCancelar').on('click', function () {
        $('#loading').addClass('hidden');
        $('#btnAccion').html('<i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i> Guardar');
        $('#btnAccion').addClass('btn-success');
        $('#btnAccion').removeClass('btn-warning');
        limpiar();
    });
    limpiar = function () {
        $('#txtUsuario,#txtContraseña,#txtContraseña2').val('');
        $('#cboTipoUsuario').val('0');
        $('#divUsuario,#divPw1,#divPw2,#divTipoUsuario').removeClass('has-error');
    };
    eliminar_usuario = function (id) {
        swal({
            title: "Eliminar Usuario?",
            text: "Estás seguro de eliminar este Usuario?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si!",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: 'POST',
                    url: $('#ruta_DeleteUsuario').val(),
                    data:
                        {
                            'id': id
                        }
                }).done(function (respuesta) {
                    if (respuesta == "SI") {
                        swal("Éxito!", "Usuario eliminado", "success");
                        Mostrar();
                        return;
                    }
                    if (respuesta == "NO") {
                        sweetAlert("Error", "ElUsuario no fue eliminado", "error");
                        return;
                    }
                    sweetAlert("Error", respuesta, "error");
                });
            }
        });
    }
    ver_permisos = function (id) {
        $('#divError3').addClass('hidden');
        $('#MensajeError3').val('');
        $('#btnAbrirPermisosModal').click();
        $.ajax({
            type: 'GET',
            url: $('#ruta_getModulosPermitidos').val() + '?idtipo=' + id

        }).done(function (answer) {
            var data = JSON.parse(answer);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError').removeClass('hidden');
                $('#MensajeError').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var DATA = [];
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].nombre;
                DATA.push(fila);
            }
            tblPermisos.fnClearTable();
            if (DATA.length > 0) {
                tblPermisos.fnAddData(DATA);
            }
            tblPermisos.fnDraw();
        });
    }
    editar_usuario = function (id, usuario, clave, idtipo) {
        $('#divUsuario,#divPw1,#divPw2,#divTipoUsuario').removeClass('has-error');

        $('#usuario2').val(id);
        $('#cboTipoUsuario').val(idtipo)
        $('#txtContraseña,#txtContraseña2').val(clave);
        $('#txtUsuario').val(usuario);

        $('#btnAccion').html('<i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i> Guardar Cambios');
        $('#btnAccion').removeClass('btn-success');
        $('#btnAccion').addClass('btn-warning');

        $('#contenedorFormulario').fadeIn();
        $('#abrirForm').html('<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i> Cerrar');
        $('#abrirForm').removeClass('btn-success');
        $('#abrirForm').addClass('btn-primary');
        n++;
    }
    Mostrar = function () {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_getUsuarios').val(),
            beforeSend: function () {
                $('#loading').removeClass('hidden');
            }
        }).done(function (answer) {
            var data = JSON.parse(answer);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError').removeClass('hidden');
                $('#MensajeError').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var DATA = [];
            console.log(answer);
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].id_usuario;
                fila[1] = answer[i].nombre_usuario;
                fila[2] = answer[i].clave;
                fila[3] = answer[i].idtipo_usuario;
                fila[4] = answer[i].tipo_usuario;
                fila[5] = "<button class='btn btn-primary' onclick='ver_permisos(`" + answer[i].idtipo_usuario + "`)'>Permisos</button>";

                var editar = "<button class='btn btn-warning' onclick='editar_usuario(`" + answer[i].id_usuario + "`,`" + answer[i].nombre_usuario + "`,`" + answer[i].clave + "`,`" + answer[i].idtipo_usuario + "`)'><i class='fa fa-pencil fa-2x' aria-hidden='true'></i> Editar</button>";
                var eliminar = "<button class='btn btn-danger' onclick='eliminar_usuario(`" + answer[i].id_usuario + "`)'><i class='fa fa-trash fa-2x' aria-hidden='true'></i> Eliminar</button>";

                fila[6] = editar + eliminar;
                DATA.push(fila);
            }

            tblUsuarios.fnClearTable();
            if (DATA.length > 0) {
                tblUsuarios.fnAddData(DATA);
            }
            tblUsuarios.fnDraw();
        });
    };
    Mostrar();

    $('#form_usuarios').on('submit', function (e) {
        e.preventDefault();
        var texto = $('#btnAccion').html();
        var accion = "";
        var url = "";
        if (texto == '<i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i> Guardar') {
            url = $('#ruta_AddUsuario').val();
            accion = "guardar_usuario";
        } else if (texto == '<i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i> Guardar Cambios') {
            url = $('#ruta_EditUsuario').val();
            accion = "edit_usuario";
        }

        if ($('#txtUsuario').val() != "" && $('#txtContraseña').val() != ""
            && $('#txtContraseña2').val() != "" && $('#cboTipoUsuario').val() != "0") {

            if ($('#txtContraseña').val() != $('#txtContraseña2').val()) {
                sweetAlert("Validación", "Las contraseñas no coinciden", "error");
                return;
            }
            $.ajax({
                type: 'POST',
                url: url,
                data:
                {
                    'usuario': $('#txtUsuario').val(),
                    'clave': $('#txtContraseña').val(),
                    'idtipo': $('#cboTipoUsuario').val(),
                    'id': $('#usuario2').val()
                },
                beforeSend: function () {
                    $('#loading').removeClass('hidden');
                }
            }).done(function (respuesta) {
                if (respuesta == "SI") {
                    if (accion == "guardar_usuario") {
                        swal("Exito", "Usuario registrado", "success");
                    } else if (accion == "edit_usuario") {
                        swal("Exito", "Usuario editado", "success");
                    }
                    Mostrar();
                    $('#btnCancelar').click();
                    $('#contenedorFormulario').fadeOut();
                    $('#abrirForm').html('<i class="fa fa-plus-square fa-2x" aria-hidden="true"></i> Agregar Nuevo');
                    $('#abrirForm').removeClass('btn-primary');
                    $('#abrirForm').addClass('btn-success');
                    n++;
                } else if (respuesta == "NO") {
                    if (accion == "guardar_usuario") {
                        sweetAlert("Alerta", "No se puede guardar el Usuario", "error");
                    } else if (accion == "edit_usuario") {
                        sweetAlert("Alerta", "No se puede editar el Usuario", "error");
                    }
                } else {
                    sweetAlert("Alerta", "Ocurrio un error: " + respuesta, "error");
                }
                $('#loading').addClass('hidden');
            });

        } else {
            sweetAlert("Validación", "Debe completar los campos", "error");
        }
    });
});