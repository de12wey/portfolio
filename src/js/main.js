import { setupParticles } from "./parsystem";
import { loadRoute, updateSelectedLink } from "./router";

const BREAKPOINT = 600;

let currentLang = 'en';
const langSelector = document.getElementById('langSelector');

window.addEventListener('load', async () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) toggleDarkMode();

    loadTranslations();
    moveSettingsPanel();
    initializeEvents();
    setupParticles();
});

function initializeEvents() {
    /* Resize */
    window.addEventListener('resize', moveSettingsPanel);

    /* Toggle dark/light mode */
    document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);

    /* Navigation bar menus */
    document.querySelectorAll('.navbar_option').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.navbar_option').forEach(a => a.classList.remove('navbar_option-selected'));
            a.classList.add('navbar_option-selected');
            const url = a.getAttribute('href');
            history.pushState(null, '', url);
            loadRoute(url);
        })
    });

    window.addEventListener('popstate', () => {
        const route = location.pathname;
        loadRoute(location.pathname);
        updateSelectedLink(route);
    });

    langSelector.addEventListener('click', (e) => {
        currentLang = currentLang == 'en' ? 'es' : 'en';
        loadTranslations(currentLang);
    });
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    document.querySelectorAll('.svg-ldmode').forEach(svg => {
        svg.classList.toggle('svg-hidden');
    });
}

function moveSettingsPanel() {
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
}