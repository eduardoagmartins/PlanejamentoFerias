# Design UI - Planejamento de Ferias do Time

Este documento registra as decisoes de UI implementadas na melhoria visual da aplicacao, para orientar futuras telas e manter consistencia com o estilo aplicado na funcionalidade de linha do tempo e nas referencias visuais fornecidas.

## Direcao Visual

A aplicacao passou a seguir uma linguagem de produto interno operacional, inspirada em dashboards SaaS de RH:

- fundo geral cinza claro;
- shell principal branco, com bordas sutis e sombra discreta;
- sidebar fixa, compacta e organizada;
- conteudo em superficies brancas com bordas suaves;
- cards de metricas no topo das telas principais;
- formularios compactos e agrupados;
- listas com aparencia de tabela, linhas separadas por bordas;
- botoes escuros para a acao primaria;
- botoes secundarios brancos com borda;
- raio de borda preferencial de `8px`;
- sombras leves, usadas apenas para hierarquia visual;
- paleta principal baseada em `#F2389E`, `#0367A6` e `#0D0D0D`, com variacoes suaves para superficies e estados.

## Tokens Visuais Implementados

Os tokens principais ficam em `frontend/src/styles/app.css`:

- `--bg`: fundo externo da aplicacao.
- `--panel`: superficies principais brancas.
- `--panel-soft`: superficies secundarias claras.
- `--line`: bordas discretas.
- `--line-strong`: bordas de controles.
- `--text`: texto principal, baseado em `#0D0D0D`.
- `--muted`: texto secundario.
- `--primary`: botoes primarios e texto forte, baseado em `#0D0D0D`.
- `--blue`: cor institucional azul, baseada em `#0367A6`.
- `--pink`: cor institucional rosa, baseada em `#F2389E`.
- `--green`, `--amber`, `--red`, `--purple`: aliases semanticos ajustados para permanecer dentro da paleta institucional.
- `--shadow` e `--shadow-sm`: elevacao de shell, cards e botoes.

## Marca

Asset utilizado: `frontend/src/assets/sys-manager-logo.png`.

Implementacoes:

- substituicao do monograma textual `FT` pela imagem `SYS-Manager-icone-JAN25.png`;
- a imagem foi copiada para o projeto como `sys-manager-logo.png`;
- o componente visual continua usando a classe `.brand-mark`, agora como container da imagem;
- a marca aparece na sidebar e na tela de login;
- o arquivo `frontend/src/vite-env.d.ts` foi criado para habilitar imports de assets pelo Vite/TypeScript.

Padrao futuro:

- usar sempre o asset versionado em `frontend/src/assets/sys-manager-logo.png`;
- nao usar caminhos absolutos da maquina local para imagens na aplicacao;
- preservar proporcao do logo com `object-fit: contain`;
- manter fundo branco no container da marca para garantir contraste.

## Shell E Navegacao

Arquivo alterado: `frontend/src/components/layout/AppShell.tsx`.

Implementacoes:

- substituicao de links simples por `NavLink` para estado ativo;
- imagem de marca no topo da sidebar;
- sidebar com navegacao principal para Times, Colaboradores, Ausencias, Linha do tempo e Conflitos;
- cartao do gestor no rodape da sidebar;
- botao de sair integrado ao mesmo sistema visual;
- correcao do item `Times` com `end`, para nao ficar ativo em rotas filhas;
- remocao de item visual sem rota real de ajustes.

Padrao futuro:

- novas rotas devem entrar na sidebar apenas quando forem funcionais;
- `NavLink` deve ser usado para itens navegaveis;
- itens de navegacao devem usar icones Lucide e texto curto;
- a sidebar deve continuar compacta, sem blocos explicativos longos.

## Login

Arquivo alterado: `frontend/src/features/auth/LoginPage.tsx`.

Implementacoes:

- painel centralizado com sombra e borda sutil;
- imagem de marca aplicada no topo;
- texto de apoio curto explicando o uso da aplicacao;
- inputs e botao primario alinhados ao novo sistema visual.

Padrao futuro:

- telas publicas devem usar painel unico, sem layout de marketing;
- manter foco na acao principal;
- evitar ilustracoes ou textos extensos.

## Pagina De Times

Arquivo alterado: `frontend/src/features/teams/TeamsPage.tsx`.

Implementacoes:

- cards de metrica para quantidade de times e contexto do MVP;
- formulario de criacao dentro de superficie `surface-form`;
- linhas de lista com subtitulo `Unidade de planejamento`;
- botoes de acao alinhados ao padrao de botoes secundarios;
- icones Lucide para metricas e remocao.

Padrao futuro:

- listas de entidades devem usar `.list` e `.list-row`;
- acoes secundarias devem ficar no lado direito da linha em desktop;
- cada entidade deve ter titulo forte e detalhe secundario.

## Pagina De Colaboradores

Arquivo alterado: `frontend/src/features/employees/EmployeesPage.tsx`.

Implementacoes:

- cards de metrica para colaboradores ativos e cargos informados;
- link principal para registrar ausencias com classe `header-action`;
- formulario de cadastro em superficie visual;
- lista de colaboradores mantendo titulo e detalhe secundario.

Padrao futuro:

- paginas de cadastro devem abrir com metricas simples de contexto;
- formularios devem ser compactos, com grid responsivo;
- links de acao no cabecalho devem usar `header-action`.

## Pagina De Ausencias

Arquivo alterado: `frontend/src/features/absences/AbsencesPage.tsx`.

Implementacoes:

- separacao visual entre formulario de Ferias e formulario de Day-off;
- cada bloco usa `form-panel`;
- cabecalhos internos usam icone em `metric-icon`, titulo e descricao curta;
- filtro de ausencias registradas usa `surface-form`;
- mensagens de sucesso e erro foram padronizadas visualmente.

Padrao futuro:

- quando houver mais de um formulario na mesma tela, usar `form-panel-grid`;
- formularios relacionados devem ser agrupados em paineis equivalentes;
- mensagens devem usar classes semanticas `.success`, `.error` ou `.ok`.

## Pagina De Conflitos

Arquivo alterado: `frontend/src/features/conflicts/ConflictsPage.tsx`.

Implementacoes:

- card de metrica para quantidade de conflitos no periodo;
- estado visual verde quando nao ha conflitos;
- estado visual amber quando ha conflitos;
- formulario de periodo dentro de `surface-form`;
- acao de retorno para timeline com `header-action`.

Padrao futuro:

- telas de diagnostico devem apresentar o resultado principal em card de metrica;
- usar cores semanticas apenas para estado, sem dominar a paleta.

## Linha Do Tempo

Arquivo preservado como referencia principal: `frontend/src/features/timeline/TimelinePage.tsx` e `frontend/src/features/timeline/TimelineGrid.tsx`.

Implementacoes complementares em CSS:

- toolbar com superficie branca, borda e espacamento consistente;
- controles de periodo compactos;
- busca e filtro alinhados ao padrao de formulario;
- cards de resumo alinhados ao novo `metric-card`;
- calendario com coluna fixa de colaborador;
- fins de semana com textura leve;
- dia atual em vermelho semantico;
- ferias em azul;
- day-off em roxo;
- sobreposicoes em amber;
- marcadores com tooltip preservados.

Padrao futuro:

- a timeline continua sendo a principal referencia de densidade e clareza;
- novas visualizacoes de calendario devem reaproveitar os tokens semanticos;
- dados vazios devem manter estrutura visivel, mas sem ruido.

## Componentes CSS Reutilizaveis

Classes criadas ou consolidadas:

- `.app-layout`: estrutura geral da aplicacao.
- `.sidebar`: navegacao lateral.
- `.sidebar-brand`: marca e nome do produto.
- `.brand-mark`: container compacto para o logo da marca.
- `.sidebar-nav`: lista de navegacao.
- `.sidebar-footer`: rodape da sidebar.
- `.manager-card`: informacoes do gestor.
- `.content`: painel principal.
- `.page`: container de tela.
- `.page-header`: cabecalho padrao.
- `.timeline-page-header`: cabecalho da timeline.
- `.header-action`: link/botao secundario de cabecalho.
- `.metric-grid`: grid responsivo de metricas.
- `.metric-card`: card de metrica.
- `.metric-icon`: icone dentro de card ou subheader.
- `.surface-form`: formulario dentro de superficie.
- `.form-panel-grid`: grid de paineis de formulario.
- `.form-panel`: painel individual de formulario.
- `.section-block`: bloco de secao.
- `.subheader`: cabecalho interno.
- `.list`: container de lista/tabela simples.
- `.list-row`: linha de lista/tabela simples.
- `.row-actions`: grupo de acoes de linha.

## Responsividade

Implementacoes:

- desktop usa layout com sidebar e conteudo lado a lado;
- abaixo de `980px`, o espacamento e a largura da sidebar sao reduzidos;
- abaixo de `760px`, o layout vira fluxo vertical;
- sidebar passa a ocupar o topo;
- cards e paineis passam para uma coluna;
- linhas de lista empilham titulo e acoes;
- controles de periodo e filtros quebram linha sem sobrepor texto.

Padrao futuro:

- toda nova tela deve ser testada em desktop e mobile;
- nao usar tamanhos de fonte dependentes de viewport;
- botoes e textos devem caber nos seus containers.

## Validacao Realizada

Comando executado no frontend:

```powershell
npm run validate
```

Resultado:

- build TypeScript/Vite aprovado;
- 6 arquivos de teste aprovados;
- 8 testes aprovados.

Tambem foi feita checagem visual local com Chrome instalado, usando:

- `http://localhost:5173/login`;
- `http://localhost:5173/app`;
- timeline de um time;
- viewport mobile `390x900`.

Artefatos gerados:

- `design-qa.md`;
- `design-qa-login.png`;
- `design-qa-timeline-desktop.png`;
- `design-qa-teams-mobile.png`.

O relatorio de QA visual registrou `final result: passed`.

## Regras Para Futuras Implementacoes

1. Comecar novas telas com `page` e `page-header`.
2. Usar `header-action` para a acao secundaria ou principal do cabecalho.
3. Usar `metric-grid` e `metric-card` quando houver indicadores importantes.
4. Usar `surface-form` para formularios isolados.
5. Usar `form-panel-grid` quando houver mais de um formulario relacionado.
6. Usar `list` e `list-row` para listagens simples.
7. Usar icones Lucide em botoes e cards.
8. Manter raio de borda em ate `8px`.
9. Evitar textos explicativos longos dentro da UI.
10. Nao adicionar itens de navegacao sem rota funcional.
11. Usar cores semanticas apenas para estados e tipos de ausencia.
12. Conferir responsividade em pelo menos desktop e mobile.
