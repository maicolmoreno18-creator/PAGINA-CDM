# Construsoluciones del Meta — Sitio web

Landing page de **Construsoluciones del Meta**, empresa de construcción de viviendas
prefabricadas en sistema plaqueta y bloquelon en Villavicencio, Meta (Colombia).

Sitio estático (HTML + CSS + JavaScript), sin backend ni proceso de build. Se puede
abrir directamente en el navegador o servir desde cualquier hosting estático.

## Características

- Diseño responsive (Bootstrap 5) con secciones de inicio, nosotros, modelos, galería,
  proceso, obras, costos, servicios y contacto.
- Sliders de imágenes (tejas, tamborada, ornamentación, ventanas y obras terminadas)
  con transición de barrido, lightbox navegable y autoplay que se pausa fuera de vista.
- Chatbot "Miel": asistente de preguntas frecuentes basado en palabras clave, sin
  dependencias externas.
- Formulario de contacto que arma un mensaje y redirige a WhatsApp.
- Botón flotante de WhatsApp.
- SEO: meta tags, Open Graph, Twitter Card, datos estructurados JSON-LD, `sitemap.xml`
  y `robots.txt`.

## Estructura del proyecto

```
PAGINA-CDM/
├── index.html              # Página principal (todo el contenido)
├── robots.txt              # Reglas para crawlers
├── sitemap.xml             # Mapa del sitio
├── README.md
└── assets/
    ├── catalogo.pdf        # Catálogo descargable
    ├── contrato.pdf        # Formato de contrato descargable
    ├── css/
    │   ├── main.css        # Variables, base y utilidades
    │   ├── components.css  # Navbar, botones, tarjetas, sliders, chatbot, flotantes
    │   ├── sections.css    # Estilos por sección (hero, about, animaciones)
    │   └── responsive.css  # Media queries (1200 / 992 / 768 / 576 px)
    ├── images/             # Fotos y recursos gráficos
    └── js/
        ├── main.js         # Sliders, navbar, formulario, contadores, lightbox
        └── chatbot.js      # Chatbot Miel (base de conocimiento + UI)
```

## Cómo verlo en local

Al ser un sitio estático, basta con abrir `index.html` en el navegador. Para que las
rutas y el lightbox funcionen igual que en producción, es mejor servirlo por HTTP, por
ejemplo con cualquier servidor estático de tu preferencia (extensión Live Server de
VS Code, etc.).

## Convenciones

- **Nombres de imágenes:** usar guiones, sin espacios ni mayúsculas
  (`modelo-1.jpeg`, `orna-5.png`). Los sliders esperan numeración correlativa
  (`modelo-1` … `modelo-39`, `orna-1` … `orna-27`, etc.).
- **Agregar imágenes a un slider:** añadir el archivo a `assets/images/` y registrar
  su ruta en el arreglo correspondiente dentro de `assets/js/main.js`. Actualizar
  también el contador inicial (`1 / N`) en `index.html`.
- **Orden de los CSS:** `main` → `components` → `sections` → `responsive`
  (el orden importa; está así en `index.html`).
- **Animaciones de entrada:** se usan atributos `data-aos`. Si la librería AOS no
  carga, el contenido permanece visible (ver regla `html.aos-ready` en `main.css`).

## Contacto del negocio

- WhatsApp / llamadas: +57 314 359 2700 · +57 314 254 1832 · +57 350 283 7223
- Correo: Construsolucionesdelmeta@gmail.com
- Dirección: Carrera 1 #18-18, 300 m del terminal de transporte hacia la avenida
  Catama, Villavicencio, Meta.

## Créditos

Desarrollado por George Michael Moreno Beltrán.
