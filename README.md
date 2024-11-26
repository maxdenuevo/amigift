# <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  /> Secrete - Bilingual Secret Santa App

Modern, bilingual Secret Santa web application built with React (Vite) and Flask.

## Features

- Bilingual support (ES/EN) - "Secret Santa" / "Amigo Secreto"
- Mobile-first, responsive design
- Dark mode by default with theme switching
- Custom participant restrictions
- Price range voting with visualizations
- Email notifications
- Persistent group links with UUID
- Maximum 20 participants per group

## Tech Stack

### Frontend

- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- i18next for translations
- Heroicons for icons
- Axios for API calls

### Backend

- Flask
- MySQL database
- Flask-SQLAlchemy
- Flask-Mail for notifications

## Project Structure

```
secrete/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   ├── locales/           # Translation files
│   │   │   ├── en/
│   │   │   └── es/
│   │   └── assets/            # Static assets
│   └── src/
│       ├── main.jsx           # Application entry
│       ├── App.jsx            # Root component
│       ├── router.jsx         # Route definitions
│       ├── components/        # UI components
│       │   ├── layout/
│       │   ├── forms/
│       │   └── charts/
│       ├── pages/             # Route components
│       ├── context/           # Global state
│       ├── hooks/             # Custom hooks
│       ├── utils/             # Helper functions
│       └── api/               # API client
│
├── backend/
│   ├── .env                   # Backend environment variables
│   ├── requirements.txt       # Python dependencies
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration settings
│   ├── models/                # Database models
│   │   ├── group.py
│   │   ├── participant.py
│   │   └── restriction.py
│   ├── routes/                # API routes
│   │   ├── auth.py
│   │   ├── groups.py
│   │   └── participants.py
│   ├── services/              # Business logic
│   │   ├── matching_service.py
│   │   ├── email_service.py
│   │   └── restriction_service.py
│   └── utils/                 # Utility functions
│       ├── validators.py
│       └── helpers.py
│
├── database/                  # Database related files
│   ├── migrations/            # Database migrations
│   └── schema.sql             # Database schema
│
└── docs/                      # Documentation
    ├── README.md
    ├── API.md
    ├── CONTRIBUTING.md
    └── DEPLOYMENT.md
```

## Prerequisites

- Node.js 18+
- Python 3.8+
- MySQL 8+

## Installation

1. Clone and set up frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

2. Set up backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

3. Configure environment variables:

- Frontend (.env):
  ```
  VITE_API_URL=http://localhost:5000
  ```
- Backend (.env):
  ```
  DB_HOST=localhost
  DB_USER=your_user
  DB_PASSWORD=your_password
  DB_NAME=secrete
  ```

## Development

```bash
# Frontend
npm run dev         # Start dev server
npm run build      # Production build
npm run preview    # Preview build

# Backend
flask run --debug  # Start dev server
```

## License

MIT License - see LICENSE for details
