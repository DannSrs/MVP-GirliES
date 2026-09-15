/**
 * Lógica específica para a página de Cadastro de Aula
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Cadastro de Aulas inicializado.');
});

// Funções globais necessárias no HTML
window.adicionarNovoLink = function() {
    const container = document.getElementById('container-links');
    if (!container) return;
    
    const newLinkCard = document.createElement('div');
    newLinkCard.className = "bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 group items-center hover:border-girlies-purple/30 transition-colors cursor-text";
    
    newLinkCard.innerHTML = `
        <div class="icon-container w-9 h-9 rounded-lg bg-girlies-purple/10 text-girlies-purple flex items-center justify-center flex-shrink-0 shadow-sm transition-colors duration-300">
            <i data-lucide="link-2" class="w-4 h-4 icon-element" data-current-icon="link-2"></i>
        </div>
        <div class="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
            <input type="text" oninput="atualizarIconeLink(this)" placeholder="Título do link (ex: Quiz Kahoot)" class="text-xs font-bold text-slate-700 w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder-slate-400" />
            <input type="url" placeholder="https://" class="text-[10px] text-slate-500 w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder-slate-400 font-mono" />
        </div>
        <button type="button" onclick="this.closest('.bg-slate-50').remove()" class="text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-colors flex-shrink-0">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
    `;
    
    container.appendChild(newLinkCard);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({ root: newLinkCard });
    }
};

window.atualizarIconeLink = function(input) {
    const val = input.value.toLowerCase();
    const card = input.closest('div.bg-slate-50');
    if (!card) return;
    
    const iconContainer = card.querySelector('.icon-container');
    const iconElement = iconContainer ? iconContainer.querySelector('.icon-element') : null;
    
    if (!iconContainer) return;

    let novoIcone = 'link-2';
    let bgClass = 'bg-girlies-purple/10';
    let textClass = 'text-girlies-purple';

    if (val.includes('quiz') || val.includes('kahoot') || val.includes('jogo') || val.includes('game')) {
        novoIcone = 'gamepad-2';
        bgClass = 'bg-purple-100';
        textClass = 'text-purple-600';
    } else if (val.includes('form') || val.includes('feedback') || val.includes('pesquisa')) {
        novoIcone = 'clipboard-list';
        bgClass = 'bg-emerald-100';
        textClass = 'text-emerald-600';
    } else if (val.includes('doc') || val.includes('pdf') || val.includes('artigo') || val.includes('texto')) {
        novoIcone = 'file-text';
        bgClass = 'bg-blue-100';
        textClass = 'text-blue-600';
    } else if (val.includes('vídeo') || val.includes('video') || val.includes('youtube')) {
        novoIcone = 'youtube';
        bgClass = 'bg-red-100';
        textClass = 'text-red-600';
    } else if (val.includes('slide') || val.includes('apresentação') || val.includes('canva') || val.includes('ppt')) {
        novoIcone = 'monitor-play';
        bgClass = 'bg-amber-100';
        textClass = 'text-amber-600';
    } else if (val.includes('código') || val.includes('code') || val.includes('github') || val.includes('repo')) {
        novoIcone = 'code-2';
        bgClass = 'bg-slate-200';
        textClass = 'text-slate-700';
    }

    iconContainer.className = `icon-container w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-colors duration-300 ${bgClass} ${textClass}`;
    
    if (iconElement && iconElement.getAttribute('data-current-icon') !== novoIcone) {
        iconContainer.innerHTML = `<i data-lucide="${novoIcone}" class="w-4 h-4 icon-element" data-current-icon="${novoIcone}"></i>`;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ root: iconContainer });
        }
    }
};
