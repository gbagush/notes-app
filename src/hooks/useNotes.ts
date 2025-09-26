import { useCallback, useEffect, useMemo, useState } from "react";
import { getActiveNotes, getArchivedNotes } from "@/lib/api";
import type { Note } from "@/types/notes";

const useNotes = ({ archived = false }: { archived?: boolean } = {}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = archived ? await getArchivedNotes() : await getActiveNotes();
    if (res.error || !res.data) {
      setNotes([]);
      setError("Failed to fetch notes");
    } else {
      setNotes(res.data);
    }
    setLoading(false);
  }, [archived]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(k) || n.body.toLowerCase().includes(k)
    );
  }, [notes, keyword]);

  return { notes, filtered, loading, error, keyword, setKeyword, refetch };
};

export { useNotes };
