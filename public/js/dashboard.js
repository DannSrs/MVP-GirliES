/**
 * dashboard.js
 * Lógica específica da tela de Dashboard.
 */

/**
 * Inicializa as checkboxes do checklist:
 * - Aplica transição CSS suave ao label ao marcar/desmarcar.
 * - O estado visual (line-through + cor) é controlado pelo seletor
 *   CSS "input:checked + label" definido no index.html.
 */
function inicializarChecklists() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        // Garante transição suave no label irmão
        const label = checkbox.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.transition = 'color 0.2s ease, text-decoration 0.2s ease';
        }

        // Listener de mudança: feedback visual imediato
        checkbox.addEventListener('change', function () {
            const lbl = this.nextElementSibling;
            if (!lbl || lbl.tagName !== 'LABEL') return;

            if (this.checked) {
                // Pequena animação de "check" no label
                lbl.animate(
                    [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
                    { duration: 300, easing: 'ease-in-out' }
                );
            }
        });
    });
}


function atualizarCicloAtivo() {
    const el = document.getElementById('ciclo-ativo');
    if (!el) return;

    const { label } = getSemanaAtual();
    el.textContent = `Ciclo Ativo: ${label}`;
}

/**
 * Inicializa o checklist de logística do 3º card (ícones interativos).
 * Ao clicar num item:
 *  - Alterna o ícone entre circle (pendente) e check-circle-2 (concluído)
 *  - Risca/des-risca o texto
 *  - Atualiza a barra de progresso e o contador
 */
function inicializarChecklistLogistica() {
    const lista = document.getElementById('lista-logistica');
    if (!lista) return;

    // Atualiza barra e contador com base no estado atual dos itens
    function atualizarProgresso() {
        const itens = lista.querySelectorAll('.checklist-logistica');
        const total = itens.length;
        const concluidos = [...itens].filter(li => li.dataset.concluido === 'true').length;
        const pct = total > 0 ? Math.round((concluidos / total) * 100) : 0;

        const barra = document.getElementById('logistica-barra');
        const contador = document.getElementById('logistica-contador');

        if (barra) barra.style.width = `${pct}%`;
        if (contador) {
            contador.innerHTML = `${concluidos} de ${total} concluídas <span class="text-slate-400 font-normal">(${pct}%)</span>`;
        }
    }

    // Registra o clique em cada item
    lista.querySelectorAll('.checklist-logistica').forEach(li => {
        li.addEventListener('click', function () {
            const concluido = this.dataset.concluido === 'true';
            const novoEstado = !concluido;
            this.dataset.concluido = String(novoEstado);

            // Lucide já converteu o <i> em <svg> — precisamos substituir
            // o elemento existente por um novo <i> para o createIcons() funcionar
            const iconeAtual = this.querySelector('.icon-status');
            const texto = this.querySelector('span');

            const novoIcone = document.createElement('i');

            if (novoEstado) {
                // ✅ Marcar como concluído
                novoIcone.setAttribute('data-lucide', 'check-circle-2');
                novoIcone.className = 'w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5 icon-status';
                texto.classList.add('line-through', 'text-slate-400');
                texto.classList.remove('text-slate-500');
            } else {
                // ○ Reverter para pendente
                novoIcone.setAttribute('data-lucide', 'circle');
                novoIcone.className = 'w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5 icon-status';
                texto.classList.remove('line-through', 'text-slate-400');
                texto.classList.add('text-slate-500');
            }

            // Troca o SVG antigo pelo novo <i> e renderiza apenas ele
            iconeAtual.replaceWith(novoIcone);
            lucide.createIcons({ nodes: [novoIcone] });

            // Animação de "pop" no novo ícone após renderização
            if (novoEstado) {
                novoIcone.animate(
                    [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
                    { duration: 250, easing: 'ease-out' }
                );
            }

            atualizarProgresso();
        });
    });

    // Calcula o estado inicial correto (com base nos data-concluido do HTML)
    atualizarProgresso();
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    atualizarCicloAtivo();
    inicializarChecklists();
    inicializarChecklistLogistica();
});
