# Implementation Plan: Planejamento de Ferias do Time

**Branch**: `001-planejamento-ferias` | **Date**: 2026-06-25 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-planejamento-ferias/spec.md`

## Summary

Construir um MVP web interno para que o gestor autentique com email e senha, cadastre times e colaboradores, registre ferias e day-offs individuais, visualize uma linha do tempo por time e identifique sobreposicoes de ausencia no periodo.

A arquitetura inicial sera uma aplicacao web separando `frontend/` React com componentes Radix UI e `backend/` Node.js API. O backend expora uma API HTTP documentada por contrato OpenAPI, persistira dados em SQLite e usara migracoes versionadas para criar e evoluir o schema. A validacao de contrato entre React e Node sera feita a partir do contrato OpenAPI versionado em `specs/001-planejamento-ferias/contracts/openapi.yaml`, com testes que verificam respostas reais do backend e cliente frontend gerado/tipado a partir do mesmo contrato.

## Technical Context

**Language/Version**: TypeScript para frontend React e backend Node.js; Node.js LTS atual do projeto a definir na implementacao.

**Primary Dependencies**: React, Radix UI, Node.js HTTP API, biblioteca de roteamento backend, validacao de dados de entrada, SQLite driver, ferramenta de migracao SQLite, OpenAPI para contrato.

**Storage**: SQLite local, com arquivo de banco configuravel por ambiente e migracoes versionadas em `backend/src/db/migrations/`.

**Testing**: Testes unitarios para regras de dominio, testes de integracao backend com SQLite de teste, testes de contrato API contra OpenAPI, testes frontend de fluxos principais e validacao de cliente tipado.

**Target Platform**: Aplicacao web interna acessada por navegador desktop; backend Node.js executado como servico interno.

**Project Type**: Web application com frontend React e backend Node.js API.

**Performance Goals**: Linha do tempo e resumo de conflitos devem carregar em ate 2 segundos para um time piloto com ate 50 colaboradores e ate 500 registros de ausencia.

**Constraints**: MVP sem integracoes externas; autenticacao simples por email e senha; apenas gestor opera o sistema; SQLite suficiente para piloto; contrato API deve ser validado antes de mudancas de integracao frontend/backend.

**Scale/Scope**: Piloto pequeno ou medio; uma instancia interna; multiplos times cadastrados, mas sem hierarquia organizacional complexa ou planejamento cross-team.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

A constituicao do projeto ainda contem placeholders de template e nao define principios ratificados. Gate considerado aprovado sem restricoes adicionais. Decisoes de arquitetura seguem a especificacao, o discovery handoff e os non-goals do MVP1.

Post-design check: aprovado. O plano preserva os limites do MVP1, evita integracoes fora de escopo, mantem o sistema oficial de ferias como dependencia externa e inclui validacao de contrato para reduzir divergencia entre frontend e backend.

## Project Structure

### Documentation (this feature)

```text
specs/001-planejamento-ferias/
+-- discovery.md
+-- spec.md
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- openapi.yaml
|   +-- ui-contract.md
+-- checklists/
|   +-- requirements.md
+-- tasks.md
```

### Source Code (repository root)

```text
frontend/
+-- package.json
+-- index.html
+-- src/
|   +-- app/
|   |   +-- App.tsx
|   |   +-- routes.tsx
|   |   +-- providers.tsx
|   +-- components/
|   |   +-- ui/                 # wrappers Radix UI e componentes base
|   |   +-- layout/             # shell, navegacao, header
|   |   +-- feedback/           # alerts, empty states, loading states
|   +-- features/
|   |   +-- auth/
|   |   +-- teams/
|   |   +-- employees/
|   |   +-- absences/
|   |   +-- timeline/
|   |   +-- conflicts/
|   +-- lib/
|   |   +-- api-client/         # cliente gerado/tipado a partir do OpenAPI
|   |   +-- dates/
|   |   +-- validation/
|   +-- styles/
|   +-- tests/
|       +-- contract/
|       +-- integration/
|       +-- unit/
+-- tests/

backend/
+-- package.json
+-- src/
|   +-- app.ts
|   +-- server.ts
|   +-- api/
|   |   +-- auth.routes.ts
|   |   +-- teams.routes.ts
|   |   +-- employees.routes.ts
|   |   +-- vacations.routes.ts
|   |   +-- dayoffs.routes.ts
|   |   +-- timeline.routes.ts
|   |   +-- conflicts.routes.ts
|   +-- domain/
|   |   +-- absence-overlap.ts
|   |   +-- vacation-status.ts
|   |   +-- date-range.ts
|   +-- services/
|   |   +-- auth.service.ts
|   |   +-- teams.service.ts
|   |   +-- employees.service.ts
|   |   +-- absences.service.ts
|   |   +-- timeline.service.ts
|   |   +-- conflicts.service.ts
|   +-- repositories/
|   |   +-- managers.repository.ts
|   |   +-- teams.repository.ts
|   |   +-- employees.repository.ts
|   |   +-- vacations.repository.ts
|   |   +-- dayoffs.repository.ts
|   +-- db/
|   |   +-- connection.ts
|   |   +-- migrate.ts
|   |   +-- seed.ts
|   |   +-- migrations/
|   |       +-- 001_initial_schema.sql
|   +-- validation/
|   +-- contracts/
|       +-- openapi.ts          # carregamento/validacao local do contrato
+-- tests/
    +-- contract/
    +-- integration/
    +-- unit/

shared/
+-- contracts/
    +-- openapi.yaml            # copia ou link controlado do contrato Spec Kit
```

**Structure Decision**: Usar estrutura web com `frontend/`, `backend/` e contrato compartilhado. O frontend fica organizado por features de produto e wrappers Radix UI em `components/ui`. O backend separa rotas HTTP, servicos de caso de uso, repositorios SQLite, dominio puro para calculo de sobreposicao e scripts de banco. Contratos ficam em `specs/001-planejamento-ferias/contracts/` como fonte de planejamento e devem ser sincronizados para `shared/contracts/` durante implementacao.

## Architecture Decisions

- Frontend React usa Radix UI para primitivas acessiveis de dialog, popover, select, tabs, tooltip, alert dialog e form controls compostos.
- O frontend nao acessa SQLite diretamente; toda leitura e escrita passa pela API Node.js.
- A API Node.js e a fronteira de regra de negocio, incluindo autenticacao, validacao de entrada, persistencia e calculo de sobreposicoes.
- SQLite e escolhido para o MVP pela simplicidade operacional do piloto e baixo custo de setup.
- Migracoes SQL versionadas sao a fonte de evolucao do schema. A aplicacao deve executar migracoes pendentes no bootstrap de ambiente local/teste e permitir comando explicito para ambientes controlados.
- Sobreposicoes sao calculadas por regra de dominio: dois ou mais colaboradores diferentes do mesmo time possuem ferias ou day-offs que compartilham pelo menos um dia.
- O contrato OpenAPI e a fonte compartilhada entre frontend e backend. Mudancas de endpoints ou payloads exigem atualizacao do contrato e testes de contrato.

## API Contract Validation

- `contracts/openapi.yaml` define endpoints, schemas, codigos de resposta e erros padronizados.
- Backend deve ter testes de contrato que iniciam a API em ambiente de teste, exercitam endpoints principais e validam respostas contra OpenAPI.
- Frontend deve usar cliente tipado/gerado ou tipos derivados do OpenAPI para reduzir divergencia de payload.
- CI/local validation deve falhar quando:
  - backend retorna resposta fora do schema;
  - frontend espera campo inexistente no contrato;
  - contrato muda sem atualizar testes ou cliente;
  - exemplos do contrato deixam de representar respostas validas.

## Database And Migration Plan

- SQLite database path configuravel por variavel de ambiente, com default local em `backend/data/app.db`.
- Banco de teste isolado por execucao, preferencialmente arquivo temporario ou memoria.
- `schema_migrations` controla migracoes aplicadas.
- Migracoes vivem em `backend/src/db/migrations/*.sql`, com prefixo sequencial.
- `backend/src/db/connection.ts` centraliza conexao SQLite, pragmas e fechamento limpo.
- `backend/src/db/migrate.ts` aplica migracoes em ordem, dentro de transacao quando suportado.
- Primeira migracao cria: `managers`, `teams`, `employees`, `vacations`, `day_offs`, indices de periodo e chaves estrangeiras.
- Senhas de gestor devem ser armazenadas como hash, nunca como texto puro.

## Complexity Tracking

Nao ha violacoes constitucionais registradas. A separacao frontend/backend/shared e necessaria porque o usuario solicitou explicitamente React, API Node.js e validacao de contrato entre ambos.
