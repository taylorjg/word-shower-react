import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "/word-shower-react",
  plugins: [react()],
  resolve: {
    alias: [{ find: "@app", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
  },
});
