import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      return config;
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: false,
  },
});
