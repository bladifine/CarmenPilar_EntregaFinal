/**
 * chatbot.js - Lógica de Asistente Virtual 2026
 */
const RESPUESTAS_BOT = {
    saludo: "¡Hola! Bienvenido al asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy aquí para ayudarte con información sobre nuestros cursos gratuitos[cite: 5, 9].",
    ubicacion: "Nuestra sede principal está ubicada en Las Mercedes, La Victoria, estado Aragua.",
    horario: "Los cursos se dictan de lunes a viernes en horario de oficina. Puedes consultar detalles específicos al inscribirte.",
    cursos: "Ofrecemos formación en Gastronomía, Estética, Textil y más. Puedes ver la lista completa en nuestra sección de Cursos.",
    inscripcion: "Para inscribirte: agrega tus cursos al carrito, ve a 'Confirmar Inscripción' y completa tus datos personales[cite: 12, 19].",
    contacto: "Puedes comunicarte directamente con nosotros al 0424-33.60.158[cite: 17].",
    default: "No estoy seguro de entender, pero puedo informarte sobre nuestra ubicación, horarios, cursos o cómo inscribirte[cite: 5]."
};

function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat) {
        chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'flex' : 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-messages');
    
    if (!input || !input.value.trim()) return;

    const textoUsuario = input.value.trim();
    const msg = textoUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Mensaje del usuario
    box.innerHTML += `
        <div class="msg-user">
            <span style="background:#0a192f; color:white; padding:12px; border-radius:15px; display:inline-block; margin-bottom:10px;">
                ${textoUsuario}
            </span>
        </div>`;
    
    input.value = "";

    // Respuesta inteligente del Bot
    setTimeout(() => {
        let respuesta = "";
        
        if (/hola|buen|saludo/.test(msg)) respuesta = RESPUESTAS_BOT.saludo;
        else if (/donde|ubica|sede|lugar/.test(msg)) respuesta = RESPUESTAS_BOT.ubicacion;
        else if (/horario|hora|cuando|tiempo/.test(msg)) respuesta = RESPUESTAS_BOT.horario;
        else if (/que curs|lista|ofert/.test(msg)) respuesta = RESPUESTAS_BOT.cursos;
        else if (/inscri|anot|regis|como/.test(msg)) respuesta = RESPUESTAS_BOT.inscripcion;
        else if (/telefono|llamar|numero|contacto/.test(msg)) respuesta = RESPUESTAS_BOT.contacto;
        else if (/gratis|costo|pago/.test(msg)) respuesta = "¡Todos nuestros cursos son 100% gratuitos![cite: 9, 13]";
        else respuesta = RESPUESTAS_BOT.default;

        box.innerHTML += `
            <div class="msg-bot" style="margin-bottom:10px;">
                <span style="background:white; color:#333; padding:12px; border-radius:15px; border:1px solid #ddd; display:inline-block; border-left:5px solid #00d2ff;">
                    ${respuesta}
                </span>
            </div>`;
        
        box.scrollTop = box.scrollHeight;
    }, 600);
}
