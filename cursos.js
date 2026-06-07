/**
 * cursos.js - Base de Datos de Cursos Actualizada 2026
 * Mapeo exacto con los archivos reales en la carpeta /img
 */

const MIS_CURSOS = [
    { name: "Modistería", price: "Gratis", cat: "Textil", img: "img/modisteria.jpg" },
    { name: "Ropa Íntima", price: "Gratis", cat: "Textil", img: "img/ropa_intima.jpg" },
    { name: "Lencería", price: "Gratis", cat: "Textil", img: "img/lenceria.jpg" },
    { name: "Tejer", price: "Gratis", cat: "Textil", img: "img/tejer.jpg" },
    { name: "Cocina Nacional", price: "Gratis", cat: "Gastronomía", img: "img/cocina_nacional.jpg" },
    { name: "Panadería", price: "Gratis", cat: "Gastronomía", img: "img/panaderia.jpg" },
    { name: "Repostería", price: "Gratis", cat: "Gastronomía", img: "img/reposteria.jpg" },
    { name: "Repostería y Pastelería", price: "Gratis", cat: "Gastronomía", img: "img/reposteria_y_pasteleria.jpg" },
    { name: "Dulces Criollos", price: "Gratis", cat: "Gastronomía", img: "img/dulces_criollos.jpg" },
    { name: "Barbería", price: "Gratis", cat: "Estética", img: "img/barberia.jpg" },
    { name: "Peluquería", price: "Gratis", cat: "Estética", img: "img/peluqueria.jpg" },
    { name: "Estética de Uñas", price: "Gratis", cat: "Estética", img: "img/estetica_de_unas.jpg" },
    { name: "Manicure y Pedicure", price: "Gratis", cat: "Estética", img: "img/manicure_pedicure.jpg" },
    { name: "Estética Avanzada", price: "Gratis", cat: "Estética", img: "img/estetica_avanzada.jpg" },
    { name: "Cosmetología", price: "Gratis", cat: "Estética", img: "img/cosmetologia.jpg" },
    { name: "Masaje", price: "Gratis", cat: "Salud", img: "img/masaje.jpg" },
    { name: "Masoterapia", price: "Gratis", cat: "Salud", img: "img/masoterapia.jpg" },
    { name: "Dibujo Artístico", price: "Gratis", cat: "Artes", img: "img/dibujo_artistico.jpg" },
    { name: "Pintura Artística", price: "Gratis", cat: "Artes", img: "img/pintura_artistica.jpg" },
    { name: "Pintura Avanzada", price: "Gratis", cat: "Artes", img: "img/pintura_avanzada.jpg" },
    { name: "Puntillismo Básico", price: "Gratis", cat: "Artes", img: "img/puntillismo_basico.jpg" },
    { name: "Puntillismo Avanzado", price: "Gratis", cat: "Artes", img: "img/puntillismo_avanzado.jpg" },
    { name: "Rostros", price: "Gratis", cat: "Artes", img: "img/rostros.jpg" },
    { name: "Manualidades", price: "Gratis", cat: "Artes", img: "img/manualidades.jpg" },
    { name: "Reparación de Electrodomésticos", price: "Gratis", cat: "Técnico", img: "img/electrodomesticos.jpg" },
    { name: "Electricidad", price: "Gratis", cat: "Técnico", img: "img/electricidad.jpg" }
];

function mostrarCursos() {
    const grid = document.getElementById('cursos-grid');
    if (!grid) return;

    grid.innerHTML = MIS_CURSOS.map(c => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const yaSeleccionado = cart.some(item => item.nombre === c.name);
        
        const textoBtn = yaSeleccionado ? "✅ SELECCIONADO" : "SELECCIONAR";
        const claseBtn = yaSeleccionado ? "btn-primary seleccionado" : "btn-primary";
        const urlDetalle = `detalle-curso.html?curso=${encodeURIComponent(c.name)}`;

        return `
            <div class="curso-card" data-name="${c.name.toLowerCase()}">
                <a href="${urlDetalle}" style="display:block; text-decoration:none;">
                    <div class="curso-img-box" style="cursor:pointer;">
                        <img src="${c.img}" alt="${c.name}" onerror="this.src='img/logo.png'">
                    </div>
                </a>
                <div class="curso-info">
                    <span class="tag">${c.cat}</span>
                    <h3 style="min-height: 50px; display: flex; align-items: center;">${c.name}</h3>
                    <p class="costo">Costo: <b>${c.price}</b></p>
                    
                    <div style="display:flex; gap:10px; margin-top:20px; width:100%;">
                        <button class="${claseBtn}" onclick="toggleSeleccion('${c.name}', '${c.img}')" style="flex: 1; padding: 12px 5px; font-size: 0.85rem; font-weight: 700; border-radius: 12px; cursor: pointer; border: none; white-space: nowrap;">
                            ${textoBtn}
                        </button>
                        <a href="${urlDetalle}" class="btn-detalles" style="flex: 1; padding: 12px 5px; font-size: 0.85rem; font-weight: 700; border-radius: 12px; text-decoration: none; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.2); text-align: center; white-space: nowrap; box-sizing: border-box;">
                            VER DETALLES
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filtrarCursos() {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    document.querySelectorAll('.curso-card').forEach(card => {
        const nombreCurso = card.dataset.name;
        card.style.display = nombreCurso.includes(busqueda) ? "block" : "none";
    });
}

function toggleSeleccion(nombre, imagen) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(x => x.nombre === nombre);

    if (index !== -1) {
        cart.splice(index, 1);
    } else {
        cart.push({ nombre: nombre, imagen: imagen });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    mostrarCursos();
    actualizarUIContador();
}

function actualizarUIContador() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const floatBtn = document.getElementById('cart-float');
    const countSpan = document.getElementById('cart-count');
    
    if (floatBtn && countSpan) {
        floatBtn.style.display = cart.length > 0 ? "block" : "none";
        countSpan.innerText = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCursos();
    actualizarUIContador();
});
