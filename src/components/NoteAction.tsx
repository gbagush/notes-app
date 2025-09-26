import { toast } from "sonner";
import { useState } from "react";

import {
  Archive,
  ArchiveRestore,
  EllipsisVertical,
  Trash,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLanguage } from "@/contexts/LanguageContext";

import { archiveNote, unarchiveNote, deleteNote } from "@/lib/api";
import { note as noteLang } from "@/lib/language";

type ActionDone = "archive" | "unarchive" | "delete";

export const NoteAction = ({
  noteId,
  archived,
  isIconOnly = false,
  onSuccess,
}: {
  noteId: string;
  archived: boolean;
  isIconOnly?: boolean;
  onSuccess?: (action: ActionDone) => void;
}) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleToggleArchive = async () => {
    try {
      setLoading(true);
      const res = archived
        ? await unarchiveNote(noteId)
        : await archiveNote(noteId);
      if (res.error) throw new Error();
      toast.success(
        archived
          ? noteLang[language].toast.unarchived
          : noteLang[language].toast.archived
      );
      onSuccess?.(archived ? "unarchive" : "archive");
    } catch {
      toast.error(noteLang[language].toast.failed);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteNote(noteId);
      if (res.error) throw new Error();
      toast.success(noteLang[language].toast.deleted);
      onSuccess?.("delete");
    } catch {
      toast.error(noteLang[language].toast.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isIconOnly ? (
          <Button
            size="icon"
            variant="outline"
            disabled={loading}
            aria-label="More actions"
            aria-busy={loading}
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            aria-busy={loading}
          >
            <Wrench className="mr-2 h-4 w-4" />
            {noteLang[language].actionButton}
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem disabled={loading} onClick={handleToggleArchive}>
          {archived ? (
            <>
              <ArchiveRestore className="mr-2 h-4 w-4" />
              {noteLang[language].actions.unarchive}
            </>
          ) : (
            <>
              <Archive className="mr-2 h-4 w-4" />
              {noteLang[language].actions.archive}
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          disabled={loading}
          onClick={handleDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          {noteLang[language].actions.delete}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
