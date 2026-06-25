# Quickstart - Planejamento de Ferias do Time

## Goal

Validar o plano tecnico do MVP1 de ponta a ponta: frontend React, backend Node.js, SQLite com migracoes e contrato API entre React e Node.

## Prerequisites

- Node.js LTS instalado.
- Gerenciador de pacotes JavaScript definido na implementacao.
- SQLite disponivel via dependencia do backend.
- Feature artifacts revisados:
  - [spec.md](spec.md)
  - [data-model.md](data-model.md)
  - [contracts/openapi.yaml](contracts/openapi.yaml)

## Initial Setup

1. Instalar dependencias do backend.
2. Instalar dependencias do frontend.
3. Configurar caminho do SQLite local, por exemplo `backend/data/app.db`.
4. Executar migracoes do backend.
5. Criar ou semear um gestor de teste.
6. Iniciar backend.
7. Iniciar frontend.

## Validation Scenarios

### Scenario 1: Authentication

1. Abrir `/login`.
2. Entrar com email e senha validos do gestor.
3. Confirmar que a area autenticada e exibida.
4. Encerrar sessao.
5. Confirmar que rotas autenticadas deixam de abrir dados de planejamento.

Expected outcome: somente gestor autenticado acessa times, colaboradores, ferias, day-offs, timeline e conflitos.

### Scenario 2: Team And Employee Setup

1. Criar um time.
2. Cadastrar pelo menos tres colaboradores no time.
3. Editar um colaborador.
4. Confirmar que lista e timeline refletem os dados atualizados.

Expected outcome: gestor consegue montar a estrutura minima de planejamento.

### Scenario 3: Vacations And Day-Offs

1. Registrar ferias `Agendado` para um colaborador.
2. Alterar status para `Em andamento`.
3. Registrar day-off individual para outro colaborador.
4. Tentar salvar um periodo invalido com data final anterior a inicial.

Expected outcome: registros validos aparecem na timeline e periodo invalido e rejeitado.

### Scenario 4: Timeline And Overlap

1. Criar ausencias sobrepostas para dois colaboradores do mesmo time.
2. Abrir linha do tempo do time.
3. Confirmar que o periodo sobreposto informa que ha sobreposicao.
4. Alterar uma das ausencias para remover a sobreposicao.

Expected outcome: linha do tempo e resumo de conflitos atualizam apos a mudanca.

### Scenario 5: API Contract

1. Executar testes de contrato do backend contra `contracts/openapi.yaml`.
2. Gerar ou validar cliente/tipos do frontend a partir de `contracts/openapi.yaml`.
3. Executar testes frontend que usam o cliente tipado nos fluxos principais.

Expected outcome: backend e frontend concordam sobre endpoints, payloads, codigos de resposta e formato de erro.

## Contract Validation Requirements

- Toda rota implementada no backend deve existir em `contracts/openapi.yaml`.
- Toda resposta usada pelo frontend deve estar descrita no contrato.
- Erros de validacao, nao autenticado e recurso nao encontrado devem seguir o schema `Error`.
- Mudancas de contrato devem exigir atualizacao coordenada do backend, cliente frontend e testes.

## Database Validation Requirements

- Migracoes criam todas as tabelas descritas em [data-model.md](data-model.md).
- `schema_migrations` registra migracoes aplicadas.
- Chaves estrangeiras impedem ausencias sem colaborador valido.
- Checks de data impedem periodos invertidos.
- Testes de integracao usam banco SQLite isolado.
