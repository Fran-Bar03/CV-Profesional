# CV-Profesional — Francisco Javier Barraza López

Currículum web de una sola hoja tamaño Carta (8.5 × 11 in), con diseño profesional, botón para descargarlo en PDF y espacio para fotografía.

**Perfil:** Desarrollador de Software — TSU en Desarrollo de Software Multiplataforma y estudiante de Ingeniería en Desarrollo y Gestión de Software en la Universidad Tecnológica del Sur de Sonora.

---

## Diseño y contenido

Estilo ejecutivo en dos columnas:

| Zona | Contenido |
| --- | --- |
| **Columna lateral** (gris carbón) | Fotografía, contacto e idioma, habilidades técnicas, tecnologías, habilidades blandas y certificaciones |
| **Columna principal** (blanca) | Nombre y puesto, objetivo profesional, experiencia laboral (Sistema PAAAS, Gobierno del Estado de Sonora), proyectos académicos en dos columnas con enlace a GitHub y educación |

Paleta: gris carbón `#1E2A32` y verde esmeralda `#0F7B6C`. Tipografías DM Serif Display (nombre) e Inter (texto).

### Íconos

Se usan íconos de [Font Awesome 6](https://fontawesome.com/icons) (cargados desde CDN):

| Dónde | Íconos |
| --- | --- |
| Contacto | teléfono, correo, GitHub, ubicación, idioma |
| Títulos de sección | objetivo, maletín, diagrama, birrete, engranes, laptop, personas, medalla |
| Tecnologías | código, globo, base de datos, herramientas |
| Proyectos | cerebro (ML), planta (invernadero), pesa (gimnasio), celular (PWA), escudo (seguridad), red (Packet Tracer), tubo de ensayo (pruebas) |
| Enlaces a repositorios | GitHub y Angular (clickeables también en el PDF) |
| Experiencia y educación | institución y calendario |

Para cambiar un ícono, busca su nombre en fontawesome.com y reemplaza la clase, por ejemplo `fa-brain` por `fa-robot`.

## Estructura del proyecto

```
CV-Profesional/
├── Index.html   Estructura y contenido del CV
├── Style.css    Diseño en pantalla, versión móvil y reglas de impresión (PDF)
├── Script.js    Descarga directa del PDF y foto con respaldo de iniciales
├── README.md    Este archivo
├── img/
│   └── foto.jpg Tu fotografía (debes agregarla)
└── certificados/
    ├── CCNA-Introduction-to-Networks.jpg     Imagen que se abre al hacer clic
    ├── CCNA-Introduction-to-Networks.pdf     Original
    ├── Tester-Capacitate-para-el-Empleo.jpg  Imagen que se abre al hacer clic
    └── Tester-Capacitate-para-el-Empleo.pdf  Original
```

## Cómo agregar la foto

El marco de la foto es **vertical (proporción 4:5)**, pensado para una foto tomada con celular.

1. Toma la foto en vertical, con fondo liso, buena luz y el rostro centrado (de hombros hacia arriba).
2. Crea la carpeta `img` junto a `Index.html`.
3. Guarda la foto como `img/foto.jpg`. No hace falta recortarla: el diseño la ajusta sola al marco.
4. Si tu archivo tiene otro nombre o formato (`.png`, `.jpeg`), cámbialo en el atributo `src` de `<img id="profilePhoto">` en `Index.html`.
5. Si tu cara queda muy arriba o muy abajo, ajusta en `Style.css` la variable `--photo-pos`:
   - `50% 25%` (valor actual): para fotos donde la cara está en la parte superior.
   - `50% 10%`: muestra más la parte de arriba.
   - `50% 50%`: centra la foto.

Mientras no exista la foto, el CV muestra las iniciales **FB**.

> Una foto de celular puede pesar varios MB. Para que la página cargue rápido, redúcela a unos 800 × 1000 px antes de subirla.

## Certificados enlazados

En **Certificaciones**, el ícono y el nombre de cada certificación abren la **imagen del certificado** al hacer clic, tanto en la página como en el PDF descargado. Los certificados no se agregan como páginas: el PDF del CV sigue siendo de una sola hoja.

| Certificación | Imagen |
| --- | --- |
| CCNA: Introduction to Networks — Cisco Networking Academy | `certificados/CCNA-Introduction-to-Networks.jpg` |
| Tester — Capacítate para el Empleo | `certificados/Tester-Capacitate-para-el-Empleo.jpg` |

- **En la página web**, la imagen se abre desde la carpeta `certificados`, en una pestaña nueva.
- **En el PDF descargado**, el enlace apunta a la imagen directa en GitHub (sin la interfaz de GitHub):
  `https://raw.githubusercontent.com/Fran-Bar03/CV-Profesional/main/certificados/...jpg`
  Se ve igual en computadora y en celular.

Los PDF originales también están en `certificados/` como respaldo.

**Requisito:** el repositorio **CV-Profesional** debe ser **público** y la carpeta `certificados` debe estar subida en la rama `main`.

### Agregar otro certificado

1. Convierte el PDF del certificado a imagen JPG (horizontal, unos 1650 × 1275 px). Puedes usar un convertidor como *PDF a JPG* de iLovePDF o exportarlo desde Adobe Acrobat.
2. Guarda la imagen en `certificados/` con un nombre sin espacios ni acentos.
3. En `Index.html`, dentro de `<ul class="certs">`, copia un `<li>` y cambia el nombre del archivo (aparece 4 veces: dos `href` y dos `data-cert-url`), el título y el emisor.
4. Sube la imagen a GitHub y descarga de nuevo el CV.

## Cómo descargar el PDF

Pulsa **Descargar PDF** (esquina superior derecha). El archivo `CV_Francisco_Javier_Barraza_Lopez.pdf` se descarga directo, sin ventana de impresión:

- Una sola hoja tamaño Carta, igual al diseño de la pantalla.
- Sin fecha, sin nombre del documento y sin ruta del archivo.
- Enlaces a GitHub y correo clickeables.
- Siempre con el diseño de escritorio, aunque lo descargues desde el celular.

Se genera con [html2canvas](https://html2canvas.hertzen.com/) y [jsPDF](https://github.com/parallax/jsPDF), cargadas desde CDN, así que se necesita conexión a internet. La hoja se captura en su tamaño exacto (816 × 1056 px) y se coloca en una página Carta (612 × 792 pt), por lo que queda cuadrada sin importar el tamaño de tu pantalla.

### Importante si ya agregaste tu foto

Por seguridad, el navegador no permite que la librería lea imágenes cuando el CV se abre con doble clic (`file:///C:/...`). Para que la foto salga en el PDF, abre el CV desde un servidor:

- **GitHub Pages** (ver más abajo), o
- **Visual Studio Code → extensión Live Server** → clic derecho en `index.html` → *Open with Live Server*.

Si la descarga directa falla por cualquier motivo, el botón abre la ventana de impresión como respaldo. En ese caso:

1. En **Destino** elige **Guardar como PDF** (no *Microsoft Print to PDF*, que agrega márgenes, fecha y ruta).
2. En **Más opciones** desmarca **Encabezados y pies de página** y deja **Márgenes: Ninguno**.

## Cómo editar el contenido

Todo el texto está en `Index.html`, dividido en secciones con comentarios. Los colores se cambian en la parte superior de `Style.css`:

| Variable | Uso | Valor |
| --- | --- | --- |
| `--charcoal` | Columna lateral | `#1E2A32` |
| `--emerald` | Acentos y subtítulos | `#0F7B6C` |
| `--emerald-lt` | Acentos sobre fondo oscuro | `#3CC4A8` |
| `--ink` | Texto principal | `#1A2228` |

Si agregas contenido, revisa la vista previa de impresión: el CV está ajustado para caber en una sola hoja.

## Publicar en GitHub Pages

1. En el repositorio ve a **Settings → Pages**.
2. En **Source** elige la rama `main` y la carpeta `/ (root)`.
3. GitHub Pages busca `index.html` en minúsculas y distingue mayúsculas: renombra `Index.html` a `index.html` y verifica que `Style.css` y `Script.js` coincidan exactamente con los nombres en el HTML.

## Proyectos enlazados en el CV

- [Predicción de diabetes con Machine Learning](https://github.com/Fran-Bar03/Predicicion-Diabetes-ML)
- [Invernadero Inteligente — API](https://github.com/Fran-Bar03/InvernaderoInteligenteAPI)
- [Invernadero Inteligente — Angular](https://github.com/Fran-Bar03/InvernaderoInteligenteAngular)
- [Elite Fitness Center](https://github.com/Fran-Bar03/EliteFitnessCenter)
- [Aplicación web progresiva (App Shell)](https://github.com/Fran-Bar03/ApplicacionesWebProgresivas-Appshell)
- [Seguridad en aplicaciones](https://github.com/Fran-Bar03/ProyectoSeguridad)

## Tecnologías del sitio

HTML5, CSS3 (Grid, Flexbox, reglas `@media print` y `@page`), JavaScript, html2canvas y jsPDF para la descarga del PDF. Fuentes DM Serif Display e Inter (Google Fonts) e íconos de Font Awesome 6.