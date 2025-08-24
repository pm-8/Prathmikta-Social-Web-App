import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="w-full bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">P</span>
            </div>
            <span className="font-medium text-lg">Prathmikta</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button
              variant={currentPage === "home" ? "default" : "ghost"}
              onClick={() => onNavigate("home")}
              className="font-medium"
            >
              HOME
            </Button>
            <Button
              variant={currentPage === "profile" ? "default" : "ghost"}
              onClick={() => onNavigate("profile")}
              className="font-medium"
            >
              PROFILE
            </Button>
            <Button
              variant={currentPage === "posts" ? "default" : "ghost"}
              onClick={() => onNavigate("posts")}
              className="font-medium"
            >
              MY POSTS
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}