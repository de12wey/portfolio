import { setupParticles } from "./parsystem";
import { loadRoute, updateSelectedLink } from "./router";

const BREAKPOINT = 600;
const urlSpanishResume = 'https://drive.google.com/file/d/1BjWIPzcrnz8Pz4HbKDGYP0xity1pDos3/view?usp=drive_link';
const urlEnglishResume = 'https://drive.google.com/file/d/1btL9AkLqxZ_biy8wUhlZoUGHTLsXr7Zh/view?usp=drive_link';

let currentLang = 'en';

window.addEventListener('load', async () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) toggleDarkMode();
    
    moveSettingsPanel();
    initializeEvents();
    setupParticles();

    navigate(document.querySelector("#about"));
});

function initializeEvents() {
    /* Resize */
    window.addEventListener('resize', moveSettingsPanel);

    /* Toggle dark/light mode */
    document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);

    /* Navigation bar menus */
    document.querySelectorAll('.navbar_option').forEach(a => {
        a.addEventListener('click', e => { navigate(a, e) })
    });

    window.addEventListener('popstate', () => {
        const route = location.pathname;
        loadRoute(location.pathname);
        updateSelectedLink(route);
    });

    /* Language toggle */
    document.querySelector('#langSelector').addEventListener('click', () => {
        currentLang = currentLang == 'en' ? 'es' : 'en';
        loadTranslations(currentLang);
    });
}

function navigate(a, e) {
    if (e) e.preventDefault();

    if (a.classList.contains('navbar_option-selected')) return;

    document.querySelectorAll('.navbar_option').forEach(a => a.classList.remove('navbar_option-selected'));
    a.classList.add('navbar_option-selected');
    const url = a.getAttribute('href');
    history.pushState(null, '', url);
    return loadRoute(url).then(() => loadTranslations());
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    
    /* Safari iOS fix */
    const body = document.body;
    body.style.display = 'none';
    void body.offsetHeight;
    body.style.display = '';
    
    let link = document.querySelector("link[rel~='icon']");
    link.href = isDark ? 'assets/img/dark.ico' : 'assets/img/light.ico';

    document.querySelectorAll('.svg-ldmode').forEach(svg => {
        svg.classList.toggle('svg-hidden');
    });
}

function moveSettingsPanel() {
    /* Fix for small screens. Move the navbar buttons to the footer */
    const panel = document.getElementById('navbar_buttons');
    const footer = document.getElementById('footer');
    const navbar = document.getElementById('navbar');

    if (window.innerWidth <= BREAKPOINT) {
        if (!footer.contains(panel)) {
            footer.appendChild(panel);
        }
    } else {
        if (!navbar.contains(panel)) {
            navbar.appendChild(panel);
        }
    }
}

async function loadTranslations() {
    const res = await fetch(`assets/i18n/${currentLang}.json`);
    const translations = await res.json();

    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    /* Download English or Spanish resume depending on the current language settings */
    const resumeButton = document.querySelector('#resume_button');
    if (resumeButton) {
        if (currentLang === 'en') {
            resumeButton.href = urlEnglishResume;
        } else {
            resumeButton.href = urlSpanishResume;
        }
    }
}