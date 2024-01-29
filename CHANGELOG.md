# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Adiciona arquivos do vscode no gitnignore.
- Verifica se usuário está ativo na página de `/conta-inativa` para redirecioná-lo para outra página [#708](https://github.com/3C-gg/reload-frontend/issues/708).
- Cria `Wizard` do menu da sidebar [#967](https://github.com/3C-gg/reload-frontend/issues/967).
- Cria `Wizard` da página de perfil [#773](https://github.com/3C-gg/reload-frontend/issues/773).
- Cria menu de arsenal no inventário [#961](https://github.com/3C-gg/reload-frontend/issues/961).
- Cria pesquisa por amigo na lista de amigos no projeto next [#961](https://github.com/3C-gg/reload-frontend/issues/961).
- Cria página de `/loja` no projeto next [#912](https://github.com/3C-gg/reload-frontend/issues/912).
- Cria sistema de `Convites` no projeto next [#844](https://github.com/3C-gg/reload-frontend/issues/844).
- Cria página de `Inventário` no projeto next [#833](https://github.com/3C-gg/reload-frontend/issues/833).
- Cria página de `Detalhes da partida` no projeto next [#828](https://github.com/3C-gg/reload-frontend/issues/828).
- Cria página de `Conta` no projeto next [#826](https://github.com/3C-gg/reload-frontend/issues/826).
- Cria página de `Perfil` no projeto next [#810](https://github.com/3C-gg/reload-frontend/issues/810).
- Criar page `Connect` e todos seus componentes no projeto next [#767](https://github.com/3C-gg/reload-frontend/issues/767).
- Cria componente de `Toast` no projeto next [#763](https://github.com/3C-gg/reload-frontend/issues/763).
- Cria componente de `ModalMatchFound` no projeto next [#757](https://github.com/3C-gg/reload-frontend/issues/757).
- Cria componente de `Websocket` no projeto next [#754](https://github.com/3C-gg/reload-frontend/issues/754).
- Adiciona inicialização das api`s no projeto next.
- Cria componente de `Lineup` e todos seus componentes no projeto next [#745](https://github.com/3C-gg/reload-frontend/issues/745).
- Cria componente de `MenuContext` e todos seus componentes no projeto next [#744](https://github.com/3C-gg/reload-frontend/issues/744).
- Cria componente de `DrawerFriends` e todos seus componentes no projeto next [#730](https://github.com/3C-gg/reload-frontend/issues/730).
- Cria `lobbyApi` no projeto next.
- Cria componente de `ScrollArea` no projeto next.
- Cria componente de `DrawerNotification` e todos seus componentes no projeto next [#728](https://github.com/3C-gg/reload-frontend/issues/729).
- Cria componente de `Drawer` no projeto next.
- Cria componente de `ModalLogout` no projeto next [#728](https://github.com/3C-gg/reload-frontend/issues/728).
- Cria componente de `ModalSupport` e todos seus componentes no projeto next [#731](https://github.com/3C-gg/reload-frontend/issues/731).
- Cria componente de `sidebar` no projeto next [#713](https://github.com/3C-gg/reload-frontend/issues/713).
- Cria componente de `Timer` no projeto next.
- Cria componente de `Tooltip` no projeto next.
- Cria componente de `Badge` no projeto next.
- Cria página `Maintenance` no projeto next [#710](https://github.com/3C-gg/reload-frontend/issues/710).
- Cria componente `MaintenanceLogoutButton` no projeto next.
- Cria `appApi` no projeto next.
- Cria página `Inactive` no projeto next [#708](https://github.com/3C-gg/reload-frontend/issues/708).
- Cria componentes `InactiveGoBackLink`, `InactiveHeroImage`, `InactiveMessage` e `InactiveSocialLinks` no projeto next.
- Cria componente `ChangeEmailGoBackLink` no projeto next.
- Adiciona prop `target` no component `Link` no projeto next.
- Cria `accountsApi` e `baseApi` no projeto next.
- Cria página `not-found` no projeto `next` [#706](https://github.com/3C-gg/reload-frontend/issues/#706).
- Cria função `checkIfPathExists`no projeto `next`.
- Adicionar `Slot` da lib `Radix` para transformar o botão em seu filho no projeto `next`.
- Criar página `alterar-email` no projeto `next` [#704](https://github.com/3C-gg/reload-frontend/issues/#704).
- Criar componente `LayoutHeader` para o `layout` de `signup` no projeto `next`.
- Cria página `verificar` no projeto `next` [#702](https://github.com/3C-gg/reload-frontend/issues/#702).
- Cria componente `Terms` no projeto `next`.
- Cria página de loading no projeto `next`.
- Adiciona imagens otimizadas no projeto `next`.
- Cria página de `cadastrar` no projeto `next` [#699](https://github.com/3C-gg/reload-frontend/issues/#699).
- Cria novo projeto base com `next` com a página `Home` e o controle de `rotas privadas` [679](https://github.com/3C-gg/reload-frontend/tree/679-novo-projeto-usando-next).

### Changed

- Remove `tabs e sub tabs` que não vamos usar atualmente no inventário.
- Troca `foreground_image` por `cover_image` nos items da loja [#1012](https://github.com/3C-gg/reload-frontend/issues/#1012).
- Adicionar `cover_image` nos cards de items da loja [#941](https://github.com/3C-gg/reload-frontend/issues/#941).
- As imagens do modal de compra que não forem a primeira devem cobrir todo o espaço sem efeito de parallax [#999](https://github.com/3C-gg/reload-frontend/issues/999).
- Ao acessar a tela de detalhes de uma partida em andamento, os dados devem ser carregador a partir do state `match` e não da `api` [#996](https://github.com/3C-gg/reload-frontend/issues/996).
- Move customização de `cards` e `capas` para a página de `/conta` [#968](https://github.com/3C-gg/reload-frontend/issues/968).
- Altera `Carousel` da loja para ficar igual ao novo design [#988](https://github.com/3C-gg/reload-frontend/issues/988).
- Altera `initialSlide` no componente `CenteredCarousel`.
- Altera projeto `Next` para ficar igual ao projeto antigo [#971](https://github.com/3C-gg/reload-frontend/issues/971).
- Altera página `Conectar` para ficar igual ao novo design [#840](https://github.com/3C-gg/reload-frontend/issues/840).
- Altera página `Home` para ficar igual ao novo design [#838](https://github.com/3C-gg/reload-frontend/issues/838).
- Muda estratégia de `login` e `redirect` usando o middleware server side do next [#775](https://github.com/3C-gg/reload-frontend/issues/775).
- Cria estilos de `linear gradiente` no tema do projeto text.
- Passa prop `value` para refletir o state no componente `Select` no projeto next.
- Passa novas props `user_id, username` para o `ModalSupport` para preencher automaticamente o formulário.
- Altera componente `Avatar` para adicionar `variants` no projeto next.
- Adiciona variant `neutral` em ` Button` no projeto next.
- Ajusta `imports` usando alias no projeto next.
- Ajusta `httpService` no projeto next.
- Altera tipagem de `httpService` no projeto next.
- Altera `PrivateRoute` para redirecionar para `not-found` no projeto `next`.

### Fixed

- Corrige `item selecionado` inicial e ao mudar de tab que deve ser o item ativo [#1016](https://github.com/3C-gg/reload-frontend/issues/#1016).
- Corrige informação de `ATA e DEF` que deve aparecer apenas para items do tipo `wear` [#1014](https://github.com/3C-gg/reload-frontend/issues/#1014).
- Corrige `timer` do `carousel` da `loja` que pausava ao colocar o mouse em cima [#1007](https://github.com/3C-gg/reload-frontend/issues/#1007).
- Corrige `wizard` de perfil que estava aparecendo na tela de detalhes de uma partida [#994](https://github.com/3C-gg/reload-frontend/issues/#994).
- Corrige `crash` no `Modal de compra de item` ao abrir uma `coleção` [#983](https://github.com/3C-gg/reload-frontend/issues/983).
- Corrige fluxo de cadastrar no projeto next.
- Corrige botões de `lobby` que quando tem valor zero buga o contador no projeto next.
- Corrige slice de `notifications` no projeto next.

### Removed

- Deletado todos os arquivos referente ao projeto antigo sem `next` [#679](https://github.com/3C-gg/reload-frontend/issues/679).

## [303fec9 - 15/1/2024]

### Added

- Ao logar na aplicação o usuário pode permitir ou negar notificações de sistema [#958](https://github.com/3C-gg/reload-frontend/issues/958).
- Altera title da página ao encontrar uma partida e envia uma notificação de sistema caso o usuário esteja em outra aba [#958](https://github.com/3C-gg/reload-frontend/issues/958).
- Adiciona botão de atualizar perfil no avatar do usuário em no seu perfil [#947](https://github.com/3C-gg/reload-frontend/issues/947).
- Adiciona botão de adicionar e remover amigo no perfil do usuário [#949](https://github.com/3C-gg/reload-frontend/issues/949).
- Cria componente `PlayerInventoryItems` para listar os cards e capas de perfil na página `/conta` [#933](https://github.com/3C-gg/reload-frontend/issues/933).

### Changed

- Remove botão de atualizar perfil do perfil do usuário [#947](https://github.com/3C-gg/reload-frontend/issues/947).
- Seleciona o item em `uso` no `inventário` ao mudar de `aba` [#945](https://github.com/3C-gg/reload-frontend/issues/945).
- Altera `background_image` para `featured_image` no `Carousel` [#948](https://github.com/3C-gg/reload-frontend/issues/948).

### Removed

- Remove `background` dos items da loja para ficar igual ao design [#936](https://github.com/3C-gg/reload-frontend/issues/936).
- Remove o número identificador do componente `ItemCard` no inventário [#934](https://github.com/3C-gg/reload-frontend/issues/934).

### Fixed

- Corrige os reducers `addFriend` e `removeFriend` [#937](https://github.com/3C-gg/reload-frontend/issues/937).
- Corrige modal de compra não abrindo após comprar rc [#905](https://github.com/3C-gg/reload-frontend/issues/905).
- Corrige redirecionamento para indevido para a página de `/conta-inativa` [#938](https://github.com/3C-gg/reload-frontend/issues/938).
- Corrige menu de convites de amizade para aparecer as opções corretas [#937](https://github.com/3C-gg/reload-frontend/issues/937).
- Corrige todos os testes [#942](https://github.com/3C-gg/reload-frontend/issues/942).

## [ea8095b - 1/1/2024]

### Changed

- Altera efeito de `parallax` nas previews das imagens do `inventário` e `loja` [#925](https://github.com/3C-gg/reload-frontend/issues/925).
- Adiciona min-width nas `ultimas partidas jogadas` quando o valor for `N/A` para evitar do layout quebrar [#922](https://github.com/3C-gg/reload-frontend/issues/922).
- Altera tamanho máximo da barra de progresso no perfil [#920](https://github.com/3C-gg/reload-frontend/issues/920).
- Altera loja para que ao abrir `modal de compra de item` e clicar em `comprar rc` e voltar do stripe volte com o modal de compra aberto com o item [#905](https://github.com/3C-gg/reload-frontend/issues/905).
- Altera botão do `modal de compra de item` para `Item adquirido` e `Comprar rc` [#904](https://github.com/3C-gg/reload-frontend/issues/904).
- Altera card de jogar para ficar igual ao novo design [#898](https://github.com/3C-gg/reload-frontend/issues/898).

### Added

- Adiciona e altera websockets, actions de slices e componentes para lidar com novo sistema de amigos que não usa mais a Steam.

## [a8a7d3a - 11/12/2023]

### Added

- Cria função `updateItemsWithPurchaseFlag` para marcar o item, box ou collection como `Já adquirido` [#910](https://github.com/3C-gg/reload-frontend/issues/910).
- Adiciona novo tipo de item `decorative` na função `getItemName`.
- Adiciona nova tab de `peril` para ativar e desativar customizáveis dentro do site [#895](https://github.com/3C-gg/reload-frontend/issues/895).
- Adiciona novas tabs no inventário [#889](https://github.com/3C-gg/reload-frontend/issues/889).

### Changed

- Altera template de PR do Github [#892](https://github.com/3C-gg/reload-frontend/issues/892).

### Fixed

- Corrige carousel de items dentro do `Modal de compra de items` para mostrar apenas quando o item for uma `Box` ou `Collection` [#901](https://github.com/3C-gg/reload-frontend/issues/901).
- Corrige testes da view `NotInvited` [#883](https://github.com/3C-gg/reload-frontend/issues/883).

## [17335fd - 3/12/2023]

### Added

- Variável de ambiente para exibir ou esconder funcionalidades de Loja [#879](https://github.com/3C-gg/reload-frontend/issues/879).
- Cria views `CheckoutError, CheckoutSuccess` para tratar o retorno do checkout [#581](https://github.com/3C-gg/reload-frontend/issues/581).
- Cria integração com a `stripe` para comprar `ReloadCoins` [#581](https://github.com/3C-gg/reload-frontend/issues/581).
- Cria component `ReloadCoinsCard` [#581](https://github.com/3C-gg/reload-frontend/issues/581).
- Cria component `ReloadCoinsModal` [#581](https://github.com/3C-gg/reload-frontend/issues/581).
- Cria novas funções `calcOriginalValueByPercentage` e `getItemName` em `utils`.
- Cria novo componente `StoreItemCard` [#577](https://github.com/3C-gg/reload-frontend/issues/577).
- Cria nova cor `blue.500` no tema.
- Cria novo componente `BuyConfirmationModal`.
- Adiciona nova cor `gray.750` no tema.
- Cria componente `BuyItemDescription`.
- Cria componente `ItemPreviewFull`.
- Cria componente `ItemPreview`.
- Cria componente `BuyItemModal`.
- Adiciona nova lib `react-zoom-pan-pinch` para fazer efeito de zoom em imagens.
- Cria novas funções `calcOriginalValueByPercentage` e `getItemName` em `utils`.
- Cria nova cor `blue.500` no tema.
- Cria componente `CarouselPreview` [#556](https://github.com/3C-gg/reload-frontend/issues/556).
- Cria componente `CarouselContent` [#556](https://github.com/3C-gg/reload-frontend/issues/556).
- Cria componente `Carousel`[#556](https://github.com/3C-gg/reload-frontend/issues/556).
- Cria view `Store`.
- Adiciona rota `/loja` em `Router`.

### Changed

- Altera a prop `shouldReconnect` na configuração do `websocket` para `true` [#868](https://github.com/3C-gg/reload-frontend/issues/868).
- Altera inventário para remover o filtro de seleção de lado [#847](https://github.com/3C-gg/reload-frontend/issues/847).
- Altera links do modal de compra de RC e adiciona loading ao clicar em um item.
- Altera `BuyItemModal` para integrar com o BE.
- Altera `Carousel` para integrar com o BE.
- Altera `StoreItemCard` para integrar com o BE.

### Fixed

- Corrige erro de redirecionamento para `/404` quando usuário é redirecionado para `/em-breve` vindo de uma tentativa de se cadastrar sem os direitos necessários (`invite_required`, `beta_required` ou `alpha_required`) [#882](https://github.com/3C-gg/reload-frontend/issues/882)
- Corrige erro de redirecionamento para `/404` quando o token não é mais válido [#866](https://github.com/3C-gg/reload-frontend/issues/866).
- Corrige cor do background do componente de `Modal`.

### Removed

- Teste em `SidebarMenuItem.spec.jsx` foi removido enquanto não conseguimos alterar variáveis de ambiente em tempo real de teste.
- Requisição de `lock-in` para API ao receber partida encontrada [#877](https://github.com/3C-gg/reload-frontend/issues/877).

## [13f29b4 - 24/11/2023]

### Added

- Adiciona useEffect no `WebSocket` para mandar um socket de `keep_alive` a cada 7 segundos [#852](https://github.com/3C-gg/reload-frontend/issues/852).

### Changed

- Altera rota da página de inventario para `/inventario` [#862](https://github.com/3C-gg/reload-frontend/issues/862).
- Altera inventário para que o item de `vazio` nào tenha ação clicando diretamente nele e sim apenas no botão de `ativar/remover` [#848](https://github.com/3C-gg/reload-frontend/issues/848).

### Fixed

- Usuário não pode acessar a página de `em-breve` se estiver na lista de `beta` [#820](https://github.com/3C-gg/reload-frontend/issues/820).
- Ao clicar no botão de conectar no fiveM na tela de `conectar` o prompt é aberto eu outra janela evitando o websocket de fechar [#857](https://github.com/3C-gg/reload-frontend/issues/857).
- Na página de `404` ao clicar no botão o usuário não é mais deslogado [#854](https://github.com/3C-gg/reload-frontend/issues/854).

## [c77b6d8 - 9/11/2023]

### Added

- Criar `hook` `useProfileDetails` [#636](https://github.com/3C-gg/reload-frontend/issues/636).
- Adiciona `max-width` de `300px` no nome do jogador na tabela de detalhes da partida [#823](https://github.com/3C-gg/reload-frontend/issues/823).

### Changed

- Altera componentes `FileInput` e `FileCard` para aceitar formatos de videos e mudar os ícones [#816](https://github.com/3C-gg/reload-frontend/issues/816).
- Altera `min-width` e `tooltip` do campo `kda` no componente de `MatchHistoryStatsLink`[#823](https://github.com/3C-gg/reload-frontend/issues/823).
- Altera campo `kda` na página de detalhes da partida sendo agora `kills/deaths/assists`[#823](https://github.com/3C-gg/reload-frontend/issues/823).
- Verifica agora beta-required na tela de `/em-breve` para redirecionar o usuário caso seja `false` [#829](https://github.com/3C-gg/reload-frontend/issues/829).

## [fef7480 - 7/11/2023]

### Changed

- Altera ícone do botão de fiveM [#821](https://github.com/3C-gg/reload-frontend/issues/821).

## [349237f - 2/11/2023]

### Added

- Cria botão para `sincronizar` o perfil com a steam do usuário [#812](https://github.com/3C-gg/reload-frontend/issues/812)
- Cria componente `VideoPlayer` [#808](https://github.com/3C-gg/reload-frontend/issues/808).

### Changed

- Altera botão de `assistir intro` para abrir um `iframe` [#808](https://github.com/3C-gg/reload-frontend/issues/808).

### Fixed

- Corrige tela de `/em-breve` onde qualquer usuário poderia acessar [#820](https://github.com/3C-gg/reload-frontend/issues/820).

## [adaef8c - 28/10/2023]

### Changed

- Altera página de `conectar` para ficar igual ao novo design [#787](https://github.com/3C-gg/reload-frontend/issues/787).
- Carrega audio de partida encontrada da api ao invés da aplicação local.
- Faz com que scripts e inicialização de GA e TagManager estejam presentes somente no ambiente de produção [#801](https://github.com/3C-gg/reload-frontend/issues/801).

### Fixed

- Ajusta redirect para `/404` quando `auth` retorna `Não autorizado` [#793](https://github.com/3C-gg/reload-frontend/issues/793).

## [407d763 - 26/10/2023]

### Changed

- Altera tela `Detalhes de partida` para quando o status for `warmup` [#788](https://github.com/3C-gg/reload-frontend/issues/788).
- Altera campo `state` de `preMatch` para `status` [#774](https://github.com/3C-gg/reload-frontend/issues/774).
- Altera sistema de invites para funcionar apenas se a env `REACT_APP_USE_INVITES` for `true` [#777](https://github.com/3C-gg/reload-frontend/issues/777).

### Fixed

- Corrige redirects da aplicação.
- Corrige redirect após o `sign in` da steam e fake sign in que deve levar para `/em-breve` caso a api retorne o erro de `Usuário deve ser convidado` [#786](https://github.com/3C-gg/reload-frontend/issues/786).
- Corrige refresh após o login da steam.
- Ajusta texto `3 minutos` para `5 minutos` [#781](https://github.com/3C-gg/reload-frontend/issues/781).
- Ajusta `status` da `preMatch`.
- Corrige mecanismo de load de variável de ambiente `REACT_APP_USE_INVITES` e `REACT_APP_DEBUG` para o padrão ser `true`.

## [04/10/2023 - 9720d79]

### Added

- Implementa Google Analytics (GA) [#769](https://github.com/3C-gg/reload-frontend/issues/769).
- Cria componente `SendInvitesModal` e todos seus componentes para o usuário poder convidar outros jogadores [#749](https://github.com/3C-gg/reload-frontend/issues/749).
- Cria view `NotInvited` [#752](https://github.com/3C-gg/reload-frontend/issues/752).
- Cria componente `InviteBar` [#748](https://github.com/3C-gg/reload-frontend/issues/748).
- Cria componente `WelcomeModal` [#746](https://github.com/3C-gg/reload-frontend/issues/746).
- Cria componentes `ImagePreview, ItemCard, ItemDescription, ItemsSelectBox, itemsTabBar e SubItemTab`.
- Cria view `Inventory` [#725](725-página-de-inventário).
- Cria hook `useAudio`.
- Adicionado audio de `partida encontrada` [#716](https://github.com/3C-gg/reload-frontend/issues/716).
- Cria tests de `views` que estavam faltando [#217](https://github.com/3C-gg/reload-frontend/issues/217).
- Adiciona função `hasUrlOnText` no arquivo `Validators.js`.
- Adiciona `useEffect` na view `Match` para interceptar alterações no slice de partidas e exibir essas alterações para o usuário na tela de detalhe de partida [#654](https://github.com/3C-gg/reload-frontend/issues/654).
- Cria `hook` `useProfileDetails` [#636](https://github.com/3C-gg/reload-frontend/issues/636).
- Cria `contexto` `ProfileDetailsContext` [#636](https://github.com/3C-gg/reload-frontend/issues/636).
- Cria novo método `updateSocials` em `ProfilesApi`.
- Cria novo componente `AddSocialModal` [#616](https://github.com/3C-gg/reload-frontend/issues/616).
- Cria novo componente `ProfileHeaderSocialButtons` [#616](https://github.com/3C-gg/reload-frontend/issues/616).
- Cria novo componente `ProfileHeaderButtons` [#616](https://github.com/3C-gg/reload-frontend/issues/616).
- Adiciona novar variantes para `Badge` (`online, offline, teaming, queue, in_game`).

### Changed

- Adiciona novas props para o componente `Modal`.
- URL de vídeo teaser da home.
- Altera view `Home` para ficar igual ao novo design [#765](https://github.com/3C-gg/reload-frontend/issues/765).
- Altera view `Signup` para redirecionar para `/em-breve` caso o usuário não tenha sido convidado [#752](https://github.com/3C-gg/reload-frontend/issues/752).
- Altera `SidebarLayout` para mostrar o componente `InviteBar` quando necessário [#748](https://github.com/3C-gg/reload-frontend/issues/748).
- Atualiza libs do projeto.
- Adiciona try catch no hook `useAudio`.
- Adiciona nova prop `setPlayAudio` no componente `LobbyLineup` para controlar o audio de partida encontrada [#716](https://github.com/3C-gg/reload-frontend/issues/716).
- Altera página de detalhes da partida para mostrar o ip da partida enquanto estiver em andamento [#715](https://github.com/3C-gg/reload-frontend/issues/715).
- Adiciona um timer automático com o componente `Timer` quando a partida estiver com status `running` no componente `MatchHistoryStatsLink` [#693](https://github.com/3C-gg/reload-frontend/issues/693).
- Altera tempo para `conectar` na partida para `5 minutos` [#691](https://github.com/3C-gg/reload-frontend/issues/691).
- Altera componente `MatchHistoryList` para mostrar skeleton no lugar dos conteúdos da pagina [#684](https://github.com/3C-gg/reload-frontend/issues/684).
- Altera componente `MatchHistoryList` para ocupar o tamanho mínimo igual os cards da esquerda [#684](https://github.com/3C-gg/reload-frontend/issues/684).
- Altera componente `MatchHistoryList` para mostrar `nome do usuário` na mensagem de `partidas vazias` quando tiver visitando outro perfil [#682](https://github.com/3C-gg/reload-frontend/issues/682).
- Altera view `Match` para se adequar ao novo design [#677](https://github.com/3C-gg/reload-frontend/issues/677).
- Altera componente `MatchTeamStats` para se adequar ao novo design.
- Altera padding de `MainLayout` para se adequar ao novo design.
- Altera componente `SidebarLobbyButton` para receber prop `username`.
- Altera componente `MatchHistoryStatsLink` para receber prop `username`.
- Altera componente `MatchHistoryList` para receber prop `username`.
- Altera path para a view de Match para `perfil/:user_id/partidas/:matchId`.
- Altera `MatchHistoryStatsLink` para ficar igual ao novo design [#675](https://github.com/3C-gg/reload-frontend/issues/675).
- Ajusta aplicação para dispositivos com telas menores (notebook) [#189](https://github.com/3C-gg/reload-frontend/issues/189).
- Refatora testes de `Views` [#217](https://github.com/3C-gg/reload-frontend/issues/217).
- Checa se o valor do `input` é uma `url` no componente `AddSocialModal` [#651](https://github.com/3C-gg/reload-frontend/issues/651).
- Remove `decimais` das stats do componente `Heatmap` [#657](https://github.com/3C-gg/reload-frontend/issues/657).
- Altera `MatchHistoryStatsLink` para adicionar min width para o conteúdo não ficar "sambando" [#646](https://github.com/3C-gg/reload-frontend/issues/646).
- Altera `Headshots %` para `Hs Kills %` no componente `LevelStatsCard` [#644](https://github.com/3C-gg/reload-frontend/issues/644).
- Altera `SidebarLogo` para ficar igual ao novo design [#643](https://github.com/3C-gg/reload-frontend/issues/643).
- Altera `SidebarLobbyButton` para ficar igual ao novo design [#643](https://github.com/3C-gg/reload-frontend/issues/643).
- Altera `SidebarAvatarLink` para ficar igual ao novo design [#643](https://github.com/3C-gg/reload-frontend/issues/643).
- Altera `Sidebar` para ficar igual ao novo design [#643](https://github.com/3C-gg/reload-frontend/issues/643).
- Altera textos e placeholders do componente `AddSocialModal` [#626](https://github.com/3C-gg/reload-frontend/issues/626).
- Altera background do componente `LobbyPlayerCard` [#639](https://github.com/3C-gg/reload-frontend/issues/639).
- Renderiza `UserMenuOptions` no componente `MatchTeamStats` ao clicar em um player da lista [#634](https://github.com/3C-gg/reload-frontend/issues/634).
- Renderiza `UserMenuOptions` no componente `FriendListGroupItem`.
- Muda componente `UserMenuOptions` para uma nova pasta `menu`.
- Altera nome do componente `FriendListMenu` para `UserMenuOptions`.
- Usa função `getProfileDetails` do hook `useProfileDetails` para atualizar os dados da tela de `/perfil` ao vincular ou remover uma nova rede social [#636](https://github.com/3C-gg/reload-frontend/issues/636).
- Usa função `getProfileDetails` do hook `useProfileDetails` para fazer fetch dos dados do usuário nas telas de `perfil` e `conta` [#636](https://github.com/3C-gg/reload-frontend/issues/636).
- Altera `ChangeEmailCard` view para ficar igual ao novo layout [#623](https://github.com/3C-gg/reload-frontend/issues/623).
- Altera `InactivateAccountCard` view para ficar igual ao novo layout [#623](https://github.com/3C-gg/reload-frontend/issues/623).
- Altera `DeleteAccountCard` view para ficar igual ao novo layout [#623](https://github.com/3C-gg/reload-frontend/issues/623).
- Altera `AccountCard` view para ficar igual ao novo layout [#623](https://github.com/3C-gg/reload-frontend/issues/623).
- Altera `Account` view para ficar igual ao novo layout [#623](https://github.com/3C-gg/reload-frontend/issues/623).
- Altera tamanho `xxl` do `Avatar` para `112px`.
- Adiciona prop `justifyTitle` no componente `Modal`.
- Altera `ProfileHeader` para ficar igual ao design [#616](https://github.com/3C-gg/reload-frontend/issues/616).
- Altera estilos da view `Profile` e `Account` para ficar igual ao design [#616](https://github.com/3C-gg/reload-frontend/issues/616).
- Altera `MainLayout` e `ProfileLayout` position para `relative` para que o `LoadingBackdrop` fique centralizado [#632](https://github.com/3C-gg/reload-frontend/issues/632).
- Altera estilos do componente `LoadingBackdrop` para que fique sempre `centralizado` com base no `container` em volta [#632](https://github.com/3C-gg/reload-frontend/issues/632).
- Melhora e cria novos `testes` para todos os componentes [#613](https://github.com/3C-gg/reload-frontend/issues/613).
- Adiciona `testID` no componente `MatchHistoryPagination`.
- Altera `MatchHistoryStatsLink` para refletir mudanças do BE [#617](https://github.com/3C-gg/reload-frontend/issues/617).
- Adiciona prefixo `connect` ao `clipboard` ao clicar no botão de `IP` [#618](https://github.com/3C-gg/reload-frontend/issues/618).

### Fixed

- Corrige algumas cores de texto do componente `Button` que estavam escura ao invés de `branca` na variant `base` após atualizar as libs.
- Ajusta `modal de suporte` para nào deixar selecionar a opção de reportar usuário caso não exista `user_id` [#735](https://github.com/3C-gg/reload-frontend/issues/735).
- Ajustado audio de partida encontrada que não funciona em produção [#716](https://github.com/3C-gg/reload-frontend/issues/716).
- Altera componente `Progress` para não mostrar o progresso quando for `0 pts`.
- Corrige bordas do componente `Progress`.
- Corrige componente `Progress` para não pintar de vermelho quando os `pontos ganhos (earned_points)` forem 0 [#686](https://github.com/3C-gg/reload-frontend/issues/686).
- Corrige `layout` dos `stats` da esquerda na pagina de `/profile` que estava esticando junto com o histórico de partidas [#689](https://github.com/3C-gg/reload-frontend/issues/689).
- Corrige cor do background para `purple.300` quando os pontos ganhos forem negativo e descer de nível em `LevelProgressBar` e `Progress`.
- Corrige posição dos pontos ganhos no componente `LevelProgressBar` e `Progress`.
- Corrige `navigate` para detalhes da partida na view `Connect` baseado no username.
- Corrige hover em `MatchHistoryStatsLink` com base na prop `isLink`.
- Corrige padrão de fin de linha no editor config.
- Corrige home para dispositivos pequenos.
- Corrige função que verifica se um amigo já está no seu grupo no componente `FriendGroupItem` [#672](https://github.com/3C-gg/reload-frontend/issues/672).
- Corrige `clique` no input de `mudar email` na tela de `/conta` [#666](https://github.com/3C-gg/reload-frontend/issues/666).
- Corrige cor da `borda` do `input` no tema.
- Corrige verificação de partida no botão de iniciar partida no Lobby e no botão principal da Sidebar. A verificação era feita no slice de partida, e mudamos para ser realizado no campo `match_id` do slice de usuário.
- Corrige espaçamentos do `lobby`.
- Corrige nome do componente `Scrollbars` que estava `Sidebar`.
- Corrige `useEffect` para redirecionar corretamente baseado no` match.status` na view de `Connect` [#591](https://github.com/3C-gg/reload-frontend/issues/591).
- Corrige `botão de jogar` na `sidebar` e no `lobby` para funcionar corretamente após uma partida cancelada [#591](https://github.com/3C-gg/reload-frontend/issues/591).
- Paginação no componente `MatchHistoryList` deve aparecer somente se `totalPages` for maior que `1`.
- Workflow do Github que checa se CHANGELOG.md foi alterado [#614](https://github.com/3C-gg/reload-frontend/issues/614).

### Removed

- Deleta `Avatar` componente.
- Remove `useNavigate` desnecessários nos componente `DeleteAccountCard` e `InactivateAccountCard`.

## [63d58f6 - 1/8/2023]

### Added

- Cria componente `FriendListMenu` [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Adiciona nova cor `green.500` no tema.
- Adiciona nova cor `salmon` no tema.

### Changed

- Altera links de `Políticas de Privacidade` e `Termos de Uso` [#610](https://github.com/3C-gg/reload-frontend/issues/610).
- Muda imagem de `favicon` [#605](https://github.com/3C-gg/reload-frontend/issues/605)
- Adiciona borda na esquerda no componente `FriendListGroupItem` [#604](https://github.com/3C-gg/reload-frontend/issues/604).
- Verifica `match.status` se é diferente de `warmup` para redirecionar para os detalhes da partida.s
- Altera `LevelStatsCard` para remover cálculos desnecessários [#593](https://github.com/3C-gg/reload-frontend/issues/593).
- Altera `MatchTeamStats` para remover cálculos desnecessários e adiciona campo `ADR` no lugar de `D/H` [#593](https://github.com/3C-gg/reload-frontend/issues/593).
- Remove `decimais` de `HS%` nos componentes `MatchTeamStats` e `LevelStatsCard` [#592](https://github.com/3C-gg/reload-frontend/issues/592).
- Altera todas as ocorrências do status `canceled` para `cancelled`.
- Altera variante `pagination` do botão para ficar igual ao novo design [#589](https://github.com/3C-gg/reload-frontend/issues/589).
- Altera componentes `MatchHistoryPagination` e `MatchHistoryPaginationItem` para ficar igual ao novo design [#589](https://github.com/3C-gg/reload-frontend/issues/589).
- Altera tamanho da fonte no componente `NotificationListItem` [#587](https://github.com/3C-gg/reload-frontend/issues/587).
- Altera tamanhos de fontes e botões nos componentes `AccountCard`, `DeleteAccountCard` e `InactiveAccountCard` para ficar igual ao design [#583](https://github.com/3C-gg/reload-frontend/issues/583).
- Passa prop `steam_url` para o componente `FriendListMenu`.
- Altera url default para acessar o `Websocket` sendo a nova url `ws://localhost:8000/ws/` [#573](https://github.com/3C-gg/reload-frontend/issues/573)
- Altera `NotificationList` e `NotificationListItem` para ficar igual ao novo design [#572](https://github.com/3C-gg/reload-frontend/issues/572).
- Altera `SupportModal` para preencher os dados automático quando clicado em reportar no `FriendLintMenu`.
- Altera `Sidebar` para ficar igual ao novo design.
- Altera `Título` do componente `NotificationList` para remover `uppercase`.
- Altera `InviteListGroupItem` para ficar igual ao novo design [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Altera `FriendListGroupItem` para ficar igual ao novo design [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Altera `FriendListGroup` para ficar igual ao novo design [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Altera `FriendList` para ficar igual ao novo design [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Muda aba `No seu grupo` na `FriendList` para ficar sempre visível [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Altera label dos status no hook `useHumanizeStatus` [#561](https://github.com/3C-gg/reload-frontend/issues/561).
- Adiciona `hover` no botão de `fechar o drawer` no componente `NotificationList` e muda a posição para ficar igual ao design.
- Muda `FriendList` para ficar igual ao novo design.

### Fixed

- Redireciona para `/jogar` na tela de `conectar` caso não tenha `match` [602](https://github.com/3C-gg/reload-frontend/issues/602).
- Verifica o status de `match` se é diferente de `canceled` no botão `jogar` da `sidebar` e do `lobby` para saber se está em partida [#591](https://github.com/3C-gg/reload-frontend/issues/591).
- Ajusta props do componente `MatchHistoryPagination`.
- Ajusta menu de `Ver perfil` e `Ver perfil na steam` para usar a prop `user_id` e `steam_url` do amigo [#584](https://github.com/3C-gg/reload-frontend/issues/584).
- Adiciona key no map do component `FakeSigninForm`.

### Removed

- Remove componente `InviteListGroup` [#561](https://github.com/3C-gg/reload-frontend/issues/561).

## [9219ca2 - 21/7/2023]

### Added

- Variável de ambiente `REACT_APP_SHOW_FAKE_SIGNIN` para determinar se mostramos ou não o formulário de fake signin [#568](https://github.com/3C-gg/reload-frontend/issues/568).
- Adiciona variante `purple` do `Avatar` no tema.
- Adiciona componente `AvatarBadge` no `Avatar` dos componentes `FriendListGroupItem`, `InviteListGroupItem` e `SidebarAvatarLink` [#559](https://github.com/3C-gg/reload-frontend/issues/559).
- Adiciona novo `reducer` `cancelMatch` para alterar o status de uma match para `canceled` [#550](https://github.com/3C-gg/reload-frontend/issues/550).
- Adiciona `tooltips` `Ver perfil` e `Visitar perfil na steam` no card do jogador [#553](https://github.com/3C-gg/reload-frontend/issues/553).
- Adiciona novo componente `LoadingTexts` [#547](https://github.com/3C-gg/reload-frontend/issues/547).

### Changed

- Altera `FakeSigninForm` para adicionar um select com emails padrões [#565](https://github.com/3C-gg/reload-frontend/issues/565).
- Muda texto da página de manutenção [#563](https://github.com/3C-gg/reload-frontend/issues/563).
- Muda variante do `Avatar` no componentes `MatchTeamStats` e `NotificationListItem` para `purple`.
- Ajusta badge de status do `AvatarBadge`.
- Remove borda das variantes do componente `Avatar` no tema [#559](https://github.com/3C-gg/reload-frontend/issues/559).
- Redireciona para `/jogar` na tela de detalhes da partida ao receber websocket `match/delete` [#550](https://github.com/3C-gg/reload-frontend/issues/550).
- Dispatch `toast` de alerta no websocket `match/delete` [#550](https://github.com/3C-gg/reload-frontend/issues/550).
- Renderiza o componente `LoadingTexts` [#547](https://github.com/3C-gg/reload-frontend/issues/547).
- Adiciona `gap` e `flex-direction column` no componente `LoadingBackdrop`.
- Adiciona `fitContent` no componente `Loading`.
- Adiciona componente de `Loading` na tela de `Conectar` quando `match.status` for `loading` [#547](https://github.com/3C-gg/reload-frontend/issues/547).
- Adiciona prop `isLoading` no hook `usePersistentTimer` para não adicionar informação no storage quando não deve.
- Redireciona para `/jogar` na página de conectar caso `match` seja `null` [#547](https://github.com/3C-gg/reload-frontend/issues/547).

### Fixed

- Ajusta lógica do botão de `aceitar partida` para não gerar erros ao clicar adicionando um `delay` [#557](https://github.com/3C-gg/reload-frontend/issues/557).
- Previne de tentar entrar na fila ao clicar no botão de `restricted` no lobby e gerar um toast de erro.
- Ajusta hook `usePersistentTimer` para não salvar os dados no storage enquanto `isLoading` for true.

### Removed

- Remove `setIsOpen` prop de `MatchFoundModal`.
- Remove `Sidebar` da tela de `Conectar` [#547](https://github.com/3C-gg/reload-frontend/issues/547).

## [5f3b172 - 17/7/2023]

### Added

- Adiciona case de `WebSocket` `matches/delete` para remover uma partida do redux.
- Adiciona case de `WebSocket` `matches/update` para atualizar os detalhes da partida [#533](https://github.com/3C-gg/reload-frontend/issues/533).
- Adiciona novo case de `WebSocket` `lobbies/queue_start` [#534](https://github.com/3C-gg/reload-frontend/issues/534).
- Adiciona padrões de `z-index` no tema do chakra [#291](https://github.com/3C-gg/reload-frontend/issues/291).
- Cria componente `SidebarMenuItem`.
- Cria componente `SidebarFooter`
- Cria componente `SideBarAvatarLink`.
- Cria componente `SidebarLogo`.
- Cria componente `SidebarLobbyButton`.

### Changed

- Ajusta nome dos testes de `renders` para `render`.
- altera componente `MatchTeamStats` para mudar a cor do nome dos times para `branco` quando estiverem com placar igual [#523](https://github.com/3C-gg/reload-frontend/issues/523).
- Altera view `Match` para mudar a cor da label do placar para `branco` quando forem igual [#523](https://github.com/3C-gg/reload-frontend/issues/523).
- Altera a label `MAX WIN STREAK` no componente `MatchTeamStats`.
- Altera `SupportModal` para adicionar link `central de suporte` [#529](https://github.com/3C-gg/reload-frontend/issues/529).
- Adiciona `hover` e `cursor pointer` no componente `MatchTeamStats`.
- Faz um `redirect` para a página de `perfil` ao clicar em um usuário na tabela de detalhes da partida no componente `MatchTeamStats` [#528](https://github.com/3C-gg/reload-frontend/issues/528).
- Adiciona `Tooltip` no componente `MatchInfos` [#525](https://github.com/3C-gg/reload-frontend/issues/525).
- Adiciona `reticências (...)` quando o `username` do usuário for muito grande [#518](https://github.com/3C-gg/reload-frontend/issues/518).
- Altera `ToastListItem` para demorar `10 segundos` quando a prop `content` tiver mais que `67 caracteres` [#519](https://github.com/3C-gg/reload-frontend/issues/519).
- Redireciona usuário para tela de `detalhes da partida` quando o timer da página de `conectar` chegar a `0` [#514](https://github.com/3C-gg/reload-frontend/issues/514).
- Adiciona useEffect no `App` para remover do local storage a chave `matchConnectTimer` e seu valor caso o usuário saia da pagina de `conectar` [#514](https://github.com/3C-gg/reload-frontend/issues/514).
- Redireciona para `/jogar` quando usuário está em `preMatch` e tenta acessar outra página [#513](https://github.com/3C-gg/reload-frontend/issues/513).
- Redireciona para `/jogar` quando recebe `WebSocket` de `pre_matches/create` [#513](https://github.com/3C-gg/reload-frontend/issues/513).
- Remove função `handleClose` e `botão de fechar` do componente `MatchFoundModal` [#513](https://github.com/3C-gg/reload-frontend/issues/513).
- Altera as cores em toda a aplicação para seguir o novo padrão de cores do tema.
- Refatora as cores no `tema` do `chakra` para ficar mais padronizado [#398](https://github.com/3C-gg/reload-frontend/issues/398).
- Altera opacidade do componente `FriendListGroupItem` quando o `status` for `offline` para `0.5` [#511](https://github.com/3C-gg/reload-frontend/issues/511);
- Altera componente `LobbyLineup` para passar a prop `isLobbyOwner` para o componente `LobbyPlayerCard`.
- Altera componente `LobbyPlayerCard` para receber nova prop `isLobbyOwner` para mostrar ícone de `coroa` apenas para quem é dono do lobby [#482](https://github.com/3C-gg/reload-frontend/issues/482).
- Altera os componentes `App, Input, LobbySeat, LevelProgressBar, Progress, Sidebar, ToastList, SidebarLayout, SignupLayout, Home` para seguir o padrão de `z-index` do tema [#291](https://github.com/3C-gg/reload-frontend/issues/291).
- Altera estilos dos componentes `FriendListGroup`, `FriendListGroupItem` e `InviteListGroupItem` para ficar igual ao design [#502](https://github.com/3C-gg/reload-frontend/issues/502).
- Altera `Sidebar` para deixar mais fragmentada em componentes.
- Renderiza componente `SidebarLogo` e remove código do componente `Sidebar`.
- Renderiza componente `SidebarLobbyButton` e remove código do componente `Sidebar`.
- Altera `Sidebar` para respeitar novo layout [#501](https://github.com/3C-gg/reload-frontend/issues/501).

### Fixed

- Ajusta imagem background que estava terminando de forma brusca para o preto no layout `SignupLayout` [#545](https://github.com/3C-gg/reload-frontend/issues/545).
- Corrige cor do texto do botão de jogar que fica cinza ao estar restringido e alguém se juntar a esse lobby restringido [#540](https://github.com/3C-gg/reload-frontend/issues/540).
- Corrige `mês` em `inglês` [#538](https://github.com/3C-gg/reload-frontend/issues/538).
- Ajusta cor do `score` na view de `Match`.
- Ajusta o nome do mapa no componente `MatchInfos` que estava `teste`.
- Ajusta `MatchInfos` para quando não tiver `match.start_date` mostrar um `-` [#516](https://github.com/3C-gg/reload-frontend/issues/516).
- Ajusta `LobbyView` para chamar o useEffect apenas quando muda o valor do `preMatch.state` para evitar chamar a rota de `lockIn` mais de uma vez [#513](https://github.com/3C-gg/reload-frontend/issues/513).
- Ajusta bug no componente `FriendListGroup` que deixava o `Online` marcado como ativo após aceitar um convite.
- Reseta o state `fieldsErrors` após erro de requisição e o usuário voltar a digitar no input [#503](https://github.com/3C-gg/reload-frontend/issues/503).

### Removed

- Remove `useEffect` que era responsável por reiniciar a fila quando alguém não aceitava uma partida da view `LobbyView` [#534](https://github.com/3C-gg/reload-frontend/issues/534).
- Remove todas as informações de `clutch` dos componentes `MatchTeamStates` e `LevelStatsCard` pois não teremos essa informação no momento [#532](https://github.com/3C-gg/reload-frontend/issues/532).

## [e248506 - 9/7/2023]

### Added

- Adiciona novo tamanho de avatar `smd`.
- Adiciona novos ícones.
- Adiciona variant `notification` no componente `ToastListItem` [#484](https://github.com/3C-gg/reload-frontend/issues/484).
- Adicionado arquivo `.stylelintignore` para não verificar a pasta `build` [#411](https://github.com/3C-gg/reload-frontend/issues/411).
- Adiciona case `lobbies/queue_tick` no `WebSocket` [#477](https://github.com/3C-gg/reload-frontend/issues/477).
- Adiciona reducer `updateQueueTime` no `lobbySlice`.

### Changed

- Altera `FileCard` para se ajustar à telas menores de `1600px` [#499](https://github.com/3C-gg/reload-frontend/issues/499).
- Altera `Modal` para se ajustar à telas menores de `1600px` [#499](https://github.com/3C-gg/reload-frontend/issues/499).
- Altera `FileInput` para se ajustar à telas menores de `1600px` [#499](https://github.com/3C-gg/reload-frontend/issues/499).
- Altera `ConfirmationContent` para se ajustar à telas menores de `1600px` [#499](https://github.com/3C-gg/reload-frontend/issues/499).
- Altera `SupportModal` para se ajustar à telas menores de `1600px` [#499](https://github.com/3C-gg/reload-frontend/issues/499).
- Altera o componente `avatar` em `InviteListGroupItem` para se ajustar à telas menores de `1600px` [#497](https://github.com/3C-gg/reload-frontend/issues/497).
- Altera o componente `avatar` em `FriendListGroupItem` para se ajustar à telas menores de `1600px` [#497](https://github.com/3C-gg/reload-frontend/issues/497).
- Altera `width` da `FriendList` para se ajustar à telas menores de `1600px` [#497](https://github.com/3C-gg/reload-frontend/issues/497).
- Altera `NotificationListItem` para se ajustar à telas menores de `1600px` [#495](https://github.com/3C-gg/reload-frontend/issues/495).
- Altera `NotificationsList` para se ajustar à telas menores de `1600px` [#495](https://github.com/3C-gg/reload-frontend/issues/495).
- Altera `SidebarLayout` para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `MainLayout` para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `LobbyView` para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `LobbyPlayerCard` para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `LobbyPlayButton` para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `marginLeft` do `Drawer` no tema para se ajustar à telas menores de `1600px` [#492](https://github.com/3C-gg/reload-frontend/issues/492).
- Altera `Sibebar` para ficar igual ao novo design do figma [#432](https://github.com/3C-gg/reload-frontend/issues/432).
- Altera case `notifications/add` no `WebSocket` para disparar um toast para toda notificação [#484](https://github.com/3C-gg/reload-frontend/issues/484).
- Adiciona `updateMaintenance` no `AppSlice` e muda o `name` de `friends` para `app`.
- Altera Websocket `maintenance/end` para recarregar o navegador [#483](https://github.com/3C-gg/reload-frontend/issues/483).
- Altera `LobbyLineUp` para adicionar o componente `LobbyPlayButton` centralizado e as funções necessárias [#486](https://github.com/3C-gg/reload-frontend/issues/486).
- Altera `title` e `description` no `index.html` [#491](https://github.com/3C-gg/reload-frontend/issues/491).
- Remove `secondsDiff` e usa `lobby.queue_time` no botão de `jogar` [#477](https://github.com/3C-gg/reload-frontend/issues/477).
- Altera `min-width` do `LobbySeat` de `280px` para `200px` [#475](https://github.com/3C-gg/reload-frontend/issues/475).
- Altera padding lateral do `MainLayout` de `64px` para `5%` [#475](https://github.com/3C-gg/reload-frontend/issues/475).

### Removed

- Remove `MaintenanceSlice`.
- Remove componente `LobbyPlayButton` e funções `handleQueue`, `handleCancelQueue` e `handleStartQueue` da view `LobbyView`.
- Remove useEffect que faz cálculo da diferença de segundos do componente `Sidebar` e da view `LobbyView`.

## [d165f6c - 03/07/2023]

### Added

- Adiciona useEffect no `App` para verificar se está em manutenção após login.
- Adiciona rota `manutencao` para a view `Maintenance`.
- Adiciona cases `maintenance/start` e `maintenance/end` no `WebSocket` [#447](https://github.com/3C-gg/reload-frontend/issues/447).
- Criao método na `AppAPI`.
- Cria slice de `Maintenance`.
- View `Maintenance` [#460](https://github.com/3C-gg/reload-frontend/issues/460).
- Pasta de views `match` para conter views relacionadas a partidas.
- Chamadas as APIs de `pre-matches` e `matches` na inicialização da aplicação [#438](https://github.com/3C-gg/reload-frontend/issues/438).
- Adiciona case `matches/create` no `WebSocket`.
- Cria `PreMatchSlice`.
- Adiciona novo `case` no `WebSocket` de `toasts/create` [#419](https://github.com/3C-gg/reload-frontend/issues/419).
- Adiciona nova prop `showHeader` no componente `FriendListGroup` para esconder o agrupamento quando estiver filtrando [#418](https://github.com/3C-gg/reload-frontend/pull/418).

### Changed

- Move css de espessura da borda do avatar para os tamanhos e não para as variantes.
- Altera `invites/create` case no `WebSocket` para mostrar novo toast de `invite` [#428](https://github.com/3C-gg/reload-frontend/issues/428).
- Altera `ToastListItem` para receber uma nova variante `invite` para poder aceitar um convite pelo toast [#428](https://github.com/3C-gg/reload-frontend/issues/428).
- Altera `Sidebar` para redirecionar para `/jogar` ao invés de `/` ao clicar no logo.
- Verifica `maintenance` no `Router` para redirecionar corretamente.
- Altera `MaintenanceView` para verificar quando a manutenção acaba e mudar o status do slice de `maintenance` para `false` [#447](https://github.com/3C-gg/reload-frontend/issues/447).
- Altera `App` para pegar o reducer de `maintenance` e passar para `Router`.
- Atualiza visual dos itens da lista de partidas do perfil (`MatchHistoryStatsLink`) para acompanhar novas specs de design [#453](https://github.com/3C-gg/reload-frontend/issues/453).
- Altera visual e textos do menu de jogar do Lobby para refletir tipos de jogos que teremos em breve e novas specs de design [#433](https://github.com/3C-gg/reload-frontend/issues/433).
- Ajusta data de cadastro do usuário no `ProfileHeader` [#464](https://github.com/3C-gg/reload-frontend/issues/464).
- Altera links na `Sidebar` para remover "trailing slash".
- Ajusta views de perfil e conta para refletir mudanças no `ProfileHeader`.
- Atualiza estilos do componente `ProfileHeader` para seguir novas especificações de design [#435](https://github.com/3C-gg/reload-frontend/issues/435).
- Ajusta borda do thema do `Avatar` para quando for `xl` ter uma borda mais grossa.
- Ajusta visual e layout da página de detalhe de partida [#455](https://github.com/3C-gg/reload-frontend/issues/455).
- Alterado lógica de calcular a diferença em segundos `secondsDiff` no useEffect do componente `Sidebar` e da view `LobbyView` [#412](https://github.com/3C-gg/reload-frontend/issues/412).
- Ajusta layout e elementos visuais da página de conexão de partida [#456](https://github.com/3C-gg/reload-frontend/issues/456).
- Ao receber websocket de criação de partida, aplicação redireciona usuário para tela de conectar [#450](https://github.com/3C-gg/reload-frontend/issues/450).
- Altera o status do player de `Em grupo` para `No seu grupo` quando estiver no mesmo grupo [#452](https://github.com/3C-gg/reload-frontend/issues/452).
- Altera `títle` do `FriendListGroup` de `Em Grupo` para `No seu grupo` [#452](https://github.com/3C-gg/reload-frontend/issues/452).
- Altera `FriendListGroupItem` para verificar se um amigo já foi convidado para o lobby por outro amigo [#427](https://github.com/3C-gg/reload-frontend/issues/427).
- Histórico de últimas 5 partidas no card de player do Lobby agora só mostra os resultados com valor, ou "N/A" uma única vez para representar que o usuário ainda não jogou partidas []().
- Botão da sidebar leva para página de detalhe de partida quando usuário está em partida [#446](https://github.com/3C-gg/reload-frontend/issues/446).
- Atualiza visual e valores do componente `LevelProgressBar`.
- Atualiza copy da `Home` com texto oficial [#439](https://github.com/3C-gg/reload-frontend/issues/439).
- Substitui API de Matchmaking por API de PreMatches [#434](https://github.com/3C-gg/reload-frontend/issues/434).
- Altera importação de `updateMatch` agora vindo de `MatchSlice`.
- Altera `SideBar`, `LobbyView` e `Connect` para usar o slice de `preMatch`.
- Altera o reducer `matchmaking` para `match` e importa `MatchSlice` no `store`.
- Altera `MatchmakingSlice` para `MatchSlice`.
- Altera importação do reducer `updatePreMatch` para importar do `PreMatchSlice`.
- Altera `SideBar` e `LobbyView` para usar o slice de `preMatch`.
- Altera case `match/found` para `pre_matches/create` [#423](https://github.com/3C-gg/reload-frontend/issues/423).
- Altera importação de `updatePreMatch` agora vindo de `PreMatchSlice`.
- Adiciona `PreMatchReducer` no arquivo `store`.
- Altera a url do método `inactivate` dao método na de `Accounts` para `accounts/inactivate/` [#414](https://github.com/3C-gg/reload-frontend/issues/414).
- Altera componente `FriendList` fechar o componente `InviteListGroup` quando estiver filtrando [#418](https://github.com/3C-gg/reload-frontend/pull/418).
- Altera componente `FriendListGroup` para adicionar `useEffect` que altera o state `isOpen` para `true` quando estiver filtrando [#418](https://github.com/3C-gg/reload-frontend/pull/418).

### Fixed

- Corrige um problema na página de manutenção que fazia com que, ao retornar de uma manutenção finalizada, não atualizava conexão websocket. Adicionamos um sistema de verificação via LocalStorage, com redirecionamento na URL para '/'. Assim, o client consegue estabelecer uma nova conexão websocket com o servidor [#473](https://github.com/3C-gg/reload-frontend/issues/473).
- Corrige componente `Progress`, que, ao possuir valor mínimo ou máximo (0 ou 100), não estava animando corretamente a label com o valor [#469](https://github.com/3C-gg/reload-frontend/issues/469).
- Corrige página de detalhe de partida não estar carregando caso usuário não esteja em partida.
- Corrige view `MatchView`, removendo estrutura de layout antigo [#442](https://github.com/3C-gg/reload-frontend/issues/442).
- Corrige erro de reducer nos stories do `ProfileHeader` [#436](https://github.com/3C-gg/reload-frontend/issues/436).
- Corrige `initialState` do slice `MatchSlice` [#430](https://github.com/3C-gg/reload-frontend/issues/430).
- Ajusta a passagem de parâmetro de `avatar` para o componente `FriendListGroupItem` no componente `FriendListGroup` [#415](https://github.com/3C-gg/reload-frontend/issues/415).
- Ajustado overflow no container do `SupportModal` para não aparecer rolagem [#416](https://github.com/3C-gg/reload-frontend/issues/416).

### Removed

- Componente `ProfileNav` que não está mais sendo utilizado devido as atualizações de design no `ProfileHeader`.
- Removido `reducers` que não estavam sendo utilizados de `UserSLice` e `LobbySlice`.

## [f868438 - 23-6-2023]

### Added

- Adiciona nova cor de `gray.100` no tema [#387](https://github.com/3C-gg/reload-frontend/issues/387).
- Adicionado prop `disabled` no `LobbyPlayButton` na `LobbyView` para não deixar quem não é dono da fila dar start na fila [#389](https://github.com/3C-gg/reload-frontend/issues/389).
- Adicionado componente `MatchFoundModal` na `LobbyView` [#356](https://github.com/3C-gg/reload-frontend/issues/356).
- adicionado case `matches/found` no `WebSocket` [#356](https://github.com/3C-gg/reload-frontend/issues/356).
- Adicionado o método `playerReady` na interface de `Matchmaking`.
- Nova variante `outline` no componente `Button` no tema.
- Componente `ProfileNav` que renderiza navegação entre views da área da conta do usuário.
- Layout `SidebarLayout` para ser usado nas rotas que possuírem sidebar.
- Adicionado modal `LogoutModal` na `Sidebar` [#382](https://github.com/3C-gg/reload-frontend/issues/382).
- Criado componente `LogoutModal` [#382](https://github.com/3C-gg/reload-frontend/issues/382).
- Adicionado variante `neutral` para o `Button` no tema.
- Adicionado case de `user/logout` no `WebSocket Service` para deslogar o usuário de todas as sessões [#366](https://github.com/3C-gg/reload-frontend/issues/366).
- Adicionado `useEffect` na view `LobbyView` para atualizar o slice de `lobby` [#359](https://github.com/3C-gg/reload-frontend/issues/359).
- Adicionado botão de cancelar e sair no layout `SignupLayout` [#339](https://github.com/3C-gg/reload-frontend/issues/339).

### Changed

- Altera função `onFakeSigninFormSubmit` na view `Home` para redirecionar o usuário para `/conta-inative` corretamente [#407](https://github.com/3C-gg/reload-frontend/issues/407).
- Altera função `handleLogout` na view `Inactive` para deslogar o usuário corretamente.
- Altera `LobbyView` e componente `LobbyLineup` para passar e receber a prop `queue` para remover o botão de `X` do `PlayerCard`
  quando está em fila [#404](https://github.com/3C-gg/reload-frontend/issues/404).
- Muda nome dos reducers `preMatch` e `match` para `updatePreMatch` e e `updateMatch`.
- Altera cores do componente `ToastListItem` para ficar igual ao design [#387](https://github.com/3C-gg/reload-frontend/issues/387).
- Altera função `handleQueue` na `LobbyView` para não iniciar fila quando não for dono do lobby [#389](https://github.com/3C-gg/reload-frontend/issues/389).
- Alterado useEffect da `SideBar` e `LobbyView` que calcula o timer do lobby para parar a contagem quando o slice `preMatch` for diferente de null.
- Alterado estilos do componente `MatchFoundModal` para ficar igual ao design.
- Formatando o retorno do componente `Timer`.
- Alterado peso da fonte do `header` do `modal` para `700`.
- Alterado componente `MatchFoundModal` para receber as props `isOpen` e `setIsOpen` pra controlar a abertura e fazer verificações para que o código nao quebre.
- Alterado importações de `MatchSlice` para `MatchmakingSlice` nos arquivos `Sidebar, WebSocket, Auth, Home, LobbyView e Connect`.
- Alterado slice de `MatchSlice` para `MatchmakingSlice`.
- Altera views `Account` e `Profile` para conterem `ProfileHeader` e `ProfileNav` ao invés de ficarem no layout.
- Altera views `Account` e `Profile` para usarem o novo sistema de layout.
- Altera componente `HeaderProfile` para `ProfileHeader` e ajusta para funcionar de acordo com o novo sistema de layout.
- Altera sistema de layout para ser inserido no `Router` e não chamado nas views [#391](https://github.com/3C-gg/reload-frontend/issues/391).
- Alterado estilo dos `modais` componentes `DeleteAccountCard` e `InactiveAccountCard` para seguir as medidas do design.
- Alterado componente `Modal` para adicionar uma nova prop `maxWidthModal`.
- Alterado estilos da view `Verify` para ficar igual ao design [#375](https://github.com/3C-gg/reload-frontend/issues/375).
- Alterado estilos `PinInput` no tema para ficar igual ao design.
- Alterado estilos do componente `Input` para ficar igual ao design [#374](https://github.com/3C-gg/reload-frontend/issues/374).
- Alterado estilos da view `Signup` para ficar igual ao design [#374](https://github.com/3C-gg/reload-frontend/issues/374).
- Alterado estilos do botão de login do `FakeSigninForm` para ficar no padrão do design.
- Alterado cores do `Button` e do `Input` no tema para ficar igual ao design.
- Substituído tratamento de websocket `user/update_lobby_id` por `user/update` [#376](https://github.com/3C-gg/reload-frontend/issues/376).
- Alterado o `WebSocket` no case de `invite/expire` para passar o payload corretamente [#358](https://github.com/3C-gg/reload-frontend/issues/358).
- Alterado cor do texto do componente `FormHelperText` de `gray.200` para `white` na view `Signup` [#339](https://github.com/3C-gg/reload-frontend/issues/339).
- Alterado as imagens de background do layout `SignupLayout`.
- Alterado cor do texto do componente `FormHelperText` de `gray.200` para `white` na view `Verify`.
- Alterado função `handleLogout` na `SideBar` para apenas remover o token e redirecionar para `/` com `window.location` [#349](https://github.com/3C-gg/reload-frontend/issues/349).
- Alterado view `Home` para não inicializar o slice de `user` e fazer apenas um refresh quando é feito um `fakeLogin`, assim o arquivo `App` vai inicializar todas as `apis críticas` corretamente e redirecionar o usuário para a página certa [#345](https://github.com/3C-gg/reload-frontend/issues/345).
- Separado a verificação se as `apis` estão prontas do `useEffect` e criado uma função `verifyIfApiIsReady`.

### Fixed

- Verifica `lobby.queue` para não deixar quem está em lobby convidar amigos [#403](https://github.com/3C-gg/reload-frontend/issues/403).
- Botão de jogar da sidebar estava desalinhado [#399](https://github.com/3C-gg/reload-frontend/issues/399).
- Botão de jogar do Lobby agora inicia timer assim que é clicado [#388](https://github.com/3C-gg/reload-frontend/issues/388).
- Perfil estava sempre mostrando infos do usuário logado. Agora foi ajustado para trazer o perfil do id passado na url [#394](https://github.com/3C-gg/reload-frontend/issues/394).
- Ajustado nome do case do `WebSocket` de `notifications/create` para `notifications/add` [#384](https://github.com/3C-gg/reload-frontend/issues/384).
- Ajustado função `showInviteRefusedToast` para mostrar o toast apenas para quem enviou o convite [#367](https://github.com/3C-gg/reload-frontend/issues/367).
- Ajustado função `addIfNotExists` dentro do slice de `Friend` para atualizar corretamente a lista de amigos online [#322](https://github.com/3C-gg/reload-frontend/issues/322).
- Ajustado stories dos componentes `ToastList` e `ToastListItem` pois estavam passando um objeto `toasts` ao invés de `app` para o `preloadedState` e gerando um erro no console do navegador.
- Ajustado stories do componente `MatchHistoryList` que estava dando erro no console do navegador por não não ter um `store` válido mockado para o reducer.
- Corrige redirecionamento de usuário depois de login bem sucedido via Steam [#369](https://github.com/3C-gg/reload-frontend/issues/369).
- Ajusta action `updateFriend` do `FriendSlice` para atualizar corretamente lista de amigos online e offline [#354](https://github.com/3C-gg/reload-frontend/issues/354).
- Remove erros de console do Storybook para o componente `LobbyPlayerCard` [#331](https://github.com/3C-gg/reload-frontend/issues/331).
- Adiciona retorno de função para prop `onPageChange` do componente `MatchHistoryPagination`, mas não resolve erro no console do Storybook para esse componente.

### Removed

- Removido função `handleLogout` da `Sidebar` e movido para `LogoutModal`.
- Removido `useEffect` que atualiza o lobby na `LobbyView` [#380](https://github.com/3C-gg/reload-frontend/issues/380).
- Toast de conta verificada, pois o usuário agora é redirecionado para a raiz da aplicação [#368](https://github.com/3C-gg/reload-frontend/issues/368).

## [78f7a49 - 19/6/2023]

### Added

- Criado função `formatSecondsToMinutes` em `utils`.
- Adicionado `useEffect` na view `lobbyView` e no componente `SideBar` para fazer a contagem do timer da fila com base na diferença da data da `queue` para a data atual [#315](https://github.com/3C-gg/reload-frontend/issues/315).
- Adicionado `useEffect` no `App` para setar valor inicial no slice de `lobby` [#316](https://github.com/3C-gg/reload-frontend/issues/316).
- Adicionado variante `pin` para o `Button`.
- Adicionado case de `lobbies/update` no `WebSocket Service`.
- Adicionado useEffect na `SideBar` para atualizar o slice de `lobby` toda vez que mudar página.
- Adicionado reducers de `restartQueue`, `removeRestartQueue` e `updateLobby` no slice de `LobbyReducer` [#302](https://github.com/3C-gg/reload-frontend/issues/302).
- Adicionado método `playerLockIn` na interface de `MatchmakingAPI`.
- Adicionado métodos `startQueue` e `cancelQueue` na interface de `LobbiesAPI` [#302](https://github.com/3C-gg/reload-frontend/issues/302).
- Adicionado `Toast` de sucesso ao enviar convite no componente `FriendListGroupItem` [#305](https://github.com/3C-gg/reload-frontend/issues/305).
- Adicionado config `isOptionDisabled` no componente `Select` [#276](https://github.com/3C-gg/reload-frontend/issues/276).
- Adicionado opção `Carregando opções...` no state `subjectOptions` no componente `SupportModal` [#276](https://github.com/3C-gg/reload-frontend/issues/276).
- Adicionado `variant` no `Avatar` da `SideBar` [#238](https://github.com/3C-gg/reload-frontend/issues/238).
- Novos handlers de websockets e ações de slices no serviço de websocket.
- Ação `updateLobbyId` no `UserSlice`.
- Ação `updateLobby` no `LobbySlice`.
- Criado component `ConfirmationContent`.
- Criado interface `SupportAPI`.
- Criado componente `Select`
- Criado componente `FileCard`
- Adicionado estilização para o `Textarea` no tema do chakra ui.
- Criado componente `FileInput`.
- Criado component `SupportModal` [#135](https://github.com/3C-gg/reload-frontend/issues/135).

### Changed

- Movemos tratamentos de convites expirados e recusados para uma função específica dentro dos `cases` do `WSS`. Assim temos mais controle e podemos tratar melhor os dados recebidos, fazendo verificações mais precisas para mostrar os `Toasts` adequados.
- Componentes de `friends` e `sidebar` agora tratam corretamente os convites [#299](https://github.com/3C-gg/reload-frontend/issues/299).
- `InviteSlice` agora não possui mais `list` e `unreadCount`. Somente um array com os convites. Essa mudança é necessária para que a gente possa sempre exibir o contador de convites "em aberto" na `Sidebar`, derrubando o conceito de "convites não lidos".
- `App.js` foi totalmente alterado visando realizar as chamadas API cruciais da aplicação (`auth`, `lobbies`, `friends`, `invites` e `notifications`) em ordem, antes de remover o loading da tela e exibir UI do app [#449](https://github.com/3C-gg/reload-backend/issues/449).
- View `Verify` foi alterada de modo que depois de uma verificação de conta bem sucedida, a aplicação seja reiniciada.
- View `Signup` foi alterada para ter uma melhor verificação após o cadastro.
- Alterado componente `LobbyPlayButton` para usar a função `formatSecondsToMinutes`.
- Alterado prop `otherPlayers` no componente `LobbyLineup` para iniciar com `[]`.
- Alterado estilo do `IconButton` e do `FormHelperText` da página de `Verify` para melhorar o visual [#310](https://github.com/3C-gg/reload-frontend/issues/310).
- Alterado view `LobbyView` para adicionar ação no botão de `jogar` [#302](https://github.com/3C-gg/reload-frontend/issues/302).
- Alterado `SideBar` para usar o `lobby` do próprio slice de `lobby`.
- Alterado verificação de `invite.to_player.id` para `invite.to_player.user_id` no componente `FriendListGroupItem` [#305](https://github.com/3C-gg/reload-frontend/issues/305).
- Ajusta fetch de `subjects` para ser chamada a `api` apenas quando abrir o modal de suporte [#303](https://github.com/3C-gg/reload-frontend/issues/303).
- Alterado `FriendList` e `NotificationList` para adicionar o text ` Carregando...` quando estiver fazendo fetch na api [#276](https://github.com/3C-gg/reload-frontend/issues/276).
- Altera `newInvite` para `addInvite` como action do `InviteSlice`.
- Altera `InviteListItem` para usar `user.lobby_id` ao invés de pegar o `lobby` de `user.account`.
- Altera Lista de Amigos para usar `user.lobby_id` ao invés de pegar o `lobby` de `user.account` e atualiza também para pegar dados do estado `lobby` direto do `LobbySlice` ao invés de puxar do usuário.
- Alterado componentes `ChangeEmailCard`, `DeleteAccountCard`, `InactivateAccountCard`, `FakeSigninForm`, `FriendListGroupItem`, `MatchFoundModal`, `NotificationList`, `LevelBadge`, `Signup`, `UpdateEmail`, `Verify`, `Home` e `Lobby` para usar `fieldsErrors` e `errorMsg` da `response` [#275](https://github.com/3C-gg/reload-frontend/issues/275).
- Alterado pasta `form` para `forms` para agrupar componentes de formulário.
- Alterado return do `HttpService` para adicionar o campo `fieldsErrors`.
- Alterado estilo base bo `Button` quando esta `disabled` no tema do chakra.
- Adicionado `SupportModal` componente na `SideBar` [#135](https://github.com/3C-gg/reload-frontend/issues/135).
- Adicionado prop `headerMarginBottom` no componente `Modal` e alterado style do `ModalCloseButton`.
- Componentes `InactivateAccountCard` e `DeleteAccountCard` agora passam uma prop `size` para o `Modal`.
- Alterado css do layout `ProfileLayout` para padronizar o padding.
- Ajusta `FriendList` para refletir novo design [#251](https://github.com/3C-gg/reload-frontend/issues/251).

### Removed

- Chamadas de APIs cruciais (`auth`, `lobbies`, `friends`, `invites` e `notifications`) de componentes.
- Actions antigas não utilizadas no `UserSlice` [#332](https://github.com/3C-gg/reload-frontend/issues/332).
- Adiciona action `notifications/create` ao serviço de websocket.
- Adiciona action `friends/create` ao serviço de websocket.
- Adiciona action `invites/expire` ao serviço de websocket.
- Actions antigas não utilizadas do serviço de websocket `WSS`.
- Removido componente `LobbyModeSelector` [#326](https://github.com/3C-gg/reload-frontend/issues/326)
- Removido reducer `initLobby` de `LobbySlice` pois é redundante com o reducer `updateLobby`.
- Removido `useEffect` que faz fetch de lobby `detail` no componente `SideBar`.
- Removido `useEffect` que faz fetch de lobby `detail` na view `LobbyView`.
- Removido view que não está sendo usada `BaseView` [#311](https://github.com/3C-gg/reload-frontend/issues/311).
- Removido antiga view de `Lobby`.
- Removido componentes que não estão sendo utilizados `SteamSignin`, `LobbyHeader`, `FriendListUser`,
  `InviteIstItem`, `UserCard`, `UserCardMini`, `UserStatus` [#253](https://github.com/3C-gg/reload-frontend/issues/253).
- Removido `variant` do `Avatar` de `HeaderProfile` [#238](https://github.com/3C-gg/reload-frontend/issues/238).
- `addOrUpdateFriend` do `FriendSlice` e adiciona `addFriend` e `updateFriend` em seu lugar.
- Removido campos `field` e `FormError` do `HttpService` pois não será mais usado [#275](https://github.com/3C-gg/reload-frontend/issues/275).

### Fixed

- Ícone de convidado aparecendo na lista "Em grupo" na lista de amigos [#307](https://github.com/3C-gg/reload-frontend/issues/307).
- Componentes de `friends` não estavam adequados aos novos retornos da API relativos as propriedades `user_id` e `lobby_id`. Consertamos os componentes, stories e testes.
- `FriendList` e `LobbyLineup` estavam com erro após um novo cadastro, quando já haviam amigos desses novos cadastros online. Consertamos uma propriedade errada em `FriendList` (removemos `lobby.id` em detrenimento de da nova propriedade `lobby_id`) e em `LobbyLineup`, fizemos uma proteção caso o usuário autenticado ainda não tenha sido totalmente carregado [#324](https://github.com/3C-gg/reload-frontend/issues/324).
- `FriendList` estava quebrando ao tentar acessar `lobby.players.filter` quando o objeto `lobby` está vazio ao dar refresh.
- Método `DELETE` do `HttpService` estava ignorando o parâmetro `payload`, necessário para enviar dados no corpo da requisição. Passamos a tratar esse parâmetro [#300](https://github.com/3C-gg/reload-frontend/issues/300).

## [6d97c56 - 12/6/2023]

### Added

- Nova `LobbyView` [#280](https://github.com/3C-gg/reload-frontend/issues/280).
- Slice para `Lobby` e nova chamada `detail` na `LobbiesAPI`
- Método para remover player de um lobby em `LobbiesAPI`.
- Hook `useLatestMatchesResults` para renderizar os últimos resultados de partidas do jogador.
- Componente `LobbyPlayButton`.
- Novo `store` para gravar informações de contexto geral da aplicação.
- Adicionado `SideBar` no `ProfileLayout` [#259](https://github.com/3C-gg/reload-frontend/issues/259).
- Adicionado variantes do botão `JOGAR` no `Lobby` [#266](https://github.com/3C-gg/reload-frontend/issues/266).
- Adicionado ícones `ClockIcon` e `JoystickIcon`.
- Adicionado Drawer `NotificationList` na `SideBar` [#252](https://github.com/3C-gg/reload-frontend/issues/252).
- Criado ícones `BlockIcon`, `MessageIcon` e `TrashIcon`.

### Changed

- Alterado css do layout `ProfileLayout` para padronizar o tamanho do componente `SideBar` [#285](https://github.com/3C-gg/reload-frontend/issues/285).
- Altera borda do avatar para refletir design.
- Refatora componente `LobbyPlayerCard` [#281](https://github.com/3C-gg/reload-frontend/issues/281).
- Refatoramos o componente `LobbyLineup` para conter o novo design, comportamento e componentes [#282](https://github.com/3C-gg/reload-frontend/issues/282).
- Altera componente `LevelStatsCard` para usar novo hook de últimas partidas `useLatestMatchesResults`.
- Agora o component `ToastListItem` não precisa receber a prop `title`. Nesse caso, ele baseia o título na prop `variant` [#272](https://github.com/3C-gg/reload-frontend/issues/272).
- Move store de toasts pra dentro do `AppSlice`.
- Coloca `FriendList` por baixo da sidebar e adiciona margem a esquerda.
- Remove modal de convite de lobby. Ao clicar em um assento vazio, o drawer de lista de amigos é exibido.
- Move componentes de `FriendList` para uma pasta separada `friends`.
- Alterado css do componente `ToastListItem` para refletir o design [#267](https://github.com/3C-gg/reload-frontend/issues/267).
- Alterado cor dos botões de close X para #fff [#261](https://github.com/3C-gg/reload-frontend/issues/261).
- Alterado cor da borda da variante `secondary` do `input` para `#6847FF` [#261](https://github.com/3C-gg/reload-frontend/issues/261).
- Alterado `SideBar` para mostrar as notificações não lidas vindo da const `notificationsNotRead` [#268](https://github.com/3C-gg/reload-frontend/issues/268).
- Alterado path do ícone `BlockIcon`.
- Alterado css da `SideBar` no `ProfileLayout` que estava bugando o clique nos links na rota `/conta`.
- Alterado e adicionado variantes do botão `JOGAR` para ficar igual ao design [#266](https://github.com/3C-gg/reload-frontend/issues/266).
- Alterado Botão `LER TUDO` no componente `NotificationList` para ficar desabilitado caso todas as notificações já estejam lidas [#264](https://github.com/3C-gg/reload-frontend/issues/264).
- Alterado função `read` no componente `NotificationList` para não fazer requisição caso a notificação já tenha sido lida.
- Alterado `App` para fixar os toasts no canto direito inferior [#223](https://github.com/3C-gg/reload-frontend/issues/223).
- Alterado animação do componente `ToastListItem` para começar da direita [#223](https://github.com/3C-gg/reload-frontend/issues/223).

### Removed

- Prop `title` das chamadas `addToast`, uma vez que o componente agora possui títulos padrão.
- Componente `Invite` e `InviteModal`, visto que a lista de amigos agora é um drawer e deve ser mostrada ao invés desses componentes.
- Componente `Header` em virtude da nova `Sidebar`.
- `ToastSlice` em virtude do novo centralizador de stado redux global `AppSlice`.

## [7360381 - 29/5/2023]

### Added

- Criado componente DeleteAccountCard [#236] (#236).
- Adicionado método delete na interface de AccountsAPI.
- Adicionado método updateIsActive na interface de AccountsAPI.
- Criado componente InactivateAccountCard [#235] (#235).
- Criado componente ModalConfirmation.
- Adicionado método de updateEmail na interface de AccountsAPI.
- Criado componente PencilIcon.
- Adicionado método de update na interface de AccountsAPI.
- Criado componente ChangeEmailCard [#231] (#231).
- Criado componente AccountCard.
- Adicionado variant disabled para input no tema do chakra ui.

### Changed

- Move componentes de `FriendList` para uma pasta separada `friends`.
- Altera sidebar para refletir novo design [#245](https://github.com/3C-gg/reload-frontend/issues/245).
- Adicionado uma `key` no map na View `Account`.
- Alterado `Link` na `SideBar` de notificações para um `button`.
- Alterado componentes `NotificationListItem` e `NotificationList` para ficar igual ao design [#252](https://github.com/3C-gg/reload-frontend/issues/252).
- Adicionado cor `gray.200` no tema do chakra ui.
- Adicionado estilos para o `Drawer` no tema do chakra ui.
- Alterado view de `Account` para refletir o design [#134](https://github.com/3C-gg/reload-frontend/issues/134).
- Movido `HeaderProfile` e função `renderButtonsNavigation` para `LayoutProfile`.
- Removido `HeaderProfile` e função `renderButtonsNavigation` da view `Profile`.
- Alterado path da `AccountView` para `/conta/:userId`.
- Alterado componente `ChangeEmailCard` para usar o método `updateEmail`.
- Alterado background do `Modal` para `gray.1000` no tema do chakra.
- Alterado gray 800 para `#1B1B1B`.
- Alterado `HeaderProfile` e `LevelStatsCard` para não quebrar quando o usuário logado for uma conta recém criada.

## [7360381 - 29/5/2023]

### Added

- Adicionado interface `MatchAPI` para controlar as requisições de partidas [#206](https://github.com/3C-gg/reload-frontend/issues/206).
- Criado interface `ProfilesAPI`.
- Adicionado tamanho `xl` de `80px` para o componente de `Avatar` no tema do chakra.
- Criado layout `ProfileLayout` para a página de perfil [#133](https://github.com/3C-gg/reload-frontend/issues/133).
- Algumas tags para melhorar o SEO [#239](https://github.com/3C-gg/reload-frontend/issues/239).
- Criado hook `usePersistentTimer` para persistir o timer na view `Connect`.
- Adicionado método de `list` na interface de AccountsAPI.
- Criado componente `MatchHistoryPagination`.
- Criado componente `MatchHistoryPaginationItem`.
- Criado variante `pagination` para os Buttons no tema do Chakra.
- Criado componente `MatchHistoryList` [#177](https://github.com/3C-gg/reload-frontend/issues/177).
- `SidebarHeader` que contém menu de usuário.
- Redux e interface de API para `Friends`.
- Componente `FriendList`.
- Componente `FriendListGroup` que representa um grupo de amigos na lista de amigos.
- Interfaces de API para `Accounts` e `Matchmaking`.
- Componente `FriendListGroupItem` que representa um amigo na lista de amigos.
- Componentes `ToastList` e `ToastListItem` para lidar com os toasts da aplicação.
- Componente `FavoriteWeaponCard` que exibe a arma favorita do usuário [#158](https://github.com/3C-gg/reload-frontend/issues/158).
- Componente `ProfileCard` para servir de base para os cards do Perfil.
- Novos componentes de Notificações: `NotificationList` e `NotificationListItem` [#129](https://github.com/3C-gg/reload-frontend/issues/129).
- Adiciona `api`s. Cria o novo padrão de interface com a API do backend para ser seguido. Iniciamos com a `BaseAPI` que contém métodos reutilizáveis genéricos e a `NotificationsAPI` que apresenta uma interface específica para se comunicar com a API do backend de Notificações.
- Adiciona `hooks` pra que a gente possa criar nossos próprios hooks e já adiciona um hook `useOutsideClick` que replica a lógica do hook do Chakra, mas adicionando uma exceção para determinadas classes.
- Propriedade `fontWeights` no tema do Chakra pra que a gente possa utilizar sempre o mesmo padrão do Figma.
- Variante `disabled` e estilo base (`baseStyle`) para o componente `Badge`.
- Mais um tom de cinza: `#1E1E1E` ou `gray.1000`.
- Adicionamos as fontes do Google na renderização do _Storybook_, bem como o carregamento dos arquivos da pasta `public`.
- Borda com cor primária no componente `Avatar`.
- Componente `Progress` foi criado para que pudéssemos simplificar a lógica do componente `LevelProgressBar`.

### Changed

- Removido `Freshdesk` da aplicação [#135](https://github.com/3C-gg/reload-frontend/issues/135).
- Adicionado link para `/` na imagem da logo na `SideBar`.
- Adicionado style `active` no `Container` de `Suporte` da `SideBar`.
- Alterado `Link` na `SideBar` de sair para um `button`.
- Adicionado função `handleToggleWidget` no componente `SideBar` [#135](https://github.com/3C-gg/reload-frontend/issues/135).
- Adicionado script do `freshdesk` no `index.html` [#135](https://github.com/3C-gg/reload-frontend/issues/135).
- Adicionado uma `key` no map na View `Account`.
- Alterado `Link` na `SideBar` de notificações para um `button`.
- Alterado componentes `NotificationListItem` e `NotificationList` para ficar igual ao design [#252](https://github.com/3C-gg/reload-frontend/issues/252).
- Adicionado cor `gray.200` no tema do chakra ui.
- Adicionado estilos para o `Drawer` no tema do chakra ui.
- Alterado view de `Account` para refletir o design [#134](https://github.com/3C-gg/reload-frontend/issues/134).
- Movido `HeaderProfile` e função `renderButtonsNavigation` para `LayoutProfile`.
- Removido `HeaderProfile` e função `renderButtonsNavigation` da view `Profile`.
- Alterado path da `AccountView` para `/conta/:userId`.
- Alterado componente `ChangeEmailCard` para usar o método `updateEmail`.
- Alterado background do `Modal` para `gray.1000` no tema do chakra.
- Alterado gray 800 para `#1B1B1B`.
- Alterado `HeaderProfile` e `LevelStatsCard` para não quebrar quando o usuário logado for uma conta recém criada.
- Alterado `HttpService` para adicionar uma `/` no final da url apenas quando não tiver uma interrogação `?` [#243] (https://github.com/3C-gg/reload-frontend/issues/243).
- Alterado componente `MatchHistoryList` para exibir paginação apenas quando tiver mais que 1 página [#228] (https://github.com/3C-gg/reload-frontend/issues/228).
- Removido método `listMatches` da interface de `AccountsAPI` e movido para `MatchesAPI`.
- Alterado `MatchView` para usar a interface MatchesApi para fazer requisições de partidas.
- Mudado `match_wins` para `match_won` no componente `LevelStatsCard` e view `Profile` [#222] (https://github.com/3C-gg/reload-frontend/issues/222).
- Alterado tamanho `xl` do `Avatar` para `80px`.
- Atualizado componente `HeaderProfile` para refletir o design [#225](https://github.com/3C-gg/reload-frontend/issues/225).
- Mudado extensao da interface `MatchmakingAPI` de `jsx` para `js`.
- Atualizado componente `MatchHistoryStatsLink` para receber prop user_id.
- Adicionado Skeleton no componente `MatchHistoryList`.
- Atualizado componentes `SideBar` e `SideBarHeader` para para o user id para a página de perfil.
- Atualizado componentes `LevelStatsCard` e `HeatmapStatsCard` para ficar igual ao design.
- Atualizado componente `HeaderProfile` para ficar igual ao design.
- Alterado view `Connect` para ficar igual ao design [#175] (https://github.com/3C-gg/reload-frontend/issues/175).
- Alterado o componente `MatchHistoryStatsAccordion` para ficar igual ao design e agora é um Link que leva para a página de detalhes da partida [#212](https://github.com/3C-gg/reload-frontend/issues/212).
- `NotificationList` passa a ir na API para popular as notificações [#164](https://github.com/3C-gg/reload-frontend/issues/164).
- Layout `MainLayout` alterado para comportar nova sidebar [#215](https://github.com/3C-gg/reload-frontend/issues/215).
- Alterado componente `HeatmapCardStats` e `LevelCardStats` para usar o componente `ProfileCard` [#202](https://github.com/3C-gg/reload-frontend/issues/202).
- Alterado componente `HeatmapCardStats` para ficar igual ao design.`
- Componente `SearchIcon` para refletir atualização de design.
- Componente `HeaderProfileMenu` foi alterado para `HeaderUserMenu`. Aplicamos o novo design e não utilizamos mais o `Menu` do Chakra [196](https://github.com/3C-gg/reload-frontend/issues/196).
- Alterado componentes que usavam antigo sistema de Toasts.
- Componente `Sidebar` foi alterado para refletir novo layout e design.
- Alterado estilos `font-weight` e `fontWeight` para user os tamanhos definidos no tema customizado do chakra ui [#194](https://github.com/3C-gg/reload-frontend/issues/194).
- Componente `Header` foi adequado para receber o novo componente `NotificationList`.
- Alterado a espessura da borda do componente `Avatar`.
- Propriedade `last_results` para `last_matches_results` para ficar mais explícito e se adequar ao campo da API [#186](https://github.com/3C-gg/reload-frontend/issues/186).
- Componente `LevelCardStats` foi atualizado para se adequar ao novo componente `LevelBadge`. Também revisamos o layout do componente para refletir mudanças no design [#156](https://github.com/3C-gg/reload-frontend/issues/156).
- Componente `UserCardMini` foi atualizado para se adequar ao novo componente `LevelBadge`.
- Componente `UserCard` foi atualizado para remover infos _hard-coded_ e se adequar ao novo componente `LevelBadge`.
- Componente `InviteListItem` foi atualizado para adequar novo componente `LevelBadge`.
- Componente `LevelProgressBar` agora utiliza novos componentes `Progress` e `LevelBadge`.
- Componente `LevelBadge` foi alterado para se encaixar melhor nos layouts [#181](https://github.com/3C-gg/reload-frontend/issues/181).

### Removed

- Removido componente `FavoriteWeaponCard` da view `Profile`.
- Componente `HeaderProfileMenu` que foi movido para a `Sidebar`.
- Testes de `LobbyView` pois estavam solicitando Redux e mock de API. Criei uma issue para endereçar esse problema de forma mais genérica: https://github.com/3C-gg/reload-frontend/issues/217
- Componente `SidebarItem`.
- Serviço descontinuado `Toast`.

### Fixed

- Componente `MatchHistoryStatsLink` renderizando `NaN` quando os stats vêm zerados.
- Componente `NotificationList` agora aparece por cima dos outros elementos da página de maneira correta [#205](https://github.com/3C-gg/reload-frontend/issues/205).

## [611cea3 - 8/5/2023]

### Added

- Criado ícone `ArrowRightSimpleIcon`.
- Criado componente `HeatmapCardStats` (https://github.com/3C-gg/reload-frontend/issues/157).
- Criado `stories` para o componente `LevelProgressBar` (https://github.com/3C-gg/reload-frontend/issues/171).
- Criado o componente `MatchHistoryStatsAccordion` (https://github.com/3C-gg/reload-frontend/issues/154).
- Criado componente `LevelCardStats` (https://github.com/3C-gg/reload-frontend/issues/156).
- Tema customizado para component Progress do Chakra UI.
- Criado componente `HeaderProfile` (https://github.com/3C-gg/reload-frontend/issues/153).
- Adicionado lib `react-countup` para animar um número de 0 a x.
- Criado componente `LevelProgressBar` (https://github.com/3C-gg/reload-frontend/issues/137).
- Criado `MatchStatsTable` componente (https://github.com/3C-gg/reload-frontend/issues/138).
- Cria estado `restricted` no tema do componente `Button` para representar o estado de restrição de lobby(https://github.com/3C-gg/reload-frontend/issues/125).
- Criado `ArrowUpIcon` componente.
- Criado componente `HeaderProfileMenu` usado no `Header` (https://github.com/3C-gg/reload-frontend/issues/130).
- Criado componente `LinkButton` usado no `Header` que muda conforme o status do lobby e match (https://github.com/3C-gg/reload-frontend/issues/127).
- Criado componente `Header` (https://github.com/3C-gg/reload-frontend/issues/8).
- Passamos a mostrar um `Tooltip` ao receber um convite (https://github.com/3C-gg/reload-frontend/issues/116).
- Agora mostramos o status "No seu grupo" para jogadores que estiverem juntos no lobby, além de agrupá-los e exibí-los no topo da lista de amigos online (https://github.com/3C-gg/reload-frontend/issues/88).
- Novo ícone de copiar.
- Página de Conectar/Pré-Partida (https://github.com/3C-gg/reload-frontend/issues/98).
- Evento WS `ws_match` que identifica que uma partida foi criada.
- Componente `RequireAuth` de apoio para rotas.
- View de detalhe de partida `MatchView`.
- Componente `MatchInfos` que exibe detalhe da partida.

### Fixed

- No teste `Lobby.spec.jsx` foi adicionado uma propriedade `notifications` dentro do objeto `user`.
- Alguns botões estavam com a propriedade `isDisabled` escrita de modo errado (`disabled`). Corrigimos isso nos botões que encontramos com esse problema (https://github.com/3C-gg/reload-frontend/issues/110).
- Adicionamos algumas verificações para impedir que amigos sejam convidados caso não seja possível, por vários motivos, por exemplo o lobby cheio, que prevê o modo 1x1 (https://github.com/3C-gg/reload-frontend/issues/111).
- Estrutura ruim de arquivos de apoio (`utils`).

### Changed

- Adicionado tema dark no storybook.
- Alterado style para o component `MatchTeamStats` ocupar `100%`.
- Removido a margin-top de `40px` do component `MatchTeamStats`.
- Mudado o size `lg` do componente `Avatar` do chakra para 55px no arquivo `theme`.
- Alterado o link do Discord para `https://discord.gg/mMMKshktfT`.
- Removido os componentes de `notificação` do `Header`.
- Serviço websocket que recebe as notificações (`ws_newNotification`).
- Adicionado o slice de `Notifications` no arquivo de `store`.
- Alterado o slice de `Notifications` para usar no componente de notificações do header.
- Mudado `Lobby.spec.js` para `Lobby.spec.jsx`.
- Mudado a importação do Header no componente `MainLayout`.
- Alterado o componente `LevelBadge` e sua estilização para receber a prop `xxsmall` para diminuir o tamanho da fonte do level.
- Adicionado propriedade formatted com valor falso no timer do componente MatchFoundModal.
- Adicionado botão de restrição de partida no componente `Header` quando o usuário está com uma penalidade (https://github.com/3C-gg/reload-frontend/issues/125).
- Adicionado botão de restrição de partida no componente `Lobby` quando o usuário está com uma penalidade (https://github.com/3C-gg/reload-frontend/issues/125).
- Adicionado nova propriedade `formatted` no `Timer` para formatar o valor quando for uma contagem regressiva.
- Formulários agora são enviados ao pressionar a tecla `enter` (https://github.com/3C-gg/reload-frontend/issues/103).
- A logo no header agora é um link para `/`.
- Move `Header` do `MainLayout` para o seu próprio componente.
- Ao aceitar um convite movemos a aba da `sidebar` para a aba default ("Amigos Online"). E rejeitar um convite, se este for o último convite recebido, move aba também (https://github.com/3C-gg/reload-frontend/issues/107).
- Métodos de autenticação agora reconhecem o campo `match` e redirecionam o usuário corretamente.

### Removed

- Removido o z-index do componente `Sidebar`.
- Removido a função `handleLogout` e suas importações do `Header` por não estar sendo usada.
- Botão de discord ao lado do login da Home (https://github.com/3C-gg/reload-frontend/issues/120).

## [93a88f5 - 19-03-2023]

### Added

- Tamanho `xsmall` da badge de level.
- Lista de usuários disponíveis para convite a partir do card vazio do Lobby (https://github.com/3C-gg/reload-frontend/issues/85).
- Serviço websocket recebe e trata evento de pré partida (`ws_preMatch`).
- Gerenciamento de estado de partida no Redux.
- Chamada API para fazer o lock in do player quando receber evento de pré partida (https://github.com/3C-gg/reload-frontend/issues/92).
- Visual e comportamento de partida encontrada, com modal de _ready_ para que players fiquem prontos até que o _countdown_ chegue a zero (https://github.com/3C-gg/reload-frontend/issues/94).

### Changed

- Ajustes visuais no tema do Modal do Chakra UI.
- Move alguns componentes que estavam no Lobby para seus próprios componentes: Header, Lineup, ModeSelector e InviteModal.
- Componente de Timer agora recebe uma propriedade chamada `stop` que faz o timer parar caso seja `true`.
- Alterações no `.editorconfig` para padronizar o projeto.
- O componente Timer passa a conter uma prop `reverse` que caracteriza o Timer como countdown.
- Altera o reducer `preMatch` para aceitar tanto criação quanto update de `pre_match`.
- Login passa a guardar `pre_match` no store de `Match`.
- Altera tamanho do componente `Toast`.
- Atualiza pacotes core muito defasados.

### Fixed

- Ícone de usuário agora reflete exatamente o design do Figma.
- Ícone de sair do lobby personalizado 20x20 quando não houver mais ninguém no lobby ou quando o lobby estiver em fila (https://github.com/3C-gg/reload-frontend/issues/89).
- Erro visual de layout que aparecia quando um jogador entrava em um lobby personalizado e voltava para o seu lobby 5x5 (https://github.com/3C-gg/reload-frontend/issues/100).
- Erro que permitia clicar para alterar o modo/tipo do lobby enquanto procurava partida. O backend recusava o pedido e não fazia a alteração (https://github.com/3C-gg/reload-frontend/issues/96).
- Cards de usuário duplicado no lobby pela visão do convidado ao aceitar convite (https://github.com/3C-gg/reload-frontend/issues/102).
- Impede que usuários iniciem uma busca por partidas caso já estejam em uma partida. Além disso, também protege a mudança de modo/tipo de lobby (https://github.com/3C-gg/reload-frontend/issues/121).

## [27509b6] - 27/02/2023

### Added

- Estilos e comportamentos do lobby (https://github.com/3C-gg/reload-frontend/pull/86)

## [6972139 - 13-02-2023]

### Added

- Página de usuário inativo (https://github.com/3C-gg/reload-frontend/pull/74)
- Home para dispositivos mobile (https://github.com/3C-gg/reload-frontend/pull/75)
- Loading para telas que precisam carregar informações do servidor antes de exibir informações (https://github.com/3C-gg/reload-frontend/pull/78)
