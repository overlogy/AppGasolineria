$(document).on('ready', function () {
    $("#fechaDia,#fecha1,#fecha2").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        showOn: "button",
        buttonImage: "../Content/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Seleccionar fecha",
        changeMonth: true,
        changeYear: true
    });
    $('#fechaDia,#fecha1,#fecha2').datepicker("option", "showAnim", "clip");
    $('#fechaDia,#fecha1,#fecha2').datepicker("option", "dateFormat", "dd/mm/yy");

    $('#fechaDia,#fecha1,#fecha2').attr('readonly', true);

    $('#form').on('submit', function (e) {
        e.preventDefault();
    });
    var oTable = $('#tblReportes').dataTable({
        responsive:true,
        "order": [[0, 'desc']]
    });
    
    $('#divCURSO,#divDIA,#divPERIODO').hide();
    oTable.hide();

    $('#divTurno1,#divTurno2').hide();

    $('#cboTipo').on('change', function () {
        switch($(this).val()){
            case "turnoCurso":
                $('#divDIA,#divPERIODO').hide();
                $('#divCURSO').show();
                oTable.hide();
                break;
            case "turnoCerrado":
                $('#divCURSO,#divDIA,#divPERIODO').hide();
                oTable.show();
                break;
            case "dia":
                $('#divCURSO,#divPERIODO').hide();
                $('#divDIA').show();
                oTable.hide();                
                break;
            case "periodo":
                $('#divCURSO,#divDIA').hide();
                $('#divPERIODO').show();
                oTable.hide();
                break;
            case "0":
                $('#divCURSO,#divDIA,#divPERIODO').hide();
                oTable.hide();
                break;
        }        
    });
    $('#chkR').on('change', function () {
        if ($(this).is(':checked')) {
            $('#divTurno1,#divTurno2').show();
            $('#turno1,#turno2').val('');
            $('#divFecha1,#divFecha2').hide();
        } else {
            $('#divTurno1,#divTurno2').hide();
            $('#divFecha1,#divFecha2').show();
            $('#fecha1,#fecha2').val('');
        }
    });

    $('#cboTipo').val('0');
    getDate = function (fecha) {
        var dia = fecha.substring(6, 8);
        var mes = fecha.substring(4, 6);
        var año = fecha.substring(0, 4);
        return dia + '-' + mes + '-' + año;
    };
    getTime = function (hora) {
        var segundos = hora.substring(4, 6);
        var minutos = hora.substring(2, 4);
        var horas = hora.substring(0, 2);
        return horas + ':' + minutos + ':' + segundos;
    }
    function convertDate_(inputFormat) {
        return inputFormat.substring(6, 10) + inputFormat.substring(3, 5) +inputFormat.substring(0, 2);
    }
    function convertDate(inputFormat) {
        //Convierto la fecha en formato yyyymmdd para que postgre la entienda, con la zona horario correcta,
        //de lo contrario siempre me devolveria un dia menos
        // return moment(new Date(inputFormat + 'T12:00:00Z')).format("YYYYMMDD");
        return inputFormat.substring(6, 10) + '-' + inputFormat.substring(3, 5) + '-' + inputFormat.substring(0, 2);
    }
    rptPeriodo = function () {
        if ($('#chkR').is(':checked')) {
            if ($('#turno1').val() == "" && $('#turno2').val() == "") {
                sweetAlert("Turnos incompletos", "Debe introducir ambos turnos", "error");
                return;
            }
            if ($('#turno2').val() < $('#turno1').val()) {
                sweetAlert("Turnos incorrectos", "El turno final debe ser mayor que el turno inicial", "error");
                return;
            }
        } else {
            if ($('#fecha1').val() == "" && $('#fecha2').val() == "") {
                sweetAlert("Fechas incompletas", "Debe seleccionar ambas fechas", "error");
                return;
            }
            if ($('#fecha2').val() < $('#fecha1').val()) {
                sweetAlert("Fechas incorrectas", "La fecha Final debe ser mayor que la inicial", "error");
                return;
            }
        }
        var fd = convertDate_($('#fecha1').val());
        var fh = convertDate_($('#fecha2').val());
        var mostrar = $('#chkSumar').is(':checked') ? 1 : 0;
        window.open($('#ruta_VerReportePeriodo').val() + '?fd=' + fd + '&fh=' + fh + '&mostrar=' + mostrar);
        
    };
    $('#btnTurnoCurso').on('click', function () {
        var mostrar = $('#chkSumar').is(':checked') ? 1 : 0;
        window.open($('#ruta_turnoCurso').val() + '?mostrar=' + mostrar);
    });
    rptDia = function () {
        if ($('#fechaDia').val() == "") {
            sweetAlert("Fecha inválida", "Debe seleccionar una fecha", "error");
            return;
        }
        var mostrar = $('#chkSumar').is(':checked') ? 1 : 0;
        var fecha = convertDate($('#fechaDia').val());
        window.open($('#ruta_VerReporteDia').val() + '?fecha=' + fecha + '&mostrar=' + mostrar);
    };
    reporte = function (turno, fi, hi, ff, hf, mostrar) {
        var mostrar = $('#chkSumar').is(':checked')? 1:0;
        
        window.open($('#ruta_verTurnoCerrado').val()+'?iIdTurno='+turno+'&sFechainicio='+fi+'&sHoraInicio='+hi+'&sFechaFin'+ff+'&sHoraFin='+hf+'&iMostrarSubtotal='+mostrar)
    };
    Mostrar = function () {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_CargarDatosTurnos').val()
            , beforeSend: function () {
                $('#loading').removeClass('hidden');
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
            var DATA = [];
            for (var i = 0; i < answer.length; i++) {
                var fila = {};
                fila[0] = answer[i].period_id;
                fila[1] = getDate(answer[i].period_start_date);
                fila[2] = getTime(answer[i].period_start_time);
                fila[3] = getDate(answer[i].period_end_date);
                fila[4] = getTime(answer[i].period_end_time);
                fila[5] = "<button class='btn btn-primary' onclick='reporte(`" + answer[i].period_id + "`,`" + answer[i].period_start_date + "`,`" + answer[i].period_start_time + "`,`" + answer[i].period_end_date + "`,`" + answer[i].period_end_time + "`,`0`)'>Reporte Turno Cerrado</button>";
                DATA.push(fila);
            }
            oTable.fnClearTable();
            if (DATA.length > 0) {
                oTable.fnAddData(DATA);
                oTable.fnDraw();
            } else {
                oTable.fnDraw();
            }
            $('#loading').addClass('hidden');
        });
    };
    Mostrar();
});