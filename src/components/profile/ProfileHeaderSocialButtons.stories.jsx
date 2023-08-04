import { ProfileHeaderSocialButtons } from '@components'

export default {
  title: 'Profile/ProfileHeaderSocialButtons',
  component: ProfileHeaderSocialButtons,
  argTypes: {},
  args: {},
}

const socials = [
  {
    name: 'steam',
    url: 'https://steamcommunity.com/profiles/76561199086242260/',
  },
  { name: 'discord', url: 'https://discord.gg/mMMKshktfT' },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A',
  },
]

export const Default = {
  render: (props) => (
    <ProfileHeaderSocialButtons socials={socials} {...props} />
  ),
}
