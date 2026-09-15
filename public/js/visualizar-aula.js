/**
 * Script para a tela de visualização de aula.
 * Atualmente vazio, configurado apenas para leitura/visualização.
 * Pode ser estendido futuramente para animações, modals e interações dinâmicas.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Visualizar aula carregado.');
    
    // Inicialização do Lucide Icons (caso haja ícones dinâmicos injetados depois)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
