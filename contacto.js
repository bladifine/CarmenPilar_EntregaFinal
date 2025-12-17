document.getElementById("formulario-contacto").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !telefono || !mensaje) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Aquí puedes enviar los datos a un backend o guardarlos
    console.log({ nombre, telefono, mensaje });

    // Mostrar mensaje de confirmación
    document.getElementById("respuesta-formulario").textContent = 
        "Gracias por tu mensaje. Nos comunicaremos contigo al número proporcionado.";

    // Limpiar formulario
    this.reset();
});
