import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
        },
    },

    rules: {
        semi: [2, "always"],
        "require-yield": 0,
        strict: ["error", "global"],

        "no-unused-vars": ["error", {
            vars: "all",
            args: "none",
        }],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        "space-before-function-paren": ["error", "never"],
    },
    ignores: ["node_modules", "dist", "build", "**/*.mjs"],    
}];