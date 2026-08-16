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

    agregarBurbujaChat(mensajeTexto, 'usuario');
    inputField.value = '';

    const idCargando = "bot-cargando-" + Date.now();
    agregarBurbujaChat("<em>Procesando consulta...</em>", 'bot', idCargando);

    const respuesta = await procesarRespuestaBot(mensajeTexto);

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
// LÓGICA DE DETECCIÓN Y RESPUESTAS DETALLADAS
// ==========================================================
async function procesarRespuestaBot(mensajeOriginal) {
    const mensaje = mensajeOriginal.toLowerCase();
    const numerosEncontrados = mensajeOriginal.match(/\d{5,10}/);

    // 1. Nombre e Identidad del Bot
    if (mensaje.includes('como te llamas') || mensaje.includes('cómo te llamas') || mensaje.includes('quien eres') || mensaje.includes('quién eres') || mensaje.includes('tu nombre')) {
        return "¡Hola! Soy el <strong>Asistente Virtual de BotEduCarmen</strong>. Estoy diseñado para orientarte sobre toda nuestra oferta educativa, el proceso de inscripción y consultar el estatus de tu registro.";
    }

    // 2. Proceso de Inscripción desde cualquier parte de la página
    if (mensaje.includes('como me inscribo') || mensaje.includes('cómo me inscribo') || mensaje.includes('como inscribirme') || mensaje.includes('pasos para inscribirme') || mensaje.includes('proceso de inscripcion') || mensaje.includes('proceso de inscripción')) {
        return "📝 <strong>¿Cómo inscribirte desde cualquier sección de la página?</strong><br><br>" +
               "1. En el menú superior, haz clic en la pestaña <strong>CURSOS</strong>.<br>" +
               "2. Selecciona el curso que deseas realizar y presiona el botón <strong>Añadir al Carrito</strong>.<br>" +
               "3. Ve a la pestaña <strong>CARRITO</strong> para verificar tu selección.<br>" +
               "4. Por último, dirígete a <strong>CONTACTO</strong>, llena el formulario con tus datos y presiona enviar para completar tu registro.";
    }

    // 3. Consulta de Cursos Específicos
    if (mensaje.includes('electricidad') || mensaje.includes('electrica')) {
        return "⚡ <strong>Curso de Electricidad Básica y Residencial:</strong><br>" +
               "• <strong>Duración:</strong> 6 semanas (40 horas).<br>" +
               "• <strong>Contenido:</strong> Circuitos, tableros eléctricos, instalaciones residenciales y medidas de seguridad.<br>" +
               "• <strong>Costo:</strong> Totalmente Gratuito.<br>" +
               "• <strong>Modalidad:</strong> Presencial teórico-práctico.";
    }

    if (mensaje.includes('informatica') || mensaje.includes('informática') || mensaje.includes('computacion') || mensaje.includes('computación')) {
        return "💻 <strong>Curso de Informática Básica y Ofimática:</strong><br>" +
               "• <strong>Duración:</strong> 6 semanas (40 horas).<br>" +
               "• <strong>Contenido:</strong> Uso de computador, procesamiento de texto, hojas de cálculo e introducción a la navegación en la web.<br>" +
               "• <strong>Costo:</strong> Gratuito.<br>" +
               "• <strong>Modalidad:</strong> Presencial en laboratorio.";
    }

    if (mensaje.includes('peluqueria') || mensaje.includes('peluquería') || mensaje.includes('barberia') || mensaje.includes('barbería')) {
        return "✂️ <strong>Curso de Peluquería y Barbería:</strong><br>" +
               "• <strong>Duración:</strong> 6 semanas (40 horas).<br>" +
               "• <strong>Contenido:</strong> Técnicas de corte, secado, estilismo y tratamiento capilar básico.<br>" +
               "• <strong>Costo:</strong> Gratuito.<br>" +
               "• <strong>Modalidad:</strong> Práctica guiada.";
    }

    if (mensaje.includes('manicura') || mensaje.includes('pedicura') || mensaje.includes('uñas') || mensaje.includes('unas')) {
        return "💅 <strong>Curso de Manicura y Pedicura Básica:</strong><br>" +
               "• <strong>Duración:</strong> 6 semanas (40 horas).<br>" +
               "• <strong>Contenido:</strong> Cuidado de uñas, limpieza, esmaltado y técnicas de diseño básico.<br>" +
               "• <strong>Costo:</strong> Gratuito.<br>" +
               "• <strong>Modalidad:</strong> Presencial práctico.";
    }

    if (mensaje.includes('reposteria') || mensaje.includes('repostería') || mensaje.includes('cocina')) {
        return "🍰 <strong>Curso de Repostería y Panadería Básica:</strong><br>" +
               "• <strong>Duración:</strong> 6 semanas (40 horas).<br>" +
               "• <strong>Contenido:</strong> Preparación de masas, cubiertas, bizcochos y técnicas de decoración.<br>" +
               "• <strong>Costo:</strong> Gratuito.<br>" +
               "• <strong>Modalidad:</strong> Presencial en taller.";
    }

    // 4. Catálogo Completo o Pregunta General sobre Cursos / Oferta Académica
    if (mensaje.includes('que cursos') || mensaje.includes('qué cursos') || mensaje.includes('catalogo') || mensaje.includes('catálogo') || mensaje.includes('oferta') || mensaje.includes('lista de cursos') || mensaje.includes('cursos disponibles') || mensaje.includes('cursos')) {
        return "📚 <strong>Catálogo de Cursos Disponibles en BotEduCarmen:</strong><br><br>" +
               "• ⚡ <strong>Electricidad Básica</strong> (Duración: 6 semanas)<br>" +
               "• 💻 <strong>Informática Básica</strong> (Duración: 6 semanas)<br>" +
               "• ✂️ <strong>Peluquería y Barbería</strong> (Duración: 6 semanas)<br>" +
               "• 💅 <strong>Manicura y Pedicura</strong> (Duración: 6 semanas)<br>" +
               "• 🍰 <strong>Repostería Básica</strong> (Duración: 6 semanas)<br><br>" +
               "Todos los cursos son <strong>totalmente gratuitos</strong>. Puedes seleccionar cualquiera navegando a la pestaña <strong>CURSOS</strong> del menú principal.";
    }

    // 5. Duración General
    if (mensaje.includes('dura') || mensaje.includes('duracion') || mensaje.includes('duración') || mensaje.includes('cuanto tiempo') || mensaje.includes('cuánto tiempo')) {
        return "Todos los cursos de capacitación en la institución tienen una duración estándar de <strong>6 semanas</strong> (40 horas académicas teórico-prácticas).";
    }

    // 6. Consulta de Estatus en Firebase por Cédula
    if (mensaje.includes('estatus') || mensaje.includes('cedula') || mensaje.includes('cédula') || mensaje.includes('inscripcion') || mensaje.includes('inscripción') || numerosEncontrados) {
        if (numerosEncontrados) {
            const cedulaBuscar = numerosEncontrados[0];
            return await consultarEstatusEnFirebase(cedulaBuscar);
        } else {
            return "Por favor, escribe tu <strong>número de cédula</strong> (ejemplo: 12345678) para buscar tu estatus de inscripción en la base de datos.";
        }
    }

    // 7. Requisitos de Ingreso
    if (mensaje.includes('requisito') || mensaje.includes('necesito')) {
        return "📋 <strong>Requisitos de Inscripción:</strong><br>" +
               "• Cédula de Identidad (V o E).<br>" +
               "• Correo electrónico activo.<br>" +
               "• Número telefónico de contacto.<br>" +
               "• ¡No se requiere pago alguno, la educación es gratuita!";
    }

    // 8. Consulta IA Genérica Secundaria
    return await consultarIAGenerica(mensajeOriginal);
}

// ==========================================================
// CONSULTA RECURSIVA EN FIREBASE (ESTATUS)
// ==========================================================
async function consultarEstatusEnFirebase(cedulaBuscar) {
    try {
        const cedulaLimpia = cedulaBuscar.toString().replace(/\D/g, '');
        if (!cedulaLimpia) return "Ingresa un número de cédula válido.";

        const snapshot = await db.ref().once('value');
        const datosRaiz = snapshot.val();
        if (!datosRaiz) return "No hay datos registrados en el sistema actualmente.";

        let encontrado = null;

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
            return `No se encontraron registros activos para la cédula <strong>V-${cedulaLimpia}</strong>.`;
        }
    } catch (error) {
        console.error("Error al consultar Firebase:", error);
        return "Error al conectar con la base de datos.";
    }
}

// ==========================================================
// CONSULTA INTELIGENTE ABIERTA
// ==========================================================
async function consultarIAGenerica(pregunta) {
    try {
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'Eres el Asistente Virtual educativo de BotEduCarmen (La Victoria, Aragua). Tu nombre es Asistente Virtual de BotEduCarmen. Responde de forma amable y concisa.' },
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
        return "Puedo orientarte sobre nuestros **cursos**, **duración**, **requisitos**, **proceso de inscripción** o verificar tu **estatus por cédula**.";
    }
}
