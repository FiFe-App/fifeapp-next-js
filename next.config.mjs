/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: true
	},
    distDir: 'dist',
    output: 'export'
};


export default nextConfig
