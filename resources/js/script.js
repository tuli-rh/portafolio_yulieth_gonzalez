
document.addEventListener("DOMContentLoaded", () => {

    // 1. Actualizar el año automáticamente
    const year = new Date().getFullYear();

    const yearSpan = document.getElementById("year");
    const footerYear = document.getElementById("footer-year");

    if (yearSpan) {
        yearSpan.textContent = year;
    }

    if (footerYear) {
        footerYear.textContent = year;
    }

    // 2. Seleccionar las secciones que tendrán animaciones
    const sections = document.querySelectorAll(".reveal");

    // 3. Detectar cuando las secciones aparecen en pantalla
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Mostrar la sección
                entry.target.classList.add("visible");

            } else {

                // Ocultar la sección al salir de la pantalla
                // para que vuelva a animarse al regresar
                entry.target.classList.remove("visible");

            }

        });

    }, {
        threshold: 0.12
    });

    // 4. Activar la observación de cada sección
    sections.forEach((section) => {
        observer.observe(section);
    });

    // 5. Marcar en la navegación la sección actual
    const navLinks = document.querySelectorAll(".sidebar-nav a");

    const observedSections = document.querySelectorAll(
        ".main-content section[id]"
    );

    const navObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });

            }

        });

    }, {
        rootMargin: "-15% 0px -70% 0px"
    });

    observedSections.forEach((section) => {
        navObserver.observe(section);
    });

    console.log("Portafolio interactivo cargado correctamente.");

});
