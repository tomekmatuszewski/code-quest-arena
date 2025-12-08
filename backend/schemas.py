from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr

# Question Schemas
class QuestionBase(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    language: str
    difficulty: str
    code_snippet: Optional[str] = None

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int

    class Config:
        orm_mode = True

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    
    class Config:
        orm_mode = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None

# Game Result Schemas
class GameResultBase(BaseModel):
    score: int

class GameResultCreate(GameResultBase):
    pass

class GameResult(GameResultBase):
    id: int
    user_id: int
    played_at: datetime
    
    class Config:
        orm_mode = True

# Leaderboard Schema
class LeaderboardEntry(BaseModel):
    id: int
    username: str
    score: int
    gamesPlayed: int
    avgScore: float
