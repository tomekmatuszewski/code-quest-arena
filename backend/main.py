from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, questions, leaderboard
import models, database
import os
# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Code Quest Arena API")

# CORS Setup
# CORS Setup
# Allow any localhost/127.0.0.1 origin
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*", # Allow all origins for now (development/docker)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Request: {request.method} {request.url}")
    print(f"Origin: {request.headers.get('origin')}")
    response = await call_next(request)
    print(f"{request.client.host}:{request.client.port} - \"{request.method} {request.url.path} {request.scope['http_version']}\" {response.status_code} {response.background}")
    return response

app.include_router(auth.router)
app.include_router(questions.router)
app.include_router(leaderboard.router)

# Serve React App (SPA)
# Only if the static directory exists (i.e. we are in production/docker)
if os.path.exists("static"):
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    
    # Mount assets folder explicitly
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

    # Catch-all route for SPA
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Allow API calls to pass through (though they should be caught by routers above)
        if full_path.startswith("api/"):
             return {"error": "Not Found", "status": 404}
        
        # Check if file exists in static (e.g. favicon.ico, manifest.json)
        file_path = os.path.join("static", full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
            
        # Fallback to index.html for client-side routing
        return FileResponse("static/index.html")

import os

# ... existing code ...

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

