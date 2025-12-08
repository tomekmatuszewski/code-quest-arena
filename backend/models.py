from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    game_results = relationship("GameResult", back_populates="user")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, index=True)
    options = Column(JSON) # Storing options as JSON array
    correct_answer = Column(Integer)
    language = Column(String, index=True)
    difficulty = Column(String, index=True)
    code_snippet = Column(String, nullable=True)

class GameResult(Base):
    __tablename__ = "game_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)
    played_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="game_results")
