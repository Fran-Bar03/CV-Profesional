// =========================================================
// CV — Francisco Javier Barraza López
// =========================================================

const NOMBRE_PDF = 'CV_Francisco_Javier_Barraza_Lopez.pdf';

// Tamaño Carta: 8.5 x 11 in = 816 x 1056 px (96 px/in) = 612 x 792 pt
const HOJA_PX = { ancho: 816, alto: 1056 };
const HOJA_PT = { ancho: 612, alto: 792 };
const PX_A_PT = HOJA_PT.ancho / HOJA_PX.ancho; // 0.75

const btnPdf = document.getElementById('btnPdf');
const estado = document.getElementById('pdfStatus');
const hoja = document.getElementById('cv');

// ---------------------------------------------------------
// 1. Foto de perfil
//    Si img/foto.jpg no existe, se muestran las iniciales.
// ---------------------------------------------------------
const photo = document.getElementById('profilePhoto');

if (photo) {
    const mostrarIniciales = () => photo.parentElement.classList.add('no-img');
    photo.addEventListener('error', mostrarIniciales);
    if (photo.complete && photo.naturalWidth === 0) mostrarIniciales();
}

// ---------------------------------------------------------
// 2. Esperar a que carguen fuentes, íconos y foto
// ---------------------------------------------------------
async function esperarRecursos() {
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }
    if (photo && !photo.complete) {
        await new Promise((resolve) => {
            photo.addEventListener('load', resolve, { once: true });
            photo.addEventListener('error', resolve, { once: true });
        });
    }
}

// ---------------------------------------------------------
// 3. Ajustes sobre la COPIA que se convierte en imagen
//    (no cambian lo que se ve en pantalla)
// ---------------------------------------------------------
function prepararCopia(doc, enlaces) {
    // Página limpia: sin relleno, sin botón
    doc.documentElement.style.background = '#ffffff';
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.background = '#ffffff';
    const barra = doc.querySelector('.toolbar');
    if (barra) barra.style.display = 'none';

    // Hoja fija en la esquina superior izquierda, tamaño Carta exacto
    const copia = doc.getElementById('cv');
    Object.assign(copia.style, {
        position: 'absolute',
        left: '0',
        top: '0',
        margin: '0',
        width: HOJA_PX.ancho + 'px',
        height: HOJA_PX.alto + 'px',
        minHeight: '0',
        boxShadow: 'none',
        overflow: 'hidden'
    });

    // html2canvas no soporta object-fit: la foto pasa a fondo "cover"
    const marco = copia.querySelector('.photo');
    const img = marco ? marco.querySelector('img') : null;
    if (marco && img && photo && photo.naturalWidth > 0) {
        const encuadre = getComputedStyle(document.documentElement)
            .getPropertyValue('--photo-pos').trim() || '50% 25%';
        marco.style.backgroundImage = `url("${img.src}")`;
        marco.style.backgroundSize = 'cover';
        marco.style.backgroundPosition = encuadre;
        marco.style.backgroundRepeat = 'no-repeat';
        img.style.display = 'none';
    }

    // Posición de cada enlace dentro de la hoja (para hacerlos clickeables en el PDF)
    const base = copia.getBoundingClientRect();
    copia.querySelectorAll('a[href]').forEach((a) => {
        const r = a.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
            enlaces.push({
                // Certificados: imagen pública en GitHub (raw), se abre sin la página de GitHub
                url: a.dataset.certUrl || a.href,
                x: r.left - base.left,
                y: r.top - base.top,
                w: r.width,
                h: r.height
            });
        }
    });
}

// ---------------------------------------------------------
// 4. Descarga directa del PDF
//    Una sola hoja: sin fecha, sin nombre del documento y sin ruta.
//    Los enlaces (GitHub, correo, teléfono y certificados) quedan
//    clickeables dentro del PDF.
// ---------------------------------------------------------
async function descargarPdf() {
    const enlaces = [];

    const canvas = await html2canvas(hoja, {
        scale: 3,                     // alta resolución
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,            // siempre con el diseño de escritorio
        windowHeight: 1400,
        width: HOJA_PX.ancho,
        height: HOJA_PX.alto,
        onclone: (doc) => prepararCopia(doc, enlaces)
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });

    const imagen = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imagen, 'JPEG', 0, 0, HOJA_PT.ancho, HOJA_PT.alto);

    enlaces.forEach((e) => {
        pdf.link(e.x * PX_A_PT, e.y * PX_A_PT, e.w * PX_A_PT, e.h * PX_A_PT, { url: e.url });
    });

    pdf.setProperties({ title: 'CV — Francisco Javier Barraza López', author: 'Francisco Javier Barraza López' });
    pdf.save(NOMBRE_PDF);
    return 'PDF descargado: ' + NOMBRE_PDF;
}

// Respaldo: impresión del navegador (si las librerías no cargaron o algo falló)
function imprimir() {
    const tituloOriginal = document.title;
    document.title = NOMBRE_PDF.replace('.pdf', '');
    window.print();
    document.title = tituloOriginal;
}

function mostrarEstado(texto) {
    if (estado) estado.textContent = texto;
}

if (btnPdf) {
    btnPdf.addEventListener('click', async () => {
        const textoBoton = btnPdf.innerHTML;
        btnPdf.disabled = true;
        btnPdf.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Generando PDF…';
        mostrarEstado('Preparando el documento…');

        try {
            await esperarRecursos();
            window.scrollTo(0, 0);

            if (typeof html2canvas === 'undefined' || !window.jspdf) {
                throw new Error('No se cargaron las librerías del PDF (revisa tu conexión).');
            }

            const mensaje = await descargarPdf();
            mostrarEstado(mensaje);
        } catch (error) {
            console.error(error);
            mostrarEstado('No se pudo generar directo. En la ventana elige “Guardar como PDF” y desmarca “Encabezados y pies de página”.');
            imprimir();
        } finally {
            btnPdf.disabled = false;
            btnPdf.innerHTML = textoBoton;
        }
    });
}