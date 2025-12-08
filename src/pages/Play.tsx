import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { QuizCard } from '@/components/QuizCard';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { GameOver } from '@/components/GameOver';
import { getRandomQuestions, Question } from '@/data/questions';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOTAL_QUESTIONS = 10;

const Play = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setQuestions(getRandomQuestions(TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setIsFlipped(false);
    setGameOver(false);
    setWaitingForNext(false);
  };

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(prev => Math.min(prev + 1, 10));
      setCorrectAnswers(prev => prev + 1);
    } else {
      setScore(prev => prev - 1);
    }
    setWaitingForNext(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setWaitingForNext(false);
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <GameOver
            score={score}
            correctAnswers={correctAnswers}
            totalQuestions={TOTAL_QUESTIONS}
            onPlayAgain={startNewGame}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
          <ScoreDisplay
            score={score}
            questionsAnswered={currentIndex + (waitingForNext ? 1 : 0)}
            totalQuestions={TOTAL_QUESTIONS}
          />

          {questions.length > 0 && (
            <QuizCard
              key={questions[currentIndex].id}
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          )}

          {waitingForNext && (
            <div className="flex justify-center">
              <Button onClick={handleNext} size="lg" className="gap-2">
                {currentIndex + 1 >= TOTAL_QUESTIONS ? 'See Results' : 'Next Question'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Play;
