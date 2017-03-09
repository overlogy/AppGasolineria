$(document).on('ready', function () {
    $('#contenedorFormulario').hide();
    var n = 0;
    $('#abrirForm').on('click', function () {
        if (n % 2 == 0) {
            MostrarModulos();
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
    $('#btnCancelar').on('click', function () {
        $('#loading').addClass('hidden');
        $('#btnAccion').html('<i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i> Guardar');
        $('#btnAccion').addClass('btn-success');
        $('#btnAccion').removeClass('btn-warning');
        limpiar();
    });
    limpiar = function () {
        tblModulosPermitidos.fnClearTable();
        tblModulos.fnClearTable();
        $('#txtTipoUsuario').val('');
        $('#divTipoUsuario').removeClass('has-error');
    }
    eliminar_tipo = function (id, tipo) {
        swal({
            title: "Eliminar tipo de Usuario?",
            text: "Estás seguro de eliminar este tipo de Usuario?",
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
                    url: $('#ruta_DeleteTipo').val(),
                    data:
                        {
                            'id': id
                        }
                }).done(function (respuesta) {
                    if (respuesta == "SI") {
                        swal("Éxito!", "Tipo de Usuario eliminado", "success");
                        Mostrar();
                        return;
                    }
                    if (respuesta == "NO") {
                        sweetAlert("Error", "El tipo de Usuario no fue eliminado", "error");
                        return;
                    }
                    sweetAlert("Error", respuesta, "error");
                });
            }
        });
    };
    editar_tipo = function (id, tipo) {
        $('#divError2').addClass('hidden');
        $('#MensajeError2').val('');
        $('#divTipoUsuario').removeClass('has-error');
        $('#txtTipoUsuario').val(tipo);
        $('#tipousuario2').val(id);


        $.ajax({
            type: 'GET',
            url: $('#ruta_getModulosPermitidos').val() + '?idtipo=' + id

        }).done(function (answer) {
            var data = JSON.parse(answer);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError2').removeClass('hidden');
                $('#MensajeError2').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var DATA = [];
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].id;
                fila[1] = answer[i].nombre;
                fila[2] = answer[i].valor;
                fila[3] = "<button class='btn btn-danger btn_quitar' onclick='quitar(`" + answer[i].id + "`,`" + answer[i].nombre + "`,`" + answer[i].valor + "`)'>Quitar</button>";
                DATA.push(fila);
            }
            tblModulosPermitidos.fnClearTable();
            if (DATA.length > 0) {
                tblModulosPermitidos.fnAddData(DATA);
            }
            tblModulosPermitidos.fnDraw();
        });
        $('#divError3').addClass('hidden');
        $('#MensajeError3').val('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_getModulosRestantes').val() + '?idtipo=' + id

        }).done(function (answer) {
            var data = JSON.parse(answer);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError3').removeClass('hidden');
                $('#MensajeError3').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var DATA = [];
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].id;
                fila[1] = answer[i].nombre;
                fila[2] = answer[i].valor;
                fila[3] = "<button class='btn btn-success btn_permitir' onclick='permitir(`" + answer[i].id + "`,`" + answer[i].nombre + "`,`" + answer[i].valor + "`)'>Permitir</button>";
                DATA.push(fila);
            }
            tblModulos.fnClearTable();
            if (DATA.length > 0) {
                tblModulos.fnAddData(DATA);
            }
            tblModulos.fnDraw();
        });



        $('#btnAccion').html('<i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i> Guardar Cambios');
        $('#btnAccion').removeClass('btn-success');
        $('#btnAccion').addClass('btn-warning');

        $('#contenedorFormulario').fadeIn();
        $('#abrirForm').html('<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i> Cerrar');
        $('#abrirForm').removeClass('btn-success');
        $('#abrirForm').addClass('btn-primary');
        n++;
    };
    var tblModulos = $('#tblModulos').dataTable({
        responsive: true,
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    });

    var tblModulosPermitidos = $('#tblModulosPermitidos').dataTable({
        responsive: true,
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    });
    var tblTipos = $('#tblTipoUsuarios').dataTable(
        {
            responsive: true
        }
    );
    MostrarModulos = function () {
        $('#divError3').addClass('hidden');
        $('#MensajeError3').val('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_getModulos').val(),
            beforeSend: function () {
                $('#loading').removeClass('hidden');
            }
        }).done(function (answer) {
            var data = JSON.parse(answer);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError3').removeClass('hidden');
                $('#MensajeError3').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var DATA = [];
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].id;
                fila[1] = answer[i].nombre;
                fila[2] = answer[i].valor;
                fila[3] = "<button class='btn btn-success btn_permitir' onclick='permitir(`" + answer[i].id + "`,`" + answer[i].nombre + "`,`" + answer[i].valor + "`)'>Permitir</button>";
                DATA.push(fila);
            }

            tblModulos.fnClearTable();
            if (DATA.length > 0) {
                tblModulos.fnAddData(DATA);
                tblModulos.fnDraw();
            } else {
                tblModulos.fnDraw();
            }
        });
    };
    Mostrar = function () {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $.ajax({
            type: 'POST',
            url: $('#ruta_getTipos').val(),
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
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].id_tipo;
                fila[1] = answer[i].tipo;
                var editar = "<button class='btn btn-warning' onclick='editar_tipo(`" + answer[i].id_tipo + "`,`" + answer[i].tipo + "`)'><i class='fa fa-pencil fa-2x' aria-hidden='true'></i> Editar</button>";
                var eliminar = "<button class='btn btn-danger' onclick='eliminar_tipo(`" + answer[i].id_tipo + "`,`" + answer[i].tipo + "`)'><i class='fa fa-trash fa-2x' aria-hidden='true'></i> Eliminar</button>";

                fila[2] = editar + eliminar;
                DATA.push(fila);
            }

            tblTipos.fnClearTable();
            if (DATA.length > 0) {
                tblTipos.fnAddData(DATA);
            }
            tblTipos.fnDraw();
        });
    };
    $(tblModulos).on('click', '.btn_permitir', function () {
        var boton = $(this);
        tblModulos.fnDeleteRow(boton.parents('tr'));
    });
    $(tblModulosPermitidos).on('click', '.btn_quitar', function () {
        var boton = $(this);
        tblModulosPermitidos.fnDeleteRow(boton.parents('tr'));
    });

    permitirTodo = function () {
        $('.btn_permitir').click();
    }
    denegarTodo = function () {
        $('.btn_quitar').click();
    }

    permitir = function (id, modulo, clave) {
        tblModulosPermitidos.fnAddData([
         id,
         modulo,
         clave,
         "<button class='btn btn-danger btn_quitar' onclick='quitar(`" + id + "`,`" + modulo + "`,`" + clave + "`)'>Quitar</button>"]);
    };
    quitar = function (id, modulo, clave) {
        tblModulos.fnAddData([
         id,
         modulo,
         clave,
         "<button class='btn btn-success btn_permitir' onclick='permitir(`" + id + "`,`" + modulo + "`,`" + clave + "`)'>Permitir</button>"]);
    }
    Mostrar();
    $('#form_tipo_usuarios').on('submit', function (e) {
        e.preventDefault();
        var texto = $('#btnAccion').html();
        var accion = "";
        var url = "";
        if (texto == '<i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i> Guardar') {
            url = $('#ruta_AddTipo').val();
            accion = "guardar_tipo";
        } else if (texto == '<i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i> Guardar Cambios') {
            url = $('#ruta_EditTipo').val();
            accion = "editar_tipo";
        }

        var DATA = [];
        var rows = tblModulosPermitidos.fnGetNodes();
        for (var i = 0; i < rows.length; i++) {
            var mini = { 'Id': $(rows[i]).find("td:eq(0)").html(), 'Modulo': $(rows[i]).find("td:eq(1)").html(), 'Clave': $(rows[i]).find("td:eq(2)").html() };
            DATA.push(mini);
        }

        if ($('#txtTipoUsuario').val() != "") {
            $.ajax({
                type: 'POST',
                url: url,
                data:
                    {
                        'tipo': $('#txtTipoUsuario').val(),
                        'id': $('#tipousuario2').val(),
                        'modulos': DATA
                    },
                beforeSend: function () {
                    $('#loading').removeClass('hidden');
                }
            }).done(function (respuesta) {
                if (respuesta == "SI") {
                    if (accion == "guardar_tipo") {
                        swal("Exito", "Tipo de Usuario registrado", "success");
                    } else if (accion == "editar_tipo") {
                        swal("Exito", "Tipo de Usuario editado", "success");
                    }
                    Mostrar();
                    $('#btnCancelar').click();
                    $('#contenedorFormulario').fadeOut();
                    $('#abrirForm').html('<i class="fa fa-plus-square fa-2x" aria-hidden="true"></i> Agregar Nuevo');
                    $('#abrirForm').removeClass('btn-primary');
                    $('#abrirForm').addClass('btn-success');
                    n++;
                } else if (respuesta == "NO") {
                    if (accion == "guardar_tipo") {
                        sweetAlert("Alerta", "No se puede guardar el Tipo de Usuario", "error");
                    } else if (accion == "editar_tipo") {
                        sweetAlert("Alerta", "No se puede editar el Tipo de Usuario", "error");
                    }
                } else {
                    sweetAlert("Alerta", "Ocurrio un error: " + respuesta, "error");
                }
                $('#loading').addClass('hidden');
            });
        }
        else {
            sweetAlert("Alerta", "Debe introducir el Tipo de Usuario", "error");
        }
    });
});