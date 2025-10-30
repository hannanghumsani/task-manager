# 🎫 TicketCRM: Modern Support Ticket Management System

**TicketCRM** is a single-page application (SPA) designed to manage customer support tickets efficiently. It simulates a simple CRM dashboard, allowing users to create, view, filter, sort, and update ticket statuses and priorities. All data persistence is handled locally using the browser's `localStorage` API, acting as a mock backend for a seamless and responsive user experience.

---

## ✨ Features

- **CRUD Operations:** Create new tickets with customer details, title, and description.
- **Local Persistence:** All tickets are stored using the browser's **`localStorage`**.
- **Comprehensive Dashboard:** View all tickets in a sortable, filterable list or card view.
- **Filtering & Sorting:** Filter by **Status** (`Open`, `In Progress`, `Resolved`) and sort by **Creation Date** or **Priority** (`High`, `Medium`, `Low`).
- **Debounced Search:** Efficiently search tickets by customer name or title with a performance-optimized debounced input.
- **Detailed View:** Edit ticket status and priority, and add internal comments to the thread.
- **Responsive UI:** Fully responsive design built with **Tailwind CSS**.
- **Dark Mode:** Aesthetic toggle for a dark theme (persisted via context).

---

## 🛠️ Technology Stack

| Category       | Technology             | Purpose                                                            |
| :------------- | :--------------------- | :----------------------------------------------------------------- |
| **Frontend**   | **React** (with Hooks) | Core UI Library for building the application.                      |
| **Language**   | **TypeScript**         | Static typing for improved development stability and safety.       |
| **Styling**    | **Tailwind CSS**       | Utility-first CSS framework for rapid and responsive styling.      |
| **State**      | **React Context API**  | Global state management for tickets and theme.                     |
| **Routing**    | **React Router DOM**   | Handles application navigation and deep linking to ticket details. |
| **Data/Forms** | **Formik & Yup**       | Form management and schema-based validation.                       |
| **Mocks**      | **`localStorage`**     | Data persistence (simulated backend).                              |
| **Bundler**    | **Vite**               | Fast development server and build tool.                            |

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have **Node.js** (version 16+) and **npm** (or yarn/pnpm) installed on your system.

### 1. Installation

Clone the repository and install the dependencies:

```bash
# 1. Clone the repository (if applicable)
# git clone <your-repo-link>
# cd ticket-crm

# 2. Install dependencies
npm install
```
