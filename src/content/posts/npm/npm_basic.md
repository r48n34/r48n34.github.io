---
title: "[NPM] Publish your typescript code to NPM" 
published: 2024-04-09
description: 'Create your own typescript library and publish to npm'
tags: [Typescript, NPM]
category: NPM
draft: false
---

---
sidebar_position: 2
tags:
  - Npm
  - Packages
  - React
---

## Basic build

This tutorial will bs using `yarn`. You may change to `npm` as you wish.

### Structure
```md 
📂 .
├── jest.config.js
├── LICENSE
├── package.json
├── README.md
├─┬ 📂 src
│ ├── index.ts
│ └─┬ 📂 utilis
│   └── sum.ts
├─┬ 📂 test
│ └── index.test.ts
└── tsconfig.json
```

### 1. Setup package.json
```json title="package.json"
{
  "name": "npm-package-starter",
  "version": "1.0.0",
  "description": "Hello mate.",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "author": "reemo",
  "homepage": "",
  "repository": "",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "test": "jest --maxWorkers 2"
  },
  "files": [
    "dist/*"
  ],
  "keywords": ["sum"],
  "devDependencies": {
    "@types/jest": "^29.2.3",
    "@types/node": "^18.11.9",
    "jest": "^29.3.1",
    "ts-jest": "^29.0.3",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.3"
  },
  "dependencies": {
  }
}

```

### 2. Setup tsconfig.json

To state that there are several config to notices.

- `"outDir": "./dist"`: The builded dir for packages
- `"include": [...]`: The file / folders that will build to `src` in `tsc` runtime
- `"exclude": [...]`: The file / folders that will not builded to `src` in `tsc` runtime

```json title="tsconfig.json"
{
    "compilerOptions": {
        "strict": true,
        "module": "commonjs",
        "target": "es2015",
        "declaration": true,
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "outDir": "./dist",
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noUnusedLocals": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "test",
        "test-data",
        "node_modules",
        "dist",
        "build",
        "scripts",
        "index.js"
    ]
}
```

### 3. Functions

Let's create a `utilis` folder and a `sum.ts` in src.

Inside `src/utils/sum.ts`
```ts title="src/utils/sum.ts"
export function sum(a: number, b: number){
    return a + b
}
```

Go back to `src`, create a `index.ts` and `export` the functions.

```ts title="src/utils/index.ts"
import { sum } from "./utilis/sum";

export { sum }
```

### 4. Build packages
If you succes to run the commend, a `dist` folder will be generate.
```bash
yarn build
```

### 5. Publish packages to NPM
```bash
npm publish
```

And done!

## Add testing

### 1. Setup `jest.config.js`
Add the `jest.config.js` for testing config.

Inside `jest.config.js`
```js title="jest.config.js"
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

### 2. Setup `index.test.ts`
Create a new folder `test`, then create a `index.test.ts` for testing our `sum.ts`

Inside `test/index.test.ts`
```ts title="test/index.test.ts"
import { sum } from '../dist/index';

test('test 1 plus 3 is 4', () => {
    expect(sum(1, 3)).toBe(4);
})
```

### 3. Run testing
```bash title="jest.config.js"
yarn test
```