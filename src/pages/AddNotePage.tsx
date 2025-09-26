import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SerializedEditorState } from "lexical";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

import { Editor } from "@/components/blocks/editor-00/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLanguage } from "@/contexts/LanguageContext";

import { addNote } from "@/lib/api";
import { addNote as addNoteLang } from "@/lib/language";
import { lexicalStateToHTML } from "@/lib/lexical-html";

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState<SerializedEditorState>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { language } = useLanguage();

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error(addNoteLang[language].errors.titleRequired);
      return;
    }
    if (!editorState) {
      toast.error(addNoteLang[language].errors.contentEmpty);
      return;
    }

    try {
      setLoading(true);
      const html = await lexicalStateToHTML(editorState);
      const res = await addNote({ title, body: html });

      if (res.error) {
        toast.error(addNoteLang[language].failed);
        return;
      }
      toast.error(addNoteLang[language].success);
      navigate("/");
    } catch {
      toast.error(addNoteLang[language].failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4x">
        {addNoteLang[language].header}
      </h2>

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder={addNoteLang[language].titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleSave} disabled={loading} aria-busy={loading}>
          <SquarePen className="mr-2 h-4 w-4" />
          {loading
            ? addNoteLang[language].saving
            : addNoteLang[language].button}
        </Button>
      </div>

      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
      />
    </section>
  );
};

export { AddNotePage };
