module.exports = {
    async redirects() {
      return [
        {
          source: '/blog/:slug',
          destination: '/articles/:slug',
          permanent: true,
        },
      ];
    },
  };