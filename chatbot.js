/**
 * chatbot.js - Inteligencia Artificial Avanzada y Filtro Anti-Errores
 * Proyecto: BotEduCarmen 2026
 * Sede: CAE "Carmen Pilar Fernández", La Victoria, Aragua.
 */

// 1. BASE DE CONOCIMIENTO DINÁMICA (Respuestas reales, institucionales y precisas)
const baseConocimiento = {
    saludos: {
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "alo", "buen dia", "epale", "hey"],
        respuesta: "¡Hola! Bienvenido al asistente virtual de **BotEduCarmen 2026**. 🤖✨ Estoy listo para guiarte en tu proceso de postulación técnica. ¿De cuál de estas áreas te gustaría recibir información precisa hoy?\n\n• **Cursos** Disponibles\n• **Requisitos** de Inscripción\n• **Ubicación** de la Sede\n• **Costos** del Periodo\n• **Horarios** de Clases"
    },
    cursos: {
        keywords: ["curso", "clases", "estudiar", "aprender", "oferta", "catalogo", "materia", "especialidades", "talleres", "estetica", "cocina", "barberia", "uñas", "costura", "modisteria", "confeccion", "sugieres", "recomiendas", "tienes", "cuales", "lista"],
        respuesta: "Para este periodo académico contamos exclusivamente con los siguientes programas técnicos productivos oficiales:\n\n• ✂️ **Modistería / Corte y Confección**\n• 🍳 **Cocina Bilingüe**\n• 💈 **Barbería**\n• 💅 **Estética de Uñas**\n\nTodos los programas son de modalidad presencial y prácticos. Te sugiero revisar la pestaña 'Cursos' en el menú superior para ver imágenes detalladas y agregarlos a tu carrito de postulación."
    },
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

// 2. FUNCIÓN DE LIMPIEZA AVANZADA (Evita tildes, caracteres repetidos y símbolos extraños)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remueve acentos limpiamente
        .replace(/([^a-z0-9\s])/g, "") // Elimina símbolos raros o de interrogación repetidos
        .replace(/(.)\1{4,}/g, "$1") // Acorta letras extendidas por error (ej: "holaaaaa" pasa a "hola")
        .trim();
}

// 3. DETECTOR DE INCOHERENCIAS, FLOODING O SPAM ("uyglgyilg", "asdasd", "vbnmvb")
function esTextoIncoherente(texto) {
    if (texto.length < 3) return true; // Criterio de longitud mínima
    
    const tieneVocales = /[aeiou]/i.test(texto);
    if (!tieneVocales) return true; // Frena combinaciones directas sin vocales legibles

    if (texto.length > 15 && !texto.includes(" ")) { // Bloquea palabras masivas sin espacios
        const excepciones = ["inscripciones", "establecimiento", "correspondiente", "recomendaciones"];
        if (!excepciones.some(e => texto.includes(e))) return true;
    }

    return false;
}

// 4. CONTROL OPERATIVO GLOBAL DE APERTURA Y CIERRE DEL CHAT
function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;

    // Verificar si el administrador congeló el bot desde el panel
    const botActivo = localStorage.getItem('config_bot') !== 'false';

    if (!botActivo) {
        alert("🤖 El Asistente Virtual se encuentra fuera de servicio temporalmente por mantenimiento técnico de la plataforma.");
        chatWin.style.display = 'none';
        return;
    }

    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
        
        // Mensaje inicial limpio inyectado orgánicamente
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = `
                <div style="text-align:left; margin-bottom:12px;">
                    <span style="background:rgba(255,255,255,0.08); color:white; padding:12px 15px; border-radius:15px 15px 15px 0; display:inline-block; font-size:0.95rem; border-left: 3px solid #00d2ff; max-width:85%; line-height:1.4;">
                        ¡Hola! Te doy la bienvenida a **BotEduCarmen 2026**. 🏢✨\n\n¿En qué te puedo colaborar hoy? Puedes consultarme directamente sobre nuestros **cursos**, **requisitos**, **ubicación** o **horarios**.
                    </span>
                </div>`;
            container.innerHTML = container.innerHTML.replace(/\n/g, '<br>');
        }
    } else {
        chatWin.style.display = 'none';
    }
}

// 5. PROCESADOR DE MENSAJES DE TRIPLE FILTRO SEMÁNTICO
function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    const textoOriginal = input.value.trim();
    if (textoOriginal === "") return;

    // Pintar de inmediato el globo del mensaje del usuario
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#00d2ff; color:#050a14; padding:10px 15px; border-radius:15px 15px 0 15px; display:inline-block; font-size:0.95rem; font-weight:600; max-width:80%; word-break: break-word;">
                ${textoOriginal}
            </span>
        </div>`;

    input.value = "";
    container.scrollTop = container.scrollHeight;

    const textoLimpio = normalizarTexto(textoOriginal);
    let respuestaFinal = "";

    // FILTRO CAPA 1: ¿Es texto basura, spam ilegible o cadenas trampa?
    if (esTextoIncoherente(textoLimpio)) {
        respuestaFinal = "Para ofrecerte una respuesta exacta y al punto, por favor evita introducir cadenas de caracteres aleatorias o texto sin sentido. 🧐 Realiza una pregunta clara sobre los programas de estudio; por ejemplo: **'¿Cuáles son los requisitos de inscripción?'**.";
    } else {
        // FILTRO CAPA 2: Sistema de Concurrencia Semántica (Puntuación por pesos de Keywords)
        let mejorCategoria = null;
        let maximaPuntuacion = 0;

        for (let cat in baseConocimiento) {
            let puntos = 0;
            baseConocimiento[cat].keywords.forEach(keyword => {
                if (textoLimpio.includes(keyword)) {
                    puntos += 2; // Match exacto añade prioridad
                }
            });

            if (puntos > maximaPuntuacion) {
                maximaPuntuacion = puntos;
                mejorCategoria = cat;
            }
        }

        // FILTRO CAPA 3: Despliegue de respuestas o menú de contención
        if (maximaPuntuacion > 0 && mejorCategoria) {
            respuestaFinal = baseConocimiento[mejorCategoria].respuesta;
        } else {
            respuestaFinal = "La duda planteada se sale de mi contexto operativo sobre admisiones del CAE o no logré interpretarla de forma directa. 🏢 Para ir al grano y darte la información real, escribe alguna de estas palabras:\n\n• **Cursos** (Lista de especialidades técnicas)\n• **Requisitos** (Documentación obligatoria)\n• **Ubicación** (Dirección de la sede)\n• **Horarios** (Turnos disponibles de estudio)";
        }
    }

    // Dibujar animación de análisis simulado
    const idEscribiendo = "bot-typing";
    container.innerHTML += `
        <div id="${idEscribiendo}" style="text-align:left; margin-bottom:12px;">
            <span style="background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.4); padding:8px 12px; border-radius:15px; display:inline-block; font-size:0.85rem; font-style:italic;">
                Analizando consulta...
            </span>
        </div>`;
    container.scrollTop = container.scrollHeight;

    // Retornar respuesta procesada con retardo natural
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
    }, 450);
}

// Inicializar el escuchador de eventos de teclado (Tecla Enter)
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
