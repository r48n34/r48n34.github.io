---
title: "[Express.js] 3 - Router in express.js"
published: 2024-04-11
description: 'Guild for a simple router concepts in express.js'
tags: [Express.js, Typescript]
category: Express.js
draft: false
---

# [Basic] Router

The Router functions may help developers to split up different routing point, which brings the following advantages.
1. 📑 Better API management
2. 📦 Clear coding structure
3. 📝 Easy to testing

## Folder Structure
Let's assume you have a folder like this
```md
.
├── package.json
├── tsconfig.json
├── appleRouter.ts
├── orangeRouter.ts
└── server.ts
```

## Router Usage

### 1. Create Router.ts

Let's create a `appleRouter.ts` and type the following stuff.

Inside `appleRouter.ts`
```ts showLineNumbers title="appleRouter.ts"
import express from "express";
import { Request, Response } from "express";

// highlight-start
export const appleRouter = express.Router();
// highlight-end

// http://localhost:8080/apple/hi
appleRouter.get('/hi', async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({ status: true, data: "Hi this is apple" })
  }
  catch(err:any){
    return res.status(200).json({ status: false })
  }      
});
```

Also, create a `orangeRouter.ts` and type the following stuff.

Inside `orangeRouter.ts`
```ts showLineNumbers title="orangeRouter.ts"
import express from "express";
import { Request, Response } from "express";

// highlight-start
export const orangeRouter = express.Router();
// highlight-end

// http://localhost:8080/orange/yo
orangeRouter.get('/yo', async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({ status: true, data: "Yo this is orange" })
  }
  catch(err:any){
    return res.status(200).json({ status: false })
  }      
});
```

### 2. Add `app.use()`

Back to `server.ts`, import the folloing `router` and use `app.use` to import the api.

Inside `server.ts`
```ts showLineNumbers title="server.ts"
import express from "express";
import { Request, Response } from "express";

// highlight-start
import { appleRouter } from "appleRouter"
import { orangeRouter } from "orangeRouter"
// highlight-end

const app = express();

app.get("/api", function (req: Request, res: Response) {
    res.end("Hello mom!");
});

// highlight-start
app.use("/apple", appleRouter);
app.use("/orange", orangeRouter);
// highlight-end

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
```

### 3. Testing

After all, you may test with your web.

Test with `http://localhost:8080/apple/hi`
```json title="http://localhost:8080/apple/hi"
{ 
  status: true,
  data: "Hi this is apple"
}
```

Test with `http://localhost:8080/orange/yo`
```json title="http://localhost:8080/orange/yo"
{ 
  status: true,
  data: "Yo this is orange"
}
```

