// Respuestas directas y profesionales del CAE
const RESPUESTAS_BOT = {
    saludo: "¡Hola! Bienvenido al asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy aquí para ayudarte con información sobre nuestros cursos, inscripciones y ubicación. ¿Qué deseas consultar?",
    
    ubicacion: "Nos encontramos ubicados en la sede física del CAE 'Carmen Pilar Fernández'. ¡Te esperamos!",
    
    horario: "Nuestros cursos se dictan de lunes a viernes en horario de oficina. Te recomendamos visitarnos para conocer los horarios específicos de cada taller.",
    
    cursos: "Nuestra oferta incluye: \n• Gastronomía (Cocina, Panadería, Repostería) \n• Estética (Barbería, Peluquería, Uñas) \n• Textil, Arte y Técnica.[cite: 2] ¿Alguna área te interesa en especial?",
    
    inscripcion: "Para inscribirte: elige tus cursos en el catálogo, añádelos al carrito y completa el formulario con tu Nombre y Cédula.[cite: 2] ¡Es totalmente gratuito!",

    default: "No estoy seguro de haber entendido. Pero puedo informarte sobre los cursos, los horarios, nuestra ubicación o cómo inscribirte.[cite: 2] ¿Qué prefieres saber?"
};

function sendMessage() {
    const input = document.getElementById('user-input');
    if (!input) return;

    let msg = input.value.trim().toLowerCase();
    if (!msg) return;

    // Limpieza de acentos para mayor precisión
    msg = msg.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    appendMessage(input.value, 'user');
    input.value = '';

    setTimeout(() => {
        let respuesta = "";

        // 1. UBICACIÓN (Respuesta a "donde estas")
        if (/donde|ubica|direcc|sede|lugar/.test(msg)) {
            respuesta = RESPUESTAS_BOT.ubicacion;
        } 
        
        // 2. HORARIOS (Respuesta a "que horario")
        else if (/horario|hora|cuando|tiempo|dias/.test(msg)) {
            respuesta = RESPUESTAS_BOT.horario;
        }

        // 3. CURSOS Y OFERTA
        else if (/que curs|lista|ensenan|ofert|clases/.test(msg)) {
            respuesta = RESPUESTAS_BOT.cursos;
        }

        // 4. INSCRIPCIÓN
        else if (/inscri|anot|regis|pasos|como/.test(msg)) {
            respuesta = RESPUESTAS_BOT.inscripcion;
        }

        // 5. SALUDOS
        else if (/hola|buen|saludo/.test(msg)) {
            respuesta = RESPUESTAS_BOT.saludo;
        }

        // 6. MANEJO DE INCOHERENCIAS
        else {
            respuesta = RESPUESTAS_BOT.default;
        }

        appendMessage(respuesta, 'bot');
    }, 800); 
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
        inner.style.borderLeft = '5px solid #ff6d00'; 
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
