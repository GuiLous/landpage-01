import { FavoriteWeaponCard } from '@components'

export default {
  title: 'Profile/FavoriteWeaponCard',
  component: FavoriteWeaponCard,
  argTypes: {
    weapon: { control: 'object' },
  },
  args: {
    weapon: {
      avatar:
        'https://static.wikia.nocookie.net/gtawiki/images/5/56/AssaultSMG-GTAV-SocialClub.png',
      name: 'SMG',
      type: 'Submetralhadora',
      stats: {
        kills: 450,
        assists: 900,
        head_shots: 133,
        shots_fired: 3450,
        hit_shots: 1390,
        matches: 230,
        wins: 103,
      },
    },
  },
}

export const Default = {
  render: (props) => <FavoriteWeaponCard {...props} />,
}
