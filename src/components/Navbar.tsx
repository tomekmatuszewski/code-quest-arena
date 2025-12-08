import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Trophy, Play, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  user?: { username: string } | null;
  onLogout?: () => void;
}

export const Navbar = ({ user, onLogout }: NavbarProps) => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Code },
    { to: '/play', label: 'Play', icon: Play },
    { to: '/leaderboard', label: 'Ranks', icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:box-glow transition-all duration-300">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-primary text-glow hidden sm:block">
              CodeQuiz
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <Button
                  variant={location.pathname === to ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    location.pathname === to && "box-glow"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}

            <div className="w-px h-8 bg-border mx-2 hidden sm:block" />

            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">{user.username}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 md:gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
