/* =====================================================
   PRODUCTES

   Aquí és on podem controlar totes les fotografies
   de cada producte.

   Per exemple, una samarreta pot tenir:

   - davant
   - darrere
   - detall
   - etiqueta

   Només cal afegir més imatges a l'array.
===================================================== */

const products = {


    /* =================================================
       SAMARRETA NEGRA
    ================================================== */

    "samarreta-negra": {

        title: "Samarreta negra",
        price: "12€",
        description: "Samarreta negra de la col·lecció ABB Garage · Santa Tecla 2026.",

        details: [
            { label: "COLOR", value: "Negre" },
            { label: "EDICIÓ", value: "Santa Tecla 2026" },
            { label: "PREU", value: "12€" }
        ],

        images: [
            { src: "images/productes/samarreta_negra_davant.png", label: "Davant" },
            { src: "images/productes/samarreta_negra_darrere.png", label: "Darrere" }
        ]

    },


    /* =================================================
       SAMARRETA GRANATE
    ================================================== */

    "samarreta-granate": {

        title: "Samarreta granate",
        price: "12€",
        description: "Samarreta granate de la col·lecció ABB Garage · Santa Tecla 2026.",

        details: [
            { label: "COLOR", value: "Granate" },
            { label: "EDICIÓ", value: "Santa Tecla 2026" },
            { label: "PREU", value: "12€" }
        ],

        images: [
            { src: "images/productes/samarreta_granate_davant.png", label: "Davant" },
            { src: "images/productes/samarreta_granate_darrere.png", label: "Darrere" }
        ]

    },


    /* =================================================
       MOCADOR
    ================================================== */

    "mocador": {

        title: "Mocador",
        price: "3€",
        description: "Mocador de la col·lecció ABB Garage · Santa Tecla 2026.",

        details: [
            { label: "TIPUS", value: "Mocador" },
            { label: "EDICIÓ", value: "Santa Tecla 2026" },
            { label: "PREU", value: "3€" }
        ],

        images: [
            { src: "images/productes/mocador_offender.png", label: "Vista principal" }
        ]

    },


    /* =================================================
       TOTEBAG
    ================================================== */

    "totebag": {

        title: "Totebag",
        price: "7€",
        description: "Totebag de la col·lecció ABB Garage · Santa Tecla 2026.",

        details: [
            { label: "TIPUS", value: "Totebag" },
            { label: "EDICIÓ", value: "Santa Tecla 2026" },
            { label: "PREU", value: "7€" }
        ],

        images: [
            { src: "images/productes/totebag.png", label: "Vista principal" }
        ]

    }

};



/* =====================================================
   PREPARACIÓ GSAP

   Detectem si les llibreries han carregat bé (podrien
   fallar per xarxa, adblockers, etc). Si no hi són,
   el lloc segueix funcionant igual, simplement sense
   les animacions extra.
===================================================== */

const hasGSAP = typeof gsap !== "undefined";
const hasScrollTrigger = hasGSAP && typeof ScrollTrigger !== "undefined";
const hasLenis = typeof Lenis !== "undefined";

if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

document.documentElement.classList.add("gsap-ready");



/* =====================================================
   SMOOTH SCROLL (LENIS + SCROLLTRIGGER)
===================================================== */

let lenis = null;

if (hasLenis) {

    lenis = new Lenis({
        duration: 1.1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    lenis.on("scroll", () => {

        if (hasScrollTrigger) {
            ScrollTrigger.update();
        }

    });

    if (hasGSAP) {

        gsap.ticker.add(time => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

    } else {

        function rafLoop(time) {
            lenis.raf(time);
            requestAnimationFrame(rafLoop);
        }

        requestAnimationFrame(rafLoop);

    }

    /*
        Si cliquem un enllaç intern (#colleccio, etc),
        deixem que Lenis porti el scroll suaument
        enlloc del salt sec del navegador.
    */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId.length > 1 && document.querySelector(targetId)) {

                event.preventDefault();

                lenis.scrollTo(targetId, {
                    offset: -20,
                    duration: 1.4
                });

            }

        });

    });

}



/* =====================================================
   ANIMACIÓ D'ENTRADA DEL HERO
===================================================== */

let heroAnimationPlayed = false;

function initHeroAnimation() {

    if (heroAnimationPlayed) return;
    heroAnimationPlayed = true;

    if (hasScrollTrigger) {
        ScrollTrigger.refresh();
    }

    if (!hasGSAP) return;

    const tl = gsap.timeline({
        defaults: { ease: "power2.out" }
    });

    tl.from(".header", {
        y: -20,
        opacity: 0,
        duration: 1
    })

    .from(".tarragona-line span", {
        opacity: 0,
        y: 10,
        stagger: .1,
        duration: .8
    }, .1)

    .from(".hero .eyebrow", {
        opacity: 0,
        y: 12,
        duration: .8
    }, .35)

    .from(".hero h1", {
        opacity: 0,
        y: 40,
        duration: 1.3,
        stagger: .15
    }, .45)

    .from(".hero-bottom p, .hero-bottom .button", {
        opacity: 0,
        y: 16,
        stagger: .12,
        duration: .9
    }, .9)

    .from(".hero-year", {
        opacity: 0,
        duration: 1.4
    }, .5);

}

initHeroAnimation();



/* =====================================================
   PARALꞏLAX DEL HERO
===================================================== */

if (hasGSAP && hasScrollTrigger) {

    gsap.to(".hero-image", {

        yPercent: 18,
        ease: "none",

        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }

    });

    gsap.to(".hero-year", {

        yPercent: -25,
        ease: "none",

        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }

    });

}



/* =====================================================
   CAPÇALERA · FONS EN FER SCROLL
===================================================== */

const header = document.querySelector(".header");

if (header) {

    if (hasScrollTrigger) {

        ScrollTrigger.create({
            start: 80,
            end: 99999,
            onUpdate: self => {

                header.classList.toggle(
                    "is-scrolled",
                    self.scroll() > 80
                );

            }
        });

    } else {

        window.addEventListener("scroll", () => {

            header.classList.toggle(
                "is-scrolled",
                window.scrollY > 80
            );

        });

    }

}



/* =====================================================
   MENÚ MÒBIL
===================================================== */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);

});


/* Tancar el menú */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

    });

});



/* =====================================================
   PUNTER FI (per activar l'efecte magnètic només
   en dispositius amb ratolí)
===================================================== */

const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;



/* =====================================================
   BOTONS MAGNÈTICS
===================================================== */

if (hasGSAP && hasFinePointer) {

    document.querySelectorAll(".button").forEach(button => {

        const strength = 22;

        button.addEventListener("mouseenter", () => {
            button.classList.add("magnetic-active");
        });

        button.addEventListener("mousemove", event => {

            const rect = button.getBoundingClientRect();

            const relX = event.clientX - rect.left - rect.width / 2;
            const relY = event.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: (relX / rect.width) * strength,
                y: (relY / rect.height) * strength,
                duration: .3,
                ease: "power2.out"
            });

        });

        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                x: 0,
                y: 0,
                duration: .6,
                ease: "elastic.out(1, 0.4)",
                onComplete: () => button.classList.remove("magnetic-active")
            });

        });

    });

}



/* =====================================================
   ELEMENTS DEL MODAL
===================================================== */

const modal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalContentEl = document.querySelector("#productModal .modal-content");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalDetails = document.getElementById("modalDetails");
const galleryThumbnails = document.getElementById("galleryThumbnails");



/* =====================================================
   CANVIAR IMATGE PRINCIPAL
===================================================== */

function changeModalImage(image, thumbnail) {

    modalImage.style.opacity = "0";

    setTimeout(() => {

        modalImage.src = image.src;
        modalImage.alt = image.label;
        modalImage.style.opacity = "1";

    }, 150);

    document.querySelectorAll(".gallery-thumbnail").forEach(item => {
        item.classList.remove("active");
    });

    thumbnail.classList.add("active");

}



/* =====================================================
   CREAR GALERIA
===================================================== */

function createGallery(product) {

    galleryThumbnails.innerHTML = "";

    product.images.forEach((image, index) => {

        const thumbnail = document.createElement("button");

        thumbnail.type = "button";
        thumbnail.className = "gallery-thumbnail";

        if (index === 0) {
            thumbnail.classList.add("active");
        }

        thumbnail.setAttribute("aria-label", `Veure ${image.label}`);

        const img = document.createElement("img");

        img.src = image.src;
        img.alt = image.label;

        thumbnail.appendChild(img);

        thumbnail.addEventListener("click", event => {

            event.stopPropagation();
            changeModalImage(image, thumbnail);

        });

        galleryThumbnails.appendChild(thumbnail);

    });

}



/* =====================================================
   CREAR DETALLS
===================================================== */

function createDetails(product) {

    modalDetails.innerHTML = "";

    product.details.forEach(detail => {

        const row = document.createElement("div");
        row.className = "modal-detail";

        const label = document.createElement("span");
        label.textContent = detail.label;

        const value = document.createElement("span");
        value.textContent = detail.value;

        row.appendChild(label);
        row.appendChild(value);

        modalDetails.appendChild(row);

    });

}



/* =====================================================
   OBRIR / TANCAR PRODUCTE
===================================================== */

function openProduct(productId) {

    const product = products[productId];

    if (!product) return;

    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;

    createDetails(product);
    createGallery(product);

    modalImage.src = product.images[0].src;
    modalImage.alt = product.images[0].label;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (lenis) lenis.stop();

    if (hasGSAP && modalContentEl) {

        gsap.fromTo(modalOverlay,
            { opacity: 0 },
            { opacity: 1, duration: .35, ease: "power2.out" }
        );

        gsap.fromTo(modalContentEl,
            { opacity: 0, y: 30, scale: .97 },
            { opacity: 1, y: 0, scale: 1, duration: .45, ease: "power3.out", clearProps: "transform" }
        );

    }

}


function closeProduct() {

    if (lenis) lenis.start();

    if (hasGSAP && modalContentEl) {

        gsap.to(modalContentEl, {
            opacity: 0,
            y: 20,
            scale: .98,
            duration: .3,
            ease: "power2.in"
        });

        gsap.to(modalOverlay, {

            opacity: 0,
            duration: .35,
            ease: "power2.in",

            onComplete: () => {

                modal.classList.remove("active");
                modal.setAttribute("aria-hidden", "true");
                document.body.classList.remove("modal-open");

                gsap.set([modalContentEl, modalOverlay], { clearProps: "all" });

            }

        });

    } else {

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

    }

}



/* =====================================================
   TARGETES DE PRODUCTE
===================================================== */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", () => {

        openProduct(card.dataset.product);

    });

    card.addEventListener("keydown", event => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            openProduct(card.dataset.product);

        }

    });

});



/* =====================================================
   TANCAR MODAL
===================================================== */

modalClose.addEventListener("click", closeProduct);
modalOverlay.addEventListener("click", closeProduct);

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeProduct();
    }

});



/* =====================================================
   FILTRE ANYS ANTERIORS
===================================================== */

const yearButtons = document.querySelectorAll(".year-button");
const archiveCards = document.querySelectorAll(".archive-card");

yearButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedYear = button.dataset.year;

        yearButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        archiveCards.forEach((card, index) => {

            const cardYear = card.dataset.year;
            const shouldShow = selectedYear === "all" || selectedYear === cardYear;

            if (hasGSAP) {

                if (shouldShow) {

                    card.classList.remove("hidden");

                    gsap.fromTo(card,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: .6,
                            ease: "power1.out",
                            delay: index * .03
                        }
                    );

                } else {

                    gsap.to(card, {

                        opacity: 0,
                        duration: .4,
                        ease: "power1.out",

                        onComplete: () => card.classList.add("hidden")

                    });

                }

            } else {

                card.classList.toggle("hidden", !shouldShow);

            }

        });

        if (hasScrollTrigger) {
            ScrollTrigger.refresh();
        }

    });

});



/* =====================================================
   ANIMACIONS AL FER SCROLL
===================================================== */

if (hasGSAP && hasScrollTrigger) {

    /*
        Targetes de producte i d'arxiu: entren amb un
        petit esglaonat (stagger) per grup en lloc de
        totes alhora.
    */

    [
        ".products-grid .product-card",
        ".mocador_totebag_grid .product-card",
        ".archive-grid .archive-card"
    ].forEach(selector => {

        const items = document.querySelectorAll(selector);

        if (!items.length) return;

        gsap.from(items, {

            opacity: 0,
            y: 24,
            duration: .6,
            ease: "power3.out",
            stagger: .1,

            scrollTrigger: {
                trigger: items[0].closest("section, div"),
                start: "top 95%"
            }

        });

    });


    /*
        Blocs de text / capçaleres de secció.
    */

    gsap.utils.toArray(
        ".section-label, .section-heading, .intro-grid, .tarragona-grid, .archive-header, .contact, .statement-content"
    ).forEach(element => {

        gsap.from(element, {

            opacity: 0,
            y: 24,
            duration: .7,
            ease: "power3.out",

            scrollTrigger: {
                trigger: element,
                start: "top 95%"
            }

        });

    });


    /*
        Filtre d'anys i tira de festivitats: un fade
        senzill, sense desplaçament.
    */

    gsap.utils.toArray(".year-filter, .festivity-strip").forEach(element => {

        gsap.from(element, {

            opacity: 0,
            duration: .7,
            ease: "power2.out",

            scrollTrigger: {
                trigger: element,
                start: "top 97%"
            }

        });

    });


    /*
        "LA CIUTAT S'ENCÉN": la paraula clau creix
        lleugerament i s'il·lumina en arribar-hi.
    */

    const statementEm = document.querySelector(".statement h2 em");

    if (statementEm) {

        gsap.to(statementEm, {

            textShadow: "0 0 28px rgba(181,42,60,.85)",
            scale: 1.04,
            ease: "none",

            scrollTrigger: {
                trigger: ".statement",
                start: "top 60%",
                end: "center 40%",
                scrub: true
            }

        });

    }

} else {

    /*
        Sense GSAP disponible: fallback senzill amb
        IntersectionObserver perquè el contingut sigui
        igualment visible (per si el CDN ha fallat).
    */

    document.querySelectorAll(
        ".product-card, .archive-card, .intro-grid, .tarragona-grid, .contact"
    ).forEach(element => {

        element.style.opacity = "1";

    });

}



/* =====================================================
   FALLBACK PER IMATGES

   Si alguna fotografia encara no existeix, evitem
   que aparegui una icona d'imatge trencada.
===================================================== */

document.addEventListener("error", event => {

    if (event.target.tagName === "IMG") {

        event.target.style.background = "#d5d1c8";
        event.target.style.objectFit = "contain";
        event.target.style.padding = "20px";
        event.target.alt = "Imatge pendent d'afegir";

    }

}, true);
