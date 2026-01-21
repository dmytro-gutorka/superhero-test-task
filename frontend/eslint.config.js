import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist", "node_modules"]),
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier: prettierPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            react.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            "plugin:prettier/recommended",
        ],
        rules: {
            "prettier/prettier": "warn",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },
]);
