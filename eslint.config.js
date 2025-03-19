import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier'; // Добавляем Prettier

export default tseslint.config(
  { ignores: ['dist'] }, // Игнорируем папку dist
  {
    extends: [
      js.configs.recommended, // Базовые правила ESLint
      ...tseslint.configs.recommended, // Рекомендации для TypeScript
      'plugin:react-hooks/recommended', // Рекомендации для React Hooks
      'plugin:react-refresh/all', // Поддержка React Refresh
      prettier, // Отключаем правила, которые конфликтуют с Prettier
    ],
    files: ['**/*.{ts,tsx}'], // Применяем только к TypeScript файлам
    languageOptions: {
      ecmaVersion: 2020, // Версия ECMAScript
      globals: globals.browser, // Глобальные переменные браузера
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Поддержка JSX
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks, // Плагин для React Hooks
      'react-refresh': reactRefresh, // Плагин для React Refresh
    },
    rules: {
      // Правила для React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Правило для React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Дополнительные правила
      'no-console': 'warn', // Предупреждаем об использовании console.log
      'no-unused-vars': 'warn', // Предупреждаем о неиспользуемых переменных
      'react/jsx-uses-react': 'error', // Обнаруживаем использование React
      'react/jsx-uses-vars': 'error', // Обнаруживаем использование переменных в JSX
    },
  },
);
