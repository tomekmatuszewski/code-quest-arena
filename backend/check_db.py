from models import Question
from database import SessionLocal

db = SessionLocal()
try:
    count = db.query(Question).count()
    print(f"Total questions: {count}")
finally:
    db.close()
