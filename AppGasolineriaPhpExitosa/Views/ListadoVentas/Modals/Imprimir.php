﻿<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalImprimir" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal Rnc Empresa-->
<div id="modalImprimir" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Imprimir</h4>
            </div>
            <div class="modal-body">
                <center>
                    <div class="btn-group-vertical">
                        <button onclick="Impresion()" class="btn btn-primary">1-Imprimir</button>
                        <br />
                        <button onclick="volverATipoComprobante()" class="btn btn-primary">2-Retroceder</button>
                        <br />
                        <button onclick="cerrarTodosModal()" class="btn btn-primary">3-Cancelar</button>
                    </div>
                </center>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>

