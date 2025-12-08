
import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Code, Zap, Play, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePyodide } from '@/hooks/usePyodide';
import { Textarea } from '@/components/ui/textarea';

interface QuizCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

export const QuizCard = ({ question, onAnswer, isFlipped, onFlip }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const { runPython, output, error, isLoading, resetOutput } = usePyodide();
  const [userCode, setUserCode] = useState(question.code_snippet || '');
  const [showEditor, setShowEditor] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setUserCode(question.code_snippet || '');
    resetOutput();
    setShowEditor(false);
  }, [question, resetOutput]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    const isCorrect = index === question.correct_answer;

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setAnswered(false);
    }, 1500);
  };

  const handleRunCode = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    if (question.language.toLowerCase() === 'python') {
      runPython(userCode);
    }
  };

  const toggleEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditor(!showEditor);
  };

  return (
    <div className="card-flip w-full max-w-xl mx-auto min-h-[500px]">
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
        <div className="card-back absolute inset-0 glass rounded-2xl p-6 flex flex-col border-2 border-primary/30 h-full overflow-y-auto">
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

          <div className="text-lg md:text-xl font-mono text-foreground mb-4 flex-grow flex flex-col justify-center">
            <span className="mb-4 block">{question.question}</span>

            {question.code_snippet && (
              <div className="w-full my-2 text-left space-y-2 relative" onClick={(e) => e.stopPropagation()}>
                {/* Execute Button for Python */}
                {question.language.toLowerCase() === 'python' && (
                  <div className="flex justify-end mb-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs gap-1"
                      onClick={toggleEditor}
                    >
                      <Code className="w-3 h-3" />
                      {showEditor ? 'Hide Editor' : 'Edit & Run'}
                    </Button>
                  </div>
                )}

                {showEditor && question.language.toLowerCase() === 'python' ? (
                  <div className="space-y-2">
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="font-mono text-sm min-h-[100px] bg-black/50 border-primary/20"
                    />
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded-md">
                      <Button
                        size="sm"
                        onClick={handleRunCode}
                        disabled={isLoading}
                        className="gap-2"
                      >
                        {isLoading ? <span className="animate-spin">⌛</span> : <Play className="w-4 h-4" />}
                        Run Code
                      </Button>
                      {isLoading && <span className="text-xs text-muted-foreground mr-2">Loading Python...</span>}
                    </div>

                    {/* Output Console */}
                    {(output.length > 0 || error) && (
                      <div className="bg-black rounded-md p-3 text-xs font-mono border border-primary/20 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1 pb-1 border-b border-white/10">
                          <Terminal className="w-3 h-3" />
                          <span>Output</span>
                        </div>
                        {output.map((line, i) => (
                          <div key={i} className="text-green-400">{line}</div>
                        ))}
                        {error && <div className="text-red-400">{error}</div>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden text-sm w-full">
                    <SyntaxHighlighter
                      language={question.language.toLowerCase()}
                      style={atomDark}
                      customStyle={{ margin: 0, padding: '1rem', borderRadius: '0.5rem' }}
                      wrapLongLines={true}
                    >
                      {question.code_snippet}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 mt-auto">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-3 px-4 text-sm",
                  answered && index === question.correct_answer && "bg-success/20 border-success text-success",
                  answered && selectedAnswer === index && index !== question.correct_answer && "bg-destructive/20 border-destructive text-destructive",
                  !answered && "hover:bg-primary/10"
                )}
                onClick={(e) => { e.stopPropagation(); handleAnswer(index); }}
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
              selectedAnswer === question.correct_answer
                ? "bg-success/20 text-success"
                : "bg-destructive/20 text-destructive"
            )}>
              {selectedAnswer === question.correct_answer ? (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> +1 Point! Excellent!
                </span>
              ) : (
                <span>-1 Point. The correct answer was {String.fromCharCode(65 + question.correct_answer)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
