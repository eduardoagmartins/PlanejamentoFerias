# Feature Specification: Planejamento de Ferias do Time

**Feature Branch**: `001-planejamento-ferias`

**Created**: 2026-06-25

**Status**: Draft

**Input**: User description: "Use o Lean Inception discovery.md handoff para criar uma especificacao do MVP1 do produto Planejamento de Ferias do Time, focada em autenticacao simples para gestor, cadastro de time, colaboradores, ferias, day-offs individuais, linha do tempo, sobreposicoes no periodo, resumo de conflitos e edicao manual dos dados."

**Discovery Source**: [discovery.md](discovery.md)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acessar Como Gestor (Priority: P1)

Como gestor do time, quero acessar o sistema com email e senha para consultar e manter o planejamento de ferias e day-offs do meu time de forma restrita.

**Why this priority**: O planejamento contem dados internos de colaboradores e ausencias. Sem acesso restrito ao gestor, o MVP nao atende ao limite de visibilidade definido no discovery.

**Independent Test**: Pode ser testado criando uma credencial de gestor, acessando o sistema com email e senha validos e verificando que usuarios nao autenticados nao conseguem ver ou alterar o planejamento.

**Acceptance Scenarios**:

1. **Given** um gestor cadastrado, **When** ele informa email e senha validos, **Then** o sistema permite acesso ao planejamento.
2. **Given** uma tentativa de acesso sem autenticacao, **When** a pessoa tenta abrir dados de time, colaboradores, ferias ou day-offs, **Then** o sistema bloqueia o acesso.
3. **Given** credenciais invalidas, **When** o gestor tenta entrar, **Then** o sistema nega o acesso e informa que os dados de entrada nao permitiram autenticacao.

---

### User Story 2 - Cadastrar Estrutura Do Time (Priority: P1)

Como gestor, quero cadastrar times e colaboradores para criar a base usada no planejamento de ferias e day-offs.

**Why this priority**: Sem time e colaboradores, nao existe unidade de planejamento nem pessoas para associar aos periodos de ausencia.

**Independent Test**: Pode ser testado cadastrando um time, cadastrando colaboradores vinculados a ele e consultando a lista do time com os colaboradores esperados.

**Acceptance Scenarios**:

1. **Given** um gestor autenticado sem times cadastrados, **When** ele cria um time com nome valido, **Then** o time fica disponivel para selecao e planejamento.
2. **Given** um time existente, **When** o gestor cadastra um colaborador com nome e vinculo ao time, **Then** o colaborador aparece na lista do time.
3. **Given** um colaborador cadastrado incorretamente, **When** o gestor edita seus dados, **Then** as informacoes atualizadas passam a aparecer no cadastro e na linha do tempo.
4. **Given** um colaborador que nao deve mais ser planejado, **When** o gestor remove ou desativa esse colaborador, **Then** ele deixa de aparecer como opcao para novos registros de ausencia.

---

### User Story 3 - Registrar Ferias E Day-Offs Individuais (Priority: P1)

Como gestor, quero registrar manualmente ferias e day-offs individuais dos colaboradores para manter uma visao completa das ausencias planejadas do time.

**Why this priority**: O valor central do MVP depende de reunir ferias e day-offs individuais em uma unica fonte de planejamento, sem depender de integracao com o sistema oficial.

**Independent Test**: Pode ser testado registrando ferias e day-offs para colaboradores do mesmo time e confirmando que os registros aparecem associados as pessoas corretas.

**Acceptance Scenarios**:

1. **Given** um colaborador cadastrado, **When** o gestor registra ferias com data inicial, data final e status `Agendado`, **Then** o periodo fica associado ao colaborador.
2. **Given** ferias cadastradas, **When** o gestor altera o status para `Em andamento` ou `Encerradas`, **Then** o novo status passa a aparecer nas consultas do planejamento.
3. **Given** um colaborador cadastrado, **When** o gestor registra um day-off individual em uma data ou periodo, **Then** o day-off aparece como ausencia desse colaborador.
4. **Given** um registro incorreto de ferias ou day-off, **When** o gestor edita ou remove o registro, **Then** a linha do tempo e o resumo de conflitos refletem a alteracao.

---

### User Story 4 - Visualizar Linha Do Tempo E Sobreposicoes (Priority: P1)

Como gestor, quero visualizar as ferias e day-offs do time em uma linha do tempo para identificar rapidamente quem estara ausente e onde ha sobreposicao no periodo.

**Why this priority**: A linha do tempo com aviso de sobreposicao e o principal mecanismo para antecipar conflitos de disponibilidade.

**Independent Test**: Pode ser testado criando ausencias sobrepostas para dois colaboradores do mesmo time e verificando que o periodo fica sinalizado como sobreposto na linha do tempo.

**Acceptance Scenarios**:

1. **Given** um time com ferias e day-offs cadastrados, **When** o gestor abre a linha do tempo do time, **Then** o sistema mostra as ausencias por colaborador e periodo.
2. **Given** dois ou mais colaboradores do mesmo time ausentes em datas sobrepostas, **When** o gestor visualiza a linha do tempo, **Then** o sistema informa que ha sobreposicao no periodo.
3. **Given** um periodo sem ausencias simultaneas, **When** o gestor visualiza a linha do tempo, **Then** o sistema nao sinaliza conflito de sobreposicao nesse periodo.
4. **Given** mais de um time cadastrado, **When** o gestor seleciona um time, **Then** a linha do tempo mostra apenas colaboradores e ausencias do time selecionado.

---

### User Story 5 - Revisar Resumo De Conflitos (Priority: P2)

Como gestor, quero consultar um resumo dos conflitos encontrados para decidir quais periodos precisam de ajuste ou conversa com o time.

**Why this priority**: O resumo reduz o esforco de procurar conflitos manualmente em toda a linha do tempo, mas depende dos registros e da visualizacao principal existirem.

**Independent Test**: Pode ser testado criando multiplas sobreposicoes e verificando que o resumo lista os periodos afetados e os colaboradores envolvidos.

**Acceptance Scenarios**:

1. **Given** uma ou mais sobreposicoes no time selecionado, **When** o gestor abre o resumo de conflitos, **Then** o sistema lista os periodos com sobreposicao e os colaboradores envolvidos.
2. **Given** que o gestor corrige uma ausencia que gerava conflito, **When** o resumo e atualizado, **Then** o conflito resolvido deixa de aparecer.
3. **Given** que nao ha sobreposicoes no time selecionado, **When** o gestor consulta o resumo, **Then** o sistema informa que nao ha conflitos de sobreposicao encontrados.

### Edge Cases

- O sistema deve impedir registro de ferias ou day-off com data final anterior a data inicial.
- O sistema deve indicar campos obrigatorios quando o gestor tenta salvar time, colaborador, ferias ou day-off com informacoes minimas ausentes.
- Se uma ausencia comeca antes do periodo visualizado e termina dentro dele, ela deve aparecer na linha do tempo do periodo visualizado.
- Se uma ausencia comeca dentro do periodo visualizado e termina depois dele, ela deve aparecer na linha do tempo do periodo visualizado.
- Se duas ausencias se sobrepoem parcialmente por pelo menos um dia, o periodo deve ser tratado como sobreposicao.
- Ferias e day-offs do mesmo colaborador no mesmo periodo devem ser destacados como inconsistentes para revisao do gestor.
- Remover um colaborador com ausencias existentes deve evitar perda acidental de entendimento historico; o gestor deve receber uma confirmacao clara antes da remocao.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir que um gestor acesse o sistema usando email e senha.
- **FR-002**: O sistema MUST bloquear acesso a dados de planejamento para pessoas nao autenticadas.
- **FR-003**: O sistema MUST permitir que o gestor encerre sua sessao.
- **FR-004**: O sistema MUST permitir que o gestor cadastre um time com nome obrigatorio.
- **FR-005**: O sistema MUST permitir que o gestor edite e remova times cadastrados, preservando consistencia com colaboradores e ausencias associados.
- **FR-006**: O sistema MUST permitir que o gestor cadastre colaboradores vinculados a um time.
- **FR-007**: O cadastro de colaborador MUST incluir nome obrigatorio e MAY incluir email, identificador corporativo e papel/cargo.
- **FR-008**: O sistema MUST permitir que o gestor edite e remova colaboradores cadastrados.
- **FR-009**: O sistema MUST permitir que o gestor registre ferias para um colaborador com data inicial, data final e status obrigatorios.
- **FR-010**: O status de ferias MUST ser limitado a `Agendado`, `Em andamento` e `Encerradas`.
- **FR-011**: O sistema MUST permitir que o gestor edite e remova registros de ferias.
- **FR-012**: O sistema MUST permitir que o gestor registre day-offs individuais para colaboradores.
- **FR-013**: Um day-off individual MUST ter colaborador, data ou periodo, e descricao ou motivo identificavel.
- **FR-014**: O sistema MUST permitir que o gestor edite e remova day-offs individuais.
- **FR-015**: O sistema MUST impedir registros de ferias e day-offs com periodo invalido, incluindo data final anterior a data inicial.
- **FR-016**: O sistema MUST exibir uma linha do tempo por time contendo colaboradores, ferias e day-offs individuais.
- **FR-017**: O sistema MUST permitir que o gestor selecione um time para visualizar apenas o planejamento daquele time.
- **FR-018**: O sistema MUST identificar sobreposicao quando dois ou mais colaboradores do mesmo time tiverem ferias ou day-offs em comum por pelo menos um dia.
- **FR-019**: O sistema MUST informar na linha do tempo que ha sobreposicao no periodo afetado.
- **FR-020**: O sistema MUST oferecer um resumo de conflitos contendo periodo de sobreposicao e colaboradores envolvidos.
- **FR-021**: O sistema MUST atualizar linha do tempo e resumo de conflitos apos criacao, edicao ou remocao de ferias, day-offs, colaboradores ou times.
- **FR-022**: O sistema MUST manter a solicitacao oficial, aprovacao formal, calculo de saldo de ferias e integracoes externas fora do MVP1.
- **FR-023**: O sistema MUST tratar acesso de colaboradores, perfis avancados e regras trabalhistas complexas como fora do escopo do MVP1.

### Scope Boundaries And Non-Goals

- O MVP1 nao solicita ferias no sistema oficial da empresa.
- O MVP1 nao aprova, reprova ou formaliza ferias.
- O MVP1 nao calcula saldo de ferias, abono, decimo terceiro, dias legais ou regras trabalhistas.
- O MVP1 nao integra com sistemas de RH, calendario corporativo, ponto, folha, SSO ou sistema oficial de solicitacao.
- O MVP1 nao oferece acesso para colaboradores cadastrarem suas proprias intencoes de ferias.
- O MVP1 nao implementa perfis avancados de permissao.
- O MVP1 nao aplica regras complexas de capacidade minima por papel, senioridade, squad ou criticidade operacional.

### Decisions From Discovery

- Apenas o gestor acessa e opera o MVP1.
- O gestor cadastra times, colaboradores, ferias e day-offs.
- Os status de ferias do MVP1 sao `Agendado`, `Em andamento` e `Encerradas`.
- Sobreposicoes devem ser visiveis na linha do tempo e indicar que ha sobreposicao no periodo.
- Day-off no MVP1 e individual por colaborador.
- Autenticacao do MVP1 e simples, com email e senha.

### Risks

- Gestores podem interpretar o sistema como fonte oficial de solicitacao ou aprovacao de ferias; a especificacao limita explicitamente o MVP ao planejamento.
- Dados de ausencias podem ser sensiveis; o MVP restringe acesso ao gestor autenticado.
- Cadastro manual pode ficar trabalhoso em times grandes; o MVP assume um piloto pequeno ou medio antes de considerar importacao.
- A regra simples de sobreposicao pode nao cobrir todos os riscos operacionais; regras por papel, senioridade ou capacidade ficam fora do MVP1 e devem ser reavaliadas apos o piloto.
- O planejamento manual pode divergir do sistema oficial; o MVP deve deixar claro que a formalizacao continua fora da aplicacao.

### Open Questions

- O piloto deve considerar qualquer sobreposicao como conflito, ou alguns times toleram mais de uma pessoa ausente no mesmo periodo?
- Feriados nacionais, locais e fins de semana devem aparecer como contexto visual na linha do tempo, mesmo sem afetar a regra de conflito do MVP1?
- O horizonte padrao de planejamento deve ser mensal, trimestral, semestral ou anual para o primeiro piloto?

### Key Entities

- **Gestor**: Usuario autenticado que acessa e opera o sistema. Possui email, senha e permissao para cadastrar e manter dados de planejamento.
- **Time**: Unidade de planejamento gerenciada pelo gestor. Possui nome e colaboradores vinculados.
- **Colaborador**: Pessoa pertencente a um time e sujeita a planejamento de ferias e day-offs. Possui nome obrigatorio e pode ter email, identificador corporativo e papel/cargo.
- **Ferias**: Periodo planejado de ausencia de um colaborador. Possui colaborador, time derivado do colaborador, data inicial, data final e status.
- **Day-Off Individual**: Ausencia individual nao classificada como ferias. Possui colaborador, data ou periodo, e descricao ou motivo.
- **Sobreposicao**: Situacao em que dois ou mais colaboradores do mesmo time possuem ausencias que coincidem por pelo menos um dia.
- **Resumo De Conflitos**: Visao consolidada das sobreposicoes encontradas em um time, incluindo periodo afetado e colaboradores envolvidos.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um gestor consegue cadastrar um time com pelo menos 10 colaboradores em ate 10 minutos durante um teste de uso.
- **SC-002**: Um gestor consegue registrar ferias ou day-off individual para um colaborador em ate 2 minutos.
- **SC-003**: Um gestor consegue identificar quem estara ausente em uma semana ou mes especifico em ate 2 minutos usando a linha do tempo.
- **SC-004**: Em cenarios de teste com sobreposicoes conhecidas, o gestor identifica pelo menos 80% dos conflitos criticos usando a linha do tempo e o resumo de conflitos.
- **SC-005**: 100% dos periodos com duas ou mais ausencias de colaboradores diferentes do mesmo time sao sinalizados como sobreposicao.
- **SC-006**: Pelo menos 70% dos planejamentos de ausencia do time piloto sao registrados no sistema durante o periodo de validacao do MVP.
- **SC-007**: Gestores participantes do piloto avaliam a clareza da linha do tempo e do resumo de conflitos com nota media minima de 4 em uma escala de 1 a 5.

## Assumptions

- O MVP1 sera usado por gestores em um piloto com time pequeno ou medio.
- O gestor e o unico usuario que acessa e opera o sistema no MVP1.
- Colaboradores nao acessam o sistema no MVP1; seus dados e ausencias sao cadastrados pelo gestor.
- Autenticacao por email e senha e suficiente para o piloto.
- Qualquer sobreposicao de ausencias entre colaboradores diferentes do mesmo time deve ser sinalizada no MVP1.
- Day-offs sao individuais por colaborador no MVP1.
- O sistema oficial de solicitacao de ferias continua sendo a fonte de formalizacao fora do MVP.
- Dados sao cadastrados manualmente no MVP1; importacoes e integracoes ficam para incrementos futuros.
- A linha do tempo deve permitir visualizacao util de um horizonte anual, com navegacao por periodo menor quando necessario.
