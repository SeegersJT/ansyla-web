import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{ts,tsx,js,jsx,json}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': ts,
			react,
			'react-hooks': reactHooks,
			prettier,
		},
		rules: {
			// --- Prettier runs as an ESLint rule ---
			'prettier/prettier': 'warn',

			// --- TypeScript ---
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',

			// --- React ---
			'react/react-in-jsx-scope': 'off', // Not needed in React 17+
			'react/prop-types': 'off', // TypeScript handles this
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// --- General ---
			'no-console': 'warn',
			'no-unused-vars': 'off', // Use TS version instead
		},
		settings: {
			react: { version: 'detect' },
		},
	},
]
