import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SearchX, TriangleAlert } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { NoteAction } from "@/components/NoteAction";
import { NoteBody } from "@/components/NoteBody";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useLanguage } from "@/contexts/LanguageContext";

import { getNote } from "@/lib/api";
import { note as noteLang } from "@/lib/language";
import { showFormattedDate } from "@/lib/utils";

import { Note } from "@/types/notes";

const DetailPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const res = await getNote(id);
      if (res.error || !res.data) {
        setError("Failed to fetch note");
        setNote(null);
      } else {
        setNote(res.data);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <section className="py-4 flex-1 flex flex-col">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {noteLang[language].backButton}
        </Button>
      </div>

      {error && (
        <div className="flex-1 grid place-items-center">
          <EmptyState
            icon={<TriangleAlert className="h-24 w-24 " />}
            message={`${noteLang[language].errorPrefix}: ${error}`}
          />
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border p-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      ) : note ? (
        <Card>
          <CardHeader>
            <CardTitle className="leading-tight">{note.title}</CardTitle>
            <CardDescription>
              {showFormattedDate(note.createdAt, language)}
            </CardDescription>
            <CardAction>
              <NoteAction
                noteId={note.id}
                archived={note.archived}
                onSuccess={(action) => {
                  if (action === "delete") {
                    navigate("/");
                    return;
                  }
                  setNote((prev) =>
                    prev ? { ...prev, archived: action === "archive" } : prev
                  );
                }}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <NoteBody body={note.body} />
          </CardContent>
        </Card>
      ) : (
        !error && (
          <div className="flex-1 grid place-items-center">
            <EmptyState
              icon={<SearchX className="h-24 w-24" />}
              message={noteLang[language].noteNotFound}
            />
          </div>
        )
      )}
    </section>
  );
};

export { DetailPage };
