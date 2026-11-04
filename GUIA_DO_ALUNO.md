# 🧑‍🎓 Guia do Estudante — Recomplica: Central de Resgate ENEM

**Unidade Curricular:** Manutenção de Sistemas — Curso Técnico em Desenvolvimento de Sistemas (SENAI)

---

## 1. Sua Missão na Central de Resgate

A plataforma de revisão **Recomplica ENEM** passou por uma atualização recente. Desde então, estudantes de todo o país abriram chamados relatando supostos erros em questões, gabaritos invertidos, explicações incompletas e disciplinas trocadas.

Você e seu grupo formam a **Equipe de Sustentação e Suporte Técnico**. Atenção: **nem todo chamado é um bug real do sistema!** Em sistemas educacionais, muitas vezes a questão e o gabarito estão corretos e o usuário apenas teve uma dúvida conceitual ou interpretou o enunciado de forma equivocada.

O papel da sua equipe é:
1. **Investigar** a questão ou situação associada a cada chamado.
2. **Corrigir** a configuração do item (gabarito, área do conhecimento ou explicação) quando realmente existir falha no sistema.
3. **Orientar o usuário** com clareza pedagógica quando não existir falha no sistema.
4. **Testar e verificar** a solução aplicada.
5. **Registrar** o atendimento completo, a autoria da equipe e a ficha individual de cada integrante.

---

## 2. Passo a Passo da Atividade

### Passo 1: Cadastrar a Equipe (`index.html`)
- Informe o **Nome da Equipe**, a **Turma** e adicione o nome de **todos os integrantes**.
- Clique em **Salvar Equipe e Acessar Central de Resgate**.

### Passo 2: Analisar a Fila de 12 Chamados (`consulta.html`)
A fila possui **12 chamados**:
- **8 Chamados Essenciais (`#CH-01` a `#CH-08`):** Casos diretos envolvendo gabaritos, dúvidas de cálculo/interpretação, explicações incompletas e classificação de área do conhecimento.
- **4 Chamados de Aprofundamento (`#CH-09` a `#CH-12`):** Casos que exigem análise mais cuidadosa de regras do ENEM, interdisciplinaridade, prevenção de erros de cadastro e dependências de infraestrutura.

### Passo 3: Realizar o Atendimento de Cada Chamado
Ao clicar em **🛠️ Atender** em um chamado:
1. Leia o **Relato Recebido** e examine a **Questão/Situação Associada**.
2. Verifique a **Configuração Atual do Item na Plataforma** (Gabarito cadastrado, Área do conhecimento e Explicação).
   - Se houver erro no cadastro da questão, altere o campo correspondente para corrigi-lo!
   - Se a questão já estiver correta no sistema, mantenha a configuração original.
3. Preencha obrigatoriamente as **4 informações principais**:
   - **1. Problema:** O que foi identificado na investigação?
   - **2. Solução:** O que foi corrigido no sistema, orientado ao estudante ou qual a justificativa de pendência?
   - **3. Verificação:** Como a equipe conferiu e testou o resultado?
   - **4. Responsáveis (Autoria):** Quem realizou a *Investigação*, a *Intervenção/Orientação* e a *Verificação*?
4. Selecione o **Resultado do Atendimento**:
   - `✅ Resolvido após correção`: quando a equipe precisou corrigir gabarito, área ou explicação/parâmetro defeituoso.
   - `💡 Resolvido por orientação`: quando o sistema estava correto e a equipe elaborou a explicação/orientação para o usuário.
   - `⚠️ Pendente, com justificativa`: quando a solução definitiva depende de um fator externo ou infraestrutura fora do alcance imediato da equipe, exigindo justificativa técnica detalhada.

### Passo 4: Preencher a Ficha Individual (`ficha.html`)
Cada estudante da equipe deve acessar a aba **Ficha Individual** e responder:
1. **Qual chamado você ajudou a resolver?**
2. **O que você fez?**
3. **Como verificou ou justificou a solução?**

### Passo 5: Entrega e Exportação (`relatorio.html`)
Ao concluir os atendimentos e as fichas individuais, acesse **Entrega e Relatório**:
1. Confira se todos os 12 chamados e as fichas individuais de todos os membros estão registrados.
2. Clique em **📄 Exportar Relatório HTML Imprimível (PDF)** (abra o arquivo gerado e use *Imprimir -> Salvar como PDF* se solicitado pelo professor).
3. Clique em **💾 Exportar Backup JSON** e entregue ambos os arquivos conforme orientação docente.
