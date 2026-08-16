/**
 * =========================================================================
 * BotEduCarmen 2026 - ARCHIVO DE LÓGICA CENTRAL UNIFICADO (main.js)
 * Desarrollado por: Bladimir Silva
 * PNF en Informática - Trabajo de Investigación
 * =========================================================================
 */

// =========================================================================
// ALGORITMO 1: NORMALIZACIÓN Y GENERACIÓN DINÁMICA DE IMÁGENES
// =========================================================================
function limpiarParaImagen(texto) {
    return texto.toLowerCase()
        .normalize("NFD")               // Descompone caracteres con tildes
        .replace(/[\u0300-\u036f]/g, "") // Remueve acentos y tildes
        .replace(/\s+/g, "_")           // Convierte espacios en guiones bajos
        .replace(/[^\w]/g, "");         // Elimina símbolos especiales
}

// =========================================================================
// ALGORITMO 2: PERSISTENCIA DE DATOS - LECTURA DEL ESTADO (localStorage)
// =========================================================================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// =========================================================================
// ALGORITMO 3: PERSISTENCIA DE DATOS - ESCRITURA Y SINCRONIZACIÓN
// =========================================================================
function guardarCarrito(carrito) {
    localStorage.setItem('cart', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// =========================================================================
// ALGORITMO 4: LÓGICA DE NEGOCIO - INSERCIÓN EXCLUSIVA EN EL CARRITO
// =========================================================================
function agregarAlCarrito(nombre, costo) {
    let carrito = obtenerCarrito();
    
    // Validación: Evita duplicar cursos
    if (carrito.some(item => item.nombre === nombre)) {
        alert("⚠️ Ya seleccionaste este curso en tu lista de postulación.");
        return;
    }
    
    const imagenLimpia = "img/" + limpiarParaImagen(nombre) + ".jpg";
    
    carrito.push({ 
        nombre: nombre, 
        costo: costo, 
        imagen: imagenLimpia 
    });
    
    guardarCarrito(carrito);
    
    // Feedback visual en el botón
    if (typeof event !== 'undefined' && event && event.target) {
        const btn = event.target;
        const textoOriginal = btn.textContent;
        
        btn.textContent = '✅ Seleccionado';
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
            btn.style.color = '';
        }, 1500);
    }
}

// =========================================================================
// ALGORITMO 5: REACTIVIDAD DE INTERFAZ - CONTADOR DE CURSOS
// =========================================================================
function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll('#carrito-contador, #cart-count');
    const totalElementos = obtenerCarrito().length;
    
    contadores.forEach(contadorElemento => {
        contadorElemento.textContent = totalElementos;
    });
}

// =========================================================================
// BLOQUE 6: INICIALIZACIÓN AUTOMÁTICA DEL SISTEMA
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    
    if (typeof cargarCursos === 'function') {
        cargarCursos();
    }
});
