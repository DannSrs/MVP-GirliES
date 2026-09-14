/**
 * dashboard.js
 * Lógica específica da tela de Dashboard.
 */

/**
 * Atualiza o texto "Ciclo Ativo: XX-XX Mês" com a semana real.
 */
function atualizarCicloAtivo() {
    const el = document.getElementById('ciclo-ativo');
    if (!el) return;

    const { label } = getSemanaAtual();
    el.textContent = `Ciclo Ativo: ${label}`;
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    atualizarCicloAtivo();
});
