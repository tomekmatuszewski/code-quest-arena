import { Trophy, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
}

export const ScoreDisplay = ({ score, questionsAnswered, totalQuestions }: ScoreDisplayProps) => {
  const progress = (questionsAnswered / totalQuestions) * 100;
  
  return (
    <div className="glass rounded-xl p-4 md:p-6 border border-primary/20">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Score</p>
            <p className={cn(
              "text-3xl font-display font-bold",
              score >= 0 ? "text-primary text-glow" : "text-destructive"
            )}>
              {score}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Progress</p>
            <p className="text-xl font-display font-bold text-accent">
              {questionsAnswered}/{totalQuestions}
            </p>
          </div>
        </div>

        <div className="w-full mt-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
