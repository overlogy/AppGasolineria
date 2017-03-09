$(document).on('ready', function () {
    getData = function () {
        $.ajax({
            type: 'GET',
            url: $('#ruta_GetData').val()
        }).done(function (respuesta) {
            var answer = JSON.parse(respuesta);
            console.log(answer);
            var DATA = "";
            for (var i = 0; i < answer.length; i++) {
                var Id = answer[i].Id;
                var Combustible = answer[i].Combustible;

                var Capacidad = answer[i].Capacidad;
                var Color = answer[i].Color;                
                var UltimoVolumenDispensado = answer[i].UltimoVolumenDispensado;                
                var VolumenActual = answer[i].VolumenActual;

                var Vacio = answer[i].Vacio;


                var molde = "<div class='tanque'>";
                molde+="<div class='table-responsive col-md-6'>";
                molde += "<table class='table table-bordered hidden' id='tabla"+Id+"'>";

                molde += "<tr>";
                molde+="<th class='text-center'>";
                molde+="Combustible";
                molde+="</th>";
                molde+="<td class='text-center'>";
                molde += Combustible;
                molde+="</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Capacidad";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += Capacidad;
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Ultimo Volumen Dispensado";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += UltimoVolumenDispensado;
                molde += "</td>";
                molde += "</tr>";

                molde += "<tr>";
                molde += "<th class='text-center'>";
                molde += "Volumen Actual";
                molde += "</th>";
                molde += "<td class='text-center'>";
                molde += VolumenActual;
                molde += "</td>";
                molde += "</tr>";

              
                molde += "<tr>";
                molde += "<td class='text-center' colspan='2'>";
                molde += "<button onclick='ver_grafico(" +Id + ")' class='btn btn-warning'>Gráfico</button>";
                molde += "</td>";
                molde += "</tr>";

                
                molde += "</table>";
                molde += "<button id='botonDetalle"+Id+"' onclick='ver_detalles(" + Id + ")' class='btn btn-primary'>Detalles</button>";
                molde += "<div id='grafico"+Id+"' style='height: 400px'></div>";
               
                molde += "</div>";
                molde += "</div>";
                    
                                                    
                DATA += molde;

            }
            $('#ContenedorData').html(DATA);
            
            
            for (var g = 0; g < answer.length; g++) {
                
                var combustible = answer[g].Combustible;
                var graficoId = "grafico" + answer[g].Id;
                var color = answer[g].Color;

                var capacity = Number(answer[g].Capacidad);
                var va = Number(answer[g].VolumenActual);

                var lleno = (va / capacity) * 100;
                Highcharts.chart(graficoId, GetOptiones(combustible, 100 - lleno, lleno, color));
            }
        });
    }
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
    getData();
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