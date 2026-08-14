/* =========================
   TYPING TEXT
========================= */

const typingElement = document.getElementById("typing");

const wordsByLang = {
    en: [
        "Information Technology Student",
        "AI Developer",
        "Robotics Developer",
        "Software Engineer",
        "Problem Solver",
        "UI/UX Designer",
        "Data Analyst",
        "Web Developer",
        "Project Manager"
    ],
    ar: [
        "طالبة تقنية معلومات",
        "مطورة ذكاء اصطناعي",
        "مطورة روبوتات",
        "مهندسة برمجيات",
        "محللة مشاكل",
        "مصممة UI/UX",
        "محللة بيانات",
        "مطورة ويب",
        "مديرة مشاريع"
    ]
};

let wordIndex = 0;

function changeTypingText() {

    if (!typingElement) return;

    const currentWords = wordsByLang[currentLang] || wordsByLang.en;

    wordIndex = (wordIndex + 1) % currentWords.length;

    typingElement.textContent = currentWords[wordIndex];

}

setInterval(changeTypingText, 2500);


/* =========================
   LANGUAGE TOGGLE (EN / AR)
========================= */

const languageToggleBtn = document.getElementById("language-toggle");

let currentLang = localStorage.getItem("site-lang") || "en";

function applyLanguage(lang) {

    currentLang = lang;

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute(
        "dir",
        lang === "ar" ? "rtl" : "ltr"
    );

    document.body.classList.toggle("arabic", lang === "ar");

    /* =========================
       TEXT
    ========================= */

    document.querySelectorAll("[data-en]").forEach(el => {

        const text =
            lang === "ar"
                ? el.getAttribute("data-ar")
                : el.getAttribute("data-en");

        if (text !== null) {
            el.textContent = text;
        }

    });

    /* =========================
       HTML
    ========================= */

    document.querySelectorAll("[data-en-html]").forEach(el => {

        const html =
            lang === "ar"
                ? el.getAttribute("data-ar-html")
                : el.getAttribute("data-en-html");

        if (html !== null) {
            el.innerHTML = html;
        }

    });

    /* =========================
       TYPING TEXT
    ========================= */

    const currentWords =
        wordsByLang[lang] || wordsByLang.en;

    wordIndex = 0;

    if (typingElement) {
        typingElement.textContent = currentWords[0];
    }

    /* =========================
       LANGUAGE BUTTON
    ========================= */

    if (languageToggleBtn) {

        languageToggleBtn.textContent =
            lang === "ar"
                ? "English"
                : "العربية";

    }

    localStorage.setItem("site-lang", lang);
}


/* =========================
   TOGGLE
========================= */

if (languageToggleBtn) {

    languageToggleBtn.addEventListener("click", () => {

        applyLanguage(
            currentLang === "ar"
                ? "en"
                : "ar"
        );

    });

}


/* =========================
   INITIAL LANGUAGE
========================= */

applyLanguage(currentLang);

/* =========================
   ACTIVE NAVBAR
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================
   BACK TO TOP BUTTON
========================= */

const topButton = document.getElementById("topBtn");

if (topButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-title, .about-text, .about-card, .skill-category, .project-card, .timeline-item, .community-card, .contact-container"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});