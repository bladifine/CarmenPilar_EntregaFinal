/**
 * motor.js - Lógica Central del Sistema BotEduCarmen
 * Maneja el carrito de cursos y la persistencia de datos.
 */

// 1. FUNCIÓN PARA AGREGAR CURSOS AL CARRITO
function addToCart(nombre, precio) {
    // Obtener lo que ya existe o crear un arreglo vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // MEJORA: Evitar que el usuario agregue el mismo curso dos veces
    const existe = cart.find(item => item.nombre === nombre);
    
    if (existe) {
        alert("⚠️ Ya has seleccionado este curso.");
        return;
    }

    // Agregar el nuevo curso
    cart.push({
        nombre: nombre,
        precio: precio,
        id_curso: Date.now() // ID único para manejo interno
    });

    // Guardar en el navegador
    localStorage.setItem('cart', JSON.stringify(cart));

    // Feedback visual al usuario
    mostrarNotificacion(`✅ ${nombre} añadido correctamente.`);

    // Actualizar la interfaz
    updateCartUI();
}

// 2. FUNCIÓN PARA ELIMINAR CURSOS (Si decides añadir una X en el resumen)
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// 3. ACTUALIZAR LA INTERFAZ (Botón Flotante y Contador)
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const floatBtn = document.getElementById('cart-float');
    const countSpan = document.getElementById('cart-count');

    // Si hay elementos, mostramos el botón flotante de inscripción
    if (floatBtn && countSpan) {
        if (cart.length > 0) {
            floatBtn.style.display = 'block';
            floatBtn.style.animation = 'fadeIn 0.5s ease'; // Animación definida en el CSS
            countSpan.innerText = cart.length;
        } else {
            floatBtn.style.display = 'none';
        }
    }
}

// 4. NOTIFICACIÓN FLOTANTE (Mejora de UX para evitar alerts molestos)
function mostrarNotificacion(mensaje) {
    // Creamos un div temporal para el mensaje
    const toast = document.createElement('div');
    toast.innerText = mensaje;
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#333';
    toast.style.color = 'white';
    toast.style.padding = '12px 25px';
    toast.style.borderRadius = '50px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    
    document.body.appendChild(toast);

    // Desaparece después de 2 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = '0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// 5. INICIALIZACIÓN AL CARGAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Si estamos en la página de contacto y no hay nada en el carrito, redirigir
    if (window.location.pathname.includes('contacto.html')) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Tu selección está vacía. Elige un curso primero.");
            window.location.href = 'cursos.html';
        }
    }
});
