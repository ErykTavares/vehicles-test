/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	typescript: {
		ignoreBuildErrors: true
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/vehicle',
				permanent: true
			}
		];
	}
};

module.exports = nextConfig;
