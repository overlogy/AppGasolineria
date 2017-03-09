﻿<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalRncTarjeta" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal Rnc Empresa-->
<div id="modalRncTarjeta" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">RNC</h4>
            </div>
            <div class="modal-body">
                <center>
                    <form id="form_tarjeta_Return">
                        <div class="form-group">
                            <label>RNC del Cliente</label>
                            <input class="form-control" placeholder="RNC" id="txtRncT" />
                        </div>
                        <div class="form-group">
                            <label>Nombre</label>
                            <input class="form-control" id="txtClienteT" disabled />
                        </div>
                        <div class="form-group">
                            <label>Numero de Tarjeta</label>
                            <input class="form-control" placeholder="Numero de Tarjeta" maxlength="4" id="txtTarjeta" />
                        </div>
                        <div class="form-group">
                            <label>Numero de Placa</label>
                            <input class="form-control" placeholder="Numero de Placa" maxlength="7" id="txtPlaca" />
                        </div>
                        <button id="btnEnviar" class="btn btn-success">Enviar</button>
                    </form>                        
                    <div class="btn-group-vertical">
                        <button onclick="cerrarTodosModal()" class="btn btn-primary">(-)Salir</button>
                        <br>
                        <button onclick="volverATipoPago()" class="btn btn-primary">(*)Retroceder</button>
                    </div>
                </center>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>

