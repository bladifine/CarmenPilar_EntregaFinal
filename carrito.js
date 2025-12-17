// carrito.js — muestra inscripciones en el carrito
document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('contenido-carrito');
    if (!cont) return;

    const raw = localStorage.getItem('inscripciones_carmen');
    const insc = raw ? JSON.parse(raw) : [];

    if (insc.length === 0) {
        cont.innerHTML = `
            <p style="text-align:center; color:#666;">
                🛒 Tu carrito está vacío.<br>
                <small>Inscríbete a un curso desde la página de detalle.</small>
            </p>
        `;
    } else {
        let html = `<h3>Tus inscripciones (${insc.length})</h3><ul style="list-style:none; padding:0;">`;
        insc.forEach(i => {
            html += `
                <li style="border-bottom:1px solid #eee; padding:12px 0;">
                    <strong>✅ ${i.nombre_curso}</strong><br>
                    <small>👤 ${i.nombre} | 📧 ${i.email}</small><br>
                    <small>📅 ${i.fecha}</small>
                </li>
            `;
        });
        html += `</ul>`;
        cont.innerHTML = html;
    }
});

// Función global para compatibilidad
function actualizarCarrito() {
    document.dispatchEvent(new Event('DOMContentLoaded'));
}
