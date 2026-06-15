<!-- Back to top -->
<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AsalGrg/ProductManager">
    <img src="https://res.cloudinary.com/dxbwk0z1y/image/upload/v1781521248/images-Photoroom_xau70h.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Productify</h3>

  <p align="center">
    A clean, minimal, and fully responsive Product Management Dashboard with Role-Based Access Control — built with Next.js and FastAPI.
    <br />
    <a href="https://github.com/AsalGrg/ProductManager"><strong>Explore the repo »</strong></a>
    <br />
    <br />
    <a href="#">View Live Demo</a>
    &middot;
    <a href="https://github.com/AsalGrg/ProductManager/issues">Report Bug</a>
  </p>
</div>

---

## About The Project

**Productify** is a fullstack Product Management Dashboard that allows authenticated users to manage a product catalogue with strict role-based access control (RBAC). Built as part of a fullstack developer evaluation task, it demonstrates clean architecture, secure authentication, and a polished, responsive UI.

The application supports three user roles — **Admin**, **Editor**, and **Viewer** — each with clearly defined permissions enforced on both the frontend and the backend. Every API route is protected with JWT authentication via httpOnly cookies, making the application resistant to XSS-based token theft.

### Key Highlights

- 🔐 JWT authentication stored in httpOnly cookies
- 🛡️ Role-Based Access Control (RBAC) enforced on every route
- 📦 Full product CRUD — Create, Read, Update, Delete
- 🔍 Search, filter by category/status, sort by price
- 📄 Paginated product listing
- 🌙 Dark mode with warm neutral palette
- 📊 Dashboard with live stats, member list, recent products
- 📱 Fully responsive across all device sizes
- ⚡ FastAPI backend with pandas CSV data layer

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

- [![Next.js][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![TailwindCSS][Tailwind.css]][Tailwind-url]
- [![FastAPI][FastAPI]][FastAPI-url]
- [![Python][Python]][Python-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Features

### Authentication
- Login screen with email and password
- JWT token created on login and stored in an **httpOnly cookie** — JavaScript cannot access it (XSS protection)
- Session restored on page load via `/auth/me` endpoint
- Logout clears the cookie server-side
- Protected routes redirect unauthenticated users to `/login`

### Role-Based Access Control (RBAC)

| Role   | Create | Read | Update | Delete |
|--------|--------|------|--------|--------|
| Admin  | ✅     | ✅   | ✅     | ✅     |
| Editor | ❌     | ✅   | ✅     | ❌     |
| Viewer | ❌     | ✅   | ❌     | ❌     |

- Permissions enforced on **every API route** via FastAPI `Depends()` chain
- Frontend hides/shows UI actions based on role
- Unauthorized actions return HTTP 403

### Product Management
- View all products in a responsive card grid
- Add new products (Admin only)
- Edit product name, category, price, status (Admin + Editor)
- Delete products with confirmation modal (Admin only)
- Real-time UI updates without page reload

### Search, Filter & Sort
- Search products by name
- Filter by category (Electronics, Books, Furniture, etc.)
- Filter by status (Active / Inactive)
- Sort by price ascending or descending
- All filters work together and trigger paginated API calls

### Pagination
- Server-side pagination with configurable page size
- Page number navigation with Prev / Next controls
- Smart truncation for large page counts

### Dashboard Overview
- Total, Active, and Inactive product counts
- All registered users with roles
- Recent products list
- Live data fetched from the API on load

### Dark Mode
- System-wide dark mode toggle
- Warm neutral dark palette (`#141414`, `#1c1c1c`, `#2a2a2a`)
- Preference saved to `localStorage` and restored on reload
- Every component — cards, modals, inputs, sidebar — has dark variants

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## RBAC Implementation

Permissions are defined as a single source of truth in `backend/middleware/rbac.py`:

```python
PERMISSIONS = {
    "admin":  ["create", "read", "update", "delete"],
    "editor": ["read", "update"],
    "viewer": ["read"],
}
```

Each route declares its required permission via a FastAPI dependency:

```python
@router.post("/")
def create_product(
    data: ProductCreate,
    _=Depends(require_permission("create"))  # Admin only
):
    return product_service.create_product(data)
```

The `require_permission` dependency:
1. Reads the httpOnly cookie
2. Decodes and validates the JWT
3. Extracts the user's role
4. Checks the role against the permission table
5. Returns 401 if not authenticated, 403 if not permitted

Routes contain **zero auth logic** — all enforcement is in the middleware layer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## API Integration

The backend exposes a RESTful API built with FastAPI:

### Auth Endpoints
| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| POST   | /auth/login  | Authenticate and receive cookie    |
| POST   | /auth/logout | Clear session cookie               |
| GET    | /auth/me     | Get current authenticated user     |

### Product Endpoints
| Method | Endpoint                  | Description                   | Access         |
|--------|---------------------------|-------------------------------|----------------|
| GET    | /products/                | List all (search/filter/page) | All roles      |
| GET    | /products/categories      | Get all unique categories     | All roles      |
| GET    | /products/{id}            | Get single product            | All roles      |
| POST   | /products/                | Create product                | Admin only     |
| PATCH  | /products/{id}            | Update product                | Admin, Editor  |
| DELETE | /products/{id}            | Delete product                | Admin only     |

### Dashboard Endpoint
| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| GET    | /dashboard/  | Stats, users, recent products      |

The frontend communicates via `axios` with `withCredentials: true` to automatically send the httpOnly cookie with every request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.11+
- pip

---

### Backend Setup

1. Clone the repository
   ```sh
   git clone https://github.com/AsalGrg/ProductManager.git
   cd ProductManager/backend
   ```

2. Create and activate a virtual environment
   ```sh
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Mac/Linux
   python -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies
   ```sh
   pip install -r requirements.txt
   ```

4. Start the backend server
   ```sh
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. Open API docs at `http://localhost:8000/docs`

---

### Frontend Setup

1. Navigate to the frontend directory
   ```sh
   cd ../frontend
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```

4. Open `http://localhost:3000`

---

### Test Credentials

| Role   | Email                  | Password   |
|--------|------------------------|------------|
| Admin  | admin@example.com      | admin123   |
| Editor | editor@example.com     | editor123  |
| Viewer | viewer@example.com     | viewer123  |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Structure

```
ProductManager/
├── backend/
│   ├── main.py                   # App entry, CORS, router registration
│   ├── config.py                 # Settings (secret key, paths, expiry)
│   ├── requirements.txt
│   ├── data/
│   │   ├── products.csv          # Product data store
│   │   └── users.csv             # User data store
│   ├── models/
│   │   ├── user.py               # User, Role, UserPublic, UserInDB
│   │   └── product.py            # ProductBase, Create, Update, Response
│   ├── routers/
│   │   ├── auth.py               # /auth routes
│   │   ├── products.py           # /products routes
│   │   └── dashboard.py          # /dashboard route
│   ├── services/
│   │   ├── auth_service.py       # JWT creation, decoding, user verification
│   │   ├── product_service.py    # Pandas CRUD logic
│   │   ├── user_service.py       # User lookup from CSV
│   │   └── dashboard_service.py  # Dashboard aggregation logic
│   ├── middleware/
│   │   └── rbac.py               # Permission table + FastAPI dependencies
│   └── utils/
│       └── csv_handler.py        # Generic CSV read/write helpers
│
└── frontend/
    ├── app/
    │   ├── layout.jsx
    │   ├── login/page.jsx
    │   └── dashboard/
    │       ├── layout.jsx
    │       ├── page.jsx           # Dashboard overview
    │       └── products/page.jsx  # Product management
    ├── components/
    │   ├── Button.jsx
    │   ├── StatusPill.jsx
    │   ├── Pagination.jsx
    │   ├── ThemeToggler.jsx
    │   ├── dashboard/
    │   └── products/
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── ThemeContext.jsx
    │   └── ProductFilterContext.jsx
    ├── hooks/
    │   ├── useAuth.js
    │   ├── useTheme.js
    │   └── useProductFilter.js
    ├── services/
    │   ├── auth_service.js
    │   ├── product_service.js
    │   └── dashboard_service.js
    └── utils/
        └── axios.js
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Assumptions & Limitations

- **CSV data layer** — pandas + CSV is used as a lightweight mock database. In production this would be replaced with PostgreSQL or another relational database.
- **Hardcoded users** — users are defined in `users.csv`. A production system would include registration, email verification, and password reset flows.
- **No refresh tokens** — access tokens expire after 60 minutes and the user must log in again. Production systems implement refresh token rotation.
- **No HTTPS locally** — the `secure=True` cookie flag is commented out for local development. It must be enabled in production.
- **Images** — product images use Pexels URLs. In production, images would be uploaded to a storage service such as Cloudinary or AWS S3.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

Asal Gurung — [@LinkedIn](https://www.linkedin.com/in/asal-gurung-505951291/) — gurung.asal.06@gmail.com

Project Link: [https://github.com/AsalGrg/ProductManager](https://github.com/AsalGrg/ProductManager)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & BADGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/asal-gurung-505951291/

[Next.js]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Tailwind.css]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[FastAPI]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/

[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
