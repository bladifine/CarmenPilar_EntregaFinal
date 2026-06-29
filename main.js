/**
 * =========================================================================
 * BotEduCarmen 2026 - ARCHIVO DE LÓGICA CENTRAL UNIFICADO (script.js)
 * Desarrollado por: Bladimir Silva
 * PNF en Informática - Trabajo de Investigación
 * =========================================================================
 * 
 * 💡 MENSAJE PARA BLADIMIR SOBRE LA ESTRUCTURA GLOBAL:
 * Este archivo ha sido unificado utilizando la clave estándar 'cart' en localStorage. 
 * Esto garantiza que los cursos seleccionados aquí se comuniquen perfectamente con 
 * 'carrito.html' y 'contacto.html', resolviendo el problema de la pérdida de datos.
 */

// =========================================================================
// ALGORITMO 1: NORMALIZACIÓN Y GENERACIÓN DINÁMICA DE IMÁGENES
// =========================================================================
function limpiarParaImagen(texto) {
    return texto.toLowerCase()
        .normalize("NFD")               // Descompone caracteres con tildes (ej: 'ó' pasa a 'o' + acento)
        .replace(/[\u0300-\u036f]/g, "") // Remueve quirúrgicamente todos los acentos y tildes
        .replace(/\s+/g, "_")           // Convierte espacios en blanco en guiones bajos
        .replace(/[^\w]/g, "");         // Elimina cualquier símbolo especial como puntos o comas
}

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE ALGORITMO:
 * Este algoritmo automatiza la carga de recursos multimedia. En lugar de escribir a mano 
 * las rutas de las imágenes para cada curso, el sistema toma el nombre del curso, le quita 
 * los acentos, convierte los espacios en guiones bajos y genera la ruta exacta dentro de la 
 * carpeta 'img/'. Esto hace que tu software sea altamente escalable y evita enlaces rotos.
 */


// =========================================================================
// ALGORITMO 2: PERSISTENCIA DE DATOS - LECTURA DEL ESTADO (localStorage)
// =========================================================================
function obtenerCarrito() {
    // Busca en la memoria local bajo la clave unificada 'cart'
    // Si está vacío, inicializa un arreglo vacío '[]' para evitar excepciones de tipo null
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE ALGORITMO:
 * Aquí está la solución al problema principal. Este método lee la memoria física del navegador.
 * Al usar 'cart', este archivo ahora habla exactamente el mismo idioma que tus archivos 
 * 'carrito.html' y 'contacto.html'. El uso de JSON.parse es fundamental porque transforma el 
 * texto plano almacenado en la memoria en una estructura de objetos manipulable por JavaScript.
 */


// =========================================================================
// ALGORITMO 3: PERSISTENCIA DE DATOS - ESCRITURA Y SINCRONIZACIÓN
// =========================================================================
function guardarCarrito(carrito) {
    // Serializa el objeto o arreglo de JavaScript a un string plano en formato JSON
    localStorage.setItem('cart', JSON.stringify(carrito));
    
    // Ejecuta inmediatamente la reactividad de la interfaz para refrescar contadores
    actualizarContadorCarrito();
}

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE ALGORITMO:
 * El almacenamiento local del navegador (localStorage) solo es capaz de guardar texto plano. 
 * Este algoritmo toma la lista de cursos activos, la transforma en una cadena de texto JSON 
 * mediante JSON.stringify(), la guarda de forma permanente (así el usuario cierre la pestaña) 
 * y actualiza los indicadores visuales en pantalla en tiempo real sin recargar la página.
 */


// =========================================================================
// ALGORITMO 4: LÓGICA DE NEGOCIO - INSERCIÓN EXCLUSIVA EN EL CARRITO
// =========================================================================
function agregarAlCarrito(nombre, costo) {
    let carrito = obtenerCarrito();
    
    // Validación lógica: Evita que el usuario duplique o se inscriba dos veces en el mismo curso
    if (carrito.some(item => item.nombre === nombre)) {
        alert("⚠️ Ya seleccionaste este curso en tu lista de postulación.");
        return;
    }
    
    // Genera automáticamente la ruta de la imagen usando el Algoritmo 1
    const imagenLimpia = "img/" + limpiarParaImagen(nombre) + ".jpg";
    
    // Estructuración exacta del objeto para mantener compatibilidad con renderizadores externos
    carrito.push({ 
        nombre: nombre, 
        costo: costo, 
        imagen: imagenLimpia 
    });
    
    // Guarda el nuevo estado físico
    guardarCarrito(carrito);
    
    // CAMBIO DE INTERFAZ (FEEDBACK VISUAL AL USUARIO):
    // Si la acción fue disparada por un evento del navegador (clic en botón), modificamos el botón temporalmente
    if (typeof event !== 'undefined' && event && event.target) {
        const btn = event.target;
        const textoOriginal = btn.textContent;
        
        btn.textContent = '✅ Seleccionado';
        btn.style.background = '#10b981'; // Cambia a verde esmeralda (estilo moderno 2026)
        btn.style.color = '#ffffff';
        
        // Retorna el botón a su estado original después de 1.5 segundos
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
            btn.style.color = '';
        }, 1500);
    }
}

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE ALGORITMO:
 * Este es el motor de selección. Incluye dos detalles de alta calidad para tu proyecto:
 * 1. Control de Errores: El método '.some()' verifica si el curso ya existe en el carrito. Si existe, 
 *    frena la ejecución con un alert, protegiendo la integridad de la base de datos de inscripciones.
 * 2. Experiencia de Usuario (UX): Cambia el botón a verde con el mensaje '✅ Seleccionado' por segundo y medio. 
 *    Esto le demuestra al jurado que diseñaste un sistema interactivo y reactivo enfocado en el usuario.
 */


// =========================================================================
// ALGORITMO 5: REACTIVIDAD DE INTERFAZ - CONTADOR DE CURSOS
// =========================================================================
function actualizarContadorCarrito() {
    // Selector polimórfico: Captura tanto ID antiguos como nuevos selectores CSS en cualquier página
    const contadores = document.querySelectorAll('#carrito-contador, #cart-count');
    
    // Obtiene la longitud exacta del arreglo guardado en memoria
    const totalElementos = obtenerCarrito().length;
    
    // Renderiza el número en todos los contadores de la interfaz gráfica encontrados
    contadores.forEach(contadorElemento => {
        contadorElemento.textContent = totalElementos;
    });
}

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE ALGORITMO:
 * Para evitar que el número del carrito se quede "congelado" o requiera actualizar la página, 
 * este algoritmo utiliza '.querySelectorAll()'. Esto significa que busca en todo el documento HTML 
 * cualquier elemento que sirva de contador (sin importar si se llama 'cart-count' o 'carrito-contador') 
 * e inyecta la cantidad exacta de cursos seleccionados en su interior de forma simultánea.
 */


// =========================================================================
// BLOQUE 6: INICIALIZACIÓN AUTOMÁTICA DEL SISTEMA
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Al cargar por completo el DOM, se sincroniza el estado actual del carrito
    actualizarContadorCarrito();
    
    // Acoplamiento seguro: Si existe una función de renderizado local (como cargarCursos), la arranca
    if (typeof cargarCursos === 'function') {
        cargarCursos();
    }
});

/**
 * 💡 MENSAJE PARA BLADIMIR SOBRE ESTE BLOQUE:
 * El evento 'DOMContentLoaded' es un disparador de seguridad fundamental en JavaScript. Garantiza 
 * que los scripts no se ejecuten antes de que el código HTML esté completamente dibujado por el navegador. 
 * Al activarse, asegura que el número del carrito aparezca reflejado inmediatamente desde el primer 
 * milisegundo en que el usuario entra al sitio web.
 */
