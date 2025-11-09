//@ts-check

import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {defineConfig} from 'eslint/config';
import reactRefresh from 'eslint-plugin-react-refresh';
import tanstackEslintPlugin from '@tanstack/eslint-plugin-query';
import baseEslintConfig from '../../base.eslint.config.js';

export default defineConfig({
	extends: [
		...baseEslintConfig.extends,
		pluginReact.configs.flat.recommended,
		reactRefresh.configs.vite,
		...tanstackEslintPlugin.configs['flat/recommended']
	],
	plugins: {
		'react-hooks': reactHooks.configs['recommended-latest']
	},
	languageOptions: {
		...baseEslintConfig.languageOptions,
		ecmaVersion: 2020,
		globals: {...baseEslintConfig.languageOptions.globals, ...globals.browser}
	},
	rules: {
		...baseEslintConfig.rules,
		// React
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off'
		// "react-hooks/exhaustive-deps": "error",
	}
});
