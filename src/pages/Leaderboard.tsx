import { Navbar } from '@/components/Navbar';
import { Trophy, Medal, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock leaderboard data - will be replaced with real data from database
const mockLeaderboard = [
  { id: 1, username: 'CodeMaster', score: 10, gamesPlayed: 15, avgScore: 8.5 },
  { id: 2, username: 'DevNinja', score: 10, gamesPlayed: 12, avgScore: 7.8 },
  { id: 3, username: 'ByteWizard', score: 9, gamesPlayed: 20, avgScore: 7.2 },
  { id: 4, username: 'SyntaxStar', score: 9, gamesPlayed: 8, avgScore: 6.9 },
  { id: 5, username: 'AlgoAce', score: 8, gamesPlayed: 25, avgScore: 6.5 },
  { id: 6, username: 'PixelPro', score: 8, gamesPlayed: 10, avgScore: 6.2 },
  { id: 7, username: 'DataDragon', score: 7, gamesPlayed: 18, avgScore: 5.8 },
  { id: 8, username: 'LogicLord', score: 7, gamesPlayed: 14, avgScore: 5.5 },
  { id: 9, username: 'BinaryBoss', score: 6, gamesPlayed: 22, avgScore: 5.1 },
  { id: 10, username: 'QueryQueen', score: 6, gamesPlayed: 9, avgScore: 4.8 },
];

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-mono">{rank}</span>;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary text-glow mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">Top performers in the CodeQuiz arena</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="glass rounded-2xl p-4 md:p-6 text-center border border-gray-400/30 mt-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400/20 flex items-center justify-center mx-auto mb-3">
                <Medal className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">2nd</p>
              <p className="font-display font-bold text-foreground truncate">{mockLeaderboard[1]?.username}</p>
              <p className="text-2xl md:text-3xl font-display font-bold text-gray-300">{mockLeaderboard[1]?.score}</p>
            </div>

            {/* 1st Place */}
            <div className="glass rounded-2xl p-4 md:p-6 text-center border-2 border-yellow-400/50 animate-pulse-glow">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
              </div>
              <p className="text-sm text-yellow-400 mb-1">1st</p>
              <p className="font-display font-bold text-foreground truncate">{mockLeaderboard[0]?.username}</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-yellow-400">{mockLeaderboard[0]?.score}</p>
            </div>

            {/* 3rd Place */}
            <div className="glass rounded-2xl p-4 md:p-6 text-center border border-amber-600/30 mt-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-600/20 flex items-center justify-center mx-auto mb-3">
                <Medal className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">3rd</p>
              <p className="font-display font-bold text-foreground truncate">{mockLeaderboard[2]?.username}</p>
              <p className="text-2xl md:text-3xl font-display font-bold text-amber-600">{mockLeaderboard[2]?.score}</p>
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="glass rounded-2xl border border-primary/20 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Full Rankings
              </h2>
            </div>
            
            <div className="divide-y divide-border">
              {mockLeaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className={cn(
                    "flex items-center gap-4 p-4 transition-colors hover:bg-muted/50",
                    index < 3 && "bg-muted/30"
                  )}
                >
                  <div className="w-10 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-mono font-medium text-foreground truncate">
                      {player.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.gamesPlayed} games • Avg: {player.avgScore.toFixed(1)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className={cn(
                      "text-xl font-display font-bold",
                      index === 0 && "text-yellow-400",
                      index === 1 && "text-gray-300",
                      index === 2 && "text-amber-600",
                      index > 2 && "text-primary"
                    )}>
                      {player.score}
                    </p>
                    <p className="text-xs text-muted-foreground">Best Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Register and play to appear on the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
