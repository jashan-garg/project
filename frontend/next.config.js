/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    'project-ifusd1oxl-jashan-gargs-projects.vercel.app/api/:path*',
            },
        ];
    },
};

export default nextConfig;
