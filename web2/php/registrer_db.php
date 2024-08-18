<?php
    include "conexion_db.php"; // Asegúrate de que esto tenga la conexión a la base de datos.

    // Obtener datos del formulario y sanitizar
    $userName = mysqli_real_escape_string($conexion, $_POST["userName"]);
    $userEmail = mysqli_real_escape_string($conexion, $_POST["userEmail"]);
    $userPassword = mysqli_real_escape_string($conexion, $_POST["userPassword"]);

    // Encriptar la contraseña
    $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

    // Consulta para insertar datos
    $query = "INSERT INTO usuarios (nombre_usuario, email_usuario, password_usuario)
              VALUES ('$userName', '$userEmail', '$hashedPassword')";

    $ckeckEmail = mysqli_query($conexion, "SELECT * FROM usuarios WHERE email_usuario='$userEmail'");
    $ckeckUserName = mysqli_query($conexion, "SELECT * FROM usuarios WHERE nombre_usuario='$userName'");

    if (mysqli_num_rows($ckeckEmail) > 0){
        echo '
        <script>
        alert("Este Correo ya Existe en nuestrsos Registros");
        window.location = "../login.php";
        </script>
        ';
    exit();
    }

    // Ejecutar consulta
    $run = mysqli_query($conexion, $query);

    // Verificar si la consulta fue exitosa
    if ($run) {
        echo '
        <script>
        alert("Te Registraste Correctamente");
        window.location = "../index.html";
        </script>
        ';
    } else {
        echo '
        <script>
        alert("Error al registrarse. Por favor, intenta de nuevo.");
        window.location = "register.php";
        </script>
        ';
    }
    // Si el registro es exitoso:
    header("http://localhost/web2/index.html");
    exit();
    // Cerrar la conexión
    mysqli_close($conexion);
?>