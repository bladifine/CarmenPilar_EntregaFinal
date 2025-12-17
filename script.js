// script.js — funciones globales seguras

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Botón ↑
window.addEventListener('scroll', () => {
    const btn = document.getElementById('volver-arriba');
    if (btn) {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});
