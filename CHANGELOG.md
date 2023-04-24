# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- criado componente `HeaderProfile` (https://github.com/3C-gg/reload-frontend/issues/153).
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
- Componente `MatchInfos` que exibe detalhe da partida.

### Fixed

- Alguns botões estavam com a propriedade `isDisabled` escrita de modo errado (`disabled`). Corrigimos isso nos botões que encontramos com esse problema (https://github.com/3C-gg/reload-frontend/issues/110).
- Adicionamos algumas verificações para impedir que amigos sejam convidados caso não seja possível, por vários motivos, por exemplo o lobby cheio, que prevê o modo 1x1 (https://github.com/3C-gg/reload-frontend/issues/111).

### Changed

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
