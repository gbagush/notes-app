import { ArrowLeft, Rabbit } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { notFound } from "@/lib/language";

const NotFoundPage = () => {
  const { language } = useLanguage();

  return (
    <div className="mt-4 flex-1 grid place-items-center">
      <EmptyState
        icon={<Rabbit className="h-24 w-24" />}
        message={notFound[language].message}
        cta={
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {notFound[language].backHome}
            </Link>
          </Button>
        }
      />
    </div>
  );
};

export { NotFoundPage };
