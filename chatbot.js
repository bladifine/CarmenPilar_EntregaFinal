/**
 * chatbot.js - Lógica del Asistente Virtual Inteligente Expandido
 * Proyecto: BotEduCarmen 2026
 */

const baseConocimiento = {
    saludos: { 
        keywords: ["hola", "buenos dias", "buenas tardes", "que tal", "saludos"], 
        respuesta: "¡Hola! Soy el asistente virtual de BotEduCarmen. ¿Te gustaría conocer la oferta de cursos, las áreas disponibles o los requisitos de inscripción?" 
    },
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "inscribir"],
        respuesta: "Para inscribirte solo necesitas: Copia de tu Cédula de Identidad y ser mayor de 15 años. ¡El proceso y las clases son totalmente gratuitos!"
    },
    ubicacion: { 
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "sitio", "las mercedes"], 
        respuesta: "Estamos ubicados en La Victoria, Estado Aragua, específicamente en el Sector Las Mercedes, en la sede del Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'." 
    },
    gastronomia: {
        keywords: ["gastronomia", "cocina", "bilingue", "comida", "chef", "panaderia", "reposteria"],
        respuesta: "En el área de Gastronomía contamos con el curso estrella de 'Cocina Bilingüe'. Aprenderás técnicas culinarias profesionales combinadas con terminología técnica en inglés. ¡Ideal para emprender!"
    },
    estetitca: {
        keywords: ["barberia", "barbero", "unas", "manicure", "pedicure", "estetitca", "peluqueria"],
        respuesta: "En el área de Estética ofrecemos los cursos prácticos de 'Barbería Profesional' y 'Estética de Uñas'. Incluyen diseño de cortes modernos y técnicas avanzadas de manicure/pedicure."
    },
    textil: {
        keywords: ["modisteria", "confeccion", "corte", "costura", "lenceria", "ropa", "textil", "coser"],
        respuesta: "Nuestra área Textil cuenta con los cursos de 'Modistería' y 'Corte y Confección'. Aprenderás desde el uso de máquinas de coser tradicionales e industriales hasta el patronaje y confección de prendas desde cero."
    },
    electricidad: {
        keywords: ["electricidad", "electrica", "circuitos", "cables", "mantenimiento", "electricista"],
        respuesta: "El área técnica y tecnológica incluye capacitación práctica en Fundamentos de Electricidad, donde aprenderás instalaciones eléctricas residenciales, medidas de seguridad y reparación de circuitos básicos."
    },
    cursos: { 
        keywords: ["curso", "clases", "estudiar", "aprender", "oferta", "talleres", "tienes"], 
        respuesta: "Contamos con una amplia oferta en las áreas de Gastronomía (Cocina Bilingüe), Estética (Barbería y Uñas), Textil (Modistería, Corte y Confección) y Electricidad. ¿Te interesa saber más sobre alguna de estas áreas?" 
    }
};

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
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

    // Dibujar el mensaje del usuario en la pantalla
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#0a192f; color:white; padding:10px 15px; border-radius:20px 20px 0 20px; display:inline-block; font-size:0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                ${input.value}
            </span>
        </div>`;

    // Buscar la mejor respuesta basándonos en prioridades específicas primero
    let respuestaFinal = "Lo siento, no tengo esa información específica de momento. Puedes intentar consultando por 'cursos', 'gastronomia', 'electricidad', 'estetitca', 'textil' o 'requisitos'.";
    
    // Lista ordenada de prioridades (busca primero temas específicos, luego genéricos)
    const ordenCategorias = ['gastronomia', 'estetitca', 'textil', 'electricidad', 'requisitos', 'ubicacion', 'saludos', 'cursos'];

    for (let cat of ordenCategorias) {
        if (baseConocimiento[cat].keywords.some(k => textoUsuario.includes(k))) {
            respuestaFinal = baseConocimiento[cat].respuesta;
            break;
        }
    }

    // Guardar el input limpio y limpiar la barra de escritura
    input.value = "";

    // Simular el efecto de escritura del bot (Timeout)
    setTimeout(() => {
        container.innerHTML += `
            <div style="text-align:left; margin-bottom:12px;">
                <div style="background:white; color:#1e293b; padding:12px 18px; border-radius:20px 20px 20px 0; display:inline-block; font-size:0.95rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #00d2ff; line-height: 1.5; max-width: 85%;">
                    ${respuestaFinal}
                </div>
            </div>`;
        
        // Hacer scroll automático al último mensaje recibido
        container.scrollTop = container.scrollHeight;
    }, 450);
}
