const globals = require('globals');
const {defineConfig} = require('eslint/config');
const {baseEslintConfig} = require('../base.eslint.config');

module.exports = defineConfig({
	extends: [...baseEslintConfig.extends],
	languageOptions: {
		...baseEslintConfig.languageOptions,
		globals: {...baseEslintConfig.languageOptions.globals, ...globals.node},
		sourceType: 'commonjs'
	},
	rules: {
		...baseEslintConfig.rules
	}
});
