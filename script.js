// Función única y mejorada para normalizar nombres de archivos de imagen
function limpiarParaImagen(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quita tildes
        .replace(/\s+/g, "_")           // Espacios por guiones bajos
        .replace(/[^\w]/g, "");         // Quita símbolos especiales
}

// ===== LÓGICA DEL CARRITO =====
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito_carmen') || '[]');
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito_carmen', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(nombre, costo) {
    let carrito = obtenerCarrito();
    if (carrito.some(item => item.nombre === nombre)) {
        alert("⚠️ Ya seleccionaste este curso");
        return;
    }
    carrito.push({ nombre, costo });
    guardarCarrito(carrito);
    
    // Feedback visual
    if (event && event.target) {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = '✅ Agregado';
        btn.style.background = '#4caf50';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 1500);
    }
}

function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll('#carrito-contador');
    const total = obtenerCarrito().length;
    contadores.forEach(c => c.textContent = total);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    if (typeof cargarCursos === 'function') cargarCursos();
});
