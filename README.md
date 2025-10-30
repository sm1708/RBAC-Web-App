# Role-Based Access Control (RBAC) Angular Application

A production-ready **Angular Standalone Components RBAC Application** demonstrating role-based and permission-based access control, secure routing and UI authorization patterns.

This README is formatted for IDEs like **IntelliJ / WebStorm / VS Code**.

---

## 📑 Table of Contents

* Overview
* Features
* Tech Stack
* Architecture
* Installation
* Available Roles & Credentials
* Folder Structure
* RBAC Logic
* Extending the Project
* License

---

## 📌 Overview

This project implements a clean and scalable **Role-Based Access Control (RBAC)** system in Angular, including:

* Secure route guarding based on roles
* Permission-based access for UI elements
* Auth token handling (mock JWT)
* Angular standalone components

Ideal as a starter template for enterprise web apps.

---

## ✅ Features

* Standalone Angular Components
* JWT-style Authentication (Mock)
* Role-based Route Guard
* Permission Directive (`hasPermission`)
* Centralized Auth Service
* Dashboard & Admin modules
* Minimal clean UI (HTML/CSS)

---

## 🧰 Tech Stack

| Component | Technology           |
| --------- | -------------------- |
| Framework | Angular (Standalone) |
| Auth      | Mock JWT Storage     |
| Styles    | CSS                  |
| Tooling   | Node, TypeScript     |

---

## 🏗️ Architecture

* **Auth Guard** for route protection
* **Directive** for permission checks
* **Token Storage Service** for session persistence
* **Modular** & scalable folder structure

---

## 🚀 Installation

```bash
git clone <repo-url>
cd angular-rbac-starter
npm install
ng serve
```

App runs at: `http://localhost:4200/`

---

## 🔐 Credentials

| Role  | Username | Password |
| ----- | -------- | -------- |
| Admin | admin    | admin123 |
| User  | user     | user123  |

---

## 📂 Folder Structure

```
src/app/
 ├── auth/
 │   ├── login/
 │   ├── auth.service.ts
 │   ├── auth.guard.ts
 │   └── token.storage.ts
 ├── core/
 │   └── permission.directive.ts
 ├── pages/
 │   ├── dashboard/
 │   └── admin/
 └── app.routes.ts
```

---

## 🔑 RBAC Logic

### Roles

* **Admin** → Full Access
* **User** → Dashboard only

### Permissions

```
admin.view
admin.edit
dash.view
```

Used via the `hasPermission` directive.

---

## 🔧 Extend This Template

| Feature            | Status       |
| ------------------ | ------------ |
| API Integration    | Ready to add |
| Angular Material   | Optional     |
| Refresh Token Flow | Add easily   |
| User/Role CRUD     | Add module   |
| Unit Tests         | Extendable   |

---

## 📄 License

MIT — free to use and customize.

---

### 🤝 Contributions

PRs and suggestions are welcom
