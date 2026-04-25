import { getUser, getToken } from './storage.js'

const routes = {
    '/': '/pages/auth/index.html',
    '/login': '/pages/auth/index.html',
    '/dashboard': '/pages/dashboard/index.html',
    '/students': '/pages/students/index.html',
    '/users': '/pages/users/index.html',
    '/payments': '/pages/payments/index.html',
    '/attendance': '/pages/attendance/index.html',
    '/alerts': '/pages/alerts/index.html',
    '/settings': '/pages/settings/index.html'
}

export function navigateTo(path) {
    if (path === '/login' && getUser()) {
        // Si ya está logueado, redirigir al dashboard
        window.history.replaceState(null, null, '/dashboard')
        loadPage('/pages/dashboard/index.html')
        return
    }

    if (path !== '/login' && !getUser()) {
        // Si no está logueado y trata de acceder a ruta privada, redirigir al login
        window.history.replaceState(null, null, '/login')
        loadPage('/pages/auth/index.html')
        return
    }

    const page = routes[path] || '/pages/notfound/index.html'
    window.history.pushState(null, null, path)
    loadPage(page)
}

export function loadPage(pagePath) {
    fetch(pagePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html
            // Ejecutar scripts de la página
            const scripts = document.querySelectorAll('#app script')
            scripts.forEach(script => {
                const newScript = document.createElement('script')
                if (script.src) {
                    newScript.src = script.src
                } else {
                    newScript.textContent = script.textContent
                }
                document.head.appendChild(newScript)
                script.remove()
            })
        })
        .catch(err => {
            console.error('Error loading page:', err)
            document.getElementById('app').innerHTML = '<h1>Page not found</h1>'
        })
}

// Manejar navegación del browser
window.addEventListener('popstate', () => {
    const path = window.location.pathname
    const page = routes[path] || '/pages/notfound/index.html'
    loadPage(page)
})

// Exponer navigateTo globalmente para los enlaces
window.navigateTo = navigateTo