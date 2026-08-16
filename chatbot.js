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

// Inicialización condicional para evitar re-inicialización
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

function enviarMensajeChat() {
    const inputField = document.getElementById('user-input');
    if (!inputField) return;

    const mensajeTexto = inputField.value.trim();
    if (mensajeTexto === '') return;

    agregarBurbujaChat(mensajeTexto, 'usuario');
    inputField.value = '';

    setTimeout(() => {
        const respuesta = procesarRespuestaBot(mensajeTexto.toLowerCase());
        agregarBurbujaChat(respuesta, 'bot');
    }, 600);
}

function agregarBurbujaChat(texto, emisor) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const burbuja = document.createElement('div');
    
    if (emisor === 'usuario') {
        burbuja.style.background = '#0a192f';
        burbuja.style.color = 'white';
        burbuja.style.padding = '12px 18px';
        burbuja.style.borderRadius = '18px 18px 0 18px';
        burbuja.style.alignSelf = 'flex-end';
        burbuja.style.maxWidth = '80%';
    } else {
        burbuja.style.background = 'white';
        burbuja.style.color = '#1e293b';
        burbuja.style.padding = '12px 18px';
        burbuja.style.borderRadius = '18px 18px 18px 0';
        burbuja.style.alignSelf = 'flex-start';
        burbuja.style.maxWidth = '80%';
        burbuja.style.borderLeft = '4px solid #00d2ff';
        burbuja.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }

    burbuja.innerHTML = texto;
    chatMessages.appendChild(burbuja);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function procesarRespuestaBot(mensaje) {
    if (mensaje.includes('hola') || mensaje.includes('buenas')) {
        return "¡Hola! Bienvenido a BotEduCarmen. ¿En qué puedo orientarte hoy sobre nuestros cursos?";
    }
    if (mensaje.includes('curso') || mensaje.includes('oferta') || mensaje.includes('inscribir')) {
        return "Puedes ver toda nuestra oferta en la pestaña 'CURSOS'. Elige el que prefieras e inicia tu inscripción directamente desde la web.";
    }
    if (mensaje.includes('costo') || mensaje.includes('precio') || mensaje.includes('pagar')) {
        return "Nuestros módulos de formación son totalmente gratuitos para la comunidad.";
    }
    if (mensaje.includes('donde') || mensaje.includes('ubicacion')) {
        return "Estamos ubicados en La Victoria, Aragua. Todas las inscripciones se canalizan por esta plataforma.";
    }
    return "Para postularte, dirígete al menú de 'CURSOS', selecciona los de tu preferencia y llena el formulario de contacto integrado.";
}
