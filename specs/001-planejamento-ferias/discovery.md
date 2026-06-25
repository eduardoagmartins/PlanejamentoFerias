# Discovery Handoff - Planejamento de Ferias

## Context
Este discovery foi sintetizado como uma Lean Inception inicial para um produto de planejamento de ferias. Como ainda nao ha artefatos de pesquisa, estrategia ou stakeholder decisions no repositorio, o handoff explicita as principais suposicoes para validacao antes da especificacao final.

O objetivo do MVP1 e decidir se vale investir em um produto que ajude uma pessoa ou pequeno grupo a transformar uma ideia de viagem em um plano de ferias claro, compartilhavel e comparavel por orcamento, datas e prioridades.

## Product Vision
Para pessoas que querem organizar ferias sem perder informacoes entre conversas, planilhas e links soltos, o Planejamento de Ferias e uma ferramenta de planejamento colaborativo que centraliza destino, datas, orcamento, roteiro e decisoes para tornar a escolha da viagem mais clara e menos trabalhosa.

Fonte: visao do produto, contexto do repositorio, suposicao de discovery.

## Lean Inception Summary

### Produto E
- Um planejador de ferias pessoal e colaborativo.
- Um espaco unico para consolidar ideias, datas, custos, roteiros e decisoes.
- Uma ferramenta de apoio a decisao antes da compra/reserva.

### Produto Nao E
- Uma agencia de viagens.
- Um marketplace de passagens, hospedagens ou passeios.
- Um sistema financeiro completo.
- Um aplicativo social aberto.
- Um gerenciador corporativo de ferias de funcionarios.

### Produto Faz
- Registra opcoes de viagem.
- Compara alternativas por datas, custos estimados e preferencias.
- Organiza um roteiro simples por dia.
- Ajuda participantes a alinhar escolhas e pendencias.
- Gera uma visao compartilhavel do plano.

### Produto Nao Faz No MVP1
- Compra passagens, hospedagens ou passeios.
- Integra automaticamente com companhias aereas, hoteis ou bancos.
- Otimiza rotas com algoritmos complexos.
- Controla reembolsos, cambio ou despesas em tempo real.
- Publica roteiros em rede social.

## MVP Proposal
MVP1 valida se usuarios conseguem criar e compartilhar um plano de ferias suficientemente util a partir de destino, datas, participantes, orcamento estimado, itens de roteiro e pendencias de decisao.

Esta e a menor fatia util porque cobre o fluxo principal de alinhamento antes da reserva: registrar uma viagem, estruturar opcoes, estimar custo, organizar roteiro basico e compartilhar o estado do plano. Recursos de compra, automacao, recomendacao e integracoes ficam fora ate haver evidencia de uso recorrente.

Fonte: MVP Canvas, jornadas, sequencer, trade-off de simplicidade.

## Target Personas
- Organizador principal: pessoa que puxa o planejamento da viagem, consolida informacoes, cobra decisoes e precisa reduzir retrabalho. Importa para MVP1 porque e quem sente a dor mais forte e tem motivacao para criar o plano.
- Participante da viagem: familiar, amigo ou parceiro que precisa entender opcoes, custos, datas e pendencias sem acompanhar todas as conversas. Importa para MVP1 porque valida se o plano compartilhado reduz desalinhamento.
- Decisor financeiro: pessoa que aprova ou limita gastos da viagem. Pode ser o proprio organizador. Importa para MVP1 porque orcamento e um criterio frequente para decidir se a viagem avanca.

Fonte: personas, jornada de planejamento, suposicao de discovery.

## Objectives And Success Criteria
- Objective: Reduzir dispersao de informacoes durante o planejamento.
  Success signal: pelo menos 70% dos planos criados em teste contem destino, datas, orcamento e ao menos 3 itens de roteiro ou pendencias.
- Objective: Melhorar alinhamento entre participantes antes da reserva.
  Success signal: pelo menos 60% dos planos compartilhados recebem visualizacao ou comentario/atualizacao de outro participante.
- Objective: Ajudar a decidir se uma opcao de viagem e viavel.
  Success signal: usuarios conseguem registrar custos estimados e marcar uma decisao de seguir, ajustar ou descartar a opcao.
- Objective: Validar valor sem depender de integracoes externas.
  Success signal: usuarios completam o plano manualmente sem solicitar obrigatoriamente importacao automatica de dados.

Fonte: objetivos de negocio/usuario, MVP Canvas, validacao.

## Scope

### In MVP1
- Criar um plano de ferias com nome, destino, datas previstas, participantes e status do planejamento.
- Registrar estimativas de custo por categoria simples, como transporte, hospedagem, alimentacao, passeios e outros.
- Criar um roteiro basico com dias ou periodos e atividades planejadas.
- Registrar pendencias e decisoes, como "comprar passagem", "definir hospedagem" ou "confirmar orcamento".
- Compartilhar uma visao do plano com participantes.
- Permitir edicao manual das principais informacoes do plano.
- Mostrar um resumo do plano com datas, orcamento total estimado, roteiro e pendencias abertas.

### Not In MVP1
- Compra ou reserva dentro do produto.
- Recomendacoes automaticas de destinos, hoteis, voos ou passeios.
- Integracoes com calendarios, bancos, mapas, OTA ou companhias aereas.
- Controle detalhado de despesas realizadas durante a viagem.
- Divisao de custos entre participantes.
- Roteiros multi-cidade complexos com logistica detalhada.
- Aplicativo mobile nativo.
- Perfil publico, feed social ou marketplace de roteiros.

Fonte: Is/Is not/Does/Does not, sequencer, MVP Canvas.

## Primary Journeys

### Criar Plano Inicial
- Actor: Organizador principal.
- Trigger: usuario decide comecar a planejar uma viagem.
- Steps: informar nome da viagem, destino, datas ou janela de datas, participantes e objetivo; salvar plano; ver resumo inicial.
- MVP support: cria o objeto central de planejamento e evita que a viagem comece dispersa em mensagens e notas soltas.

Fonte: jornada do organizador, MVP Canvas.

### Estimar Viabilidade
- Actor: Organizador principal ou decisor financeiro.
- Trigger: grupo precisa entender se a viagem cabe no orcamento.
- Steps: adicionar categorias de custo; preencher valores estimados; revisar total; ajustar ou marcar pendencia de decisao.
- MVP support: torna o custo total visivel antes de compra/reserva.

Fonte: jornada financeira, objetivos, trade-off de decisao.

### Montar Roteiro Basico
- Actor: Organizador principal.
- Trigger: usuario quer transformar ideias em uma programacao compreensivel.
- Steps: adicionar dias ou periodos; registrar atividades; reordenar ou editar itens; consultar roteiro no resumo.
- MVP support: ajuda o grupo a visualizar como as ferias poderiam acontecer sem exigir detalhamento logistico completo.

Fonte: jornada do organizador, feature-to-journey mapping.

### Alinhar Com Participantes
- Actor: Participante da viagem.
- Trigger: organizador compartilha o plano.
- Steps: abrir visao compartilhada; revisar datas, custos, roteiro e pendencias; sinalizar entendimento ou necessidade de ajuste por comentario/atualizacao simples.
- MVP support: reduz desalinhamento e torna pendencias explicitas.

Fonte: jornada do participante, MVP Canvas.

## Requirement Seeds
- O produto deve permitir que o organizador crie um plano de ferias com destino, datas, participantes e status para centralizar o planejamento. Fonte: jornada Criar Plano Inicial, persona Organizador principal.
- O produto deve permitir que o organizador registre estimativas de custo por categoria para avaliar viabilidade antes de compras ou reservas. Fonte: jornada Estimar Viabilidade, objetivo de viabilidade.
- O produto deve exibir um total estimado do orcamento para apoiar decisoes de seguir, ajustar ou descartar o plano. Fonte: objetivo Ajudar a decidir, persona Decisor financeiro.
- O produto deve permitir que o organizador monte um roteiro basico por dia ou periodo para transformar ideias em uma programacao compartilhavel. Fonte: jornada Montar Roteiro Basico.
- O produto deve permitir registrar pendencias e decisoes para deixar claro o que ainda precisa ser resolvido. Fonte: jornada Alinhar Com Participantes, feature card Pendencias.
- O produto deve oferecer uma visao resumida compartilhavel para que participantes entendam datas, custos, roteiro e pendencias sem editar tudo. Fonte: persona Participante, MVP Canvas.
- O produto deve permitir edicao manual das informacoes principais para manter o plano atualizado conforme decisoes mudam. Fonte: jornada Criar Plano Inicial, suposicao de uso iterativo.
- O produto deve manter fora do MVP1 compras, reservas, recomendacoes automaticas e integracoes externas para validar valor com uma experiencia manual primeiro. Fonte: non-goals, trade-off de simplicidade.

## Validation Plan
- Hypothesis: Organizadores percebem valor em centralizar informacoes manualmente antes de qualquer integracao.
  Metric/evidence: taxa de planos com campos essenciais preenchidos e entrevista curta apos uso.
  Threshold or decision rule: continuar se 70% dos usuarios de teste criarem um plano completo o bastante para compartilhar.
- Hypothesis: A visao compartilhavel reduz perguntas repetidas entre participantes.
  Metric/evidence: participantes conseguem responder datas, custo total estimado e pendencias abertas olhando apenas o plano.
  Threshold or decision rule: continuar se 80% dos participantes conseguirem responder essas perguntas em teste moderado.
- Hypothesis: Orcamento estimado e roteiro basico sao suficientes para apoiar a decisao pre-reserva.
  Metric/evidence: usuarios marcam decisao de seguir, ajustar ou descartar e explicam a decisao usando informacoes do plano.
  Threshold or decision rule: pivotar escopo se usuarios exigirem dados externos como requisito para qualquer decisao.

Fonte: MVP Canvas, objetivos, success criteria.

## Risks, Assumptions, And Dependencies
- Risk: O produto pode virar uma planilha piorada se a experiencia de resumo e compartilhamento nao for clara. Mitigation or research item: prototipar resumo do plano e testar compreensao com participantes.
- Risk: Usuarios podem esperar recomendacoes e precos reais desde o primeiro uso. Mitigation or research item: validar proposta "manual primeiro" em entrevista e copy do MVP.
- Risk: Compartilhamento pode criar preocupacoes de privacidade. Mitigation or research item: definir visibilidade minima e evitar dados sensiveis no MVP1.
- Risk: Sem conta/autenticacao, edicao colaborativa pode ser fraca; com conta, friccao aumenta. Mitigation or research item: decidir modelo de acesso durante `/specify`.
- Assumption: O principal momento de valor e antes da compra/reserva, nao durante a viagem. Evidence needed: entrevistas com usuarios que planejaram ferias recentemente.
- Assumption: O organizador aceita inserir dados manualmente se isso gerar clareza para o grupo. Evidence needed: teste de criacao de plano.
- Assumption: Um roteiro basico por dia ou periodo e suficiente para MVP1. Evidence needed: teste de planejamento com viagem real ou ficticia.
- Dependency: Decisao de autenticacao e compartilhamento. Owner or next step: tratar como pergunta aberta de `/specify`.
- Dependency: Modelo de dados para plano, custos, roteiro e pendencias. Owner or next step: detalhar em `/plan` depois da especificacao.

## Trade-Offs And Constraints
- Priorizar simplicidade e clareza sobre automacao.
- Priorizar fluxo pre-reserva sobre acompanhamento durante a viagem.
- Priorizar preenchimento manual confiavel sobre integracoes externas.
- Priorizar resumo compartilhavel sobre colaboracao em tempo real.
- Evitar features que nao se conectem a persona, jornada, objetivo ou validacao do MVP1.

Fonte: trade-off review, MVP principles, Spec Kit constraints.

## Sequencer Summary
- MVP1: criar plano; registrar destino/datas/participantes; estimar custos por categoria; montar roteiro basico; registrar pendencias; visualizar resumo; compartilhar plano.
- Incremento 2 candidates: comentarios por participante; votacao de opcoes; comparacao entre multiplas alternativas de viagem; checklist de documentos e preparativos.
- Incremento 3 candidates: integracao com calendario; mapa simples; divisao de custos; importacao manual de links; anexos; recomendacoes.
- Parked ideas: compra/reserva; recomendacoes automaticas avancadas; marketplace; app nativo; controle financeiro durante a viagem; rede social de roteiros.

Future increments sao provisiorios e devem ser reavaliados apos aprendizado do MVP1.

Fonte: sequencer, feature review.

## Open Questions
- O MVP1 exige login ou pode usar link compartilhavel com permissao simples? Blocks `/specify`? yes.
- Participantes podem editar o plano ou apenas visualizar/comentar no MVP1? Blocks `/specify`? yes.
- O produto deve suportar uma unica opcao de viagem por plano ou comparar multiplas opcoes no MVP1? Blocks `/specify`? yes.
- Qual idioma e moeda padrao do MVP1? Blocks `/specify`? no, assumir portugues do Brasil e BRL se nao houver decisao.
- Quais dados sao considerados sensiveis e nao devem aparecer na visao compartilhada? Blocks `/specify`? yes.
- O plano precisa funcionar offline? Blocks `/specify`? no, assumir online.

## Recommended `/specify` Input
Use este Lean Inception discovery handoff para criar uma especificacao Spec Kit para o MVP1 do produto Planejamento de Ferias. Mantenha a especificacao focada em comportamento observavel pelo usuario, non-goals explicitos, criterios de sucesso mensuraveis, suposicoes, riscos e perguntas abertas. Nao inclua incrementos futuros como requisitos do MVP1, a menos que sejam necessarios para viabilidade.

Foque o MVP1 em: criar plano, registrar destino/datas/participantes, estimar custos por categoria, montar roteiro basico, registrar pendencias, visualizar resumo e compartilhar plano.

Antes de finalizar a especificacao, resolva ou registre claramente as perguntas bloqueadoras sobre login, permissao de participantes, comparacao de opcoes e privacidade da visao compartilhada.
