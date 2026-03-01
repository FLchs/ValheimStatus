/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "fr"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["<rootDir>/src"],
    },
  ],
  format: "po",
};
