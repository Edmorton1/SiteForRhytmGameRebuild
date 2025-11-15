const js = require('@eslint/js');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const {globalIgnores} = require('eslint/config');

const baseEslintConfig = {
	extends: [
		js.configs.recommended,
		eslintPluginPrettierRecommended,
		eslintConfigPrettier,
		globalIgnores(['node_modules', 'dist', 'build'])
	],
	files: ['**/*.{js,mjs,cjs,jsx}'],
	languageOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		camelcase: 'error'
		// "no-warning-comments": [
		// 	"warn",
		// 	{ terms: ["TODO", "FIXME"], location: "start" },
		// ],
	}
};

module.exports = {baseEslintConfig};
