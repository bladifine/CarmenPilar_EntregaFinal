function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (usuario === "capifer13" && contrasena === "capifer.13") {
        alert("Inicio de sesión exitoso");
        document.getElementById("login-form").style.display = "none";
        document.getElementById("perfil").innerHTML = `<p>Bienvenido, ${usuario} 👋</p>`;
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
