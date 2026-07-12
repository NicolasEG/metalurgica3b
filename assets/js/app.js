/*==================================================
METALÚRGICA TRES B
APP.JS
PARTE 1
==================================================*/

/*=========================
PRELOADER
=========================*/

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 600);

    }

});

/*=========================
HEADER
=========================*/

const header = document.getElementById("header");

function headerScroll() {

    if (!header) return;

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

headerScroll();

window.addEventListener("scroll", headerScroll);

/*=========================
MENU MOBILE
=========================*/

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuBtn.classList.toggle("active");

        menuBtn.innerHTML = menuBtn.classList.contains("active")

            ? '<i class="fa-solid fa-xmark"></i>'

            : '<i class="fa-solid fa-bars"></i>';

    });

    document.querySelectorAll("#nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.classList.remove("active");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}

/*=========================
LENIS
=========================*/

let lenis = null;

if (typeof Lenis !== "undefined") {

    lenis = new Lenis({

        duration: 1.2,

        smoothWheel: true,

        touchMultiplier: 1.4,

        smoothTouch: false

    });

    function raf(time) {

        lenis.raf(time);

        requestAnimationFrame(raf);

    }

    requestAnimationFrame(raf);

} else {

    console.warn("Lenis no está cargado.");

}

/*=========================
AOS
=========================*/

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 900,

        once: true,

        offset: 100,

        easing: "ease-out-cubic"

    });

}

/*=========================
GLIGHTBOX
=========================*/

if (typeof GLightbox !== "undefined") {

    GLightbox({

        selector: ".glightbox",

        touchNavigation: true,

        loop: true,

        zoomable: true

    });

}

/*=========================
SCROLL LINKS
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        if (lenis) {

            lenis.scrollTo(target, {

                offset: -80,

                duration: 1.2

            });

        } else {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*=========================
CONTADORES
=========================*/

const counters = document.querySelectorAll(".stat h3");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const text = counter.innerText;

        const number = parseInt(text);

        if (isNaN(number)) return;

        let start = 0;

        const speed = number / 80;

        const interval = setInterval(() => {

            start += speed;

            if (start >= number) {

                counter.innerText = text;

                clearInterval(interval);

            } else {

                counter.innerText =
                    Math.floor(start) + "+";

            }

        }, 20);

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});
/*=========================
PARALLAX
=========================*/

const parallax = document.querySelector(".parallax");

if (parallax) {

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        parallax.style.backgroundPositionY =
            (offset * 0.45) + "px";

    });

}

/*=========================
REVEAL MANUAL
=========================*/

const reveals = document.querySelectorAll(
    ".fade-up,.fade-left,.fade-right,.zoom-in"
);

if (reveals.length) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    reveals.forEach(item => {

        revealObserver.observe(item);

    });

}

/*=========================
3D CARDS
=========================*/

const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 12;

        const rotateX =
            ((y / rect.height) - 0.5) * -12;

        card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-12px)
            `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/*=========================
HEADER ACTIVE
=========================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#nav a");

if (sections.length && navLinks.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;
            const height = section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/*=========================
WHATSAPP
=========================*/

const whatsapp = document.querySelector(".whatsapp");

if (whatsapp) {

    whatsapp.style.opacity = "0";
    whatsapp.style.pointerEvents = "none";
    whatsapp.style.transform = "translateY(40px)";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            whatsapp.style.opacity = "1";
            whatsapp.style.pointerEvents = "all";
            whatsapp.style.transform = "translateY(0)";

        } else {

            whatsapp.style.opacity = "0";
            whatsapp.style.pointerEvents = "none";
            whatsapp.style.transform = "translateY(40px)";

        }

    });

}
/*=========================
LAZY LOAD IMÁGENES
=========================*/

const images = document.querySelectorAll(
    ".gallery img, .machine img, .about img, .export img, .service-image img"
);

images.forEach(img => {

    img.loading = "lazy";

    img.decoding = "async";

});

/*=========================
RIPPLE BOTONES
=========================*/

const buttons = document.querySelectorAll(
    ".btn-primary,.btn-secondary,.btn-header"
);

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const oldRipple = this.querySelector(".ripple");

        if (oldRipple) {

            oldRipple.remove();

        }

        const circle = document.createElement("span");

        const diameter = Math.max(
            this.clientWidth,
            this.clientHeight
        );

        const radius = diameter / 2;

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";

        circle.style.left =
            e.clientX -
            this.getBoundingClientRect().left -
            radius + "px";

        circle.style.top =
            e.clientY -
            this.getBoundingClientRect().top -
            radius + "px";

        circle.classList.add("ripple");

        this.appendChild(circle);

    });

});

/*=========================
SCROLL PROGRESS
=========================*/

let progress =
document.querySelector(".scroll-progress");

if (!progress) {

    progress = document.createElement("div");

    progress.className = "scroll-progress";

    document.body.appendChild(progress);

}

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (window.scrollY / totalHeight) * 100;

    progress.style.width =
        percentage + "%";

});

/*=========================
REVEAL IMÁGENES
=========================*/

const revealImages =
document.querySelectorAll(
    ".about-image img,.machine img,.gallery img"
);

if (revealImages.length) {

    const imageObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0) scale(1)";

                imageObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: .15

    });

    revealImages.forEach(img => {

        img.style.opacity = "0";

        img.style.transform =
            "translateY(40px) scale(.96)";

        img.style.transition =
            ".8s ease";

        imageObserver.observe(img);

    });

}
/*=========================
HOVER MAQUINARIA
=========================*/

const machines = document.querySelectorAll(".machine");

machines.forEach(machine => {

    machine.addEventListener("mouseenter", () => {

        machine.style.transition =
            ".35s ease";

        machine.style.transform =
            "translateY(-8px)";

    });

    machine.addEventListener("mouseleave", () => {

        machine.style.transform =
            "translateY(0)";

    });

});

/*=========================
EFECTO GALERÍA
=========================*/

const galleryItems =
document.querySelectorAll(".gallery-grid a");

galleryItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.style.zIndex = "2";

    });

    item.addEventListener("mouseleave", () => {

        item.style.zIndex = "1";

    });

});

/*=========================
REVEAL TÍTULOS
=========================*/

const titles = document.querySelectorAll(
    ".section-title,.section-mini"
);

if (titles.length) {

    const titleObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.animate([

                {
                    opacity:0,
                    transform:"translateY(30px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],{

                duration:700,
                easing:"ease-out",
                fill:"forwards"

            });

            titleObserver.unobserve(entry.target);

        });

    },{

        threshold:.20

    });

    titles.forEach(title => {

        titleObserver.observe(title);

    });

}

/*=========================
LOG
=========================*/

console.log(
    "%cMetalúrgica Tres B",
    "color:#2d6b3d;font-size:20px;font-weight:bold;"
);

console.log(
    "%cDesarrollado por NG Software",
    "color:#777;font-size:13px;"
);

/*=========================
FIN
=========================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
