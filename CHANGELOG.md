# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Ajusta `FriendList` para refletir novo design [#251](https://github.com/3C-gg/reload-frontend/issues/251).

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

- Alterado css do layout `ProfileLayout` para padronizar o padding.
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
- Adicionado cor `gray.650` no tema do chakra ui.
- Adicionado estilos para o `Drawer` no tema do chakra ui.
- Alterado view de `Account` para refletir o design [#134](https://github.com/3C-gg/reload-frontend/issues/134).
- Movido `HeaderProfile` e função `renderButtonsNavigation` para `LayoutProfile`.
- Removido `HeaderProfile` e função `renderButtonsNavigation` da view `Profile`.
- Alterado path da `AccountView` para `/conta/:userId`.
- Alterado componente `ChangeEmailCard` para usar o método `updateEmail`.
- Alterado background do `Modal` para `gray.800` no tema do chakra.
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
- Mais um tom de cinza: `#1E1E1E` ou `gray.800`.
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
- Adicionado cor `gray.650` no tema do chakra ui.
- Adicionado estilos para o `Drawer` no tema do chakra ui.
- Alterado view de `Account` para refletir o design [#134](https://github.com/3C-gg/reload-frontend/issues/134).
- Movido `HeaderProfile` e função `renderButtonsNavigation` para `LayoutProfile`.
- Removido `HeaderProfile` e função `renderButtonsNavigation` da view `Profile`.
- Alterado path da `AccountView` para `/conta/:userId`.
- Alterado componente `ChangeEmailCard` para usar o método `updateEmail`.
- Alterado background do `Modal` para `gray.800` no tema do chakra.
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
