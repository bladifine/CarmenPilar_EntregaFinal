// CONTROLADOR DE INTERFAZ Y RESPUESTAS DEL CHATBOT - BOTEDUCARMEN 2026

let primerAbierto = true;

function toggleChat() {
    const w = document.getElementById('chat-window');
    if (!w) return;
    
    if (w.style.display === 'none' || w.style.display === '') {
        w.style.display = 'flex';
        // Inyectar el saludo inicial con delay natural únicamente la primera vez que se abre
        if (primerAbierto) {
            const box = document.getElementById('chat-messages');
            box.innerHTML = `<div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico);">¡Hola! Soy tu asistente inteligente 2026. ¿En qué curso estás interesado hoy? Puedes usar los botones rápidos o dictarme por voz.</div>`;
            primerAbierto = false;
        }
    } else {
        w.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-messages');
    if (!input || !box) return;
    
    const text = input.value.trim();
    if (!text) return;

    // Mensaje del usuario
    box.innerHTML += `<div style="background:var(--azul-primario); color:white; padding:15px; border-radius:20px; align-self:flex-end; max-width:80%; word-break:break-word;">${text}</div>`;
    box.scrollTop = box.scrollHeight;
    input.value = "";
    
    // Simulación de procesamiento de IA Contextual (Delay de 0.8s)
    setTimeout(() => {
        let respuesta = "Entendido. Como plataforma tecnológica del 2026, te sugiero revisar nuestra oferta formativa en el menú 'Cursos' para inscribirte.";
        
        const normalizado = text.toLowerCase();
        if (normalizado.includes("requisito")) {
            respuesta = "📋 <strong>Requisitos de Ingreso 2026:</strong><br>1. Copia de la Cédula de Identidad.<br>2. Comprobante impreso de postulación digital.<br>3. Validación física en la sede del CAE (Las Mercedes).";
        } else if (normalizado.includes("inscri") || normalizado.includes("cómo me")) {
            respuesta = "🚀 <strong>Proceso de Inscripción Simplificado:</strong><br>Selecciona tu curso en la pestaña 'Cursos', llena el formulario web, y haz clic en 'Consultar Estatus' para agendar la entrega física de tus recaudos.";
        } else if (normalizado.includes("uñas") || normalizado.includes("manicure")) {
            respuesta = "💅 <strong>Curso Estética de Uñas:</strong><br>Aprenderás técnicas avanzadas de acrílico, gel y diseños neomórficos aplicados al emprendimiento inmediato. Cupos disponibles.";
        } else if (normalizado.includes("barber")) {
            respuesta = "💈 <strong>Curso de Barbería Profesional:</strong><br>Formación integral en cortes modernos, visagismo y administración de tu propio negocio artesanal. ¡Inscríbete ya!";
        }

        box.innerHTML += `<div style="background:white; padding:15px; border-radius:20px; align-self:flex-start; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid var(--azul-electrico); max-width:85%; line-height:1.4;">${respuesta}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 800);
}

// INTEGRACIÓN REAL DE RECONOCIMIENTO DE VOZ WEB AUDIO API
function activarDictadoVoz() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceBtn = document.getElementById('voice-btn');
    const userInput = document.getElementById('user-input');

    if (!SpeechRecognition) {
        alert("El dictado por voz no está soportado en este navegador. Te sugerimos usar Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-VE'; // Configurado para acento venezolano
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        voiceBtn.innerHTML = "🛑";
        voiceBtn.style.background = "#ff4d4d";
        userInput.placeholder = "Escuchando tu consulta...";
    };

    recognition.onresult = (event) => {
        const resultadoTexto = event.results[0][0].transcript;
        userInput.value = resultadoTexto;
    };

    recognition.onerror = () => {
        alert("Hubo un error al procesar el audio. Por favor intenta de nuevo.");
    };

    recognition.onend = () => {
        voiceBtn.innerHTML = "🎙️";
        voiceBtn.style.background = "#f1f5f9";
        userInput.placeholder = "Pregunta algo o dicta por voz...";
        if(userInput.value.trim() !== "") {
            sendMessage(); // Envía automáticamente la consulta al terminar de hablar
        }
    };

    recognition.start();
}

// CONTROLADORES DE MODAL DE ESTATUS DE CÉDULA
function abrirModalEstatus() {
    const modal = document.getElementById('estatus-modal');
    if(modal) modal.style.display = 'flex';
}

function cerrarModalEstatus() {
    const modal = document.getElementById('estatus-modal');
    if(modal) {
        modal.style.display = 'none';
        document.getElementById('resultado-consulta').style.display = 'none';
        document.getElementById('cedula-consulta').value = '';
    }
}

function procesarConsultaEstatus() {
    const ci = document.getElementById('cedula-consulta').value.trim();
    const res = document.getElementById('resultado-consulta');
    if(!ci) { alert("Por favor ingresa una cédula válida."); return; }

    res.style.display = "block";
    res.style.background = "#f1f5f9";
    res.style.color = "var(--azul-primario)";
    res.innerHTML = "🔍 Consultando base de datos de postulación...";

    setTimeout(() => {
        // Lógica de simulación de datos para demostración del jurado
        if(ci.startsWith("28") || ci.startsWith("30")) {
            res.style.background = "#dcfce7";
            res.style.color = "#166534";
            res.innerHTML = "✅ ESTATUS: VALIDADO ACCESIBLE.<br><small>Tu documentación física ya fue aprobada en el CAE. Inicio de clases programado.</small>";
        } else {
            res.style.background = "#fef9c3";
            res.style.color = "#854d0e";
            res.innerHTML = "⚠️ ESTATUS: PENDIENTE VALIDACIÓN.<br><small>Tu registro digital está guardado. Por favor acude al CAE en Las Mercedes para consignar tu carpeta de recaudos.</small>";
        }
    }, 1200);
}

function abrirCanalWhatsApp() {
    window.open("https://wa.me/584243360158?text=Hola!%20Deseo%20más%20información%20sobre%20el%20Sistema%20de%20Cursos%20BotEduCarmen%202026", "_blank");
}

// Detectar tecla Enter en el input de texto
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('user-input');
    if(inputField) {
        inputField.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
