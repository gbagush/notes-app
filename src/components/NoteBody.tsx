import DOMPurify from "dompurify";

const NoteBody = ({ body }: { body: string }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}
      />
    </div>
  );
};

export { NoteBody };
