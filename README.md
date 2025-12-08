# Code Quest Arena

A full-stack interactive coding quiz platform where users can test their knowledge in various programming languages (JavaScript, Python using WASM, etc.) and compete on a global leaderboard.

## Features
- **Interactive Quizzes**: Multiple-choice questions with code snippets.
- **Client-Side Code Execution**: Run Python code directly in the browser using [Pyodide](https://pyodide.org/) (WASM).
- **Syntax Highlighting**: Beautiful code rendering with `react-syntax-highlighter`.
- **Authentication**: Secure JWT-based registration and login.
- **Leaderboard**: Real-time ranking of players.
- **Full Stack**: React (Vite) frontend + FastAPI backend.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, Pyodide.
- **Backend**: FastAPI, SQLAlchemy, SQLite, PyJWT.
- **DevOps**: Docker, multi-stage builds, Render deployment blueprint.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Docker (optional)

### Local Development

1.  **Setup Backend**:
    ```bash
    cd backend
    python3 -m venv .venv
    source .venv/bin/activate  # or .venv\Scripts\activate on Windows
    pip install -r requirements.txt
    python seed_data.py        # Initialize database
    cd ..
    ```

2.  **Setup Frontend**:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

3.  **Run Development Servers**:
    ```bash
    npm install  # Install root dependencies (concurrently)
    npm run dev
    ```
    Access the app at `http://localhost:8080` (Frontend) and `http://localhost:8000` (Backend API).

### Docker
Build and run the containerized application:
```bash
docker build -t code-quest-arena .
docker run -p 8000:8000 code-quest-arena
```
Access at `http://localhost:8000`.

## Deployment
This project is configured for one-click deployment on **Render**.
1. Push to GitHub.
2. Create a new Blueprint on Render.
3. Select this repository.
4. Render will use `render.yaml` to automatically deploy the Docker container.
