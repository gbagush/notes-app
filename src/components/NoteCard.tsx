import { Link } from "react-router-dom";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoteAction } from "./NoteAction";
import { NoteBody } from "./NoteBody";

import { useLanguage } from "@/contexts/LanguageContext";
import { showFormattedDate } from "@/lib/utils";

import type { Note } from "@/types/notes";

const NoteCard = ({ note, onChange }: { note: Note; onChange: () => void }) => {
  const { id, title, body, archived, createdAt } = note;

  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="cursor-pointer hover:underline">
          <Link to={`/notes/${id}`}>{title}</Link>
        </CardTitle>
        <CardDescription>
          {showFormattedDate(createdAt, language)}
        </CardDescription>

        <CardAction>
          <NoteAction
            noteId={id}
            archived={archived}
            onSuccess={() => onChange()}
            isIconOnly
          />
        </CardAction>
      </CardHeader>

      <CardContent>
        <NoteBody body={body} />
      </CardContent>
    </Card>
  );
};

export { NoteCard };
