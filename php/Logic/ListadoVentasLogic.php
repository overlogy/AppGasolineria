<?php 
	require_once('../init.php');

	if(isset($_POST["accion"]) && $_POST["accion"]!=""){

		//Instancias
		$conexionbd=new Conexion();
		$conexionPgsql=$conexionbd->conectarPgsql();
		$conexionSqlServer=$conexionbd->conectarSqlServer();
		$accion=$_POST["accion"];


		if($accion=="listado_ventas"){
			if(isset($_POST["pump"]) && $_POST['pump']!="" &&
				isset($_POST['hose']) && $_POST['hose']!="" &&
				isset($_POST['numultimas']) && $_POST['numultimas']!=""){

				$pump=(int)$_POST['pump'];
				$hose=(int)$_POST['hose'];

				$where = "";
	            if ($pump>0)
	            {
	                $where = " AND sps.pump_id=$pump";
	            }
	            if ($hose>0)
	            {
	                $where.= " and sps.hose_id=$hose";
	            }
	          
	            $numultimas=$_POST["numultimas"];
				$consulta="SELECT 0 as no_venta, sps.sale_id,sps.pump_id,sps.hose_id,sps.grade_id,stp.tkt_plu_short_desc,sps.volume,sps.money,"; 
				$consulta.=" sps.end_date as end_date,";
				$consulta.=" sps.end_time as end_time";
				$consulta.=" from ssf_pump_sales sps,ssf_tkt_plu stp,ssf_tkt_plu_grades stpg where sps.grade_id=stpg.tkt_grade_id and stpg.tkt_plu_id=stp.tkt_plu_id";
				$consulta.=$where;
				$consulta.=" ORDER BY (start_date || ' ' || start_time) desc limit :numultimas";
				echo $conexionbd->GetJsonData($conexionPgsql,$consulta,array(
					':numultimas'=>$numultimas
					));
			}
			
		}elseif($accion=="buscarRNC"){
			if(isset($_POST['rnc']) && $_POST['rnc']!=""){
				$consulta="SELECT RNC,NOMBRE_RAZON_SOCIAL,NOMBRE_COMERCIAL FROM DGII_RNC WHERE RNC =:RNC";
				$data=$conexionbd->GetData($conexionSqlServer,$consulta,array(':RNC'=>$_POST['rnc']));
				$resultado="NO";
				foreach($data['data'] as $d){
					if($d['RNC']!=null){
						$resultado=$d['NOMBRE_RAZON_SOCIAL'];
					}
				}
				echo $resultado;
			}

		}elseif($accion=="ImprimirVenta"){
			$rpta['respuesta']="";
			$rpta['ncf'] = "";
            $rpta['tipoComprobante'] = "";
            $rpta['sFormaPago'] ="";
            $rpta['NumeroTarjeta'] = "";
            $rpta['Placa'] = "";

			if(isset($_POST['tipo_comprobante']) && $_POST['tipo_comprobante']!="" &&
				isset($_POST['forma_pago']) && $_POST['forma_pago']!="" &&
				isset($_POST['cliente']) && $_POST['cliente']!="" &&
				isset($_POST['rnc']) && $_POST['rnc']!="" &&
				isset($_POST['lado']) && $_POST['lado']!="" &&
				isset($_POST['manguera']) && $_POST['manguera']!="" &&
				isset($_POST['combustible']) && $_POST['combustible']!="" &&
				isset($_POST['volumen']) && $_POST['volumen']!="" &&
				isset($_POST['monto']) && $_POST['monto']!="" &&
				isset($_POST['fecha']) && $_POST['fecha']!="" &&
				isset($_POST['hora']) && $_POST['hora']!="" &&
				isset($_POST['fecha_v']) && $_POST['fecha_v']!="" ){				
				
				try {
					$placa="";
					$numeroTarjeta="";
					if(isset($_POST['Placa']) && $_POST['Placa']!=""){
						$placa=$_POST['Placa'];
					}
					if(isset($_POST['NumeroTarjeta']) && $_POST['NumeroTarjeta']!=""){
						$numeroTarjeta=$_POST['NumeroTarjeta'];
					}
					$NCF="";
					$prefijo="";
					$sufijo="";
					$descripcion="";
					$query="SELECT * FROM ssf_ncf WHERE codigo_tipo=:codigo_tipo";
					$data=$conexionbd->GetData($conexionPgsql,$query,
						array(
							':codigo_tipo'=>$_POST['tipo_comprobante']
						));


					foreach($data['data'] as $d){

						$prefijo=$d['prefijo'];
						$sufijo=$d['consecutivo'];
						$descripcion=$d['descripcion'];
					}
					$NCF=$prefijo.str_pad($sufijo, 8, '0', STR_PAD_LEFT);
					
					//Finalizo la generacion del NCF
					if(strlen($NCF)==19){
						$i=(int)$sufijo;
						$i++;

						//Query para guardar las facturas con comprobantes en al base de datos   
						$querySave="INSERT INTO ssf_facturas_comprobantes(ncf,cliente,rnc,lado,manguera,combustible,volumen,monto,fecha,hora,user,tarjeta,placa_vehiculo,";
	                    $querySave.="fecha_venta,tipo_ncf,credito) VALUES(:ncf,:cliente,:rnc,:lado,:manguera,:combustible,:volumen,:monto,:fecha,:hora,:user,:tarjeta,:placa_vehiculo,";
	                    $querySave.=":fecha_venta,:tipo_ncf,:credito)";

	                    $queryIncrement="UPDATE ssf_ncf SET consecutivo=:consecutivo WHERE prefijo=:prefijo";

                    	if($conexionbd->Ejecutar($conexionPgsql,$querySave,array(
                    		':ncf'=>$NCF,
                    			':cliente'=>$_POST['cliente'],
                    			':rnc'=>$_POST['rnc'],
             					':lado'=>$_POST['lado'],
             					':manguera'=>$_POST['manguera'],
             					':combustible'=>$_POST['combustible'],
             					':volumen'=>$_POST['volumen'],
             					':monto'=>$_POST['monto'],
             					':fecha'=>$_POST['fecha'],
             					':hora'=>$_POST['hora'],
             					':tarjeta'=>$numeroTarjeta,
             					':user'=>'admin',
             					':placa_vehiculo'=>$placa,
             					':fecha_venta'=>$_POST['fecha_v'],
             					':tipo_ncf'=>$_POST['tipo_comprobante'],
             					':credito'=>''
                    		))=="SI"){

                    		$conexionbd->Ejecutar($conexionPgsql,$queryIncrement,array(
	                    			':consecutivo'=>$i,
	                    			':prefijo'=>$prefijo
	                    		));
                    	
                    		$rpta['respuesta']="Correcto";
							$rpta['ncf'] = $NCF;
				            $rpta['tipoComprobante'] = $_POST['tipo_comprobante'];
				            $rpta['sFormaPago'] = (int)$_POST['forma_pago'] == 1 ? "Efectivo" : "Tarjeta";
				            $rpta['NumeroTarjeta'] = $numeroTarjeta;
				            $rpta['Placa'] = $placa;
                    	}else{
                    		$rpta['respuesta']="No";
                    	}
	                      
					}else{
						$rpta['respuesta'] = "NCF_Not_19";   
					}
				} catch (Exception $e) {
					$rpta['respuesta']=$e->getMessage();
				}						
			}
			echo json_encode($rpta);		

		}else{
			echo "La accion no es válida";
		}
	}else{
		echo "No hay accion enviada";
	}
?>