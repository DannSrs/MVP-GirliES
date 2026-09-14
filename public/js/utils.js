/**
 * utils.js
 * Funções utilitárias reutilizáveis em todo o frontend.
 */

const MESES_PT = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const MESES_PT_COMPLETO = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Retorna a segunda-feira da semana de uma data.
 * @param {Date} date
 * @returns {Date}
 */
function getSegundaFeira(date) {
    const d = new Date(date);
    // getDay(): 0=Dom, 1=Seg, ..., 6=Sáb
    const diaSemana = d.getDay();
    // Diferença para segunda: se domingo (0) recua 6 dias, senão (diaSemana - 1)
    const diff = diaSemana === 0 ? -6 : 1 - diaSemana;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Retorna o domingo da semana de uma data.
 * @param {Date} date
 * @returns {Date}
 */
function getDomingo(date) {
    const segunda = getSegundaFeira(date);
    const domingo = new Date(segunda);
    domingo.setDate(segunda.getDate() + 6);
    return domingo;
}

/**
 * Formata o intervalo da semana no padrão: "16-22 Set" ou "30 Set – 06 Out"
 * (meses diferentes ficam explícitos nos dois lados).
 * @param {Date} segunda
 * @param {Date} domingo
 * @returns {string}
 */
function formatarIntervaloSemana(segunda, domingo) {
    const diaIni = segunda.getDate();
    const diaFim = domingo.getDate();
    const mesIni = MESES_PT[segunda.getMonth()];
    const mesFim = MESES_PT[domingo.getMonth()];
    const anoIni = segunda.getFullYear();
    const anoFim = domingo.getFullYear();

    // Mesma semana, mesmo mês e mesmo ano
    if (mesIni === mesFim && anoIni === anoFim) {
        return `${diaIni}-${diaFim} ${mesIni}`;
    }

    // Virada de mês (ex: 30 Set – 06 Out) ou virada de ano
    const sufixoAnoFim = anoIni !== anoFim ? `/${anoFim}` : '';
    return `${diaIni} ${mesIni} – ${String(diaFim).padStart(2, '0')} ${mesFim}${sufixoAnoFim}`;
}

/**
 * Retorna um objeto com as datas da semana atual.
 * @returns {{ segunda: Date, domingo: Date, label: string }}
 */
function getSemanaAtual() {
    const hoje = new Date();
    const segunda = getSegundaFeira(hoje);
    const domingo = getDomingo(hoje);
    return {
        segunda,
        domingo,
        label: formatarIntervaloSemana(segunda, domingo),
    };
}
