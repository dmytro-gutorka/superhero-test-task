const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");
const prettierPlugin = require("eslint-plugin-prettier");

const prettierConfig = require("./eslint.config.js");

module.exports = [
    { ignores: ["dist", "node_modules"] },
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
                project: "./tsconfig.json",
            },
            globals: {
                console: "readonly",
                process: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                module: "readonly",
                require: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
        },

        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            "prettier/prettier": ["warn", prettierConfig],
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
];