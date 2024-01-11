import { DrawerFriendsListGroup } from './DrawerFriendsListGroup'

export default {
  title: 'Friends/DrawerFriendsListGroup',
  component: DrawerFriendsListGroup,
  argTypes: {
    title: { control: 'text' },
    collapse: { control: 'boolean' },
    open: { control: 'boolean' },
    friendsCount: { control: 'number' },
    showHeader: { control: 'boolean' },
  },
  args: {
    title: 'Disponível',
    collapse: true,
    open: true,
    friendsCount: 2,
    showHeader: true,
  },
}

export const Default = (props: any) => {
  const genFriends = Array.from(Array(props.friendsCount).keys()).map(
    (_, index) => ({
      user_id: index + 2,
      lobby_id: index + 2,
      status: 'online',
      username: `Friend ${index + 2}`,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
    })
  )
  return <DrawerFriendsListGroup {...props} friends={genFriends} />
}
