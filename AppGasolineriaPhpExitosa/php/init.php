<?php
	date_default_timezone_get("America/Santo_Domingo");

    //Constantes de POSTGRESS
	define("PGSQL_HOST","10.0.0.18");
    define("PGSQL_DB","smartshipdb");
    define("PGSQL_USER","postgres");
    define("PGSQL_PASSWORD","ssfpostgres");

    //Constantes de SQL SERVER
	define("SQL_HOST","DESKTOP-5J3MVSG");
    define("SQL_DB","BD_RNC");
    define("SQL_USER","sa");
    define("SQL_PASSWORD","edward");

	class Conexion{
        private $pgsql_host=PGSQL_HOST;
        private $pgsql_db=PGSQL_DB;
        private $pgsql_user=PGSQL_USER;
        private $pgsql_password=PGSQL_PASSWORD;

        private $sql_host=SQL_HOST;
        private $sql_db=SQL_DB;
        private $sql_user=SQL_USER;
        private $sql_password=SQL_PASSWORD;




		public function conectarPgsql(){
			try {
				$Conexion=new PDO("pgsql:dbname=".$this->pgsql_db.";host=".$this->pgsql_host."",$this->pgsql_user,$this->pgsql_password);
				return $Conexion;
			} catch (PDOException $e) {
				echo "Error: ".$e->getMessage();
			}
		}
		public function conectarSqlServer(){
			try {
				$Conexion=new PDO("sqlsrv:Server=".$this->sql_host.";Database=".$this->sql_db.";",$this->sql_user,$this->sql_password);
				return $Conexion;
			} catch (Exception $e) {
				echo "Error: ".$e->getMessage();
			}
		}

		public function Ejecutar($conexion,$consulta,$parametros=null){
			$rpta="";
			try {
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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
			$data="";
			try {
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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
			$data="";
			try {
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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