import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from "eslint-config-prettier/flat"
import {globalIgnores} from 'eslint/config';

const baseEslintConfig = {
	extends: [
		js.configs.recommended,
		tseslint.configs.recommended,
		eslintPluginPrettierRecommended,
		eslintConfigPrettier,
		globalIgnores(['node_modules', 'dist', 'build'])
	],
	files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	languageOptions: {
		ecmaVersion: 'latest',
		globals: {...globals.jest}
	},
	rules: {
		// "no-warning-comments": [
		// 	"warn",
		// 	{ terms: ["TODO", "FIXME"], location: "start" },
		// ],
	}
};

export default baseEslintConfig
