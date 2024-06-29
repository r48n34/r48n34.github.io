---
title: "[NPM] Publish your react component to NPM" 
published: 2024-04-09
description: 'Few steps for creating your own react components with rollu.js, and publish to npm'
tags: [Typescript, NPM, React]
category: NPM
draft: false
---

# Basic build

This tutorial will bs using `yarn`. You may change to `npm` as you wish.
The `rollup` pack will be used in this time.

### Structure
```md 
📂 .
├── package.json     
├── README.md        
├── rollup.config.mjs
├─┬ 📂 src # our components  
│ ├── 📂 components 
│ │ ├── counter.tsx  
│ │ └── myButton.tsx
│ └── index.ts       
├─┬ 📂 testing-web # For testing our components  
│ ├── index.html     
│ ├── package.json   
│ ├── 📂 public      
│ ├── 📂 src
│ ├── tsconfig.json
│ ├── tsconfig.node.json
│ └── vite.config.ts
└── tsconfig.json
```

### 1. Setup package.json
```json title="package.json"
{
  "name": "react-npm-test-reemo-new",
  "version": "1.0.1",
  "description": "",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "author": "reemo",
  "homepage": "https://github.com",
  "repository": "https://github.com",
  "scripts": {
    "build": "rimraf dist && tsc",
    "build-roll": "rimraf dist && rollup -c",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "files": [
    "/dist"
  ],
  "keywords": [
    "react",
    "tsx"
  ],
  "devDependencies": {
    "@babel/core": "^7.22.1",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.1.0",
    "@rollup/plugin-replace": "^5.0.2",
    "@rollup/plugin-typescript": "^11.1.1",
    "@swc/core": "^1.3.62",
    "@types/react": "^18.2.8",
    "@types/react-dom": "^18.2.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "rollup": "^3.24.0",
    "rollup-plugin-filesize": "^10.0.0",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-serve": "^2.0.2",
    "rollup-plugin-swc3": "^0.8.2",
    "tslib": "^2.5.3",
    "typescript": "^5.1.3"
  }
}
```

And install `rimraf` first for delete folders / file.
```bash
npm i rimraf
```

### 2. Setup tsconfig.json

To state that there are several config to notices.

- `"outDir": "./dist"`: The builded dir for packages
- `"include": [...]`: The file / folders that will build to `src` in `tsc` runtime
- `"exclude": [...]`: The file / folders that will not builded to `src` in `tsc` runtime

```json title="tsconfig.json"
{
    "compilerOptions": {
        "target": "es2016",
        "strict": true,
        "jsx": "react",
        "declaration": true,
        "esModuleInterop": true,
        "outDir": "dist",
        "module": "es6",
        "moduleResolution": "node",
        "resolveJsonModule": true
    },
    "include": [
        "src"
    ],
    "exclude": [
        "node_modules",
        "testing-web",
        "test",
        "bin",
        "template"
    ]
}
```

### 3. components

Let's create a `components` folder and a `counter.tsx` in `components`.

```tsx title="src/components/counter.tsx"
import * as React from "react";

export function Counter({ num }:{ num: number }) {
  const [count, setCount] = React.useState(num || 0);
  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </>
  );
}
```

Also, create a `myButton.tsx` in `components`.

```tsx title="src/components/myButton.tsx"
import * as React from "react";

export function MyButton() {
  return (
    <>
      <button>
        MyButton
      </button>
    </>
  );
}
```

Go back to `src`, create a `index.ts` and `export` the components.

```ts title="src/utils/index.ts"
export { Counter } from "./components/counter";
export { MyButton } from "./components/myButton";
```

### 4. Setup `testing-web`
Set up a testing react website for import the components. This time we use `vite` for create a react runtime.  
https://vitejs.dev/guide/   

And name the folder `testing-web`

```bash
yarn create vite
```

### 5. Setup import to vite
In `testing-web/src/App.tsx`, delete the preset stuff and import out components.
```tsx title="testing-web/src/App.tsx"
import { Counter, MyButton } from "../../src/index"

function App() {
  return (
    <>
      <Counter num={10} />
      <MyButton />
    </>
  )
}

export default App
```

Then start the project with `yarn start` / `yarn dev` under `testing-web` folder.

:::note

If you can see the components works, means you are ready to go!

:::


### 6. Build packages
If you succes to run this commend, a `dist` folder will be generate.
```bash
yarn build-roll
# The comments is refer to `rollup -c` in `package.json`
```

### 7. Publish packages to NPM
```bash
npm publish
```

:::note

npm will require you to login for the first time.

:::

And done!
