/**
 * =========================================================
 * BOTEDUCARMEN 2026 - CHATBOT INTEGRADO CON FIREBASE REAL
 * =========================================================
 * Desarrollado por: Bladimir Silva
 * Conexión en vivo con el nodo 'inscritos' de Realtime Database.
 */

// 1. Configuración oficial de tu proyecto
const firebaseConfigChatbot = {
    apiKey: "AIzaSyDKnVg7dwb60-oXHs2nJ9w83XFkhN128tw",
    authDomain: "boteducarmen2026.firebaseapp.com",
    databaseURL: "https://boteducarmen2026-default-rtdb.firebaseio.com",
    projectId: "boteducarmen2026",
    storageBucket: "boteducarmen2026.firebasestorage.app",
    messagingSenderId: "345344555322",
    appId: "1:345344555322:web:df90364298617b9314b803"
};

// 2. Inicializar Firebase de forma segura para evitar duplicados si ya existe
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigChatbot);
}
const chatDb = firebase.database();

// Control de apertura/cierre de la ventana flotante del chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;
    
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

// Bandera para saber si el bot está esperando una cédula para consultar
let esperandoCedula = false;

// Función Principal para Enviar Mensajes en la Interfaz (Renombrada para evitar conflictos)
async function enviarMensajeChat() {
    const inputEl = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!inputEl || !chatMessages) return;
    
    const txt = inputEl.value.trim();
    if (!txt) return;

    // Dibujar el mensaje del usuario en pantalla
    chatMessages.innerHTML += `
        <div style="background: #0a192f; color: white; padding: 15px; border-radius: 20px; align-self: flex-end; max-width: 80%; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 10px;">
            ${txt}
        </div>
    `;
    
    inputEl.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Mostrar burbuja de carga temporal del Bot
    const tempId = "loading-" + Date.now();
    chatMessages.innerHTML += `
        <div id="${tempId}" style="background: white; padding: 15px; border-radius: 20px; align-self: flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #00d2ff; margin-bottom: 10px;">
            🤖 Pensando...
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // --- PROCESAR LA RESPUESTA DE LA IA ---
    let botResponse = "";

    try {
        if (esperandoCedula) {
            // Extraer solo los números de la entrada del usuario en caso de que escriban "V-26..."
            const cedulaLimpia = txt.replace(/\D/g, "");
            
            if (cedulaLimpia.length < 5) {
                botResponse = "⚠️ Por favor, introduce una cédula de identidad válida (solo números, ej: 27123456).";
            } else {
                // Invocar la búsqueda asíncrona real en la base de datos de Firebase
                botResponse = await consultarEstatusEnFirebase(cedulaLimpia);
                esperandoCedula = false; // Resetear el estado
            }
        } else {
            // Respuestas generales del asistente de IA
            const entradaMinuscula = txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (entradaMinuscula.includes('estatus') || entradaMinuscula.includes('extatux') || entradaMinuscula.includes('inscrito') || entradaMinuscula.includes('revisar') || entradaMinuscula.includes('cedula') || entradaMinuscula.includes('consulta')) {
                botResponse = "🔍 ¡Excelente! Con gusto revisaré tu estatus en el servidor de Firebase. Por favor, <b>escribe solo los números de tu Cédula de Identidad</b> para iniciar la búsqueda:";
                esperandoCedula = true;
            } else if (entradaMinuscula.includes('hola') || entradaMinuscula.includes('buenas')) {
                botResponse = "👋 ¡Hola, Bladimir! Te habla el Asistente Virtual 2026. Puedo orientarte sobre los cursos o revisar en tiempo real el estatus de tu inscripción. ¿En qué te puedo ayudar hoy?";
            } else if (entradaMinuscula.includes('llamas') || entradaMinuscula.includes('nombre') || entradaMinuscula.includes('quien eres')) {
                botResponse = "🤖 Mi nombre es <b>BotEduCarmen 2026</b>, un asistente virtual programado para agilizar la gestión informativa del CPF Carmen Pilar Fernández.";
            } else if (entradaMinuscula.includes('curso') || entradaMinuscula.includes('oferta') || entradaMinuscula.includes('estudiar')) {
                botResponse = "📚 Contamos con cursos tecnológicos de vanguardia y capacitación artesanal (Programación, Ofimática, Confección, etc.). Puedes ver los detalles en la pestaña superior en el botón <b>CURSOS</b>.";
            } else {
                botResponse = "🤖 Entendido. Recuerda que puedes consultarme sobre la oferta de cursos o escribir la palabra <b>'Estatus'</b> para verificar si tu registro en el sistema fue procesado con éxito.";
            }
        }
    } catch (error) {
        botResponse = "⚠️ Ocurrió un error procesando el mensaje: " + error.message;
    }

    // Remover indicador de carga de forma segura
    const loadingEl = document.getElementById(tempId);
    if (loadingEl) loadingEl.remove();

    // Pintar la respuesta definitiva
    chatMessages.innerHTML += `
        <div style="background: white; padding: 15px; border-radius: 20px; align-self: flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #00d2ff; line-height: 1.5; margin-bottom: 10px; color: #1e293b;">
            ${botResponse}
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * CONSULTA ASÍNCRONA REAL A LA NUBE
 * Recorre el nodo 'inscritos' buscando coincidencia exacta con el campo 'cedula'.
 */
function consultarEstatusEnFirebase(cedulaBuscada) {
    return new Promise((resolve) => {
        chatDb.ref('inscritos').once('value')
            .then((snapshot) => {
                let alumnoEncontrado = null;

                // Iterar sobre todos los registros en la base de datos remota
                snapshot.forEach((childSnapshot) => {
                    const datos = childSnapshot.val();
                    if (String(datos.cedula).trim() === String(cedulaBuscada).trim()) {
                        alumnoEncontrado = datos;
                        return true; // Rompe el bucle de forEach
                    }
                });

                if (alumnoEncontrado) {
                    resolve(`✅ <b>¡Registro Encontrado con Éxito!</b><br><br>
                            👤 <b>Estudiante:</b> ${alumnoEncontrado.nombre}<br>
                            🪪 <b>Cédula:</b> V-${alumnoEncontrado.cedula}<br>
                            🎟️ <b>ID Ticket:</b> ${alumnoEncontrado.id}<br>
                            📚 <b>Curso(s):</b> <span style="color:#00a8cc">${alumnoEncontrado.cursos || 'Asignación General'}</span><br>
                            📅 <b>Fecha de Registro:</b> ${alumnoEncontrado.fecha || 'N/A'}<br><br>
                            🟢 <b>Estatus Actual:</b> <span style="color:#25d366; font-weight:bold;">Preinscrito - Verificado en Nube</span>`);
                } else {
                    resolve(`⚠️ <b>Registro No Encontrado</b><br><br>
                            La cédula <b>V-${cedulaBuscada}</b> no coincide con ningún estudiante registrado en nuestro período académico 2026.<br><br> 
                            👉 Asegúrate de haber completado el formulario de inscripción correctamente.`);
                }
            })
            .catch((error) => {
                console.error("Error al consultar Firebase: ", error);
                resolve(`💥 <b>Error de Conexión:</b> No se pudo sincronizar con la base de datos de Firebase. Detalles: ${error.message}`);
            });
    });
}

// 4. Escuchar eventos del teclado para enviar con ENTER
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                enviarMensajeChat();
            }
        });
    }
});
