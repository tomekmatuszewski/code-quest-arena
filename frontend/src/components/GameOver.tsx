import { Trophy, RotateCcw, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GameOverProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

export const GameOver = ({ score, correctAnswers, totalQuestions, onPlayAgain }: GameOverProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getMessage = () => {
    if (score === 10) return { text: "PERFECT SCORE!", emoji: "🏆" };
    if (score >= 7) return { text: "Excellent Work!", emoji: "🌟" };
    if (score >= 4) return { text: "Good Job!", emoji: "👍" };
    if (score >= 0) return { text: "Keep Practicing!", emoji: "💪" };
    return { text: "Don't Give Up!", emoji: "🔥" };
  };

  const message = getMessage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-md w-full border-2 border-primary/30 animate-pulse-glow">
        <div className="text-6xl mb-4">{message.emoji}</div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-glow mb-2">
          Game Over!
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8">{message.text}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{score}</p>
            <p className="text-xs text-muted-foreground">Score</p>
          </div>
          <div className="glass rounded-xl p-4">
            <Star className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{correctAnswers}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className={cn(
              "text-2xl font-display font-bold",
              percentage >= 70 ? "text-success" : percentage >= 40 ? "text-accent" : "text-destructive"
            )}>
              {percentage}%
            </div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={onPlayAgain} size="lg" className="w-full gap-2">
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
          <Link to="/leaderboard" className="block">
            <Button variant="outline" size="lg" className="w-full gap-2">
              <Trophy className="w-5 h-5" />
              View Leaderboard
            </Button>
          </Link>
          <Link to="/" className="block">
            <Button variant="ghost" size="lg" className="w-full gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
