## Установка пакетов

```bash
npm create vite@latest task-manager --template react-ts
git init
git remote add origin https://github.com/ваш-username/task-manager.git
git checkout -b setup
 
 npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Ручная настройка eslint и prettier
# eslint / prettier - установка для ручной настройки
# eslint-plugin-react - Добавляет правила для React (например, проверка пропсов, ключей в списках).
# eslint-plugin-react-hooks - Обеспечивает соблюдение правил использования useEffect и useState.
# eslint-config-prettier - Конфигурация, которая отключает правила ESLint, конфликтующие с Prettier.
# eslint-plugin-prettier - Плагин, который запускает Prettier как правило ESLint.
# @typescript-eslint/eslint-plugin - Чтобы ESLint мог анализировать TypeScript-код.
# @typescript-eslint/parser - Парсер, который позволяет ESLint понимать TypeScript-код. Без него ESLint не сможет анализировать TypeScript.

# Что-то такое еще устанавливал
npm install @eslint/js globals

# Получается надо переделать файл eslint если проект стартует с vite ...
```


## Настройка Husky:
```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```
-> Добавь в package.json: 
```json
"lint-staged": {
"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
} 
```

## Установка Redux
```bash
npm install redux react-redux redux-thunk
```

## React router
```bash
npm install react-router-dom
```





















