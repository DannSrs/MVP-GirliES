export function calcularSemana(dataAtividadeStr: string | undefined | null, dataInicioProjetoStr: string | undefined | null): number | undefined {
    if (!dataAtividadeStr || !dataInicioProjetoStr) {
        return undefined;
    }

    const dataAtividade = new Date(dataAtividadeStr);
    const dataInicio = new Date(dataInicioProjetoStr);

    if (dataAtividade.toString() === 'Invalid Date' || dataInicio.toString() === 'Invalid Date') {
        return undefined;
    }

    // Set times to midnight to avoid timezone/hour discrepancies
    const dataAtividadeMidnight = new Date(dataAtividade.getFullYear(), dataAtividade.getMonth(), dataAtividade.getDate());
    const dataInicioMidnight = new Date(dataInicio.getFullYear(), dataInicio.getMonth(), dataInicio.getDate());

    const diffEmMilissegundos = dataAtividadeMidnight.getTime() - dataInicioMidnight.getTime();
    
    // Se a data for antes do início do projeto, retorna undefined ou algo que indique que não pertence a uma semana (ou pode retornar semana 0 / negativa)
    if (diffEmMilissegundos < 0) {
        return undefined;
    }

    const diffEmDias = Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24));
    
    // Semana 1 = dias 0 a 6
    // Semana 2 = dias 7 a 13
    const semana = Math.floor(diffEmDias / 7) + 1;

    return semana;
}
