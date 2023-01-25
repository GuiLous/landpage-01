const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@chakra-ui/storybook-addon',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    emotionAlias: false,
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@slices': path.resolve(__dirname, '../src/slices'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@views': path.resolve(__dirname, '../src/views'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
    }

    return config
  },
}
