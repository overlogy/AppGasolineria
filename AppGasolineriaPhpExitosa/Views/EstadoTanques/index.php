<?php 
$titulo="Estado de Tanques";
$scripts='<script src="../../scripts/Logic/estado_tanques.js"></script>';
require_once('../Shared/header.php');
?>

<h2 class="page-title">Estado de Tanques</h2>

<center>
    <button class="btn btn-success" onclick="cargarDetalles();">Actualizar</button>
</center>
<hr />
<div id="ContenedorData">

</div>
<div class="alert alert-danger hidden" id="divError">
    <strong>Error en el Servidor: </strong> <span id="MensajeError"></span>
</div>
<?php 

require_once('../Shared/cierre.php');
 ?>

