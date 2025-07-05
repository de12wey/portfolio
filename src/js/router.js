const routes = {
    // '/': '/sections/about.html',
    '/about': '/sections/about.html',
    '/projects': '/sections/projects.html',
    '/resume': '/sections/resume.html'
};

export function loadRoute(route) {
    const file = routes[route] || routes['/'];

    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.querySelector('#main_container').innerHTML = html;
        });
}

export function updateSelectedLink(currentRoute) {
    console.log(currentRoute);
    document.querySelectorAll('.navbar_option').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentRoute) {
      a.classList.add('navbar_option-active');
    } else {
      a.classList.remove('navbar_option-active');
    }
  });
}