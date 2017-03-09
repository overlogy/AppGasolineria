﻿<!-- Trigger the modal with a button -->
<button type="button" class="hidden" data-toggle="modal" data-target="#modalRncEmpresa" data-backdrop="static" data-keyboard="false">Open Modal</button>

<!-- Modal Rnc Empresa-->
<div id="modalRncEmpresa" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">RNC</h4>
            </div>
            <div class="modal-body">
                <center>
                    <form id="form_rncEmpresa">
                        <div class="form-group">
                            <label>RNC del Cliente</label>
                            <input class="form-control" placeholder="RNC" id="txtRnc"/>
                        </div>
                        <div class="form-group">
                            <label>Nombre</label>
                            <input class="form-control" id="txtCliente"/>
                        </div>      
                        <button type="submit" class="btn btn-success">Enviar</button>                  
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
