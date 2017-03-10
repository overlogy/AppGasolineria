﻿<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalTipoTicket" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal TIPO TICKET-->
<div id="modalTipoTicket" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Tipo Ticket</h4>
            </div>
            <div class="modal-body">
                <div class="row col-md-12 col-sm-12 col-xs-12 ">
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <h4>Lado: <span id="mdlTipoTicket_Lado"></span></h4>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <h4>Manguera: <span id="mdlTipoTicket_Manguera"></span></h4>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <h4>Volumen:<span id="mdlTipoTicket_Volumen"></span></h4>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <h4>Monto: <span id="mdlTipoTicket_Monto"></span></h4>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <h4><span id="mdlTipoTicket_Gasolina"></span></h4>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <center>
                    <div class="btn-group-vertical">
                        <button onclick="imprimirVenta()" id="btnTicket" type="button" class="btn btn-primary">1-Ticket</button>
                        <br />
                        <button onclick="generarNcf()" id="btnNcf" type="button" class="btn btn-primary">2-NCF</button>
                        <br />
                        <button onclick="salirTipoTicket()" id="btnSalirTipoTicket" type="button" class="btn btn-primary">0-Salir</button>
                    </div>
                </center>                
            </div>
        </div>
    </div>
</div>
