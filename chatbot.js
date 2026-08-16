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

// Inicialización condicional de Firebase
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

    // Agregar mensaje del usuario
    agregarBurbujaChat(mensajeTexto, 'usuario');
    inputField.value = '';

    // Muestra indicador de respuesta en el chat
    const idCargando = "bot-cargando-" + Date.now();
    agregarBurbujaChat("<em>Escribiendo...</em>", 'bot', idCargando);

    // Procesar respuesta (Firebase / Respuestas de Cursos / IA)
    const respuesta = await procesarRespuestaBot(mensajeTexto);

    // Reemplazar texto de carga con la respuesta final
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
// LÓGICA PRINCIPAL DE RESPUESTAS
// ==========================================================
async function procesarRespuestaBot(mensajeOriginal) {
    const mensaje = mensajeOriginal.toLowerCase();

    // 1. Extraer número de Cédula si el usuario escribe números
    const numerosEncontrados = mensajeOriginal.match(/\d{5,10}/);

    if (mensaje.includes('estatus') || mensaje.includes('cedula') || mensaje.includes('cédula') || mensaje.includes('inscripcion') || mensaje.includes('inscripción') || numerosEncontrados) {
        if (numerosEncontrados) {
            const cedulaBuscar = numerosEncontrados[0];
            return await consultarEstatusEnFirebase(cedulaBuscar);
        } else {
            return "Por favor, escribe tu **número de cédula** (solo números, por ejemplo: 12345678) para verificar el estatus de tu inscripción en la base de datos.";
        }
    }

    // 2. Información detallada sobre Cursos e Inscripciones
    if (mensaje.includes('requisito') || mensaje.includes('necesito')) {
        return "<strong>Requisitos para inscribirte:</strong><br>• Cédula de identidad laminada (o copia).<br>• Correo electrónico activo.<br>• Número de teléfono WhatsApp.<br>• Ganas de aprender. ¡Nuestros cursos son totalmente gratuitos!";
    }

    if (mensaje.includes('como me inscribo') || mensaje.includes('cómo me inscribo') || mensaje.includes('pasos')) {
        return "<strong>Pasos para inscribirte:</strong><br>1. Ve al menú <strong>CURSOS</strong>.<br>2. Selecciona el curso de tu interés y presiona 'Inscribirse'.<br>3. Dirígete al <strong>CARRITO</strong> para confirmar tus cursos.<br>4. Completa el formulario de registro en <strong>CONTACTO</strong> y envía tu postulación.";
    }

    // 3. Respuesta Inteligente Abierta para cualquier otra duda
    return await consultarIAGenerica(mensajeOriginal);
}

// ==========================================================
// CONSULTA A FIREBASE PARA VERIFICAR CÉDULA
// ==========================================================
async function consultarEstatusEnFirebase(cedula) {
    try {
        const snapshot = await db.ref('inscripciones').once('value');
        const datos = snapshot.val();

        if (!datos) {
            return `No se encontraron inscripciones registradas en el sistema para la cédula **${cedula}**.`;
        }

        let encontrado = null;

        // Recorre la base de datos buscando coincidencia de cédula
        Object.keys(datos).forEach(key => {
            const registro = datos[key];
            if (registro.cedula && registro.cedula.toString().includes(cedula)) {
                encontrado = registro;
            }
        });

        if (encontrado) {
            const estatus = encontrado.estatus || "En proceso de revisión";
            const cursos = encontrado.cursos || encontrado.curso || "No especificado";
            const nombre = encontrado.nombre || "Estudiante";

            return `🔎 <strong>Estatus de Inscripción</strong><br><br>` +
                   `• <strong>Nombre:</strong> ${nombre}<br>` +
                   `• <strong>Cédula:</strong> ${cedula}<br>` +
                   `• <strong>Curso(s):</strong> ${cursos}<br>` +
                   `• <strong>Estado:</strong> <span style="color:#007bff; font-weight:bold;">${estatus}</span>`;
        } else {
            return `No encontramos ningún registro activo con la cédula **${cedula}**. Por favor verifica el número o completa tu formulario en la sección de **Contacto**.`;
        }
    } catch (error) {
        console.error("Error al consultar Firebase:", error);
        return "Hubo un inconveniente al conectar con la base de datos para verificar tu cédula. Por favor, intenta de nuevo en un momento.";
    }
}

// ==========================================================
// RESPUESTA ABIERTA / INTELIGENTE PARA CUALQUIER PREGUNTA
// ==========================================================
async function consultarIAGenerica(pregunta) {
    try {
        // Usa Pollinations AI (API gratuita y pública para responder cualquier tema)
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'Eres el Asistente Virtual educativo de BotEduCarmen (La Victoria, Aragua). Responde de forma amable, clara y precisa a las preguntas de los estudiantes.' },
                    { role: 'user', content: pregunta }
                ],
                model: 'openai'
            })
        });

        if (response.ok) {
            const texto = await response.text();
            return texto;
        } else {
            throw new Error("Respuesta de API no válida");
        }
    } catch (err) {
        return "Con gusto puedo ayudarte. Puedes consultarme sobre la oferta de **cursos**, **requisitos de inscripción**, **pasos para inscribirte** o escribir tu **número de cédula** para consultar tu estatus.";
    }
}
