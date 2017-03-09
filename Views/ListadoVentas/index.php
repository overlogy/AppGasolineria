<?php 
$titulo="Listado de Ventas";
$scripts='<script src="../../scripts/Logic/listado_ventas.js"></script>';
require_once('../Shared/header.php');
?>
	<center>
	    <form id="form_filtro" class="form-inline text-center">
	        <div class="form-group text-center">
	            <label for="txtSurtidor">Surtidor:</label>
	            <input type="number" class="form-control" min="0" id="txtSurtidor" name="txtSurtidor" />
	        </div>
	        <div class="form-group text-center">
	            <label for="txtManguera">Manguera:</label>
	            <input type="number" class="form-control" min="0" id="txtManguera" name="txtManguera" />
	        </div>
	        <div class="form-group text-center">
	            <label for="txtUltimasVentas">Ultimas</label>
	            <input type="number" class="form-control" min="0" id="txtUltimasVentas" name="txtUltimasVentas" />
	            <label>Ventas</label>
	        </div>
	        <button id="btnCargarDatos" type="button" class="btn btn-success"><span class="glyphicon glyphicon-refresh"></span> Cargar Datos</button>
	    </form>
	</center>    
<div class="table-responsive">
    <table id="tblVentas" width="100%" class="table display responsive table-bordered">
        <thead>
            <tr>
                <th>#Venta</th>
                <th>Lado</th>
                <th>Manguera</th>
                <th>Combustible</th>
                <th>Volumen</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Opciones</th>
            </tr>                
        </thead>
        <tbody>
                
        </tbody>
        <tfoot>

        </tfoot>
    </table>
</div>
<div class="alert alert-danger hidden" id="divError">
    <strong>Error en el Servidor: </strong> <span id="MensajeError"></span>
</div>
<div class="alert alert-danger hidden" id="divError2">
    <strong>Error en el Servidor: </strong> <span id="MensajeError2"></span>
</div>

<input class="hidden" type="text" id="VentaSeleccionada"/>
<input class="hidden" type="text" id="ladoSeleccionado"/>
<input class="hidden" type="text" id="mangueraSeleccionado" />
<input class="hidden" type="text" id="combustibleSeleccionado" />
<input class="hidden" type="text" id="volumenSeleccionado" />
<input class="hidden" type="text" id="montoSeleccionado" />
<input class="hidden" type="text" id="fechaSeleccionado" />
<input class="hidden" type="text" id="horaSeleccionado" />
<input class="hidden" type="text" id="fecha_vSeleccionado" />

<input class="hidden" type="text" id="TipoPagoSeleccionado" />
<input class="hidden" type="text" id="formaPagoSeleccionado"/>
<input class="hidden" type="text" id="txtClienteSeleccionado" />
<input class="hidden" type="text" id="rncSeleccionado" />
<input class="hidden" type="text" id="PlacaSeleccionado" />
<input class="hidden" type="text" id="NumeroTarjetaSeleccionado" />
<input class="hidden" type="text" id="txtRespuesta"/>

<?php 
require_once("Modals/TipoTicket.php");
require_once("Modals/TipoComprobante.php");
require_once("Modals/TipoPago.php");
require_once("Modals/RncEmpresa.php");
require_once("Modals/RncTarjeta.php");
require_once("Modals/Imprimir.php");

require_once('../Shared/cierre.php');
 ?>