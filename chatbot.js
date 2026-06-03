// CONFIGURACIÓN DE RESPUESTAS[cite: 5]
const RESPUESTAS = {
    saludo: "¡Hola! Bienvenido al CAE 'Carmen Pilar Fernández'. Ofrecemos formación gratuita para el emprendimiento[cite: 5, 9]. ¿Qué curso buscas?",
    ubicacion: "Nuestra sede está en La Victoria, estado Aragua, sector Las Mercedes.",
    horario: "Atendemos de lunes a viernes en horario de oficina. Los cursos tienen sus propios bloques horarios[cite: 5].",
    cursos: "Tenemos más de 25 cursos: Cocina, Repostería, Peluquería, Corte y Costura, y mucho más[cite: 5, 9].",
    inscripcion: "Para inscribirte, agrega tus cursos al carrito y luego ve a la sección de 'Mi Selección' para finalizar el registro.",
    gratis: "¡Sí! Todos nuestros programas son totalmente gratuitos, financiados por la institución[cite: 9].",
    default: "Lo siento, no tengo esa información exacta. Puedes preguntar sobre cursos, ubicación, horarios o inscripciones[cite: 5]."
};

function sendMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-messages');
    
    if (!input || !input.value.trim()) return;

    const textoUsuario = input.value.trim();
    const msg = textoUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Mostrar mensaje del usuario
    box.innerHTML += `<div style="background:var(--azul-primario); color:white; padding:12px; border-radius:15px 15px 0 15px; align-self:flex-end; max-width:80%; margin-bottom:5px;">${textoUsuario}</div>`;
    input.value = "";

    // Respuesta del Bot con retraso para realismo
    setTimeout(() => {
        let r = "";
        if (/hola|buen|saludo/.test(msg)) r = RESPUESTAS.saludo;
        else if (/donde|ubica|sede|lugar|direccion/.test(msg)) r = RESPUESTAS.ubicacion;
        else if (/hora|cuando|dia/.test(msg)) r = RESPUESTAS.horario;
        else if (/que curs|lista|ofert|ensenan/.test(msg)) r = RESPUESTAS.cursos;
        else if (/inscri|anot|regis|como/.test(msg)) r = RESPUESTAS.inscripcion;
        else if (/gratis|costo|pago|cuanto/.test(msg)) r = RESPUESTAS.gratis;
        else r = RESPUESTAS.default;

        box.innerHTML += `<div style="background:white; color:#334155; padding:12px; border-radius:15px 15px 15px 0; align-self:flex-start; max-width:80%; border-left:4px solid #ff6d00; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom:5px;">${r}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    win.style.display = (win.style.display === 'none' || win.style.display === '') ? 'flex' : 'none';
}
