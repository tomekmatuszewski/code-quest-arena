# Build Stage
FROM node:20-slim AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# Runtime Stage
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
# pyodide/react-syntax-highlighter doesn't need extra system deps on backend, 
# but we need to ensure python environment is clean.

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend assets from builder stage
COPY --from=builder /app/frontend/dist /app/static

# Start script
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
