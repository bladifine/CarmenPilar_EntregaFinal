const MIS_CURSOS = [
    { name: "Modistería", price: "Gratis", cat: "Costura", img: "img/modisteria.jpg" },
    { name: "Cocina Bilingüe", price: "Gratis", cat: "Gastronomía", img: "img/cocina.jpg" },
    { name: "Barbería", price: "Gratis", cat: "Estética", img: "img/barberia.jpg" },
    { name: "Uñas", price: "Gratis", cat: "Estética", img: "img/unas.jpg" },
    { name: "Corte y Confección", price: "Gratis", cat: "Diseño", img: "img/corte.jpg" }
];

function mostrarCursos() {
    const grid = document.getElementById('cursos-grid');
    if (!grid) return;

    grid.innerHTML = MIS_CURSOS.map(c => `
        <div class="course-card">
            <img src="${c.img}" alt="${c.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Curso'">
            <div class="course-info">
                <h3>${c.name}</h3>
                <span class="badge">${c.cat}</span>
                <p>Costo: <strong>${c.price}</strong></p>
                <button class="btn-primary" onclick="addToCart('${c.name}', '${c.price}', '${c.img}')">
                    Seleccionar
                </button>
            </div>
        </div>
    `).join('');
}

function filtrarCursos() {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const cards = document.querySelectorAll('.course-card');
    
    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();
        card.style.display = texto.includes(busqueda) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', mostrarCursos);
