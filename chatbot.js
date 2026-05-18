/**
 * chatbot.js - Motor de IA con Tolerancia a Fallos Ortográficos e Incoherencias
 * Diseñado para la Defensa del PNF en Informática 2026
 * Sede: CAE "Carmen Pilar Fernández"
 */

// Base de conocimiento robusta con sinónimos, raíces cortadas y errores comunes
const baseConocimiento = [
    {
        id: "saludos",
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "alo", "saludos", "epale", "holaa", "holaaa"],
        respuesta: "¡Hola! Soy el asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy listo para ayudarte con información sobre nuestra historia, la oferta de cursos gratuitos, requisitos de inscripción, horarios o directiva. ¿Qué deseas consultar?"
    },
    {
        id: "historia",
        keywords: ["historia", "fundacion", "fundación", "fundo", "creo", "creó", "carmen pilar", "fernandez", "fernández", "inicios", "resena", "reseña", "biografia", "quien era", "pasado"],
        respuesta: "El Centro de Artes y Oficios 'Carmen Pilar Fernández' fue fundado para capacitar a la comunidad de La Victoria en artes operativas y manuales. Su epónimo rinde homenaje a una destacada educadora aragüeña comprometida con el desarrollo sociocultural de Las Mercedes. En este 2026, el centro se moderniza integrando este sistema web automatizado como parte del PNF en Informática."
    },
    {
        id: "directiva_profesores",
        keywords: ["profesores", "profesor", "profe", "profes", "instructores", "instructor", "director", "directora", "personal", "quien dicta", "quien da", "coordinador", "coordinadora", "maestros", "maestro"],
        respuesta: "La institución está dirigida por personal técnico calificado y coordinadores del área educativa del estado Aragua. Cada taller es dictado por maestros técnicos productivos con amplia experiencia laboral, encargados de guiarte con paciencia desde el nivel más básico hasta el avanzado."
    },
    {
        id: "requisitos",
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "inscripción", "inscribir", "cedula", "cédula", "edad", "requisito", "recaudos"],
        respuesta: "Los requisitos indispensables son muy simples: 1) Copia clara de la Cédula de Identidad. 2) Ser mayor de 15 años de edad. ¡No necesitas experiencia previa para ingresar!"
    },
    {
        id: "gratuidad",
        keywords: ["costo", "precio", "pagar", "mensualidad", "cuanto vale", "cuánto vale", "gratis", "gratuito", "arancel", "colaboracion", "cobran", "real", "plata", "dinero"],
        respuesta: "¡Es 100% gratuito! Todas las clases, talleres e inscripciones en el CAE 'Carmen Pilar Fernández' son públicos y libres de costo para impulsar el emprendimiento productivo en la región."
    },
    {
        id: "ubicacion",
        keywords: ["donde", "donde", "ubicacion", "ubicación", "sede", "direccion", "dirección", "queda", "sitio", "las mercedes", "mapa", "llegar", "la victoria", "aragua", "localizacion", "localización"],
        respuesta: "Nuestra sede física se encuentra en La Victoria, Estado Aragua, específicamente en el Sector Las Mercedes. Es un punto central y de fácil acceso para toda la comunidad del municipio José Félix Ribas."
    },
    {
        id: "horarios",
        keywords: ["horario", "horarios", "turno", "turnos", "hora", "dias", "días", "tarde", "manana", "mañana", "sabatino", "cuando se estudia", "cuando estudio"],
        respuesta: "Operamos en el período de flexibilización formativa con tres bloques horarios: Turno Mañana (8:00 AM a 11:30 AM), Turno Tarde (1:30 PM a 4:30 PM) y el Turno Sabatino Intensivo. Los días específicos varían según el curso seleccionado al momento del registro."
    },
    {
        id: "gastronomia",
        keywords: ["gastronomia", "gastronomía", "cocina", "bilingue", "bilingüe", "comida", "chef", "panaderia", "panadería", "reposteria", "repostería", "dulces", "salado", "cocinar"],
        respuesta: "En Gastronomía dictamos el taller de 'Cocina Bilingüe'. No es un curso de cocina común; aprenderás técnicas culinarias de alta cocina internacional a la par del manejo de vocabulario técnico en inglés para el sector gastronómico."
    },
    {
        id: "estetica",
        keywords: ["barberia", "barbería", "barbero", "unas", "uñas", "manicure", "pedicure", "estetica", "estética", "peluqueria", "peluquería", "cabello", "cejas", "maquillaje", "ceja", "pelo"],
        respuesta: "En el área de Estética contamos con dos cursos activos de alta demanda laboral: 'Barbería Profesional' (cortes modernos, diseño de barba y visajismo) y 'Estética de Uñas' (manicure, pedicure, sistemas acrílicos y decoración avanzada)."
    },
    {
        id: "textil",
        keywords: ["modisteria", "modistería", "confeccion", "confección", "corte", "costura", "lenceria", "lencería", "ropa", "textil", "coser", "tela", "patronaje", "maquina", "máquina"],
        respuesta: "El área Textil abarca los cursos de 'Modistería' y 'Corte y Confección'. Te capacitamos en el uso correcto de máquinas de coser caseras e industriales, diseño de patrones, y la confección integral de prendas de vestir y lencería."
    },
    {
        id: "electricidad",
        keywords: ["electricidad", "electricida", "electrica", "eléctrica", "circuitos", "cables", "mantenimiento", "electricista", "corriente", "reparar", "luz", "cable"],
        respuesta: "El curso técnico de 'Fundamentos de Electricidad' capacita a los estudiantes en diagnósticos de fallas, empalmes seguros, diseño de tableros y cableado de instalaciones eléctricas residenciales bajo estrictas normas de seguridad."
    },
    {
        id: "cursos_no_existentes",
        keywords: ["computacion", "computación", "informatica", "informática", "mecanica", "mecánica", "ingles", "inglés", "reparacion de telefonos", "electronica", "electrónica", "contabilidad", "administrador", "soldadura", "farmacia"],
        respuesta: "Actualmente esos talleres específicos no se dictan en nuestra sede de Las Mercedes. Los únicos campos activos y avalados son: Cocina Bilingüe, Barbería Profesional, Estética de Uñas, Modistería / Confección y Electricidad Residencial."
    },
    {
        id: "cursos_general",
        keywords: ["curso", "cursos", "oferta", "talleres", "tienes", "estudiar", "aprender", "cuantos", "cuántos", "lista", "catalogo", "catálogo", "materia", "especialidad", "estudios"],
        respuesta: "Nuestra oferta académica certificada incluye las siguientes áreas: 1) Gastronomía (Cocina Bilingüe). 2) Estética (Barbería y Uñas). 3) Textil (Modistería, Corte y Confección). 4) Técnica (Fundamentos de Electricidad). ¿Te gustaría conocer el contenido de alguna de estas en específico?"
    }
];

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (!chatWin) return;
    chatWin.style.display = (chatWin.style.display === 'none' || chatWin.style.display === '') ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (!input || !container) return;

    let originalText = input.value;
    
    // --- PROCESADOR ANTI-ERRORES ORTOGRÁFICOS ---
    let textoUsuario = originalText.toLowerCase().trim();
    
    // 1. Quitar acentos/tildes de raíz
    textoUsuario = textoUsuario.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // 2. Remover signos de puntuación molestos para que no rompan las palabras clave
    textoUsuario = textoUsuario.replace(/[¿?¡!,.:;\-_()]/g, "");

    if (textoUsuario === "") return;

    // Renderizar mensaje del usuario en pantalla
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#0a192f; color:white; padding:10px 15px; border-radius:20px 20px 0 20px; display:inline-block; font-size:0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                ${originalText}
            </span>
        </div>`;

    // --- ALGORITMO POR ASIMILACIÓN Y PUNTUACIÓN DE PALABRAS ---
    let mejorCategoria = null;
    let puntajeMaximo = 0;

    // Cortamos la oración del usuario en palabras sueltas para analizar aproximaciones
    const palabrasUsuario = textoUsuario.split(/\s+/);

    baseConocimiento.forEach(categoria => {
        let coincidenciaPuntos = 0;
        
        categoria.keywords.forEach(keyword => {
            // Caso 1: La oración contiene la palabra clave exacta
            if (textoUsuario.includes(keyword)) {
                coincidenciaPuntos += 3;
            }
            
            // Caso 2: Pregunta recortada o palabra asimilativa (ej: "barber" coincide con "barberia")
            palabrasUsuario.forEach(pUser => {
                if (pUser.length >= 3 && keyword.startsWith(pUser)) {
                    coincidenciaPuntos += 1.5; // Otorga puntaje por aproximación morfológica
                }
            });
        });

        if (coincidenciaPuntos > puntajeMaximo) {
            puntajeMaximo = coincidenciaPuntos;
            mejorCategoria = categoria;
        }
    });

    let respuestaFinal = "";

    // --- FILTRO DE INCOHERENCIAS (Umbral mínimo de puntos) ---
    // Si el puntaje es 0, significa que el usuario habló de algo totalmente ajeno a la web
    if (puntajeMaximo >= 2 && mejorCategoria !== null) {
        respuestaFinal = mejorCategoria.respuesta;
    } else {
        // Respuesta protectora anti-incoherencias: No cae en provocaciones ajenas al proyecto
        respuestaFinal = "Disculpa, como asistente virtual del CAE 'Carmen Pilar Fernández' solo puedo responder preguntas vinculadas a la institución, los talleres formativos, requisitos de inscripción o nuestra ubicación en Las Mercedes. ¿Te interesa consultar alguna de estas opciones?";
    }

    // Limpiar input y restablecer foco de escritura
    input.value = "";
    input.focus();

    // Efecto asíncrono controlado de respuesta de la IA
    setTimeout(() => {
        container.innerHTML += `
            <div style="text-align:left; margin-bottom:12px;">
                <div style="background:white; color:#1e293b; padding:12px 18px; border-radius:20px 20px 20px 0; display:inline-block; font-size:0.95rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #00d2ff; line-height: 1.5; max-width: 85%;">
                    ${respuestaFinal}
                </div>
            </div>`;
        
        container.scrollTop = container.scrollHeight;
    }, 380);
}
