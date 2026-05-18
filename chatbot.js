/**
 * chatbot.js - Lógica del Asistente Virtual Inteligente Ultra-Preciso
 * Proyecto: BotEduCarmen 2026
 */

const baseConocimiento = {
    saludos: { 
        keywords: ["hola", "buenos dias", "buenas tardes", "que tal", "saludos", "alo"], 
        respuesta: "¡Hola! Soy el asistente virtual de BotEduCarmen. ¿Te gustaría conocer la oferta de cursos, las áreas disponibles, los horarios o los requisitos de inscripción?" 
    },
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "inscribir", "costo", "precio", "gratis"],
        respuesta: "Para inscribirte solo necesitas: Copia de tu Cédula de Identidad y ser mayor de 15 años. ¡El proceso y todas las clases son totalmente gratuitos!"
    },
    ubicacion: { 
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "sitio", "las mercedes", "mapa"], 
        respuesta: "Estamos ubicados en La Victoria, Estado Aragua, específicamente en el Sector Las Mercedes, en la sede del Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'." 
    },
    horarios: {
        keywords: ["horario", "horarios", "turno", "turnos", "hora", "dias", "tarde", "manana", "sabatino"],
        respuesta: "Nuestros cursos operan en flexibilización 2026 con tres turnos disponibles según el taller: Turno Mañana (8:00 AM a 11:30 AM), Turno Tarde (1:30 PM a 4:30 PM) y Turno Sabatino Intensivo. Al seleccionar tus cursos en el sistema web podrás definir tu turno de preferencia."
    },
    gastronomia: {
        keywords: ["gastronomia", "cocina", "bilingue", "comida", "chef", "panaderia", "reposteria"],
        respuesta: "En el área de Gastronomía contamos con el curso estrella de 'Cocina Bilingüe'. Aprenderás técnicas culinarias profesionales combinadas con terminología técnica en inglés. ¡Ideal para emprender!"
    },
    estetitca: {
        keywords: ["barberia", "barbero", "unas", "manicure", "pedicure", "estetitca", "peluqueria", "cabello"],
        respuesta: "En el área de Estética ofrecemos los cursos prácticos de 'Barbería Profesional' y 'Estética de Uñas'. Incluyen diseño de cortes modernos y técnicas avanzadas de manicure/pedicure."
    },
    textil: {
        keywords: ["modisteria", "confeccion", "corte", "costura", "lenceria", "ropa", "textil", "coser", "tela"],
        respuesta: "Nuestra área Textil cuenta con los cursos de 'Modistería' y 'Corte y Confección'. Aprenderás desde el uso de máquinas de coser tradicionales e industriales hasta el patronaje y confección de prendas desde cero."
    },
    electricidad: {
        keywords: ["electricidad", "electrica", "circuitos", "cables", "mantenimiento", "electricista", "corriente"],
        respuesta: "El área técnica incluye capacitación práctica en Fundamentos de Electricidad, donde aprenderás instalaciones eléctricas residenciales, medidas de seguridad y reparación de circuitos básicos."
    },
    cursos: { 
        keywords: ["curso", "oferta", "talleres", "tienes", "estudiar", "aprender", "cuantos", "lista", "catalogo"], 
        respuesta: "Contamos con una excelente oferta formativa en las áreas de Gastronomía (Cocina Bilingüe), Estética (Barbería y Uñas), Textil (Modistería, Corte y Confección) y Electricidad. ¿Te interesa saber más sobre alguna de estas áreas o prefieres consultar los horarios?" 
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

    // Capturar y normalizar el texto: minúsculas, quitar espacios extra y remover tildes
    let textoUsuario = input.value.toLowerCase().trim();
    textoUsuario = textoUsuario.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (textoUsuario === "") return;

    // Dibujar el mensaje del usuario en la pantalla
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#0a192f; color:white; padding:10px 15px; border-radius:20px 20px 0 20px; display:inline-block; font-size:0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                ${input.value}
            </span>
        </div>`;

    let respuestaFinal = "Lo siento, no procesé esa solicitud específica de momento. Puedes intentar preguntando de forma simple por 'cursos', 'horarios', 'requisitos', 'gastronomia', 'electricidad', 'estetitca' o 'textil'.";
    
    // Lista de jerarquía de búsqueda estricta para evitar solapamientos
    const ordenCategorias = ['horarios', 'gastronomia', 'estetitca', 'textil', 'electricidad', 'requisitos', 'ubicacion', 'saludos', 'cursos'];

    for (let cat of ordenCategorias) {
        if (baseConocimiento[cat].keywords.some(k => textoUsuario.includes(k))) {
            respuestaFinal = baseConocimiento[cat].respuesta;
            break;
        }
    }

    // Vaciar campo de texto inmediatamente
    input.value = "";

    // Simular retraso de escritura de inteligencia artificial
    setTimeout(() => {
        container.innerHTML += `
            <div style="text-align:left; margin-bottom:12px;">
                <div style="background:white; color:#1e293b; padding:12px 18px; border-radius:20px 20px 20px 0; display:inline-block; font-size:0.95rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #00d2ff; line-height: 1.5; max-width: 85%;">
                    ${respuestaFinal}
                </div>
            </div>`;
        
        // Desplazamiento automático al final
        container.scrollTop = container.scrollHeight;
    }, 400);
}
