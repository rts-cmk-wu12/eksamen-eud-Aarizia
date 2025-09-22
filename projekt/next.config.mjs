/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('http://localhost:4000/file-bucket/**')]
    }
};

export default nextConfig;