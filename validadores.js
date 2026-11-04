// ==========================================================================
// RECOMPLICA — CENTRAL DE RESGATE ENEM
// Módulo de Validadores e Regras de Negócio Puras (validadores.js)
// Suporte híbrido: Navegador (window.Validadores) e Node.js / Vitest
// ==========================================================================

const RESULTADOS_ATENDIMENTO_VALIDOS = [
    'Disponível',
    'Em atendimento',
    'Resolvido após correção',
    'Resolvido por orientação',
    'Pendente'
];

const RESULTADOS_FINAIS_ATENDIMENTO = [
    'Resolvido após correção',
    'Resolvido por orientação',
    'Pendente'
];

const AREAS_ENEM_VALIDAS = [
    'Matemática e suas Tecnologias',
    'Ciências da Natureza e suas Tecnologias',
    'Ciências Humanas e suas Tecnologias',
    'Linguagens, Códigos e suas Tecnologias',
    'Redação e Plataforma'
];

/**
 * Valida o registro de atendimento de um chamado da Recomplica.
 * Exige as 4 informações principais:
 * 1. Problema (o que foi identificado?)
 * 2. Solução (o que foi corrigido, orientado ou justificativa de pendência?)
 * 3. Verificação (como a equipe conferiu o resultado?)
 * 4. Responsáveis (quem participou da investigação, intervenção e verificação?)
 *
 * @param {Object} dados
 * @returns {{ valido: boolean, erros: string[] }}
 */
function validarRegistroAtendimento(dados = {}) {
    const erros = [];

    if (!dados || typeof dados !== 'object') {
        return { valido: false, erros: ['Dados de atendimento inválidos.'] };
    }

    const situacao = (dados.situacao || '').trim();
    if (!RESULTADOS_ATENDIMENTO_VALIDOS.includes(situacao)) {
        erros.push('Selecione um resultado válido para o chamado.');
    }

    // Se for apenas "Disponível", não exige preenchimento completo
    if (situacao === 'Disponível') {
        return { valido: erros.length === 0, erros };
    }

    const problema = (dados.problema || '').trim();
    const solucao = (dados.solucao || '').trim();
    const verificacao = (dados.verificacao || '').trim();
    const responsaveis = (dados.responsaveis || '').trim();

    if (problema.length < 5) {
        erros.push('Informe o Problema identificado (mínimo de 5 caracteres).');
    }

    // Para resultados finais (Resolvido ou Pendente), exige solução, verificação e responsáveis
    if (RESULTADOS_FINAIS_ATENDIMENTO.includes(situacao)) {
        if (solucao.length < 5) {
            if (situacao === 'Pendente') {
                erros.push('Para chamados Pendentes, é obrigatório registrar a justificativa técnica no campo Solução/Justificativa.');
            } else {
                erros.push('Informe a Solução aplicada ou orientação prestada (mínimo de 5 caracteres).');
            }
        }

        if (verificacao.length < 5) {
            erros.push('Informe a Verificação realizada pela equipe (mínimo de 5 caracteres).');
        }

        if (responsaveis.length < 2) {
            erros.push('Identifique os Responsáveis pelo atendimento (investigação, intervenção e verificação).');
        }
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

/**
 * Valida o preenchimento da Ficha Individual do estudante.
 * Perguntas obrigatórias:
 * 1. Qual chamado você ajudou a resolver?
 * 2. O que você fez?
 * 3. Como verificou ou justificou a solução?
 *
 * @param {Object} ficha
 * @returns {{ valido: boolean, erros: string[] }}
 */
function validarFichaIndividual(ficha = {}) {
    const erros = [];

    if (!ficha || typeof ficha !== 'object') {
        return { valido: false, erros: ['Dados da ficha individual inválidos.'] };
    }

    const estudante = (ficha.estudante || '').trim();
    const chamadoId = Number(ficha.chamadoId);
    const oQueFez = (ficha.oQueFez || '').trim();
    const comoVerificou = (ficha.comoVerificou || '').trim();

    if (estudante.length < 2) {
        erros.push('Selecione ou informe o nome/identificação do estudante.');
    }

    if (!chamadoId || chamadoId < 1 || chamadoId > 12) {
        erros.push('Selecione qual chamado (#CH-01 a #CH-12) você ajudou a atender.');
    }

    if (oQueFez.length < 5) {
        erros.push('Descreva o que você fez neste chamado (mínimo de 5 caracteres).');
    }

    if (comoVerificou.length < 5) {
        erros.push('Explique como verificou ou justificou a solução (mínimo de 5 caracteres).');
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

/**
 * Calcula as métricas e o progresso da equipe no Painel Inicial e no Relatório.
 * @param {Array} chamados
 * @returns {Object}
 */
function calcularResumoEquipe(chamados = []) {
    const lista = Array.isArray(chamados) ? chamados : [];
    const total = lista.length;

    let disponiveis = 0;
    let emAtendimento = 0;
    let resolvidosCorrecao = 0;
    let resolvidosOrientacao = 0;
    let pendentes = 0;
    let essenciaisConcluidos = 0;
    let aprofundamentoConcluidos = 0;

    lista.forEach(c => {
        const sit = c.situacao || 'Disponível';
        const isConcluido = RESULTADOS_FINAIS_ATENDIMENTO.includes(sit);

        if (sit === 'Disponível') disponiveis++;
        else if (sit === 'Em atendimento') emAtendimento++;
        else if (sit === 'Resolvido após correção') resolvidosCorrecao++;
        else if (sit === 'Resolvido por orientação') resolvidosOrientacao++;
        else if (sit === 'Pendente') pendentes++;

        if (isConcluido) {
            if (c.nivel === 'Essencial') essenciaisConcluidos++;
            else if (c.nivel === 'Aprofundamento') aprofundamentoConcluidos++;
        }
    });

    const resolvidosTotal = resolvidosCorrecao + resolvidosOrientacao;
    const concluidos = resolvidosTotal + pendentes;
    const trabalhados = emAtendimento + concluidos;
    const percentualProgresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    return {
        total,
        disponiveis,
        emAtendimento,
        resolvidosCorrecao,
        resolvidosOrientacao,
        resolvidosTotal,
        pendentes,
        trabalhados,
        concluidos,
        essenciaisConcluidos,
        aprofundamentoConcluidos,
        percentualProgresso
    };
}

/**
 * Adiciona uma entrada ao histórico de alterações de forma imutável (append-only),
 * garantindo que registros anteriores jamais sejam apagados pela equipe.
 *
 * @param {Array} historicoExistente
 * @param {Object} novaEntrada
 * @returns {Array} Novo array com todo o histórico preservado + novo registro
 */
function adicionarEntradaHistorico(historicoExistente = [], novaEntrada = {}) {
    const base = Array.isArray(historicoExistente) ? [...historicoExistente] : [];
    if (!novaEntrada || typeof novaEntrada !== 'object' || !novaEntrada.acao) {
        return base;
    }

    const registro = {
        id: base.length + 1,
        dataHora: novaEntrada.dataHora || new Date().toLocaleString('pt-BR'),
        chamadoId: novaEntrada.chamadoId || null,
        acao: String(novaEntrada.acao).trim(),
        situacaoAnterior: novaEntrada.situacaoAnterior || '-',
        situacaoNova: novaEntrada.situacaoNova || '-',
        responsaveis: novaEntrada.responsaveis || 'Equipe'
    };

    base.push(registro);
    return base;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RESULTADOS_ATENDIMENTO_VALIDOS,
        RESULTADOS_FINAIS_ATENDIMENTO,
        AREAS_ENEM_VALIDAS,
        validarRegistroAtendimento,
        validarFichaIndividual,
        calcularResumoEquipe,
        adicionarEntradaHistorico
    };
}

if (typeof window !== 'undefined') {
    window.Validadores = {
        RESULTADOS_ATENDIMENTO_VALIDOS,
        RESULTADOS_FINAIS_ATENDIMENTO,
        AREAS_ENEM_VALIDAS,
        validarRegistroAtendimento,
        validarFichaIndividual,
        calcularResumoEquipe,
        adicionarEntradaHistorico
    };
}
