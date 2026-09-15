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
        novoIcone = 'video';
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

// Checklist Functions
window.atualizarProgressoChecklist = function() {
    const container = document.getElementById('container-checklist');
    if (!container) return;

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const concluidas = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    const progressText = document.getElementById('checklist-progress-text');
    const progressBar = document.getElementById('checklist-progress-bar');
    
    if (progressText) {
        progressText.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4"></i> ${concluidas} de ${total} Concluídas`;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ root: progressText });
        }
    }
    
    if (progressBar) {
        const percentage = total === 0 ? 0 : Math.round((concluidas / total) * 100);
        progressBar.style.width = `${percentage}%`;
    }
};

window.adicionarNovaTarefa = function() {
    const input = document.getElementById('nova-tarefa-input');
    const container = document.getElementById('container-checklist');
    
    if (!input || !container || !input.value.trim()) return;
    
    const textoTarefa = input.value.trim();
    
    const label = document.createElement('label');
    label.className = "bg-white border border-slate-200 hover:border-girlies-purple/30 rounded-xl p-3.5 flex gap-3.5 items-start cursor-pointer transition-all group shadow-sm relative pr-10";
    
    label.innerHTML = `
        <input type="checkbox" onchange="atualizarProgressoChecklist()" class="mt-0.5 w-4 h-4 text-girlies-purple rounded border-slate-300 focus:ring-girlies-purple accent-girlies-purple cursor-pointer">
        <div class="flex-1 min-w-0">
            <p class="tarefa-texto text-xs font-bold text-slate-700 group-hover:text-girlies-purple transition-colors break-words"></p>
        </div>
        <button type="button" onclick="event.preventDefault(); removerTarefa(this)" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
    `;
    
    label.querySelector('.tarefa-texto').textContent = textoTarefa;
    
    container.appendChild(label);
    input.value = '';
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({ root: label });
    }
    
    window.atualizarProgressoChecklist();
};

window.removerTarefa = function(button) {
    const label = button.closest('label');
    if (label) {
        label.remove();
        window.atualizarProgressoChecklist();
    }
};

// Team Management Functions
window.atualizarContagemEquipe = function(tipo) {
    const container = document.getElementById(`container-${tipo}s`);
    const countSpan = document.getElementById(`count-${tipo}s`);
    if (container && countSpan) {
        countSpan.textContent = container.children.length;
    }
};

window.toggleDropdown = function(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;
    
    const isHidden = dropdown.classList.contains('hidden');
    
    // Esconde todos os outros dropdowns
    document.querySelectorAll('[id^="dropdown-"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    if (isHidden) {
        dropdown.classList.remove('hidden');
    }
    
    // Fechar ao clicar fora
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.relative')) {
            dropdown.classList.add('hidden');
            document.removeEventListener('click', closeDropdown);
        }
    });
};

window.adicionarMembro = function(tipo, nome, papel, initial) {
    // Esconde o dropdown
    const dropdown = document.getElementById(`dropdown-${tipo}s`);
    if (dropdown) dropdown.classList.add('hidden');

    const container = document.getElementById(`container-${tipo}s`);
    if (!container) return;
    
    const card = document.createElement('div');
    
    if (tipo === 'docente') {
        card.className = "flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-girlies-purple/30 transition-all group relative";
        card.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border-2 border-white avatar-initial">
                ${initial}
            </div>
            <div class="flex-1 min-w-0 pr-6">
                <p class="text-xs font-bold text-slate-800 mb-0.5 truncate">${nome}</p>
                <p class="text-[10px] text-slate-500 font-mono truncate">${papel}</p>
            </div>
            <button type="button" onclick="removerMembroEquipe(this, 'docente')" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        `;
    } else {
        card.className = "flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group relative";
        card.innerHTML = `
            <div class="w-9 h-9 rounded-full bg-girlies-purple text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm avatar-initial">
                ${initial}
            </div>
            <div class="flex-1 min-w-0 pr-20">
                <p class="text-xs font-bold text-slate-800 mb-0.5 truncate">${nome}</p>
                <p class="text-[10px] text-slate-500 font-mono truncate">${papel}</p>
            </div>
            <div class="absolute right-8 top-1/2 -translate-y-1/2">
                <select class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest shadow-sm appearance-none cursor-pointer border-none focus:ring-0 outline-none text-center">
                    <option value="pendente" class="bg-white text-slate-700">Pendente</option>
                    <option value="confirmada" class="bg-white text-slate-700" selected>Confirmada</option>
                </select>
            </div>
            <button type="button" onclick="removerMembroEquipe(this, 'monitora')" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 w-6 h-6 rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
        `;
    }
    
    container.appendChild(card);
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({ root: card });
    }
    
    window.atualizarContagemEquipe(tipo);
};

window.removerMembroEquipe = function(button, tipo) {
    const card = button.closest('div.flex.items-center.gap-3');
    if (card) {
        card.remove();
        window.atualizarContagemEquipe(tipo);
    }
};
