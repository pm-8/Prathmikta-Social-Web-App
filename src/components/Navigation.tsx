import { Button } from "./ui/button";
import { Building2, Home, User, FileText, Shield, LogOut } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userType?: "citizen" | "municipal";
  userInfo?: { username: string; name: string };
  onLogout?: () => void;
}

export function Navigation({ currentPage, onNavigate, userType = "citizen", userInfo, onLogout }: NavigationProps) {
  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Prathmikta</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {userType === "citizen" ? (
                <>
                  <Button
                    variant={currentPage === "home" ? "default" : "ghost"}
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    HOME
                  </Button>
                  <Button
                    variant={currentPage === "posts" ? "default" : "ghost"}
                    onClick={() => onNavigate("posts")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    MY REPORTS
                  </Button>
                  <Button
                    variant={currentPage === "profile" ? "default" : "ghost"}
                    onClick={() => onNavigate("profile")}
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    PROFILE
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={currentPage === "municipal" ? "default" : "ghost"}
                    onClick={() => onNavigate("municipal")}
                    className="flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    DASHBOARD
                  </Button>
                  <Button
                    variant={currentPage === "home" ? "default" : "ghost"}
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    PUBLIC FEED
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userInfo && (
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  {userType === "municipal" ? (
                    <Shield className="w-3 h-3 text-primary" />
                  ) : (
                    <User className="w-3 h-3 text-primary" />
                  )}
                </div>
                <span>{userInfo.name}</span>
              </div>
            )}
            {onLogout && (
              <Button
                variant="ghost"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}