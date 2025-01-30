# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Redux (part-6)

* `npm create vite@latest redux --template react`
*  `npm install redux`


* `npm install --save-dev jest @babel/preset-env @babel/preset-react eslint-plugin-jest`
- The whole state of the application is stored in one JavaScript object in the store.
- The state of the store is changed with actions. Actions are `objects`, which have at least a field determining the type of the action. If there is data involved with the action,
- Create `.babelrc` file
```js
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```
* Let us expand `package.json` with a script for running the tests:

```js
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",

    "test": "jest"
  },
  // ...
}
```
- And finally, `.eslintrc.cjs` needs to be altered as follows:

```js
module.exports = {
  root: true,
  env: { 
    browser: true,
    es2020: true,

    "jest/globals": true
  },
  // ...
}
```

- We'll also add the library deep-freeze, which can be used to ensure that the reducer has been correctly defined as an immutable function.
* `npm install --save-dev deep-freeze`
