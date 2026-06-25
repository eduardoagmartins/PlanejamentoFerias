# UI Contract - Planejamento de Ferias do Time

## Purpose

Definir a estrutura funcional esperada do frontend React para que o MVP atenda a especificacao sem transformar detalhes visuais em requisitos de implementacao rigidos.

## Routes

- `/login`: autenticacao do gestor com email e senha.
- `/app`: shell autenticado com selecao de time e resumo inicial.
- `/app/teams`: cadastro e edicao de times.
- `/app/teams/:teamId/employees`: cadastro e edicao de colaboradores do time.
- `/app/teams/:teamId/timeline`: linha do tempo do time com ferias, day-offs e avisos de sobreposicao.
- `/app/teams/:teamId/conflicts`: resumo de conflitos do time.

## Feature Modules

- `features/auth`: formulario de login, logout, estado de sessao e protecao de rotas.
- `features/teams`: listagem, criacao, edicao e remocao de times.
- `features/employees`: listagem, criacao, edicao e remocao/desativacao de colaboradores.
- `features/absences`: formularios de ferias e day-offs individuais.
- `features/timeline`: visualizacao por colaborador e periodo.
- `features/conflicts`: resumo de sobreposicoes.

## Radix UI Usage

- Dialog/Alert Dialog: confirmacoes de remocao, formularios modais quando adequado.
- Select: status de ferias e selecao de time.
- Tabs: alternancia entre timeline e resumo quando estiverem na mesma area.
- Tooltip: explicacao de marcadores de sobreposicao.
- Popover: filtros de periodo e selecao compacta de datas se usado.

## Expected States

Cada tela de dados deve prever:

- loading inicial;
- estado vazio;
- erro recuperavel;
- sucesso apos salvar;
- confirmacao antes de remocao destrutiva;
- validacao de campos obrigatorios;
- bloqueio de acesso quando nao autenticado.

## API Client Contract

- O cliente HTTP do frontend deve ser derivado de `contracts/openapi.yaml` ou manter tipos sincronizados com ele.
- Chamadas frontend devem tratar erros padronizados no formato `Error`.
- Alteracoes de payload devem falhar em testes de contrato antes de chegar ao fluxo manual.
