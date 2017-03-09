
<!DOCTYPE html>
<html>
	<head>
		<title>Trinity - <?php echo $titulo; ?></title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

	    <!-- CSS -->
	    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">
	    <link rel="stylesheet" href="../../assets/css/vendor/icon-sets.css">
	    <link rel="stylesheet" href="../../assets/css/main.min.css">

	    <!-- GOOGLE FONTS -->
	    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
	    <!-- ICONS -->
	    <link rel="apple-touch-icon" sizes="76x76" href="../../assets/img/apple-icon.png">
	    <link rel="icon" type="image/png" sizes="96x96" href="../../assets/img/favicon.png">
	    <!-- 3rd Party-->

	    <link href="../../Content/sweetalert.css" rel="stylesheet" />
	    <link href="../../Content/chosen.css" rel="stylesheet" />
	    <!--Datatables-->
	    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css" />
	    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/rowreorder/1.1.2/css/rowReorder.dataTables.min.css" />
	    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.min.css" />

	    <!-- Javascript -->
	    <script src="../../assets/js/jquery/jquery-2.1.0.min.js"></script>
	    <script src="../../assets/js/bootstrap/bootstrap.min.js"></script>
	    <script src="../../assets/js/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
	    <script src="../../assets/js/klorofil.min.js"></script>
	    <script src="../../scripts/chosen.jquery.js"></script>
	    <script src="../../scripts/sweetalert.min.js"></script>


	    <script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
	    <script src="https://cdn.datatables.net/rowreorder/1.1.2/js/dataTables.rowReorder.min.js"></script>
	    <script src="https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js"></script>


	    <script src="https://code.highcharts.com/highcharts.js"></script>
	    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
	    <script src="https://code.highcharts.com/modules/exporting.js"></script>
	    <script src="http://code.highcharts.com/modules/no-data-to-display.js"></script>

	    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


	    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.0/moment.min.js"></script>
	    <?php echo $scripts; ?>
	</head>
	<body>
		<div id="wrapper">
			<!-- SIDEBAR -->
			<?php require_once('menu.php') ?>
			<!-- END SIDEBAR -->

			 <!-- MAIN -->
	        <div class="main">
	            <!-- NAVBAR -->
	            <nav class="navbar navbar-default">
	                <div class="container-fluid">
	                    <div class="navbar-btn">
	                        <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
	                    </div>
	                    <div class="navbar-header">
	                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu">
	                            <span class="sr-only">Toggle Navigation</span>
	                            <i class="fa fa-bars icon-nav"></i>
	                        </button>
	                    </div>
	                    <div id="navbar-menu" class="navbar-collapse collapse">
	                        <form class="navbar-form navbar-left hidden-xs">
	                            <div class="input-group">
	                                <input type="text" value="" class="form-control" placeholder="Buscar en Dashboard...">
	                                <span class="input-group-btn"><button type="button" class="btn btn-primary">Acceder</button></span>
	                            </div>
	                        </form>
	                        <ul class="nav navbar-nav navbar-right">
	                            <li class="dropdown">
	                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-user"></i> <span>Usuario</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
	                                <ul class="dropdown-menu">
	                                    <li><a href=""><i class="lnr lnr-exit"></i> <span>Cerrar Sesión</span></a></li>
	                                </ul>
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	            </nav>
	            <!-- END NAVBAR -->
	            <!-- MAIN CONTENT -->
	            <div class="main-content">
	                <div class="container-fluid">
	                    
	                
