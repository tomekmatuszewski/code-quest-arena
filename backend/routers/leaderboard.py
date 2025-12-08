from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas, database, auth

router = APIRouter(
    tags=["Leaderboard"],
)

@router.post("/score", response_model=schemas.GameResult)
def submit_score(
    result: schemas.GameResultCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    valid_score = max(0, min(result.score, 10)) # Assuming max 10 questions for now
    
    game_result = models.GameResult(
        score=valid_score,
        user_id=current_user.id
    )
    db.add(game_result)
    db.commit()
    db.refresh(game_result)
    return game_result

@router.get("/leaderboard", response_model=List[schemas.LeaderboardEntry])
def get_leaderboard(db: Session = Depends(database.get_db)):
    # Aggregation query
    stats = db.query(
        models.User.id,
        models.User.username,
        func.max(models.GameResult.score).label("max_score"),
        func.count(models.GameResult.id).label("games_played"),
        func.avg(models.GameResult.score).label("avg_score")
    ).join(models.GameResult).group_by(models.User.id).order_by(func.max(models.GameResult.score).desc()).limit(10).all()
    
    leaderboard = []
    for s in stats:
        # stats is a tuple due to multiple column selection
        # (id, username, max_score, games_played, avg_score)
        leaderboard.append(schemas.LeaderboardEntry(
            id=s[0],
            username=s[1],
            score=s[2],
            gamesPlayed=s[3],
            avgScore=round(s[4], 1)
        ))
        
    return leaderboard
