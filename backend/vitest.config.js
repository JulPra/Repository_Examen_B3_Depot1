
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "..",
  test: {
    environment: "jsdom",
    include: ["backend/tests/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["frontend/Application/scripts/**/*.js"],
      reportsDirectory: "backend/coverage"
    }
  }
});
