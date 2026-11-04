// ==========================================================================
// RECOMPLICA — CENTRAL DE RESGATE ENEM
// Controlador Principal da Aplicação (app.js)
// Unidade Curricular: Manutenção de Sistemas (SENAI)
// ==========================================================================

const STORAGE_KEYS = {
    EQUIPE: 'recomplica_equipe_v1',
    CHAMADOS: 'recomplica_chamados_v1',
    FICHAS: 'recomplica_fichas_v1',
    HISTORICO: 'recomplica_historico_v1'
};

// -------------------------------------------------------------------------
// 1. Banco Inicial dos 12 Chamados (8 Essenciais + 4 Aprofundamento)
// Questões e situações concretas do Simulado Recomplica (Formato ENEM)
// -------------------------------------------------------------------------
function obterChamadosIniciais() {
    return [
        // ================= 8 CHAMADOS ESSENCIAIS =================
        {
            id: 1,
            codigo: '#CH-01',
            nivel: 'Essencial',
            titulo: 'Gabarito divergente em questão de Escala Cartográfica',
            descricao: 'Estudantes relataram que a questão sobre distância real em mapa na escala 1:50.000 está marcando como correta a letra D (20 km), mas o cálculo correto resulta em 2 km (letra B).',
            areaConhecimento: 'Matemática e suas Tecnologias',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Matemática (Item MAT-104)',
                enunciado: 'Em um mapa turístico elaborado na escala 1 : 50.000, a distância em linha reta entre dois parques ecológicos mede exatamente 4 cm. Qual é a distância real, em quilômetros (km), entre esses dois parques?',
                alternativas: [
                    'A) 0,2 km',
                    'B) 2,0 km',
                    'C) 5,0 km',
                    'D) 20,0 km',
                    'E) 200,0 km'
                ],
                gabaritoCadastrado: 'D',
                areaCadastrada: 'Matemática e suas Tecnologias',
                explicacaoCadastrada: 'Multiplicando 4 cm por 50.000 obtemos 200.000 cm. Convertendo para quilômetros, temos 20 km.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 2,
            codigo: '#CH-02',
            nivel: 'Essencial',
            titulo: 'Dúvida de aluna em questão de Aumentos e Descontos Sucessivos',
            descricao: 'A estudante Mariana abriu chamado afirmando que a questão de porcentagem está errada: "Se um produto sobe 10% e depois tem desconto de 10%, ele deveria voltar ao preço original (0%), mas o sistema diz que caiu 1%!".',
            areaConhecimento: 'Matemática e suas Tecnologias',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Matemática (Item MAT-211)',
                enunciado: 'O preço de uma mochila escolar sofreu um reajuste de +10% em janeiro. Em fevereiro, a loja anunciou uma promoção aplicando um desconto de 10% sobre o preço vigente. Em relação ao preço original antes de janeiro, o valor final da mochila:',
                alternativas: [
                    'A) permaneceu exatamente igual ao valor inicial.',
                    'B) aumentou 1% em relação ao valor inicial.',
                    'C) diminuiu 1% em relação ao valor inicial.',
                    'D) diminuiu 2% em relação ao valor inicial.',
                    'E) aumentou 10% em relação ao valor inicial.'
                ],
                gabaritoCadastrado: 'C',
                areaCadastrada: 'Matemática e suas Tecnologias',
                explicacaoCadastrada: 'Adotando valor inicial 100: após aumento de 10%, passa a custar 110. O desconto de 10% incide sobre 110 (que é 11), resultando em 110 - 11 = 99. Portanto, redução de 1% em relação a 100.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 3,
            codigo: '#CH-03',
            nivel: 'Essencial',
            titulo: 'Questão de Física (Potência Elétrica) listada no caderno de Linguagens',
            descricao: 'Durante o simulado de Literatura e Língua Portuguesa, os estudantes se depararam com uma questão sobre corrente elétrica de um chuveiro. A classificação da área do conhecimento parece trocada.',
            areaConhecimento: 'Ciências da Natureza e suas Tecnologias',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Física (Item CNT-302)',
                enunciado: 'Um chuveiro elétrico residencial possui potência nominal de 4.400 W e foi projetado para operar sob uma tensão elétrica (ddp) de 220 V. Sabendo que P = U · i, qual é a intensidade da corrente elétrica que atravessa o aparelho em funcionamento normal?',
                alternativas: [
                    'A) 10 A',
                    'B) 15 A',
                    'C) 20 A',
                    'D) 25 A',
                    'E) 40 A'
                ],
                gabaritoCadastrado: 'C',
                areaCadastrada: 'Linguagens, Códigos e suas Tecnologias',
                explicacaoCadastrada: 'Pela relação P = U · i, temos 4.400 = 220 · i -> i = 4.400 / 220 = 20 A. Recomenda-se disjuntor compatível acima de 20 A.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 4,
            codigo: '#CH-04',
            nivel: 'Essencial',
            titulo: 'Explicação comentada cortada pela metade em questão de História',
            descricao: 'Após a atualização de ontem, a resolução comentada da questão sobre Industrialização na Era Vargas aparece cortada no meio da frase, deixando os alunos sem entender a justificativa.',
            areaConhecimento: 'Ciências Humanas e suas Tecnologias',
            prioridade: 'Média',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — História (Item CHT-118)',
                enunciado: 'Durante a década de 1940, o Estado brasileiro impulsionou a chamada industrialização de base sob o governo de Getúlio Vargas. Um marco decisivo desse modelo de substituição de importações foi:',
                alternativas: [
                    'A) a implantação da Companhia Siderúrgica Nacional (CSN) e da Companhia Vale do Rio Doce.',
                    'B) a abertura irrestrita às montadoras automobilísticas estrangeiras pelo Plano de Metas.',
                    'C) a privatização das empresas estatais de telecomunicações e energia elétrica.',
                    'D) a adoção exclusiva do modelo agroexportador cafeeiro sem intervenção estatal.',
                    'E) a criação da Zona Franca de Manaus como único polo metalúrgico nacional.'
                ],
                gabaritoCadastrado: 'A',
                areaCadastrada: 'Ciências Humanas e suas Tecnologias',
                explicacaoCadastrada: 'TEXTO TRUNCADO NA MIGRAÇÃO: A criação da CSN em Volta Redonda (RJ) representou...'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 5,
            codigo: '#CH-05',
            nivel: 'Essencial',
            titulo: 'Reclamação sobre Nível Trófico em questão de Ecologia',
            descricao: 'O aluno Pedro abriu chamado dizendo que o gabarito da questão de cadeia alimentar está errado: "O gafanhoto está na segunda posição da fila, então deveria ser consumidor secundário, e não consumidor primário!".',
            areaConhecimento: 'Ciências da Natureza e suas Tecnologias',
            prioridade: 'Média',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Biologia (Item CNT-409)',
                enunciado: 'Considere a seguinte cadeia alimentar terrestre observada em um campo nativo:\nCapim → Gafanhoto → Sapo → Serpente → Gavião.\nNessa relação ecológica, o gafanhoto atua especificamente como:',
                alternativas: [
                    'A) Produtor primário (1º nível trófico).',
                    'B) Consumidor primário (2º nível trófico).',
                    'C) Consumidor secundário (2º nível trófico).',
                    'D) Consumidor secundário (3º nível trófico).',
                    'E) Decompositor (nível final).'
                ],
                gabaritoCadastrado: 'B',
                areaCadastrada: 'Ciências da Natureza e suas Tecnologias',
                explicacaoCadastrada: 'O capim é o produtor (1º nível trófico). O gafanhoto, por se alimentar diretamente do produtor (herbívoro), é classificado como Consumidor Primário, ocupando o 2º nível trófico.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 6,
            codigo: '#CH-06',
            nivel: 'Essencial',
            titulo: 'Erro de conversão km/h para m/s no gabarito de Cinemática',
            descricao: 'Na questão do ônibus que percorre 180 km em 3 horas, o sistema cadastrou a alternativa E (216 m/s) como correta, pois multiplicou 60 por 3,6 em vez de dividir por 3,6.',
            areaConhecimento: 'Ciências da Natureza e suas Tecnologias',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Física (Item CNT-105)',
                enunciado: 'Um ônibus interestadual percorre uma distância de 180 km em um intervalo de tempo exato de 3 horas. Qual foi a velocidade escalar média desse ônibus expressa no Sistema Internacional de Unidades (em m/s)? (Use a relação 1 m/s = 3,6 km/h).',
                alternativas: [
                    'A) 16,7 m/s',
                    'B) 30,0 m/s',
                    'C) 50,0 m/s',
                    'D) 60,0 m/s',
                    'E) 216,0 m/s'
                ],
                gabaritoCadastrado: 'E',
                areaCadastrada: 'Ciências da Natureza e suas Tecnologias',
                explicacaoCadastrada: 'Calculamos Vm = 180 / 3 = 60 km/h. Para converter para m/s, multiplicamos 60 por 3,6 = 216 m/s.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 7,
            codigo: '#CH-07',
            nivel: 'Essencial',
            titulo: 'Explicação trocada em questão sobre Funções da Linguagem',
            descricao: 'A questão sobre um poema que explica como fazer poesia tem gabarito C (Função Metalinguística), mas a explicação comentada descreve a "Função Fática (teste do canal de comunicação)".',
            areaConhecimento: 'Linguagens, Códigos e suas Tecnologias',
            prioridade: 'Média',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Linguagens (Item LIN-208)',
                enunciado: 'Leia o trecho autoral:\n"Pegue a palavra, molde o verso com calma,\nEscolha a rima que traduz a própria língua,\nPois o poema nasce quando o verso explica o verso."\nPredomina nesse fragmento a função da linguagem denominada:',
                alternativas: [
                    'A) Função Apelativa ou Conativa.',
                    'B) Função Referencial ou Denotativa.',
                    'C) Função Metalinguística.',
                    'D) Função Fática.',
                    'E) Função Emotiva.'
                ],
                gabaritoCadastrado: 'C',
                areaCadastrada: 'Linguagens, Códigos e suas Tecnologias',
                explicacaoCadastrada: 'A alternativa C está correta porque a função fática testa o canal de comunicação com expressões como "Alô?" e "Certo?".'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 8,
            codigo: '#CH-08',
            nivel: 'Essencial',
            titulo: 'Prevenção de erro: teto da Competência 5 da Redação limitado a 100 pontos',
            descricao: 'Alerta preventivo da equipe pedagógica: no simulador de nota de Redação ENEM, a Competência 5 foi configurada com nota máxima de 100 pontos (deveria ser 200 pontos como as demais), impedindo nota máxima de 1.000.',
            areaConhecimento: 'Redação e Plataforma',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Módulo Simulador de Redação Recomplica (Configuração RED-001)',
                enunciado: 'Parâmetros atuais da Matriz de Correção da Redação na Recomplica:\n- Competência 1 (Norma-padrão): 0 a 200 pontos\n- Competência 2 (Tema e repertório): 0 a 200 pontos\n- Competência 3 (Projeto de texto): 0 a 200 pontos\n- Competência 4 (Coesão): 0 a 200 pontos\n- Competência 5 (Proposta de intervenção): 0 a 100 pontos [INCONSISTENTE — Total máximo travado em 900 pontos]',
                alternativas: [
                    'A) Manter teto total em 900 pontos',
                    'B) Ajustar Competência 5 para teto de 200 pontos (Total: 1.000 pontos)',
                    'C) Reduzir todas as competências para 100 pontos',
                    'D) Remover a Competência 5 do cálculo',
                    'E) Multiplicar a nota final por 2'
                ],
                gabaritoCadastrado: 'A',
                areaCadastrada: 'Redação e Plataforma',
                explicacaoCadastrada: 'Configuração atual: Teto da Competência 5 = 100 pontos (Soma máxima = 900 pontos).'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },

        // ================= 4 CHAMADOS DE APROFUNDAMENTO =================
        {
            id: 9,
            codigo: '#CH-09',
            nivel: 'Aprofundamento',
            titulo: 'Questionamento sobre Mediana vs. Média Aritmética em Estatística',
            descricao: 'Vários alunos abriram chamado afirmando que a resposta da questão de salários deveria ser R$ 5.000,00 (média), e não R$ 1.800,00 (mediana). Além disso, a explicação atual está muito resumida.',
            areaConhecimento: 'Matemática e suas Tecnologias',
            prioridade: 'Média',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Matemática (Item MAT-315)',
                enunciado: 'Em uma pequena startup de tecnologia, os salários mensais dos 5 colaboradores são:\nR$ 1.500,00 | R$ 1.500,00 | R$ 1.800,00 | R$ 2.000,00 | R$ 18.200,00.\nPara evitar a distorção causada pelo salário mais alto, o setor de RH decidiu divulgar a MEDIANA salarial da equipe, cujo valor é:',
                alternativas: [
                    'A) R$ 1.500,00',
                    'B) R$ 1.800,00',
                    'C) R$ 2.000,00',
                    'D) R$ 5.000,00',
                    'E) R$ 16.700,00'
                ],
                gabaritoCadastrado: 'B',
                areaCadastrada: 'Matemática e suas Tecnologias',
                explicacaoCadastrada: 'O valor central é R$ 1.800,00.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 10,
            codigo: '#CH-10',
            nivel: 'Aprofundamento',
            titulo: 'Questão de Fusos Horários sem arquivo de mapa vetorial do IBGE',
            descricao: 'A questão sobre fuso horário de Brasília (GMT-3) e Rio Branco (GMT-5) está com o cálculo correto no gabarito, mas a imagem "mapa_fusos_ibge_2026.svg" depende de envio pelo setor de Design Gráfico externo.',
            areaConhecimento: 'Ciências Humanas e suas Tecnologias',
            prioridade: 'Média',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Geografia (Item CHT-402)',
                enunciado: '[ERRO DE MÍDIA: Arquivo "mapa_fusos_ibge_2026.svg" não encontrado no servidor externo de Design]\nUma aula ao vivo da Recomplica começa exatamente às 14h00 pelo horário oficial de Brasília (GMT-3). Em que horário essa mesma transmissão se inicia, simultaneamente, em Rio Branco no Acre (GMT-5) e em Londres (GMT+0)?',
                alternativas: [
                    'A) 12h00 em Rio Branco e 11h00 em Londres.',
                    'B) 16h00 em Rio Branco e 17h00 em Londres.',
                    'C) 12h00 em Rio Branco e 17h00 em Londres.',
                    'D) 13h00 em Rio Branco e 16h00 em Londres.',
                    'E) 14h00 em Rio Branco e 17h00 em Londres.'
                ],
                gabaritoCadastrado: 'C',
                areaCadastrada: 'Ciências Humanas e suas Tecnologias',
                explicacaoCadastrada: 'Rio Branco (GMT-5) está 2 horas atrasado em relação a Brasília (GMT-3), logo 14h - 2h = 12h00. Londres (GMT+0) está 3 horas adiantado, logo 14h + 3h = 17h00.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 11,
            codigo: '#CH-11',
            nivel: 'Aprofundamento',
            titulo: 'Gabarito não preenchido em questão de Química (Lei de Lavoisier)',
            descricao: 'A questão sobre conservação das massas na reação de neutralização está com o campo de gabarito em branco ("-") após a importação de dados, impedindo a correção automática do caderno.',
            areaConhecimento: 'Ciências da Natureza e suas Tecnologias',
            prioridade: 'Alta',
            situacao: 'Disponível',
            questao: {
                referencia: 'Simulado Autoral Recomplica — Química (Item CNT-512)',
                enunciado: 'Em um experimento em sistema fechado, 36,5 g de ácido clorídrico (HCl) reagiram completamente com 40,0 g de hidróxido de sódio (NaOH), formando 58,5 g de cloreto de sódio (NaCl) e uma massa X de água (H2O). Pela Lei da Conservação das Massas de Lavoisier, qual é o valor de X?',
                alternativas: [
                    'A) 10,0 g',
                    'B) 14,5 g',
                    'C) 16,0 g',
                    'D) 18,0 g',
                    'E) 22,0 g'
                ],
                gabaritoCadastrado: '-',
                areaCadastrada: 'Ciências da Natureza e suas Tecnologias',
                explicacaoCadastrada: 'Pela Lei de Lavoisier, a soma das massas dos reagentes (36,5 g + 40,0 g = 76,5 g) é igual à soma das massas dos produtos (58,5 g + X). Logo, X = 76,5 - 58,5 = 18,0 g.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        },
        {
            id: 12,
            codigo: '#CH-12',
            nivel: 'Aprofundamento',
            titulo: 'Solicitação de modo de alto contraste e salvamento automático no Simulado',
            descricao: 'Estudantes com baixa visão solicitaram modo de alto contraste nas provas longas de Linguagens e relataram que o servidor de sessão desconecta após 30 minutos sem salvar o rascunho no banco central.',
            areaConhecimento: 'Redação e Plataforma',
            prioridade: 'Baixa',
            situacao: 'Disponível',
            questao: {
                referencia: 'Módulo de Acessibilidade e Sessão da Plataforma (Item PLAT-012)',
                enunciado: 'Diagnóstico Técnico de Infraestrutura:\n1) O contraste atual dos textos de apoio pode ser ajustado no guia de estilos.\n2) O salvamento automático de sessão em nuvem depende de liberação de endpoint pela equipe de Arquitetura de Back-end na próxima sprint.',
                alternativas: [
                    'A) Ignorar solicitação dos usuários',
                    'B) Documentar requisito e encaminhar dependência de Back-end com justificativa',
                    'C) Desativar o cronômetro de todos os simulados',
                    'D) Remover os textos de apoio das questões',
                    'E) Bloquear o acesso móvel'
                ],
                gabaritoCadastrado: 'B',
                areaCadastrada: 'Redação e Plataforma',
                explicacaoCadastrada: 'Requisito adaptativo/preventivo que envolve dependência externa de infraestrutura de sessão.'
            },
            atendimento: {
                problema: '',
                solucao: '',
                verificacao: '',
                responsaveis: '',
                autorInvestigacao: '',
                autorIntervencao: '',
                autorVerificacao: '',
                dataAtualizacao: ''
            }
        }
    ];
}

// -------------------------------------------------------------------------
// 2. Inicialização e Persistência no localStorage
// -------------------------------------------------------------------------
function inicializarDados() {
    if (!localStorage.getItem(STORAGE_KEYS.EQUIPE)) {
        const equipePadrao = {
            nomeEquipe: 'Equipe Alfa — Suporte Recomplica',
            turma: 'Técnico em Desenvolvimento de Sistemas',
            integrantes: ['Estudante 1', 'Estudante 2', 'Estudante 3']
        };
        localStorage.setItem(STORAGE_KEYS.EQUIPE, JSON.stringify(equipePadrao));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CHAMADOS)) {
        localStorage.setItem(STORAGE_KEYS.CHAMADOS, JSON.stringify(obterChamadosIniciais()));
    }

    if (!localStorage.getItem(STORAGE_KEYS.FICHAS)) {
        localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.HISTORICO)) {
        const historicoInicial = [
            {
                id: 1,
                dataHora: new Date().toLocaleString('pt-BR'),
                chamadoId: null,
                acao: 'Ambiente da Central de Resgate ENEM inicializado com 12 chamados (8 essenciais e 4 de aprofundamento).',
                situacaoAnterior: '-',
                situacaoNova: 'Disponível',
                responsaveis: 'Sistema Recomplica'
            }
        ];
        localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(historicoInicial));
    }
}

inicializarDados();

function getEquipe() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.EQUIPE)) || {
            nomeEquipe: 'Equipe Recomplica',
            turma: 'Desenvolvimento de Sistemas',
            integrantes: []
        };
    } catch (e) {
        return { nomeEquipe: 'Equipe Recomplica', turma: 'Desenvolvimento de Sistemas', integrantes: [] };
    }
}

function saveEquipe(equipe) {
    localStorage.setItem(STORAGE_KEYS.EQUIPE, JSON.stringify(equipe));
    atualizarBadgeEquipeHeader();
}

function getChamados() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAMADOS)) || obterChamadosIniciais();
    } catch (e) {
        return obterChamadosIniciais();
    }
}

function saveChamados(chamados) {
    localStorage.setItem(STORAGE_KEYS.CHAMADOS, JSON.stringify(chamados));
}

function getFichas() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.FICHAS)) || [];
    } catch (e) {
        return [];
    }
}

function saveFichas(fichas) {
    localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify(fichas));
}

function getHistorico() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO)) || [];
    } catch (e) {
        return [];
    }
}

function registrarNoHistorico(entrada) {
    const atual = getHistorico();
    const novo = typeof Validadores !== 'undefined'
        ? Validadores.adicionarEntradaHistorico(atual, entrada)
        : [...atual, { id: atual.length + 1, dataHora: new Date().toLocaleString('pt-BR'), ...entrada }];
    localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(novo));
    return novo;
}

// -------------------------------------------------------------------------
// 3. Utilitários Visuais (Header, Badges, Toast)
// -------------------------------------------------------------------------
function atualizarBadgeEquipeHeader() {
    const badgeEl = document.getElementById('headerTeamBadge');
    if (badgeEl) {
        const eq = getEquipe();
        const qtd = Array.isArray(eq.integrantes) ? eq.integrantes.length : 0;
        badgeEl.innerHTML = `👥 <strong>${escaparHtml(eq.nomeEquipe)}</strong> (${qtd} integrante${qtd === 1 ? '' : 's'})`;
    }
}

function escaparHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function obterClasseBadgeSituacao(situacao) {
    switch (situacao) {
        case 'Disponível': return 'badge badge-disponivel';
        case 'Em atendimento': return 'badge badge-atendimento';
        case 'Resolvido após correção': return 'badge badge-resolvido-correcao';
        case 'Resolvido por orientação': return 'badge badge-resolvido-orientacao';
        case 'Pendente': return 'badge badge-pendente';
        default: return 'badge badge-disponivel';
    }
}

function obterClasseBadgeArea(area) {
    const a = (area || '').toLowerCase();
    if (a.includes('matemática')) return 'badge badge-matematica';
    if (a.includes('natureza')) return 'badge badge-natureza';
    if (a.includes('humanas')) return 'badge badge-humanas';
    if (a.includes('linguagens')) return 'badge badge-linguagens';
    return 'badge badge-redacao';
}

function obterClassePrioridade(prio) {
    if (prio === 'Alta') return 'prio-alta';
    if (prio === 'Média') return 'prio-media';
    return 'prio-baixa';
}

function exibirToast(mensagem) {
    const antigo = document.getElementById('recomplicaToast');
    if (antigo) antigo.remove();

    const toast = document.createElement('div');
    toast.id = 'recomplicaToast';
    toast.className = 'toast-feedback';
    toast.innerHTML = `<span>✅</span> <span>${escaparHtml(mensagem)}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) toast.remove();
    }, 4000);
}

// -------------------------------------------------------------------------
// 4. Atendimento de Chamados (Modal de Investigação, Correção e Verificação)
// -------------------------------------------------------------------------
window.abrirModalAtendimento = function (id) {
    const chamados = getChamados();
    const c = chamados.find(item => item.id === Number(id));
    if (!c) return;

    window.fecharModalAtendimento();

    const equipe = getEquipe();
    const integrantes = Array.isArray(equipe.integrantes) ? equipe.integrantes : [];
    const datalistOptions = integrantes.map(nome => `<option value="${escaparHtml(nome)}">`).join('');

    const historicoChamado = getHistorico().filter(h => Number(h.chamadoId) === Number(c.id));

    const overlay = document.createElement('div');
    overlay.id = 'modalAtendimentoChamado';
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) fecharModalAtendimento();
    };

    const q = c.questao || {};
    const at = c.atendimento || {};

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <div>
                    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
                        <span class="badge ${c.nivel === 'Essencial' ? 'badge-essencial' : 'badge-aprofundamento'}">${c.codigo} • ${c.nivel}</span>
                        <span class="${obterClasseBadgeArea(c.areaConhecimento)}">${escaparHtml(c.areaConhecimento)}</span>
                        <span class="${obterClasseBadgeSituacao(c.situacao)}">${escaparHtml(c.situacao)}</span>
                    </div>
                    <h3>${escaparHtml(c.titulo)}</h3>
                </div>
                <button class="modal-close-btn" onclick="fecharModalAtendimento()" title="Fechar">&times;</button>
            </div>

            <!-- Relato do Estudante/Usuário -->
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; padding: 0.85rem 1rem; border-radius: 6px; margin-bottom: 1.15rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: #b45309; text-transform: uppercase; margin-bottom: 0.2rem;">
                    💬 Relato Recebido na Central Recomplica (Prioridade ${escaparHtml(c.prioridade)})
                </div>
                <p style="font-size: 0.9rem; color: #78350f; margin: 0;">${escaparHtml(c.descricao)}</p>
            </div>

            <!-- Questão ou Situação Concreta no Banco da Recomplica -->
            <div class="enem-question-box">
                <div class="enem-question-header">
                    <span>📚 Item Associado no Sistema: ${escaparHtml(q.referencia || '')}</span>
                    <span>Área Cadastrada: <strong id="previewAreaCadastrada">${escaparHtml(q.areaCadastrada || c.areaConhecimento)}</strong></span>
                </div>
                <div class="enem-enunciado">${escaparHtml(q.enunciado || '')}</div>
                <ul class="enem-alternativas">
                    ${(q.alternativas || []).map(alt => `<li>${escaparHtml(alt)}</li>`).join('')}
                </ul>

                <!-- Painel de Configuração da Questão (Permite corrigir gabarito, área ou explicação quando houver erro) -->
                <div class="enem-config-panel">
                    <h5>⚙️ Configuração Atual do Item na Plataforma (Ajuste se houver erro no sistema)</h5>
                    <div class="grid-2">
                        <div class="form-group" style="margin-bottom: 0.65rem;">
                            <label for="atendGabaritoItem">Gabarito Cadastrado no Sistema:</label>
                            <select id="atendGabaritoItem">
                                <option value="-" ${q.gabaritoCadastrado === '-' ? 'selected' : ''}>- (Não definido / Em branco)</option>
                                <option value="A" ${q.gabaritoCadastrado === 'A' ? 'selected' : ''}>Alternativa A</option>
                                <option value="B" ${q.gabaritoCadastrado === 'B' ? 'selected' : ''}>Alternativa B</option>
                                <option value="C" ${q.gabaritoCadastrado === 'C' ? 'selected' : ''}>Alternativa C</option>
                                <option value="D" ${q.gabaritoCadastrado === 'D' ? 'selected' : ''}>Alternativa D</option>
                                <option value="E" ${q.gabaritoCadastrado === 'E' ? 'selected' : ''}>Alternativa E</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 0.65rem;">
                            <label for="atendAreaItem">Área do Conhecimento Cadastrada:</label>
                            <select id="atendAreaItem">
                                <option value="Matemática e suas Tecnologias" ${q.areaCadastrada === 'Matemática e suas Tecnologias' ? 'selected' : ''}>Matemática e suas Tecnologias</option>
                                <option value="Ciências da Natureza e suas Tecnologias" ${q.areaCadastrada === 'Ciências da Natureza e suas Tecnologias' ? 'selected' : ''}>Ciências da Natureza e suas Tecnologias</option>
                                <option value="Ciências Humanas e suas Tecnologias" ${q.areaCadastrada === 'Ciências Humanas e suas Tecnologias' ? 'selected' : ''}>Ciências Humanas e suas Tecnologias</option>
                                <option value="Linguagens, Códigos e suas Tecnologias" ${q.areaCadastrada === 'Linguagens, Códigos e suas Tecnologias' ? 'selected' : ''}>Linguagens, Códigos e suas Tecnologias</option>
                                <option value="Redação e Plataforma" ${q.areaCadastrada === 'Redação e Plataforma' ? 'selected' : ''}>Redação e Plataforma</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="atendExplicacaoItem">Explicação / Parâmetro Cadastrado na Questão:</label>
                        <textarea id="atendExplicacaoItem" rows="2">${escaparHtml(q.explicacaoCadastrada || '')}</textarea>
                    </div>
                </div>
            </div>

            <!-- Formulário de Registro das 4 Informações Principais do Atendimento -->
            <form id="formAtendimentoChamado" onsubmit="salvarAtendimentoChamado(event, ${c.id})">
                <div id="erroAtendimentoAlert" style="display:none; background:#fee2e2; color:#991b1b; padding:0.75rem 1rem; border-radius:6px; margin-bottom:1rem; font-size:0.88rem; border:1px solid #fca5a5;"></div>

                <h4 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.85rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.35rem;">
                    📝 Registro Técnico do Atendimento (4 Informações Principais)
                </h4>

                <div class="form-group">
                    <label for="atendProblema">1. Problema: O que foi identificado na investigação? <span class="required-mark">*</span></label>
                    <textarea id="atendProblema" rows="2" placeholder="Descreva se há um erro real no gabarito/explicação/classificação ou se a questão está correta e trata-se de dúvida conceitual do usuário...">${escaparHtml(at.problema || '')}</textarea>
                </div>

                <div class="form-group">
                    <label for="atendSolucao">2. Solução: O que foi corrigido, orientado ao usuário ou justificativa de pendência? <span class="required-mark">*</span></label>
                    <textarea id="atendSolucao" rows="2" placeholder="Descreva a correção aplicada no item, a resposta pedagógica de orientação ao aluno ou o motivo técnico caso fique Pendente...">${escaparHtml(at.solucao || '')}</textarea>
                </div>

                <div class="form-group">
                    <label for="atendVerificacao">3. Verificação: Como a equipe conferiu e testou o resultado? <span class="required-mark">*</span></label>
                    <textarea id="atendVerificacao" rows="2" placeholder="Explique como vocês validaram o cálculo, a regra do ENEM ou a exibição correta na plataforma...">${escaparHtml(at.verificacao || '')}</textarea>
                </div>

                <!-- 4. Responsáveis e Autoria por Etapa -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 6px; margin-bottom: 1.15rem;">
                    <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:0.6rem; color:#0f172a;">
                        4. Responsáveis (Autoria da Equipe por Etapa) <span class="required-mark">*</span>
                    </label>
                    <datalist id="listaIntegrantesEquipe">${datalistOptions}</datalist>
                    <div class="grid-3">
                        <div class="form-group" style="margin-bottom: 0;">
                            <label for="atendAutorInv" style="font-size:0.8rem;">🔎 Investigação:</label>
                            <input type="text" id="atendAutorInv" list="listaIntegrantesEquipe" placeholder="Nome do integrante" value="${escaparHtml(at.autorInvestigacao || '')}">
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <label for="atendAutorInt" style="font-size:0.8rem;">🛠️ Intervenção / Orientação:</label>
                            <input type="text" id="atendAutorInt" list="listaIntegrantesEquipe" placeholder="Nome do integrante" value="${escaparHtml(at.autorIntervencao || '')}">
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <label for="atendAutorVer" style="font-size:0.8rem;">✅ Verificação / Teste:</label>
                            <input type="text" id="atendAutorVer" list="listaIntegrantesEquipe" placeholder="Nome do integrante" value="${escaparHtml(at.autorVerificacao || '')}">
                        </div>
                    </div>
                    <div class="form-help" style="margin-top: 0.45rem;">
                        Dica: Selecione os nomes cadastrados na equipe ou digite os responsáveis de cada etapa.
                    </div>
                </div>

                <!-- Resultado / Situação do Chamado -->
                <div class="form-group">
                    <label for="atendSituacao">Resultado do Atendimento (Situação do Chamado) <span class="required-mark">*</span></label>
                    <select id="atendSituacao" style="font-weight: 700;">
                        <option value="Em atendimento" ${c.situacao === 'Em atendimento' ? 'selected' : ''}>⏳ Em atendimento (Salvar andamento parcial)</option>
                        <option value="Resolvido após correção" ${c.situacao === 'Resolvido após correção' ? 'selected' : ''}>✅ Resolvido após correção (Houve ajuste de gabarito, texto ou classificação)</option>
                        <option value="Resolvido por orientação" ${c.situacao === 'Resolvido por orientação' ? 'selected' : ''}>💡 Resolvido por orientação (Não havia erro no sistema; usuário orientado)</option>
                        <option value="Pendente" ${c.situacao === 'Pendente' ? 'selected' : ''}>⚠️ Pendente, com justificativa (Depende de fator externo documentado)</option>
                    </select>
                </div>

                ${historicoChamado.length > 0 ? `
                <div style="margin-bottom: 1.15rem;">
                    <label style="display:block; font-weight:600; font-size:0.82rem; color:#475569; margin-bottom:0.35rem;">
                        🔒 Histórico de Alterações deste Chamado (Registro Protegido)
                    </label>
                    <div class="history-log">
                        ${historicoChamado.map(h => `
                            <div class="history-item">
                                <strong>[${escaparHtml(h.dataHora)}]</strong> ${escaparHtml(h.situacaoAnterior)} &rarr; <strong>${escaparHtml(h.situacaoNova)}</strong>
                                — <em>${escaparHtml(h.acao)}</em> (${escaparHtml(h.responsaveis)})
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.25rem;">
                    <button type="button" class="btn btn-secondary" onclick="fecharModalAtendimento()">Cancelar</button>
                    <button type="submit" class="btn">💾 Salvar Atendimento</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);
};

window.fecharModalAtendimento = function () {
    const modal = document.getElementById('modalAtendimentoChamado');
    if (modal) modal.remove();
};

window.salvarAtendimentoChamado = function (event, id) {
    event.preventDefault();

    const gabaritoNovo = document.getElementById('atendGabaritoItem').value;
    const areaNova = document.getElementById('atendAreaItem').value;
    const explicacaoNova = document.getElementById('atendExplicacaoItem').value.trim();

    const problema = document.getElementById('atendProblema').value.trim();
    const solucao = document.getElementById('atendSolucao').value.trim();
    const verificacao = document.getElementById('atendVerificacao').value.trim();

    const autorInv = document.getElementById('atendAutorInv').value.trim();
    const autorInt = document.getElementById('atendAutorInt').value.trim();
    const autorVer = document.getElementById('atendAutorVer').value.trim();
    const situacaoNova = document.getElementById('atendSituacao').value;

    const partesResponsaveis = [];
    if (autorInv) partesResponsaveis.push(`Investigação: ${autorInv}`);
    if (autorInt) partesResponsaveis.push(`Intervenção: ${autorInt}`);
    if (autorVer) partesResponsaveis.push(`Verificação: ${autorVer}`);
    const responsaveisConsolidados = partesResponsaveis.join(' | ');

    const validacao = typeof Validadores !== 'undefined'
        ? Validadores.validarRegistroAtendimento({
            situacao: situacaoNova,
            problema,
            solucao,
            verificacao,
            responsaveis: responsaveisConsolidados
        })
        : { valido: true, erros: [] };

    const alertEl = document.getElementById('erroAtendimentoAlert');
    if (!validacao.valido) {
        if (alertEl) {
            alertEl.innerHTML = `<strong>Atenção:</strong><ul style="margin: 0.35rem 0 0 1.2rem;">${validacao.erros.map(e => `<li>${escaparHtml(e)}</li>`).join('')}</ul>`;
            alertEl.style.display = 'block';
        }
        return;
    }

    const chamados = getChamados();
    const idx = chamados.findIndex(c => c.id === Number(id));
    if (idx === -1) return;

    const situacaoAnterior = chamados[idx].situacao;
    const dataAgora = new Date().toLocaleString('pt-BR');

    // Atualiza configurações da questão caso a equipe tenha corrigido gabarito, área ou explicação
    chamados[idx].questao.gabaritoCadastrado = gabaritoNovo;
    chamados[idx].questao.areaCadastrada = areaNova;
    chamados[idx].questao.explicacaoCadastrada = explicacaoNova;
    chamados[idx].areaConhecimento = areaNova;

    // Atualiza dados do atendimento
    chamados[idx].situacao = situacaoNova;
    chamados[idx].atendimento = {
        problema,
        solucao,
        verificacao,
        responsaveis: responsaveisConsolidados || 'Equipe',
        autorInvestigacao: autorInv,
        autorIntervencao: autorInt,
        autorVerificacao: autorVer,
        dataAtualizacao: dataAgora
    };

    saveChamados(chamados);

    // Registra no histórico imutável
    registrarNoHistorico({
        chamadoId: chamados[idx].id,
        acao: `${chamados[idx].codigo}: ${problema.substring(0, 70)}${problema.length > 70 ? '...' : ''}`,
        situacaoAnterior,
        situacaoNova,
        responsaveis: responsaveisConsolidados || 'Equipe'
    });

    window.fecharModalAtendimento();
    exibirToast(`Chamado ${chamados[idx].codigo} salvo como "${situacaoNova}"!`);

    window.dispatchEvent(new CustomEvent('recomplicaDadosAtualizados'));
};

// -------------------------------------------------------------------------
// 5. Exportação de Relatório HTML Imprimível (PDF) e Backup JSON
// -------------------------------------------------------------------------
window.exportarBackupJson = function () {
    const payload = {
        sistema: 'Recomplica — Central de Resgate ENEM',
        versao: '1.0.0',
        dataExportacao: new Date().toLocaleString('pt-BR'),
        equipe: getEquipe(),
        resumo: typeof Validadores !== 'undefined' ? Validadores.calcularResumoEquipe(getChamados()) : {},
        chamados: getChamados(),
        fichasIndividuais: getFichas(),
        historicoAlteracoes: getHistorico()
    };

    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const nomeEq = (payload.equipe.nomeEquipe || 'equipe').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    a.download = `backup_recomplica_${nomeEq}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    exibirToast('Backup JSON exportado com sucesso!');
};

window.exportarRelatorioHtmlImprimivel = function () {
    const equipe = getEquipe();
    const chamados = getChamados();
    const fichas = getFichas();
    const historico = getHistorico();
    const resumo = typeof Validadores !== 'undefined'
        ? Validadores.calcularResumoEquipe(chamados)
        : { total: 12, disponiveis: 0, emAtendimento: 0, resolvidosTotal: 0, resolvidosCorrecao: 0, resolvidosOrientacao: 0, pendentes: 0, percentualProgresso: 0 };

    const dataGeracao = new Date().toLocaleString('pt-BR');

    const linhasChamados = chamados.map(c => {
        const at = c.atendimento || {};
        return `
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 14px; page-break-inside: avoid;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #e2e8f0; padding-bottom:6px; margin-bottom:8px;">
                    <strong>${escaparHtml(c.codigo)} (${escaparHtml(c.nivel)}) — ${escaparHtml(c.titulo)}</strong>
                    <span><strong>Situação:</strong> ${escaparHtml(c.situacao)}</span>
                </div>
                <div style="font-size: 13px; color: #334155; margin-bottom: 6px;">
                    <strong>Área:</strong> ${escaparHtml(c.areaConhecimento)} |
                    <strong>Prioridade:</strong> ${escaparHtml(c.prioridade)} |
                    <strong>Gabarito no Sistema:</strong> ${escaparHtml(c.questao?.gabaritoCadastrado || '-')}
                </div>
                <div style="font-size: 13px; margin-bottom: 4px;"><strong>1. Problema Identificado:</strong> ${escaparHtml(at.problema || 'Não registrado')}</div>
                <div style="font-size: 13px; margin-bottom: 4px;"><strong>2. Solução / Orientação / Justificativa:</strong> ${escaparHtml(at.solucao || 'Não registrado')}</div>
                <div style="font-size: 13px; margin-bottom: 4px;"><strong>3. Verificação Realizada:</strong> ${escaparHtml(at.verificacao || 'Não registrado')}</div>
                <div style="font-size: 13px; color: #0f766e;"><strong>4. Responsáveis (Autoria):</strong> ${escaparHtml(at.responsaveis || 'Não informado')} ${at.dataAtualizacao ? `(${escaparHtml(at.dataAtualizacao)})` : ''}</div>
            </div>
        `;
    }).join('');

    const linhasFichas = fichas.length > 0
        ? fichas.map(f => `
            <tr>
                <td><strong>${escaparHtml(f.estudante)}</strong></td>
                <td>${escaparHtml(f.chamadoCodigo)} — ${escaparHtml(f.chamadoTitulo)}</td>
                <td>${escaparHtml(f.oQueFez)}</td>
                <td>${escaparHtml(f.comoVerificou)}</td>
                <td>${escaparHtml(f.dataHora)}</td>
            </tr>
        `).join('')
        : `<tr><td colspan="5" style="text-align:center;">Nenhuma ficha individual registrada até o momento.</td></tr>`;

    const htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Entrega — Recomplica ENEM (${escaparHtml(equipe.nomeEquipe)})</title>
    <style>
        body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; color: #0f172a; margin: 24px; line-height: 1.5; }
        h1 { color: #0f766e; font-size: 22px; margin-bottom: 4px; }
        h2 { color: #1e293b; font-size: 17px; border-bottom: 2px solid #0f766e; padding-bottom: 4px; margin-top: 24px; }
        .header-box { background: #f0fdfa; border: 1px solid #99f6e4; padding: 16px; border-radius: 8px; margin-bottom: 20px; }
        .stats-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .stat-pill { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; border-radius: 6px; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; vertical-align: top; }
        th { background: #f1f5f9; }
        .print-btn { background: #0d9488; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-bottom: 16px; }
        @media print { .print-btn { display: none; } body { margin: 0; } }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Imprimir ou Salvar como PDF</button>

    <div class="header-box">
        <h1>Recomplica — Central de Resgate ENEM (Relatório de Avaliação)</h1>
        <div><strong>Unidade Curricular:</strong> Manutenção de Sistemas — SENAI</div>
        <div><strong>Equipe:</strong> ${escaparHtml(equipe.nomeEquipe)} | <strong>Turma:</strong> ${escaparHtml(equipe.turma)}</div>
        <div><strong>Integrantes Cadastrados:</strong> ${escaparHtml((equipe.integrantes || []).join(', ') || 'Não informados')}</div>
        <div><strong>Data/Hora de Geração:</strong> ${escaparHtml(dataGeracao)}</div>
    </div>

    <h2>1. Resumo de Progresso da Equipe</h2>
    <div class="stats-row">
        <div class="stat-pill"><strong>Progresso Geral:</strong> ${resumo.percentualProgresso}% (${resumo.concluidos}/${resumo.total})</div>
        <div class="stat-pill"><strong>Resolvidos por Correção:</strong> ${resumo.resolvidosCorrecao}</div>
        <div class="stat-pill"><strong>Resolvidos por Orientação:</strong> ${resumo.resolvidosOrientacao}</div>
        <div class="stat-pill"><strong>Pendentes Justificados:</strong> ${resumo.pendentes}</div>
        <div class="stat-pill"><strong>Em Atendimento:</strong> ${resumo.emAtendimento}</div>
        <div class="stat-pill"><strong>Disponíveis:</strong> ${resumo.disponiveis}</div>
    </div>

    <h2>2. Registros Técnicos dos 12 Chamados e Autoria Coletiva</h2>
    ${linhasChamados}

    <h2>3. Fichas Individuais dos Estudantes (Contribuição Individual)</h2>
    <table>
        <thead>
            <tr>
                <th>Estudante</th>
                <th>Chamado Atendido</th>
                <th>O que você fez?</th>
                <th>Como verificou ou justificou a solução?</th>
                <th>Data/Hora</th>
            </tr>
        </thead>
        <tbody>
            ${linhasFichas}
        </tbody>
    </table>

    <h2>4. Trilha de Auditoria e Histórico de Alterações (${historico.length} registros)</h2>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Data/Hora</th>
                <th>Transição</th>
                <th>Ação Registrada</th>
                <th>Responsáveis</th>
            </tr>
        </thead>
        <tbody>
            ${historico.map(h => `
                <tr>
                    <td>${h.id}</td>
                    <td>${escaparHtml(h.dataHora)}</td>
                    <td>${escaparHtml(h.situacaoAnterior)} &rarr; ${escaparHtml(h.situacaoNova)}</td>
                    <td>${escaparHtml(h.acao)}</td>
                    <td>${escaparHtml(h.responsaveis)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const nomeEq = (equipe.nomeEquipe || 'equipe').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    a.download = `relatorio_recomplica_${nomeEq}_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    exibirToast('Relatório HTML imprimível gerado! Abra o arquivo para imprimir ou salvar como PDF.');
};

// -------------------------------------------------------------------------
// 6. Inicialização das Telas ao Carregar o DOM
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    atualizarBadgeEquipeHeader();

    // =====================================================================
    // TELA 1: IDENTIFICAÇÃO DA EQUIPE (index.html)
    // =====================================================================
    const formEquipe = document.getElementById('formIdentificacaoEquipe');
    if (formEquipe) {
        const inputNomeEquipe = document.getElementById('inputNomeEquipe');
        const inputTurma = document.getElementById('inputTurma');
        const inputNovoIntegrante = document.getElementById('inputNovoIntegrante');
        const btnAddIntegrante = document.getElementById('btnAddIntegrante');
        const containerIntegrantes = document.getElementById('listaIntegrantesTags');

        let equipeAtual = getEquipe();
        if (inputNomeEquipe) inputNomeEquipe.value = equipeAtual.nomeEquipe || '';
        if (inputTurma) inputTurma.value = equipeAtual.turma || '';

        const renderIntegrantes = () => {
            if (!containerIntegrantes) return;
            containerIntegrantes.innerHTML = '';
            (equipeAtual.integrantes || []).forEach((nome, idx) => {
                const span = document.createElement('span');
                span.className = 'member-pill';
                span.innerHTML = `👤 ${escaparHtml(nome)} <button type="button" data-idx="${idx}" title="Remover integrante">&times;</button>`;
                containerIntegrantes.appendChild(span);
            });

            containerIntegrantes.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const i = Number(btn.getAttribute('data-idx'));
                    equipeAtual.integrantes.splice(i, 1);
                    saveEquipe(equipeAtual);
                    renderIntegrantes();
                });
            });
        };

        renderIntegrantes();

        if (btnAddIntegrante && inputNovoIntegrante) {
            const adicionarMembro = () => {
                const nome = inputNovoIntegrante.value.trim();
                if (!nome) return;
                if (!equipeAtual.integrantes.includes(nome)) {
                    equipeAtual.integrantes.push(nome);
                    saveEquipe(equipeAtual);
                    renderIntegrantes();
                }
                inputNovoIntegrante.value = '';
                inputNovoIntegrante.focus();
            };

            btnAddIntegrante.addEventListener('click', adicionarMembro);
            inputNovoIntegrante.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') {
                    ev.preventDefault();
                    adicionarMembro();
                }
            });
        }

        formEquipe.addEventListener('submit', (e) => {
            e.preventDefault();
            equipeAtual.nomeEquipe = (inputNomeEquipe.value || '').trim() || 'Equipe Recomplica';
            equipeAtual.turma = (inputTurma.value || '').trim() || 'Técnico em Desenvolvimento de Sistemas';

            if (inputNovoIntegrante && inputNovoIntegrante.value.trim()) {
                equipeAtual.integrantes.push(inputNovoIntegrante.value.trim());
                inputNovoIntegrante.value = '';
            }

            if (equipeAtual.integrantes.length === 0) {
                alert('Cadastre pelo menos 1 integrante na equipe para registrar a autoria dos atendimentos.');
                return;
            }

            saveEquipe(equipeAtual);
            registrarNoHistorico({
                chamadoId: null,
                acao: `Equipe "${equipeAtual.nomeEquipe}" configurada com ${equipeAtual.integrantes.length} integrante(s): ${equipeAtual.integrantes.join(', ')}.`,
                situacaoAnterior: '-',
                situacaoNova: 'Ativa',
                responsaveis: equipeAtual.nomeEquipe
            });

            window.location.href = 'dashboard.html';
        });
    }

    // =====================================================================
    // TELA 2: PAINEL INICIAL (dashboard.html)
    // =====================================================================
    const painelStats = document.getElementById('painelInicialStats');
    if (painelStats) {
        const atualizarPainel = () => {
            const chamados = getChamados();
            const fichas = getFichas();
            const equipe = getEquipe();
            const resumo = typeof Validadores !== 'undefined'
                ? Validadores.calcularResumoEquipe(chamados)
                : { disponiveis: 0, emAtendimento: 0, resolvidosTotal: 0, resolvidosCorrecao: 0, resolvidosOrientacao: 0, pendentes: 0, percentualProgresso: 0, concluidos: 0, total: 12, essenciaisConcluidos: 0, aprofundamentoConcluidos: 0 };

            const setTxt = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            };

            setTxt('statDisponiveis', resumo.disponiveis);
            setTxt('statEmAtendimento', resumo.emAtendimento);
            setTxt('statResolvidos', resumo.resolvidosTotal);
            setTxt('statResolvidosDetalhe', `${resumo.resolvidosCorrecao} por correção • ${resumo.resolvidosOrientacao} por orientação`);
            setTxt('statPendentes', resumo.pendentes);

            setTxt('progressoPercentual', `${resumo.percentualProgresso}%`);
            setTxt('progressoContagem', `${resumo.concluidos} de ${resumo.total} chamados finalizados`);
            setTxt('progressoEssenciais', `${resumo.essenciaisConcluidos} / 8`);
            setTxt('progressoAprofundamento', `${resumo.aprofundamentoConcluidos} / 4`);
            setTxt('progressoFichas', `${fichas.length} preenchida(s)`);

            const barFill = document.getElementById('progressoBarraFill');
            if (barFill) {
                barFill.style.width = `${resumo.percentualProgresso}%`;
            }

            const nomeEquipePainel = document.getElementById('painelNomeEquipe');
            const integrantesPainel = document.getElementById('painelListaIntegrantes');
            if (nomeEquipePainel) nomeEquipePainel.textContent = `${equipe.nomeEquipe} (${equipe.turma})`;
            if (integrantesPainel) {
                integrantesPainel.innerHTML = (equipe.integrantes || [])
                    .map(n => `<span class="member-pill">👤 ${escaparHtml(n)}</span>`)
                    .join(' ');
            }
        };

        atualizarPainel();
        window.addEventListener('recomplicaDadosAtualizados', atualizarPainel);
    }

    // =====================================================================
    // TELA 3: FILA DE 12 CHAMADOS (consulta.html)
    // =====================================================================
    const tabelaChamadosBody = document.getElementById('tabelaChamadosBody');
    if (tabelaChamadosBody) {
        const inputBusca = document.getElementById('filtroBusca');
        const selectSituacao = document.getElementById('filtroSituacao');
        const selectArea = document.getElementById('filtroArea');
        const selectNivel = document.getElementById('filtroNivel');

        const renderizarFila = () => {
            let lista = getChamados();
            const termo = inputBusca ? inputBusca.value.trim().toLowerCase() : '';
            const sitF = selectSituacao ? selectSituacao.value : '';
            const areaF = selectArea ? selectArea.value : '';
            const nivelF = selectNivel ? selectNivel.value : '';

            if (termo) {
                lista = lista.filter(c =>
                    (c.titulo || '').toLowerCase().includes(termo) ||
                    (c.descricao || '').toLowerCase().includes(termo) ||
                    (c.codigo || '').toLowerCase().includes(termo)
                );
            }
            if (sitF) {
                if (sitF === 'Resolvidos') {
                    lista = lista.filter(c => c.situacao === 'Resolvido após correção' || c.situacao === 'Resolvido por orientação');
                } else {
                    lista = lista.filter(c => c.situacao === sitF);
                }
            }
            if (areaF) {
                lista = lista.filter(c => c.areaConhecimento === areaF);
            }
            if (nivelF) {
                lista = lista.filter(c => c.nivel === nivelF);
            }

            tabelaChamadosBody.innerHTML = '';

            if (lista.length === 0) {
                tabelaChamadosBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#64748b;">Nenhum chamado encontrado para os filtros selecionados.</td></tr>`;
                return;
            }

            lista.forEach(c => {
                const tr = document.createElement('tr');
                const at = c.atendimento || {};
                const temRegistro = Boolean(at.problema || at.solucao);

                tr.innerHTML = `
                    <td>
                        <strong>${escaparHtml(c.codigo)}</strong>
                        <div style="margin-top:0.2rem;">
                            <span class="badge ${c.nivel === 'Essencial' ? 'badge-essencial' : 'badge-aprofundamento'}">${escaparHtml(c.nivel)}</span>
                        </div>
                    </td>
                    <td>
                        <div style="font-weight: 700; color: #0f172a; margin-bottom: 0.2rem;">${escaparHtml(c.titulo)}</div>
                        <div style="font-size: 0.82rem; color: #475569;">${escaparHtml(c.descricao.substring(0, 95))}${c.descricao.length > 95 ? '...' : ''}</div>
                        ${temRegistro ? `<div style="font-size: 0.76rem; color: #0f766e; margin-top: 0.25rem;">👥 Resp: ${escaparHtml(at.responsaveis || 'Equipe')}</div>` : ''}
                    </td>
                    <td><span class="${obterClasseBadgeArea(c.areaConhecimento)}">${escaparHtml(c.areaConhecimento)}</span></td>
                    <td><span class="${obterClassePrioridade(c.prioridade)}">${escaparHtml(c.prioridade)}</span></td>
                    <td><span class="${obterClasseBadgeSituacao(c.situacao)}">${escaparHtml(c.situacao)}</span></td>
                    <td>
                        <button type="button" class="btn btn-sm" onclick="abrirModalAtendimento(${c.id})">
                            🛠️ ${c.situacao === 'Disponível' ? 'Atender' : 'Ver / Editar Atendimento'}
                        </button>
                    </td>
                `;
                tabelaChamadosBody.appendChild(tr);
            });
        };

        if (inputBusca) inputBusca.addEventListener('input', renderizarFila);
        if (selectSituacao) selectSituacao.addEventListener('change', renderizarFila);
        if (selectArea) selectArea.addEventListener('change', renderizarFila);
        if (selectNivel) selectNivel.addEventListener('change', renderizarFila);

        renderizarFila();
        window.addEventListener('recomplicaDadosAtualizados', renderizarFila);
    }

    // =====================================================================
    // TELA 4: FICHA INDIVIDUAL (ficha.html)
    // =====================================================================
    const formFicha = document.getElementById('formFichaIndividual');
    if (formFicha) {
        const selectEstudante = document.getElementById('fichaEstudante');
        const selectChamado = document.getElementById('fichaChamadoId');
        const txtOQueFez = document.getElementById('fichaOQueFez');
        const txtComoVerificou = document.getElementById('fichaComoVerificou');
        const alertErroFicha = document.getElementById('erroFichaAlert');
        const tbodyFichas = document.getElementById('tabelaFichasBody');

        const popularSeletoresFicha = () => {
            const equipe = getEquipe();
            const chamados = getChamados();

            if (selectEstudante) {
                const opcoesMembros = (equipe.integrantes || []).map(nome =>
                    `<option value="${escaparHtml(nome)}">${escaparHtml(nome)}</option>`
                ).join('');
                selectEstudante.innerHTML = `<option value="">Selecione seu nome na equipe...</option>${opcoesMembros}`;
            }

            if (selectChamado) {
                selectChamado.innerHTML = `<option value="">Selecione o chamado que você ajudou a resolver...</option>` +
                    chamados.map(c => `<option value="${c.id}">${escaparHtml(c.codigo)} (${escaparHtml(c.nivel)}) — ${escaparHtml(c.titulo)} [${escaparHtml(c.situacao)}]</option>`).join('');
            }
        };

        const renderizarListaFichas = () => {
            if (!tbodyFichas) return;
            const fichas = getFichas();
            tbodyFichas.innerHTML = '';

            if (fichas.length === 0) {
                tbodyFichas.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:#64748b;">Nenhuma ficha individual preenchida ainda.</td></tr>`;
                return;
            }

            fichas.forEach(f => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>👤 ${escaparHtml(f.estudante)}</strong></td>
                    <td><strong>${escaparHtml(f.chamadoCodigo)}</strong> — ${escaparHtml(f.chamadoTitulo)}</td>
                    <td>${escaparHtml(f.oQueFez)}</td>
                    <td>${escaparHtml(f.comoVerificou)}</td>
                    <td style="font-size:0.78rem; color:#64748b;">${escaparHtml(f.dataHora)}</td>
                `;
                tbodyFichas.appendChild(tr);
            });
        };

        popularSeletoresFicha();
        renderizarListaFichas();

        formFicha.addEventListener('submit', (e) => {
            e.preventDefault();
            const estudante = selectEstudante ? selectEstudante.value.trim() : '';
            const chamadoId = selectChamado ? Number(selectChamado.value) : 0;
            const oQueFez = txtOQueFez ? txtOQueFez.value.trim() : '';
            const comoVerificou = txtComoVerificou ? txtComoVerificou.value.trim() : '';

            const validacao = typeof Validadores !== 'undefined'
                ? Validadores.validarFichaIndividual({ estudante, chamadoId, oQueFez, comoVerificou })
                : { valido: true, erros: [] };

            if (!validacao.valido) {
                if (alertErroFicha) {
                    alertErroFicha.innerHTML = `<strong>Preencha todos os campos:</strong><ul style="margin:0.35rem 0 0 1.2rem;">${validacao.erros.map(er => `<li>${escaparHtml(er)}</li>`).join('')}</ul>`;
                    alertErroFicha.style.display = 'block';
                }
                return;
            }

            if (alertErroFicha) alertErroFicha.style.display = 'none';

            const chamados = getChamados();
            const ch = chamados.find(c => c.id === chamadoId) || { codigo: `#CH-0${chamadoId}`, titulo: 'Chamado' };
            const fichas = getFichas();
            const dataAgora = new Date().toLocaleString('pt-BR');

            fichas.push({
                id: fichas.length + 1,
                estudante,
                chamadoId,
                chamadoCodigo: ch.codigo,
                chamadoTitulo: ch.titulo,
                oQueFez,
                comoVerificou,
                dataHora: dataAgora
            });

            saveFichas(fichas);

            registrarNoHistorico({
                chamadoId,
                acao: `Ficha Individual registrada por ${estudante} referente ao chamado ${ch.codigo}.`,
                situacaoAnterior: ch.situacao || '-',
                situacaoNova: ch.situacao || '-',
                responsaveis: estudante
            });

            formFicha.reset();
            renderizarListaFichas();
            exibirToast(`Ficha individual de ${estudante} registrada com sucesso!`);
        });
    }

    // =====================================================================
    // TELA 5: RELATÓRIO E ENTREGA DA ATIVIDADE (relatorio.html)
    // =====================================================================
    const relatorioContainer = document.getElementById('relatorioConsolidadoContainer');
    if (relatorioContainer) {
        const renderizarRelatorio = () => {
            const equipe = getEquipe();
            const chamados = getChamados();
            const fichas = getFichas();
            const historico = getHistorico();
            const resumo = typeof Validadores !== 'undefined'
                ? Validadores.calcularResumoEquipe(chamados)
                : { total: 12, disponiveis: 0, emAtendimento: 0, resolvidosTotal: 0, resolvidosCorrecao: 0, resolvidosOrientacao: 0, pendentes: 0, concluidos: 0, percentualProgresso: 0 };

            const setTxt = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            };

            setTxt('relNomeEquipe', equipe.nomeEquipe);
            setTxt('relTurmaEquipe', equipe.turma);
            setTxt('relIntegrantesEquipe', (equipe.integrantes || []).join(', ') || 'Nenhum integrante listado');

            setTxt('relTotalTrabalhados', resumo.trabalhados);
            setTxt('relTotalResolvidos', `${resumo.resolvidosTotal} (${resumo.resolvidosCorrecao} correção / ${resumo.resolvidosOrientacao} orientação)`);
            setTxt('relTotalPendentes', resumo.pendentes);
            setTxt('relTotalDisponiveis', resumo.disponiveis);
            setTxt('relProgressoGeral', `${resumo.percentualProgresso}%`);

            // Lista de atendimentos
            const listaAtendimentosEl = document.getElementById('relListaAtendimentos');
            if (listaAtendimentosEl) {
                listaAtendimentosEl.innerHTML = chamados.map(c => {
                    const at = c.atendimento || {};
                    return `
                        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 0.85rem; background: #ffffff;">
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem; padding-bottom:0.4rem; border-bottom:1px solid #f1f5f9;">
                                <div>
                                    <span class="badge ${c.nivel === 'Essencial' ? 'badge-essencial' : 'badge-aprofundamento'}">${escaparHtml(c.codigo)} • ${escaparHtml(c.nivel)}</span>
                                    <strong style="margin-left:0.4rem;">${escaparHtml(c.titulo)}</strong>
                                </div>
                                <span class="${obterClasseBadgeSituacao(c.situacao)}">${escaparHtml(c.situacao)}</span>
                            </div>
                            <div style="font-size:0.86rem; color:#334155; display:grid; gap:0.3rem;">
                                <div><strong>1. Problema:</strong> ${escaparHtml(at.problema || '— Ainda não preenchido —')}</div>
                                <div><strong>2. Solução / Orientação / Justificativa:</strong> ${escaparHtml(at.solucao || '— Ainda não preenchido —')}</div>
                                <div><strong>3. Verificação:</strong> ${escaparHtml(at.verificacao || '— Ainda não preenchido —')}</div>
                                <div style="color:#0f766e;"><strong>4. Responsáveis (Autoria):</strong> ${escaparHtml(at.responsaveis || '— Não informado —')} ${at.dataAtualizacao ? `<small style="color:#64748b;">(${escaparHtml(at.dataAtualizacao)})</small>` : ''}</div>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            // Lista de fichas individuais no relatório
            const relFichasBody = document.getElementById('relTabelaFichasBody');
            if (relFichasBody) {
                if (fichas.length === 0) {
                    relFichasBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:1rem; color:#64748b;">Nenhuma ficha individual preenchida.</td></tr>`;
                } else {
                    relFichasBody.innerHTML = fichas.map(f => `
                        <tr>
                            <td><strong>${escaparHtml(f.estudante)}</strong></td>
                            <td>${escaparHtml(f.chamadoCodigo)} — ${escaparHtml(f.chamadoTitulo)}</td>
                            <td>${escaparHtml(f.oQueFez)}</td>
                            <td>${escaparHtml(f.comoVerificou)}</td>
                        </tr>
                    `).join('');
                }
            }

            // Histórico imutável
            const relHistoricoEl = document.getElementById('relListaHistorico');
            if (relHistoricoEl) {
                relHistoricoEl.innerHTML = historico.map(h => `
                    <div class="history-item">
                        <strong>#${h.id} [${escaparHtml(h.dataHora)}]</strong>
                        (${escaparHtml(h.situacaoAnterior)} &rarr; <strong>${escaparHtml(h.situacaoNova)}</strong>) —
                        ${escaparHtml(h.acao)} | <em>Resp: ${escaparHtml(h.responsaveis)}</em>
                    </div>
                `).join('');
            }
        };

        renderizarRelatorio();
    }
});
