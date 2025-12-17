<?php
// Configuración de la base de datos
$host = "localhost";
$user = "root";       // tu usuario de MySQL
$password = "";       // tu contraseña de MySQL
$dbname = "cursos_carmen_pilar";

// Conexión a MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];

// Guardar en la base de datos
$sql = "INSERT INTO mensajes_contacto (nombre, telefono, mensaje) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $telefono, $mensaje);

if ($stmt->execute()) {
    echo "✅ Mensaje guardado en la base de datos.<br>";
} else {
    echo "❌ Error al guardar: " . $conn->error;
}

// Enviar correo al director
$para = "capifer13@gmail.com"; // correo del director
$asunto = "Nuevo mensaje de contacto";
$cuerpo = "Nombre: $nombre\nTeléfono: $telefono\nMensaje: $mensaje";
$headers = "From: noreply@tusitio.com";

if (mail($para, $asunto, $cuerpo, $headers)) {
    echo "✅ Correo enviado al director.";
} else {
    echo "❌ Error al enviar el correo.";
}

// Cerrar conexión
$conn->close();
?>
