import { defineConfig } from "eslint/config";
import eslintReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import vitest from "@vitest/eslint-plugin";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

const jsxFiles = ["**/*.{js,jsx}"];
const testFiles = ["**/*.test.{js,jsx}"];

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  {
    files: jsxFiles,
    extends: [eslintReact.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: jsxFiles,
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@eslint-react/no-array-index-key": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  prettierRecommended,
  {
    files: testFiles,
    extends: [vitest.configs.recommended],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    files: ["vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);
