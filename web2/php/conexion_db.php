<?php
    $conexion =mysqli_connect("localhost","root","1234","registrer_datos_db");
    
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }
?>