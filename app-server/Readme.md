# Mongo-Express Boilerplate

> Creating a new ExpressJS project is cumbersome, so I created a boilerplate, because why not!

## Features

- Express
  - Scalable project structure
  - Server
  - Router
  - Midlewares
  - TS Only
  - Color coded console logs
  - Nodemon watcher

- MongoDB
  - Mongoose API
  - Schemas
  - Models

- Jest
  - TS configured
  - Sample test case  

- [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (VSCode extension)
- Heroku [Procfile](Procfile). **Note:** Procfile is configured to use dist/index.js as the entrypoint

---

> Initialize/configure [environment variables](.env), add env variables to the [namespace](environment.d.ts)

### Install packages

```bash
npm i
```

---

### Starting the server

1. With nodemon

```bash
npm run server:nodemon
```

2. Without nodemon

```bash
npm run server
```

---

### Build .ts files to the /dist folder

```bash
npm run build
```

---

### Jest test runner

```bash
npm run test
```
