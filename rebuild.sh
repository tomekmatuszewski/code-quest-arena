#!/bin/bash
# Rebuild and restart the application
echo "Stopping existing containers..."
docker stop $(docker ps -q --filter ancestor=code-quest-arena) 2>/dev/null || true

echo "Removing old image..."
docker rmi -f code-quest-arena 2>/dev/null || true

echo "Building Docker image..."
docker build --no-cache -t code-quest-arena .

echo "Starting container..."
docker run -d -p 8001:8000 code-quest-arena

echo "Done! The application is running on http://localhost:8001"
