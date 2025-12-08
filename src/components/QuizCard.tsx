import { useState } from 'react';
import { Question } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Code, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

export const QuizCard = ({ question, onAnswer, isFlipped, onFlip }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    const isCorrect = index === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setAnswered(false);
    }, 1500);
  };

  return (
    <div className="card-flip w-full max-w-xl mx-auto h-[450px] md:h-[500px]">
      <div className={cn("card-flip-inner w-full h-full relative", isFlipped && "flipped")}>
        {/* Card Back (Initial State) */}
        <div className="card-front absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:box-glow transition-all duration-300 border-2 border-primary/30"
          onClick={onFlip}>
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center animate-float">
              <Code className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-display text-primary text-glow">Draw Card</h3>
            <p className="text-muted-foreground">Click to reveal your question</p>
            <div className="absolute inset-0 animate-shimmer rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Card Front (Question) */}
        <div className="card-back absolute inset-0 glass rounded-2xl p-6 flex flex-col border-2 border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
              {question.language}
            </span>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-mono",
              question.difficulty === 'easy' && "bg-success/20 text-success",
              question.difficulty === 'medium' && "bg-accent/20 text-accent",
              question.difficulty === 'hard' && "bg-destructive/20 text-destructive"
            )}>
              {question.difficulty}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-mono text-foreground mb-6 flex-grow flex items-center">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-3 px-4 text-sm",
                  answered && index === question.correctAnswer && "bg-success/20 border-success text-success",
                  answered && selectedAnswer === index && index !== question.correctAnswer && "bg-destructive/20 border-destructive text-destructive",
                  !answered && "hover:bg-primary/10"
                )}
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="break-words">{option}</span>
              </Button>
            ))}
          </div>

          {answered && (
            <div className={cn(
              "mt-4 p-3 rounded-lg text-center font-mono text-sm",
              selectedAnswer === question.correctAnswer 
                ? "bg-success/20 text-success" 
                : "bg-destructive/20 text-destructive"
            )}>
              {selectedAnswer === question.correctAnswer ? (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> +1 Point! Excellent!
                </span>
              ) : (
                <span>-1 Point. The correct answer was {String.fromCharCode(65 + question.correctAnswer)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
