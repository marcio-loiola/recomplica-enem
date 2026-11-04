import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import * as ValidadoresModule from './validadores.js';

const {
    validarRegistroAtendimento,
    validarFichaIndividual,
    calcularResumoEquipe,
    adicionarEntradaHistorico,
    RESULTADOS_ATENDIMENTO_VALIDOS
} = ValidadoresModule;

describe('Suíte de Testes — Recomplica: Central de Resgate ENEM', () => {

    // -------------------------------------------------------------------------
    // 1. VALIDAÇÃO DO ATENDIMENTO (As 3 Situações Exigidas)
    // -------------------------------------------------------------------------
    describe('validarRegistroAtendimento() — Os 4 campos e os 3 resultados finais', () => {
        it('Cenário 1: Deve aprovar um chamado "Resolvido após correção" com as 4 informações preenchidas', () => {
            const resultado = validarRegistroAtendimento({
                situacao: 'Resolvido após correção',
                problema: 'Gabarito cadastrado como alternativa D (20 km) por erro na conversão de cm para km.',
                solucao: 'Gabarito alterado de D para B (2 km) e explicação atualizada no item.',
                verificacao: 'Simulamos a resposta marcando a alternativa B e o sistema validou o acerto.',
                responsaveis: 'Ana Silva (Investigação), Bruno Costa (Intervenção), Carla Dias (Verificação)'
            });
            expect(resultado.valido).toBe(true);
            expect(resultado.erros).toHaveLength(0);
        });

        it('Cenário 2: Deve aprovar um chamado "Resolvido por orientação" quando não há falha técnica', () => {
            const resultado = validarRegistroAtendimento({
                situacao: 'Resolvido por orientação',
                problema: 'Estudante somou +10% e -10% diretamente achando que a variação final seria 0%.',
                solucao: 'Orientamos a aluna demonstrando que o desconto de 10% incide sobre 110, resultando em 99 (-1%).',
                verificacao: 'Revisamos a questão no simulado e confirmamos que o gabarito C (-1%) está matematicamente correto.',
                responsaveis: 'Bruno Costa (Investigação), Ana Silva (Intervenção/Orientação)'
            });
            expect(resultado.valido).toBe(true);
            expect(resultado.erros).toHaveLength(0);
        });

        it('Cenário 3: Deve aprovar um chamado "Pendente" desde que contenha justificativa, verificação e responsáveis', () => {
            const resultado = validarRegistroAtendimento({
                situacao: 'Pendente',
                problema: 'Arquivo vetorial do mapa de fusos horários do IBGE está corrompido no servidor de mídia.',
                solucao: 'Justificativa de pendência: Aguardando envio da imagem oficial pelo setor de Design Gráfico.',
                verificacao: 'Conferimos que o cálculo do gabarito (GMT-3 e GMT-5) está correto, faltando apenas o anexo visual.',
                responsaveis: 'Carla Dias (Investigação e Registro)'
            });
            expect(resultado.valido).toBe(true);
            expect(resultado.erros).toHaveLength(0);
        });

        it('Deve rejeitar encerramento de chamado quando faltar Problema, Solução, Verificação ou Responsáveis', () => {
            const resultado = validarRegistroAtendimento({
                situacao: 'Resolvido após correção',
                problema: 'Err',
                solucao: '',
                verificacao: '',
                responsaveis: ''
            });
            expect(resultado.valido).toBe(false);
            expect(resultado.erros.length).toBe(4);
        });

        it('Deve exigir justificativa clara quando marcado como "Pendente"', () => {
            const resultado = validarRegistroAtendimento({
                situacao: 'Pendente',
                problema: 'Imagem da questão não carrega na tela.',
                solucao: '',
                verificacao: 'Testado em dois navegadores.',
                responsaveis: 'Ana Silva'
            });
            expect(resultado.valido).toBe(false);
            expect(resultado.erros.some(e => e.includes('justificativa'))).toBe(true);
        });
    });

    // -------------------------------------------------------------------------
    // 2. VALIDAÇÃO DA FICHA INDIVIDUAL
    // -------------------------------------------------------------------------
    describe('validarFichaIndividual() — Registro de Autoria Individual', () => {
        it('Deve validar ficha individual completa com as 3 respostas obrigatórias', () => {
            const ficha = validarFichaIndividual({
                estudante: 'Ana Silva',
                chamadoId: 1,
                oQueFez: 'Investiguei o cálculo da escala 1:50.000 e corrigi o gabarito para a letra B.',
                comoVerificou: 'Refiz a conversão de 200.000 cm para 2 km e testei a questão na interface.'
            });
            expect(ficha.valido).toBe(true);
            expect(ficha.erros).toHaveLength(0);
        });

        it('Deve rejeitar ficha individual com campos em branco ou chamado inválido', () => {
            const ficha = validarFichaIndividual({
                estudante: '',
                chamadoId: 99,
                oQueFez: 'Nada',
                comoVerificou: ''
            });
            expect(ficha.valido).toBe(false);
            expect(ficha.erros.length).toBe(4);
        });
    });

    // -------------------------------------------------------------------------
    // 3. CÁLCULO DE PROGRESSO E INDICADORES DO PAINEL
    // -------------------------------------------------------------------------
    describe('calcularResumoEquipe() — Métricas do Painel Inicial', () => {
        it('Deve contabilizar corretamente disponíveis, em atendimento, resolvidos, pendentes e progresso', () => {
            const mockChamados = [
                { id: 1, nivel: 'Essencial', situacao: 'Resolvido após correção' },
                { id: 2, nivel: 'Essencial', situacao: 'Resolvido por orientação' },
                { id: 3, nivel: 'Aprofundamento', situacao: 'Pendente' },
                { id: 4, nivel: 'Essencial', situacao: 'Em atendimento' },
                { id: 5, nivel: 'Essencial', situacao: 'Disponível' }
            ];

            const resumo = calcularResumoEquipe(mockChamados);
            expect(resumo.total).toBe(5);
            expect(resumo.disponiveis).toBe(1);
            expect(resumo.emAtendimento).toBe(1);
            expect(resumo.resolvidosCorrecao).toBe(1);
            expect(resumo.resolvidosOrientacao).toBe(1);
            expect(resumo.resolvidosTotal).toBe(2);
            expect(resumo.pendentes).toBe(1);
            expect(resumo.concluidos).toBe(3); // 2 resolvidos + 1 pendente documentado
            expect(resumo.essenciaisConcluidos).toBe(2);
            expect(resumo.aprofundamentoConcluidos).toBe(1);
            expect(resumo.percentualProgresso).toBe(60);
        });
    });

    // -------------------------------------------------------------------------
    // 4. SEGURANÇA E PRESERVAÇÃO DO HISTÓRICO (IMUTABILIDADE)
    // -------------------------------------------------------------------------
    describe('adicionarEntradaHistorico() — Preservação de Histórico', () => {
        it('Deve preservar os registros anteriores sem permitir exclusão ao adicionar nova entrada', () => {
            const inicial = [
                { id: 1, dataHora: '04/11/2026 08:00:00', chamadoId: 1, acao: 'Abertura inicial', situacaoAnterior: '-', situacaoNova: 'Disponível', responsaveis: 'Sistema' }
            ];

            const atualizado = adicionarEntradaHistorico(inicial, {
                chamadoId: 1,
                acao: 'Correção de gabarito realizada',
                situacaoAnterior: 'Disponível',
                situacaoNova: 'Resolvido após correção',
                responsaveis: 'Ana Silva'
            });

            expect(atualizado).toHaveLength(2);
            expect(atualizado[0].acao).toBe('Abertura inicial');
            expect(atualizado[1].situacaoNova).toBe('Resolvido após correção');
            expect(atualizado[1].id).toBe(2);
        });
    });

    // -------------------------------------------------------------------------
    // 5. VERIFICAÇÃO DE FLUXO COMPLETO, PERSISTÊNCIA E EXPORTAÇÃO DE RELATÓRIO
    // -------------------------------------------------------------------------
    describe('Fluxo Completo E2E (3 Situações + Reload + Exportação HTML/JSON)', () => {
        it('Deve executar os 3 atendimentos exigidos, persistir no localStorage após recarregar e exportar relatório completo', () => {
            // 1. Prepara armazenamento localStorage simulado que persiste entre "reloads"
            const storageMap = new Map();
            const localStorageMock = {
                getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
                setItem: (k, v) => storageMap.set(k, String(v)),
                removeItem: (k) => storageMap.delete(k)
            };

            const exportedFiles = [];

            // Função auxiliar que simula o carregamento de uma página no navegador (ou reload)
            const carregarSessaoNavegador = (valoresFormularioModal = {}) => {
                const elementsById = {};
                const registerInput = (id, value = '') => {
                    elementsById[id] = {
                        id,
                        value,
                        textContent: '',
                        innerHTML: '',
                        style: {},
                        remove: () => { delete elementsById[id]; },
                        parentNode: true,
                        addEventListener: () => {},
                        querySelectorAll: () => []
                    };
                };

                Object.entries(valoresFormularioModal).forEach(([k, v]) => registerInput(k, v));

                const windowMock = {
                    Validadores: ValidadoresModule,
                    localStorage: localStorageMock,
                    location: { href: 'consulta.html' },
                    addEventListener: () => {},
                    dispatchEvent: () => {},
                    CustomEvent: class CustomEvent { constructor(name) { this.name = name; } },
                    Blob: class Blob {
                        constructor(parts, opts) {
                            this.content = parts.join('');
                            this.type = opts?.type || '';
                        }
                    },
                    URL: {
                        createObjectURL: (blob) => {
                            exportedFiles.push(blob);
                            return 'blob:recomplica-export';
                        },
                        revokeObjectURL: () => {}
                    }
                };

                const documentMock = {
                    body: {
                        appendChild: (el) => {
                            if (el && el.id) elementsById[el.id] = el;
                        },
                        removeChild: () => {}
                    },
                    getElementById: (id) => elementsById[id] || null,
                    createElement: (tag) => ({
                        tagName: tag.toUpperCase(),
                        id: '',
                        className: '',
                        innerHTML: '',
                        style: {},
                        href: '',
                        download: '',
                        click: function () {
                            if (exportedFiles.length > 0) {
                                exportedFiles[exportedFiles.length - 1].downloadName = this.download;
                            }
                        },
                        remove: function () {}
                    }),
                    addEventListener: () => {}
                };

                const context = vm.createContext({
                    window: windowMock,
                    document: documentMock,
                    localStorage: localStorageMock,
                    Validadores: ValidadoresModule,
                    Blob: windowMock.Blob,
                    URL: windowMock.URL,
                    CustomEvent: windowMock.CustomEvent,
                    setTimeout: () => {},
                    console
                });

                const appJsCode = fs.readFileSync(path.resolve(__dirname, './app.js'), 'utf-8');
                vm.runInContext(appJsCode, context);
                return { windowMock, documentMock, elementsById };
            };

            // Inicializa a primeira sessão e verifica os 12 chamados iniciais (8 essenciais + 4 aprofundamento)
            let sessao = carregarSessaoNavegador();
            const rawInicial = localStorageMock.getItem('recomplica_chamados_v1');
            // Dispara abertura de modal do chamado 1 para inicializar o banco no localStorage
            sessao.windowMock.abrirModalAtendimento(1);
            const chamadosIniciais = JSON.parse(localStorageMock.getItem('recomplica_chamados_v1'));
            expect(chamadosIniciais).toHaveLength(12);
            expect(chamadosIniciais.filter(c => c.nivel === 'Essencial')).toHaveLength(8);
            expect(chamadosIniciais.filter(c => c.nivel === 'Aprofundamento')).toHaveLength(4);

            // Situação 1: Chamado #CH-01 -> Resolvido após correção (corrigindo gabarito de B para C)
            sessao = carregarSessaoNavegador({
                atendGabaritoItem: 'C',
                atendAreaItem: 'Matemática e suas Tecnologias',
                atendExplicacaoItem: 'Escala 1:25.000 => 8 cm * 25.000 = 200.000 cm = 2.000 m (Alternativa C).',
                atendProblema: 'O gabarito cadastrado estava como B (200 m), mas 200.000 cm equivalem a 2.000 m (C).',
                atendSolucao: 'Corrigimos o gabarito do item #CH-01 de B para C no painel de configuração.',
                atendVerificacao: 'Refizemos a conversão métrica e testamos a marcação da alternativa C.',
                atendAutorInv: 'Ana Beatriz',
                atendAutorInt: 'Carlos Eduardo',
                atendAutorVer: 'Mariana Souza',
                atendSituacao: 'Resolvido após correção'
            });
            sessao.windowMock.salvarAtendimentoChamado({ preventDefault: () => {} }, 1);

            // Situação 2: Chamado #CH-02 -> Resolvido por orientação (sem falha no sistema; dúvida de média ponderada)
            sessao = carregarSessaoNavegador({
                atendGabaritoItem: 'B',
                atendAreaItem: 'Matemática e suas Tecnologias',
                atendExplicacaoItem: 'Média ponderada = (6*2 + 9*3 + 7*5) / 10 = 74 / 10 = 7,4.',
                atendProblema: 'Não há erro no sistema; o aluno calculou média aritmética simples em vez de média ponderada.',
                atendSolucao: 'Orientamos o estudante demonstrando a multiplicação de cada nota pelo respectivo peso (2, 3 e 5).',
                atendVerificacao: 'Conferimos que o gabarito B (7,4) e a fórmula estão íntegros na plataforma.',
                atendAutorInv: 'Carlos Eduardo',
                atendAutorInt: 'Ana Beatriz',
                atendAutorVer: 'Mariana Souza',
                atendSituacao: 'Resolvido por orientação'
            });
            sessao.windowMock.salvarAtendimentoChamado({ preventDefault: () => {} }, 2);

            // Situação 3: Chamado #CH-12 -> Pendente com justificativa (imagem SVG ausente no servidor externo)
            sessao = carregarSessaoNavegador({
                atendGabaritoItem: 'D',
                atendAreaItem: 'Ciências da Natureza e suas Tecnologias',
                atendExplicacaoItem: 'Para acender apenas L1 e L2 em paralelo, fecham-se S1 e S2.',
                atendProblema: 'A figura circuito_s1_s2_s3.svg retorna erro 404 no servidor de mídia externo (CDN).',
                atendSolucao: 'Justificativa de pendência: Solicitação aberta junto à equipe de Infraestrutura para restaurar o arquivo SVG.',
                atendVerificacao: 'Confirmamos a indisponibilidade da URL da imagem e validamos a análise teórica do gabarito D.',
                atendAutorInv: 'Mariana Souza',
                atendAutorInt: 'Carlos Eduardo',
                atendAutorVer: 'Ana Beatriz',
                atendSituacao: 'Pendente'
            });
            sessao.windowMock.salvarAtendimentoChamado({ preventDefault: () => {} }, 12);

            // Registra uma Ficha Individual no localStorage
            localStorageMock.setItem('recomplica_fichas_v1', JSON.stringify([
                {
                    id: 1,
                    estudante: 'Ana Beatriz',
                    chamadoId: 1,
                    chamadoCodigo: '#CH-01',
                    chamadoTitulo: 'Inconsistência no gabarito de questão sobre escala cartográfica',
                    oQueFez: 'Identifiquei a inversão entre 200 m e 2.000 m e ajustei o gabarito para C.',
                    comoVerificou: 'Multipliquei 8 cm por 25.000 e converti para metros dividindo por 100.',
                    dataHora: '04/11/2026 10:15:00'
                }
            ]));

            // Simula RECARREGAMENTO DA PÁGINA (nova sessão lendo do mesmo localStorage)
            const sessaoAposReload = carregarSessaoNavegador();
            const chamadosSalvos = JSON.parse(localStorageMock.getItem('recomplica_chamados_v1'));
            const ch01 = chamadosSalvos.find(c => c.id === 1);
            const ch02 = chamadosSalvos.find(c => c.id === 2);
            const ch12 = chamadosSalvos.find(c => c.id === 12);

            expect(ch01.situacao).toBe('Resolvido após correção');
            expect(ch01.questao.gabaritoCadastrado).toBe('C');
            expect(ch02.situacao).toBe('Resolvido por orientação');
            expect(ch12.situacao).toBe('Pendente');

            // Verifica histórico protegido (abertura + 3 atendimentos = 4 entradas)
            const historicoSalvo = JSON.parse(localStorageMock.getItem('recomplica_historico_v1'));
            expect(historicoSalvo.length).toBeGreaterThanOrEqual(4);

            // Testa exportação do Relatório HTML Imprimível e do Backup JSON
            sessaoAposReload.windowMock.exportarRelatorioHtmlImprimivel();
            sessaoAposReload.windowMock.exportarBackupJson();

            expect(exportedFiles).toHaveLength(2);
            const htmlExportado = exportedFiles[0].content;
            const jsonExportado = JSON.parse(exportedFiles[1].content);

            // Confere conteúdo do relatório HTML exportado
            expect(htmlExportado).toContain('Recomplica — Central de Resgate ENEM');
            expect(htmlExportado).toContain('Resolvido após correção');
            expect(htmlExportado).toContain('Resolvido por orientação');
            expect(htmlExportado).toContain('Pendente');
            expect(htmlExportado).toContain('Ana Beatriz');
            expect(htmlExportado).toContain('Carlos Eduardo');
            expect(htmlExportado).toContain('Mariana Souza');

            // Confere conteúdo do backup JSON exportado
            expect(jsonExportado.resumo.resolvidosCorrecao).toBe(1);
            expect(jsonExportado.resumo.resolvidosOrientacao).toBe(1);
            expect(jsonExportado.resumo.pendentes).toBe(1);
            expect(jsonExportado.resumo.concluidos).toBe(3);
            expect(jsonExportado.fichasIndividuais).toHaveLength(1);
        });
    });
});
