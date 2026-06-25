# Data Model - Planejamento de Ferias do Time

## Overview

O modelo separa o usuario operador do MVP (`Manager`) das entidades planejadas (`Team`, `Employee`, `Vacation`, `DayOff`). Sobreposicoes sao dados derivados calculados a partir de ferias e day-offs, nao armazenados como entidade principal no MVP1.

## Entities

### Manager

Representa o gestor autenticado que acessa e opera o sistema.

Fields:
- `id`: identificador unico.
- `name`: nome do gestor.
- `email`: email unico usado no login.
- `password_hash`: hash da senha.
- `created_at`: data de criacao.
- `updated_at`: data da ultima atualizacao.

Validation:
- `email` obrigatorio e unico.
- `password_hash` obrigatorio.
- Senha em texto puro nunca deve ser persistida.

Relationships:
- Um gestor pode possuir varios times.

### Team

Unidade de planejamento de ausencias.

Fields:
- `id`: identificador unico.
- `manager_id`: gestor responsavel.
- `name`: nome do time.
- `created_at`: data de criacao.
- `updated_at`: data da ultima atualizacao.
- `archived_at`: data opcional de arquivamento.

Validation:
- `name` obrigatorio.
- Nomes de time devem ser unicos por gestor para evitar ambiguidade operacional.

Relationships:
- Pertence a um gestor.
- Possui varios colaboradores.

### Employee

Colaborador planejado dentro de um time.

Fields:
- `id`: identificador unico.
- `team_id`: time ao qual pertence.
- `name`: nome obrigatorio.
- `email`: email opcional.
- `corporate_identifier`: identificador corporativo opcional.
- `role`: papel/cargo opcional.
- `active`: indica se o colaborador aparece para novos planejamentos.
- `created_at`: data de criacao.
- `updated_at`: data da ultima atualizacao.

Validation:
- `name` obrigatorio.
- `team_id` obrigatorio.
- `email`, quando informado, deve ter formato de email.

Relationships:
- Pertence a um time.
- Pode ter varios registros de ferias.
- Pode ter varios day-offs individuais.

### Vacation

Periodo de ferias planejadas de um colaborador.

Fields:
- `id`: identificador unico.
- `employee_id`: colaborador.
- `start_date`: data inicial.
- `end_date`: data final.
- `status`: `Agendado`, `Em andamento` ou `Encerradas`.
- `notes`: observacao opcional.
- `created_at`: data de criacao.
- `updated_at`: data da ultima atualizacao.

Validation:
- `employee_id`, `start_date`, `end_date` e `status` obrigatorios.
- `end_date` deve ser igual ou posterior a `start_date`.
- `status` deve pertencer ao conjunto permitido.

State transitions:
- `Agendado` -> `Em andamento`
- `Agendado` -> `Encerradas`
- `Em andamento` -> `Encerradas`
- Ajustes manuais sao permitidos no MVP para corrigir cadastro, mas devem preservar status valido.

Relationships:
- Pertence a um colaborador.
- Time e gestor sao derivados do colaborador.

### DayOff

Ausencia individual nao classificada como ferias.

Fields:
- `id`: identificador unico.
- `employee_id`: colaborador.
- `start_date`: data inicial.
- `end_date`: data final.
- `reason`: motivo ou descricao.
- `created_at`: data de criacao.
- `updated_at`: data da ultima atualizacao.

Validation:
- `employee_id`, `start_date`, `end_date` e `reason` obrigatorios.
- `end_date` deve ser igual ou posterior a `start_date`.

Relationships:
- Pertence a um colaborador.
- Time e gestor sao derivados do colaborador.

### Absence

Conceito de leitura usado pela linha do tempo para unificar ferias e day-offs.

Fields:
- `type`: `vacation` ou `day_off`.
- `source_id`: identificador do registro original.
- `employee_id`: colaborador.
- `team_id`: time.
- `start_date`: data inicial.
- `end_date`: data final.
- `label`: status de ferias ou motivo do day-off.

Persistence:
- Nao precisa de tabela propria no MVP1; pode ser uma consulta ou composicao de dados no servico.

### Overlap

Conflito derivado quando dois ou mais colaboradores diferentes do mesmo time possuem ausencias que compartilham pelo menos um dia.

Fields:
- `team_id`: time analisado.
- `start_date`: inicio do periodo sobreposto.
- `end_date`: fim do periodo sobreposto.
- `employee_ids`: colaboradores envolvidos.
- `absence_refs`: referencias para ferias/day-offs envolvidos.

Persistence:
- Nao persistir no MVP1; calcular sob demanda para linha do tempo e resumo de conflitos.

## SQLite Schema Draft

```sql
CREATE TABLE schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL
);

CREATE TABLE managers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  manager_id TEXT NOT NULL REFERENCES managers(id),
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(manager_id, name)
);

CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id),
  name TEXT NOT NULL,
  email TEXT,
  corporate_identifier TEXT,
  role TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE vacations (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Agendado', 'Em andamento', 'Encerradas')),
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (end_date >= start_date)
);

CREATE TABLE day_offs (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (end_date >= start_date)
);

CREATE INDEX idx_employees_team ON employees(team_id);
CREATE INDEX idx_vacations_employee_period ON vacations(employee_id, start_date, end_date);
CREATE INDEX idx_day_offs_employee_period ON day_offs(employee_id, start_date, end_date);
```

## Connection And Migration Strategy

- `backend/src/db/connection.ts` opens the SQLite connection from `DATABASE_URL` or `SQLITE_PATH`.
- Enable foreign keys on every connection with `PRAGMA foreign_keys = ON`.
- Use ISO date strings (`YYYY-MM-DD`) for business dates and ISO timestamps for audit fields.
- `backend/src/db/migrate.ts` reads ordered SQL files from `backend/src/db/migrations/`.
- Each migration inserts its version into `schema_migrations` after successful execution.
- Local and test startup may run migrations automatically; production/pilot deployment should run migration command explicitly before starting the app.
- Integration tests use isolated SQLite databases and reset state per test suite.
