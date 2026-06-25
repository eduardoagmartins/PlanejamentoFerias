# Discovery Handoff - Planejamento de Ferias do Time

## Context
A empresa ja possui um sistema oficial para solicitacao de ferias. A nova aplicacao nao substitui esse sistema: ela existe para apoiar o planejamento operacional do time antes, durante e depois das solicitacoes oficiais, dando ao gestor uma visao consolidada de ausencias, sobreposicoes, day-offs e possiveis conflitos de cobertura.

O problema principal e que gestores precisam equilibrar preferencias individuais, periodos ja solicitados, datas comemorativas de day-off e necessidade de manter o time funcionando. Sem uma linha do tempo clara, conflitos aparecem tarde, ajustes viram conversa manual e o planejamento fica espalhado em planilhas, mensagens ou memoria do gestor.

Este handoff sintetiza uma Lean Inception inicial para definir o MVP1. As decisoes abaixo assumem um produto interno acessado pelo gestor, com cadastro manual no MVP, autenticacao simples por email e senha, e sem integracao inicial obrigatoria com o sistema corporativo de solicitacao de ferias.

## Product Vision
Para gestores que precisam coordenar a disponibilidade do time, o Planejamento de Ferias do Time e uma aplicacao interna de planejamento visual que centraliza colaboradores, times, periodos de ferias e day-offs para identificar sobreposicoes e conflitos antes que eles impactem a operacao.

Fonte: visao do produto, contexto informado pelo stakeholder, MVP Canvas.

## Lean Inception Summary

### Produto E
- Uma ferramenta interna de planejamento de ausencias do time.
- Uma visao operacional para gestores acompanharem ferias e day-offs.
- Um calendario/linha do tempo para identificar sobreposicoes e conflitos.
- Um apoio ao planejamento antes ou em paralelo ao sistema oficial de solicitacao.

### Produto Nao E
- O sistema oficial de solicitacao, aprovacao ou pagamento de ferias.
- Um sistema de RH completo.
- Um controle de ponto.
- Uma folha de pagamento.
- Um substituto para politicas formais da empresa.

### Produto Faz
- Cadastra times.
- Cadastra colaboradores vinculados a times.
- Registra periodos planejados de ferias dos colaboradores.
- Registra day-offs individuais dos colaboradores, como aniversario de empresa.
- Exibe uma linha do tempo das ausencias do time.
- Sinaliza sobreposicoes e potenciais conflitos.
- Ajuda o gestor a ajustar o planejamento antes de formalizar ou aprovar ferias em outro sistema.

### Produto Nao Faz No MVP1
- Solicita ferias no sistema oficial.
- Aprova ou reprova ferias oficialmente.
- Integra automaticamente com sistemas de RH, ponto, folha ou calendario corporativo.
- Calcula saldo legal de ferias, abono, decimo terceiro ou regras trabalhistas.
- Envia comunicacoes automaticas complexas.
- Faz planejamento multi-area com dependencias entre varios gestores.

## MVP Proposal
MVP1 valida se gestores conseguem cadastrar um time, registrar colaboradores, planejar ferias e day-offs, visualizar tudo em uma linha do tempo e identificar sobreposicoes relevantes antes que elas se tornem conflito operacional.

Esta e a menor fatia viavel porque entrega o valor central sem depender de integracoes corporativas: uma fonte visual unica para planejamento de ausencias do time. O sistema oficial continua sendo a fonte de formalizacao; o MVP testa se a etapa de planejamento melhora previsibilidade e tomada de decisao do gestor.

Fonte: MVP Canvas, jornadas do gestor, Is/Is not/Does/Does not, sequencer.

## Target Personas
- Gestor do time: responsavel por coordenar disponibilidade, avaliar impacto das ausencias e orientar ajustes no planejamento. E a persona principal do MVP1 porque sente diretamente a dor de sobreposicao e cobertura.
- Colaborador do time: pessoa cujos periodos de ferias e day-offs sao planejados pelo gestor. Importa para o MVP1 como entidade central do planejamento, mas nao acessa nem opera o sistema na primeira versao.
- RH ou People Ops: area interessada em consistencia de informacoes e aderencia a processos corporativos. No MVP1 atua como stakeholder consultivo, nao como usuario operacional principal.
- Lideranca da area: pessoa que precisa entender risco de disponibilidade em periodos criticos. No MVP1 pode consumir uma visao resumida, mas nao precisa operar o sistema.

Fonte: personas, stakeholder input, jornada de planejamento.

## Objectives And Success Criteria
- Objective: Dar ao gestor uma visao clara das ausencias planejadas do time.
  Success signal: gestor consegue identificar em ate 2 minutos quem estara ausente em uma semana ou mes especifico.
- Objective: Antecipar conflitos de ferias e day-offs antes da formalizacao ou execucao.
  Success signal: o sistema sinaliza sobreposicoes quando dois ou mais colaboradores do mesmo time estao ausentes no mesmo periodo.
- Objective: Reduzir planejamento manual em planilhas ou mensagens.
  Success signal: pelo menos 70% dos planejamentos de ausencia do time piloto sao registrados no sistema durante o teste.
- Objective: Validar valor sem integracao inicial com o sistema oficial de solicitacao.
  Success signal: gestores conseguem planejar e revisar conflitos com cadastro manual, mesmo que a formalizacao continue em outro sistema.
- Objective: Apoiar conversas de ajuste com base em dados visuais.
  Success signal: gestor consegue usar a linha do tempo para propor alteracao de periodo ou confirmar ausencia sem consultar fonte externa.

Fonte: objetivos de negocio/usuario, MVP Canvas, validacao.

## Scope

### In MVP1
- Cadastro de times com nome e identificacao simples.
- Cadastro de colaboradores com nome, email opcional, identificador corporativo opcional, papel/cargo opcional e time associado.
- Registro manual de periodo de ferias planejadas por colaborador, com data de inicio, data de fim e status: Agendado, Em andamento ou Encerradas.
- Registro de day-offs individuais dos colaboradores, incluindo aniversario de empresa e outros dias planejados.
- Linha do tempo do time com ferias e day-offs visiveis por periodo.
- Sinalizacao visual de sobreposicoes de ausencias dentro do mesmo time diretamente na linha do tempo, informando que ha sobreposicao no periodo.
- Filtro ou selecao por time.
- Edicao e remocao manual de colaboradores, times, ferias e day-offs.
- Resumo de conflitos por periodo para o gestor.
- Autenticacao simples para gestor com email e senha.

### Not In MVP1
- Solicitacao oficial de ferias.
- Aprovacao formal de ferias.
- Integracao automatica com sistema de RH, folha, ponto, calendario ou SSO.
- Calculo de saldo de ferias ou validacao trabalhista.
- Regras complexas de capacidade minima por papel, senioridade ou squad.
- Workflows de notificacao, assinatura ou aceite.
- Planejamento cross-team ou multi-gestor com hierarquia organizacional completa.
- Permissoes avancadas por perfil ou acesso do colaborador.
- Aplicativo mobile nativo.
- Relatorios executivos avancados.

Fonte: Is/Is not/Does/Does not, sequencer, restricao de MVP.

## Primary Journeys

### Cadastrar Estrutura Do Time
- Actor: Gestor do time.
- Trigger: gestor comeca a usar a aplicacao para planejar as ausencias.
- Steps: criar time; cadastrar colaboradores; vincular colaboradores ao time; revisar lista do time.
- MVP support: cria a base minima para registrar ferias e day-offs e visualizar conflitos.

Fonte: jornada do gestor, feature card Cadastro de time e colaboradores.

### Planejar Ferias De Um Colaborador
- Actor: Gestor do time.
- Trigger: colaborador informa um periodo desejado ou ja solicitado no sistema oficial.
- Steps: selecionar colaborador; informar data inicial e final; indicar status Agendado, Em andamento ou Encerradas; salvar; visualizar o periodo na linha do tempo.
- MVP support: transforma combinados e solicitacoes externas em informacao visual do planejamento do time.

Fonte: jornada do gestor, MVP Canvas.

### Planejar Day-Off Individual
- Actor: Gestor do time.
- Trigger: existe um day-off individual conhecido, como aniversario de empresa, folga combinada ou outro evento interno.
- Steps: criar day-off; definir data ou periodo; associar ao colaborador; salvar; visualizar na linha do tempo.
- MVP support: inclui ausencias nao relacionadas a ferias no mesmo planejamento operacional.

Fonte: jornada de day-off individual, stakeholder input.

### Identificar Sobreposicoes E Conflitos
- Actor: Gestor do time.
- Trigger: gestor revisa ferias planejadas para um periodo futuro.
- Steps: abrir linha do tempo do time; navegar por periodo; observar ausencias simultaneas; visualizar aviso de sobreposicao no periodo; consultar resumo de conflitos; decidir se precisa renegociar datas.
- MVP support: torna conflitos visiveis cedo, antes que a falta de cobertura afete entregas ou suporte.

Fonte: jornada critica do gestor, objetivo de antecipacao.

### Revisar Planejamento Em Reuniao
- Actor: Gestor do time e colaboradores.
- Trigger: reuniao de planejamento mensal, trimestral ou antes de periodo critico.
- Steps: gestor abre timeline; apresenta periodos planejados; identifica pontos de atencao; ajusta registros conforme alinhamento do grupo.
- MVP support: troca discussao abstrata por uma visao compartilhada e atualizavel.

Fonte: jornada colaborativa, MVP Canvas.

## Requirement Seeds
- O produto deve permitir que o gestor cadastre times para organizar colaboradores e ausencias por unidade de planejamento. Fonte: jornada Cadastrar Estrutura Do Time, persona Gestor.
- O produto deve permitir que o gestor cadastre colaboradores vinculados a um time para que ferias e day-offs sejam planejados por pessoa. Fonte: jornada Cadastrar Estrutura Do Time.
- O produto deve permitir registrar periodos de ferias planejadas com data inicial, data final, colaborador, time e status Agendado, Em andamento ou Encerradas para refletir o planejamento operacional. Fonte: jornada Planejar Ferias De Um Colaborador, decisao de stakeholder.
- O produto deve permitir registrar day-offs individuais de colaboradores para que ausencias nao relacionadas a ferias aparecam na mesma visao. Fonte: jornada Planejar Day-Off Individual, decisao de stakeholder.
- O produto deve exibir uma linha do tempo do time mostrando ferias e day-offs por colaborador para apoiar leitura rapida de disponibilidade. Fonte: jornada Identificar Sobreposicoes E Conflitos, objetivo de visao clara.
- O produto deve sinalizar sobreposicoes na linha do tempo quando mais de um colaborador do mesmo time estiver ausente no mesmo periodo, informando que ha sobreposicao naquele periodo. Fonte: objetivo Antecipar conflitos, MVP Canvas, decisao de stakeholder.
- O produto deve permitir editar e remover registros de planejamento para acompanhar mudancas antes da formalizacao final. Fonte: jornada Revisar Planejamento Em Reuniao.
- O produto deve permitir selecionar ou filtrar por time para que o gestor foque apenas a unidade sob sua responsabilidade. Fonte: persona Gestor, jornada Identificar Sobreposicoes.
- O produto deve permitir autenticacao simples do gestor com email e senha para restringir acesso ao planejamento do time. Fonte: decisao de stakeholder, risco de dados sensiveis.
- O produto deve manter fora do MVP1 a solicitacao e aprovacao oficial de ferias, preservando o sistema corporativo existente como fonte de formalizacao. Fonte: non-goals, contexto informado.

## MVP Canvas
- Proposta do MVP: uma ferramenta interna para o gestor cadastrar time, colaboradores, ferias e day-offs individuais, com uma linha do tempo que evidencia sobreposicoes de ausencia.
- Personas segmentadas: gestor de um time piloto como usuario principal e unico operador do MVP1; colaboradores como entidades planejadas; RH/People Ops como stakeholder consultivo.
- Jornadas atendidas: cadastrar estrutura do time; planejar ferias; planejar day-offs; identificar sobreposicoes; revisar planejamento em reuniao.
- Funcionalidades: autenticacao por email e senha, cadastro de time, cadastro de colaborador, registro de ferias, registro de day-off individual, timeline por time, sinalizacao de sobreposicao no periodo, resumo de conflitos, edicao manual.
- Resultado esperado: gestor consegue antecipar conflitos e ajustar combinados antes que as ferias impactem a operacao.
- Metricas: tempo para identificar ausencias em um periodo; quantidade de conflitos detectados antes da data; porcentagem de planejamentos registrados no sistema; satisfacao do gestor do piloto.
- Custo e prazo assumidos: MVP pequeno, manual-first, sem integracoes; prazo e esforco devem ser refinados em `/plan`.

Fonte: sintese Lean Inception.

## Validation Plan
- Hypothesis: Uma linha do tempo simples ja e suficiente para o gestor identificar conflitos relevantes.
  Metric/evidence: em teste moderado, gestor encontra sobreposicoes em cenarios simulados sem ajuda.
  Threshold or decision rule: continuar se 80% dos conflitos criticos forem identificados pelo gestor em ate 2 minutos.
- Hypothesis: Cadastro manual e aceitavel no MVP1 se o time piloto for pequeno ou medio.
  Metric/evidence: gestor cadastra time, colaboradores e ausencias iniciais sem solicitar integracao como pre-condicao.
  Threshold or decision rule: continuar se o setup inicial de um time piloto levar menos de 30 minutos.
- Hypothesis: Day-offs precisam aparecer junto com ferias para evitar falsa disponibilidade.
  Metric/evidence: gestores classificam day-offs como informacao necessaria em entrevistas ou testes.
  Threshold or decision rule: manter day-offs no MVP se forem citados como relevantes por maioria dos gestores do piloto.
- Hypothesis: O produto gera valor mesmo sem aprovacao formal de ferias.
  Metric/evidence: gestor usa a ferramenta para revisar planejamento antes ou depois da solicitacao oficial.
  Threshold or decision rule: pivotar se usuarios esperarem que o produto substitua obrigatoriamente o sistema oficial.

Fonte: MVP Canvas, objetivos, riscos.

## Risks, Assumptions, And Dependencies
- Risk: O produto ser confundido com o sistema oficial de ferias. Mitigation or research item: deixar limites explicitos na interface e no `/specify`.
- Risk: Conflito de dados entre planejamento manual e sistema oficial. Mitigation or research item: registrar status do planejamento e tratar integracao como incremento futuro.
- Risk: Gestor precisar de regras de capacidade mais complexas que simples sobreposicao. Mitigation or research item: validar quais conflitos realmente importam no piloto antes de modelar regras avancadas.
- Risk: Dados de ferias e ausencias serem sensiveis. Mitigation or research item: restringir MVP1 ao gestor autenticado por email e senha, deixando perfis avancados para incremento futuro.
- Risk: Cadastro manual ficar trabalhoso para times grandes. Mitigation or research item: limitar MVP a um time piloto e avaliar importacao futura.
- Assumption: O gestor e o unico usuario operador do MVP1. Evidence needed: validar no piloto se colaboradores precisam de acesso proprio em incremento futuro.
- Assumption: O MVP pode funcionar sem integracao inicial com RH. Evidence needed: piloto com cadastro manual.
- Assumption: Sobreposicao de datas e o primeiro criterio de conflito. Evidence needed: validar se ha minimo de pessoas por papel, escala, senioridade ou criticidade.
- Dependency: Definir politica minima de senha e recuperacao de acesso. Owner or next step: detalhar em `/specify` ou `/plan`.
- Dependency: Definir calendario padrao, fuso, feriados e dias uteis. Owner or next step: detalhar em `/specify` ou `/plan`.

## Trade-Offs And Constraints
- Priorizar visibilidade operacional sobre automacao.
- Priorizar planejamento manual confiavel sobre integracao inicial.
- Priorizar linha do tempo e conflitos simples sobre regras complexas de RH.
- Priorizar o gestor como usuario principal no MVP1.
- Restringir operacao do MVP1 ao gestor, que cadastra times, colaboradores, ferias e day-offs.
- Manter o sistema oficial de solicitacao como dependencia externa, nao como parte do MVP.
- Evitar requisitos que nao tenham ligacao com gestor, colaborador, jornada de planejamento, objetivo de conflito ou validacao do MVP.

Fonte: trade-off review, contexto do produto, principios de MVP.

## Sequencer Summary
- MVP1: autenticar gestor com email e senha; cadastrar time; cadastrar colaboradores; registrar ferias com status Agendado, Em andamento ou Encerradas; registrar day-offs individuais; visualizar linha do tempo por time; sinalizar sobreposicoes simples no periodo; editar/remover registros; ver resumo de conflitos.
- Incremento 2 candidates: perfis de acesso; acesso do colaborador; comentarios ou observacoes no planejamento; status sincronizado manualmente com solicitacao oficial; filtros por mes/trimestre; exportacao simples.
- Incremento 3 candidates: integracao com sistema oficial de ferias; importacao de colaboradores; calendario corporativo; regras de capacidade minima por papel; notificacoes; relatorios para lideranca.
- Parked ideas: aprovacao formal de ferias; calculo de saldo; folha/pagamento; controle de ponto; planejamento multi-area complexo; app mobile nativo.

Future increments sao provisiorios e devem ser reavaliados apos aprendizado do MVP1.

Fonte: sequencer, feature review.

## Decisions
- Acesso do MVP1: apenas gestor acessa o sistema.
- Entrada de dados do MVP1: gestor cadastra times, colaboradores, ferias e day-offs.
- Status de ferias do MVP1: Agendado, Em andamento e Encerradas.
- Conflito do MVP1: sobreposicao exibida na linha do tempo com aviso de que ha sobreposicao no periodo.
- Day-off do MVP1: individual por colaborador.
- Autenticacao do MVP1: simples, com email e senha.

## Open Questions
- Uma sobreposicao deve ser exibida para qualquer quantidade maior que 1 ausente, ou existe limite tolerado por time? Blocks `/specify`? no, assumir qualquer sobreposicao no MVP1.
- O MVP precisa considerar feriados nacionais/locais e fins de semana? Blocks `/specify`? no, mas deve ser decidido em `/plan`.
- Qual tamanho do time piloto e horizonte de planejamento: mensal, trimestral, semestral ou anual? Blocks `/specify`? no, assumir time piloto e visao anual com navegacao por mes se nao houver decisao.

## Recommended `/specify` Input
Use este Lean Inception discovery handoff para criar uma especificacao Spec Kit para o MVP1 do produto Planejamento de Ferias do Time. Mantenha a especificacao focada em comportamento observavel pelo usuario, non-goals explicitos, criterios de sucesso mensuraveis, suposicoes, riscos e perguntas abertas. Nao transforme incrementos futuros em requisitos do MVP1.

Foque o MVP1 em: autenticacao simples com email e senha para gestor, cadastro de time, cadastro de colaboradores, registro manual de ferias com status Agendado, Em andamento e Encerradas, registro de day-offs individuais, linha do tempo por time, identificacao de sobreposicoes no periodo, resumo de conflitos e edicao manual dos dados.

Preserve como non-goal: solicitacao oficial de ferias, aprovacao formal, calculo de saldo, integracoes com RH/calendario/ponto/folha, acesso do colaborador no MVP1, perfis avancados e regras trabalhistas complexas. Antes de finalizar a especificacao, registre as decisoes ja tomadas sobre usuario operador, cadastro manual pelo gestor, status, regra de sobreposicao na linha do tempo, day-off individual e autenticacao simples.
