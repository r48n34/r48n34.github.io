---
title: "[Express.js] 1 - Simple express.js starter"
published: 2024-04-09
description: 'This tutorial will guild to create a simple express.js web server from scratch with typescript'
tags: [Express.js, Typescript]
category: Express.js
draft: false
---

# [Basic] Basic 

## Basic start-up
This tutorial will guild to create a simple `express.js` web server from scratch with `typescript`.

### 1. Install packages
To init a new `package.json`, we have to `init` with the following command.

Inside `Terminal`
```bash title="Terminal"
npm init -y
```

After it, install the necessary packages `express`.  
```bash title="Terminal"
npm install express
```

For typescript, we have to add the `devDependencies` for `typescript` to compile the type annotation.
```bash title="Terminal"
npm install -D ts-node typescript @types/node @types/express
```

### 2. Add `tsconfig.json`

Create a `tsconfig.json` and copy the folowing stuff to your root folder.

Inside `tsconfig.json`
```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es6",
    "outDir": "dist",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "test", "dist"]
}
```

### 3. Add `server.ts`

Create a folder named `server.ts` at the root, then copy the following stuff in the file.

Inside `server.ts`
```ts title="server.ts"
import express, { Request, Response } from "express";

const app = express();

// http://localhost:8080/
app.get("/", function (req: Request, res: Response) {
    res.end("Hello mom!");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
```

### 4. Start up

After created the `server.ts`, type the following command in the terminal.  
```bash title="Terminal"
ts-node server.ts
```

### 5. Set up `package.json`

Actually, you can script the following command in your `package.json` for start up next time.
```json title="package.json"
{
  "name": "my-website",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "ts-node server.ts" // Add this line in your "scripts"
  }.
  // ... Remaining stuff
```

After saving, you may type `npm start` for start up the server.
```bash title="package.json"
npm start
```


### 6. Folder Structure
At the final, your project should have the following structure.
```md
.
├── 📂 node_modules
├── server.ts
├── package.json
└── tsconfig.json
```