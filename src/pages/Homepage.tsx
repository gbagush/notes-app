import { SearchX, SquarePen, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { NoteCard } from "@/components/NoteCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useNotes } from "@/hooks/useNotes";
import { useLanguage } from "@/contexts/LanguageContext";

import { dashboard } from "@/lib/language";

const Homepage = () => {
  const { filtered, loading, error, keyword, setKeyword, refetch } = useNotes();
  const { language } = useLanguage();

  return (
    <section className="py-4 flex-1 flex flex-col">
      <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4x">
        {dashboard[language].activeNotesTitle}
      </h2>

      <div className="mb-4 flex items-center justify-between gap-4">
        <Input
          className="max-w-xs"
          placeholder={dashboard[language].searchPlaceholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button>
          <Link to="/notes/add" className="flex items-center">
            <SquarePen className="mr-2 h-4 w-4" />
            {dashboard[language].addButton}
          </Link>
        </Button>
      </div>

      {error && (
        <div className="mt-4 flex-1 grid place-items-center">
          <EmptyState
            icon={<TriangleAlert className="h-24 w-24" />}
            message={`${dashboard[language].errorPrefix}: ${error}`}
          />
        </div>
      )}

      {loading ? (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid rounded-lg border p-4"
            >
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length ? (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((note) => (
            <article key={note.id} className="mb-4 break-inside-avoid">
              <NoteCard note={note} onChange={refetch} />
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex-1 grid place-items-center">
          <EmptyState
            icon={<SearchX className="h-24 w-24" />}
            message={dashboard[language].emptyMessage}
          />
        </div>
      )}
    </section>
  );
};

export { Homepage };
