/**
 * chatbot.js - Inteligencia Artificial Avanzada y Filtro Anti-Errores
 * Proyecto: BotEduCarmen 2026
 * Sede: CAE "Carmen Pilar Fernández", La Victoria, Aragua.
 */

// 1. BASE DE CONOCIMIENTO OPTIMIZADA CON PALABRAS CLAVE AMPLIADAS (SIN TILDES)
const baseConocimiento = {
    saludos: {
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "alo", "buen dia", "epale", "saludos"],
        respuesta: "¡Hola! Bienvenido al asistente virtual de **BotEduCarmen 2026**. 🤖✨ Estoy aquí para guiarte en tu formación técnica en La Victoria. ¿De cuál de estas áreas te gustaría recibir información precisa?\n\n• **Cursos** Disponibles\n• **Requisitos** de Inscripción\n• **Ubicación** de la Sede\n• **Costos** y Precios"
    },
    cursos: {
        keywords: ["curso", "clases", "estudiar", "aprender", "oferta", "catalogo", "materia", "especialidades", "talleres", "estetica", "cocina", "barberia", "uñas", "costura", "modisteria", "confeccion"],
        respuesta: "Actualmente ofrecemos los siguientes programas técnicos productivos avalados:\n• ✂️ **Modistería / Corte y Confección**\n• 🍳 **Cocina Bilingüe**\n• 💈 **Barbería**\n• 💅 **Estética de Uñas**\n\nTodos los cursos son presenciales, prácticos y se dictan en nuestra sede. Puedes seleccionarlos directamente en la pestaña 'Cursos' de la página principal para agregarlos a tu planilla."
    },
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "edad", "cedula", "llevar", "consiganacion"],
        respuesta: "Para formalizar tu inscripción solo necesitas cumplir con dos requisitos:\n1. **Copia legible de tu Cédula de Identidad**.\n2. **Ser mayor de 15 años**.\n\nNo requieres pruebas de admisión ni títulos previos. Al registrar tus datos en esta página, generas tu ticket de postulación."
    },
    ubicacion: {
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "mapa", "llegar", "cae", "victoria", "aragua", "mercedes", "sitio", "lugar"],
        respuesta: "Nuestra única sede oficial se encuentra en:\n📍 **La Victoria, Estado Aragua, Sector Las Mercedes**.\nEspecíficamente dentro de las instalaciones del **Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'**.\nEl horario de atención en oficina coincide con los bloques de clases de lunes a viernes."
    },
    costo: {
        keywords: ["precio", "costo", "cuanto vale", "pagar", "mensualidad", "inscripcion precio", "gratis", "arancel", "dinero"],
        respuesta: "El sistema de educación en BotEduCarmen es **100% gratuito**. No debes pagar inscripciones, mensualidades ni derechos de examen. Está financiado en su totalidad para el beneficio de la comunidad."
    },
    horarios: {
        keywords: ["horario", "turno", "hora", "tarde", "mañana", "cuando se estudia", "dias"],
        respuesta: "Los cursos se dictan en bloques específicos de **lunes a viernes** en turnos matutinos y vespertinos (varía según la especialidad elegida). El horario exacto de tu sección te será asignado al momento de verificar tus documentos en la sede."
    },
    despedida: {
        keywords: ["gracias", "adios", "chao", "hasta luego", "excelente", "entendido", "fino", "ok", "okey", "listo"],
        respuesta: "¡A tu completa disposición! Si tienes otra duda sobre el periodo académico 2026, aquí estaré. ¡Mucho éxito! 🚀"
    }
};

// 2. FUNCIÓN DE LIMPIEZA AVANZADA (Filtra tildes, caracteres repetidos abusivos y basura)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Elimina acentos/tildes
        .replace(/([^a-z0-9\s])/g, "") // Elimina símbolos extraños, signos de interrogación, etc.
        .replace(/(.)\1{4,}/g, "$1") // Si repiten letras como "holaaaaaaaa", lo acorta a "hola"
        .trim();
}

// 3. DETECTOR DE INCOHERENCIAS, SPAM O PREGUNTAS TRAMPA
function esTextoIncoherente(texto) {
    if (texto.length < 3) return true; // Muy corto
    
    // Si no contiene al menos una vocal (ej: "cccc", "vbnmbvm", "uyglgyilg")
    const tieneVocales = /[aeiou]/i.test(texto);
    if (!tieneVocales) return true;

    // Si es una sola palabra excesivamente larga sin sentido
    if (texto.length > 15 && !texto.includes(" ")) {
        // Excepción por si escriben palabras compuestas de administración, de lo contrario es spam
        const excepciones = ["inscripciones", "establecimiento", "correspondiente"];
        if (!excepciones.some(e => texto.includes(e))) return true;
    }

    return false;
}

// 4. CONTROL DE APERTURA Y CIERRE DEL CHAT
function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;

    const botActivo = localStorage.getItem('config_bot') !== 'false';

    if (!botActivo) {
        alert("🤖 El Asistente Virtual se encuentra temporalmente fuera de servicio por mantenimiento del sistema técnico. Por favor, revisa el catálogo directamente.");
        chatWin.style.display = 'none';
        return;
    }

    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
        
        // Mensaje inicial limpio
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = `
                <div style="text-align:left; margin-bottom:12px;">
                    <span style="background:rgba(255,255,255,0.08); color:white; padding:12px 15px; border-radius:15px 15px 15px 0; display:inline-block; font-size:0.95rem; border-left: 3px solid #00d2ff; max-width:85%; line-height:1.4;">
                        ¡Hola! Bienvenido a **BotEduCarmen 2026**. 🏢✨\n\n¿En qué puedo ayudarte hoy? Escribe palabras directas como **cursos**, **requisitos**, **horarios** o **dirección** para darte información inmediata.
                    </span>
                </div>`;
            // Reemplazar saltos de línea iniciales
            container.innerHTML = container.innerHTML.replace(/\n/g, '<br>');
        }
    } else {
        chatWin.style.display = 'none';
    }
}

// 5. PROCESADOR INTELIGENTE DE MENSAJES
function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    const textoOriginal = input.value.trim();
    if (textoOriginal === "") return;

    // Pintar mensaje del estudiante en pantalla
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#00d2ff; color:#050a14; padding:10px 15px; border-radius:15px 15px 0 15px; display:inline-block; font-size:0.95rem; font-weight:600; max-width:80%; word-break: break-word;">
                ${textoOriginal}
            </span>
        </div>`;

    // Limpiar input de inmediato para dar feedback de rapidez
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // Procesar el texto mediante nuestras capas de seguridad
    const textoLimpio = normalizarTexto(textoOriginal);

    let respuestaFinal = "";

    // CAPA 1: Validación de Spam o Incoherencias ("uyglgyilg", "asdasd", etc.)
    if (esTextoIncoherente(textoLimpio)) {
        respuestaFinal = "Para ofrecerte una respuesta real y al punto, por favor evita escribir texto sin sentido o caracteres sueltos. 🧐 Escribe una duda concreta, por ejemplo: **'¿Cuáles son los requisitos?'** o **'¿Dónde están ubicados?'**.";
    } else {
        // CAPA 2: Sistema de Puntuación Semántica para evitar evasivas o preguntas trampa
        let mejorCategoria = null;
        let maximaPuntuacion = 0;

        for (let cat in baseConocimiento) {
            let puntos = 0;
            baseConocimiento[cat].keywords.forEach(keyword => {
                if (textoLimpio.includes(keyword)) {
                    puntos += 2; // Coincidencia directa suma peso
                }
            });

            if (puntos > maximaPuntuacion) {
                maximaPuntuacion = puntos;
                mejorCategoria = cat;
            }
        }

        // CAPA 3: Si pasó el filtro pero la pregunta es una trampa ambigua o fuera de contexto
        if (maximaPuntuacion > 0 && mejorCategoria) {
            respuestaFinal = baseConocimiento[mejorCategoria].respuesta;
        } else {
            respuestaFinal = "Tu pregunta se sale del contexto de admisiones o no logré interpretarla correctamente. 🏢 Para ser directo y ayudarte rápido, por favor escribe una de estas opciones:\n\n• **Cursos** (Oferta académica)\n• **Requisitos** (Papeles necesarios)\n• **Ubicacion** (Sede Las Mercedes)\n• **Horarios** (Turnos de estudio)";
        }
    }

    // Mostrar animación de tipeo simulada
    const idEscribiendo = "bot-typing";
    container.innerHTML += `
        <div id="${idEscribiendo}" style="text-align:left; margin-bottom:12px;">
            <span style="background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.4); padding:8px 12px; border-radius:15px; display:inline-block; font-size:0.85rem; font-style:italic;">
                BotEduCarmen está analizando...
            </span>
        </div>`;
    container.scrollTop = container.scrollHeight;

    // Entregar respuesta precisa con un delay de procesamiento natural
    setTimeout(() => {
        const elementoTipeando = document.getElementById(idEscribiendo);
        if (elementoTipeando) elementoTipeando.remove();

        const respuestaFormateada = respuestaFinal.replace(/\n/g, '<br>');

        container.innerHTML += `
            <div style="text-align:left; margin-bottom:12px;">
                <span style="background:rgba(255,255,255,0.08); color:white; padding:11px 16px; border-radius:15px 15px 15px 0; display:inline-block; font-size:0.95rem; border-left: 3px solid #00d2ff; max-width:85%; line-height:1.45; word-break: break-word;">
                    ${respuestaFormateada}
                </span>
            </div>`;
        
        container.scrollTop = container.scrollHeight;
    }, 500);
}

// Inicializar el escuchador de teclado al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }
});
