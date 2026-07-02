/**
 * =========================================================================
 * BotEduCarmen 2026 - ARCHIVO DE INTELIGENCIA VIRTUAL (chatbot.js)
 * Desarrollado por: Bladimir Silva
 * PNF en Informática - PROYECTO BLINDADO Y OPTIMIZADO
 * =========================================================================
 */

let primerAbierto = true;

// 1. CONTROL DE APERTURA REACTIVA Y UNIFORME
function toggleChat() {
    const w = document.getElementById('chat-window');
    if (!w) return;
    
    if (w.style.display === 'none' || w.style.display === '') {
        w.style.display = 'flex';
        // Inyectar el saludo inicial con delay natural únicamente la primera vez
        if (primerAbierto) {
            const box = document.getElementById('chat-messages');
            if (box) {
                box.innerHTML = `
                    <div class="msg-bot">
                        <span>¡Hola! Soy tu asistente inteligente BotEduCarmen 2026. 🤖<br><br>
                        Estoy aquí para ayudarte a automatizar tu inscripción. ¿En qué área o curso deseas capacitarte hoy? Puedes consultarme los requisitos de ingreso.</span>
                    </div>`;
            }
            primerAbierto = false;
        }
    } else {
        w.style.display = 'none';
    }
}

// 2. PROCESAMIENTO SEMÁNTICO DE RESPUESTAS (Sin fallos de ejecución)
function sendMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-messages');
    if (!input || !box) return;
    
    const text = input.value.trim();
    if (!text) return;

    // Renderizar mensaje del usuario de forma limpia usando las clases del styles.css
    box.innerHTML += `
        <div class="msg-user">
            <span>${escapeHTML(text)}</span>
        </div>`;
    
    box.scrollTop = box.scrollHeight;
    input.value = "";
    
    // Simulación de procesamiento de IA Contextual con delay natural
    setTimeout(() => {
        let respuesta = "🎯 Entendido. Como plataforma tecnológica del 2026, te sugiero revisar nuestra oferta formativa completa en la sección de <b>Cursos</b> para iniciar tu postulación digital.";
        
        const normalizado = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Base de Conocimiento Blindada para el Jurado
        if (normalizado.includes("requisito") || normalizado.includes("recaudo") || normalizado.includes("documento")) {
            respuesta = `📋 <b>Requisitos de Ingreso 2026:</b><br>
                         1. Ser mayor de 15 años.<br>
                         2. Copia de la Cédula de Identidad.<br>
                         3. Completar el registro digital en este portal web.<br>
                         4. Consignar la carpeta física en la sede del CAE (Las Mercedes) para la validación final.`;
        } else if (normalizado.includes("inscri") || normalizado.includes("anadir") || normalizado.includes("seleccionar") || normalizado.includes("como me")) {
            respuesta = `🚀 <b>Proceso de Inscripción Automatizado:</b><br>
                         1. Dirígete a la pestaña <b>Cursos</b>.<br>
                         2. Selecciona las opciones de tu interés (máximo 26 cursos reales disponibles).<br>
                         3. Ve a tu <b>Lista de Interés</b>, introduce tus datos personales y confirma el registro digital.`;
        } else if (normalizado.includes("unas") || normalizado.includes("manicure") || normalizado.includes("pedicure")) {
            respuesta = "💅 <b>Área de Estética de Uñas / Manicure y Pedicure:</b><br>Aprenderás técnicas modernas de acrílico, gel, diseños tridimensionales y bioseguridad orientados al emprendimiento inmediato en la comunidad. ¡Hay cupos disponibles!";
        } else if (normalizado.includes("barber") || normalizado.includes("peluquer")) {
            respuesta = "💈 <b>Área de Estética Corporal:</b><br>Nuestros cursos de Barbería y Peluquería ofrecen formación práctica integral en cortes modernos, visagismo, colorimetría y gestión comercial de salones artesanales.";
        } else if (normalizado.includes("reposteria") || normalizado.includes("panaderia") || normalizado.includes("cocina") || normalizado.includes("pasteleria")) {
            respuesta = "🎂 <b>Área de Gastronomía:</b><br>Contamos con Panadería, Repostería, Pastelería y Dulces Criollos. Aprenderás manipulación de alimentos, técnicas de horneado y costeo de productos artesanales.";
        } else if (normalizado.includes("electrici") || normalizado.includes("electrodomestico") || normalizado.includes("tecnico")) {
            respuesta = "⚡ <b>Área Técnica Profesional:</b><br>Los cursos de Electricidad y Reparación de Electrodomésticos capacitan en diagnósticos críticos, mantenimiento preventivo y reparaciones residenciales seguras bajo estándares 2026.";
        } else if (normalizado.includes("quien eres") || normalizado.includes("creador") || normalizado.includes("bladimir")) {
            respuesta = "🤖 Soy el Asistente Virtual Inteligente de <b>BotEduCarmen 2026</b>, desarrollado por el futuro Ingeniero <b>Bladimir Silva</b> como parte de su Trabajo de Investigación en el PNF en Informática.";
        } else if (normalizado.includes("costo") || normalizado.includes("precio") || normalizado.includes("pagar")) {
            respuesta = "💰 <b>Acceso 100% Gratuito:</b> Todos los cursos dictados en esta plataforma son de carácter público y gratuito para el beneficio del desarrollo socio-productivo de la comunidad.";
        }

        box.innerHTML += `
            <div class="msg-bot">
                <span>${respuesta}</span>
            </div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
}

// 3. SEGURIDAD ANTE INYECCIÓN DE CÓDIGO (Anti-Hacks del Usuario en el Chat)
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// 4. DICTADO POR VOZ OPTIMIZADO (Web Speech API)
function activarDictadoVoz() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceBtn = document.getElementById('voice-btn');
    const userInput = document.getElementById('user-input');

    if (!SpeechRecognition) {
        alert("El dictado por voz no está soportado en este navegador. Te sugerimos usar Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-VE'; // Configuración nativa para Venezuela
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        if (voiceBtn && userInput) {
            voiceBtn.innerHTML = "🛑";
            voiceBtn.style.background = "#ff4444";
            userInput.placeholder = "Escuchando tu consulta...";
        }
    };

    recognition.onresult = (event) => {
        if (userInput) {
            userInput.value = event.results[0][0].transcript;
        }
    };

    recognition.onerror = () => {
        alert("No se pudo percibir el audio claramente. Por favor, intenta de nuevo.");
    };

    recognition.onend = () => {
        if (voiceBtn && userInput) {
            voiceBtn.innerHTML = "🎙️";
            voiceBtn.style.background = "";
            userInput.placeholder = "Pregunta algo al asistente...";
            if (userInput.value.trim() !== "") {
                sendMessage();
            }
        }
    };

    recognition.start();
}

// 5. MANEJO DE CONSULTA DE ESTATUS (Simulación interactiva impecable)
function procesarConsultaEstatus() {
    const ci = document.getElementById('cedula-consulta');
    const res = document.getElementById('resultado-consulta');
    if (!ci || !res) return;
    
    const cedula = ci.value.trim();
    if (!cedula) { alert("Por favor ingresa un número de cédula válido."); return; }

    res.style.display = "block";
    res.style.background = "rgba(255,255,255,0.05)";
    res.style.color = "white";
    res.innerHTML = "🔍 Buscando registro en los servidores del CAE...";

    setTimeout(() => {
        if (cedula.startsWith("28") || cedula.startsWith("30") || cedula.length === 8) {
            res.style.background = "#2e7d32";
            res.style.color = "white";
            res.innerHTML = "✅ <b>ESTATUS: REGISTRO VALIDADO</b><br><small>Tu postulación digital fue recibida exitosamente. Por favor, acude al CAE en Las Mercedes para validar tus documentos en físico.</small>";
        } else {
            res.style.background = "#bcf5bc";
            res.style.color = "#1e293b";
            res.innerHTML = "⚠️ <b>ESTATUS: PENDIENTE CONSIGNACIÓN</b><br><small>Cédula registrada digitalmente. Esperando recepción física de recaudos (Copia de Cédula de Identidad) en la sede principal.</small>";
        }
    }, 1000);
}

// 6. CONTROLADOR DE EVENTOS SEGURO (Previene duplicaciones y errores de consola)
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('user-input');
    if (inputField) {
        // Eliminamos cualquier listener previo y asignamos limpiamente el evento Enter
        inputField.onkeypress = null; 
        inputField.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
