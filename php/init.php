<?php 
	date_default_timezone_get("America/Santo_Domingo");
	
	class Conexion{
		public function conectarPgsql(){
			try {
				$Conexion=new PDO("pgsql:dbname=smartshipdb;host=10.0.0.18","postgres","ssfpostgres");
				return $Conexion;
			} catch (PDOException $e) {
				echo "Error: ".$e->getMessage();
			}
		}
		public function conectarSqlServer(){
			try {
				$Conexion=new PDO("sqlsrv:Server=DESKTOP-5J3MVSG;Database=BD_RNC;","sa","edward");
				return $Conexion;
			} catch (Exception $e) {
				echo "Error: ".$e->getMessage();
			}
		}
		
		public function Ejecutar($conexion,$consulta,$parametros=null){
			$rpta="";
			try {
				$statement=$conexion->prepare($consulta);
				$statement->execute($parametros);
				if($statement->rowCount()>0){
					$rpta="SI";
				}else{
					$rpta="NO";
				}
			} catch (Exception $e) {
				$rpta=$e->getMessage();
			}
			return $rpta;
		}
		public function GetData($conexion,$consulta,$parametros=null){
			$data;
			try {
				$data['error']="";
				$statement=$conexion->prepare($consulta);
				$statement->execute($parametros);
				$data['data']=$statement;
			} catch (Exception $e) {
				$data['error']=$e->getMessage();
			}			
			return $data;
		}
		public function GetJsonData($conexion,$consulta,$parametros=null){
			$data;
			try {
				$data['error']="";
				$statement=$conexion->prepare($consulta);
				$statement->execute($parametros);
				$data['json']=json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
			} catch (Exception $e) {
				$data['error']=$e->getMessage();
			}			
			return json_encode($data);
		}
	}
?>