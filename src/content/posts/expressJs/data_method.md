---
title: "[Express.js] 2 - Data method in express.js"
published: 2024-04-10
description: Simple explains for `Params`, `Query` and `Body` in express.js
tags: [Express.js, Typescript]
category: Express.js
draft: false
---

# [Basic] Data method
The following guild will shows how to recived data from API with `Params`, `Query` and `Body`.

## Params

The params is a MUST type in data method in order to active the regarding API.  

### Single Params

For `[GET] http://localhost:8080/api/13`
```ts showLineNumbers title="[GET] http://localhost:8080/api/13"
// Single params
app.get("/api/:id", function (req: Request, res: Response) {
    const { id } = req.params; // 13
    res.json({ data: id });
});
```

### Multi params
For `[GET] http://localhost:8080/api/13/peter`
```ts showLineNumbers title="[GET] http://localhost:8080/api/13/peter"
// Single params
app.get("/api/:id/:name", function (req: Request, res: Response) {
    const { id, name } = req.params; // 13, peter
    res.json({ data: id, name: name });
});
```

## Query

The query is a OPTIONALS type in data method, means you can still access the regarding API without input any query.

### Single Query
For `[GET] http://localhost:8080/api?id=14`
```ts showLineNumber title="[GET] http://localhost:8080/api?id=14"
// Single query
app.get("/api", function (req: Request, res: Response) {
    const { id } = req.query; // 14
    res.json({ data: id });
});
```

### Multi Query
For `[GET] http://localhost:8080/api?id=14&name=tom`
```ts showLineNumbers title="[GET] http://localhost:8080/api?id=14&name=tom"
// Single query
app.get("/api", function (req: Request, res: Response) {
    const { id, name } = req.query; // 14, tom
    res.json({ data: id, name: name });
});
```

## Different between `params` and `Query`

As the top said, let's see the different of a `params` and `Query` API.

```ts showLineNumbers title="params"
app.get("/api/:id", function (req: Request, res: Response) {
    const { id } = req.params; // 13
    res.json({ data: id });
});
```

```md title="params responds"
- Normal ways ⭕
[GET] http://localhost:8080/api/13
Respond: { data: 13 }

- No params cases ⛔
[GET] http://localhost:8080/api
Respond: 404 Route not found
```

```ts showLineNumbers title="query"
app.get("/api", function (req: Request, res: Response) {
    const { id } = req.query;
    res.json({ data: id });
});
```

```md title="query responds"
// Normal ways ⭕
// [GET] http://localhost:8080/api?id=80
// Respond: { data: 80 }

// No query cases ⭕
// [GET] http://localhost:8080/api
// Respond: { data: null }
```

In `query`, the API still accessable without inputing ID. Means if you require your user to input stuff, we better suggest to use `params` compare to `query`.

:::tip

Yet, you can still set up constraints to require user input `query` in API logics or using other checking libraries / packages like `zod`, `yum`, `express-validator` or others.

:::

## Body

Body is a method to recive HTML data like `<forms>` or `body in fetch`.

### Json data
In default, we have to added `express.json()` and `express.urlencoded({ extended: true })` to let expressjs for parse body data.
```ts showLineNumber title="server.ts"
// Add these line to your server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

For `[POST] http://localhost:8080/api`
```ts showLineNumbers title="[POST] http://localhost:8080/api"
app.post('/api', function (req, res) {
    console.log(req.body);
    res.json({ 
        status: true,
        data: req.body.id,
        name: req.body.name
    });
});
```

```js showLineNumbers title="frontend.js"
const res = await fetch( "http://localhost:8080/api" ,{
    method:"POST",
    headers:{ 
        // Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        id: 10,
        name: "Peter"
    });
});

const result = await res.json();
console.log(result);
/*
    status: true,
    data: 10,
    name: "Peter"
*/
```

### multipart/form-data

With `formidable`  
https://www.npmjs.com/package/formidable#readme  

Inside `formidable.ts`
```ts showLineNumbers title="formidable.ts"
import path from "path"
import fs from "fs"
import formidable, { Fields, Files } from "formidable";
import IncomingForm from "formidable/Formidable";
import { Request } from "express"

// Create a folder if not exist
const uploadDir = "uploads"
const finalDir = path.join(__dirname, "..", uploadDir)
if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir)
}

export const form = formidable({ 
    multiples: true,
    uploadDir: finalDir,
    keepExtensions: true,
    maxFileSize: 1024 * 1024 * 20, // (20mb)
    maxFiles: 1,
    filter: part => part.mimetype?.startsWith('image/') || false,
    filename: (originalName, originalExt, part, form) => {
        const ext = part.mimetype?.split("/").pop();
        return `${part.name}-${Date.now()}.${ext}`;
    },
});

export function formParse(form: IncomingForm, req: Request) {
    return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } 
        resolve({ fields, files });
      });
    });
}
```

Inside `server.ts`
```ts showLineNumbers title="server.ts"
import { formParse } from "formidable"

// [POST] http://localhost:8080/data
app.post('/data', async (req: express.Request, res: express.Response) => {
  try{
    const data = await formParse(form, req);
    
    return res.status(200).json({ 
        status: true,
        bodyData:  data.fields, // data.fields : The original form data (No Files)
        filesData: data.files   // data.files : The media file data from form (Files)
    })
  }
  catch(err:any){
    return res.status(200).json({ status: false })
  }  
});
```
