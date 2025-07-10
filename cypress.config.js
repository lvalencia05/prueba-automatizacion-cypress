const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.selaski.com",
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true, // Captura screenshots en fallos (por defecto)
    screenshotsFolder: "cypress/screenshots", // Carpeta de screenshots
    video: true, // Grabar video
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // Implementar node event listeners aquí
      config.env = process.env;
      return config;
    },
  },
});