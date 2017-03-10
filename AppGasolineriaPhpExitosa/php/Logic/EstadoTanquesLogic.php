<?php
require_once('../init.php');

if(isset($_POST["accion"]) && $_POST["accion"]!=""){

    //Instancias
    $conexionbd=new Conexion();
    $conexionPgsql=$conexionbd->conectarPgsql();
    $conexionSqlServer=$conexionbd->conectarSqlServer();
    $accion=$_POST["accion"];


    if($accion=="Listar"){
        echo $conexionbd->GetJsonData($conexionPgsql,"select tk.*,((tk.actual_volume/tk.capacity)*100) as Lleno,cc.color from tanks_volume tk LEFT JOIN configuracion_colores_tanque cc ON cc.id_plu=tk.id order by id");
    }elseif($accion=='addvol'){
        if(isset($_POST['id']) && $_POST['id'] !="" &&
            isset($_POST['volumen']) && $_POST['volumen'] !=""){

            $id= $_POST['id'];
            $volume = $_POST['volumen'];

            $consulta ="UPDATE tanks_volume SET actual_volume=actual_volume+:actual_volume,last_date_insert_tank=:last_date_insert_tank,last_volume_receibed=:last_volume_receibed WHERE id=:id";
            $conexionbd=new Conexion();
            $conexionPgsql=$conexionbd->conectarPgsql();
            echo $conexionbd->Ejecutar($conexionPgsql,$consulta,array(
                'id'=>$id,
                ':actual_volume'=>$volume,
                ':last_date_insert_tank'=>date('Ymd'),
                ':last_volume_receibed'=>$volume
                ));
       }
    }else{
        echo "La accion no es válida";
    }
}else{
    echo "No hay accion enviada";
}








?>