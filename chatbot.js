// Respuestas base del Asistente CAE optimizadas
const RESPUESTAS_BOT = {
    saludo: "¡Hola! Soy el asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy listo para ayudarte con información sobre nuestra historia, los pasos de inscripción, la oferta de cursos gratuitos, horarios o ubicación. ¿Qué deseas consultar?",
    
    // Respuesta para la trampa: "¿Esto tiene validez?"
    certificado: "¡Absolutamente! Todos nuestros cursos están certificados y avalados, lo que te permite utilizar tu certificado para trabajar o emprender legalmente.",
    
    // Respuesta para la trampa: "¿Necesito ser bachiller o profesional?"
    nivel: "No necesitas títulos previos. Solo debes ser mayor de 15 años, traer tu copia de cédula y tener ganas de aprender.",
    
    inscripcion: "Para inscribirte este 2026: selecciona tus cursos, ve al carrito, llena tus datos (Nombre y Cédula) y dale a finalizar. ¡Tu cupo se guarda en la nube al instante!",
    
    cursos: "Nuestra oferta incluye Gastronomía, Textil, Estética, Arte y Técnica.[cite: 2] ¿Te gustaría saber sobre alguna especialidad en particular?",

    default: "No estoy seguro de entenderte, pero puedo informarte sobre nuestros cursos, los requisitos, la ubicación o cómo inscribirte.[cite: 2] ¿Qué prefieres?"
};

function sendMessage() {
    const input = document.getElementById('user-input');
    if (!input) return;

    let msg = input.value.trim().toLowerCase();
    if (!msg) return;

    // LIMPIEZA: Quita acentos para que 'inscripción' e 'inscripcion' funcionen igual
    msg = msg.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    appendMessage(input.value, 'user');
    input.value = '';

    setTimeout(() => {
        let respuesta = "";

        // TRAMPA 1: El costo (Fundamental que quede claro que es gratis)
        if (/costo|precio|pago|pagar|cuanto|vender|comprar|gratis/.test(msg)) {
            respuesta = "¡Importante! Todos nuestros cursos son **100% gratuitos**.[cite: 2] El CAE es una institución de formación para el pueblo y no requiere pagos de inscripción ni mensualidades.";
        }
        
        // TRAMPA 2: Validez / Título
        else if (/titulo|certificado|validez|sirve|aval|diploma/.test(msg)) {
            respuesta = RESPUESTAS_BOT.certificado;
        }

        // TRAMPA 3: Nivel de estudios / Edad
        else if (/estudio|bachiller|primaria|edad|viejo|joven|requisito/.test(msg)) {
            respuesta = "Los requisitos son mínimos: ser mayor de 15 años y presentar tu copia de cédula. No importa tu nivel educativo previo.[cite: 2]";
        }

        // TRAMPA 4: ¿Quién eres? (Identidad de la IA)
        else if (/quien eres|que eres|humano|robot|bot/.test(msg)) {
            respuesta = "Soy el Asistente Virtual del CAE 'Carmen Pilar Fernández'. Mi misión es facilitarte el proceso de inscripción 2026 y responder tus dudas sobre los talleres.[cite: 2]";
        }

        // FLUJO NORMAL: Inscripción
        else if (/inscri|anot|regis|cupo|pasos/.test(msg)) {
            respuesta = RESPUESTAS_BOT.inscripcion;
        }
        
        // FLUJO NORMAL: Lista de cursos
        else if (/curs|ofert|clase|lista|ensenan/.test(msg)) {
            respuesta = RESPUESTAS_BOT.cursos;
        }

        // SALUDOS
        else if (/hola|buen|saludo/.test(msg)) {
            respuesta = RESPUESTAS_BOT.saludo;
        }

        // MANEJO DE INCOHERENCIAS (Preguntas locas o errores)
        else {
            respuesta = RESPUESTAS_BOT.default;
        }

        appendMessage(respuesta, 'bot');
    }, 1000); // 1 segundo de espera para que parezca que piensa
}

function appendMessage(text, sender) {
    const box = document.getElementById('chat-messages');
    if (!box) return;

    const div = document.createElement('div');
    div.style.textAlign = sender === 'user' ? 'right' : 'left';
    div.style.marginBottom = '10px';
    
    const inner = document.createElement('div');
    inner.style.display = 'inline-block';
    inner.style.padding = '12px 18px';
    inner.style.borderRadius = sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0';
    inner.style.fontSize = '0.95rem';
    inner.style.maxWidth = '80%';
    inner.style.whiteSpace = 'pre-line';
    inner.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';

    if (sender === 'user') {
        inner.style.background = '#00d2ff';
        inner.style.color = '#0a192f';
        inner.style.fontWeight = 'bold';
    } else {
        inner.style.background = 'white';
        inner.style.color = '#1e293b';
        inner.style.borderLeft = '5px solid #00d2ff';
    }

    inner.innerText = text;
    div.appendChild(inner);
    box.appendChild(div);
    
    // Scroll automático suave
    box.scrollTop = box.scrollHeight;
}

function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat) {
        chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
    }
}

// Enviar con Enter
document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
