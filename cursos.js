/**
 * cursos.js - Base de Datos Completa y Motor de Cursos
 * BotEduCarmen
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
    const grid = document.getElementById('catalogo-container');
    if (!grid) return;

    grid.innerHTML = MIS_CURSOS.map(c => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const yaSeleccionado = cart.some(item => item.nombre === c.name);
        
        const textoBtn = yaSeleccionado ? "✅ SELECCIONADO" : "SELECCIONAR";
        const estiloBtn = yaSeleccionado ? "background: #10b981; color: white;" : "";

        return `
            <div class="curso-card" data-name="${c.name.toLowerCase()}">
                <div class="curso-img" style="background-image: url('${c.img}'), url('img/logo.png')"></div>
                <div class="curso-info">
                    <span style="font-size: 0.8rem; font-weight:800; color: var(--azul-electrico); text-transform: uppercase;">${c.cat}</span>
                    <h3 class="curso-titulo">${c.name}</h3>
                    <div class="curso-meta">
                        <span style="color:#64748b; font-weight:600; font-size:0.9rem;">Área: ${c.cat}</span>
                        <span class="curso-costo">${c.price}</span>
                    </div>
                    <button class="btn-add" style="${estiloBtn}" onclick="toggleSeleccion('${c.name}', '${c.img}')">
                        ${textoBtn}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filtrarCursos() {
    const buscador = document.getElementById('buscador');
    if(!buscador) return;
    const busqueda = buscador.value.toLowerCase();
    
    document.querySelectorAll('.curso-card').forEach(card => {
        const nombreCurso = card.dataset.name;
        card.style.display = nombreCurso.includes(busqueda) ? "flex" : "none";
    });
}

function toggleSeleccion(nombre, imagen) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(x => x.nombre === nombre);

    if (index !== -1) {
        cart.splice(index, 1);
    } else {
        cart.push({ nombre: nombre, costo: "Gratis", imagen: imagen });
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
