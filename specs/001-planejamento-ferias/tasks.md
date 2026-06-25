# Tasks: Planejamento de Ferias do Time

**Input**: Design documents from `/specs/001-planejamento-ferias/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: Included because the implementation plan requires API contract validation between React and Node, backend integration validation with SQLite, and frontend flow validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize frontend, backend, shared contracts, and developer commands.

- [X] T001 Create repository folders `frontend/`, `backend/`, `shared/contracts/`, `frontend/src/`, and `backend/src/`
- [X] T002 Initialize backend TypeScript Node.js package in `backend/package.json`
- [X] T003 Initialize frontend React TypeScript package in `frontend/package.json`
- [X] T004 [P] Configure backend TypeScript settings in `backend/tsconfig.json`
- [X] T005 [P] Configure frontend TypeScript settings in `frontend/tsconfig.json`
- [X] T006 [P] Configure frontend app entry files in `frontend/index.html`, `frontend/src/app/App.tsx`, and `frontend/src/app/routes.tsx`
- [X] T007 [P] Configure shared linting and formatting scripts in `backend/package.json` and `frontend/package.json`
- [X] T008 Copy API contract from `specs/001-planejamento-ferias/contracts/openapi.yaml` to `shared/contracts/openapi.yaml`
- [X] T009 Add local environment examples for API and SQLite paths in `backend/.env.example` and `frontend/.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core API, database, validation, contract, and UI foundation that MUST complete before user story work.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T010 Create backend application bootstrap in `backend/src/app.ts` and `backend/src/server.ts`
- [X] T011 Create backend environment configuration loader in `backend/src/config/env.ts`
- [X] T012 Create backend standardized error model and error middleware in `backend/src/api/error-handler.ts`
- [X] T013 Create backend request validation helper in `backend/src/validation/request-validation.ts`
- [X] T014 Create SQLite connection module with foreign keys enabled in `backend/src/db/connection.ts`
- [X] T015 Create migration runner using `schema_migrations` in `backend/src/db/migrate.ts`
- [X] T016 Create initial SQLite migration in `backend/src/db/migrations/001_initial_schema.sql`
- [X] T017 Create backend test database helper in `backend/tests/helpers/test-db.ts`
- [X] T018 [P] Create backend OpenAPI contract loader in `backend/src/contracts/openapi.ts`
- [X] T019 [P] Create backend contract test helper in `backend/tests/contract/openapi-matchers.ts`
- [X] T020 [P] Create frontend API client base from shared OpenAPI contract in `frontend/src/lib/api-client/client.ts`
- [X] T021 [P] Create frontend route guard shell in `frontend/src/app/providers.tsx`
- [X] T022 [P] Create Radix UI wrapper components in `frontend/src/components/ui/`
- [X] T023 [P] Create frontend layout shell components in `frontend/src/components/layout/AppShell.tsx`
- [X] T024 [P] Create shared date helpers for ISO date ranges in `backend/src/domain/date-range.ts` and `frontend/src/lib/dates/date-range.ts`
- [X] T025 Create backend seed script for one test manager in `backend/src/db/seed.ts`

**Checkpoint**: Foundation ready. User story implementation can begin.

---

## Phase 3: User Story 1 - Acessar Como Gestor (Priority: P1) MVP

**Goal**: Gestor acessa o sistema com email e senha, rotas protegidas bloqueiam nao autenticados, e sessao pode ser encerrada.

**Independent Test**: Criar uma credencial de gestor, autenticar com email e senha validos, acessar `/me`, negar credenciais invalidas e bloquear rotas sem sessao.

### Tests for User Story 1

- [X] T026 [P] [US1] Add contract tests for `/auth/login`, `/auth/logout`, and `/me` in `backend/tests/contract/auth.contract.test.ts`
- [X] T027 [P] [US1] Add backend integration tests for valid login, invalid login, logout, and unauthenticated access in `backend/tests/integration/auth.integration.test.ts`
- [X] T028 [P] [US1] Add frontend route protection tests in `frontend/src/tests/integration/auth-flow.test.tsx`

### Implementation for User Story 1

- [X] T029 [P] [US1] Create manager repository in `backend/src/repositories/managers.repository.ts`
- [X] T030 [US1] Implement password hashing and session behavior in `backend/src/services/auth.service.ts`
- [X] T031 [US1] Implement authentication middleware in `backend/src/api/auth.middleware.ts`
- [X] T032 [US1] Implement auth routes in `backend/src/api/auth.routes.ts`
- [X] T033 [US1] Register auth routes and protected `/me` route in `backend/src/app.ts`
- [X] T034 [P] [US1] Implement frontend auth API functions in `frontend/src/features/auth/auth.api.ts`
- [X] T035 [US1] Implement login page in `frontend/src/features/auth/LoginPage.tsx`
- [X] T036 [US1] Implement authenticated route guard and logout action in `frontend/src/features/auth/AuthProvider.tsx`
- [X] T037 [US1] Connect `/login` and `/app` routes in `frontend/src/app/routes.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Cadastrar Estrutura Do Time (Priority: P1)

**Goal**: Gestor cadastra, edita, lista e remove times e colaboradores vinculados ao time.

**Independent Test**: Com gestor autenticado, criar um time, cadastrar colaboradores, editar um colaborador e confirmar que a lista do time reflete as mudancas.

### Tests for User Story 2

- [X] T038 [P] [US2] Add contract tests for `/teams`, `/teams/{teamId}`, and `/teams/{teamId}/employees` in `backend/tests/contract/team-employee.contract.test.ts`
- [X] T039 [P] [US2] Add backend integration tests for team CRUD in `backend/tests/integration/teams.integration.test.ts`
- [X] T040 [P] [US2] Add backend integration tests for employee CRUD in `backend/tests/integration/employees.integration.test.ts`
- [X] T041 [P] [US2] Add frontend tests for team and employee forms in `frontend/src/tests/integration/team-employee-flow.test.tsx`

### Implementation for User Story 2

- [X] T042 [P] [US2] Create team repository in `backend/src/repositories/teams.repository.ts`
- [X] T043 [P] [US2] Create employee repository in `backend/src/repositories/employees.repository.ts`
- [X] T044 [US2] Implement team service in `backend/src/services/teams.service.ts`
- [X] T045 [US2] Implement employee service in `backend/src/services/employees.service.ts`
- [X] T046 [US2] Implement team API routes in `backend/src/api/teams.routes.ts`
- [X] T047 [US2] Implement employee API routes in `backend/src/api/employees.routes.ts`
- [X] T048 [US2] Register team and employee routes in `backend/src/app.ts`
- [X] T049 [P] [US2] Implement frontend teams API module in `frontend/src/features/teams/teams.api.ts`
- [X] T050 [P] [US2] Implement frontend employees API module in `frontend/src/features/employees/employees.api.ts`
- [X] T051 [US2] Implement team list and form UI in `frontend/src/features/teams/TeamsPage.tsx`
- [X] T052 [US2] Implement employee list and form UI in `frontend/src/features/employees/EmployeesPage.tsx`
- [X] T053 [US2] Add team selection to app shell in `frontend/src/components/layout/AppShell.tsx`

**Checkpoint**: User Story 2 is functional and independently testable.

---

## Phase 5: User Story 3 - Registrar Ferias E Day-Offs Individuais (Priority: P1)

**Goal**: Gestor registra, edita e remove ferias com status permitido e day-offs individuais por colaborador.

**Independent Test**: Com time e colaborador existentes, cadastrar ferias `Agendado`, alterar para `Em andamento`, cadastrar day-off individual e rejeitar periodo invalido.

### Tests for User Story 3

- [X] T054 [P] [US3] Add contract tests for `/vacations` and `/vacations/{vacationId}` in `backend/tests/contract/vacations.contract.test.ts`
- [X] T055 [P] [US3] Add contract tests for `/day-offs` and `/day-offs/{dayOffId}` in `backend/tests/contract/dayoffs.contract.test.ts`
- [X] T056 [P] [US3] Add backend integration tests for vacation status and invalid periods in `backend/tests/integration/vacations.integration.test.ts`
- [X] T057 [P] [US3] Add backend integration tests for individual day-off CRUD in `backend/tests/integration/dayoffs.integration.test.ts`
- [X] T058 [P] [US3] Add frontend tests for vacation and day-off forms in `frontend/src/tests/integration/absence-flow.test.tsx`

### Implementation for User Story 3

- [X] T059 [P] [US3] Create vacation status domain helper in `backend/src/domain/vacation-status.ts`
- [X] T060 [P] [US3] Create vacation repository in `backend/src/repositories/vacations.repository.ts`
- [X] T061 [P] [US3] Create day-off repository in `backend/src/repositories/dayoffs.repository.ts`
- [X] T062 [US3] Implement shared absence service validation in `backend/src/services/absences.service.ts`
- [X] T063 [US3] Implement vacation API routes in `backend/src/api/vacations.routes.ts`
- [X] T064 [US3] Implement day-off API routes in `backend/src/api/dayoffs.routes.ts`
- [X] T065 [US3] Register vacation and day-off routes in `backend/src/app.ts`
- [X] T066 [P] [US3] Implement frontend absence API module in `frontend/src/features/absences/absences.api.ts`
- [X] T067 [US3] Implement vacation form UI in `frontend/src/features/absences/VacationForm.tsx`
- [X] T068 [US3] Implement day-off form UI in `frontend/src/features/absences/DayOffForm.tsx`
- [X] T069 [US3] Implement absence management page in `frontend/src/features/absences/AbsencesPage.tsx`

**Checkpoint**: User Story 3 is functional and independently testable.

---

## Phase 6: User Story 4 - Visualizar Linha Do Tempo E Sobreposicoes (Priority: P1)

**Goal**: Gestor visualiza ferias e day-offs por colaborador em uma linha do tempo do time, com aviso de sobreposicao no periodo.

**Independent Test**: Criar ausencias sobrepostas para dois colaboradores do mesmo time e confirmar que a linha do tempo sinaliza sobreposicao; ajustar uma ausencia e confirmar que o aviso desaparece.

### Tests for User Story 4

- [X] T070 [P] [US4] Add contract tests for `/teams/{teamId}/timeline` in `backend/tests/contract/timeline.contract.test.ts`
- [X] T071 [P] [US4] Add backend unit tests for overlap detection in `backend/tests/unit/absence-overlap.test.ts`
- [X] T072 [P] [US4] Add backend integration tests for timeline rows and overlapping absences in `backend/tests/integration/timeline.integration.test.ts`
- [X] T073 [P] [US4] Add frontend tests for timeline rendering and overlap marker in `frontend/src/tests/integration/timeline-flow.test.tsx`

### Implementation for User Story 4

- [X] T074 [P] [US4] Implement overlap detection domain logic in `backend/src/domain/absence-overlap.ts`
- [X] T075 [US4] Implement timeline service in `backend/src/services/timeline.service.ts`
- [X] T076 [US4] Implement timeline API route in `backend/src/api/timeline.routes.ts`
- [X] T077 [US4] Register timeline route in `backend/src/app.ts`
- [X] T078 [P] [US4] Implement frontend timeline API module in `frontend/src/features/timeline/timeline.api.ts`
- [X] T079 [US4] Implement timeline grid component in `frontend/src/features/timeline/TimelineGrid.tsx`
- [X] T080 [US4] Implement overlap marker and tooltip UI in `frontend/src/features/timeline/OverlapMarker.tsx`
- [X] T081 [US4] Implement timeline page and period controls in `frontend/src/features/timeline/TimelinePage.tsx`

**Checkpoint**: User Story 4 is functional and independently testable.

---

## Phase 7: User Story 5 - Revisar Resumo De Conflitos (Priority: P2)

**Goal**: Gestor consulta um resumo dos periodos com sobreposicao e colaboradores envolvidos.

**Independent Test**: Criar multiplas sobreposicoes, abrir o resumo de conflitos, confirmar periodos e colaboradores envolvidos, corrigir uma ausencia e confirmar que o conflito sai do resumo.

### Tests for User Story 5

- [X] T082 [P] [US5] Add contract tests for `/teams/{teamId}/conflicts` in `backend/tests/contract/conflicts.contract.test.ts`
- [X] T083 [P] [US5] Add backend integration tests for conflict summary updates in `backend/tests/integration/conflicts.integration.test.ts`
- [X] T084 [P] [US5] Add frontend tests for conflict summary states in `frontend/src/tests/integration/conflicts-flow.test.tsx`

### Implementation for User Story 5

- [X] T085 [US5] Implement conflicts service using overlap detection in `backend/src/services/conflicts.service.ts`
- [X] T086 [US5] Implement conflicts API route in `backend/src/api/conflicts.routes.ts`
- [X] T087 [US5] Register conflicts route in `backend/src/app.ts`
- [X] T088 [P] [US5] Implement frontend conflicts API module in `frontend/src/features/conflicts/conflicts.api.ts`
- [X] T089 [US5] Implement conflict summary page in `frontend/src/features/conflicts/ConflictsPage.tsx`
- [X] T090 [US5] Link timeline and conflicts navigation in `frontend/src/app/routes.tsx`

**Checkpoint**: User Story 5 is functional and independently testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validation, quality, documentation, and MVP readiness across all stories.

- [X] T091 [P] Synchronize final OpenAPI contract from `specs/001-planejamento-ferias/contracts/openapi.yaml` to `shared/contracts/openapi.yaml`
- [X] T092 [P] Add quickstart validation script references in `backend/package.json` and `frontend/package.json`
- [X] T093 Run backend unit, integration, and contract test suites from `backend/package.json`
- [X] T094 Run frontend unit/integration and API client validation suites from `frontend/package.json`
- [X] T095 Execute quickstart scenarios and record results in `specs/001-planejamento-ferias/checklists/requirements.md`
- [X] T096 [P] Review frontend empty, loading, validation, and error states across `frontend/src/features/`
- [X] T097 [P] Review backend error responses against `components.schemas.Error` in `specs/001-planejamento-ferias/contracts/openapi.yaml`
- [X] T098 [P] Document local run, migration, seed, and contract validation commands in `README.md`
- [X] T099 Verify MVP non-goals are not implemented accidentally in `frontend/src/` and `backend/src/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 8)**: Depends on all desired stories being complete.

### User Story Dependencies

- **US1 Acessar Como Gestor (P1)**: Starts after Foundation; required before practical manual validation of protected screens.
- **US2 Cadastrar Estrutura Do Time (P1)**: Starts after Foundation; can be implemented in parallel with US1 backend work, but UI access depends on US1 route guard.
- **US3 Registrar Ferias E Day-Offs Individuais (P1)**: Depends on US2 entities and endpoints.
- **US4 Visualizar Linha Do Tempo E Sobreposicoes (P1)**: Depends on US2 and US3 data being available.
- **US5 Revisar Resumo De Conflitos (P2)**: Depends on US4 overlap logic.

### Within Each User Story

- Contract and integration tests should be written first and fail before implementation.
- Repositories and domain helpers before services.
- Services before API routes.
- API routes before frontend integration.
- Frontend API modules before pages/components that call them.

---

## Parallel Opportunities

- T004, T005, T006, T007, T018, T019, T020, T021, T022, T023, and T024 can run in parallel after their parent folders exist.
- US1 tests T026, T027, and T028 can run in parallel.
- US2 repositories T042 and T043 can run in parallel; frontend API modules T049 and T050 can run in parallel.
- US3 repositories and domain helper T059, T060, and T061 can run in parallel; tests T054 through T058 can run in parallel.
- US4 tests T070 through T073 can run in parallel with T074 once contracts are stable.
- US5 tests T082 through T084 can run in parallel.
- Polish review tasks T096, T097, and T098 can run in parallel.

---

## Parallel Example: User Story 3

```text
Task: "T054 [P] [US3] Add contract tests for /vacations and /vacations/{vacationId} in backend/tests/contract/vacations.contract.test.ts"
Task: "T055 [P] [US3] Add contract tests for /day-offs and /day-offs/{dayOffId} in backend/tests/contract/dayoffs.contract.test.ts"
Task: "T056 [P] [US3] Add backend integration tests for vacation status and invalid periods in backend/tests/integration/vacations.integration.test.ts"
Task: "T057 [P] [US3] Add backend integration tests for individual day-off CRUD in backend/tests/integration/dayoffs.integration.test.ts"
Task: "T058 [P] [US3] Add frontend tests for vacation and day-off forms in frontend/src/tests/integration/absence-flow.test.tsx"
Task: "T059 [P] [US3] Create vacation status domain helper in backend/src/domain/vacation-status.ts"
Task: "T060 [P] [US3] Create vacation repository in backend/src/repositories/vacations.repository.ts"
Task: "T061 [P] [US3] Create day-off repository in backend/src/repositories/dayoffs.repository.ts"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete US1 so access control and session behavior exist.
3. Complete US2 so the gestor can create the planning structure.
4. Complete US3 so vacation and day-off data can be entered.
5. Complete US4 so the core MVP value, timeline with overlap warning, is demonstrable.
6. Stop and validate with quickstart scenarios before adding US5 if schedule is tight.

### Incremental Delivery

1. Deliver authenticated shell.
2. Add team and employee registration.
3. Add vacation and day-off registration.
4. Add timeline and overlap detection.
5. Add conflict summary.
6. Polish validation, documentation, and contract checks.

### Contract-First Workflow

1. Keep `specs/001-planejamento-ferias/contracts/openapi.yaml` as the source of truth.
2. Synchronize to `shared/contracts/openapi.yaml`.
3. Write failing contract tests for each story before backend implementation.
4. Generate or update frontend API client types from the same contract.
5. Treat contract test failures as blockers for story completion.

## Notes

- [P] tasks use different files and can be parallelized after dependencies are satisfied.
- [US1] through [US5] map directly to user stories in [spec.md](spec.md).
- Avoid implementing non-goals: official vacation request, formal approval, vacation balance calculation, external integrations, collaborator access, advanced permissions, and labor-rule engines.
