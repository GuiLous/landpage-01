/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['reloadclub-api-staging.s3.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
