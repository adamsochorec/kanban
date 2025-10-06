# Kanban

[![Node.JS CI/CD](https://github.com/adamsochorec/kanban/actions/workflows/main.yml/badge.svg)](https://github.com/adamsochorec/kanban/actions/workflows/main.yml)

## Who?

Developed by [Adam Sochorec](https://www.linkedin.com/in/adamsochorec) during studies at [EASV](https://www.easv.dk), as a project utilizing REST API classes and progressive web applications.

## Why?

This project was created to demonstrate REST API functionality and DevOps practices, ensuring a dynamic interaction between the user interface and the database. The goal was to implement automated testing and deployment alongside a structured frontend and backend architecture.

## When?

Developed in 2024 as a school project.

## What?

A simple Kanban board application that allows users to create, organize, and manage tasks dynamically. The project features:

- REST API for task management and users
- Automated testing with Mocha.js
- CI/CD pipeline using GitHub Actions
- Auto-generated API documentation with Swagger Autogen

## How?

### Backend:

- Built with Node.js, Express.js, and MongoDB
- **Automated Testing:** Mocha.js tests are run on every push or pull request
- **Continuous Deployment:** If tests pass, GitHub Actions triggers a deployment to Render
- API Documentation: Automatically re-generated on every run

### Frontend:

- Developed in Vue.js, built with Vite, and styled using the [PrimeVue](https://www.primevue.org) component library

## Documentation

To check out docs, visit [kanban-chi-silk.vercel.app/api/docs](https://kanban-chi-silk.vercel.app/docs/).

## Frontend Setup

```sh
cd frontend
npm install # Install Node
npm run dev # Compile and Hot-Reload for Development
npm run build # Type-Check, Compile and Minify for Production
```

## Backend Setup

```sh
cd backend
npm install # Install Node
npm run start-dev # Compile and Hot-Reload for Development and generate API docs
```

## API testing

```sh
cd backend
npm test # trigger Mocha tests
```
