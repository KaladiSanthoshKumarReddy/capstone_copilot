# Capstone Item Manager

A full-stack CRUD application for managing items with user authentication, tag-based filtering, and a modern dashboard UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [API Routes](#api-routes)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [SDLC Pipeline](#sdlc-pipeline)
- [Testing](#testing)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)

---

## Overview

**Capstone Item Manager** is a capstone reference application demonstrating a complete full-stack implementation with:

- **User Authentication**: JWT-based authentication for secure access
- **Item Management**: Create, read, update, delete, and search items
- **Tag-Based Filtering**: Organize items with free-text tags and filter by tags
- **Dashboard**: Responsive UI for viewing and managing items
- **Pagination**: Efficient handling of large item lists
- **Status Filtering**: Filter items by status (active/completed)
- **Full-Text Search**: Search items by title and description

**Current Feature**: Add item tagging and tag-based filtering to enable users to organize and quickly find related items.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** | Lightweight state management |
| **Axios** | HTTP client for API calls |
| **Vitest** | Unit testing framework |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express** | Web application framework |
| **TypeScript** | Type-safe JavaScript |
| **SQLite** | File-based SQL database |
| **JWT** | Authentication tokens |
| **Zod** | Schema validation |

### Testing & QA

| Technology | Purpose |
|---|---|
| **Playwright** | End-to-end browser automation testing |
| **Cucumber** | Behavior-driven development (Gherkin) |
| **Vitest** | Unit test runner |

---

## Project Structure

```
capstone-copilot-clean/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── api/                # API client and HTTP utilities
│   │   │   ├── client.ts       # Axios instance with JWT interceptor
│   │   │   ├── items.ts        # Item API calls
│   │   │   └── __tests__/      # API unit tests
│   │   ├── components/         # Reusable React components
│   │   │   ├── ItemCard.tsx
│   │   │   ├── ItemForm.tsx
│   │   │   ├── ItemList.tsx
│   │   │   ├── ItemTable.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── StatusFilter.tsx
│   │   │   ├── TagFilter.tsx    # NEW: Tag filtering component
│   │   │   └── __tests__/      # Component unit tests
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── NotFound.tsx
│   │   ├── store/              # Zustand state management
│   │   │   ├── authStore.ts
│   │   │   └── __tests__/
│   │   ├── types/              # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                     # Express + TypeScript backend
│   ├── src/
│   │   ├── db/
│   │   │   └── init.ts         # Database initialization & migrations
│   │   ├── middleware/
│   │   │   └── auth.ts         # JWT authentication middleware
│   │   ├── routes/             # API endpoints
│   │   │   ├── auth.ts         # Authentication routes (login, register)
│   │   │   ├── items.ts        # Item CRUD routes
│   │   │   └── debug.ts        # Debug utilities
│   │   └── index.ts            # Express app entry point
│   ├── tsconfig.json
│   └── package.json
│
├── tests/                       # End-to-end & integration tests
│   ├── e2e/
│   │   ├── specs/              # Playwright test specs
│   │   │   ├── login.spec.ts
│   │   │   ├── register.spec.ts
│   │   │   ├── dashboard.spec.ts
│   │   │   └── items.spec.ts
│   │   ├── pages/              # Page Object Models
│   │   │   ├── LoginPage.ts
│   │   │   ├── RegisterPage.ts
│   │   │   └── DashboardPage.ts
│   │   └── helpers/            # Test utilities
│   │       └── auth.ts
│   ├── features/               # Cucumber feature files (Gherkin)
│   │   ├── login.feature
│   │   └── items.feature
│   ├── playwright.config.ts
│   └── package.json
│
├── docs/                        # Documentation
│   └── AI_SDLC_OVERVIEW.md     # SDLC pipeline documentation
│
├── scripts/                     # Build & deployment scripts
│   ├── build_arch_doc.py
│   ├── build_hld_doc.py
│   ├── init-git.sh
│   ├── push_confluence.py
│   └── update_confluence_pages.py
│
├── .github/                     # GitHub configuration & CI/CD
│   ├── agents/                 # AI-SDLC agents
│   ├── instructions/           # Stage-specific instructions
│   └── skills/                 # Reusable skill definitions
│
├── requirements.md             # Functional & acceptance requirements
├── architecture.md             # Architecture design & decisions
├── design-review.md            # Design review findings
├── impl-plan.md                # Implementation task breakdown
├── verification-report.md      # Test results & verification evidence
├── sdlc-report.html            # Pipeline execution report
├── CHANGELOG.md                # Version history
├── user-story.md               # Feature user story template
├── AGENTS.md                   # AI-SDLC agents reference
├── package.json                # Root package.json with scripts
└── README.md                   # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **SQLite3** (usually included with Node)
- **.env file** at root level with required environment variables

### Environment Setup

Create a `.env` file at the project root:

```env
# Database
DATABASE_PATH=./backend/data/capstone.db

# Backend Server
BACKEND_PORT=5000
BACKEND_URL=http://localhost:5000

# Frontend
VITE_API_URL=http://localhost:5000/api

# JWT Secret
JWT_SECRET=your-secret-key-change-in-production

# Frontend URL (for CORS, if needed)
FRONTEND_URL=http://localhost:5173

# Optional: Jira/Confluence integration
JIRA_URL=https://your-jira.atlassian.net
CONFLUENCE_URL=https://your-confluence.atlassian.net
```

### Installation

```bash
# Install dependencies for all workspaces
npm run install:all

# Or manually:
cd frontend && npm install
cd ../backend && npm install
cd ../tests && npm install
```

### Initialize Database

The database is automatically initialized on backend startup. If you need to reset:

```bash
cd backend
rm -f data/capstone.db
npm run dev
```

---

## Available Scripts

### Root Level Commands

```bash
# Install all dependencies
npm run install:all

# Start development servers (frontend + backend concurrently)
npm run dev

# Build all packages
npm run build

# Run all tests (unit + E2E)
npm run test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e

# View Playwright test report
npm run test:report

# Run full SDLC pipeline (build + test)
npm run sdlc
```

### Frontend Commands

```bash
cd frontend

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build

# Run unit tests with Vitest
npm run test

# Run tests in watch mode
npm run test:watch
```

### Backend Commands

```bash
cd backend

# Start dev server (port 5000)
npm run dev

# Build TypeScript
npm run build

# Run in production mode
npm run start
```

### Test Commands

```bash
cd tests

# Run all Playwright tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test login.spec.ts

# Generate HTML report
npx playwright show-report
```

---

## Architecture

### Overall Flow

```
User Browser
    ↓
[React Frontend] (Vite Dev Server on :5173)
    ↓
[API Client with JWT Interceptor]
    ↓
[Express Backend] (port 5000)
    ↓
[Auth Middleware → Route Handlers]
    ↓
[SQLite Database]
```

### Authentication Flow

1. User registers or logs in via `/auth/register` or `/auth/login`
2. Backend validates credentials and returns JWT token
3. Frontend stores JWT in browser state (Zustand)
4. Axios interceptor automatically adds `Authorization: Bearer <token>` to all requests
5. Backend middleware verifies token before processing protected routes

### State Management (Frontend)

- **Zustand stores** in `frontend/src/store/` manage global state
- `authStore.ts`: Current user, authentication status, JWT token
- Stores are persisted and auto-hydrate on app reload

---

## API Routes

### Authentication Routes (`/api/auth`)

| Method | Path | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ No |
| POST | `/api/auth/login` | Login user | ❌ No |

**Register Request:**
```json
{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Register Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Item Routes (`/api/items`)

| Method | Path | Description | Auth | Query Params |
|---|---|---|---|---|
| GET | `/api/items` | List items | ✅ Yes | `search`, `status`, `tag`, `page`, `limit` |
| POST | `/api/items` | Create item | ✅ Yes | - |
| PATCH | `/api/items/:id` | Update item | ✅ Yes | - |
| DELETE | `/api/items/:id` | Delete item | ✅ Yes | - |

**Create Item Request:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "active",
  "tags": "shopping, food"
}
```

**Query Parameters:**
- `search`: Search in title/description (case-insensitive)
- `status`: Filter by status (`active`, `completed`)
- `tag`: Filter by tag (exact match, case-insensitive)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example:**
```
GET /api/items?search=buy&status=active&tag=shopping&page=1&limit=10
```

---

## Frontend Components

### Page Components

- **Dashboard.tsx**: Main page with item list, filters, search, and pagination
- **Login.tsx**: User login form
- **Register.tsx**: User registration form
- **NotFound.tsx**: 404 error page

### Reusable Components

- **ItemCard.tsx**: Card view of a single item with tags
- **ItemForm.tsx**: Form for creating/editing items with tag input
- **ItemList.tsx**: List view of items
- **ItemTable.tsx**: Table view of items (optional)
- **Navbar.tsx**: Navigation bar with user profile and logout
- **Pagination.tsx**: Page navigation controls
- **SearchBar.tsx**: Full-text search input
- **StatusFilter.tsx**: Filter by item status
- **TagFilter.tsx**: Filter by tags (NEW)

### API Utilities

**client.ts**: Axios instance with automatic JWT handling
```typescript
// Every request automatically includes JWT token
const response = await apiClient.get('/items');
```

**items.ts**: High-level item API functions
```typescript
fetchItems(params: FetchParams): Promise<PaginatedItems>
createItem(item: ItemInput): Promise<Item>
updateItem(id: number, item: ItemInput): Promise<Item>
deleteItem(id: number): Promise<void>
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Items Table
```sql
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  tags TEXT,                        -- NEW: comma-separated tag list
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
```

**Tags Format:**
- Stored as comma-separated string: `"shopping, food, urgent"`
- Normalized at save time: trimmed, deduplicated, max 10 tags
- Each tag limited to 30 characters
- Null if no tags provided

---

## SDLC Pipeline

This project uses an **Agentic SDLC framework** that automates feature development through 8 gated stages:

### 8-Stage Pipeline

1. **Requirements Analysis** — Convert user stories to detailed requirements
2. **Architecture Design** — Design components, schema changes, and ADRs
3. **Design Review** — Gate: APPROVE or REJECT
4. **Implementation Planning** — Break architecture into 15+ ordered tasks
5. **Implementation** — Write code following the plan
6. **Code Review** — Security, quality, OWASP compliance checks
7. **Verification & Testing** — Write and run E2E tests
8. **PR & Report** — Generate CHANGELOG and open pull request

### Quick Start SDLC

```bash
# Check current pipeline status
@sdlc

# Resume from last completed stage
@sdlc resume

# Start from a specific stage
@sdlc from=stage-1

# View gate status
@sdlc status
```

For detailed SDLC documentation, see [docs/AI_SDLC_OVERVIEW.md](docs/AI_SDLC_OVERVIEW.md).

---

## Testing

### Unit Tests (Frontend)

```bash
cd frontend

# Run Vitest
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

Test files: `**/__tests__/*.test.ts`

### E2E Tests (Playwright)

```bash
cd tests

# Run all tests
npx playwright test

# Headed mode (see browser)
npx playwright test --headed

# Run specific test
npx playwright test login.spec.ts

# Debug mode
npx playwright test --debug

# View report
npx playwright show-report
```

Test specs: `e2e/specs/*.spec.ts`

### Feature Tests (Cucumber/Gherkin)

Feature files: `features/*.feature`

Example:
```gherkin
Feature: Item Management
  As a user
  I want to manage my items
  So that I can stay organized

  Scenario: Create item with tags
    Given I am logged in
    When I create an item with tags "shopping, food"
    Then the item should display both tags
```

### Running All Tests

```bash
npm run test          # Unit + E2E
npm run test:unit     # Vitest only
npm run test:e2e      # Playwright only
npm run test:report   # Show Playwright report
```

---

## Development Guidelines

### Code Style & Conventions

#### Backend Response Format

All API responses follow this pattern:

```typescript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "Error message" }
```

#### Frontend State (Zustand)

```typescript
// Store location: frontend/src/store/<feature>.ts

const useItemStore = create((set) => ({
  items: [],
  fetchItems: async () => {
    const data = await fetchItems();
    set({ items: data });
  },
}));
```

#### Type Safety

- Always use TypeScript interfaces (no `any`)
- Define types in `frontend/src/types/index.ts`
- Use Zod schemas in backend for validation

```typescript
// Backend: backend/src/routes/items.ts
const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tags: z.string().optional(),
});
```

### Security Practices

✅ **DO:**
- Use JWT tokens for authentication
- Validate all input with Zod schemas
- Hash passwords with bcrypt
- Scope queries by `user_id` (item ownership)
- Use parameterized SQL queries

❌ **DON'T:**
- Hardcode secrets in code (use `.env`)
- Trust client-side input without server validation
- Return sensitive data in API responses
- Expose database errors to clients

### Naming Conventions

- **Components**: PascalCase (`ItemCard.tsx`)
- **Utilities/Stores**: camelCase (`itemStore.ts`)
- **Database tables**: lowercase with underscores (`items`, `users`)
- **API routes**: `/api/resource` (plural)
- **TypeScript types**: PascalCase (`Item`, `User`)

---

## Contributing

### Workflow

1. Create a feature branch: `git checkout -b feature/item-tags`
2. Make changes following code guidelines
3. Run tests: `npm run test`
4. Commit with clear messages: `git commit -m "Add tag filtering to items"`
5. Push and open a pull request

### Running SDLC for New Features

```bash
# 1. Write feature in user-story.md
# 2. Start SDLC pipeline
@sdlc

# 3. Follow prompts through all 8 stages
# 4. Approve at each gate
# 5. Pipeline opens PR automatically
```

### Before Submitting PR

```bash
# Run all tests
npm run test

# Build both frontend and backend
npm run build

# Check code style
cd frontend && npm run lint
cd ../backend && npm run lint
```

---

## Performance Considerations

- **Pagination**: Items are paginated (default 10 per page) to reduce payload
- **Search**: Full-text search is case-insensitive
- **Tags**: Normalized and deduplicated to reduce storage
- **Caching**: Frontend Zustand stores cache items in memory
- **Database indexes**: Add indexes on `user_id`, `status`, `tags` for query performance

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 or 5173
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Lock Issues

```bash
# SQLite may lock if backend crashes
# Delete and reinitialize:
rm backend/data/capstone.db
npm run dev
```

### JWT Token Expired

- Tokens expire after 24 hours
- User must login again
- Check `JWT_SECRET` in `.env`

### CORS Errors

- Ensure `FRONTEND_URL` and `BACKEND_URL` in `.env` are correct
- Backend should have CORS enabled for frontend origin

---

## License

This project is part of the Capstone curriculum.

---

## Support & Documentation

- **SDLC Framework**: [docs/AI_SDLC_OVERVIEW.md](docs/AI_SDLC_OVERVIEW.md)
- **Architecture**: [architecture.md](architecture.md)
- **Requirements**: [requirements.md](requirements.md)
- **Agents**: [AGENTS.md](AGENTS.md)
- **User Story**: [user-story.md](user-story.md)

---

**Last Updated**: August 8, 2026  
**Version**: 1.0.0
