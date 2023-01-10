const path = require('path')

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@slices': path.resolve(__dirname, 'src/slices'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@layouts': path.resolve(__dirname, 'src/layouts'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
		},
	},
	jest: {
		babel: {
			addPresets: true /* (default value) */,
			addPlugins: true /* (default value) */,
		},
		configure: {
			moduleNameMapper: {
				'^@assets(.*)$': '<rootDir>/src/assets$1',
				'^@components(.*)$': '<rootDir>/src/components$1',
				'^@services(.*)$': '<rootDir>/src/services$1',
				'^@slices(.*)$': '<rootDir>/src/slices$1',
				'^@utils(.*)$': '<rootDir>/src/utils$1',
				'^@views(.*)$': '<rootDir>/src/views$1',
				'^@config(.*)$': '<rootDir>/src/config$1',
				'^@store(.*)$': '<rootDir>/src/store$1',
				'^@providers(.*)$': '<rootDir>/src/providers$1',
				'^@layouts(.*)$': '<rootDir>/src/layouts$1',
			},
		},
	},
}
