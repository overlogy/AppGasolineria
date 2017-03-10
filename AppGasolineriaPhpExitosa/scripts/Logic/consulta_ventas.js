$(document).on('ready', function () {
    $("#fDesde,#fHasta").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        showOn: "button",
        buttonImage: "../Content/images/calendar.png",
        buttonImageOnly: false,
        buttonText: "Seleccionar fecha",
        changeMonth: true,
        changeYear: true
    });
    $('#fDesde,#fHasta').datepicker("option", "showAnim", "clip");
    $('#fDesde,#fHasta').datepicker("option", "dateFormat", "dd/mm/yy");

    $('#fDesde,#fHasta').attr('readonly', true);

    $('#tblConsultas').dataTable({
        responsive: true
    });

    
    GetPumps = function () {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        var cboPumps = $('#cboSurtidores');
        cboPumps.html('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_GetPumps').val()
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
                cboPumps.append('<option id="' + answer[i].pump_id + '">' + answer[i].surtidor + '</option>');

            }
        });
    };
    GetPumps();
    GetProducts = function () {
        $('#divError2').addClass('hidden');
        $('#MensajeError2').val('');
        var cboProducts = $('#cboProductos');
        cboProducts.html('');
        $.ajax({
            type: 'GET',
            url: $('#ruta_GetProducts').val()
        }).done(function (respuesta) {
            var data = JSON.parse(respuesta);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError2').removeClass('hidden');
                $('#MensajeError2').html(error);
                return;
            }

            var answer = JSON.parse(json);
            for (var i = 0; i < answer.length; i++) {
                cboProducts.append('<option id="' + answer[i].tkt_plu_id + '">' + answer[i].tkt_plu_short_desc + '</option>');
            }
        });
    };
    GetProducts();

    $("#btnGG").click();

        
    $('#divTabla,#divReports').hide();
    
    function convertDate(inputFormat) {
        //Convierto la fecha en formato yyyymmdd para que postgre la entienda, con la zona horario correcta,
        //de lo contrario siempre me devolveria un dia menos
       // return moment(new Date(inputFormat + 'T12:00:00Z')).format("YYYYMMDD");
        return inputFormat.substring(6, 10) + inputFormat.substring(3, 5) + inputFormat.substring(0, 2);
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    Consultar = function () {

        $('#divTabla').show();
        $('#divReports').hide();
        if ($('#fDesde').val() !== "" && $('#hDesde').val() !== "" &&
            $('#fHasta').val() !== "" && $('#hHasta').val() !== "") {
            var FechaDesde = convertDate($('#fDesde').val());
            var HoraDesde = $('#hDesde').val();
            var FechaHasta = convertDate($('#fHasta').val());
            var HoraHasta = $('#hHasta').val();
            var selectedPumpsId = "0";
            var selectedProductosId = "0";
            HoraDesde = HoraDesde.substring(0, 2) + HoraDesde.substring(3, 5) + '00';
            HoraHasta = HoraHasta.substring(0, 2) + HoraHasta.substring(3, 5) + '00';
            $('#cboSurtidores option:selected').each(function () {
                var id_surtidor = $(this).attr('id');
                //Si es numerico lo mando asi (1,2,3)
                if (isNumber(id_surtidor)) {
                    selectedPumpsId += "," + id_surtidor;
                } else {//Si no es numero lo encierro en comillas (1,'ddsd',2)
                    selectedPumpsId += ",'" + id_surtidor+"'";
                }                
            });

            $('#cboProductos option:selected').each(function () {
                var id_producto = $(this).attr('id');
                //Si es numerico lo mando asi (1,2,3)
                if (isNumber(id_producto)) {
                    selectedProductosId += "," + id_producto;
                } else {//Si no es numero lo encierro en comillas (1,'propey',2)
                    selectedProductosId += ",'" + id_producto+"'";
                }
                                
            });
            var monto = 0;
            var volumen = 0;
            var cantidad = 0;
            $.ajax({
                type: 'POST',
                url: $('#ruta_ConsultarVentas').val(),
                data:
                {
                    'fDesde': FechaDesde,
                    'fHasta': FechaHasta,
                    'tDesde': HoraDesde,
                    'tHasta': HoraHasta,
                    'selectedPumpsId': selectedPumpsId,
                    'selectedProductosId': selectedProductosId
                },
                beforeSend: function () {
                    $('#loading').removeClass('hidden');
                }
            }).done(function (respuesta) {
                var data = JSON.parse(respuesta);
                var json = data.json;//Obtiene los json 
                var error = data.error;//Obtiene los posibles errores

                if (error != "") {
                    $('#divError4').removeClass('hidden');
                    $('#MensajeError4').html(error);
                    return;
                }
                var answer = JSON.parse(json);

                var DATA = [];
                for (var i = 0; i < answer.length; i++) {
                    var fila = {};
                    fila[0] = answer[i].id;
                    fila[1] = answer[i].starttime;
                    fila[2] = answer[i].endtime;
                    fila[3] = answer[i].startdate;
                    fila[4] = answer[i].enddate;
                    fila[5] = answer[i].pumpid;
                    fila[6] = answer[i].producto;
                    fila[7] = answer[i].volume;
                    fila[8] = answer[i].money;
                    fila[9] = answer[i].initialvolume;
                    fila[10] = answer[i].finalvolume;
                    DATA.push(fila);

                    volumen += Number(answer[i].finalvolume) - Number(answer[i].initialvolume);
                    monto += Number(answer[i].money);
                    cantidad++;
                }
                $('#txtMontoVendido').val('RD$.' + monto.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                $('#txtVolumenVendido').val('Vol. ' + volumen.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                $('#txtCantidadDespachada').val(cantidad);
                var oTable = $('#tblConsultas').dataTable();
                oTable.fnClearTable();
                if (DATA.length > 0) {
                    oTable.fnAddData(DATA);
                }
                oTable.fnDraw();
                $('#loading').addClass('hidden');
            });
        } else {
            var errores = "";
            if ($('#fDesde').val() === "") {
                errores += "\n☻Debe introducir la Fecha Inicial";
            }
            if ($('#hDesde').val() === "") {
                errores += "\n☻Debe introducir la Hora Inicial";
            }
            if ($('#fHasta').val() === "") {
                errores += "\n☻Debe introducir la Fecha Final";
            }
            if ($('#hHasta').val() === "") {
                errores += "\n☻Debe introducir la Hora Final";
            }
            sweetAlert("Campos incompletos", errores, "error");
        }

    };
    enviar_Ajax_Reporte = function (FechaDesde, HoraDesde, FechaHasta, HoraHasta, selectedPumpsId, selectedProductoId, tp) {
        
        $('#divError3').addClass('hidden');
        $('#MensajeError3').val('');
        var HDesde = HoraDesde.substring(0, 2) + HoraDesde.substring(3, 5) + '00';
        var HHasta = HoraHasta.substring(0, 2) + HoraHasta.substring(3, 5) + '00';
        $.ajax({
            type: 'POST',
            url: $('#ruta_ReporteVentas').val(),

            data:
            {
                'fDesde': FechaDesde,
                'fHasta': FechaHasta,
                'tDesde': HDesde,
                'tHasta': HHasta,
                'selectedPumpsId': selectedPumpsId,
                'selectedProductosId': selectedProductoId,
                'tp':tp
            }
            , beforeSend: function () {
                $('#loading').removeClass('hidden');
            }
        }).done(function (respuesta) {
            var data = JSON.parse(respuesta);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError3').removeClass('hidden');
                $('#MensajeError3').html(error);
                return;
            }
            var answer = JSON.parse(json);
            if (selectedProductoId == 888) {//Si es reporte PIE, cuando es un reprote CIRCULAR, no es por hora

                for (var i = 0; i < answer.length; i++) {
                    var mini = [];
                    //tp quiere decir Tipo_reporte, todos los reportes pasan por la funcion Reporte y se le pasa un
                    //parametro texto ("tipo_reporte") con su nombre de reporte clave
                    if (tp == "venta/producto") {
                        mini = { name: answer[i].combustible, y: answer[i].volumen };
                    } else if (tp = "monto/producto") {
                        mini = { name: answer[i].combustible, y: answer[i].money };
                    }
                    //Agrego esa mini-estructura a la variable global SALES, de ahi halo la data para todos los
                    //reportes
                    agregarALasSeries(mini);
                }

                //De lo contrario si es por hora y por eso declaro las 24 horas en esa estructura
            } else {
                var HORAS = [{ '00': 0 }, { '01': 0 }, { '02': 0 }, { '03': 0 }, { '04': 0 }, { '05': 0 },
                         { '06': 0 }, { '07': 0 }, { '08': 0 }, { '09': 0 }, { '10': 0 }, { '11': 0 },
                         { '12': 0 }, { '13': 0 }, { '14': 0 }, { '15': 0 }, { '16': 0 }, { '17': 0 },
                         { '18': 0 }, { '19': 0 }, { '20': 0 }, { '21': 0 }, { '22': 0 }, { '23': 0 }
                ];

                var combustible = "";
                
                for (var i = 0; i < answer.length; i++) {
                    
                    //Obtengo 
                    //Si seleccione por lo menos un combustible, cada serie ocupara el nombre de ese combustible

                    if ($("#cboProductos option:selected").length > 0) {
                        combustible = answer[i].combustible;
                    } else {
                        //De lo contrario solo generara 1 sola seria de todos los combustibles, por eso se llama Combustible
                        combustible = "Combustible";
                    }
                    
                    //Lleno la data segun el tipo de reporte (Estos son por hora)
                    if (tp == "hora/producto") {
                        HORAS[Number(answer[i].hora)][answer[i].hora] = answer[i].volumen;
                    } /*else if (tp == "hora/surtidor") {
                        HORAS[Number(answer[i].hora)][answer[i].hora] = answer[i].surtidor;
                    }*/ else if (tp == "hora/monto") {
                        HORAS[Number(answer[i].hora)][answer[i].hora] = answer[i].money;
                    }

                }
                
                var data_serie = [];
                //creo un arreglo para guardar todas las horas de un combustible
                for (var i = 0; i < HORAS.length; i++) {
                    if (i < 10) {
                        var index = '0' + i.toString();
                        data_serie.push(HORAS[i][index]);                       
                    } else {
                        data_serie.push(HORAS[i][i]);
                    }                   
                }
                var mini_serie = { name: combustible, data: data_serie };
                if (mini_serie.name != "") {
                    agregarALasSeries(mini_serie);
                    //Y al final mando todo eso para sales
                }
            }
            
        });
    };
    VentasYVolumenByHoraAndSurtidor = function (FechaDesde,HoraDesde, FechaHasta,HoraHasta, idsurtidor, especifico) {
        $('#divError5').addClass('hidden');
        $('#MensajeError5').val('');
        $.ajax({
            type: 'POST',
            url: $('#ruta_VentasYVolumenByHoraAndSurtidor').val(),
            data:
            {
                'fDesde': FechaDesde,
                'tDesde':HoraDesde,
                'fHasta': FechaHasta,
                'tHasta':HoraHasta,
                'selectedPumpId': idsurtidor,
            },
            beforeSend: function () {
                $('#loading').removeClass('hidden');
            }
        }).done(function (respuesta) {
            var data = JSON.parse(respuesta);
            var json = data.json;//Obtiene los json 
            var error = data.error;//Obtiene los posibles errores

            if (error != "") {
                $('#divError5').removeClass('hidden');
                $('#MensajeError5').html(error);
                return;
            }
            var answer = JSON.parse(json);
            var HORAS = [{ '00': 0 }, { '01': 0 }, { '02': 0 }, { '03': 0 }, { '04': 0 }, { '05': 0 },
                         { '06': 0 }, { '07': 0 }, { '08': 0 }, { '09': 0 }, { '10': 0 }, { '11': 0 },
                         { '12': 0 }, { '13': 0 }, { '14': 0 }, { '15': 0 }, { '16': 0 }, { '17': 0 },
                         { '18': 0 }, { '19': 0 }, { '20': 0 }, { '21': 0 }, { '22': 0 }, { '23': 0 }
            ];
            //answer debe tener 24 registros, uno por cada hora de  (volumen y venta) de un surtidor especifico
            var surtidor = "";
            for (var i = 0; i < answer.length; i++) {
                surtidor = answer[i].surtidor;//obtengo el nombre del surtidor
                if (especifico == "volumen") {
                    HORAS[Number(answer[i].hora)][answer[i].hora] = answer[i].volumen;
                } else if (especifico == "venta") {
                    HORAS[Number(answer[i].hora)][answer[i].hora] = answer[i].money;
                }

            }
            var data_serie = [];
            //Creo un arreglo para guardar todas los (volumenes/hora) del surtidor
            for (var i = 0; i < HORAS.length; i++) {
                if (i < 10) {
                    var index = '0' + i.toString();
                    data_serie.push(HORAS[i][index]);
                } else {
                    data_serie.push(HORAS[i][i]);
                }                
            }
            var mini_serie = { name: 'Surtidor '+surtidor, data: data_serie };
            if (mini_serie.name != "") {
                agregarALasSeries(mini_serie);                
            }                        
        });
    }
    Reporte = function (tipo_reporte) {       
        var tp = tipo_reporte;
        $('#divTabla').hide();
        $('#divReports').show();
        sales = [];//borro el valor de SALES, aqui es donde se guardan los datos para los reportes
        if ($('#fDesde').val() != "" && $('#hDesde').val() != "" &&
            $('#fHasta').val() != "" && $('#hHasta').val() != "") {
            var FechaDesde = convertDate($('#fDesde').val());
           
            var HoraDesde=$('#hDesde').val();
            var FechaHasta = convertDate($('#fHasta').val());
            var HoraHasta = $('#hHasta').val();
            var selectedPumpsId = "0";
            HoraDesde = HoraDesde.substring(0, 2) + HoraDesde.substring(3, 5) + '00';
            HoraHasta = HoraHasta.substring(0, 2) + HoraHasta.substring(3, 5) + '00';
            //por cada surtidor, lo concateno a la variable, separados por , 
            //ejemplo 0,1,2,3
            $('#cboSurtidores option:selected').each(function () {
                var id_surtidor = $(this).attr('id');
                //Si es numerico lo mando asi (1,2,3)
                if (isNumber(id_surtidor)) {
                    selectedPumpsId += "," + id_surtidor;
                } else {//Si no es numero lo encierro en comillas (1,'ddsd',2)
                    selectedPumpsId += ",'" + id_surtidor + "'";
                }
            });

            if (tipo_reporte == "venta/producto") {
                //En caso de que sea una SOLA SERIE TIPO 888
                enviar_Ajax_Reporte(FechaDesde,HoraDesde, FechaHasta,HoraHasta, selectedPumpsId, '888', tp);
            } else if (tipo_reporte == "monto/producto") {
                enviar_Ajax_Reporte(FechaDesde,HoraDesde, FechaHasta,HoraHasta, selectedPumpsId, '888', tp);
            }
            else {
                if (tipo_reporte == "hora/surtidor_volumen") {
                    $('#cboSurtidores option:selected').each(function () {
                        var idsurtidor = $(this).attr('id');
                        VentasYVolumenByHoraAndSurtidor(FechaDesde,HoraDesde, FechaHasta,HoraHasta, idsurtidor, "volumen");
                    });
                } else if (tipo_reporte == "hora/surtidor_venta") {
                    $('#cboSurtidores option:selected').each(function () {
                        var idsurtidor = $(this).attr('id');
                        VentasYVolumenByHoraAndSurtidor(FechaDesde,HoraDesde, FechaHasta,HoraHasta, idsurtidor, "venta");
                    });
                }else if ($("#cboProductos option:selected").length > 0) {
                    //Cuando generará una serie por cada gasolina 
                    $('#cboProductos option:selected').each(function () {
                        var id_producto = $(this).attr('id');
                        enviar_Ajax_Reporte(FechaDesde,HoraDesde, FechaHasta,HoraHasta, selectedPumpsId, id_producto, tp);
                    });
                } else {
                    //En caso de que sea una SOLA SERIE
                    enviar_Ajax_Reporte(FechaDesde,HoraDesde, FechaHasta,HoraHasta, selectedPumpsId, '999', tp);
                }
            }
            if (tipo_reporte == "venta/producto" || tipo_reporte == "monto/producto") {
                setTimeout(function () {
                    mostrar_grafico_pie(tp);
                }, 3500);
            } else {
                if (tipo_reporte != "hora/surtidor_volumen" && tipo_reporte != "hora/surtidor_venta") {
                    setTimeout(function () {
                        mostrar_grafico_lineal(tp);
                    }, 3500);
                } else {
                    setTimeout(function () {
                        mostrar_grafico_lineal(tp);
                    }, 3500);
                }
                
            }
            

        } else {
            var errores = "";
            if ($('#fDesde').val() == "") {
                errores += "\n☻Debe introducir la Fecha Inicial";
            }
            if ($('#hDesde').val() == "") {
                errores += "\n☻Debe introducir la Hora Inicial";
            }
            if ($('#fHasta').val() == "") {
                errores += "\n☻Debe introducir la Fecha Final";
            }
            if ($('#hHasta').val() == "") {
                errores += "\n☻Debe introducir la Hora Final";
            }
            sweetAlert("Campos incompletos", errores, "error");
        }
    }
    var sales = [];
    agregarALasSeries = function (datos) {
        sales.push(datos);
    }
    Highcharts.setOptions({
        lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
    });
    mostrar_grafico_pie = function (tipo_reporte) {
        sales.sort(compare);
        $('#loading').addClass('hidden');
        var titulo = "", subtitulo = "", texto = "", sufijo = "", prefijo = ""
        if (tipo_reporte == "venta/producto") {
            subtitulo = "Venta por Producto";
            titulo = "Reporte Gráfico";
            texto = "Volumen vendido";
            sufijo = " Galones";
            prefijo = "";
        } else if (tipo_reporte == "monto/producto") {
            subtitulo = "Monto por Producto";
            titulo = "Reporte Gráfico";
            texto = "Monto vendido";
            sufijo = "";
            prefijo = "RD$. ";
        }
        

        Highcharts.chart('divReports', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: titulo,
                x: -20
            },
            subtitle: {
                text: subtitulo,
                x: -20
            },
            tooltip: {
                pointFormat: '{series.name}: <b>' + prefijo + '{point.y:,.2f}' + sufijo + '</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:{point.percentage:.2f}%'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: texto,
                data: sales
            }]
        });

    };
    Limpiar = function () {
        $('#cboProductos option:selected').removeAttr('selected');
        $('#cboProductos').trigger('chosen:updated');

        $('#cboSurtidores option:selected').removeAttr('selected');
        $('#cboSurtidores').trigger('chosen:updated');

        $('#tblConsultas').dataTable();

        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = (day) + '/' + (month) + '/' + now.getFullYear();

        $('#fDesde,#fHasta').val(today);
        $('#hDesde').val('00:00');

        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes();
        $('#hHasta').val(time);
        $('#divReports').html('');
        var table = $('#tblConsultas').DataTable();
        table.clear().draw();
    };
    function compare(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }
    mostrar_grafico_lineal = function (tipo_reporte) {
        sales.sort(compare);
        
        $('#loading').addClass('hidden');
        var titulo = "", subtitulo = "", tipo = "", leyendaSufix = "", leyendaPrefix = "";
        if (tipo_reporte == "hora/producto") {
            titulo = "Reporte Gráfico";
            subtitulo = "Venta por Hora/Producto";
            tipo = "Galones";
            leyendaSufix = " Gals.";
            leyendaPrefix = "";
        } else if (tipo_reporte == "hora/surtidor_volumen") {
            titulo = "Reporte Gráfico";
            subtitulo = "Venta por Hora/Surtidor";
            tipo = "Galones";
            leyendaPrefix = "";
            leyendaSufix = " Gals.";
        } else if (tipo_reporte == "hora/surtidor_venta") {
            titulo = "Reporte Gráfico";
            subtitulo = "Monto por Hora/Surtidor";
            tipo = "Montos";
            leyendaPrefix = "RD$. ";
            leyendaSufix = "";
        } else if (tipo_reporte == "hora/monto") {
            titulo = "Reporte Gráfico";
            subtitulo = "Monto por Hora/Producto";
            tipo = "Montos";
            leyendaPrefix = "RD$.";
            leyendaSufix = "";
        }
        Highcharts.chart('divReports', {
            title: {
                text: titulo,
                x: -20 //center
            },
            subtitle: {
                text: subtitulo,
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Horas'
                },
                categories: ['00', '01', '02', '03', '04', '05',
                    '06', '07', '08', '09', '10', '11',
                    '12', '13', '14', '15', '16', '17',
                    '18', '19', '20', '21', '22', '23']
            },
            yAxis: {
                title: {
                    text: tipo
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                pointFormat: "{series.name}: " + leyendaPrefix + "{point.y:,.2f}" + leyendaSufix
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: sales
        });

    };
    setTimeout(function () {
        $("#cboSurtidores").chosen({
            no_results_text: 'No se encontraron surtidores'
        });
        $('#cboSurtidores option').attr('selected', 'selected');
        $('#cboSurtidores').trigger('chosen:updated');

    }, 1000);

    setTimeout(function () {
        $("#cboProductos").chosen({
            no_results_text: 'No se encontraron productos'
        });
        $('#cboProductos option').attr('selected', 'selected');
        $('#cboProductos').trigger('chosen:updated');
    }, 1000);
});