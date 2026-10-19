/**
 * Chatbot Miel — Asistente Virtual de Construsoluciones del Meta
 * Responde preguntas frecuentes y guía al usuario hacia la cotización.
 */

'use strict';

(function () {
    // ============================================================
    // KNOWLEDGE BASE
    // ============================================================
    const knowledge = {
        greeting: '¡Hola! 🍯 Soy <strong>Miel</strong>, tu asistente virtual de Construsoluciones del Meta. ¿En qué puedo ayudarte hoy?',

        responses: [
            {
                keywords: ['precio', 'costo', 'cuánto', 'cuanto', 'valor', 'tarifa', 'presupuesto', 'cotiz'],
                answer: 'El precio depende de 4 factores: <strong>ubicación del lote</strong>, <strong>metros a construir</strong>, <strong>sistema constructivo</strong> (plaqueta o bloquelon) y <strong>estilo del techo</strong>. Para una cotización exacta, escríbenos por WhatsApp 📲',
                followUp: ['¿Qué incluye?', '¿Formas de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['durar', 'duran', 'dura', 'duración', 'vida útil', 'años', 'cuánto dura', 'tiempo de vida', 'permanente'],
                answer: 'Una vivienda prefabricada en plaqueta o bloquelon tiene una <strong>vida útil de más de 50 años</strong>, igual que una construcción convencional. Al igual que cualquier casa, requiere <strong>mantenimiento periódico</strong> para conservarse en buen estado. Son viviendas permanentes, no temporales. 🏠💪',
                followUp: ['¿Resisten sismos?', '¿Se puede pintar?', '¿Qué es plaqueta?']
            },
            {
                keywords: ['sísmic', 'sismo', 'terremoto', 'temblor', 'resisten', 'resiste', 'antisísmic', 'norma sismo'],
                answer: '🛡️ <strong>Sí, 100%.</strong> Nuestras viviendas cumplen con la <strong>Norma Colombiana de Sismo Resistencia (NSR-10)</strong>. El sistema de plaqueta y bloquelon con estructura metálica es seguro ante movimientos telúricos.',
                followUp: ['¿Cuánto duran?', '¿Qué es plaqueta?', 'Quiero cotizar']
            },
            {
                keywords: ['horario', 'atienden', 'abierto', 'hora', 'abre', 'cierra', 'disponib'],
                answer: '🕐 Nuestro horario de atención es:<br><strong>Lunes a viernes:</strong> 7:30 AM – 12:00 PM y 2:00 PM – 5:00 PM<br><strong>Sábados:</strong> 7:30 AM – 2:00 PM<br><strong>Domingos y festivos:</strong> Cerrado<br><br>Si necesitas atención fuera de horario laboral, escríbenos por WhatsApp y agendamos una cita en la oficina. 📲',
                followUp: ['¿Dónde están?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['malla', 'plaqueta malla', 'refuerzo', 'hierro', 'varilla', 'acero', 'armadura', 'cemento entre'],
                answer: '🧱 <strong>No lleva malla.</strong> La plaqueta se fabrica con <strong>concreto, piedra y varilla</strong> (la varilla es el refuerzo). Tampoco lleva cemento entre plaqueta y plaqueta al momento de instalar: se ensamblan directamente con la perfilería (K, H, U según corresponda). El sistema es seco.',
                followUp: ['¿Qué es la perfilería?', '¿Qué es bloquelon?', '¿Resisten sismos?']
            },
            {
                keywords: ['perfilería', 'perfileria', 'perfil k', 'perfil h', 'perfil u', 'canal', 'cometida', 'punto de luz', 'puntos eléctric'],
                answer: '🔧 Manejamos varias perfilerías, cada una con su función:<br><br>• <strong>Perfilería K:</strong> Lleva canal para la cometida de la luz<br>• <strong>Perfilería H:</strong> Une las plaquetas/bloques entre sí<br>• <strong>Perfilería U:</strong> Para remates y bordes<br><br>Todas son parte del sistema estructural. Dejamos los puntos listos para el paso del cableado eléctrico.',
                followUp: ['¿Incluye electricidad?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['baño', 'sanitari', 'inodoro', 'lavamanos', 'ducha', 'baños incluidos'],
                answer: '🚿 <strong>No incluimos instalación de baños</strong> en la entrega. No incluimos tuberías, inodoro, lavamanos ni ducha. La vivienda se entrega en obra negra con las paredes listas para que instales los baños a tu gusto.',
                followUp: ['¿Qué sí incluye?', '¿Incluye electricidad?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['eléctric', 'luz instalada', 'tomacorriente', 'cableado', 'electricidad', 'instala la luz', 'sistema eléctric'],
                answer: '⚡ <strong>No incluimos la instalación eléctrica.</strong> Pero nuestro sistema de perfilería (K, H, U) lleva <strong>canales para la cometida de la luz</strong> y dejamos los puntos listos. Tu electricista solo tiene que pasar el cable por los canales preparados.',
                followUp: ['¿Qué es la perfilería?', '¿Qué sí incluye?', '¿Formas de pago?']
            },
            {
                keywords: ['incluye', 'incluido', 'viene', 'entrega', 'materiales', 'qué trae'],
                answer: 'Entregamos <strong>100% en obra negra</strong> con:<br>✅ Paredes armadas<br>✅ Puertas y ventanas externas en hierro calibre 19<br>✅ Puertas internas en madera tamborada<br>✅ Techo en Eternit Colombit (libre de asbesto) o teja arquitectónica cal. 28<br>✅ Estructura metálica<br>✅ Perfilería (K, H, U) con canales para cometida eléctrica<br>✅ Transporte y mano de obra',
                followUp: ['¿Qué NO incluye?', '¿Medidas de puertas?', '¿Incluye electricidad?']
            },
            {
                keywords: ['no incluye', 'obra blanca', 'acabados', 'qué falta'],
                answer: '<strong>No incluye ningún tipo de acabado:</strong><br>❌ Pintura, estuco, enchapes<br>❌ Instalación eléctrica (pero dejamos puntos listos en la perfilería)<br>❌ Instalaciones sanitarias (baños, cocina)<br>❌ Pisos<br><br>Se entrega <strong>100% en obra negra</strong>. 🏠',
                followUp: ['¿Qué sí incluye?', '¿Formas de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['pago', 'financ', 'cuotas', 'abono', 'formas de pago', 'plan de pagos', 'cómo se paga'],
                answer: 'Trabajamos con <strong>contrato de compraventa por obra</strong>. El plan de pagos es:<br>💰 <strong>50%</strong> al firmar contrato<br>💰 <strong>40%</strong> al descargar material en el lote<br>💰 <strong>10%</strong> al instalar el techo<br><br>No manejamos crédito ni financiación propia.',
                followUp: ['¿Qué incluye?', '¿Cuánto cuesta el m²?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['plaqueta', 'sistema plaqueta'],
                answer: 'El <strong>sistema plaqueta</strong> usa placas de 3 cm hechas con <strong>concreto, piedra y varilla</strong>. <strong>No lleva malla ni cemento entre plaquetas.</strong> Altura mínima de pared: <strong>2.66m</strong>. Se ensambla con perfilería (K, H, U). 🧱',
                followUp: ['¿La plaqueta lleva malla?', '¿Medidas de puertas?', '¿Qué es bloquelon?']
            },
            {
                keywords: ['bloquelon', 'bloque'],
                answer: 'El <strong>sistema bloquelon</strong> usa bloques de 8 cm de espesor, más largos que el convencional. Altura mínima de pared: <strong>2.76m</strong>. Ligero, resistente y con acabado más liso. 🏗️',
                followUp: ['¿Medidas en bloquelon?', '¿Qué es plaqueta?', '¿Cuánto cuesta?']
            },
            {
                keywords: ['medida puerta', 'medidas de puertas', 'medidas puertas', 'tamaño puerta', 'puerta externa', 'puerta interna', 'puerta baño', 'ornamentación medida', 'ornamentacion medida'],
                answer: '📐 <strong>Medidas de puertas:</strong><br><br><strong>Sistema Plaqueta:</strong><br>• Externas e internas: <strong>0.97m × 1.94m</strong> ó <strong>0.97m × 2.18m</strong><br>• Puertas de baño: <strong>0.73m × 1.94m</strong> ó <strong>0.73m × 2.18m</strong><br><br><strong>Sistema Bloquelon:</strong><br>• Externas: <strong>1.00m × 2.08m</strong><br>• Internas: mismas medidas que plaqueta',
                followUp: ['¿Medidas de ventanas?', '¿Qué es plaqueta?', '¿Qué es bloquelon?']
            },
            {
                keywords: ['medida ventana', 'medidas de ventanas', 'medidas ventanas', 'tamaño ventana', 'cuánto mide la ventana'],
                answer: '📐 <strong>Medidas de ventanas (Largo × Ancho):</strong><br><br><strong>Sistema Plaqueta:</strong><br>• <strong>1.94m × 1.21m</strong> ó <strong>1.94m × 1.45m</strong><br><br><strong>Sistema Bloquelon:</strong><br>• <strong>1.61m × 1.60m</strong><br><br>Estas son medidas estándar. Para medidas especiales, consúltanos.',
                followUp: ['¿Medidas de puertas?', '¿Tipo de ventanas?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['2 pisos', 'dos pisos', 'segundo piso', 'doble piso'],
                answer: '🏢 <strong>Sí construimos de 2 pisos.</strong> Tanto en plaqueta como en bloquelon. Para el segundo piso usamos <strong>plancha de placa fácil</strong> como entrepiso. El costo varía según el área. Consulta tu cotización.',
                followUp: ['¿Cuánto cuesta?', '¿Resisten sismos?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['techo', 'teja', 'tejado', 'eternit', 'zinc', 'tipo de techo'],
                answer: '🏠 El techo incluido es en <strong>Eternit Colombit libre de asbesto</strong> o <strong>teja arquitectónica calibre 28</strong>. Otro tipo de teja tiene costo adicional. La estructura metálica siempre va incluida.',
                followUp: ['¿Qué incluye?', '¿Cuánto cuesta?', 'Ver modelos']
            },
            {
                keywords: ['garantía', 'garantia', 'reclamo', 'respaldo', 'qué cubre', 'que cubre', 'cubre la garantia'],
                answer: '✅ <strong>Garantía limitada de 12 meses</strong> desde la fecha de entrega (real o presunta) de la vivienda.<br><br><strong>Cubre</strong> (si lo instalamos nosotros):<br>• Ornamentación metálica<br>• Puertas entamboradas<br>• Cubierta (teja y estructura de soporte)<br>• Distribución de muros según el diseño contratado<br><br><strong>No cubre:</strong><br>❌ Daños por mal uso, golpes, humedad no controlada o falta de mantenimiento<br>❌ Alteraciones, modificaciones o ampliaciones hechas por el cliente o terceros<br>❌ Variaciones de color, tono o textura propias de los materiales<br>❌ Fallas en instalaciones eléctricas, hidráulicas o sanitarias no hechas por nosotros',
                followUp: ['¿Cómo hago un reclamo?', '¿Cuánto duran?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['tiempo', 'demora', 'días', 'plazo', 'cuánto tarda', 'rapidez', 'demora construir', 'cuánto se demora'],
                answer: 'El tiempo de ensamble depende de los <strong>metros a construir</strong> y el <strong>clima</strong> (si llueve fuerte no se puede trabajar). Las entregas se agendan por <strong>orden de firma de contrato</strong>. Para un estimado exacto de tu proyecto, consúltanos por WhatsApp. ⏱️',
                followUp: ['¿Requisitos del lote?', '¿Formas de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['requisit', 'lote', 'terreno', 'necesit', 'condiciones'],
                answer: 'Tu lote necesita:<br>⚡ <strong>Suministro de luz</strong> (sin luz se alquila planta)<br>💧 <strong>Agua</strong> disponible<br>🧱 <strong>Placa de cimentación lista</strong> (nivelada y despejada)<br>🚗 <strong>Acceso adecuado</strong> para vehículo con materiales<br><br>La placa lleva tubería hidráulica y sanitaria integrada.',
                followUp: ['¿Quién hace la placa?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['ubicación', 'donde', 'dónde', 'dirección', 'oficina', 'sede', 'sedes'],
                answer: '📍 Sede principal: <strong>Carrera 1 #18-18</strong>, 300 metros del terminal de transporte hacia la avenida Catama, <strong>Villavicencio, Meta</strong>. Tenemos presencia en otros puntos del país. Según el lugar de instalación, te conectamos con la sede más cercana.',
                followUp: ['¿Horario de atención?', 'Ver en el mapa', 'Contactar por WhatsApp']
            },
            {
                keywords: ['whatsapp', 'contactar', 'llamar', 'teléfono', 'celular', 'número', 'comunicar'],
                answer: '📲 Escríbenos a:<br><strong>+57 314 359 2700</strong> (WhatsApp y llamada)<br><strong>+57 350 283 7223</strong> (Solo WhatsApp)<br><strong>+57 314 254 1832</strong> (Solo WhatsApp)<br><br>¿Quieres que te redirija?',
                followUp: ['Ir a WhatsApp', '¿Dónde están?', '¿Horario de atención?']
            },
            {
                keywords: ['modelo', 'tipo', 'construyen', 'hacen', 'cabaña', 'kiosco', 'bodega', 'campamento', 'qué construyen'],
                answer: 'Construimos:<br>🏠 <strong>Viviendas y apartamentos</strong> (1 y 2 pisos)<br>🏡 <strong>Cabañas y casas campestres</strong><br>🎪 <strong>Kioscos y campamentos</strong><br>🏭 <strong>Bodegas industriales</strong><br><br>Todas las medidas se adaptan a tu necesidad.',
                followUp: ['¿Cuánto cuesta?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['trabaj', 'empleo', 'vacante', 'comisión', 'asesor'],
                answer: '💼 Puedes trabajar con nosotros como <strong>asesor comercial</strong> y ganar comisión por cada contrato firmado por tu recomendación. Escríbenos por WhatsApp.',
                followUp: ['Contactar por WhatsApp', '¿Dónde están?']
            },
            {
                keywords: ['pintura no incluida', 'piso', 'pisos', 'pisos incluidos'],
                answer: '🎨 Pintura, estuco, enchapes y pisos <strong>no están incluidos</strong>. Se entrega 100% en obra negra para que elijas los acabados a tu gusto.',
                followUp: ['¿Se puede pintar?', '¿Incluye baños?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['cobertura', 'instalan fuera', 'departamento', 'otro municipio', 'nacional', 'envío', 'llegan'],
                answer: '🚚 Tenemos <strong>sedes en distintos puntos del país</strong> y cobertura nacional. El costo del transporte varía según la distancia.',
                followUp: ['¿Dónde están?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['hierro', 'calibre', 'material puerta', 'material ventana'],
                answer: '🔩 Las puertas y ventanas externas son en <strong>hierro calibre 19</strong>. Las puertas internas son en <strong>madera tamborada</strong>. Todo incluido en la entrega.',
                followUp: ['¿Medidas de puertas?', '¿Medidas de ventanas?', '¿Qué incluye?']
            },
            {
                keywords: ['placa fácil', 'placa facil', 'entrepiso', 'plancha'],
                answer: '🏗️ Para viviendas de <strong>2 pisos</strong> usamos <strong>plancha de placa fácil</strong> como entrepiso. Es un sistema liviano y resistente apoyado en estructura metálica.',
                followUp: ['¿Hacen 2 pisos?', '¿Resisten sismos?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['ampliar', 'ampliación', 'amplian', 'agregar cuarto', 'expandir', 'agrandar', 'crecer la casa', 'se puede ampliar'],
                answer: '🏗️ <strong>Sí, se puede ampliar.</strong> Puedes agregar cuartos o secciones a tu vivienda después de la entrega. Solo necesitas tener listo el espacio y la placa de cimentación para la ampliación. Consúltanos para cotizar.',
                followUp: ['¿Cuánto cuesta?', '¿Medidas mínimas?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['lluvia', 'llueve', 'filtra', 'filtran', 'filtración', 'gotera', 'humedad', 'agua se mete', 'tapar'],
                answer: '🌧️ Para evitar filtraciones es necesario <strong>tapar entre plaqueta y plaqueta</strong> (o bloquelon y bloquelon) después de la instalación. Ese sellado lo realiza el cliente como parte de los acabados. Con ese paso hecho, no hay problema de humedad ni goteras.',
                followUp: ['¿Qué incluye?', '¿Qué NO incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['subsidio', 'caja de compensación', 'mi casa ya', 'gobierno', 'financiar con subsidio'],
                answer: '🏦 <strong>No manejamos esa parte.</strong> No trabajamos con subsidios de vivienda ni cajas de compensación. Nuestro sistema de pago es directo: 50%, 40% y 10% por etapas mediante contrato de compraventa por obra.',
                followUp: ['¿Formas de pago?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['habitacion', 'cuartos', 'distribución', 'cuántos cuartos', 'cuántas habitaciones', 'espacios'],
                answer: '📐 La cantidad de habitaciones depende del tamaño total. Siempre tratamos de <strong>perder la menor cantidad de espacio posible</strong> en la distribución. Hacemos diseños personalizados según tus necesidades. Cuéntanos cuántos m² tienes y te asesoramos.',
                followUp: ['¿Medidas mínimas?', '¿Diseños personalizados?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['finca', 'rural', 'campo', 'vereda', 'zona rural', 'lejos'],
                answer: '🌄 <strong>Sí, sirve para zona rural.</strong> Instalamos en fincas, veredas y zonas alejadas. Solo se necesita que el lote tenga acceso para el vehículo con materiales, suministro de luz (o planta eléctrica) y la placa de cimentación lista.',
                followUp: ['¿Requisitos del lote?', '¿Cobertura nacional?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['diferencia', 'convencional', 'ladrillo', 'comparar', 'mejor que', 'ventaja', 'vs'],
                answer: '🏠 <strong>Diferencias con construcción convencional:</strong><br><br>✅ <strong>Más rápido:</strong> Se ensambla en días, no en meses<br>✅ <strong>Más económico:</strong> Menor costo por m²<br>✅ <strong>Misma durabilidad:</strong> +50 años con mantenimiento<br>✅ <strong>Sismo-resistente:</strong> Cumple NSR-10<br>✅ <strong>Menos desperdicio:</strong> Se fabrica a medida<br><br>La calidad y resistencia son equivalentes. La principal ventaja es el tiempo y costo.',
                followUp: ['¿Cuánto duran?', '¿Cuánto cuesta el m²?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['ruido', 'sonido', 'escucha', 'acústic', 'aislamiento', 'privacidad'],
                answer: '🔇 En <strong>plaqueta</strong> se puede escuchar un poco entre cuartos. En <strong>bloquelon</strong> el aislamiento acústico es mejor y se escucha menos. Si la privacidad sonora es prioridad para ti, el bloquelon es mejor opción.',
                followUp: ['¿Qué es plaqueta?', '¿Qué es bloquelon?', '¿Cuánto cuesta?']
            },
            {
                keywords: ['personaliz', 'diseño', 'planos', 'estilo', 'a medida', 'custom', 'aguas', 'cubo'],
                answer: '🎨 Hacemos diseños <strong>100% personalizados</strong>. Desde los planos hasta los modelos de puertas y estilos de techo: <strong>1 agua, 2 aguas, 4 aguas, tipo cubo, tropical, con lucarna</strong>, etc. Tú eliges y nosotros lo construimos a tu medida.',
                followUp: ['¿Qué construyen?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['remodelación', 'remodelacion', 'remodelar', 'remodelaciones', 'arreglar', 'reparar', 'reforma'],
                answer: '🔨 Nos enfocamos en <strong>construcción de casas nuevas</strong>. Remodelaciones depende de lo que sea — consúltanos por WhatsApp tu caso específico y te decimos si podemos ayudarte.',
                followUp: ['¿Qué construyen?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['inclinado', 'pendiente', 'desnivel', 'terreno inclinado', 'loma', 'montaña'],
                answer: '⛰️ <strong>Sí se puede construir en terreno inclinado.</strong> El terreno puede estar en pendiente, pero la <strong>placa de cimentación debe quedar plana/nivelada</strong>. Eso se resuelve con un buen trabajo de cimentación antes del ensamble.',
                followUp: ['¿Requisitos del lote?', '¿Sirve para zona rural?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['rompe', 'rompen', 'romper', 'golpe', 'frágil', 'débil', 'resistente golpe', 'sólid', 'fuerte', 'pared resistente'],
                answer: '💪 Las paredes <strong>no se rompen fácilmente</strong>. Son de concreto, piedra y varilla (plaqueta) o bloque de 8 cm (bloquelon). Eso sí, no se deben golpear muy fuerte intencionalmente. Son resistentes para uso normal de una vivienda.',
                followUp: ['¿Cuánto duran?', '¿Resisten sismos?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['mínimo', 'minimo', 'minimas', 'mínimas', 'medidas mínimas', 'metros mínimo', 'más pequeña', 'menor', 'desde cuánto'],
                answer: '📏 Lo mínimo que construimos es desde <strong>12 m²</strong>. A partir de ahí, construimos en cualquier tamaño según tu necesidad y presupuesto.',
                followUp: ['¿Cuánto cuesta?', '¿Diseños personalizados?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['cerramiento', 'cerramientos', 'muro', 'cerca', 'muro perimetral', 'encerramiento'],
                answer: '🚫 <strong>No hacemos cerramientos ni muros perimetrales.</strong> Nos especializamos en viviendas, cabañas, kioscos, bodegas y campamentos.',
                followUp: ['¿Qué construyen?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['placa de cimentación', 'placa cimentacion', 'cimentación', 'cimiento', 'base', 'quién hace la placa'],
                answer: '🧱 <strong>La placa de cimentación:</strong><br><br>• En Villavicencio y alrededores: la hace un <strong>maestro de confianza</strong> nuestro<br>• Si es por cuenta del cliente: le facilitamos un <strong>plano de ejes y cimientos</strong> para que su maestro la construya<br><br>La placa es de 30 o 40 cm: 22 cm de relleno de río compactado + varilla con flejes + malla electrosoldada + 8 cm de concreto encima. Ahí va la <strong>tubería hidráulica y sanitaria</strong>.',
                followUp: ['¿Requisitos del lote?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['pintar', 'pintura', 'pañet', 'pañetar', 'estuco', 'graniplast'],
                answer: '🎨 <strong>Sí se puede pintar.</strong> Se recomienda primero tapar entre plaqueta y plaqueta (con cemento o silicona). En plaqueta recomendamos <strong>pañetar</strong> toda la pared antes de pintar. En bloquelon es opcional porque se presta para dejarse a la vista.<br><br>También se puede aplicar: estuco, graniplast, pañete, etc.',
                followUp: ['¿Se puede poner enchape?', '¿Qué NO incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['enchape', 'cerámica', 'ceramica', 'baldosa', 'azulejo'],
                answer: '✅ <strong>Sí se puede poner enchape, cerámica, estuco, graniplast, pañete</strong> y cualquier acabado sobre las paredes. Se aplica igual que en una construcción convencional.',
                followUp: ['¿Se puede pintar?', '¿Qué NO incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['colgar', 'cuelga', 'tv', 'televisor', 'cuadro', 'estante', 'estantes', 'repisa', 'clavo', 'puntilla', 'chazo'],
                answer: '🔩 <strong>Sí se pueden colgar cosas en la pared</strong>, pero siempre con <strong>chazo</strong>. No se recomienda puntilla. Para objetos pesados (TV, estantes) se recomienda buscar la <strong>perfilería</strong> dentro de la pared para mayor agarre y seguridad.',
                followUp: ['¿Qué es la perfilería?', '¿Se puede pintar o pañetar?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['ventana apertura', 'ventana corredera', 'tipo ventana', 'tipo de ventana', 'voladizo', 'filtración ventana'],
                answer: '🪟 Las ventanas pueden ser de <strong>apertura</strong> o de <strong>corredera</strong>. Con ventanas de corredera, si no se deja pasillo puede haber riesgo de filtración de agua. Por eso nosotros dejamos mínimo <strong>50 cm de voladizo</strong> en el techo para proteger.',
                followUp: ['¿Medidas de ventanas?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['fotos', 'foto', 'ver casas', 'ejemplo', 'muestra', 'galería', 'evidencia'],
                answer: '📸 <strong>¡Sí!</strong> Tenemos fotos de obras terminadas en nuestra página. Puedes verlas en la sección de galería y obras.',
                followUp: ['Ver modelos', '¿Qué construyen?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['visitar', 'ver en persona', 'casa muestra', 'modelo muestra', 'ir a ver'],
                answer: '🏠 De momento no tenemos una casa muestra para visitar, pero puedes ver todas nuestras obras terminadas en la galería de la página. Antes de construir nos reunimos contigo para <strong>definir todos los detalles</strong> hasta que quedes 100% conforme con el diseño.',
                followUp: ['Ver modelos', '¿Diseños personalizados?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['no me gusta', 'resultado', 'satisfecho', 'inconform', 'arrepient'],
                answer: '🤝 Antes de construir nos reunimos con el cliente para <strong>definir absolutamente todos los detalles</strong>: planos, medidas, estilo, ornamentación, etc. Hemos tenido reuniones de hasta 5 horas para asegurar que todo quede claro. Una vez aprobado el diseño, se procede con la construcción.',
                followUp: ['¿Diseños personalizados?', '¿Garantía?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['contrato', 'legal', 'autenticar', 'firman', 'notaría', 'notaria', 'jurídic'],
                answer: '📄 Trabajamos bajo <strong>contrato de compraventa por obra</strong>. Si el cliente desea, el contrato <strong>se puede autenticar</strong> en notaría. Todo queda respaldado legalmente.',
                followUp: ['¿Formas de pago?', '¿Garantía?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['termita', 'plaga', 'plagas', 'polilla', 'insecto', 'madera inmunizada'],
                answer: '🪵 Las puertas internas en madera tamborada vienen <strong>inmunizadas</strong> contra plagas. No hay riesgo de termitas o polillas en las puertas que entregamos.',
                followUp: ['¿Qué incluye?', '¿Cuánto duran?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['division', 'divisiones', 'dividir', 'partir', 'separar cuarto', 'agregar pared'],
                answer: '🔨 <strong>Sí se pueden hacer divisiones después.</strong> Sin embargo, <strong>no se recomienda cortar ni retirar plaquetas o bloques ya instalados</strong>. Lo ideal es agregar paredes nuevas sin afectar las existentes.',
                followUp: ['¿Se puede ampliar?', '¿Diseños personalizados?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['metro cuadrado', 'm2', 'precio m2', 'valor m2', 'costo metro', 'cuánto cuesta el m', 'precio por metro'],
                answer: '💰 <strong>Precio por m² en Villavicencio:</strong><br><br>• <strong>Plaqueta:</strong> $350.000 / m²<br>• <strong>Bloquelon:</strong> $460.000 / m²<br><br>A eso se suma según el estilo: portones, ornamentación exclusiva, tipo de techo, etc. Este precio es referencia para Villavicencio, en otros lugares varía por transporte.',
                followUp: ['¿Casa más económica?', '¿Formas de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['más económica', 'mas economica', 'más barata', 'barata', 'menor precio', 'desde cuánto cuesta'],
                answer: '🏠 La vivienda más económica es un <strong>apartaestudio de 16 m²</strong> que cuesta <strong>$5.440.000</strong> (sin placa de cimentación, solo la casa). Es la construcción completa más pequeña que manejamos con todos los servicios. A partir de ahí todo escala según m² y diseño.',
                followUp: ['¿Cuánto cuesta el m²?', '¿Formas de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['instalan en', 'bogotá', 'bogota', 'medellín', 'medellin', 'cali', 'barranquilla', 'otra ciudad', 'instalan en otra'],
                answer: '🚚 Si podemos instalar en tu zona, <strong>lo hacemos directamente</strong>. Si no, te remitimos a la <strong>sede más cercana</strong>. Contáctanos con la ubicación de tu lote y te confirmamos cobertura.',
                followUp: ['¿Dónde están?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['ir a ver', 'visitar obra', 'ver armando', 'ver construcción', 'ver la construccion', 'estar presente', 'puedo ir'],
                answer: '👷 <strong>Sí, puedes ir a ver cómo se arma tu casa.</strong> No hay problema en que estés presente durante el ensamble.',
                followUp: ['¿Cuánto se demora?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['llueve', 'lluvia durante', 'clima', 'mal tiempo'],
                answer: '🌧️ Si llueve muy fuerte durante la construcción, <strong>no se puede trabajar</strong> hasta que escampe. El clima puede afectar los tiempos de entrega. Por eso el plazo depende también de las condiciones climáticas.',
                followUp: ['¿Cuánto se demora?', '¿Requisitos del lote?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['método de pago', 'metodo de pago', 'metodos de pago', 'métodos de pago', 'medios de pago', 'cheque', 'transferencia', 'daviplata', 'bancolombia', 'efectivo', 'pagar en', 'cómo pago', 'como pago'],
                answer: '💳 Puedes pagar por:<br>• <strong>Cheque</strong><br>• <strong>Transferencia</strong> (Bancolombia o Daviplata)<br>• <strong>Efectivo</strong><br><br>Los pagos se hacen por etapas (50% / 40% / 10%) según el contrato de compraventa por obra.',
                followUp: ['¿Formas de pago?', '¿Cuánto cuesta el m²?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['cotización gratis', 'cotizacion gratis', 'cotizar tiene costo', 'cobran por cotizar', 'cuesta cotizar', 'cotización tiene costo', 'vale cotizar'],
                answer: '🙌 <strong>La cotización es totalmente gratis</strong> y sin compromiso. Escríbenos con los datos de tu proyecto (medidas, ubicación, lo que quieres construir) y te pasamos el valor.',
                followUp: ['¿Cuánto cuesta el m²?', '¿Qué incluye?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['atraso', 'atrasar', 'no pago a tiempo', 'me retraso', 'retraso en el pago', 'no alcanzo a pagar', 'qué pasa si no pago', 'que pasa si no pago'],
                answer: '⚠️ Si se atrasa un pago, <strong>la obra se suspende</strong> hasta que se ponga al día, salvo que lleguemos a un acuerdo o compromiso previo. Por eso recomendamos hablar con nosotros antes de que eso ocurra. 🤝',
                followUp: ['¿Formas de pago?', '¿Métodos de pago?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['costo placa', 'precio placa', 'placa incluida', 'placa esta incluida', 'placa está incluida', 'incluye la placa', 'placa aparte', 'cuánto cuesta la placa', 'cuanto cuesta la placa'],
                answer: '🧱 La <strong>placa de cimentación se cobra aparte</strong>, no está incluida en el valor de la vivienda. Su costo depende del área a cimentar y de las condiciones del terreno. Te la cotizamos junto con la vivienda.',
                followUp: ['¿Quién hace la placa de cimentación?', '¿Requisitos del lote?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['acta de entrega', 'acta entrega', 'recibo de entrega', 'entregan acta', 'constancia de entrega', 'papel de entrega'],
                answer: '📝 <strong>Sí, entregamos acta de entrega.</strong> Al finalizar la instalación firmamos el acta de entrega y recepción de la obra, donde queda constancia de todo. Así ambas partes tienen respaldo.',
                followUp: ['¿Qué pasa si encuentro un defecto?', '¿Garantía?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['defecto', 'daño al recibir', 'algo mal', 'reclamo', 'cómo reclamo', 'como reclamo', 'encuentro un problema', 'revisar la casa', 'observaciones', 'algo malo'],
                answer: '🔍 Tienes <strong>3 días hábiles</strong> después de la entrega para revisar la casa. Si encuentras algo, nos notificas con <strong>evidencias (fotos)</strong>. Nosotros evaluamos la situación y tenemos <strong>15 días hábiles</strong> para dar solución. Todo queda respaldado en el contrato. ✅',
                followUp: ['¿Garantía?', '¿Acta de entrega?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['calor', 'caliente', 'calienta', 'temperatura', 'fresca', 'fresco', 'calurosa', 'hace calor adentro', 'clima interior'],
                answer: '🌡️ La temperatura interior es <strong>como la de cualquier casa</strong>: depende del sol y del clima de la zona. No se calienta más que una construcción convencional. Con buena ventilación y el voladizo del techo se mantiene cómoda. ☀️',
                followUp: ['¿Qué es plaqueta?', '¿Qué es bloquelon?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['negocio', 'local', 'comercial', 'tienda', 'oficina', 'usar como local', 'para negocio', 'local comercial'],
                answer: '🏪 <strong>¡Claro que sí!</strong> Puedes usar la construcción como <strong>negocio o local comercial</strong>, no solo como vivienda. También hacemos kioscos, cabañas y bodegas para uso comercial.',
                followUp: ['¿Qué construyen?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['trasladar', 'mudar', 'mover la casa', 'desarmar', 'reubicar', 'llevar a otro lado', 'se puede mover', 'se puede trasladar'],
                answer: '🚚 <strong>Sí, se puede trasladar.</strong> Al ser un sistema prefabricado, la vivienda se puede desarmar y reubicar en otro lugar. Consúltanos para evaluar tu caso y cotizar el traslado.',
                followUp: ['¿Requisitos del lote?', '¿Cuánto cuesta?', 'Contactar por WhatsApp']
            },
            {
                keywords: ['permiso', 'licencia', 'licencia de construcción', 'permiso de construcción', 'curaduría', 'curaduria', 'legalizar', 'planeación'],
                answer: '📋 <strong>En algunos casos sí se necesita permiso</strong>, depende de dónde vayas a construir. Por ejemplo, algunos condominios campestres son estrictos con los requisitos. Lo mejor es que verifiques con la administración o alcaldía de tu zona. Si tienes dudas, consúltanos. 🏡',
                followUp: ['¿Sirve para zona rural?', '¿Requisitos del lote?', 'Contactar por WhatsApp']
            }
        ],

        fallback: 'No tengo información específica sobre eso 🤔, pero con gusto un asesor puede ayudarte por WhatsApp. ¿Te gustaría que te redirija? 📲',
        fallbackOptions: ['Contactar por WhatsApp', '¿Qué construyen?', '¿Cuánto cuesta?']
    };

    // ============================================================
    // ACTION HANDLERS
    // ============================================================
    const actions = {
        'Contactar por WhatsApp': () => window.open('https://wa.me/573143592700?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20las%20casas%20prefabricadas', '_blank'),
        'Ir a WhatsApp': () => window.open('https://wa.me/573143592700?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20las%20casas%20prefabricadas', '_blank'),
        'Quiero cotizar': () => { document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' }); },
        'Ver modelos': () => { document.getElementById('modelos').scrollIntoView({ behavior: 'smooth' }); },
        'Ver en el mapa': () => window.open('https://google.com/maps?q=4.1365238,-73.6033852&z=17&hl=es', '_blank'),
    };

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    let toggle, window_, messages, options, closeBtn;

    // ============================================================
    // FUNCTIONS
    // ============================================================
    function addMessage(text, type = 'bot') {
        const msg = document.createElement('div');
        msg.className = `chatbot-msg chatbot-msg--${type}`;
        msg.innerHTML = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function showOptions(opts) {
        options.innerHTML = '';
        if (!opts || opts.length === 0) return;
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOption(opt));
            options.appendChild(btn);
        });
        // Always add "back to menu" option
        const menuBtn = document.createElement('button');
        menuBtn.className = 'chatbot-option-btn';
        menuBtn.style.background = '#f1f5f9';
        menuBtn.style.borderColor = '#94a3b8';
        menuBtn.style.color = '#475569';
        menuBtn.textContent = '← Menú principal';
        menuBtn.addEventListener('click', () => showMainMenu());
        options.appendChild(menuBtn);
    }

    function showMainMenu() {
        addMessage('¿En qué más puedo ayudarte? 🍯');
        showInitialOptions();
    }

    function showInitialOptions() {
        options.innerHTML = '';
        const categories = [
            { label: '🏠 Sobre la vivienda', opts: ['¿Cuánto duran?', '¿Resisten sismos?', '¿Se puede ampliar?', '¿Se filtra con lluvia?', '¿Se rompen las paredes?', '¿Diferencia con ladrillo?', '¿Se puede pintar o pañetar?', '¿Se puede colgar TV o estantes?', '¿Hace calor adentro?', '¿Se puede usar como negocio?', '¿Se puede trasladar?'] },
            { label: '📦 ¿Qué incluye?', opts: ['¿Qué incluye?', '¿Qué NO incluye?', '¿Incluye baños?', '¿Incluye electricidad?', '¿Tipo de ventana apertura o corredera?', '¿Tipo de techo?', '¿Qué es la perfilería?'] },
            { label: '📐 Medidas y diseños', opts: ['¿Medidas de puertas?', '¿Medidas de ventanas?', '¿Diseños personalizados?', '¿Mínimo de m²?', '¿Hacen 2 pisos?', '¿Se puede poner enchape o cerámica?'] },
            { label: '💰 Costos y pagos', opts: ['¿Cuánto cuesta el m²?', '¿Casa más económica?', '¿Formas de pago?', '¿Métodos de pago?', '¿La cotización tiene costo?', '¿Qué pasa si me atraso en un pago?', '¿La placa está incluida?', '¿Garantía?'] },
            { label: '🧱 Sistemas constructivos', opts: ['¿Qué es plaqueta?', '¿Qué es bloquelon?', '¿La plaqueta lleva malla?', '¿Ruido entre cuartos?', '¿Quién hace la placa de cimentación?'] },
            { label: '📍 Contacto y proceso', opts: ['¿Horario de atención?', '¿Dónde están?', '¿Cuánto se demora?', '¿Puedo ir a ver la construcción?', '¿Firman contrato legal?', '¿Acta de entrega?', '¿Qué pasa si encuentro un defecto?', 'Contactar por WhatsApp'] },
            { label: '❓ Otras preguntas', opts: ['¿Sirve para zona rural?', '¿Terreno inclinado?', '¿Instalan en otra ciudad?', '¿Tienen fotos?', '¿Hacen cerramientos?', '¿Hacen remodelaciones?', '¿Las puertas tienen plagas?', '¿Necesito permiso de construcción?'] }
        ];

        categories.forEach(cat => {
            const catBtn = document.createElement('button');
            catBtn.className = 'chatbot-option-btn chatbot-category-btn';
            catBtn.textContent = cat.label;
            catBtn.addEventListener('click', () => {
                addMessage(cat.label, 'user');
                showOptions(cat.opts);
            });
            options.appendChild(catBtn);
        });
    }

    function handleOption(text) {
        if (actions[text]) {
            addMessage(text, 'user');
            actions[text]();
            if (text.includes('WhatsApp') || text === 'Ir a WhatsApp') {
                setTimeout(() => addMessage('Te he redirigido a WhatsApp. ¿Necesitas algo más? 😊'), 500);
                setTimeout(() => showInitialOptions(), 600);
            }
            return;
        }
        addMessage(text, 'user');
        processQuery(text);
    }

    function processQuery(text) {
        const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let bestMatch = null;
        let bestScore = 0;
        for (const item of knowledge.responses) {
            let score = 0;
            for (const keyword of item.keywords) {
                const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (normalizedText.includes(normalizedKeyword)) {
                    score += keyword.length;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        }
        setTimeout(() => {
            if (bestMatch && bestScore > 0) {
                addMessage(bestMatch.answer);
                showOptions(bestMatch.followUp);
            } else {
                addMessage(knowledge.fallback);
                showOptions(knowledge.fallbackOptions);
            }
        }, 600);
    }

    function toggleChat() {
        const isOpen = window_.style.display !== 'none';
        const tooltip = document.getElementById('chatbot-tooltip');
        if (tooltip) tooltip.style.display = 'none';

        if (isOpen) {
            window_.style.display = 'none';
            toggle.querySelector('.chatbot-icon-open').style.display = '';
            toggle.querySelector('.chatbot-icon-close').style.display = 'none';
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            window_.style.display = 'flex';
            toggle.querySelector('.chatbot-icon-open').style.display = 'none';
            toggle.querySelector('.chatbot-icon-close').style.display = '';
            toggle.setAttribute('aria-expanded', 'true');
        }
    }

    // ============================================================
    // INITIALIZATION
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        toggle = document.getElementById('chatbot-toggle');
        window_ = document.getElementById('chatbot-window');
        messages = document.getElementById('chatbot-messages');
        options = document.getElementById('chatbot-options');
        closeBtn = document.getElementById('chatbot-close');

        if (!toggle || !window_) return;

        toggle.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        setTimeout(() => {
            addMessage(knowledge.greeting);
            showInitialOptions();
        }, 300);
    });

})();
