import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

# Register and Login to get token
def get_auth_headers():
    # Register/Login user
    username = "pytest_user"
    email = "pytest@example.com"
    password = "password123"
    
    # Try to register (ignore if exists)
    client.post("/register", json={"username": username, "email": email, "password": password})
    
    # Login
    response = client.post("/token", data={"username": email, "password": password})
    assert response.status_code == 200
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_get_questions():
    headers = get_auth_headers()
    response = client.get("/questions/", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_leaderboard():
    response = client.get("/leaderboard")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
