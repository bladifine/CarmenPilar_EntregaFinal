// Función única para normalizar nombres de archivos de imagen y evitar errores de tildes/mayúsculas
function limpiarParaImagen(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quita tildes
        .replace(/\s+/g, "_")           // Espacios por guiones bajos
        .replace(/[^\w]/g, "");         // Quita símbolos especiales
}

// ===== LÓGICA UNIFICADA DEL CARRITO DE COMPRAS 2026 =====
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function guardarCarrito(carrito) {
    localStorage.setItem('cart', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(nombre, imagen) {
    let carrito = obtenerCarrito();
    // Limpieza de espacios para evitar duplicados falsos
    if (carrito.some(item => item.nombre.trim().toLowerCase() === nombre.trim().toLowerCase())) {
        alert("⚠️ Ya has seleccionado este curso en tu lista.");
        return;
    }
    
    // Generar ruta de imagen correcta en minúsculas si no viene definida
    const rutaImagen = imagen || `img/${limpiarParaImagen(nombre)}.jpg`;
    
    carrito.push({ nombre: nombre.trim(), imagen: rutaImagen });
    guardarCarrito(carrito);
    alert("🚀 Curso añadido con éxito.");
}

function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll('#cart-count, #carrito-contador');
    const total = obtenerCarrito().length;
    contadores.forEach(c => {
        if (c) c.textContent = total;
    });
    
    // Control de visibilidad del botón flotante si existe en la interfaz
    const botonFlotante = document.getElementById('cart-float');
    if (botonFlotante) {
        botonFlotante.style.display = total > 0 ? "block" : "none";
    }
}

// ===== INICIALIZACIÓN GLOBAL AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});
