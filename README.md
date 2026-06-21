<p align="center">
  <img src="public/banner.svg" alt="Connectly Banner" width="100%">
</p>

## Overview

Connectly is a lightweight, server-side rendered messaging application built as a learning project to master backend API routing, database schema design, and document validations. Structuring the project around the Model-View-Controller (MVC) conceptual pattern, the server facilitates robust, stateful CRUD (Create, Read, Update, and Delete) operations on chat documents.

<div style="background: rgba(190, 155, 123, 0.08); border-left: 5px solid #be9b7b; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 0.95rem; line-height: 1.6;">
  <strong>Note:</strong> This repository serves as a code design template for configuring Express servers, writing modular schemas with Mongoose, configuring overrides for HTTP PUT/DELETE verbs from HTML form templates, and managing environment configurations securely.
</div>

---

## Tech Stack

The application relies on a solid, industry-standard stack for full-stack Node.js development:

<table style="width: 100%; border-collapse: collapse; border: 1px solid rgba(190, 155, 123, 0.35); margin: 20px 0; font-size: 0.95rem;">
  <thead>
    <tr style="background-color: rgba(133, 68, 66, 0.15); border-bottom: 2px solid #854442;">
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Component</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Technology</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Runtime Environment</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Node.js</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Asynchronous event-driven JavaScript runtime.</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Web Server Framework</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Express.js</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Core routing engine handling middleware pipeline and HTTP endpoints.</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Database Engine</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">MongoDB</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Document-based database for scalable JSON-like records.</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Object Data Mapper</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Mongoose</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Strict schema validation, query generation, and document lifecycle control.</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">View Template Engine</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">EJS</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Embeds server-side logic directly into HTML pages.</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Configuration Handler</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">dotenv</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Reads environment variables from untracked config files.</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold;">Method Override</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">method-override</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Intercepts POST requests to route them as PUT and DELETE operations.</td>
    </tr>
  </tbody>
</table>

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

<table style="width: 100%; border-collapse: collapse; border: 1px solid rgba(190, 155, 123, 0.35); margin: 20px 0; font-size: 0.95rem;">
  <thead>
    <tr style="background-color: rgba(133, 68, 66, 0.15); border-bottom: 2px solid #854442;">
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">HTTP Method</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">URI Endpoint</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Action Description</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Database Operation</th>
      <th style="padding: 12px; text-align: left; border: 1px solid rgba(190, 155, 123, 0.35);">Response Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #be9b7b;">GET</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Root verification check</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-style: italic; opacity: 0.75;">No operation</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.send("root is working")</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #be9b7b;">GET</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Fetch and view all messages</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">Chat.find()</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.render("index.ejs")</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #be9b7b;">GET</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats/new</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Display new chat entry page</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-style: italic; opacity: 0.75;">No operation</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.render("new.ejs")</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #854442;">POST</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Write a new message</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">new Chat().save()</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.redirect("/chats")</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #be9b7b;">GET</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats/:id/edit</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Display update form for a chat</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">Chat.findById(id)</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.render("edit.ejs")</td>
    </tr>
    <tr style="background-color: rgba(190, 155, 123, 0.03);">
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #854442;">PUT</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats/:id</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Update chat message content</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">Chat.findByIdAndUpdate(id)</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.redirect("/chats")</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-weight: bold; color: #854442;">DELETE</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">/chats/:id</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25);">Remove a chat document</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">Chat.findByIdAndDelete(id)</td>
      <td style="padding: 12px; border: 1px solid rgba(190, 155, 123, 0.25); font-family: monospace;">res.redirect("/chats")</td>
    </tr>
  </tbody>
</table>
```

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

### Prerequisites
Make sure you have MongoDB Community Server and Node.js installed locally.

### Step 1: Install Dependencies
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
```bash
node init.js
```

### Step 4: Launch Server
```bash
npm start
```
The server will bind to the configured port and listen at `http://localhost:8080`.

---

## Technical Highlights

<div style="background: rgba(190, 155, 123, 0.08); border-left: 5px solid #be9b7b; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 0.95rem; line-height: 1.6;">
  <strong>Method Overriding:</strong> Since default HTML forms only support GET and POST methods, method-override intercepts the submission from the edit views and transforms standard POST operations into PUT and DELETE calls via the <code>?_method=PUT</code> query parameter.
</div>

<div style="background: rgba(133, 68, 66, 0.08); border-left: 5px solid #854442; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 0.95rem; line-height: 1.6;">
  <strong>Command Buffering:</strong> Mongoose has command buffering active by default. If your Express routes are queried before a database connection successfully establishes, Mongoose buffers queries in memory. This can cause routes like <code>/chats</code> to temporarily hang if the local MongoDB service is inactive.
</div>

---

<div align="center">
<div style="background-color: #3c2f2f; border: 2px solid #be9b7b; border-radius: 16px; padding: 30px; max-width: 650px; margin: 30px auto 20px auto; color: #fff4e6; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; box-shadow: 0 8px 24px rgba(0,0,0,0.35);">
<h3 style="margin-top: 0; color: #be9b7b; font-size: 1.35rem; font-weight: 700; letter-spacing: 0.5px; font-family: 'Segoe UI', sans-serif;">Thank you for exploring this project.</h3>
<p style="margin: 8px 0; font-size: 0.95rem; opacity: 0.9; font-family: 'Segoe UI', sans-serif;">If you found value in it, consider starring the repository.</p>
<hr style="border: none; height: 1px; background: rgba(190, 155, 123, 0.25); margin: 20px auto; width: 50%;" />
<p style="margin: 12px 0 4px 0; font-size: 0.9rem; font-family: 'Segoe UI', sans-serif;">Developed by <strong>Ivy Singh</strong></p>
<p style="margin: 4px 0 12px 0; font-size: 0.85rem; opacity: 0.8; font-family: 'Segoe UI', sans-serif;">full-stack software engineering reference</p>
<p style="margin: 12px 0; font-family: 'Segoe UI', sans-serif;"><code style="background-color: rgba(190, 155, 123, 0.1); color: #be9b7b; border: 1px solid rgba(190, 155, 123, 0.25); padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 0.9rem;">ivysingh99@gmail.com</code></p>
<div style="margin-top: 22px;">
<a href="https://github.com/IvySingh-1" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: #854442; border: 1px solid #be9b7b; margin: 0 5px; vertical-align: middle;">
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff4e6"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
</a>
<a href="https://www.linkedin.com/in/ivysingh99/" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: #854442; border: 1px solid #be9b7b; margin: 0 5px; vertical-align: middle;">
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff4e6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
</a>
<a href="https://x.com/ivysingh99" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: #854442; border: 1px solid #be9b7b; margin: 0 5px; vertical-align: middle;">
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff4e6"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
</a>
</div>
</div>
</div>
