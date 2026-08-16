// ==========================================================
// CONFIGURACIÓN DE FIREBASE
// ==========================================================
const firebaseConfig = {
    apiKey: "AIzaSyDKnVg7dwb60-oXHs2nJ9w83XFkhN128tw",
    authDomain: "boteducarmen2026.firebaseapp.com",
    databaseURL: "https://boteducarmen2026-default-rtdb.firebaseio.com",
    projectId: "boteducarmen2026",
    storageBucket: "boteducarmen2026.firebasestorage.app",
    messagingSenderId: "345344555322",
    appId: "1:345344555322:web:df90364298617b9314b803"
};

// Inicialización condicional para evitar errores de duplicación
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// ==========================================================
// INTERFAZ Y MANEJO DEL CHATBOT
// ==========================================================
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;
    
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                enviarMensajeChat();
            }
        });
    }
});

async function enviarMensajeChat() {
    const inputField = document.getElementById('user-input');
    if (!inputField) return;

    const mensajeTexto = inputField.value.trim();
    if (mensajeTexto === '') return;

    // Agregar mensaje enviado por el usuario
    agregarBurbujaChat(mensajeTexto, 'usuario');
    inputField.value = '';

    // Crear indicador visual de respuesta
    const idCargando = "bot-cargando-" + Date.now();
    agregarBurbujaChat("<em>Procesando consulta...</em>", 'bot', idCargando);

    // Obtener respuesta del bot (Firebase / IA / FAQs)
    const respuesta = await procesarRespuestaBot(mensajeTexto);

    // Reemplazar texto del indicador por la respuesta final
    const elemCargando = document.getElementById(idCargando);
    if (elemCargando) {
        elemCargando.innerHTML = respuesta;
    } else {
        agregarBurbujaChat(respuesta, 'bot');
    }
}

function agregarBurbujaChat(texto, emisor, id = null) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const burbuja = document.createElement('div');
    if (id) burbuja.id = id;
    
    if (emisor === 'usuario') {
        burbuja.style.background = '#0a192f';
        burbuja.style.color = 'white';
        burbuja.style.padding = '12px 18px';
        burbuja.style.borderRadius = '18px 18px 0 18px';
        burbuja.style.alignSelf = 'flex-end';
        burbuja.style.maxWidth = '80%';
        burbuja.style.marginBottom = '8px';
    } else {
        burbuja.style.background = 'white';
        burbuja.style.color = '#1e293b';
        burbuja.style.padding = '12px 18px';
        burbuja.style.borderRadius = '18px 18px 18px 0';
        burbuja.style.alignSelf = 'flex-start';
        burbuja.style.maxWidth = '80%';
        burbuja.style.borderLeft = '4px solid #00d2ff';
        burbuja.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        burbuja.style.marginBottom = '8px';
    }

    burbuja.innerHTML = texto;
    chatMessages.appendChild(burbuja);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==========================================================
// LÓGICA DE DETECCIÓN Y RESPUESTAS
// ==========================================================
async function procesarRespuestaBot(mensajeOriginal) {
    const mensaje = mensajeOriginal.toLowerCase();

    // Detección de números de cédula (de 5 a 10 dígitos)
    const numerosEncontrados = mensajeOriginal.match(/\d{5,10}/);

    // 1. Consulta de estatus de inscripción por Cédula
    if (mensaje.includes('estatus') || mensaje.includes('cedula') || mensaje.includes('cédula') || mensaje.includes('inscripcion') || mensaje.includes('inscripción') || numerosEncontrados) {
        if (numerosEncontrados) {
            const cedulaBuscar = numerosEncontrados[0];
            return await consultarEstatusEnFirebase(cedulaBuscar);
        } else {
            return "Por favor, escribe tu <strong>número de cédula</strong> (por ejemplo: 12345678) para consultar tu estatus de inscripción en el sistema.";
        }
    }

    // 2. Información detallada del sistema y la plataforma
    if (mensaje.includes('requisito') || mensaje.includes('necesito')) {
        return "<strong>Requisitos para inscribirte:</strong><br>• Cédula de identidad laminada o copia.<br>• Correo electrónico activo.<br>• Número telefónico.<br>• Ganas de aprender. ¡Los cursos son totalmente gratuitos!";
    }

    if (mensaje.includes('como me inscribo') || mensaje.includes('cómo me inscribo') || mensaje.includes('pasos') || mensaje.includes('inscribir')) {
        return "<strong>Pasos para la inscripción:</strong><br>1. Dirígete a la pestaña <strong>CURSOS</strong>.<br>2. Selecciona los de tu interés y agrégalos al carrito.<br>3. Revisa tu lista en <strong>CARRITO</strong>.<br>4. Ve a <strong>CONTACTO</strong>, llena tus datos y envía el formulario.";
    }

    if (mensaje.includes('ubicacion') || mensaje.includes('donde') || mensaje.includes('dónde')) {
        return "Estamos ubicados en La Victoria, Estado Aragua. Las inscripciones se gestionan completamente en línea desde este portal.";
    }

    // 3. Respuesta Inteligente Abierta para cualquier otra pregunta
    return await consultarIAGenerica(mensajeOriginal);
}

// ==========================================================
// CONSULTA A FIREBASE CON BÚSQUEDA RECURSIVA (ROBUSTA)
// ==========================================================
async function consultarEstatusEnFirebase(cedulaBuscar) {
    try {
        const cedulaLimpia = cedulaBuscar.toString().replace(/\D/g, '');

        if (!cedulaLimpia) {
            return "Ingresa un número de cédula válido.";
        }

        const snapshot = await db.ref().once('value');
        const datosRaiz = snapshot.val();

        if (!datosRaiz) {
            return "No hay datos registrados en el sistema actualmente.";
        }

        let encontrado = null;

        // Recorre de forma profunda todo el árbol JSON para hallar coincidencia
        function buscarEnObjeto(obj) {
            if (!obj || typeof obj !== 'object' || encontrado) return;

            const posibleCedula = obj.cedula || obj.ci || obj.documento || obj.cedula_identidad || obj.identificacion;
            
            if (posibleCedula) {
                const cedulaObjLimpia = posibleCedula.toString().replace(/\D/g, '');
                if (cedulaObjLimpia === cedulaLimpia) {
                    encontrado = obj;
                    return;
                }
            }

            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    buscarEnObjeto(obj[key]);
                }
            }
        }

        buscarEnObjeto(datosRaiz);

        if (encontrado) {
            const nombre = encontrado.nombre || encontrado.nombreCompleto || encontrado.estudiante || "Estudiante";
            const apellido = encontrado.apellido || "";
            const nombreCompleto = `${nombre} ${apellido}`.trim();
            const estatus = encontrado.estatus || encontrado.estado || "Registrado / En revisión";
            const cursos = encontrado.cursos || encontrado.curso || encontrado.cursoSeleccionado || "Curso Registrado";

            return `🔎 <strong>Estatus de Inscripción Encontrado:</strong><br><br>` +
                   `• <strong>Estudiante:</strong> ${nombreCompleto}<br>` +
                   `• <strong>Cédula:</strong> V-${cedulaLimpia}<br>` +
                   `• <strong>Curso(s):</strong> ${cursos}<br>` +
                   `• <strong>Estatus:</strong> <span style="color:#007bff; font-weight:bold;">${estatus}</span>`;
        } else {
            return `No se encontraron registros activos para la cédula <strong>V-${cedulaLimpia}</strong>.<br><br>Verifica el número o completa tu solicitud en el módulo de <strong>Contacto</strong>.`;
        }

    } catch (error) {
        console.error("Error al consultar Firebase:", error);
        return "Error al conectar con la base de datos. Inténtalo de nuevo en unos momentos.";
    }
}

// ==========================================================
// CONSULTA INTELIGENTE ABIERTA (RESPONDE CUALQUIER TEMA)
// ==========================================================
async function consultarIAGenerica(pregunta) {
    try {
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'Eres el Asistente Virtual educativo de BotEduCarmen (La Victoria, Aragua). Responde de forma breve, amable y concisa a las dudas del usuario.' },
                    { role: 'user', content: pregunta }
                ],
                model: 'openai'
            })
        });

        if (response.ok) {
            return await response.text();
        } else {
            throw new Error("Respuesta no obtenida");
        }
    } catch (err) {
        return "Puedo orientarte con la oferta de <strong>cursos</strong>, <strong>requisitos</strong>, <strong>pasos de inscripción</strong> o consultar tu estatus ingresando tu <strong>número de cédula</strong>.";
    }
}
