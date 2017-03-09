﻿<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalTipoPago" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal TIPO Pago-->
<div id="modalTipoPago" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Tipo Pago</h4>
            </div>
            <div class="modal-body">
                <center>
                    <div class="btn-group-vertical">
                        <button onclick="cerrarTodosModal()" class="btn btn-primary">0-Salir</button>
                        <br />
                        <button onclick="pagarEfectivo()" class="btn btn-primary">1-Efectivo</button>
                        <br />
                        <button onclick="pagarTarjeta()" class="btn btn-primary">2-Tarjeta</button>
                        <br />
                        <button onclick="volverATipoComprobante()" class="btn btn-primary">3-Retroceder</button>
                    </div>
                </center>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
