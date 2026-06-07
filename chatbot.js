/**
 * chatbot.js - Inteligencia Artificial Avanzada y Filtro Quirúrgico por Especialidad
 * Proyecto: BotEduCarmen 2026
 * Sede: CAE "Carmen Pilar Fernández", La Victoria, Aragua.
 */

// 1. BASE DE CONOCIMIENTO DETALLADA (Separada por intenciones específicas)
const baseConocimiento = {
    saludos: {
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "alo", "buen dia", "epale", "hey"],
        respuesta: "¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🤖✨ Estoy listo para guiarte en tu proceso de postulación técnica. ¿De cuál de estas áreas te gustaría recibir información precisa hoy?\n\n• **Cursos** Disponibles\n• **Requisitos** de Inscripción\n• **Ubicación** de la Sede\n• **Costos** del Periodo\n• **Horarios** de Clases"
    },
    cursos: {
        // Keywords generales de catálogo
        keywords: ["curso", "clases", "estudiar", "aprender", "oferta", "catalogo", "materia", "especialidades", "talleres", "tienes", "cuales", "lista", "programa"],
        respuesta: "Para este periodo académico contamos exclusivamente con los siguientes programas técnicos productivos oficiales:\n\n• ✂️ **Modistería / Corte y Confección**\n• 🍳 **Cocina Bilingüe**\n• 💈 **Barbería**\n• 💅 **Estética de Uñas**\n\nTodos los programas son de modalidad presencial y prácticos. Si te interesa uno en específico, puedes preguntarme directamente por él (ej: *'curso de uñas'* o *'información de barbería'*)."
    },
    // --- RESPUESTAS QUIRÚRGICAS E INDIVIDUALES POR CURSO ---
    curso_unas: {
        keywords: ["uñas", "manicura", "pedicura", "sistemas", "acrylic", "acrilico", "estetica de uñas", "manicurista"],
        respuesta: "💅 **Especialidad: Estética de Uñas**\n\nEste taller es uno de los más demandados. Aprenderás desde las técnicas de cuidado básico (manicura y pedicura) hasta la aplicación de sistemas avanzados en tendencia (gel, acrílico, esculpidas y decoración artística). Es 100% práctico y presencial en nuestra sede de Las Mercedes."
    },
    curso_cocina: {
        keywords: ["cocina", "bilingue", "chef", "cocinar", "gastronomia", "comida", "artes culinarias"],
        respuesta: "🍳 **Especialidad: Cocina Bilingüe**\n\nUn programa innovador diseñado para el mercado actual. Adquirirás destrezas técnicas culinarias nacionales e internacionales de alto nivel, combinadas con el vocabulario técnico en inglés esencial para trabajar en la industria hotelera y turística internacional."
    },
    curso_barberia: {
        keywords: ["barberia", "barbero", "cortar cabello", "degradado", "fade", "barba", "estilismo masculino"],
        respuesta: "💈 **Especialidad: Barbería Profesional**\n\nOrientado al emprendimiento rápido. El curso cubre el manejo correcto de herramientas, cortes clásicos y modernos (Fades, Taper, etc.), diseño y perfilado de barba, y técnicas de bioseguridad. Ideal para montar tu propio negocio en poco tiempo."
    },
    curso_modisteria: {
        keywords: ["modisteria", "costura", "corte", "confeccion", "diseño de modas", "ropa", "coser", "maquina"],
        respuesta: "✂️ **Especialidad: Modistería / Corte y Confección**\n\nUn oficio tradicional de gran rentabilidad. Aprenderás el uso de máquinas de coser, toma de medidas, creación de patrones desde cero, corte de textiles y confección de prendas básicas y avanzadas. No requiere experiencia previa."
    },
    // --- FIN SECCIÓN DE CURSOS INDIVIDUALES ---
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "edad", "cedula", "llevar", "consignacion"],
        respuesta: "Para formalizar tu registro en cualquiera de los oficios, los requisitos obligatorios son mínimos:\n\n1. **Ser mayor de 15 años de edad**.\n2. **Presentar una copia legible de tu Cédula de Identidad**.\n\nNo requieres pruebas de admisión complejas ni títulos académicos previos. Puedes procesar tu postulación en línea desde esta misma página."
    },
    ubicacion: {
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "mapa", "llegar", "cae", "victoria", "aragua", "mercedes", "sitio", "lugar"],
        respuesta: "Nuestra única sede oficial se encuentra en:\n📍 **La Victoria, Estado Aragua, Sector Las Mercedes**.\nEspecíficamente en las instalaciones del **Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'**."
    },
    costo: {
        keywords: ["precio", "costo", "cuanto vale", "pagar", "mensualidad", "inscripcion precio", "gratis", "arancel", "dinero", "gratuito"],
        respuesta: "El sistema de formación en BotEduCarmen es **100% gratuito**. No se cobran inscripciones, mensualidades, derechos de certificación ni aranceles. Es un beneficio educativo subsidiado para el desarrollo productivo de la comunidad."
    },
    horarios: {
        keywords: ["horario", "turno", "hora", "tarde", "mañana", "cuando se estudia", "dias", "bloque"],
        respuesta: "Los cursos se dictan de **lunes a viernes** en turnos matutinos (mañana) y vespertinos (tarde). El horario exacto y la sección te serán asignados en la oficina de control de estudios al momento de validar tus documentos de identidad físicos."
    },
    despedida: {
        keywords: ["gracias", "adios", "chao", "hasta luego", "excelente", "entendido", "fino", "ok", "okey", "listo"],
        respuesta: "¡A tu completa disposición! Si tienes otra consulta sobre el periodo académico, escríbeme con total libertad. ¡Mucho éxito en tu formación! 🚀"
    }
};

// 2. FUNCIÓN DE LIMPIEZA AVANZADA
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/([^a-z0-9\s])/g, "")
        .replace(/(.)\1{4,}/g, "$1")
        .trim();
}

// 3. DETECTOR DE INCOHERENCIAS
function esTextoIncoherente(texto) {
    if (texto.length < 3) return true;
    const tieneVocales = /[aeiou]/i.test(texto);
    if (!tieneVocales) return true;
    if (texto.length > 15 && !texto.includes(" ")) {
        const excepciones = ["inscripciones", "establecimiento", "correspondiente", "recomendaciones"];
        if (!excepciones.some(e => texto.includes(e))) return true;
    }
    return false;
}

// 4. CONTROL OPERATIVO GLOBAL (Manejo de ventanas)
function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;

    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
        
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = `
                <div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width: 85%; line-height: 1.4;">
                    ¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🏢✨<br><br>¿En qué te puedo colaborar hoy? Puedes consultarme directamente sobre nuestros <strong>cursos</strong>, <strong>requisitos</strong>, <strong>ubicación</strong> o <strong>horarios</strong>.
                </div>`;
        }
    } else {
        chatWin.style.display = 'none';
    }
}

// 5. PROCESADOR DE MENSAJES SEMÁNTICO POR PESO DE COINCIDENCIAS
function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    const textoOriginal = input.value.trim();
    if (textoOriginal === "") return;

    // Pintar el globo del usuario
    container.innerHTML += `
        <div style="background:var(--azul-primario); color:white; padding:15px; border-radius:20px; align-self:flex-end; max-width:80%; word-break: break-word; margin-bottom: 5px;">
            ${textoOriginal}
        </div>`;

    input.value = "";
    container.scrollTop = container.scrollHeight;

    const textoLimpio = normalizarTexto(textoOriginal);
    let respuestaFinal = "";

    if (esTextoIncoherente(textoLimpio)) {
        respuestaFinal = "Para ofrecerte una respuesta exacta y al punto, por favor evita introducir cadenas de caracteres aleatorias o texto sin sentido. 🧐 Realiza una pregunta clara; por ejemplo: **'¿Cuáles son los requisitos de inscripción?'**.";
    } else {
        let mejorCategoria = null;
        let maximaPuntuacion = 0;

        for (let cat in baseConocimiento) {
            let puntos = 0;
            baseConocimiento[cat].keywords.forEach(keyword => {
                if (textoLimpio.includes(keyword)) {
                    puntos += 3; // Puntuación base por coincidencia de palabra clave
                }
            });

            // Darle un pequeño empujón de prioridad a los cursos individuales si el usuario mezcla palabras
            if (cat.startsWith("curso_") && puntos > 0) {
                puntos += 1; 
            }

            if (puntos > maximaPuntuacion) {
                maximaPuntuacion = puntos;
                mejorCategoria = cat;
            }
        }

        if (maximaPuntuacion > 0 && mejorCategoria) {
            respuestaFinal = baseConocimiento[mejorCategoria].respuesta;
        } else {
            respuestaFinal = "La duda planteada se sale de mi contexto operativo sobre admisiones o no logré interpretarla de forma directa. 🏢 Para ir al grano, escribe alguna de estas palabras:\n\n• **Cursos** (Lista de especialidades)\n• **Requisitos** (Documentación necesaria)\n• **Ubicación** (Dirección de la sede)\n• **Horarios** (Turnos disponibles)";
        }
    }

    // Dibujar animación de "Pensando..."
    const idEscribiendo = "bot-typing";
    container.innerHTML += `
        <div id="${idEscribiendo}" style="background: #e2e8f0; color: #64748b; padding: 10px 15px; border-radius: 20px; align-self: flex-start; font-size: 0.85rem; font-style: italic;">
            Analizando consulta...
        </div>`;
    container.scrollTop = container.scrollHeight;

    // Retornar respuesta procesada
    setTimeout(() => {
        const elementoTipeando = document.getElementById(idEscribiendo);
        if (elementoTipeando) elementoTipeando.remove();

        const respuestaFormateada = respuestaFinal.replace(/\n/g, '<br>');

        container.innerHTML += `
            <div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width:85%; line-height:1.45; word-break: break-word;">
                ${respuestaFormateada}
            </div>`;
        
        container.scrollTop = container.scrollHeight;
    }, 550);
}

// Forzar registro en el objeto Window global del navegador
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
