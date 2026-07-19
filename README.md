# ShikshaSetu

> **A calmer, more actionable view of student progress.**

ShikshaSetu is a faculty-facing student-success workspace designed around a simple belief: academic data is most useful when it helps someone decide what to do next. Instead of leaving attendance, assessment results, skill gaps, and weekly commitments in separate places, the interface brings them into one focused command centre for a cohort.

The current experience is a polished, responsive React prototype for an academic mentor. It uses thoughtfully structured fictional data to demonstrate the product flow—from spotting a learner who needs support, to reviewing the evidence, to selecting a recovery pathway. It is deliberately an interface prototype, not a production student-information system.

## What makes it different

Most academic dashboards report a number. ShikshaSetu is shaped around the conversation behind that number.

- **Progress with context** — cohort health, learning velocity, grade components, attendance patterns, strengths, and gaps appear together rather than as isolated reports.
- **Early, humane intervention** — risk states and recommended recovery pathways turn a concerning trend into a practical next step for a mentor.
- **Built for the rhythm of teaching** — a weekly schedule, office hours, 1:1s, labs, and grading blocks help staff balance support work with their existing commitments.
- **Trust-aware attendance** — the prototype surfaces unusual check-in patterns for review. These are prompts for human judgment, never automated conclusions.
- **A deliberately quiet interface** — editorial typography, clear hierarchy, and a light responsive layout keep attention on learners instead of dashboard noise.

## Experience at a glance

| Workspace          | What it helps a mentor understand                                                          |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Growth Hub**     | Cohort pulse, priority learners, recent movement, and intervention signals.                |
| **Attendance**     | Daily status, tardiness, participation patterns, and check-in flags.                       |
| **Marks**          | Performance by assessment component using configurable grade weights.                      |
| **Schedule**       | A structured teaching week across lectures, labs, office hours, mentoring, and admin work. |
| **Students**       | Individual academic profiles with GPA, momentum, skills, strengths, and learning gaps.     |
| **Academic Staff** | The faculty view and contextual cohort information.                                        |

All names, courses, dates, and metrics displayed in the dashboard are fictional demonstration data. The attendance geo/IP flags are simulations intended to show a review workflow; they do not perform real location verification.

## Technology

| Layer              | Stack                                        |
| ------------------ | -------------------------------------------- |
| Frontend           | React 18, Vite, Tailwind CSS, ESLint         |
| API service        | Node.js, Express 5, Mongoose                 |
| Database           | MongoDB (configured through `MONGO_URI`)     |
| Deployment targets | Vercel for the frontend, Railway for the API |

## Project structure

```text
ShikshaSetu/
├── frontend/                 # Primary student-success dashboard
│   └── src/
│       ├── views/            # Hub, attendance, marks, schedule, students, staff
│       ├── components/       # Responsive navigation and UI primitives
│       ├── data/mockData.js  # Fictional prototype data and learning signals
│       └── lib/api.js        # Frontend API base URL configuration
└── Backend/                  # Express + MongoDB service
    ├── Config/               # Database connection setup
    ├── Controllers/
    ├── Models/
    ├── Routes/
    └── Server.js
```

`Backend/Adminpanel` is a legacy application. It is retained in the repository but is not the primary dashboard and should not be deployed.

## Run it locally

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas or another reachable MongoDB instance (only needed when running the API)

### 1. Start the dashboard

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite—normally `http://localhost:5173`.

### 2. Start the API (optional for the current prototype)

The dashboard currently renders its product experience from local mock data. The API can still be run independently for its existing product-management endpoints.

```bash
cd Backend
copy .env.example .env
# Add your MongoDB connection string to .env
npm install
npm run dev
```

The server runs on `http://localhost:8000`. Verify it at `GET /health`.

## Environment configuration

Create `Backend/.env` from [`Backend/.env.example`](Backend/.env.example):

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nexusforge
CLIENT_ORIGIN=http://localhost:5173
```

For a deployed frontend, set this build-time variable:

```env
VITE_API_URL=https://your-api-domain.example/api
```

When `VITE_API_URL` is not set, the Vite development server proxies `/api` requests to port `8000`.

## API service

The active Express service exposes a health endpoint and product CRUD routes:

| Method   | Route               | Purpose                           |
| -------- | ------------------- | --------------------------------- |
| `GET`    | `/health`           | Lightweight service health check. |
| `GET`    | `/api/products`     | List products.                    |
| `POST`   | `/api/products`     | Create a product.                 |
| `GET`    | `/api/products/:id` | Retrieve a product.               |
| `PUT`    | `/api/products/:id` | Update a product.                 |
| `DELETE` | `/api/products/:id` | Delete a product.                 |

The repository also contains models, controllers, and route modules for administrators, customers, orders, and payments. They are not currently mounted by `Server.js`; the documented live API surface above reflects the service as it runs today.

## Where the project can grow

The next meaningful step is to connect the student-success views to an education-focused API and persistent data model: students, cohorts, attendance events, assessments, interventions, and role-based access. From there, ShikshaSetu can evolve from a compelling mentor workspace into a dependable operational tool—without losing the thoughtful, learner-centred experience that defines it.

---

ShikshaSetu means _a bridge to education_. This project explores what that bridge can look like when data supports mentorship, not just measurement.
