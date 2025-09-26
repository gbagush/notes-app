import { Archive, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";

import { useLanguage } from "@/contexts/LanguageContext";

import { brand } from "@/lib/language";

const Navbar = () => {
  const { language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <h1 className="font-semibold tracking-tight">
          <Link to="/" className="flex gap-2 items-center">
            <NotebookPen size={16} /> {brand[language]}
          </Link>
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Archive"
            type="button"
            className="size-8"
          >
            <Link to="/archives">
              <Archive className="h-4 w-4" />
            </Link>
          </Button>

          <ThemeToggle />
          <LanguageSwitcher />
          <UserProfile />
        </div>
      </nav>
    </header>
  );
};

export { Navbar };
