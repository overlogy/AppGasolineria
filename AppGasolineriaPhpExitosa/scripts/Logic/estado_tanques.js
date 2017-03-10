$(document).on('ready', function () {
    
    cargarDetalles = function (surtidor, manguera, ultimas) {
        $('#divError').addClass('hidden');
        $('#MensajeError').val('');
        $.ajax({
            type: 'POST',
            url: '../../php/Logic/EstadoTanquesLogic.php',
            data: {
                'accion': 'Listar'
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
            var DATA = "";
            for (var i = 0; i < answer.length; i++) {
                var id = answer[i].id;
                var combustible = answer[i].fuel;
                var capacidad = answer[i].capacity;
                var actual = answer[i].actual_volume;
                var dispensado = answer[i].dispensed;
                var lleno = answer[i].lleno;
                var ultimoVolumenRecibido = answer[i].last_volume_receibed;
                var capGalones = answer[i].capacity;
                var fechaUltimaEntrada = answer[i].last_date_insert_tank;

                var molde = "<div class='tanque'>";
                molde+="<div class='table-responsive col-md-6'>";
                molde += "<table class='table table-bordered hidden' id='tabla"+id+"'>";

                molde += "<tr>";
                molde+="<th class='text-center'>";
                molde+="Combustible";
                molde+="</th>";
                molde+="<td class='text-center'>";
                molde += combustible;
                molde+="</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += capGalones;
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += "Lleno: "+lleno+"%";
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Volumen Actual";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += actual;
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Ultimo Vol. Dispensado";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += dispensado;
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Ultimo Vol. Recibido";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += ultimoVolumenRecibido;
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<td class='text-center' colspan='2'>";
                molde += fechaUltimaEntrada;
                molde += "</td>";
                molde += "</tr>";
                    
                
                    
                molde+="<tr>";
                molde += "<th class='text-center' id='thVolume" + id + "'>";
                molde+="Tanque <input id='txtVol"+id+"' type='number' class='form-control' />";
                molde+="</th>";
                molde+="<td class='text-center'>";
                molde+="<button onclick='add_Volume("+id+")' class='btn btn-success'>Add. vol</button>";
                molde+="</td>";
                molde+="</tr>";
                        
                molde+="<tr>";
                molde+="<th class='text-center' id='thVerificar"+id+"'>";
                molde += "Vol. Tanque <input type='number' id='txtVerificar"+id+"' class='form-control' />";
                molde+="</th>";
                molde+="<td class='text-center'>";
                molde += "<button onclick='verificar_Volume(`" + id + "`,`" + actual + "`)' class='btn btn-success'>Verificar</button>";
                molde+="</td>";
                molde+="</tr>";

                molde+="<tr>";
                molde+="<th class='text-center'>";
                molde+="Diferencia";
                molde+="</th>";
                molde+="<td class='text-center'>";
                molde += "<input id='txtDiferencia"+id+"' type='number' class='form-control Diferencia' />";
                molde+="</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<td class='text-center' colspan='2'>";
                molde += "<button onclick='ver_grafico(" +id + ")' class='btn btn-warning'>Gráfico</button>";
                molde += "</td>";
                molde += "</tr>";

                
                molde += "</table>";
                molde += "<button id='botonDetalle"+id+"' onclick='ver_detalles(" + id + ")' class='btn btn-primary'>Detalles</button>";
                molde += "<div id='grafico"+id+"' style='height: 400px'></div>";
               
                molde += "</div>";
                molde += "</div>";
                    
                                                    
                DATA += molde;

            }
            
            $('#ContenedorData').html(DATA);
            
            $(".Diferencia").prop('disabled', true);
            for (var i = 0; i < answer.length; i++) {
                console.log(answer);
                var id = answer[i].id;
                var combustible = answer[i].fuel;
                var graficoId = "grafico" + id;
                var color = answer[i].color;
                Highcharts.chart(graficoId, GetOptiones(combustible, 100 - answer[i].lleno, answer[i].lleno, color));
            }            
            
        });
    };
    verificar_Volume = function (id_tanque,volumen_actual) {
        var verificar = $('#txtVerificar' + id_tanque).val();
        if (verificar != "") {
            $('#thVerificar' + id_tanque).removeClass('has-error');
            var valor = 0, vol_act = 0, vol_manual = 0;

            vol_act = parseFloat(volumen_actual);
            vol_manual = parseFloat(verificar);
            valor = Math.round(vol_act - vol_manual);
            $('#txtDiferencia'+id_tanque).val(valor);
            
        } else {
            $('#thVerificar' + id_tanque).addClass('has-error');
        }
    };
    add_Volume = function (id_tanque) {
        var volumen = $('#txtVol' + id_tanque).val();
        if (volumen != "") {
            $('#thVolume' + id_tanque).removeClass('has-error');
            $.ajax({
                type: 'POST',
                url: '../../php/Logic/EstadoTanquesLogic.php',
                data:
                    {
                        'accion': 'addvol',
                        'volumen':volumen,
                        'id': id_tanque
                    }
            }).done(function (respuesta) {
                if (respuesta == "SI") {
                    swal("Éxito", "Volumen Actualizado", "success");
                    cargarDetalles();
                } else if (respuesta == "NO") {
                    sweetAlert("Oops...", "No se pudo actualizar el volumen.", "error");
                } else {
                    sweetAlert("Ha ocurrido un error inesperado", respuesta, "error");
                }
            });
        } else {
            $('#thVolume' + id_tanque).addClass('has-error');
        }
        
    };
    ver_detalles = function (id_grafico) {
        $('#txtVol' + id_grafico).val('');
        $('#txtVerificar' + id_grafico).val('');
        $('#txtDiferencia' + id_grafico).val('');
        $('#thVerificar' + id_grafico).removeClass('has-error');
        $('#thVolume' + id_grafico).removeClass('has-error');
        $('#grafico' + id_grafico).fadeOut();
        $('#tabla' + id_grafico).removeClass('hidden');
        $('#botonDetalle' + id_grafico).addClass('hidden');
    };
    ver_grafico = function (id_grafico) {
        $('#grafico' + id_grafico).fadeIn();
        $('#tabla' + id_grafico).addClass('hidden');
        $('#botonDetalle' + id_grafico).removeClass('hidden');
    };
    cargarDetalles();
    function GetOptiones(texto, vacio, lleno, color) {
        var opciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            colors: ['#F0F0F0', color],
            title: {
                text: texto
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    borderColor: '#000000',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Capacidad',
                data: [
                    ['Vacío: ' + vacio + '%', vacio],
                    ['Lleno: ' + lleno + '%', lleno],
                    
                    
                ]
            }]
        };
        return opciones;
    }
});