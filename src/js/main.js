import { setupParticles } from "./parsystem";
import { loadRoute, updateSelectedLink } from "./router";

const BREAKPOINT = 600;

window.addEventListener('load', async () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(isDarkMode);
    if (isDarkMode) toggleDarkMode();

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

    if (window.innerWidth <= 600) {
        if (!footer.contains(panel)) {
            footer.appendChild(panel);
        }
    } else {
        if (!navbar.contains(panel)) {
            navbar.appendChild(panel);
        }
    }
}