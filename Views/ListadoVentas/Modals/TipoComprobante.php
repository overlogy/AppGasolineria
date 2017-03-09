<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalTipoComprobante" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal TIPO COMPROBANTE-->
<div id="modalTipoComprobante" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Tipo Comprobante</h4>
            </div>
            <div class="modal-body">
                <center>
                    <div class="btn-group-vertical">
                        <button onclick="abrirTipoPago('01')" class="btn btn-primary">1-Facturas que Generan Credito y Sustentan Costos y/o Gastos</button>
                        <br />
                        <button onclick="abrirTipoPago('02')" class="btn btn-primary">2-Facturas para Consumidores Finales</button>
                        <br />
                        <button onclick="abrirTipoPago('03')" class="btn btn-primary">3-Nota de Debito</button>
                        <br />
                        <button onclick="abrirTipoPago('04')" class="btn btn-primary">4-Nota de Credito</button>
                        <br />
                        <button class="btn btn-primary">5-Proveedores Informales</button>
                        <br />
                        <button onclick="abrirTipoPago('12')" class="btn btn-primary">6-Registros Unico de Ingresos</button>
                        <br />
                        <button onclick="abrirTipoPago('13')" class="btn btn-primary">7-Gastos Menores</button>
                        <br />
                        <button onclick="abrirTipoPago('14')" class="btn btn-primary">8-Regimenes Especiales de Tributacion</button>
                        <br />
                        <button onclick="abrirTipoPago('15')" class="btn btn-primary">9-Comprobantes Gurbernamentales</button>
                        <br />
                        <button onclick="salirTipoComprobante()" class="btn btn-primary">0-Salir</button>
                        <br />
                        <button onclick="volverATipoTicket()" class="btn btn-primary">(BS/←)Retrodecer</button>
                    </div>
                </center>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
