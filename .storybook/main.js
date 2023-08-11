/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require('path')

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
    'storybook-addon-mock',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  features: {
    emotionAlias: false,
  },
  docs: {
    autodocs: 'tag',
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
      '@api': path.resolve(__dirname, '../src/api'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
    }

    return config
  },
}
export default config
