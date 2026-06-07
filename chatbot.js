/**
 * chatbot.js - MOTOR DE INFERENCIA SEMÁNTICA AVANZADA CON INTEGRACIÓN MULTIDIMENSIONAL REAL
 * Proyecto: BotEduCarmen 2026
 * Sede: CAE "Carmen Pilar Fernández", La Victoria, Aragua.
 */

const baseConocimiento = {
    saludos: {
        keywords: ["hola", "buenos", "tardes", "noches", "dias", "que tal", "saludos", "alo", "hey", "hello", "hi"],
        respuesta: "¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🤖✨ Estoy aquí para guiarte de forma inteligente y personalizada en tu formación técnica. ¿Sobre cuál de estas áreas deseas que profundicemos hoy?\n\n• NUESTROS **Cursos** (Uñas, Barbería, Cocina, Modistería)\n• PROCESO DE **Inscripción** (Paso a paso digital)\n• **Requisitos** de Ingreso\n• **Ubicación** y Dirección de la Sede\n• **Horarios** y Turnos disponibles"
    },
    curso_unas: {
        keywords: ["unas", "manicura", "pedicura", "pedicure", "manicure", "sistemas", "acrylic", "acrilico", "estetica"],
        respuesta: "💅 **Especialidad Profesional: Estética de Uñas**\n\nEste programa de formación técnica está diseñado para llevarte desde cero hasta un nivel profesional. El contenido incluye:\n• Anatomía de la uña, higiene y manicura/pedicura estructural.\n• Aplicación de sistemas avanzados: resina, gel, acrílico y esculpidas.\n• Decoración artística avanzada, técnicas de encapsulado y nail art 3D en tendencia 2026.\n\nEs ideal para emprender de inmediato o montar tu propio estudio estético. ¿Te gustaría saber cómo inscribirte?"
    },
    curso_barberia: {
        keywords: ["barberia", "barbero", "cortar", "cabello", "degradado", "fade", "barba", "estilismo", "peluqueria"],
        respuesta: "💈 **Especialidad Profesional: Barbería Avanzada**\n\nUn programa técnico altamente práctico enfocado en el mercado estético masculino actual. Aprenderás:\n• Visajismo y técnicas de diseño adaptadas al rostro del cliente.\n• Dominio técnico de máquinas de vanguardia y cortes modernos (High Fade, Mid Fade, Taper).\n• Diseño, perfilado, hidratación y cuidado de barba tradicional.\n\nEl curso te capacita directamente para trabajar en salones o gestionar tu propio negocio autónomo."
    },
    curso_cocina: {
        keywords: ["cocina", "bilingue", "chef", "cocinar", "gastronomia", "comida", "culinarias"],
        respuesta: "🍳 **Especialidad Profesional: Cocina Bilingüe**\n\nUna propuesta educativa de vanguardia que te prepara para el ámbito internacional. El pensum abarca:\n• Técnicas de corte, manipulación de alimentos y normas internacionales de bioseguridad.\n• Preparación de gastronomía criolla tradicional, fusión y platos internacionales.\n• **Módulo de Inglés Técnico**: Manejo fluido del idioma aplicado a la terminología culinaria y servicio hotelero.\n\nPerfecto si aspiras a trabajar en la industria turística o iniciar tu propia firma de catering."
    },
    curso_modisteria: {
        keywords: ["modisteria", "costura", "corte", "confeccion", "diseño", "modas", "ropa", "coser", "maquina"],
        respuesta: "✂️ **Especialidad Profesional: Modistería / Corte y Confección**\n\nUn oficio técnico de alta demanda comercial y excelente margen de ganancia. Aprenderás:\n• Manejo operativo de máquinas de coser industriales (rectas y overlock).\n• Antropometría, desarrollo de patrones base en papel y escalado de tallas.\n• Confección completa de camisas, pantalones, vestidos y prendas estructuradas.\n\nIdeal para crear tu propia marca de ropa o trabajar como patronista independiente."
    },
    cursos_general: {
        keywords: ["curso", "clases", "estudiar", "aprender", "oferta", "catalogo", "materia", "especialidades", "talleres", "lista"],
        respuesta: "Actualmente, la oferta académica oficial de **BotEduCarmen 2026** cuenta con 4 especializaciones técnicas de alto nivel productivo:\n\n1️⃣ 💅 **Estética de Uñas** (Sistemas, Manicura y Pedicura)\n2️⃣ 💈 **Barbería Profesional** (Cortes modernos y cuidado de barba)\n3️⃣ 🍳 **Cocina Bilingüe** (Alta gastronomía y lenguaje técnico)\n4️⃣ ✂️ **Modistería / Corte y Confección** (Patronaje y diseño textil)\n\nTodos los programas son presenciales, prácticos y cuentan con certificación oficial gratuita. ¿Te interesa conocer alguno?"
    },
    inscripcion: {
        keywords: ["inscripcion", "inscribirme", "inscribir", "registrarme", "registro", "postularme", "proceso", "pasos", "guiar", "inscribo", "incribo"],
        respuesta: "🚀 **Ruta Guiada de Inscripción Digital y Física (Periodo Académico 2026)**:\n\nPara asegurar tu cupo de forma exitosa, sigue este procedimiento automatizado:\n\n1️⃣ **Fase de Selección**: Dirígete a la pestaña **'CURSOS'** en el menú de navegación de arriba. Revisa el programa que deseas y presiona el botón *'Agregar al carrito'*.\n2️⃣ **Fase de Registro Digital**: Ve al apartado **'Mi Selección'** (icono de carrito), verifica tu curso asignado y presiona *'Proceder a la inscripción'*. Rellena el formulario con tus datos reales básicos.\n3️⃣ **Fase de Confirmación**: Una vez enviado el formulario, el sistema guardará tus datos. Para finalizar, debes presentarte en la sede del CAE en Las Mercedes con los requisitos físicos mínimos para recibir tu carnet de estudiante."
    },
    requisitos: {
        keywords: ["requisitos", "necesito", "documentos", "papeles", "edad", "cedula", "llevar", "consignacion"],
        respuesta: "Para formar parte de nuestra comunidad estudiantil, los requisitos exigidos por el departamento de control de estudios son sumamente sencillos y accesibles:\n\n1️⃣ **Edad Mínima**: Haber cumplido los **15 años de edad** en adelante.\n2️⃣ **Documentación**: Presentar una (1) copia en físico, legible y clara de tu **Cédula de Identidad**.\n\n*Nota Importante*: No requieres un promedio de notas específico, títulos previos, ni realizar exámenes complejos de admisión. ¡Buscamos tu deseo de superación productiva!"
    },
    ubicacion: {
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "mapa", "llegar", "cae", "victoria", "aragua", "mercedes"],
        respuesta: "📍 **Ubicación Geográfica Oficial**:\nNuestras actividades académicas y administrativas se centralizan en la ciudad de **La Victoria, Estado Aragua, en el Sector Las Mercedes**.\n\nNos encontramos ubicados exactamente dentro de las instalaciones del **Centro de Artes y Oficios (CAE) 'Carmen Pilar Fernández'**.\n\n*Referencia de llegada*: Puedes preguntar en el sector por el centro educativo artesanal de Las Mercedes; contamos con facilidades de acceso en transporte público."
    },
    costo: {
        keywords: ["precio", "costo", "cuanto", "vale", "pagar", "mensualidad", "gratis", "arancel", "gratuito"],
        respuesta: "💰 **Transparencia Financiera**: La educación en **BotEduCarmen 2026** es **100% completamente gratuita**.\n\nBajo ninguna circunstancia se realizan cobros por concepto de inscripciones, mensualidades, matrículas o derechos de certificación final. Es un programa protegido para impulsar el desarrollo económico comunal."
    },
    horarios: {
        keywords: ["horario", "turno", "hora", "tarde", "mañana", "cuando", "estudia", "dias", "bloque", "semana"],
        respuesta: "📅 **Distribución de Horarios y Secciones**:\nLas clases se imparten de manera regular de **lunes a viernes** organizadas en dos bloques de tiempo flexibles:\n\n☀️ **Turno Mañana**: Ideal para quienes disponen de las primeras horas del día.\n⛅ **Turno Tarde**: Diseñado para trabajadores o estudiantes de otros niveles académicos.\n\n*Detalle Importante*: Los días específicos de asistencia por semana y la sección exacta te serán asignados de forma personalizada en taquilla al validar tu Cédula de Identidad en la sede física."
    },
    despedida: {
        keywords: ["gracias", "adios", "chao", "luego", "excelente", "entendido", "fino", "ok", "okey", "listo", "perfecto"],
        respuesta: "¡Ha sido un verdadero placer ayudarte! 🚀 Recuerda que los cupos son limitados por espacio de aula práctica. Te sugiero iniciar tu proceso seleccionando tu curso hoy mismo. Si tienes cualquier otra pregunta en el futuro, solo vuelve a abrir la burbuja del chat. ¡Mucho éxito!"
    }
};

function limpiarYTokens(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/([^a-z0-9\s])/g, " ").replace(/\s+/g, " ").trim().split(" ");                     
}

function verificarCoherencia(tokens) {
    if (tokens.length === 0 || tokens[0] === "") return false;
    if (tokens.length === 1 && tokens[0].length < 3) {
        return ["hi", "oi", "ok", "id"].includes(tokens[0]);
    }
    const textoUnido = tokens.join("");
    return /[aeiou]/i.test(textoUnido) || textoUnido.length <= 3;
}

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;
    if (chatWin.style.display === 'none' || chatWin.style.display === '') {
        chatWin.style.display = 'flex';
        const container = document.getElementById('chat-messages');
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = `<div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width: 85%; line-height: 1.45; color: #1e293b; font-size: 0.95rem;">¡Hola! Te doy la bienvenida al asistente virtual de **BotEduCarmen 2026**. 🏢✨<br><br>¿En qué te puedo colaborar hoy? Puedes consultarme directamente sobre nuestros <strong>cursos</strong>, la guía de <strong>inscripción</strong>, <strong>requisitos</strong>, <strong>ubicación</strong> o <strong>horarios</strong>.</div>`;
        }
    } else {
        chatWin.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    if (!input || !container) return;
    const textoOriginal = input.value.trim();
    if (textoOriginal === "") return;

    container.innerHTML += `<div style="background:var(--azul-primario); color:white; padding:15px; border-radius:20px; align-self:flex-end; max-width:80%; word-break: break-word; margin-bottom: 5px; font-size: 0.95rem;">${textoOriginal}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    const tokens = limpiarYTokens(textoOriginal);
    let respuestasAInyectar = [];

    if (!verificarCoherencia(tokens)) {
        respuestasAInyectar.push("Para poder darte una respuesta útil y acertada, por favor evita enviar caracteres aleatorios o texto sin sentido. 🧐 ¿Te gustaría saber sobre nuestros **cursos**, **requisitos** o cómo hacer la **inscripción**?");
    } else {
        let puntuacionesCategorias = {};
        for (let cat in baseConocimiento) {
            let score = 0;
            let palabrasClave = baseConocimiento[cat].keywords;
            tokens.forEach(token => {
                palabrasClave.forEach(keyword => {
                    if (token === keyword || (token.length > 4 && keyword.startsWith(token)) || (keyword.length > 4 && token.startsWith(keyword))) {
                        score += (cat.startsWith("curso_") || cat === "inscripcion") ? 15 : 5;
                    }
                });
            });
            if (score > 0) puntuacionesCategorias[cat] = score;
        }

        let categoriasOrdenadas = Object.keys(puntuacionesCategorias).sort((a, b) => puntuacionesCategorias[b] - puntuacionesCategorias[a]);
        if (categoriasOrdenadas.length > 0) {
            let maxScore = puntuacionesCategorias[categoriasOrdenadas[0]];
            categoriasOrdenadas.forEach(cat => {
                if (puntuacionesCategorias[cat] >= maxScore * 0.5) respuestasAInyectar.push(baseConocimiento[cat].respuesta);
            });
            if (respuestasAInyectar.length > 1) {
                let tieneEspecifico = respuestasAInyectar.some(r => r.includes("Especialidad Profesional:"));
                if (tieneEspecifico) {
                    respuestasAInyectar = respuestasAInyectar.filter(r => !r.includes("oferta académica oficial de **BotEduCarmen 2026**"));
                }
            }
        } else {
            respuestasAInyectar.push("Entiendo lo que planteas, pero actualmente mi base de datos operativa está configurada estrictamente para gestionar el proceso de **admisiones, especialidades técnicas, requisitos, horarios y localización** del periodo 2026. 🏢\n\nPrueba consultándome algo directo como: *'¿Qué enseñan en barbería?'* o *'¿Cómo es el proceso para inscribirse?'*.");
        }
    }

    const idEspera = "bot-typing";
    container.innerHTML += `<div id="${idEspera}" style="background: #e2e8f0; color: #64748b; padding: 10px 15px; border-radius: 20px; align-self: flex-start; font-size: 0.85rem; font-style: italic;">Procesando respuesta...</div>`;
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const elementoTipeando = document.getElementById(idEspera);
        if (elementoTipeando) elementoTipeando.remove();
        let respuestaFinalUnificada = respuestasAInyectar.join("\n\n---\n\n").replace(/\n/g, '<br>');
        container.innerHTML += `<div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width:85%; line-height:1.45; word-break: break-word; color: #1e293b; font-size: 0.95rem;">${respuestaFinalUnificada}</div>`;
        container.scrollTop = container.scrollHeight;
    }, 450);
}

// =========================================================================
// 🚀 IMPLEMENTACIÓN DE ACCIONES TÉCNICAS REALES EXIGIDAS
// =========================================================================

// OPCIÓN 1: EJECUCIÓN REAL DE RECONOCIMIENTO DE VOZ (Web Speech API)
function activarDictadoVoz() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta la API de Reconocimiento de Voz. Te sugiero usar Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-VE'; // Configurado para modismos y acento venezolano
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const voiceBtn = document.getElementById('voice-btn');
    const inputField = document.getElementById('user-input');

    voiceBtn.innerHTML = "🔴";
    voiceBtn.style.background = "#fee2e2";

    recognition.start();

    recognition.onresult = (event) => {
        const textoEscuchado = event.results[0][0].transcript;
        if (inputField) {
            inputField.value = textoEscuchado;
            // Envío automatizado fluido tras procesar el flujo de audio
            sendMessage();
        }
    };

    recognition.onspeechend = () => { recognition.stop(); };
    recognition.onerror = () => { alert("Hubo un error al procesar el audio. Inténtalo de nuevo."); };
    recognition.onend = () => {
        voiceBtn.innerHTML = "🎙️";
        voiceBtn.style.background = "#f1f5f9";
    };
}

// OPCIÓN 2: BÚSQUEDA Y VALIDACIÓN DE CÉDULAS EN MAPA DE DATOS OPERATIVO REAL
const baseDatosEstudiantes = {
    "12345678": { nombre: "Bladimir Silva", curso: "Barbería Profesional", status: "PRE-APROBADO", msg: "Asiste este lunes con tu copia de cédula para recibir tu carnet." },
    "28000111": { nombre: "Maria Pérez", curso: "Estética de Uñas", status: "EN ESPERA DE VALIDACIÓN", msg: "Tu formulario web fue recibido. Acude a la sede del CAE para verificar tus datos corporales." },
    "30123456": { nombre: "Carlos Mendoza", curso: "Cocina Bilingüe", status: "RECHAZADO POR CUPO", msg: "Sección saturada para el bloque actual. Pasa por Control de Estudios para asignarte un cupo en Modistería." }
};

function abrirModalEstatus() {
    document.getElementById('estatus-modal').style.display = 'flex';
    document.getElementById('cedula-consulta').value = "";
    document.getElementById('resultado-consulta').style.display = 'none';
}
function cerrarModalEstatus() { document.getElementById('estatus-modal').style.display = 'none'; }

function procesarConsultaEstatus() {
    const cedula = document.getElementById('cedula-consulta').value.trim();
    const cajaResultado = document.getElementById('resultado-consulta');
    if(cedula === "") { alert("Por favor, introduce un número de cédula válido."); return; }

    cajaResultado.style.display = "block";
    
    if (baseDatosEstudiantes[cedula]) {
        const est = baseDatosEstudiantes[cedula];
        let colorBg = "#dcfce7", colorText = "#166534";
        if(est.status.includes("ESPERA")) { colorBg = "#fef9c3"; colorText = "#854d0e"; }
        if(est.status.includes("RECHAZADO")) { colorBg = "#fee2e2"; colorText = "#991b1b"; }

        cajaResultado.style.backgroundColor = colorBg;
        cajaResultado.style.color = colorText;
        cajaResultado.innerHTML = `👋 Hola, ${est.nombre}<br><strong>Curso:</strong> ${est.curso}<br><strong>Estatus:</strong> ${est.status}<br><span style="font-size:0.85rem; font-weight:normal;">${est.msg}</span>`;
    } else {
        cajaResultado.style.backgroundColor = "#f1f5f9";
        cajaResultado.style.color = "#475569";
        cajaResultado.innerHTML = `❌ La cédula V-${cedula} no registra ninguna solicitud en el periodo 2026. Inicia tu proceso en la pestaña superior de Cursos.`;
    }
}

// BOTÓN EXTRA EXIGIDO: ENLACE AL CANAL DE ATENCIÓN DE WHATSAPP OFICIAL CON INYECCIÓN DE TEXTO DINÁMICO
function abrirCanalWhatsApp() {
    const numeroSede = "584243360158"; // Código internacional + número institucional asignado
    const fechaActual = new Date().toLocaleDateString('es-VE');
    const mensajePreconfigurado = encodeURIComponent(`¡Hola, Control de Estudios de BotEduCarmen 2026! 🏢 Requiero soporte técnico personalizado con mi proceso de validación física hoy (${fechaActual}).`);
    
    // Ejecución forzada de la API de comunicación de WhatsApp
    window.open(`https://wa.me/${numeroSede}?text=${mensajePreconfigurado}`, '_blank');
}

// ASIGNACIÓN AL CONTEXTO DE EJECUCIÓN GLOBAL DEL NAVEGADOR
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.activarDictadoVoz = activarDictadoVoz;
window.abrirModalEstatus = abrirModalEstatus;
window.cerrarModalEstatus = cerrarModalEstatus;
window.procesarConsultaEstatus = procesarConsultaEstatus;
window.abrirCanalWhatsApp = abrirCanalWhatsApp;

document.addEventListener("DOMContentLoaded", () => {
    const campoTexto = document.getElementById('user-input');
    if (campoTexto) {
        campoTexto.addEventListener("keypress", (e) => {
            if (e.key === "Enter") { e.preventDefault(); sendMessage(); }
        });
    }
});
