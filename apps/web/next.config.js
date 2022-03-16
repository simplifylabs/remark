const withNx = require("@nrwl/next/plugins/with-nx");

module.exports = (phase, config, options) =>
  withNx({
    async redirects() {
      return [
        {
          source: "/uninstall",
          destination: "/feedback?source=uninstall",
          permanent: false,
        },
      ];
    },
  });
