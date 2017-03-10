$(document).on('ready', function () {
    cargarDispensadores = function () {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $('#cboDispensador').html('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_getDispensadores').val()
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
                $('#cboDispensador').append('<option value="' + answer[i].id_relacion + '">Dispensador ' + answer[i].id_relacion + '</option>');
            }            
        });
    };
    var ladoA=1;
    var ladoB=2;
    VerData = function (lado1, lado2) {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_VerData').val() + '?lado1=' + lado1 + '&lado2=' + lado2
        }).done(function (respuesta) {
            var data = JSON.parse(respuesta);
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError').removeClass('hidden');
                $('#MensajeError').html(error);
                return;
            }
            $('#txtTurnoA').html(data.turnoA);
            $('#txtTurnoB').html(data.turnoB);
            $('#fechaA').html('Última Fecha Cierre: ' + data.fechaA);
            $('#fechaB').html('Última Fecha Cierre: ' + data.fechaB);
            $('#ladoA').html('Lado ' + data.ladoA);
            $('#ladoB').html('Lado ' + data.ladoB);
            calcularMontoPorLado("contenidoA", ladoA);
            calcularMontoPorLado("contenidoB",ladoB);
        });
    };
    VerData(ladoA,ladoB);
    cargarDispensadores();

    cleanData = function () {
        $('#contenidoA,#contenidoB').html('');
    };
    lado = function (id_relacion) {
        $.ajax({
            type: 'GET',
            url: $('#ruta_Pump').val() + '?id_relacion=' + id_relacion
        }).done(function (respuesta) {
            var respuesta = JSON.parse(respuesta);
            $('#ladoA').html('Lado ' + respuesta.min);
            $('#ladoB').html('Lado ' + respuesta.max);
            ladoA = respuesta.min;
            ladoB = respuesta.max;
            VerData(ladoA, ladoB);
        });        
        
    };

    $('#cboDispensador').on('change', function () {
        var id_relacion = $(this).val();
        if (id_relacion != null) {
            lado(id_relacion);
            cleanData();            
        }
    });

    function existeVentas(lado,callBack) {
        return $.ajax({
            type: 'GET',
            url: $('#ruta_ExisteVentaParaEsteLado').val() + '?id_relacion=' + lado
        }).done(callBack);
    }
    function cerrarTurno(lado, callBack) {
        return $.ajax({
            type: 'GET',
            url: $('#ruta_CerrarTurno').val() + '?pump=' + lado
        }).done(callBack);
    }

    function preguntar(titulo, text, confirmButtonText,confirmButtonColor, cancelButtonText, callback) {
        return swal({
            title: titulo,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            closeOnConfirm: false,
            closeOnCancel: false
        },callback);
    }

    ejecutarCierre = function (lado) {
        //Si confirmo la primera pregunta
        existeVentas(lado, function (data) {
            if (data == '"NO"') {
                preguntar("No hay Ventas",
                    "No existen ventas para el lado " + lado + ", desea continuar?",
                    "Si",
                    "#E1D341",
                    "No",
                    function (confirmado) {
                        if (confirmado) {
                            cerrarTurno(lado, function (dato) {
                                console.log(dato);
                                if (dato == "SI") {
                                    swal("Turno Cerrado", "Turno cerrado correctamente", "success");
                                    VerData(ladoA, ladoB);
                                } else {
                                    swal("OCurrió un error en el cierre del turno", dato, "error");
                                }
                            });

                        } else {
                            sweetAlert("Aviso", "La operación fue cancelada", "error");
                        }
                    });
            }
            else if (data == '"SI"') {
                cerrarTurno(lado, function (respuesta) {
                    console.log(respuesta);
                    if (respuesta == "SI") {
                        swal("Turno Cerrado", "Turno cerrado correctamente", "success");
                    } else {
                        swal("OCurrió un error en el cierre del turno", respuesta, "error");
                    }
                });
            }
        });
    }
    procesoCerrar = function (lado) {        
        preguntar("Aviso",
            "Está seguro de cerrar el lado " + lado + "?",
            "Continuar",
            "#57D850",
            "No",
            function (isConfirm) {
                if (isConfirm) {
                    ejecutarCierre(lado);
                }
                else {
                    sweetAlert("Aviso", "La operación fue cancelada", "error");
                }
            }
        );
    }
    calcularMontoPorLado = function (contenido, lado) {
        $.ajax({
            type: 'GET',
            url: $('#ruta_CalcularMontoPorLado').val() + '?pump=' + lado
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
            $('#' + contenido).html('');
            var tabla = "";
            for (var i = 0; i < answer.length; i++) {
                tabla += "<tr>"+
                    "<td>" + answer[i].hose_id+"</td>" +
                    "<td>" + answer[i].money+"</td>" +
                    "<td>" + answer[i].total+"</td>" +                   
                    "</tr>";
            }
            $('#' + contenido).html(tabla);            
        });
    }
    $('#btnCerrarDispensador').on('click', function () {
      
        
    });
    $('#cerrarA').on('click', function () {
        procesoCerrar(ladoA);        
    });
    $('#cerrarB').on('click', function () {
        procesoCerrar(ladoB);        
    });
});