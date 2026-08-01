// Detectar el capítulo actual a partir del nombre del archivo
const paginaActual = window.location.pathname.split("/").pop();

// Orden de lectura del libro
const ordenCapitulos = [
    "prologo.html",
    "capitulo1.html",
    "capitulo2.html",
    "capitulo3.html",
    "capitulo4.html",
    "capitulo5.html",
    "capitulo6.html",
    "epilogo.html"
];

const indiceActual = ordenCapitulos.indexOf(paginaActual);
let cargando = false;

// Cargar el siguiente capítulo al llegar al final
async function cargarSiguienteCapitulo() {
    if (cargando || indiceActual === -1 || indiceActual >= ordenCapitulos.length - 1) return;

    cargando = true;
    const siguienteArchivo = ordenCapitulos[indiceActual + 1];

    try {
        const respuesta = await fetch(siguienteArchivo);
        if (!respuesta.ok) return;

        const htmlTexto = await respuesta.text();

        // Extraer solo el contenido del <article class="libro"> para insertarlo abajo
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlTexto, "text/html");
        const nuevoCapitulo = doc.querySelector(".libro");

        if (nuevoCapitulo) {
            // Añadir clase para dar margen superior al capítulo cargado
            nuevoCapitulo.classList.add("capitulo");
            
            // Reemplazar o mover el botón de "Siguiente" al final del nuevo capítulo
            const contenedorLibro = document.querySelector(".pagina");
            contenedorLibro.appendChild(nuevoCapitulo);
        }
    } catch (error) {
        console.error("Error al cargar el siguiente capítulo:", error);
    }
}

// Escuchar el evento de Scroll
window.addEventListener("scroll", () => {
    const distancia = document.body.scrollHeight - window.innerHeight - window.scrollY;
    // Carga cuando faltan 400px para llegar al final de la página
    if (distancia < 400) {
        cargarSiguienteCapitulo();
    }
});