// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");

module.exports = (phase, config, options) =>
  withNx({
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
  });
