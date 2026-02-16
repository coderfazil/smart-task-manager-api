# Smart Task Manager API

Production-grade backend for an AI-assisted task management SaaS platform.

---

## Live API

`<ADD_RENDER_URL_HERE>`

---

## Features

* JWT Authentication (httpOnly cookies)
* User-isolated task data
* Full CRUD task system
* AI task analysis engine
* Structured architecture
* Secure production configuration

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Auth
* AI API Integration

---

## Architecture Principles

* Controller / Service / Route separation
* Centralized error handling
* Environment-based configuration
* Secure cookie authentication
* Derived AI data model

---

## API Routes

### Auth

POST `/auth/register`
POST `/auth/login`
POST `/auth/logout`

### Tasks

GET `/get-tasks`
POST `/create-tasks`
PUT `/update-tasks/:id`
DELETE `/delete-tasks/:id`

---

## Environment Variables

Required variables:

```
NODE_ENV=
PORT =
DB_URL =
JWT_SECRET_KEY =
JWT_EXPIRES =
CLIENT_URL=
OPEN_ROUTER_API_KEY =
OPEN_ROUTER_MODEL =
```

---

## Run Locally

```
npm install
npm run dev
```

---

## Production Start

```
npm start
```

---

## Author

Mohammad Fazil

---

## Status

Actively maintained and production deployed.
