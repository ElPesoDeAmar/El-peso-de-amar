(() => {
    "use strict";

    /* ==========================================
       CONFIGURACIÓN
    ========================================== */

    const CAPITULOS = [
        { archivo: "prologo.html", titulo: "Prólogo" },
        { archivo: "capitulo1.html", titulo: "Capítulo I" },
        { archivo: "capitulo2.html", titulo: "Capítulo II" },
        { archivo: "capitulo3.html", titulo: "Capítulo III" },
        { archivo: "capitulo4.html", titulo: "Capítulo IV" },
        { archivo: "capitulo5.html", titulo: "Capítulo V" },
        { archivo: "epilogo.html", titulo: "Epílogo" }
    ];

    const PAGINA = location.pathname.split("/").pop() || "prologo.html";
    const INDICE = CAPITULOS.findIndex(c => c.archivo === PAGINA);

    document.addEventListener("DOMContentLoaded", iniciar);

    /* ==========================================
       INICIO
    ========================================== */

    function iniciar() {

        crearNavegacion();

        configurarIndice();

        guardarProgreso();

        configurarMusica();

        restaurarScroll();

        guardarScroll();

        configurarAtajos();

    }

    /* ==========================================
       NAVEGACIÓN ENTRE CAPÍTULOS
    ========================================== */

    function crearNavegacion() {

        if (PAGINA === "epilogo.html") return;

        const libro = document.querySelector(".libro");

        if (!libro || INDICE === -1) return;

        const nav = document.createElement("nav");
        nav.className = "contenedor-siguiente";

        if (INDICE > 0) {

            nav.appendChild(
                crearBoton(
                    CAPITULOS[INDICE - 1],
                    true
                )
            );

        }

        if (INDICE < CAPITULOS.length - 1) {

            nav.appendChild(
                crearBoton(
                    CAPITULOS[INDICE + 1],
                    false
                )
            );

        }

        libro.append(nav);

    }

    function crearBoton(capitulo, atras = false) {

        const a = document.createElement("a");

        a.href = capitulo.archivo;

        a.className = `boton-capitulo ${atras ? "boton-atras" : ""}`;

        a.innerHTML = atras
            ? `← ${capitulo.titulo}`
            : `${capitulo.titulo} →`;

        return a;

    }

    /* ==========================================
       MODAL ÍNDICE
    ========================================== */

    function configurarIndice() {

        const modal = document.getElementById("modalIndice");

        if (!modal) return;

        const abrir =
            document.getElementById("abrirIndice") ||
            document.getElementById("abrirIndicePortada");

        const cerrar =
            document.getElementById("cerrarIndice");

        abrir?.addEventListener("click", () => {

            modal.classList.add("activo");

        });

        cerrar?.addEventListener("click", cerrarModal);

        modal.addEventListener("click", e => {

            if (e.target === modal)
                cerrarModal();

        });

        function cerrarModal() {

            modal.classList.remove("activo");

        }

    }

    /* ==========================================
       GUARDAR PROGRESO
    ========================================== */

    function guardarProgreso() {

        if (PAGINA !== "index.html") {

            localStorage.setItem(
                "ultimoCapitulo",
                location.href
            );

        }

        else {

            const ultimo =
                localStorage.getItem("ultimoCapitulo");

            if (ultimo)
                crearBanner(ultimo);

        }

    }

    function crearBanner(url) {

        const banner = document.createElement("div");

        banner.className = "banner-continuar";

        banner.innerHTML = `
            <p>Continuar leyendo</p>

            <a href="${url}" class="boton-continuar">

                Abrir último capítulo

            </a>

            <button>

                ✕

            </button>
        `;

        banner.querySelector("button")
            .onclick = () => banner.remove();

        document.body.appendChild(banner);

    }

    /* ==========================================
       MÚSICA
    ========================================== */

    function configurarMusica() {

        const audio =
            document.getElementById("audioFondo");

        const boton =
            document.getElementById("btnMusica");

        if (!audio || !boton) return;

        audio.volume = .3;

        boton.addEventListener("click", () => {

            audio.paused
                ? audio.play()
                : audio.pause();

            boton.textContent =
                audio.paused ? "🎵" : "🔊";

        });

    }

    /* ==========================================
       GUARDAR POSICIÓN DE LECTURA
    ========================================== */

    function guardarScroll() {

        window.addEventListener("beforeunload", () => {

            localStorage.setItem(
                "scroll_" + PAGINA,
                window.scrollY
            );

        });

    }

    function restaurarScroll() {

        const pos = localStorage.getItem(
            "scroll_" + PAGINA
        );

        if (!pos) return;

        setTimeout(() => {

            scrollTo({
                top: Number(pos),
                behavior: "smooth"
            });

        }, 200);

    }

    /* ==========================================
       ATAJOS DEL TECLADO
    ========================================== */

    function configurarAtajos() {

        document.addEventListener("keydown", e => {

            if (e.target.tagName === "INPUT") return;

            switch (e.key) {

                case "ArrowRight":

                    if (INDICE < CAPITULOS.length - 1)

                        location.href =
                            CAPITULOS[INDICE + 1].archivo;

                    break;

                case "ArrowLeft":

                    if (INDICE > 0)

                        location.href =
                            CAPITULOS[INDICE - 1].archivo;

                    break;

                case "Escape":

                    document
                        .getElementById("modalIndice")
                        ?.classList.remove("activo");

                    break;

            }

        });

    }

})();