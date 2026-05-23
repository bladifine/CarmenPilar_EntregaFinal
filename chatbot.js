// Respuestas base del Asistente CAE
const RESPUESTAS_BOT = {
    saludo: "¡Hola! Soy el asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy listo para ayudarte con información sobre nuestra historia, los pasos de inscripción, la oferta de cursos gratuitos, horarios o ubicación. ¿Qué deseas consultar?",
    
    cursos: "Nuestra oferta académica certificada incluye las siguientes especialidades formativas:\n\n" +
            "• 🧑‍🍳 **Gastronomía:** Cocina Nacional, Panadería, Repostería, Pastelería y Dulces Criollos.\n" +
            "• ✂️ **Textil y Diseño:** Modistería, Lencería, Ropa Íntima, Manualidades, Tejido y Crochet.\n" +
            "• 💅 **Estética:** Barbería, Peluquería, Estética Avanzada, Estética de Uñas, Manicure y Pedicure, Masajes y Masoterapia.\n" +
            "• 🎨 **Arte:** Dibujo Artístico, Pintura Artística, Pintura Avanzada, Rostros, Puntillismo Básico y Avanzado.\n" +
            "• ⚡ **Técnica:** Fundamentos de Electricidad y Reparación de Electrodomésticos.\n\n" +
            "¿Te interesa conocer los requisitos para inscribirte en alguno?",
            
    inscripcion: "Para inscribirte en nuestros cursos gratuitos de este 2026, los pasos son:\n1. Revisa nuestro catálogo en línea y selecciona tus cursos favoritos.\n2. Ve a la sección 'Confirmar Inscripción' e ingresa tu Nombre, Apellido y Cédula.\n3. Presiona finalizar. ¡Tu cupo se guardará en nuestra base de datos de inmediato!",
    
    requisitos: "Los requisitos generales para cualquiera de nuestras especialidades son muy sencillos:\n• Ser mayor de 15 años.\n• Copia de la Cédula de Identidad.\n• ¡Muchas ganas de aprender y emprender!",
    
    ubicación: "Nos encontramos ubicados en la sede del CAE 'Carmen Pilar Fernández'. Puedes visitarnos de lunes a viernes en horario de oficina para conocer los talleres en físico.",
    
    default: "Entendido. Recuerda que como asistente virtual del CAE 'Carmen Pilar Fernández', puedo darte detalles sobre nuestros 25 cursos gratuitos, las inscripciones 2026, los requisitos necesarios o nuestra ubicación. ¿Cómo te gustaría continuar?"
};

function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim().toLowerCase();
    if (!msg) return;

    // Mostrar mensaje del usuario en pantalla
    appendMessage(input.value, 'user');
    input.value = '';

    // Lógica inteligente de respuesta
    setTimeout(() => {
        let respuesta = RESPUESTAS_BOT.default;

        if (msg.includes('hola') || msg.includes('buenas')) {
            respuesta = RESPUESTAS_BOT.saludo;
        } else if (msg.includes('curso') || msg.includes('oferta') || msg.includes('todos') || msg.includes('lista') || msg.includes('enseña')) {
            respuesta = RESPUESTAS_BOT.cursos;
        } else if (msg.includes('inscribir') || msg.includes('inscripcion') || msg.includes('anotarse') || msg.includes('pasos')) {
            respuesta = RESPUESTAS_BOT.inscripcion;
        } else if (msg.includes('requisito') || msg.includes('necesito') || msg.includes('papeles')) {
            respuesta = RESPUESTAS_BOT.requisitos;
        } else if (msg.includes('donde') || msg.includes('ubica') || msg.includes('direccion') || msg.includes('sede')) {
            respuesta = RESPUESTAS_BOT.ubicación;
        }

        appendMessage(respuesta, 'bot');
    }, 400);
}

function appendMessage(text, sender) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.style.textAlign = sender === 'user' ? 'right' : 'left';
    
    const inner = document.createElement('div');
    inner.style.display = 'inline-block';
    inner.style.padding = '12px 18px';
    inner.style.borderRadius = sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0';
    inner.style.fontSize = '0.95rem';
    inner.style.maxWidth = '80%';
    inner.style.whiteSpace = 'pre-line'; // Permite saltos de línea bonitos
    inner.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';

    if (sender === 'user') {
        inner.style.background = '#00d2ff';
        inner.style.color = '#0a192f';
        inner.style.fontWeight = 'bold';
    } else {
        inner.style.background = 'white';
        inner.style.color = '#1e293b';
        inner.style.borderLeft = '5px solid #00d2ff';
    }

    inner.innerText = text;
    div.appendChild(inner);
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function toggleChat() {
    const chat = document.getElementById('chat-window');
    chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
}

// Permitir enviar con la tecla Enter
document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
