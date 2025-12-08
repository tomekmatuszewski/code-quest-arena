import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Code, Play, Trophy, Zap, Brain, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">Level Up Your Coding Knowledge</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-foreground">Master</span>{' '}
              <span className="text-primary text-glow">Programming</span>
              <br />
              <span className="text-foreground">One Card at a Time</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Challenge yourself with our interactive quiz game. Draw cards, answer programming questions, 
              and climb the leaderboard. Are you ready to prove your skills?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/play">
                <Button size="xl" className="gap-3 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Playing
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button size="xl" variant="outline" className="gap-3">
                  <Trophy className="w-5 h-5" />
                  View Rankings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 border border-primary/20 hover:box-glow transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Card Discovery</h3>
              <p className="text-muted-foreground">
                Draw cards to reveal programming questions. Each card is a new challenge waiting to be conquered.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-secondary/20 hover:box-glow-secondary transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Score System</h3>
              <p className="text-muted-foreground">
                +1 for correct answers, -1 for wrong ones. Aim for the perfect 10-point score!
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-accent/20 hover:box-glow-accent transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Leaderboard</h3>
              <p className="text-muted-foreground">
                Compete with other developers. Register to save your scores and climb the rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-2xl p-8 md:p-12 text-center border-2 border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 scanline opacity-30" />
            <div className="relative z-10">
              <Code className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Test Your Knowledge?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of developers who have already challenged themselves. 
                Create an account to track your progress and compete on the leaderboard.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" variant="neon" className="gap-2">
                    Create Account
                  </Button>
                </Link>
                <Link to="/play">
                  <Button size="lg" variant="ghost" className="gap-2">
                    Play as Guest
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground text-sm font-mono">
            CodeQuiz © 2024 — Built for developers, by developers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
