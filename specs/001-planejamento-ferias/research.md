# Research - Planejamento de Ferias do Time

## Decision: React + Radix UI para frontend

**Rationale**: React atende bem a uma aplicacao interna rica em estados de tela, formularios e linha do tempo. Radix UI oferece primitivas acessiveis para dialogos, selects, tooltips, popovers e alert dialogs sem impor visual pronto, permitindo construir uma UI corporativa consistente.

**Alternatives considered**:
- HTML simples com pouco JavaScript: reduziria dependencias, mas dificultaria uma linha do tempo interativa e estado rico de formularios.
- Biblioteca visual completa: aceleraria telas iniciais, mas reduziria controle sobre experiencia e poderia carregar padroes desnecessarios para o MVP.

## Decision: Node.js API como backend

**Rationale**: Node.js e adequado para API HTTP de MVP, facilita compartilhamento de contratos/tipos com frontend TypeScript e mantem uma stack JavaScript/TypeScript coerente.

**Alternatives considered**:
- Backend integrado ao frontend: simplifica deploy inicial, mas enfraquece a fronteira de contrato pedida entre React e Node.
- Outra linguagem de backend: pode ser viavel, mas aumenta variacao de stack sem necessidade para este MVP.

## Decision: SQLite para persistencia do MVP

**Rationale**: SQLite reduz custo operacional, atende o escopo de piloto pequeno/medio e permite evoluir schema com migracoes versionadas. O dominio nao exige concorrencia alta nem recursos avancados de banco no MVP1.

**Alternatives considered**:
- PostgreSQL: melhor para escala e concorrencia, mas adiciona operacao desnecessaria para validar o MVP.
- Arquivos JSON: simples demais, fragil para relacionamentos, filtros por periodo e integridade referencial.

## Decision: Migracoes SQL versionadas

**Rationale**: Migracoes versionadas tornam o schema reproduzivel em desenvolvimento, teste e producao piloto. Uma tabela `schema_migrations` evita reaplicar scripts e cria historico auditavel de mudancas.

**Alternatives considered**:
- Criar tabelas automaticamente no startup sem versao: rapido no comeco, mas perde controle de evolucao.
- ORM com sincronizacao automatica: conveniente, mas pode esconder alteracoes destrutivas e dificultar revisao.

## Decision: OpenAPI como contrato entre frontend e backend

**Rationale**: OpenAPI documenta endpoints, payloads e erros de forma independente de implementacao. Permite validar respostas reais do backend e gerar cliente/tipos para o frontend, reduzindo divergencia entre equipes e camadas.

**Alternatives considered**:
- Contrato informal em README: facil de escrever, dificil de validar automaticamente.
- Tipos compartilhados sem contrato HTTP: ajuda no codigo, mas nao valida codigos de resposta, exemplos e comportamento de API.

## Decision: Sobreposicoes calculadas no backend

**Rationale**: A regra de conflito e central para o produto e deve ser consistente em linha do tempo, resumo e futuros consumidores. Centralizar no backend evita que cada tela calcule de um jeito.

**Alternatives considered**:
- Calcular apenas no frontend: rapido para prototipo, mas arriscado para consistencia e testes de contrato.
- Persistir conflitos pre-calculados: desnecessario no MVP e cria risco de dados derivados desatualizados.

## Decision: Autenticacao simples por email e senha com sessao/token

**Rationale**: A especificacao pede autenticacao simples e exclui SSO do MVP. Email e senha atendem piloto interno, desde que senha seja armazenada como hash e endpoints protegidos bloqueiem usuarios nao autenticados.

**Alternatives considered**:
- SSO corporativo: desejavel em incremento futuro, mas explicitamente fora do MVP.
- Sem autenticacao: conflita com dados sensiveis de ausencias e com a decisao do discovery.
