// comentarios.js — con persistencia y ID correcto
let comentarios = [];

// Cargar previos
const guardados = localStorage.getItem('comentarios_carmen');
if (guardados) {
    try {
        comentarios = JSON.parse(guardados);
    } catch (e) {
        console.warn("⚠️ JSON inválido en comentarios_carmen");
    }
}

function agregarComentario() {
    const nombre = document.getElementById("nombre-comentario")?.value;
    const texto = document.getElementById("texto-comentario")?.value;
    const calificacion = document.getElementById("calificacion")?.value;

    if (!nombre || !texto || !calificacion) {
        alert("Por favor llena todos los campos.");
        return;
    }

    comentarios.push({ nombre, texto, calificacion });
    localStorage.setItem('comentarios_carmen', JSON.stringify(comentarios));
    mostrarComentarios();
}

function mostrarComentarios() {
    const contenedor = document.getElementById("lista-comentarios"); // ✅ ID corregido
    if (!contenedor) return;

    contenedor.innerHTML = comentarios.length === 0 
        ? "<p>No hay comentarios aún.</p>"
        : comentarios.map(com => `
            <div class="comentario" style="border-bottom:1px solid #eee; padding:12px 0;">
                <strong>${com.nombre}</strong> 
                <span>${'⭐'.repeat(Math.round(com.calificacion))}${'☆'.repeat(5 - Math.round(com.calificacion))} (${com.calificacion}/5)</span>
                <p>${com.texto}</p>
            </div>
        `).join('');
}

// Cargar al inicio
document.addEventListener('DOMContentLoaded', mostrarComentarios);
