import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from "eslint-config-prettier/flat"
import {globalIgnores} from 'eslint/config';

const baseEslintConfig = {
	extends: [
		js.configs.recommended,
		eslintPluginPrettierRecommended,
		eslintConfigPrettier,
		globalIgnores(['node_modules', 'dist', 'build'])
	],
	files: ['**/*.{js,mjs,cjs,jsx}'],
	languageOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		camelcase: 'error'
		// "no-warning-comments": [
		// 	"warn",
		// 	{ terms: ["TODO", "FIXME"], location: "start" },
		// ],
	}
};

export default baseEslintConfig
