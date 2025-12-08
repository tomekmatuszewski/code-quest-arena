import requests
import time
import subprocess
import signal
import os
import sys

# Configuration
BASE_URL = "http://localhost:8000"
USERNAME = "testuser"
EMAIL = "test@example.com"
PASSWORD = "password123"

def run_tests():
    print("Starting backend...")
    # Start the backend server in the background
    process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd=".."
    )
    
    try:
        # Wait for server to start
        print("Waiting for server to start...")
        for i in range(10):
            try:
                response = requests.get(f"{BASE_URL}/")
                if response.status_code == 200:
                    print("Server started successfully.")
                    break
            except requests.ConnectionError:
                time.sleep(1)
        else:
            print("Failed to start server.")
            return

        # 1. Register
        print("\nTesting Registration...")
        response = requests.post(f"{BASE_URL}/register", json={
            "username": USERNAME,
            "email": EMAIL,
            "password": PASSWORD
        })
        if response.status_code == 200:
            print("Registration successful.")
        elif response.status_code == 400 and "already registered" in response.text:
             print("User already registered (expected if repeated).")
        else:
            print(f"Registration failed: {response.text}")

        # 2. Login
        print("\nTesting Login...")
        response = requests.post(f"{BASE_URL}/token", data={
            "username": EMAIL, # Schema uses username field for email
            "password": PASSWORD
        })
        if response.status_code == 200:
            token = response.json()["access_token"]
            print("Login successful. Token received.")
        else:
            print(f"Login failed: {response.text}")
            return

        headers = {"Authorization": f"Bearer {token}"}

        # 3. Get Questions
        print("\nTesting Get Questions...")
        response = requests.get(f"{BASE_URL}/questions/", headers=headers)
        if response.status_code == 200:
            questions = response.json()
            print(f"Fetched {len(questions)} questions.")
            if len(questions) > 0:
                print(f"Sample Question: {questions[0]['question']}")
        else:
            print(f"Get Questions failed: {response.text}")

        # 4. Submit Score
        print("\nTesting Submit Score...")
        response = requests.post(f"{BASE_URL}/score", json={"score": 8}, headers=headers)
        if response.status_code == 200:
            print("Score submitted successfully.")
        else:
            print(f"Submit Score failed: {response.text}")

        # 5. Get Leaderboard
        print("\nTesting Leaderboard...")
        response = requests.get(f"{BASE_URL}/leaderboard")
        if response.status_code == 200:
            leaderboard = response.json()
            print(f"Fetched {len(leaderboard)} leaderboard entries.")
            print(f"Top player: {leaderboard[0]['username']} - {leaderboard[0]['score']}")
        else:
            print(f"Get Leaderboard failed: {response.text}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        print("\nStopping backend...")
        os.kill(process.pid, signal.SIGTERM)
        stdout, stderr = process.communicate()
        if stdout:
            print(f"Server Stdout:\n{stdout.decode()}")
        if stderr:
            print(f"Server Stderr:\n{stderr.decode()}")


if __name__ == "__main__":
    run_tests()
