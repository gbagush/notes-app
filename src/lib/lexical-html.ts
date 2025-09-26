import { createEditor } from "lexical";
import type { SerializedEditorState } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

import { nodes } from "@/components/blocks/editor-00/nodes";

export const lexicalStateToHTML = (serialized: SerializedEditorState) => {
  const editor = createEditor({ nodes });

  editor.setEditorState(editor.parseEditorState(serialized));

  return new Promise<string>((resolve) => {
    editor.update(() => {
      const html = $generateHtmlFromNodes(editor);
      resolve(html);
    });
  });
};
