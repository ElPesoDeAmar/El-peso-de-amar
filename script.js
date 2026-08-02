// Detectar el archivo actual
const paginaActual = window.location.pathname.split("/").pop() || "prologo.html";

// Lista ordenada de tu libro con nombres exactos de los capítulos
const ordenCapitulos = [
    { archivo: "prologo.html", titulo: "Prólogo" },
    { archivo: "capitulo1.html", titulo: "Capítulo I" },
    { archivo: "capitulo2.html", titulo: "Capítulo II" },
    { archivo: "capitulo3.html", titulo: "Capítulo III" },
    { archivo: "capitulo4.html", titulo: "Capítulo IV" },
    { archivo: "capitulo5.html", titulo: "Capítulo V" },
    { archivo: "capitulo6.html", titulo: "Capítulo VI" },
    { archivo: "epilogo.html", titulo: "Epílogo" }
];

// Buscar la posición actual
const indiceActual = ordenCapitulos.findIndex(cap => cap.archivo === paginaActual);

document.addEventListener("DOMContentLoaded", () => {
    // Si estamos en un capítulo válido
    if (indiceActual !== -1) {
        const libro = document.querySelector(".libro");
        
        // Evitamos crear duplicados en el epílogo ya que lo manejaste manual
        if (libro && paginaActual !== "epilogo.html") {
            const contenedorNavegacion = document.createElement("div");
            contenedorNavegacion.className = "contenedor-siguiente";

            // 1. Botón "Atrás"
            if (indiceActual > 0) {
                const anterior = ordenCapitulos[indiceActual - 1];
                const botonAnterior = document.createElement("a");
                botonAnterior.href = anterior.archivo;
                botonAnterior.className = "boton-capitulo boton-atras";
                botonAnterior.textContent = `← Atrás: ${anterior.titulo}`;
                contenedorNavegacion.appendChild(botonAnterior);
            }

            // 2. Botón "Siguiente"
            if (indiceActual < ordenCapitulos.length - 1) {
                const siguiente = ordenCapitulos[indiceActual + 1];
                const botonSiguiente = document.createElement("a");
                botonSiguiente.href = siguiente.archivo;
                botonSiguiente.className = "boton-capitulo";
                botonSiguiente.textContent = `Siguiente: ${siguiente.titulo} →`;
                contenedorNavegacion.appendChild(botonSiguiente);
            }

            libro.appendChild(contenedorNavegacion);
        }
    }
});

// Abrir/Cerrar Índice en Portada e Interiores
document.addEventListener("DOMContentLoaded", () => {
    const btnAbrirPortada = document.getElementById("abrirIndicePortada") || document.getElementById("abrirIndice");
    const btnCerrar = document.getElementById("cerrarIndice");
    const modal = document.getElementById("modalIndice");

    if (btnAbrirPortada && modal) {
        btnAbrirPortada.addEventListener("click", () => {
            modal.classList.add("activo");
        });

        if (btnCerrar) {
            btnCerrar.addEventListener("click", () => {
                modal.classList.remove("activo");
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("activo");
            }
        });
    }
});

// Guardar progreso y controlar música
document.addEventListener("DOMContentLoaded", () => {
    const paginaActual = window.location.pathname.split("/").pop();

    // 1. Guardar el capítulo actual si estamos en uno
    if (paginaActual && paginaActual !== "index.html" && paginaActual !== "") {
        localStorage.setItem("ultimoCapitulo", window.location.href);
    }

    // 2. Comprobar si hay progreso guardado en el index.html
    if (paginaActual === "index.html" || paginaActual === "") {
        const ultimoCapitulo = localStorage.getItem("ultimoCapitulo");
        if (ultimoCapitulo) {
            mostrarAvisoContinuar(ultimoCapitulo);
        }
    }

    // 3. Control del reproductor de música
    const btnMusica = document.getElementById("btnMusica");
    const audio = document.getElementById("audioFondo");

    if (btnMusica && audio) {
        audio.volume = 0.3; // Volumen suave (30%)

        btnMusica.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                btnMusica.textContent = "🔊";
            } else {
                audio.pause();
                btnMusica.textContent = "🎵";
            }
        });
    }
});

// Crear cartel para continuar lectura en el index
function mostrarAvisoContinuar(url) {
    const banner = document.createElement("div");
    banner.className = "banner-continuar";
    banner.innerHTML = `
        <p>¿Quieres continuar donde lo dejaste?</p>
        <a href="${url}" class="boton-continuar">Ir al capítulo</a>
        <button id="cerrarBanner">&times;</button>
    `;
    document.body.appendChild(banner);

    document.getElementById("cerrarBanner").addEventListener("click", () => {
        banner.remove();
    });
}