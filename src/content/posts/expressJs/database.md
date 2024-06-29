---
title: "[Express.js] 5 - Databases in express.js"
published: 2024-04-13
description: 'Guild For connecting databases in express.js for postgresql'
tags: [Express.js, Typescript]
category: Express.js
draft: false
---

# [Adv] Database connect

The following guide will using `postgresql` for connections with `yarn`.

## 1. Install `postgresql`

Download from:
https://www.postgresql.org/download/


## 2. Install `pg` in nodejs
Install the packages `pg` for connect the databases.
https://www.npmjs.com/package/pg

```bash
npm install pg
```

## 3. Config the `pg` client

Assume you have a DB in your postgresql named `my-test-db` with a user name `postgresql` and password `123`.

Inside `server.ts`
```ts title="server.ts"
import { Client } from 'pg'
import express, { Request, Response } from "express";

const app = express();

// highlight-start
const client = new Client({
  host: 'localhost', // Local DB
  port: 5432, // Default postgresql port

  database: 'my-test-db',
  user: 'postgresql',
  password: '123',
})

( async () => {
   await client.connect();
})()
// highlight-end

// http://localhost:8080/
app.get("/", function async (req: Request, res: Response) {
    const result = await client.query('SELECT * FROM users')

    res.json({ status: true, data: result.rows });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
```

## 4. Adding `dotenv` 
To prevent databases secret in codebases, adding `dotenv` to import data like `username`, `password`.

```bash
yarn add dotenv
```

Back to `server.ts`, import the following code.

```ts title="server.ts"
import { Client } from 'pg'
import express, { Request, Response } from "express";

// highlight-start
import dotenv from 'dotenv';
dotenv.config();
// highlight-end

const app = express();

const client = new Client({
  host: 'localhost', // Local DB
  port: 5432, // Default postgresql port

  // Change the following stuff to `process.env.xxxx`
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

( async () => {
   await client.connect();
})()


// http://localhost:8080/
app.get("/", function async (req: Request, res: Response) {
    const result = await client.query('SELECT * FROM users')

    res.json({ status: true, data: result.rows });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
```

Then, create a file named `.env` at the root of your project.

Inside `.env`
```md title=".env"
DB_NAME=my-test-db
DB_USER=postgresql
DB_PASSWORD=123
```

Done, you can try to start the code to test whether you can connect to the database.
