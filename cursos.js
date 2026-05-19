const MIS_CURSOS = [
    { name: "Modistería", price: "Gratis", cat: "Costura", img: "img/modisteria.jpg" },
    { name: "Cocina Bilingüe", price: "Gratis", cat: "Gastronomía", img: "img/cocina.jpg" },
    { name: "Barbería", price: "Gratis", cat: "Estética", img: "img/barberia.jpg" },
    { name: "Uñas", price: "Gratis", cat: "Estética", img: "img/estetica_de_unas.jpg" }, // Ajustado al nombre real
    { name: "Corte y Confección", price: "Gratis", cat: "Diseño", img: "img/corte_y_confeccion.jpg" } // Ajustado al nombre real
];

function mostrarCursos() {
    const grid = document.getElementById('cursos-grid');
    if (!grid) return;

    grid.innerHTML = MIS_CURSOS.map(c => `
        <div class="course-card">
            <img src="${c.img}" alt="${c.name}" onerror="this.onerror=null; this.src='img/logo.png';">
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
    const tarjetas = document.querySelectorAll('.course-card');
    
    tarjetas.forEach(tarjeta => {
        const texto = tarjeta.querySelector('h3').innerText.toLowerCase();
        if (texto.includes(busqueda)) {
            tarjeta.style.display = "block";
        } else {
            tarjeta.style.display = "none";
        }
    });
}
