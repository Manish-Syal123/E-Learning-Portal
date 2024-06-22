/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
      },
    ],
  },
};

export default nextConfig;

/** In Next.js Version 14, domains configuration has been deprecated 
in favour of remotePatterns.This can be defined in the next.config.js file.
Here is a reference as per the Next.js docs: 
remotePatterns: (https://nextjs.org/docs/app/api-reference/components/image#remotepatterns) **/

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: ["ap-south-1.graphassets.com"],
//   },
// };

// export default nextConfig;
