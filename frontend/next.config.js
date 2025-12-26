/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    'https://project-eight-psi-14.vercel.app/api/:path*',
            },
        ];
    },
};

export default nextConfig;
