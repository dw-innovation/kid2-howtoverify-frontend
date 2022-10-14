const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
});
