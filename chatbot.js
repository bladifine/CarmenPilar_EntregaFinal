/**
 * chatbot.js - MOTOR DE IA GLOBAL MULTIIDIOMA Y MULTI-TOKEN (ULTRA-BLINDADO)
 * Proyecto: BotEduCarmen 2026
 * Sede: CAE "Carmen Pilar Fernández", La Victoria, Aragua.
 */

// 1. BASE DE CONOCIMIENTO GLOBAL POLÍGLOTA
const baseConocimiento = {
    saludos: {
        keywords: [
            // Español
            "hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "alo", "buen dia", "epale", "hey", "buenas",
            // Inglés
            "hello", "hi", "good morning", "good afternoon", "good evening", "greetings", "whats up",
            // Portugués
            "ola", "oi", "bom dia", "boa tarde", "boa noite",
            // Italiano
            "ciao", "buongiorno", "buonasera",
            // Francés
            "bonjour", "salut", "bonsoir"
        ],
        respuesta: "¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🤖✨ Estoy listo para guiarte en tu proceso de postulación técnica. ¿De cuál de estas áreas te gustaría recibir información precisa hoy?\n\n• **Cursos** Disponibles\n• **Inscripción** (Guía paso a paso)\n• **Requisitos** de Ingreso\n• **Ubicación** de la Sede\n• **Costos** del Periodo\n• **Horarios** de Clases"
    },
    curso_unas: {
        keywords: [
            // Español y variaciones/errores
            "unas", "manicura", "pedicura", "pedicure", "manicure", "sistemas", "acrylic", "acrilico", "estetica de unas", "unita", "unhas",
            // Inglés
            "nails", "nail", "manicure course", "pedicure course", "acrylic nails",
            // Otros idiomas
            "unghie", "ongles"
        ],
        respuesta: "💅 **Especialidad: Estética de Uñas (Manicura y Pedicura)**\n\nEste programa práctico cubre desde el cuidado básico de manos y pies hasta la aplicación de sistemas avanzados en tendencia (gel, acrílico, esculpidas y decoración artística en 3D). Es presencial y abre grandes oportunidades de emprendimiento inmediato."
    },
    curso_barberia: {
        keywords: [
            // Español
            "barberia", "barbero", "cortar cabello", "degradado", "fade", "barba", "estilismo masculino", "cortes", "peluqueria",
            // Inglés
            "barber", "barbershop", "haircut", "shave", "hair cutting", "beard",
            // Otros idiomas
            "barbeiro", "barbiere", "coiffeur"
        ],
        respuesta: "💈 **Especialidad: Barbería Profesional**\n\nUn curso enfocado al emprendimiento rápido. Aprenderás el uso correcto de máquinas y navajas, técnicas de corte moderno (Fades, Taper, degradados), perfilado de barba, visajismo y normas de bioseguridad. No requiere conocimientos previos."
    },
    curso_cocina: {
        keywords: [
            // Español
            "cocina", "bilingue", "chef", "cocinar", "gastronomia", "comida", "artes culinarias", "alimentos",
            // Inglés
            "cooking", "cook", "chef course", "bilingual cooking", "gastronomy", "food",
            // Otros idiomas
            "cozinha", "cucina", "cuisine"
        ],
        respuesta: "🍳 **Especialidad: Cocina Bilingüe**\n\nPrograma técnico culinario que fusiona la preparación de platos nacionales e internacionales de alta gama con el aprendizaje del idioma inglés técnico. Ideal para capacitarse de cara a la industria hotelera y turística."
    },
    curso_modisteria: {
        keywords: [
            // Español
            "modisteria", "costura", "corte", "confeccion", "diseño de modas", "ropa", "coser", "maquina", "textil",
            // Inglés
            "sewing", "sew", "tailor", "fashion design", "dressmaking", "clothes",
            // Otros idiomas
            "costura", "sartoria", "couture"
        ],
        respuesta: "✂️ **Especialidad: Modistería / Corte y Confección**\n\nOficio de alta rentabilidad donde aprenderás el manejo de máquinas de coser rectas y de sobrehilado, toma de medidas corporales, diseño de patrones desde cero, corte de textiles y confección de prendas de vestir."
    },
    cursos: {
        keywords: [
            // Español
            "curso", "clases", "estudiar", "aprender", "oferta", "catalogo", "materia", "especialidades", "talleres", "tienes", "cuales", "lista", "programa", "cuantos cursos", "cuales me ofreces", "info", "informacion",
            // Inglés
            "courses", "course", "classes", "study", "learn", "catalog", "offer", "programs", "list", "information",
            // Otros idiomas
            "cursos", "corsi", "cours"
        ],
        respuesta: "Actualmente en **BotEduCarmen 2026** dictamos exclusivamente estos 4 programas técnicos productivos:\n\n• ✂️ **Modistería / Corte y Confección**\n• 🍳 **Cocina Bilingüe**\n• 💈 **Barbería**\n• 💅 **Estética de Uñas**\n\nTodos son 100% prácticos y presenciales. Si quieres saber más de alguno, pregúntame directamente por él (ej: *'barbería'* o *'nails'*)."
    },
    inscripcion: {
        keywords: [
            // Español y errores comunes
            "inscripcion", "inscribirme", "inscribir", "registrarme", "registro", "postularme", "postulacion", "proceso", "pasos", "guiar", "guia", "inscribo", "incribo", "inscribirle", "incripcion", "inscrpcion", "matricularme", "matricula", "anotarme", "ingresar", "entrar", "como me",
            // Inglés
            "enroll", "enrollment", "register", "registration", "how to join", "join", "apply", "application", "how to apply", "steps", "sign up",
            // Otros idiomas
            "inscricao", "iscrizione", "inscription"
        ],
        respuesta: "🚀 **Guía Completa de Inscripción - Periodo 2026**:\n\nEl proceso consta de 3 sencillos pasos:\n\n1️⃣ **Selección en Línea**: Ve a la sección **'CURSOS'** en el menú superior, revisa los detalles y haz clic en *'Agregar al carrito'* en la especialidad que te guste.\n2️⃣ **Formulario**: Ve al menú **'Mi Selección'** (o Carrito), confirma tu curso e inicia el formulario ingresando tus datos personales básicos.\n3️⃣ **Validación Física**: Una vez enviado el formulario en la web, acude a nuestra sede en Las Mercedes con la copia de tu cédula para formalizar tu cupo e indicarte la fecha exacta de inicio."
    },
    requisitos: {
        keywords: [
            // Español
            "requisitos", "necesito", "documentos", "papeles", "edad", "cedula", "llevar", "consignacion", "requisito",
            // Inglés
            "requirements", "require", "documents", "papers", "id card", "id", "age", "needed", "what do i need",
            // Otros idiomas
            "requisitos", "requisiti", "exigences"
        ],
        respuesta: "Para formalizar tu registro en el CAE, los requisitos obligatorios son indispensables pero muy sencillos:\n\n1. **Ser mayor de 15 años de edad**.\n2. **Llevar una copia fotostática legible de tu Cédula de Identidad**.\n\nNo necesitas títulos académicos previos ni pasar pruebas complejas de admisión."
    },
    ubicacion: {
        keywords: [
            // Español
            "donde", "ubicacion", "sede", "direccion", "queda", "mapa", "llegar", "cae", "victoria", "aragua", "mercedes", "sitio", "lugar", "ubicado", "localizacion",
            // Inglés
            "where", "location", "address", "map", "direction", "where is it", "place", "headquarters",
            // Otros idiomas
            "onde", "dove", "ou est"
        ],
        respuesta: "Nuestra sede oficial está ubicada en:\n📍 **La Victoria, Estado Aragua, Sector Las Mercedes**.\nDentro de las instalaciones del **Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'**."
    },
    costo: {
        keywords: [
            // Español
            "precio", "costo", "cuanto vale", "pagar", "mensualidad", "inscripcion precio", "gratis", "arancel", "dinero", "gratuito", "valores",
            // Inglés
            "price", "cost", "how much", "pay", "free", "money", "free of charge", "fee",
            // Otros idiomas
            "preço", "prezzo", "prix"
        ],
        respuesta: "La formación en BotEduCarmen es **100% gratuita**. El proceso de postulación, las clases y la certificación final no tienen ningún costo, ya que es un beneficio educativo subsidiado para la comunidad."
    },
    horarios: {
        keywords: [
            // Español
            "horario", "turno", "hora", "tarde", "mañana", "cuando se estudia", "dias", "bloque", "horarios",
            // Inglés
            "schedule", "hours", "time", "morning", "afternoon", "days", "shift", "when",
            // Otros idiomas
            "horario", "orario", "horaire"
        ],
        respuesta: "Las clases se imparten de **lunes a viernes** en dos bloques principales: Turno Mañana y Turno Tarde. Tus días exactos y secciones te serán confirmados en Control de Estudios al momento de validar tu cédula de identidad en la sede."
    },
    despedida: {
        keywords: [
            // Español
            "gracias", "adios", "chao", "hasta luego", "excelente", "entendido", "fino", "ok", "okey", "listo",
            // Inglés
            "thanks", "thank you", "bye", "goodbye", "awesome", "ok", "understand",
            // Otros idiomas
            "obrigado", "grazie", "merci"
        ],
        respuesta: "¡A tu completa disposición! Recuerda que puedes inscribirte hoy mismo desde la pestaña 'Cursos'. ¡Mucho éxito en tu camino de aprendizaje! 🚀"
    }
};

// 2. FILTRO DE LIMPIEZA INTERNACIONAL (Mantiene números y letras estándar)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remueve acentos y diacríticos europeos
        .replace(/([^a-z0-9\s])/g, "")   // Quita símbolos extraños
        .replace(/(.)\1{4,}/g, "$1")     // Evita flooding de letras repetidas
        .trim();
}

// 3. DETECTOR ANTI-SPAM INTELIGENTE CON CONTEXTO INTERNACIONAL
function esTextoIncoherente(texto) {
    if (texto.length < 3) return true;
    
    // Validar si tiene vocales (válido para casi todos los idiomas occidentales)
    const tieneVocales = /[aeiou]/i.test(texto);
    if (!tieneVocales) return true;

    // Detectar palabras absurdamente largas sin espacios (Spam de teclado)
    if (texto.length > 15 && !texto.includes(" ")) {
        const excepciones = ["inscripciones", "establecimiento", "correspondiente", "recomendaciones", "registration", "requirements"];
        return !excepciones.some(e => texto.includes(e));
    }
    return false;
}

// 4. CONTROLADOR GENERAL DE INTERFAZ GHOST
function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;

    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
        
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = `
                <div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width: 85%; line-height: 1.45; color: #1e293b; font-size: 0.95rem;">
                    ¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🏢✨<br><br>¿En qué te puedo colaborar hoy? Puedes consultarme directamente sobre nuestros <strong>cursos</strong>, la guía de <strong>inscripción</strong>, <strong>requisitos</strong>, <strong>ubicación</strong> o <strong>horarios</strong>.
                </div>`;
        }
    } else {
        chatWin.style.display = 'none';
    }
}

// 5. MOTOR DE PROCESAMIENTO MATRICIAL POR MAPA DE TOKENS
function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    const textoOriginal = input.value.trim();
    if (textoOriginal === "") return;

    // Insertar la burbuja del usuario
    container.innerHTML += `
        <div style="background:var(--azul-primario); color:white; padding:15px; border-radius:20px; align-self:flex-end; max-width:80%; word-break: break-word; margin-bottom: 5px; font-size: 0.95rem;">
            ${textoOriginal}
        </div>`;

    input.value = "";
    container.scrollTop = container.scrollHeight;

    const textoLimpio = normalizarTexto(textoOriginal);
    let respuestaFinal = "";

    if (esTextoIncoherente(textoLimpio)) {
        respuestaFinal = "Para ofrecerte una respuesta exacta y al punto, por favor evita introducir texto sin sentido o cadenas aleatorias. 🧐 Realiza una pregunta clara sobre nuestros programas académicos; por ejemplo: **'¿Cuáles son los requisitos de inscripción?'**.";
    } else {
        let mejorCategoria = null;
        let maximaPuntuacion = 0;

        // Búsqueda cruzada multidimensional de tokens
        for (let cat in baseConocimiento) {
            let puntos = 0;
            
            baseConocimiento[cat].keywords.forEach(keyword => {
                if (textoLimpio.includes(keyword)) {
                    // Jerarquía estricta por intenciones específicas
                    if (cat.startsWith("curso_") || cat === "inscripcion") {
                        puntos += 12; // Las intenciones específicas aplastan a los términos genéricos
                    } else {
                        puntos += 4;  // Puntuación base
                    }
                }
            });

            if (puntos > maximaPuntuacion) {
                maximaPuntuacion = puntos;
                mejorCategoria = cat;
            }
        }

        if (maximaPuntuacion > 0 && mejorCategoria) {
            respuestaFinal = baseConocimiento[mejorCategoria].respuesta;
        } else {
            respuestaFinal = "La duda planteada se sale de mi contexto operativo actual o no logré interpretarla de forma directa. 🏢 Para ir al grano y ayudarte rápidamente, escribe alguna de estas palabras clave:\n\n• **Cursos** (Lista de especialidades)\n• **Inscripción** (Cómo registrarse paso a paso)\n• **Requisitos** (Documentos obligatorios)\n• **Ubicación** (Dirección de la sede)\n• **Horarios** (Turnos disponibles)";
        }
    }

    // Inyección de la animación de espera
    const idEscribiendo = "bot-typing";
    container.innerHTML += `
        <div id="${idEscribiendo}" style="background: #e2e8f0; color: #64748b; padding: 10px 15px; border-radius: 20px; align-self: flex-start; font-size: 0.85rem; font-style: italic;">
            Analizando consulta...
        </div>`;
    container.scrollTop = container.scrollHeight;

    // Renderizado diferido de la respuesta inteligente
    setTimeout(() => {
        const elementoTipeando = document.getElementById(idEscribiendo);
        if (elementoTipeando) elementoTipeando.remove();

        const respuestaFormateada = respuestaFinal.replace(/\n/g, '<br>');

        container.innerHTML += `
            <div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width:85%; line-height:1.45; word-break: break-word; color: #1e293b; font-size: 0.95rem;">
                ${respuestaFormateada}
            </div>`;
        
        container.scrollTop = container.scrollHeight;
    }, 450);
}

// 6. EXPORTACIÓN GLOBAL UNIVERSAL
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
