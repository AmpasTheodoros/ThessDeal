/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['localhost', 'masoutis.gr', 'masoutisadm.masoutis.gr']
  }
}

export default nextConfig;
