# 🎓 Recomplica — Central de Resgate ENEM

**Objeto Pedagógico Avaliativo — Unidade Curricular: Manutenção de Sistemas (SENAI)**

A **Recomplica** é uma plataforma fictícia de revisão para o ENEM. Após uma atualização no sistema, surgiram relatos de problemas envolvendo questões no formato ENEM, gabaritos, explicações pedagógicas, classificação de áreas do conhecimento e parâmetros de plataforma.

Neste sistema web, os estudantes atuam em **equipes de suporte e sustentação** responsáveis por investigar e atender **12 chamados** (8 essenciais e 4 de aprofundamento), registrando o diagnóstico técnico, a intervenção ou orientação ao usuário, a verificação do resultado e a autoria individual e coletiva.

---

## 🚀 Funcionalidades Principais

1. **Identificação da Equipe (`index.html`)**
   - Cadastro do nome da equipe, turma e lista de estudantes integrantes (utilizados para registrar a autoria por etapa e preencher as fichas individuais).
2. **Painel Inicial (`dashboard.html`)**
   - Indicadores em tempo real: **Chamados disponíveis**, **Em atendimento**, **Resolvidos** (detalhando correção vs. orientação), **Pendentes** e **Progresso da equipe** (barra percentual e contadores de essenciais e aprofundamento).
3. **Fila de Chamados e Atendimento (`consulta.html`)**
   - **12 chamados por equipe**: 8 chamados essenciais (`#CH-01` a `#CH-08`) e 4 chamados de aprofundamento (`#CH-09` a `#CH-12`).
   - Cada chamado está associado a uma questão ou situação concreta no formato ENEM, com enunciado, alternativas e painel de configuração do item (gabarito cadastrado, área do conhecimento e explicação/parâmetro).
   - O modal de atendimento registra as **4 informações principais**:
     1. **Problema:** o que foi identificado?
     2. **Solução:** o que foi corrigido, orientado ou justificado?
     3. **Verificação:** como a equipe conferiu o resultado?
     4. **Responsáveis (Autoria):** quem participou da Investigação, Intervenção e Verificação?
   - Resultados permitidos:
     - `Resolvido após correção`
     - `Resolvido por orientação`
     - `Pendente` (com justificativa obrigatória)
     - `Em atendimento` (andamento parcial)
4. **Ficha Individual (`ficha.html`)**
   - Cada estudante responde às 3 perguntas obrigatórias:
     1. *Qual chamado você ajudou a resolver?*
     2. *O que você fez?*
     3. *Como verificou ou justificou a solução?*
5. **Entrega e Avaliação (`relatorio.html`)**
   - Consolida o relatório da equipe, indicadores, registros de atendimento com responsáveis, fichas individuais e trilha de auditoria.
   - **Exportar Relatório em HTML Imprimível (Salvar como PDF)**.
   - **Exportar Backup dos Dados em JSON**.
6. **Persistência e Segurança (`localStorage`)**
   - Preserva todos os dados durante a navegação e atualização da página (`recomplica_equipe_v1`, `recomplica_chamados_v1`, `recomplica_fichas_v1`, `recomplica_historico_v1`).
   - Histórico de alterações protegido (append-only): a equipe não pode apagar livremente o histórico de modificações.

---

## 📂 Estrutura de Arquivos

```text
RecomplicaENEM/
├── index.html               # Identificação da equipe e cadastro de integrantes
├── dashboard.html           # Painel inicial com contadores e progresso da equipe
├── consulta.html            # Fila dos 12 chamados (8 essenciais + 4 aprofundamento) e modal de atendimento
├── ficha.html               # Ficha individual de contribuição por estudante
├── relatorio.html           # Área de encerramento, relatório consolidado e exportação HTML/PDF e JSON
├── style.css                # Identidade visual Recomplica ENEM e estilos de impressão
├── validadores.js           # Regras puras de validação, cálculo de progresso e histórico imutável
├── app.js                   # Banco dos 12 chamados ENEM, persistência localStorage e controle de interface
├── validadores.test.js      # Suíte de testes automatizados (Vitest)
├── package.json             # Configuração de scripts de teste
├── README.md                # Documentação geral do projeto
├── GUIA_DO_ALUNO.md         # Instruções passo a passo para as equipes de estudantes
└── GABARITO_PROFESSOR.md    # Gabarito pedagógico exclusivo do docente (análise dos 12 chamados)
```

---

## 🛠️ Como Executar

1. **No Navegador / Live Server:**
   - Basta abrir o arquivo `index.html` diretamente no navegador (Chrome, Edge, Firefox, Safari) ou iniciar com a extensão **Live Server** do VS Code.
   - Não requer backend, banco de dados externo nem instalação de frameworks.

2. **Executar Testes Unitários (Opcional):**
   ```bash
   npx vitest run RecomplicaENEM/validadores.test.js
   ```
