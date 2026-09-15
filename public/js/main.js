/**
 * main.js
 * Ponto de entrada do frontend — inicialização global.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones Lucide
    lucide.createIcons();

    // Nav active state (sidebar)
    document.querySelectorAll('aside nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('aside nav a').forEach(a => {
                a.classList.remove('nav-active', 'text-white');
                a.classList.add('text-slate-500');
            });
            this.classList.add('nav-active', 'text-white');
            this.classList.remove('text-slate-500');
        });
    });
});
