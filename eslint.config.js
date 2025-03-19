import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist'],
  },

  // Основная конфигурация
  {
    files: ['**/*.{ts,tsx}'], // Применяем только к TypeScript файлам
    languageOptions: {
      ecmaVersion: 2020, // Версия ECMAScript
      globals: {
        ...globals.browser, // Глобальные переменные браузера
      },
      parser: tseslint.parser, // Парсер TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Поддержка JSX
        },
        sourceType: 'module', // Используем ES-модули
      },
    },
    plugins: {
      react: reactPlugin, // Плагин для React
      'react-hooks': reactHooks, // Плагин для React Hooks
      'react-refresh': reactRefresh, // Плагин для React Refresh
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // отключаем import React from 'react';

      // Правила для React
      'react/jsx-uses-react': 'error', // Обнаруживаем использование React
      'react/jsx-uses-vars': 'error', // Обнаруживаем использование переменных в JSX

      // Правила для React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Правило для React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Дополнительные правила
      'no-console': 'warn', // Предупреждаем об использовании console.log
      'no-unused-vars': 'warn', // Предупреждаем о неиспользуемых переменных
    },
  },

  // Подключаем конфигурации
  js.configs.recommended, // Базовые правила ESLint
  ...tseslint.configs.recommended, // Рекомендации для TypeScript
  {
    // Рекомендации для React
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // отключаем правило здесь
    },
  },
  {
    // Рекомендации для React Hooks
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    // Поддержка React Refresh
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: reactRefresh.configs.recommended.rules,
  },
  prettier, // Отключаем правила, которые конфликтуют с Prettier
];
