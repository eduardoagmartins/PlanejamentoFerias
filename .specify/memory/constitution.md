<!--
Sync Impact Report
Version change: template/unratified -> 1.0.0
Modified principles:
- Template placeholders -> I. Foco No Planejamento Operacional Do MVP1
- Template placeholders -> II. Requisitos Rastreaveis A Descoberta
- Template placeholders -> III. Gestor Autenticado E Cadastro Manual
- Template placeholders -> IV. Linha Do Tempo E Conflitos Simples
- Template placeholders -> V. Validacao Por Evidencia Do Piloto
Added sections:
- Limites De Produto
- Fluxo De Desenvolvimento E Qualidade
Removed sections:
- Placeholder section names and example comments from the constitution template
Templates requiring updates:
- .specify/templates/plan-template.md: reviewed, no update required
- .specify/templates/spec-template.md: reviewed, no update required
- .specify/templates/tasks-template.md: reviewed, no update required
- .specify/templates/commands/*.md: not present in this repository
Follow-up TODOs: none
-->
# Planejamento de Ferias do Time Constitution

## Core Principles

### I. Foco No Planejamento Operacional Do MVP1
O produto MUST existir para apoiar o gestor no planejamento operacional de
ausencias do time. Ele MUST NOT substituir o sistema oficial de solicitacao,
aprovacao, calculo legal, pagamento, ponto, folha ou politicas formais de
ferias. Qualquer proposta que mova o produto para esses dominios MUST ser
tratada como novo incremento, precedida de descoberta propria e decisao
explicita de escopo.

Rationale: a Lean Inception definiu o MVP1 como uma fonte visual de
planejamento, nao como sistema corporativo oficial de ferias.

### II. Requisitos Rastreaveis A Descoberta
Todo requisito de produto MUST rastrear para pelo menos uma persona, jornada,
objetivo, bloco do MVP Canvas, metrica de validacao ou decisao de stakeholder
registrada em `specs/001-planejamento-ferias/discovery.md`. Ideias
brainstormed, incrementos futuros e desejos tecnicos MUST NOT virar requisito
do MVP1 sem essa rastreabilidade.

Rationale: a descoberta separou explicitamente o MVP1 de incrementos futuros
para evitar crescimento de escopo antes da validacao.

### III. Gestor Autenticado E Cadastro Manual
No MVP1, o gestor e o unico operador do sistema e MUST acessar a aplicacao por
autenticacao simples com email e senha. Colaboradores, RH/People Ops e
lideranca podem influenciar ou consumir informacoes, mas MUST NOT operar fluxos
proprios no MVP1. Times, colaboradores, ferias e day-offs MUST ser cadastrados
manualmente pelo gestor ate que importacoes ou integracoes sejam validadas em
incremento futuro.

Rationale: o piloto valida valor com baixo custo de integracao e reduz acesso
indevido a dados sensiveis de ausencias.

### IV. Linha Do Tempo E Conflitos Simples
O valor central do MVP1 MUST ser uma linha do tempo por time que mostre ferias
e day-offs individuais e sinalize sobreposicoes quando dois ou mais
colaboradores diferentes do mesmo time estiverem ausentes no mesmo periodo.
Conflitos MUST ser explicaveis ao gestor e derivados dos registros existentes;
regras de capacidade por papel, senioridade, squad, criticidade ou hierarquia
MUST permanecer fora do MVP1 ate serem validadas no piloto.

Rationale: a Lean Inception identificou a sobreposicao simples como o primeiro
criterio util de conflito e deixou regras complexas como aprendizado futuro.

### V. Validacao Por Evidencia Do Piloto
Cada entrega do MVP1 MUST preservar ou melhorar a capacidade do gestor de
identificar ausencias e sobreposicoes com rapidez. A evolucao do produto MUST
ser guiada por evidencias do piloto, incluindo tempo para encontrar ausentes em
um periodo, conflitos detectados antes da execucao, proporcao de planejamentos
registrados no sistema e aceitacao do cadastro manual. Incrementos futuros MUST
ser reavaliados apos esse aprendizado.

Rationale: o objetivo do MVP1 e validar se uma fonte visual unica melhora a
previsibilidade e a tomada de decisao antes de investir em automacao.

## Limites De Produto

- MVP1 MUST incluir apenas: autenticacao do gestor, cadastro de times,
  cadastro de colaboradores, registro manual de ferias com status `Agendado`,
  `Em andamento` ou `Encerradas`, registro de day-offs individuais, linha do
  tempo por time, sinalizacao de sobreposicoes, resumo de conflitos e edicao ou
  remocao manual desses dados.
- MVP1 MUST NOT incluir: solicitacao oficial de ferias, aprovacao ou reprovacao
  formal, calculo de saldo ou regras trabalhistas, integracoes com RH,
  calendario, ponto, folha, SSO ou sistema oficial, acesso do colaborador,
  perfis avancados, aplicativo mobile nativo, relatorios executivos avancados
  ou planejamento multi-area complexo.
- A interface e a documentacao MUST deixar claro que o sistema oficial externo
  continua sendo a fonte de formalizacao de ferias.
- Dados de ausencias MUST ser tratados como informacao interna sensivel; fluxos
  do MVP1 MUST restringir acesso ao gestor autenticado.

## Fluxo De Desenvolvimento E Qualidade

- `/specify` MUST partir do handoff de descoberta e manter foco apenas no MVP1.
- `/plan` MUST carregar trade-offs, riscos, restricoes e dependencias da Lean
  Inception, especialmente planejamento manual, ausencia de integracoes e
  sistema oficial fora do escopo.
- `/tasks` MUST seguir o sequenciador do MVP1 e priorizar fatias testaveis por
  jornada do gestor.
- Mudancas de escopo MUST registrar qual persona, jornada, objetivo, metrica ou
  decisao de stakeholder as justifica.
- A revisao de conformidade MUST verificar non-goals, acesso restrito,
  rastreabilidade de requisitos e criterios de validacao antes de promover
  qualquer incremento.

## Governance

Esta constituicao prevalece sobre decisoes ad hoc de escopo, planejamento e
implementacao. Quando houver conflito entre artefatos, a decisao mais recente
MUST preservar os principios acima ou registrar uma emenda constitucional.

Emendas MUST incluir: motivacao, impacto no MVP ou em incrementos futuros,
artefatos afetados, decisao de stakeholder e ajuste de versao. A versao segue
SemVer: MAJOR para redefinir ou remover principios, MINOR para adicionar
principios ou secoes materiais, PATCH para esclarecimentos sem mudanca
normativa. Toda alteracao MUST atualizar `Last Amended` e o Sync Impact Report.

Conformidade MUST ser revisada em novos `/specify`, `/plan`, `/tasks` e antes
de implementacoes que possam alterar escopo, acesso, dados sensiveis,
integracoes ou regras de conflito. Violacoes temporarias MUST ser justificadas
no plano com alternativa mais simples rejeitada e criterio de revisao.

**Version**: 1.0.0 | **Ratified**: 2026-06-26 | **Last Amended**: 2026-06-26
