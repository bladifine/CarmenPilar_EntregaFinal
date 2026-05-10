/**
 * chatbot.js - Lógica del Asistente Virtual
 * Proyecto: BotEduCarmen
 */

const baseConocimiento = {
    saludos: { 
        keywords: ["hola", "buenos dias", "tardes", "que tal"], 
        respuesta: "¡Hola! Soy el asistente de BotEduCarmen. ¿Te gustaría conocer nuestros cursos o los requisitos?" 
    },
    cursos: { 
        keywords: ["curso", "clases", "estudiar", "aprender"], 
        respuesta: "Contamos con más de 20 cursos en áreas de Gastronomía, Estética, Textil y Artes. ¿Buscas alguno en específico?" 
    },
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles"],
        respuesta: "Para inscribirte necesitas: Copia de la Cédula y ser mayor de 15 años. ¡Es totalmente gratuito!"
    },
    ubicacion: { 
        keywords: ["donde", "ubicacion", "sede", "direccion"], 
        respuesta: "Estamos ubicados en La Victoria, Sector Las Mercedes, en la sede del CAE 'Carmen Pilar Fernández'." 
    }
};

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    // Si la ventana no existe, detenemos la función para evitar errores
    if (!chatWin) return;

    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
    } else {
        chatWin.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    const textoUsuario = input.value.toLowerCase().trim();
    if (textoUsuario === "") return;

    // Dibujar mensaje del usuario
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#1a237e; color:white; padding:8px 12px; border-radius:15px 15px 0 15px; display:inline-block; font-size:0.9rem;">
                ${input.value}
            </span>
        </div>`;

    // Buscar respuesta
    let respuestaFinal = "Lo siento, no entiendo tu pregunta. Prueba preguntando por 'cursos' o 'requisitos'.";
    
    for (let cat in baseConocimiento) {
        if (baseConocimiento[cat].keywords.some(k => textoUsuario.includes(k))) {
            respuestaFinal = baseConocimiento[cat].respuesta;
            break;
        }
    }

    // Efecto de espera
    setTimeout(() => {
        container.innerHTML += `
            <div style="text-align:left; margin-bottom:12px;">
                <span style="background:#f1f1f1; color:#333; padding:8px 12px; border-radius:15px 15px 15px 0; display:inline-block; font-size:0.9rem; border:1px solid #ddd;">
                    ${respuestaFinal}
                </span>
            </div>`;
        container.scrollTop = container.scrollHeight;
    }, 600);

    input.value = "";
}
