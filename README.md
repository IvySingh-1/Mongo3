<p align="center">
  <img src="public/banner.svg" alt="Connectly Banner" width="100%">
</p>

## Overview

Connectly is a lightweight, server-side rendered messaging application built as a learning project to master backend API routing, database schema design, and document validations. Structuring the project around the Model-View-Controller (MVC) conceptual pattern, the server facilitates robust, stateful CRUD (Create, Read, Update, and Delete) operations on chat documents.

> [!NOTE]
> This repository serves as a code design template for configuring Express servers, writing modular schemas with Mongoose, configuring overrides for HTTP PUT/DELETE verbs from HTML form templates, and managing environment configurations securely.

---

## Tech Stack

The application relies on a solid, industry-standard stack for full-stack Node.js development:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime Environment** | <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"> | Asynchronous event-driven JavaScript runtime. |
| **Web Server Framework** | <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"> | Core routing engine handling middleware pipeline and HTTP endpoints. |
| **Database Engine** | <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"> | Document-based database for scalable JSON-like records. |
| **Object Data Mapper** | <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white" alt="Mongoose"> | Strict schema validation, query generation, and document lifecycle control. |
| **View Template Engine** | <img src="https://img.shields.io/badge/EJS-B83B2C?style=flat-square" alt="EJS"> | Embeds server-side logic directly into HTML pages. |
| **Configuration Handler** | <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logoColor=black" alt="dotenv"> | Reads environment variables from untracked config files. |
| **Method Override** | <img src="https://img.shields.io/badge/method--override-854442?style=flat-square" alt="method-override"> | Intercepts POST requests to route them as PUT and DELETE operations. |

---

## Architectural Workflow

The diagram below illustrates the path of a client request entering the system, executing database tasks, and returning a generated view to the user:

```mermaid
graph TD
    Client([Client Browser])
    Router[Express Router]
    Controller[Route Handlers]
    Model[Mongoose Chat Model]
    MongoDB[(MongoDB Database)]
    EJS[EJS Views Engine]

    Client -->|HTTP Request| Router
    Router -->|GET /chats| Controller
    Router -->|POST /chats| Controller
    Router -->|PUT /chats/:id| Controller
    Router -->|DELETE /chats/:id| Controller

    Controller -->|Query / Mutation| Model
    Model -->|Read / Write Operations| MongoDB
    MongoDB -.->|Documents returned| Model
    Model -.->|Query Results| Controller

    Controller -->|Render Template| EJS
    Controller -->|Redirect /chats| Client
    EJS -.->|Generated HTML| Client

    classDef client fill:#fff4e6,stroke:#be9b7b,stroke-width:2px,color:#4b3832;
    classDef express fill:#be9b7b,stroke:#854442,stroke-width:2px,color:#fff4e6;
    classDef model fill:#854442,stroke:#4b3832,stroke-width:2px,color:#fff4e6;
    classDef db fill:#4b3832,stroke:#854442,stroke-width:2px,color:#fff4e6;

    class Client client;
    class Router,Controller,EJS express;
    class Model model;
    class MongoDB db;
```

---

## API Documentation

Connectly utilizes RESTful endpoints to manage the lifecycle of a chat document:

| HTTP Method | URI Endpoint | Action Description | Database Operation | Response Method |
| :--- | :--- | :--- | :--- | :--- |
| <img src="https://img.shields.io/badge/GET-be9b7b?style=flat-square" alt="GET"> | `/` | Root verification check | *No operation* | `res.send("root is working")` |
| <img src="https://img.shields.io/badge/GET-be9b7b?style=flat-square" alt="GET"> | `/chats` | Fetch and view all messages | `Chat.find()` | `res.render("index.ejs")` |
| <img src="https://img.shields.io/badge/GET-be9b7b?style=flat-square" alt="GET"> | `/chats/new` | Display new chat entry page | *No operation* | `res.render("new.ejs")` |
| <img src="https://img.shields.io/badge/POST-854442?style=flat-square" alt="POST"> | `/chats` | Write a new message | `new Chat().save()` | `res.redirect("/chats")` |
| <img src="https://img.shields.io/badge/GET-be9b7b?style=flat-square" alt="GET"> | `/chats/:id/edit` | Display update form for a chat | `Chat.findById(id)` | `res.render("edit.ejs")` |
| <img src="https://img.shields.io/badge/PUT-4b3832?style=flat-square" alt="PUT"> | `/chats/:id` | Update chat message content | `Chat.findByIdAndUpdate(id)` | `res.redirect("/chats")` |
| <img src="https://img.shields.io/badge/DELETE-3c2f2f?style=flat-square" alt="DELETE"> | `/chats/:id` | Remove a chat document | `Chat.findByIdAndDelete(id)` | `res.redirect("/chats")` |

---

## Schema Validation

Mongoose ensures that all incoming chat operations strictly adhere to validation rules before mutating database records:

```javascript
const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 500, // Enforces a 500-character upper bound limit
  },
  created_at: {
    type: Date,
    required: true,
  },
});
```

---

## Local Installation Guide

To run the application locally, follow these execution steps in your terminal:

### Prerequisites
Make sure you have MongoDB Community Server and Node.js installed locally.

### Step 1: Install Dependencies
Download required dependencies registered in the package.json file:
```bash
npm install
```

### Step 2: Establish Configurations
Create a local configuration file named `.env` in the root directory:
```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/connectly
```

### Step 3: Seed Database
Initialize sample chats inside the MongoDB database:
```bash
node init.js
```

### Step 4: Launch Server
Start the local server instance:
```bash
npm start
```
The server will bind to the configured port and listen at `http://localhost:8080`.

---

## Technical Highlights

> [!TIP]
> **Method Overriding:** Since default HTML forms only support GET and POST methods, method-override intercepts the submission from the edit views and transforms standard POST operations into PUT and DELETE calls via the `?_method=PUT` query parameter.

> [!WARNING]
> **Command Buffering:** Mongoose has command buffering active by default. If your Express routes are queried before a database connection successfully establishes, Mongoose buffers queries in memory. This can cause routes like `/chats` to temporarily hang if the local MongoDB service is inactive.

---

<!-- FOOTER (SVG) -->
<div align="center" style="margin-top: 40px;">
<img src="./assets/footer_top.svg" width="100%" alt="Thank you for exploring this project. Developed by Ivy Singh."><br><img src="./assets/footer_bottom_left.svg" width="40.4%"><a href="https://github.com/IvySingh-1" target="_blank"><img src="./assets/footer_github.svg" width="5%" alt="GitHub"></a><img src="./assets/footer_gap1.svg" width="2%"><a href="https://www.linkedin.com/in/ivysingh99/" target="_blank"><img src="./assets/footer_linkedin.svg" width="5%" alt="LinkedIn"></a><img src="./assets/footer_gap2.svg" width="2%"><a href="https://x.com/ivysingh99" target="_blank"><img src="./assets/footer_x.svg" width="5%" alt="X"></a><img src="./assets/footer_bottom_right.svg" width="40.4%">
</div>
