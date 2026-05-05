# Systematics Education

Pakistan's official ACCA & CIMA study material distributor — full-stack web platform.

## Tech Stack
- **Frontend:** React (Vite), CSS custom design system
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/infomuhammadhamza106-coder/systematic_education.git
cd systematic_education
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env      # fill in your values
node scripts/migrate.js   # create DB tables
npm run dev               # runs on port 5000
```

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env      # fill in your values
npm run dev               # runs on port 5173
```

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `FRONTEND_URL` | Frontend URL for CORS |
| `ADMIN_PASSWORD` | Admin panel password |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

## Admin Panel
Visit `/admin` → login with your `ADMIN_PASSWORD`

## Features
- ACCA & CIMA book catalogue
- Shopping cart & order placement
- Bank transfer payment flow
- Admin dashboard with order lifecycle management
- Supabase PostgreSQL database
- WhatsApp customer support integration
