// Respuestas base del Asistente CAE sin repeticiones innecesarias
const RESPUESTAS_BOT = {
    saludo: "¡Hola! Bienvenido al asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy aquí para guiarte con los cursos, requisitos e inscripciones. ¿En qué puedo ayudarte?",
    
    inscripcion: "El proceso es sencillo: selecciona tus cursos en el catálogo, agrégalos al carrito y completa el formulario con tu Nombre y Cédula. ¡Tu cupo se registra en la nube al instante!",
    
    cursos_general: "Nuestra oferta actual incluye especialidades en Gastronomía, Estética, Textil, Arte y Técnica. ¿Te gustaría conocer el detalle de alguna de estas áreas?",
    
    comida: "Para los amantes de la cocina tenemos: Cocina Nacional, Panadería, Repostería, Pastelería y Dulces Criollos.[cite: 2] Todos son ideales para iniciar tu propio emprendimiento.",

    default: "No estoy seguro de entenderte del todo. Pero puedo ayudarte a inscribirte, mostrarte la lista de cursos o darte nuestra ubicación.[cite: 2] ¿Qué prefieres saber?"
};

function sendMessage() {
    const input = document.getElementById('user-input');
    if (!input) return;

    let msg = input.value.trim().toLowerCase();
    if (!msg) return;

    // Limpieza de acentos
    msg = msg.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    appendMessage(input.value, 'user');
    input.value = '';

    setTimeout(() => {
        let respuesta = "";

        // 1. SALUDOS
        if (/hola|buen|saludo/.test(msg)) {
            respuesta = RESPUESTAS_BOT.saludo;
        } 
        
        // 2. COMIDA / GASTRONOMÍA (Respuesta específica solicitada)
        else if (/comida|cocina|panader|reposter|pastel|dulce|hambre/.test(msg)) {
            respuesta = RESPUESTAS_BOT.comida;
        }

        // 3. CURSOS GENERAL
        else if (/que cursos|cuales cursos|lista|ofert|ensenan/.test(msg)) {
            respuesta = RESPUESTAS_BOT.cursos_general;
        }

        // 4. INSCRIPCIÓN Y PASOS
        else if (/inscri|anot|regis|cupo|pasos|como/.test(msg)) {
            respuesta = RESPUESTAS_BOT.inscripcion;
        }

        // 5. GRATUIDAD (Pregunta trampa)
        else if (/costo|precio|pago|gratis|cuanto/.test(msg)) {
            respuesta = "¡Todos nuestros cursos son 100% gratuitos![cite: 2] No necesitas pagar inscripción ni mensualidades para formarte con nosotros.";
        }

        // 6. MANEJO DE INCOHERENCIAS
        else {
            respuesta = RESPUESTAS_BOT.default;
        }

        appendMessage(respuesta, 'bot');
    }, 800); // 0.8 segundos de espera para fluidez
}

function appendMessage(text, sender) {
    const box = document.getElementById('chat-messages');
    if (!box) return;

    const div = document.createElement('div');
    div.style.textAlign = sender === 'user' ? 'right' : 'left';
    div.style.marginBottom = '12px';
    
    const inner = document.createElement('div');
    inner.style.display = 'inline-block';
    inner.style.padding = '12px 18px';
    inner.style.borderRadius = sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0';
    inner.style.fontSize = '0.95rem';
    inner.style.maxWidth = '85%';
    inner.style.whiteSpace = 'pre-line';
    inner.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';

    if (sender === 'user') {
        inner.style.background = '#00d2ff';
        inner.style.color = '#0a192f';
        inner.style.fontWeight = '600';
    } else {
        inner.style.background = 'white';
        inner.style.color = '#1e293b';
        inner.style.borderLeft = '5px solid #ff6d00'; // Naranja para resaltar al bot
    }

    inner.innerText = text;
    div.appendChild(inner);
    box.appendChild(div);
    
    box.scrollTop = box.scrollHeight;
}

function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat) {
        chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
    }
}

document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
