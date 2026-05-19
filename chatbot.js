/**
 * chatbot.js - Motor de IA con Algoritmo de Similitud y Módulo de Orientación de Inscripción
 * Diseñado exclusivamente para la defensa del PNF en Informática 2026
 * Sede: CAE "Carmen Pilar Fernández" - Las Mercedes, La Victoria, Aragua
 */

const baseConocimiento = [
    {
        id: "saludos",
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "alo", "saludos", "epale", "holaa", "buenas"],
        respuesta: "¡Hola! Soy el asistente virtual del CAE 'Carmen Pilar Fernández'. Estoy listo para ayudarte con información sobre nuestra historia, los pasos de inscripción, la oferta de cursos gratuitos, horarios o ubicación. ¿Qué deseas consultar?"
    },
    {
        id: "pasos_inscripcion",
        keywords: ["pasos", "como inscribirme", "procesos", "etapas", "fases", "guiame", "orientame", "que hago primero", "donde entro", "incricion", "insgricion", "inscribir", "paso a paso"],
        respuesta: "¡Te guío con gusto en tu proceso de inscripción paso a paso desde donde estés! Sigue estas 3 etapas en nuestra plataforma web: <br><br><b>1. Selección:</b> Dirígete al menú superior y haz clic en <b>'Cursos'</b>. Elige los talleres de tu preferencia haciendo clic en 'Seleccionar'.<br><b>2. Revisión:</b> Entra al icono del <b>'Carrito / Mi Selección'</b> arriba a la derecha para confirmar tus materias elegidas.<br><b>3. Registro Final:</b> Presiona 'Inscribirse', rellena el formulario con tus datos personales (Nombre y Cédula) y el sistema sincronizará tu cupo directamente con la base de datos en la nube. ¡Así de fácil, rápido y 100% gratuito!"
    },
    {
        id: "historia",
        keywords: ["historia", "fundacion", "creacion", "fundo", "creo", "carmen pilar", "fernandez", "inicios", "resena", "biografia", "quien era", "pasado", "antiguedad"],
        respuesta: "El Centro de Artes y Oficios 'Carmen Pilar Fernández' fue fundado para capacitar a la comunidad de La Victoria en artes operativas y manuales. Su epónimo rinde homenaje a una destacada educadora aragüeña comprometida con el desarrollo sociocultural de Las Mercedes. En este 2026, el centro se moderniza integrando este sistema web automatizado como parte del PNF en Informática."
    },
    {
        id: "directiva_profesores",
        keywords: ["profesores", "profesor", "profe", "instructores", "instructor", "director", "directora", "personal", "quien dicta", "coordinador", "coordinadora", "maestros"],
        respuesta: "La institución está dirigida por personal técnico calificado y coordinadores del área educativa del estado Aragua. Cada taller es dictado por maestros técnicos productivos con amplia experiencia laboral, encargados de guiarte con paciencia desde el nivel básico hasta el avanzado."
    },
    {
        id: "requisitos",
        keywords: ["requisitos", "necesito", "documentos", "papeles", "inscribirme", "inscripcion", "cedula", "edad", "recaudos", "rekesitos", "rrekesitos"],
        respuesta: "Los requisitos indispensables son muy simples: 1) Copia clara de la Cédula de Identidad. 2) Ser mayor de 15 años de edad. ¡No necesitas experiencia previa para ingresar!"
    },
    {
        id: "gratuidad",
        keywords: ["costo", "precio", "pagar", "mensualidad", "cuanto vale", "gratis", "gratuito", "arancel", "colaboracion", "cobran", "real", "plata", "dinero", "grates"],
        respuesta: "¡Es 100% gratuito! Todas las clases, talleres e inscripciones en el CAE 'Carmen Pilar Fernández' son públicos y libres de costo para impulsar el emprendimiento productivo en la región."
    },
    {
        id: "ubicacion",
        keywords: ["donde", "ubicacion", "sede", "direccion", "queda", "sitio", "las mercedes", "mapa", "llegar", "la victoria", "aragua", "localizacion"],
        respuesta: "Nuestra sede física se encuentra en La Victoria, Estado Aragua, específicamente en el Sector Las Mercedes. Es un punto central y de fácil acceso para toda la comunidad del municipio José Félix Ribas. Si te encuentras en otra zona de La Victoria, cualquier transporte público hacia Las Mercedes te dejará muy cerca."
    },
    {
        id: "horarios",
        keywords: ["horario", "horarios", "turno", "turnos", "hora", "dias", "tarde", "manana", "sabatino", "cuando se estudia"],
        respuesta: "Operamos en el período de flexibilización formativa con tres bloques horarios: Turno Mañana (8:00 AM a 11:30 AM), Turno Tarde (1:30 PM a 4:30 PM) y el Turno Sabatino Intensivo. Los días específicos varían según el curso seleccionado al momento del registro."
    },
    {
        id: "gastronomia",
        keywords: ["gastronomia", "cocina", "bilingue", "comida", "chef", "panaderia", "reposteria", "dulces", "salado", "cocinar", "gstrnomia"],
        respuesta: "En Gastronomía dictamos el taller de 'Cocina Bilingüe'. No es un curso de cocina común; aprenderás técnicas culinarias de alta cocina internacional a la par del manejo de vocabulario técnico en inglés para el sector gastronómico."
    },
    {
        id: "estetica",
        keywords: ["barberia", "barbero", "unas", "uñas", "manicure", "pedicure", "estetica", "peluqueria", "cabello", "cejas", "maquillaje", "pelo", "barbria", "unias"],
        respuesta: "En el área de Estética contamos con dos cursos activos de alta demanda laboral: 'Barbería Profesional' (cortes modernos, diseño de barba y visajismo) y 'Estética de Uñas' (manicure, pedicure, sistemas acrílicos y decoración avanzada)."
    },
    {
        id: "textil",
        keywords: ["modisteria", "confeccion", "corte", "costura", "lenceria", "ropa", "textil", "coser", "tela", "patronaje", "maquina"],
        respuesta: "El área Textil abarca los cursos de 'Modistería' y 'Corte y Confección'. Te capacitamos en el uso correcto de máquinas de coser caseras e industriales, diseño de patrones, y la confección integral de prendas de vestir y lencería."
    },
    {
        id: "electricidad",
        keywords: ["electricidad", "electricida", "electrica", "circuitos", "cables", "mantenimiento", "electricista", "corriente", "reparar", "luz", "cable", "electrisidda"],
        respuesta: "El curso técnico de 'Fundamentos de Electricidad' capacita a los estudiantes en diagnósticos de fallas, empalmes seguros, diseño de tableros y cableado de instalaciones eléctricas residenciales bajo estrictas normas de seguridad."
    },
    {
        id: "cursos_no_existentes",
        keywords: ["computacion", "informatica", "mecanica", "ingles", "reparacion de telefonos", "electronica", "contabilidad", "administrador", "soldadura", "farmacia"],
        respuesta: "Actualmente esos talleres específicos no se dictan en nuestra sede de Las Mercedes. Los únicos campos activos y avalados son: Cocina Bilingüe, Barbería Profesional, Estética de Uñas, Modistería / Confección y Electricidad Residencial."
    },
    {
        id: "cursos_general",
        keywords: ["curso", "cursos", "oferta", "talleres", "tienes", "estudiar", "aprender", "cuantos", "lista", "catalogo", "materia", "especialidad", "curzo", "curzos"],
        respuesta: "Nuestra oferta académica certificada incluye las siguientes áreas: 1) Gastronomía (Cocina Bilingüe). 2) Estética (Barbería y Uñas). 3) Textil (Modistería, Corte y Confección). 4) Técnica (Fundamentos de Electricidad). ¿Te gustaría conocer el contenido de alguna de estas en específico?"
    }
];

// --- FUNCIÓN MATEMÁTICA: OBTENER BIGRAMAS ---
function obtenerBigramas(str) {
    let bigramas = new Set();
    for (let i = 0; i < str.length - 1; i++) {
        bigramas.add(str.substring(i, i + 2));
    }
    return bigramas;
}

// --- CALCULAR SIMILITUD COEFICIENTE DE JACCARD ---
function calcularSimilitud(str1, str2) {
    if (str1 === str2) return 1.0;
    if (str1.length < 2 || str2.length < 2) return 0.0;

    let bigramas1 = obtenerBigramas(str1);
    let bigramas2 = obtenerBigramas(str2);
    
    let interseccion = new Set([...bigramas1].filter(x => bigramas2.has(x)));
    let union = new Set([...bigramas1, ...bigramas2]);
    
    return interseccion.size / union.size;
}

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
    let textoUsuario = originalText.toLowerCase().trim();
    
    // Normalizar texto: eliminar acentos/tildes y caracteres raros
    textoUsuario = textoUsuario.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    textoUsuario = textoUsuario.replace(/[¿?¡!,.:;\-_()]/g, "");

    // Reemplazos de abreviaciones extremas en internet
    textoUsuario = textoUsuario.replace(/\bk\b/g, "que")
                               .replace(/\bq\b/g, "que")
                               .replace(/\binfo\b/g, "informacion")
                               .replace(/\bx\b/g, "por")
                               .replace(/\bd\b/g, "de");

    if (textoUsuario === "") return;

    // Dibujar el input del usuario en pantalla
    container.innerHTML += `
        <div style="text-align:right; margin-bottom:12px;">
            <span style="background:#0a192f; color:white; padding:10px 15px; border-radius:20px 20px 0 20px; display:inline-block; font-size:0.95rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                ${originalText}
            </span>
        </div>`;

    let mejorCategoria = null;
    let puntajeMaximo = 0;

    // Separar la frase en palabras sueltas
    const palabrasUsuario = textoUsuario.split(/\s+/);

    baseConocimiento.forEach(categoria => {
        let puntosCategoria = 0;

        categoria.keywords.forEach(keyword => {
            // 1. Coincidencia exacta
            if (textoUsuario.includes(keyword)) {
                puntosCategoria += 5;
            }

            // 2. Coincidencia por bigramas tolerante a fallos de ortografía
            palabrasUsuario.forEach(pUser => {
                let similitud = calcularSimilitud(pUser, keyword);
                if (similitud >= 0.55) {
                    puntosCategoria += (similitud * 4);
                }
            });
        });

        if (puntosCategoria > puntajeMaximo) {
            puntajeMaximo = puntosCategoria;
            mejorCategoria = categoria;
        }
    });

    let respuestaFinal = "";

    // Verificar el umbral de confianza mínimo
    if (puntajeMaximo >= 1.5 && mejorCategoria !== null) {
        respuestaFinal = mejorCategoria.respuesta;
    } else {
        respuestaFinal = "Disculpa, como asistente virtual del CAE 'Carmen Pilar Fernández' solo puedo responder preguntas vinculadas a la institución, los pasos de inscripción, los talleres formativos, requisitos o nuestra ubicación en Las Mercedes. ¿Podrías reformular tu consulta?";
    }

    input.value = "";
    input.focus();

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
