/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      { source: "/__os/status", destination: "/api/os/status" },
      { source: "/__os/commit", destination: "/api/os/commit" },
      { source: "/__os/new-project", destination: "/api/os/new-project" },
    ];
  },
};

export default nextConfig;
