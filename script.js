// Detectar el archivo actual
const paginaActual = window.location.pathname.split("/").pop() || "prologo.html";

// Lista ordenada de tu libro
const ordenCapitulos = [
    { archivo: "prologo.html", titulo: "Ir al Capítulo I" },
    { archivo: "capitulo1.html", titulo: "Siguiente: Capítulo I" },
    { archivo: "capitulo2.html", titulo: "Siguiente: Capítulo II" },
    { archivo: "capitulo3.html", titulo: "Siguiente: Capítulo III" },
    { archivo: "capitulo4.html", titulo: "Siguiente: Capítulo IV" },
    { archivo: "capitulo5.html", titulo: "Siguiente: Capítulo V" },
    { archivo: "capitulo6.html", titulo: "Siguiente: Capítulo VI" },
    { archivo: "epilogo.html", titulo: "Volver al Inicio" }
];

// Buscar la posición actual
const indiceActual = ordenCapitulos.findIndex(cap => cap.archivo === paginaActual);

document.addEventListener("DOMContentLoaded", () => {
    // Si estamos en una página válida dentro del orden
    if (indiceActual !== -1 && indiceActual < ordenCapitulos.length - 1) {
        const siguiente = ordenCapitulos[indiceActual + 1];
        
        // Contenedor del botón
        const contenedorNavegacion = document.createElement("div");
        contenedorNavegacion.className = "contenedor-siguiente";

        // Enlace/Botón
        const botonSiguiente = document.createElement("a");
        botonSiguiente.href = siguiente.archivo;
        botonSiguiente.className = "boton-capitulo";
        botonSiguiente.textContent = siguiente.titulo;

        contenedorNavegacion.appendChild(botonSiguiente);

        // Se inserta automáticamente dentro de la tarjeta de .libro
        const libro = document.querySelector(".libro");
        if (libro) {
            libro.appendChild(contenedorNavegacion);
        }
    }
});

// Abrir/Cerrar Índice en Portada (index.html)
document.addEventListener("DOMContentLoaded", () => {
    const btnAbrirPortada = document.getElementById("abrirIndicePortada");
    const btnCerrar = document.getElementById("cerrarIndice");
    const modal = document.getElementById("modalIndice");

    if (btnAbrirPortada && modal) {
        btnAbrirPortada.addEventListener("click", () => {
            modal.classList.add("activo");
        });

        btnCerrar.addEventListener("click", () => {
            modal.classList.remove("activo");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("activo");
            }
        });
    }
});