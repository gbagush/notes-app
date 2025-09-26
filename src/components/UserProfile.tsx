import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import { profile } from "@/lib/language";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "NA";

  if (!user) {
    return (
      <Button asChild variant="outline" className="h-8">
        <Link to="/auth/login">{profile[language].loginButton}</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full p-0">
          <Avatar className="size-8">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium leading-tight">{user.name}</span>
            <span className="text-xs text-muted-foreground leading-tight">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{profile[language].logoutButton}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserProfile };
