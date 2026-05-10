// Clave única para la base de datos local
const DB_NAME = 'capifer_database';

// 1. Función para agregar al carrito (La que da el error)
function addToCart(nombre, precio, imagen) {
    console.log("Intentando agregar:", nombre);
    let carrito = JSON.parse(localStorage.getItem(DB_NAME) || '[]');
    
    if (carrito.find(item => item.nombre === nombre)) {
        alert("⚠️ Ya has seleccionado este curso.");
        return;
    }

    carrito.push({ nombre, precio, imagen });
    localStorage.setItem(DB_NAME, JSON.stringify(carrito));
    
    actualizarContador();
    
    if(confirm("✅ ¡Agregado! ¿Quieres ir al carrito ahora?")) {
        window.location.href = 'carrito.html';
    }
}

// 2. Actualizar el contador visual
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem(DB_NAME) || '[]');
    const contador = document.getElementById('cart-count');
    if (contador) contador.textContent = carrito.length;
}

// 3. Cargar los cursos en la página de cursos.html
function cargarCursos() {
    const grid = document.getElementById('cursos-grid');
    if (!grid) return; // Si no estamos en la página de cursos, no hace nada

    const MIS_CURSOS = [
        { nombre: "Modistería", precio: "Gratis", img: "img/modisteria.jpg" },
        { nombre: "Cocina Bilingüe", precio: "Gratis", img: "img/cocina.jpg" },
        { nombre: "Barbería", precio: "Gratis", img: "img/barberia.jpg" },
        { nombre: "Estética de Uñas", precio: "Gratis", img: "img/unas.jpg" }
    ];

    grid.innerHTML = MIS_CURSOS.map(c => `
        <div class="course-card">
            <img src="${c.img}" onerror="this.src='https://via.placeholder.com/300x200'">
            <div class="course-info">
                <h3>${c.nombre}</h3>
                <p>Costo: ${c.precio}</p>
                <button class="btn-primary" onclick="addToCart('${c.nombre}', '${c.precio}', '${c.img}')">
                    Seleccionar Curso
                </button>
            </div>
        </div>
    `).join('');
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    cargarCursos();
});
