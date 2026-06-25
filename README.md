# Planejamento de Ferias do Time

MVP interno para gestor cadastrar times, colaboradores, ferias e day-offs, visualizar linha do tempo por time e revisar sobreposicoes de ausencia.

## Estrutura

- `backend/`: API Node.js TypeScript, SQLite, migracoes e testes de contrato/integracao.
- `frontend/`: app React TypeScript com rotas protegidas, telas de cadastro, timeline e conflitos.
- `shared/contracts/openapi.yaml`: contrato OpenAPI sincronizado a partir de `specs/001-planejamento-ferias/contracts/openapi.yaml`.

## Backend

```powershell
cd backend
npm install
npm run migrate
npm run seed
npm run dev
```

Credencial local criada pelo seed:

- Email: `gestor@example.com`
- Senha: `senha123`

Comandos uteis:

```powershell
npm run build
npm run test
npm run test:contract
npm run test:integration
npm run validate
```

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

O Vite roda em `http://localhost:5173` e proxia chamadas para a API em `http://localhost:3000`.

Comandos uteis:

```powershell
npm run build
npm run test
npm run validate
```

## Validacao

Executado em 2026-06-25:

- Backend: `npm run validate` passou com build TypeScript e 14 testes.
- Frontend: `npm run validate` passou com build Vite/TypeScript e 7 testes.

## Observacoes

- O backend usa o modulo nativo `node:sqlite`, portanto requer Node.js com suporte a `node:sqlite`.
- npm reportou vulnerabilidades de auditoria em dependencias transitivas apos `npm install`; nao foi aplicado `npm audit fix --force` para evitar upgrades quebrando o MVP.
