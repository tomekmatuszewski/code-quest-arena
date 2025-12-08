from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
import models, schemas, database, auth

router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)

@router.get("/", response_model=List[schemas.Question])
def get_questions(
    limit: int = 10, 
    language: Optional[str] = None,
    difficulty: Optional[str] = None,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    query = db.query(models.Question)
    
    if language:
        query = query.filter(models.Question.language == language)
    if difficulty:
        query = query.filter(models.Question.difficulty == difficulty)
        
    # Random selection
    questions = query.order_by(func.random()).limit(limit).all()
    return questions
