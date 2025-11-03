import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import {globalIgnores} from 'eslint/config';

const baseEslintConfig = {
	extends: [
		js.configs.recommended,
		tseslint.configs.recommended,
		eslintPluginPrettierRecommended,
		globalIgnores(['node_modules', 'dist', 'build'])
	],
	files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	languageOptions: {
		ecmaVersion: 'latest',
		globals: {...globals.jest},
		parserOptions: {
			project: './tsconfig.eslint.json',
			tsconfigRootDir: import.meta.dirname
		}
	},
	rules: {
		// "no-warning-comments": [
		// 	"warn",
		// 	{ terms: ["TODO", "FIXME"], location: "start" },
		// ],
	}
};

export default baseEslintConfig

// import globals from 'globals';
// import js from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
//
// export const baseFilePlugins = [js.configs.recommended, tseslint.configs.recommended, eslintPluginPrettierRecommended];
//
// export const baseFileConfig = {
// 	ignores: ['node_modules/', 'dist/', 'build/'],
// 	files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
// 	languageOptions: {
// 		ecmaVersion: 'latest',
// 		globals: {...globals.jest},
// 		// parserOptions: {
// 		// 	project: './tsconfig.eslint.json',
// 		// 	tsconfigRootDir: import.meta.dirname
// 		// }
// 	},
// 	rules: {
// 		// "no-warning-comments": [
// 		// 	"warn",
// 		// 	{ terms: ["TODO", "FIXME"], location: "start" },
// 		// ],
// 	}
// };
