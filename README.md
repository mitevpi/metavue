# JS & NodeJS ES6 Module Template

[![Generic badge](https://img.shields.io/badge/Docs-Web-Green.svg)](https://mitevpi.github.io/js-module-template/) [![Generic badge](https://img.shields.io/badge/Docs-MD-Green.svg)](docs/README.md) [![Generic badge](https://img.shields.io/badge/Samples-JS-Green.svg)](samples)

[![GitHub issues](https://img.shields.io/github/issues/mitevpi/js-module-template.svg)](https://github.com/mitevpi/js-module-template/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/mitevpi/js-module-template.svg)](https://github.com/mitevpi/js-module-template/commits/master)

JS & NodeJS module boilerplate. Use this as a starting point for your next `npm`/`yarn` or `cdn` package/module to write organized, reusable code.

## Features

### All Build Features

- [**Babel**](https://babeljs.io/) - Write next generation JavaScript today.
- [**Jest**](https://facebook.github.io/jest) - JavaScript testing framework used by Facebook.
- [**ESLint**](http://eslint.org/) - Make sure you are writing a quality code.
- [**Prettier**](https://prettier.io/) - Enforces a consistent style by parsing your code and re-printing it.
- [**Flow**](https://flowtype.org/) - A static type checker for JavaScript used heavily within Facebook.
- [**Travis CI**](https://travis-ci.org) - Automate tests and linting for every push or pull request.
- [**Documentation**](http://documentation.js.org/) - A documentation system so good, you'll actually write documentation.
- [**Standard Version**](https://github.com/conventional-changelog/standard-version) - Automate versioning and CHANGELOG generation.

### CDN Build Features

- [**Rollup**](https://rollupjs.org/guide/en/) - Aggregate code into one compact file.
- [**Babel Minify**](https://github.com/babel/minify) - Slim down code for streamlined, low impact CDN delivery.

Just make sure to edit `package.json`, `README.md` and `LICENSE` files accordingly with your module's info.

### Adding Features

<details><summary><strong>CDN Build</strong></summary>
  
1. Install dependencies:

    ```sh
    npm i -D rollup rollup-plugin-babel rollup-plugin-babel-minify rollup-plugin-commonjs rollup-plugin-node-resolve rollup-plugin-replace rollup-watch
    ```

2. Add a `rollup.config.js` file in the root of the repository with the following contents:

   ```js
   import minify from "rollup-plugin-babel-minify";

   module.exports = {
     input: "dist/index.js",
     plugins: [
       minify({
         comments: false
         // Any other options for babel-minify.
       })
     ]
   };
   ```

3. Replace the build script/line in the `package.json` file with the following lines (make sure to replace the `{YOUR_PKG_NAME}` below
   with the actual name of your module):

   ```json
   "build": "npm run build:common-js && npm run build:umd && npm run build:umd:min",
   "build:common-js": "babel src -d dist",
   "build:umd": "node_modules/.bin/rollup src/index.js --file dist/{YOUR_PKG_NAME}.umd.js --format umd --name {YOUR_PKG_NAME}",
   "build:umd:watch": "npm run build:umd -- --watch",
   "build:umd:min": "node_modules/.bin/rollup src/index.js --file dist/{YOUR_PKG_NAME}.umd.min.js --config --format umd --compact --name {YOUR_PKG_NAME}",
   ```

4. Add appropriate entry points to your package.json file:

    ```json
    "browser": "dist/{YOUR_PKG_NAME}.umd.min.js",
    "cdn": "dist/{YOUR_PKG_NAME}.umd.min.js",
    ```

</details>

<details><summary><strong>TypeScript</strong></summary>
  
1. Install dependencies:

    ```sh
    yarn add -D @babel/preset-typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript
    ```

2. Update `package.json`:

   ```diff
   + "types": "dist/ts/src",
     "scripts": {
   +   "type-check": "tsc --noEmit",
   -   "lint": "eslint .",
   +   "lint": "eslint . --ext js,ts,tsx",
   -   "build": "babel src -d dist",
   +   "build": "tsc --emitDeclarationOnly && babel src -d dist -x .js,.ts,.tsx",
     },
     "lint-staged": {
   -   "*.js": [
   +   "*.{js,ts,tsx}": [
   -     "eslint --fix",
   +     "eslint --fix --ext js,ts,tsx",
         "git add"
       ]
     }
   ```

3. Create `tsconfig.json`

   ```json
   {
     "compilerOptions": {
       "outDir": "dist/ts",
       "target": "esnext",
       "module": "esnext",
       "moduleResolution": "node",
       "jsx": "react",
       "strict": true,
       "declaration": true,
       "noFallthroughCasesInSwitch": true,
       "noImplicitReturns": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "stripInternal": true
     }
   }
   ```

4. Update `.babelrc`:

   ```diff
     "presets": [
   +   "@babel/preset-typescript"
     ]
   ```

5. Update `.eslintrc` with these settings:

   ```json
     "settings": {
       "import/resolver": {
         "node": {
           "extensions": [".js", ".jsx", ".ts", ".tsx"]
         }
       }
     },
     "overrides": [
       {
         "files": ["**/*.ts", "**/*.tsx"],
         "parser": "@typescript-eslint/parser",
         "parserOptions": {
           "project": "./tsconfig.json"
         },
         "plugins": [
           "@typescript-eslint"
         ],
         "rules": {
           "no-undef": "off",
           "no-unused-vars": "off",
           "no-restricted-globals": "off"
         }
       }
     ]
   ```

</details>

### Removing Features

<details><summary><strong>Flow</strong></summary>

1. Remove `.flowconfig` file.

2. Remove `flow` from `package.json`

   ```diff
     "scripts": {
   -   "flow": "flow check",
   -   "flowbuild": "flow-copy-source src dist",
   -   "prebuild": "npm run docs && npm run clean && npm run flowbuild",
   +   "prebuild": "npm run docs && npm run clean",
     },
     "devDependencies": {
   -   "@babel/preset-flow": "^7.0.0",
   -   "eslint-plugin-flowtype": "^2.50.0",
   -   "eslint-plugin-flowtype-errors": "^3.5.1",
   -   "flow-bin": "^0.81.0",
   -   "flow-copy-source": "^2.0.2",
     }
   ```

3. Remove `flow` from `.babelrc`:

   ```diff
     "presets": [
   -   "@babel/preset-flow"
     ]
   ```

4. Remove `flow` from `.eslintrc`:

   ```diff
     "extends": [
   -   "plugin:flowtype/recommended",
   -   "prettier/flowtype"
     ],
     "plugins": [
   -   "flowtype",
   -   "flowtype-errors"
     ],
     "rules": {
   -   "flowtype-errors/show-errors": "error"
     }
   ```

5. Run `yarn`.

</details>

<details><summary><strong>Documentation</strong></summary>

1. Remove `documentation` from `package.json`:

   ```diff
     "scripts": {
   -   "docs": "documentation readme src --section=API",
   -   "postdocs": "git add README.md",
   -   "prebuild": "npm run docs && npm run clean",
   +   "prebuild": "npm run clean",
     },
     "devDependencies": {
   -   "documentation": "^8.0.0",
     }
   ```

2. Run `yarn`.

</details>

## Usage

### Starting a Project

Clone the repository, and use it as the starting point of your project.

```sh
cd my-module
git clone https://github.com/mitevpi/js-module-template.git
rm -rf .git
npm i
```

### Commands

```sh
npm test # run tests with Jest
npm run coverage # run tests with coverage and open it on browser
npm run lint # lint code
npm run docs # generate docs
npm run build # transpile code and build module
```

### Publish

```sh
npm run release
npm publish
```

It'll automatically run `test`, `lint`, `docs`, `build`, generate `CHANGELOG.md`, and push commits and tags to the remote repository.

## Usage In Other Projects (After Build)

### Imports

Imports can be done through the aggregating index.js file or via individual members. Make sure to substitute the
names `module` & `Module`, and `Class1` & `Class2` for the actual names of your module and classes respectively.

#### Full Import

```js
// es5
const module = require('./index.js'); // from source
const module = require('module') // from npm

// es6
import * as Module from "../src"; // from source
import * as Module from from "module"; // from npm
```

#### Individual Import

```js
// from source
const Class1 = require("./Class1");
const Class2 = require("./Class2");

// from npm
const { Class1 } = require("module");
const { Class2 } = require("module");
import { Class1, Class2 } from "module"; // es6
```

#### CDN (If CDN Build Steps are Added to Project)

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- import minified script from CDN or copy it locally -->
    <script src="../dist/module.umd.min.js"></script> 
  </head>

  <body>
    <script>
      console.log("LIBRARY", moduleName); // imported lib object: classes, functions
      console.log("RESULT", result); // 15
    </script>
  </body>
</html>;
```
