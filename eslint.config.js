import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Basic recommended JS rules
  js.configs.recommended,

  // React + browser setup
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
    },
  },

  // React recommended rules
  reactPlugin.configs.flat.recommended,

  // ✅ Our overrides (last one wins)
  {
    rules: {
      // Using new JSX transform → no need to import React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        // Fix "React version not specified" warning
        version: "detect",
      },
    },
  },
]);
